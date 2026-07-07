/**
 * DACS Dashboards — data source layer
 * ------------------------------------
 * ONE source of truth (data/dataset.json): patients + dispense orders +
 * ward aggregates for a single CHU Liège evening. Each dashboard is a
 * PROJECTION of that base model, computed here:
 *   - getPatientOrder  -> "Where is my med"       (patient lookup + timeline)
 *   - getWardStatus    -> "Ward Medication Status" (beds x rounds + signals)
 *   - getCockpit       -> "Daily Production Cockpit" (ward aggregates)
 *
 * This mirrors the real DACS design: a neutral base model, with views
 * derived from it. Swapping to live data is one line.
 *
 * MODE 1 (current): project locally from data/dataset.json.
 * MODE 2 (later):   set API_BASE = '/api'. Each getX then calls the
 *                   matching Azure Function endpoint (/api/orders,
 *                   /api/cockpit, /api/ward-status) where the DACS
 *                   platform does the same projection server-side.
 */

const API_BASE = null; // e.g. '/api' once the Azure Function proxy exists
const DATASET_URL = 'data/dataset.json';

let _dataset = null;

async function loadDataset() {
  if (_dataset) return _dataset;
  const res = await fetch(DATASET_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Dataset unavailable (${res.status})`);
  _dataset = await res.json();
  return _dataset;
}

async function apiGet(path, label) {
  const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`${label} unavailable (${res.status})`);
  return res.json();
}

// ---------- helpers ----------
function fmtTime(hhmm) { return hhmm ? `Today, ${hhmm}` : undefined; }

function latestTime(o) {
  const t = o.times || {};
  return t.delivered || t.cancelled || t.picked || t.production || t.received || null;
}

function buildTimelineSteps(o) {
  const t = o.times || {};
  if (o.supply === 'cancelled') {
    return [
      { key: 'received', time: t.received || null, completed: true },
      { key: 'cancelled', time: t.cancelled || null, completed: true, isCancelled: true, current: true }
    ];
  }
  const order = ['received', 'production', 'picked', 'delivered'];
  let lastIdx = -1;
  order.forEach((k, i) => { if (t[k]) lastIdx = i; });
  return order.map((k, i) => ({
    key: k, time: t[k] || null, completed: !!t[k], current: i === lastIdx
  }));
}

// Return CODES only; the dashboard composes localized labels via i18n.
function toDisplayOrder(o) {
  return {
    id: o.id,
    patientId: o.patientId,
    statusCode: o.supply,        // delivered | in-transit | in-production | stock-out | waiting-rcp | cancelled | none
    adminTime: o.adminTime,
    batchId: o.id,
    lastUpdatedTime: latestTime(o),
    timeline: buildTimelineSteps(o)
  };
}

// ---------- projection: Where is my med ----------
async function getPatientOrder(query) {
  const q = query.toLowerCase().trim();
  if (q === 'error' || q === 'a0000') throw new Error('Simulated connection error');
  if (API_BASE) {
    // server-side lookup in live mode
    const res = await fetch(`${API_BASE}/orders?q=${encodeURIComponent(q)}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Data source unavailable (${res.status})`);
    const data = await res.json();
    return data || 'not-found';
  }
  const ds = await loadDataset();
  const patient = ds.patients.find(
    (p) => p.name.toLowerCase().includes(q) || p.admissionNumber.toLowerCase() === q
  );
  if (!patient) return 'not-found';
  const current = ds.currentAdminTime;
  const orders = ds.dispenseOrders.filter((o) => o.patientId === patient.id);
  if (!orders.length) return 'not-found';
  const o = orders.find((x) => x.adminTime === current) || orders[0];
  return { patient, order: toDisplayOrder(o) };
}

// ---------- projection: Ward Medication Status ----------
async function getWardStatus() {
  if (API_BASE) return apiGet('/ward-status', 'Ward status');
  const ds = await loadDataset();
  const wid = ds.detailedWard;
  const ward = ds.wards.find((w) => w.id === wid) || { id: wid, name: wid };
  const rounds = {};
  ds.adminTimes.forEach((t) => {
    const beds = ds.dispenseOrders
      .filter((o) => o.ward === wid && o.adminTime === t)
      .map((o) => ({
        room: o.room, bed: o.bed, supply: o.supply,
        deliveredAt: (o.times && o.times.delivered) || null,
        signals: o.signals || { emar: null, adt: null, bagReturn: null }
      }));
    rounds[t] = { adminTimePassed: t <= ds.currentAdminTime, beds };
  });
  return {
    site: ds.site, date: ds.date, dataUpdated: ds.dataUpdated,
    ward: { id: ward.id, name: ward.name },
    adminTimes: ds.adminTimes,
    defaultAdminTime: ds.currentAdminTime,
    lookAheadOptions: ds.lookAheadOptions,
    modules: { ...ds.modules },
    rounds
  };
}

// ---------- projection: Daily Production Cockpit ----------
async function getCockpit() {
  if (API_BASE) return apiGet('/cockpit', 'Cockpit data');
  const ds = await loadDataset();
  const p = ds.production;

  const wid = ds.detailedWard;
  const curDOs = ds.dispenseOrders.filter((o) => o.ward === wid && o.adminTime === ds.currentAdminTime);
  const computed = {
    patients: new Set(curDOs.map((o) => o.patientId)).size,
    doses: curDOs.reduce((s, o) => s + (o.doses || 0), 0)
  };

  const rows = ds.wards.map((w) => ({
    ...w,
    patients: w.id === wid ? computed.patients : w.patients,
    doses: w.id === wid ? computed.doses : w.doses
  }));
  rows.sort((a, b) => parseFloat(a.rcp) - parseFloat(b.rcp));
  const sequence = rows.map((w, i) => ({
    rank: i + 1, ward: w.name, patients: w.patients, doses: w.doses,
    rcp: w.rcp, duration: w.duration, progress: w.progress || 0,
    riskType: w.riskType                       // label derived in dashboard via i18n
  }));
  const top = sequence[0];

  return {
    site: ds.site, date: ds.date, dataUpdated: ds.dataUpdated,
    kpis: {
      dailyObjectiveDoses: { produced: p.producedDoses, target: p.objectiveDoses },
      patients: { served: p.servedPatients, total: p.totalPatients },
      startTime: p.startTime, cutoff: p.cutoff, forecastEnd: p.forecastEnd,
      forecastStatusCode: p.forecastStatusCode, remainingTime: p.remainingTime
    },
    recommendation: {
      ward: top.ward, patients: top.patients, doses: top.doses,
      medianRcp: top.rcp, estDuration: top.duration, progress: top.progress,
      reasonCode: p.recommendationReasonCode
    },
    sequence,
    rationale: p.rationale,                     // array of codes
    slaForecast: p.slaForecast,                 // { estimatedCompletion, cutoff, buffer, statusCode }
    exceptions: p.exceptions,                   // [{ count, code, tone }]
    timeline: p.timeline,                       // [{ time, state }]
    timelineProgressPct: p.timelineProgressPct
  };
}

window.DACSData = { getPatientOrder, getCockpit, getWardStatus };
