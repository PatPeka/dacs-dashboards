/**
 * DACS Dashboards — data source layer
 * MODE 1 (current): static JSON snapshots in data/
 * MODE 2 (later):   set API_BASE = '/api' to hit an Azure Function proxy
 *                   exposing /api/orders and /api/cockpit (same JSON shapes).
 */

const API_BASE = null; // e.g. '/api' once the Azure Function proxy exists
const EMBEDDED_FALLBACK_URL = 'data/orders.json';
const COCKPIT_FALLBACK_URL = 'data/cockpit.json';

let _cache = null;

async function loadDataset() {
  if (_cache) return _cache;
  const url = API_BASE ? `${API_BASE}/orders` : EMBEDDED_FALLBACK_URL;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Data source unavailable (${res.status})`);
  _cache = await res.json();
  return _cache;
}

/** Daily Production Cockpit snapshot. */
async function getCockpit() {
  const url = API_BASE ? `${API_BASE}/cockpit` : COCKPIT_FALLBACK_URL;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Cockpit data unavailable (${res.status})`);
  return res.json();
}

/**
 * Look up a patient + active order by name substring or exact admission number.
 * Returns { patient, order } | 'not-found'; throws on connectivity problems.
 */
async function getPatientOrder(query) {
  const q = query.toLowerCase().trim();
  if (q === 'error' || q === 'a0000') {
    throw new Error('Simulated connection error');
  }
  const data = await loadDataset();
  const patient = data.patients.find(
    (p) => p.name.toLowerCase().includes(q) || p.admissionNumber.toLowerCase() === q
  );
  if (!patient) return 'not-found';
  const order = data.orders.find((o) => o.patientId === patient.id);
  if (!order) return 'not-found';
  return { patient, order };
}

window.DACSData = { getPatientOrder, getCockpit };
