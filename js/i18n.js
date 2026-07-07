/**
 * DACS Dashboards — i18n layer (FR default, FR/EN toggle)
 * ------------------------------------------------------
 * All UI copy lives here. Dashboards render dynamic content via I18N.t(key)
 * and mark static content with data-i18n / data-i18n-ph / data-i18n-title /
 * data-i18n-html. Technical acronyms (RCP, SLA, DO, eMAR, ADT, CPOE, ADT,
 * CPSC) are kept untranslated on purpose.
 */
(function () {
  const DICT = {
    en: {
      // nav
      "nav.home": "Home", "nav.wim": "Where is my med", "nav.cockpit": "Production Cockpit", "nav.ward": "Ward Status",
      // hub
      "hub.tagline": "Demo environment — mock data",
      "hub.intro": "Interactive demonstrations of DACS user-facing dashboards. Data shown is simulated; the same interfaces can be connected to a live DACS environment.",
      "hub.wim.title": "Where is my meds?",
      "hub.wim.desc": "Medication delivery status for patient-specific dispensing. Track orders from pharmacy production to ward delivery.",
      "hub.cockpit.title": "Daily Production Cockpit",
      "hub.cockpit.desc": "Risk-aware ward sequencing for live patient-specific dispensing. Recommended production order, SLA forecast, and exceptions to monitor.",
      "hub.ward.title": "Ward Medication Status",
      "hub.ward.desc": "Where is my med, ward view. Supply and administration status by bed — delivered, administered, assumed, or not taken — with a neutral base model and optional reconciliation modules.",
      "hub.open": "Open demo",
      "hub.tips": "<span class=\"font-semibold\">Demo tips:</span> try admission number <code class=\"bg-white px-1.5 py-0.5 rounded border border-slate-200\">A2201</code> (delivered), <code class=\"bg-white px-1.5 py-0.5 rounded border border-slate-200\">A2481</code> (in transit), <code class=\"bg-white px-1.5 py-0.5 rounded border border-slate-200\">A2206</code> (delayed / stock out), <code class=\"bg-white px-1.5 py-0.5 rounded border border-slate-200\">A2210</code> (cancelled), <code class=\"bg-white px-1.5 py-0.5 rounded border border-slate-200\">A0000</code> (connection error). Ward 224 patients (e.g. <code class=\"bg-white px-1.5 py-0.5 rounded border border-slate-200\">A2203</code>) also appear on the Ward Status board.",
      "hub.footer": "DACS — Drugs Automation & Communication System · Demo only, no real patient data.",
      // where is my med
      "wim.title": "Where is my meds?",
      "wim.subtitle": "Medication delivery status for patient-specific dispensing",
      "wim.scan": "Scan Barcode",
      "wim.search.ph": "Search by patient name or admission number...",
      "wim.check": "Check Status",
      "wim.idle.title": "Ready to check medication status",
      "wim.idle.body": "Scan a patient barcode or search by name/admission number to view delivery status.",
      "wim.err.title": "Medication status temporarily unavailable",
      "wim.err.body": "We couldn't connect to the pharmacy system. Please try again or contact pharmacy.",
      "wim.err.retry": "Try again",
      "wim.contact": "Contact Pharmacy",
      "wim.nf.title": "No active medication delivery found",
      "wim.nf.body": "We couldn't find an active order for this patient. Please check the spelling or admission number.",
      "wim.clear": "Clear search",
      "wim.lastUpdated": "Last Updated",
      "wim.dob": "DOB", "wim.ward": "Ward", "wim.room": "Room", "wim.bed": "Bed",
      "wim.journey": "Delivery Journey", "wim.orderDetails": "Order Details",
      "wim.dispenseId": "Dispense Order ID", "wim.refresh": "Refresh Status", "wim.report": "Report Issue",
      // status messages + details
      "statusmsg.delivered": "Delivered to ward", "statusmsg.in-transit": "In transit",
      "statusmsg.in-production": "In production", "statusmsg.stock-out": "Delayed — stock out",
      "statusmsg.waiting-rcp": "Awaiting validation", "statusmsg.cancelled": "Order cancelled", "statusmsg.none": "No active order",
      "details.delivered": "Delivered at {time} · {round} round", "details.in-transit": "Picked up at pharmacy at {time}",
      "details.in-production": "Expected before the {round} round",
      "details.stock-out": "Item temporarily out of stock. Pharmacy has been notified.",
      "details.waiting-rcp": "Order waiting for clinical validation (RCP) before production.",
      "details.cancelled": "This medication order was cancelled (admission/transfer/discharge).",
      "details.none": "No active dispense order for this round.",
      "tl.received": "Order received by pharmacy", "tl.production": "Production started",
      "tl.picked": "Picked up from pharmacy", "tl.delivered": "Delivered to ward", "tl.cancelled": "Cancelled",
      "time.today": "Today, {t}",
      // cockpit
      "cockpit.title": "Daily Production Cockpit",
      "cockpit.subtitle": "Risk-aware ward sequencing for live patient-specific dispensing",
      "cockpit.live": "Live production", "cockpit.updated": "Data updated {t}", "cockpit.assist": "Assist",
      "kpi.objective": "Daily objective", "kpi.dosesProduced": "Doses produced",
      "kpi.patientsRemaining": "Patients remaining", "kpi.patientsServed": "Patients served",
      "kpi.start": "Start time", "kpi.startSub": "Production started",
      "kpi.cutoff": "Cut-off", "kpi.cutoffSub": "Target end", "kpi.forecast": "Forecast end",
      "kpi.remaining": "{t} remaining",
      "reco.eyebrow": "Next Recommended Ward", "reco.patients": "Patients", "reco.doses": "Doses",
      "reco.medianRcp": "Median RCP", "reco.duration": "Est. duration", "reco.progress": "Progress",
      "reco.because": "Recommended because:", "reco.start": "Start production", "reco.skip": "Skip recommendation",
      "reco.adapts": "DACS adapts the next recommendation based on real production progress.",
      "seq.title": "Recommended production sequence by ward", "seq.viewAll": "View full schedule",
      "seq.rank": "Rank", "seq.ward": "Ward", "seq.patients": "Patients", "seq.doses": "Doses",
      "seq.medianRcp": "Median RCP", "seq.duration": "Est. duration", "seq.progress": "Progress", "seq.slaRisk": "SLA risk",
      "why.title": "Why this sequence?", "sla.title": "SLA forecast",
      "sla.estCompletion": "Estimated completion", "sla.cutoff": "Cut-off", "sla.buffer": "Buffer",
      "exc.title": "Exceptions to monitor",
      "foot.human": "Human-in-the-loop:", "foot.humanBody": "operator can follow or override.",
      "foot.live": "Live adaptation:", "foot.liveBody": "recommendations update based on real production.",
      "foot.next": "Next step:", "foot.nextBody": "SLA alerts and delivery tracking.",
      "tl.start": "Start", "tl.forecastEnd": "Forecast end", "tl.cutoff": "Cut-off",
      "risk.success": "On track", "risk.warning": "Watch", "risk.danger": "Delay risk", "status.on-track": "On track",
      "rationale.rcp-first": "Lower median RCP first", "rationale.workload-included": "Remaining workload included",
      "rationale.fixed-rate": "Fixed production rate applied", "rationale.recalculated": "Recalculated as production progresses",
      "reason.low-risk-high-workload": "This ward combines low return risk and high remaining workload.",
      "exc.do-late": "DO received late", "exc.do-cancelled-adt": "DO cancelled by ADT",
      "exc.do-waiting-rcp": "DO waiting for RCP", "exc.robot-alerts": "robot capacity alerts",
      // ward status
      "ward.title": "Ward Medication Status",
      "ward.subtitle": "Where is my med — ward view. Supply and administration status by bed, no patient names. Prepare the round, anticipate problems.",
      "ward.ctrl.ward": "Ward", "ward.ctrl.adminTime": "Admin time", "ward.ctrl.lookAhead": "Look ahead",
      "ward.ctrl.modules": "Reconciliation modules", "ward.ctrl.modulesHint": "toggle to see certainty change",
      "lookahead.This round": "This round", "lookahead.This + next round": "This + next round",
      "module.emar": "eMAR", "module.adt": "ADT", "module.bagReturn": "Bag-return", "module.assume": "Assumption",
      "module.emar.hint": "confirmed administration", "module.adt.hint": "discharge-based inference",
      "module.bagReturn.hint": "confirmed not-taken", "module.assume.hint": "assume administered after admin time",
      "ward.baseNote": "The base model is neutral: it only knows what was delivered. Reconciliation modules add administration outcomes. With every module off, delivered doses stay <span class=\"font-semibold\">Unknown</span> — the system never assumes.",
      "sum.administered": "Administered", "sum.presumed": "Presumed", "sum.notTaken": "Not taken",
      "sum.unknown": "Unknown", "sum.toReview": "To review", "sum.supplyAlerts": "Supply alerts",
      "ward.legendTitle": "Status taxonomy", "ward.room": "Room", "ward.bed": "Bed",
      "admin.administered": "Administered", "admin.assumed-admin": "Assumed administered",
      "admin.assumed-not-taken": "Assumed not taken", "admin.not-taken": "Not taken",
      "admin.contradiction": "Conflicting signals", "admin.unknown": "Unknown",
      "conf.Confirmed": "Confirmed", "conf.Presumed": "Presumed", "conf.Review": "Review", "conf.Unknown": "Unknown",
      "tilestate.action": "Action", "tilestate.closed": "Closed", "tilestate.upcoming": "Upcoming",
      "supply.delivered": "Delivered", "supply.in-transit": "In transit", "supply.in-production": "In production",
      "supply.stock-out": "Stock out", "supply.waiting-rcp": "Waiting for RCP", "supply.cancelled": "Cancelled by ADT", "supply.none": "No order",
      "tile.supplyProblem": "Visible outside pharmacy — no CPOE integration needed.",
      "tile.cancelled": "Order withdrawn by admission/transfer/discharge.",
      "tile.upcoming": "Dose not yet delivered for this round.",
      "flag.contradiction": "eMAR says administered, but bag was returned — review.",
      "flag.confirmation": "Bag returned and patient discharged before admin — confirmed.",
      "legend.administered": "eMAR confirms administration",
      "legend.assumed-admin": "Delivered, admin time passed, no contrary signal",
      "legend.assumed-not-taken": "Patient discharged before admin time (ADT)",
      "legend.not-taken": "Bag returned and reconciled to the order",
      "legend.contradiction": "Signals disagree — needs a human check",
      "legend.unknown": "Delivered only — no reconciliation signal"
    },
    fr: {
      "nav.home": "Accueil", "nav.wim": "Où est mon médicament", "nav.cockpit": "Cockpit de production", "nav.ward": "Statut de l'unité",
      "hub.tagline": "Environnement de démo — données fictives",
      "hub.intro": "Démonstrations interactives des tableaux de bord DACS destinés aux utilisateurs. Les données affichées sont fictives ; les mêmes interfaces peuvent être connectées à un environnement DACS réel.",
      "hub.wim.title": "Où est mon médicament ?",
      "hub.wim.desc": "Statut de livraison des médicaments en dispensation nominative. Suivez les commandes de la production en pharmacie jusqu'à la livraison dans l'unité.",
      "hub.cockpit.title": "Cockpit de production quotidien",
      "hub.cockpit.desc": "Séquençage des unités tenant compte du risque, pour la dispensation nominative en temps réel. Ordre de production recommandé, prévision SLA et exceptions à surveiller.",
      "hub.ward.title": "Statut médicamenteux de l'unité",
      "hub.ward.desc": "Où est mon médicament, vue par unité. Statut d'approvisionnement et d'administration par lit — livré, administré, présumé ou non pris — avec un modèle de base neutre et des modules de rapprochement optionnels.",
      "hub.open": "Ouvrir la démo",
      "hub.tips": "<span class=\"font-semibold\">Astuces démo :</span> essayez le numéro d'admission <code class=\"bg-white px-1.5 py-0.5 rounded border border-slate-200\">A2201</code> (livré), <code class=\"bg-white px-1.5 py-0.5 rounded border border-slate-200\">A2481</code> (en transit), <code class=\"bg-white px-1.5 py-0.5 rounded border border-slate-200\">A2206</code> (retardé / rupture de stock), <code class=\"bg-white px-1.5 py-0.5 rounded border border-slate-200\">A2210</code> (annulé), <code class=\"bg-white px-1.5 py-0.5 rounded border border-slate-200\">A0000</code> (erreur de connexion). Les patients de l'unité 224 (ex. <code class=\"bg-white px-1.5 py-0.5 rounded border border-slate-200\">A2203</code>) apparaissent aussi sur le tableau Statut de l'unité.",
      "hub.footer": "DACS — Drugs Automation & Communication System · Démo uniquement, aucune donnée patient réelle.",
      "wim.title": "Où est mon médicament ?",
      "wim.subtitle": "Statut de livraison des médicaments en dispensation nominative",
      "wim.scan": "Scanner le code-barres",
      "wim.search.ph": "Rechercher par nom de patient ou numéro d'admission...",
      "wim.check": "Vérifier le statut",
      "wim.idle.title": "Prêt à vérifier le statut du médicament",
      "wim.idle.body": "Scannez le code-barres d'un patient ou recherchez par nom / numéro d'admission pour voir le statut de livraison.",
      "wim.err.title": "Statut du médicament temporairement indisponible",
      "wim.err.body": "Impossible de se connecter au système de la pharmacie. Réessayez ou contactez la pharmacie.",
      "wim.err.retry": "Réessayer",
      "wim.contact": "Contacter la pharmacie",
      "wim.nf.title": "Aucune livraison de médicament active trouvée",
      "wim.nf.body": "Aucune commande active pour ce patient. Vérifiez l'orthographe ou le numéro d'admission.",
      "wim.clear": "Effacer la recherche",
      "wim.lastUpdated": "Dernière mise à jour",
      "wim.dob": "Né(e) le", "wim.ward": "Unité", "wim.room": "Chambre", "wim.bed": "Lit",
      "wim.journey": "Parcours de livraison", "wim.orderDetails": "Détails de la commande",
      "wim.dispenseId": "N° de commande de dispensation", "wim.refresh": "Actualiser le statut", "wim.report": "Signaler un problème",
      "statusmsg.delivered": "Livré dans l'unité", "statusmsg.in-transit": "En transit",
      "statusmsg.in-production": "En production", "statusmsg.stock-out": "Retardé — rupture de stock",
      "statusmsg.waiting-rcp": "En attente de validation", "statusmsg.cancelled": "Commande annulée", "statusmsg.none": "Aucune commande active",
      "details.delivered": "Livré à {time} · tour {round}", "details.in-transit": "Retiré à la pharmacie à {time}",
      "details.in-production": "Attendu avant le tour de {round}",
      "details.stock-out": "Article temporairement en rupture. La pharmacie a été informée.",
      "details.waiting-rcp": "Commande en attente de validation clinique (RCP) avant production.",
      "details.cancelled": "Cette commande a été annulée (admission/transfert/sortie).",
      "details.none": "Aucune commande de dispensation active pour ce tour.",
      "tl.received": "Commande reçue par la pharmacie", "tl.production": "Production démarrée",
      "tl.picked": "Retiré de la pharmacie", "tl.delivered": "Livré dans l'unité", "tl.cancelled": "Annulé",
      "time.today": "Aujourd'hui, {t}",
      "cockpit.title": "Cockpit de production quotidien",
      "cockpit.subtitle": "Séquençage des unités tenant compte du risque, pour la dispensation nominative en temps réel",
      "cockpit.live": "Production en cours", "cockpit.updated": "Données mises à jour {t}", "cockpit.assist": "Assist",
      "kpi.objective": "Objectif du jour", "kpi.dosesProduced": "Doses produites",
      "kpi.patientsRemaining": "Patients restants", "kpi.patientsServed": "Patients servis",
      "kpi.start": "Heure de début", "kpi.startSub": "Production démarrée",
      "kpi.cutoff": "Heure limite", "kpi.cutoffSub": "Fin visée", "kpi.forecast": "Fin prévue",
      "kpi.remaining": "il reste {t}",
      "reco.eyebrow": "Prochaine unité recommandée", "reco.patients": "Patients", "reco.doses": "Doses",
      "reco.medianRcp": "RCP médian", "reco.duration": "Durée est.", "reco.progress": "Progression",
      "reco.because": "Recommandé car :", "reco.start": "Démarrer la production", "reco.skip": "Ignorer la recommandation",
      "reco.adapts": "DACS adapte la prochaine recommandation selon l'avancement réel de la production.",
      "seq.title": "Séquence de production recommandée par unité", "seq.viewAll": "Voir le planning complet",
      "seq.rank": "Rang", "seq.ward": "Unité", "seq.patients": "Patients", "seq.doses": "Doses",
      "seq.medianRcp": "RCP médian", "seq.duration": "Durée est.", "seq.progress": "Progression", "seq.slaRisk": "Risque SLA",
      "why.title": "Pourquoi cette séquence ?", "sla.title": "Prévision SLA",
      "sla.estCompletion": "Fin estimée", "sla.cutoff": "Heure limite", "sla.buffer": "Marge",
      "exc.title": "Exceptions à surveiller",
      "foot.human": "Humain dans la boucle :", "foot.humanBody": "l'opérateur peut suivre ou passer outre.",
      "foot.live": "Adaptation en direct :", "foot.liveBody": "les recommandations évoluent selon la production réelle.",
      "foot.next": "Étape suivante :", "foot.nextBody": "alertes SLA et suivi de livraison.",
      "tl.start": "Début", "tl.forecastEnd": "Fin prévue", "tl.cutoff": "Heure limite",
      "risk.success": "Dans les temps", "risk.warning": "À surveiller", "risk.danger": "Risque de retard", "status.on-track": "Dans les temps",
      "rationale.rcp-first": "RCP médian le plus faible d'abord", "rationale.workload-included": "Charge de travail restante incluse",
      "rationale.fixed-rate": "Cadence de production fixe appliquée", "rationale.recalculated": "Recalculé au fil de la production",
      "reason.low-risk-high-workload": "Cette unité combine un faible risque de retour et une charge restante élevée.",
      "exc.do-late": "DO reçues en retard", "exc.do-cancelled-adt": "DO annulées par ADT",
      "exc.do-waiting-rcp": "DO en attente de RCP", "exc.robot-alerts": "alertes de capacité robot",
      "ward.title": "Statut médicamenteux de l'unité",
      "ward.subtitle": "Où est mon médicament — vue par unité. Statut d'approvisionnement et d'administration par lit, sans noms de patients. Préparez le tour, anticipez les problèmes.",
      "ward.ctrl.ward": "Unité", "ward.ctrl.adminTime": "Heure d'administration", "ward.ctrl.lookAhead": "Anticipation",
      "ward.ctrl.modules": "Modules de rapprochement", "ward.ctrl.modulesHint": "activez/désactivez pour voir la certitude changer",
      "lookahead.This round": "Ce tour", "lookahead.This + next round": "Ce tour + le suivant",
      "module.emar": "eMAR", "module.adt": "ADT", "module.bagReturn": "Retour de bag", "module.assume": "Hypothèse",
      "module.emar.hint": "administration confirmée", "module.adt.hint": "inférence basée sur la sortie",
      "module.bagReturn.hint": "non-pris confirmé", "module.assume.hint": "présumer administré après l'heure",
      "ward.baseNote": "Le modèle de base est neutre : il ne connaît que ce qui a été livré. Les modules de rapprochement ajoutent le devenir de l'administration. Tous modules désactivés, les doses livrées restent <span class=\"font-semibold\">Inconnu</span> — le système ne présume jamais.",
      "sum.administered": "Administré", "sum.presumed": "Présumé", "sum.notTaken": "Non pris",
      "sum.unknown": "Inconnu", "sum.toReview": "À revoir", "sum.supplyAlerts": "Alertes appro",
      "ward.legendTitle": "Taxonomie des statuts", "ward.room": "Chambre", "ward.bed": "Lit",
      "admin.administered": "Administré", "admin.assumed-admin": "Administration présumée",
      "admin.assumed-not-taken": "Non-pris présumé", "admin.not-taken": "Non pris",
      "admin.contradiction": "Signaux contradictoires", "admin.unknown": "Inconnu",
      "conf.Confirmed": "Confirmé", "conf.Presumed": "Présumé", "conf.Review": "À revoir", "conf.Unknown": "Inconnu",
      "tilestate.action": "Action", "tilestate.closed": "Clôturé", "tilestate.upcoming": "À venir",
      "supply.delivered": "Livré", "supply.in-transit": "En transit", "supply.in-production": "En production",
      "supply.stock-out": "Rupture de stock", "supply.waiting-rcp": "En attente de RCP", "supply.cancelled": "Annulé par ADT", "supply.none": "Aucune commande",
      "tile.supplyProblem": "Visible hors pharmacie — sans intégration CPOE.",
      "tile.cancelled": "Commande retirée (admission/transfert/sortie).",
      "tile.upcoming": "Dose pas encore livrée pour ce tour.",
      "flag.contradiction": "eMAR indique administré, mais le bag a été retourné — à revoir.",
      "flag.confirmation": "Bag retourné et patient sorti avant l'administration — confirmé.",
      "legend.administered": "eMAR confirme l'administration",
      "legend.assumed-admin": "Livré, heure passée, aucun signal contraire",
      "legend.assumed-not-taken": "Patient sorti avant l'heure (ADT)",
      "legend.not-taken": "Bag retourné et rapproché de la commande",
      "legend.contradiction": "Signaux divergents — contrôle humain requis",
      "legend.unknown": "Livré seulement — aucun signal de rapprochement"
    }
  };

  function storedLang() {
    try { return localStorage.getItem('dacs_lang'); } catch (e) { return null; }
  }
  function storeLang(l) {
    try { localStorage.setItem('dacs_lang', l); } catch (e) {}
  }

  const I18N = {
    lang: storedLang() || 'fr',
    t: function (key, vars) {
      const table = DICT[this.lang] || DICT.fr;
      let s = (table[key] !== undefined) ? table[key] : (DICT.en[key] !== undefined ? DICT.en[key] : key);
      if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
      return s;
    },
    apply: function (root) {
      root = root || document;
      root.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = this.t(el.getAttribute('data-i18n')); });
      root.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = this.t(el.getAttribute('data-i18n-html')); });
      root.querySelectorAll('[data-i18n-ph]').forEach(el => { el.setAttribute('placeholder', this.t(el.getAttribute('data-i18n-ph'))); });
      root.querySelectorAll('[data-i18n-title]').forEach(el => { el.setAttribute('title', this.t(el.getAttribute('data-i18n-title'))); });
      const toggle = document.getElementById('langToggle');
      if (toggle) toggle.textContent = this.lang === 'fr' ? 'EN' : 'FR';
      document.documentElement.setAttribute('lang', this.lang);
    },
    setLang: function (l) {
      this.lang = (l === 'en') ? 'en' : 'fr';
      storeLang(this.lang);
      this.apply(document);
      window.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang: this.lang } }));
    }
  };

  window.I18N = I18N;

  function boot() {
    I18N.apply(document);
    const toggle = document.getElementById('langToggle');
    if (toggle && !toggle._wired) {
      toggle._wired = true;
      toggle.addEventListener('click', () => I18N.setLang(I18N.lang === 'fr' ? 'en' : 'fr'));
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
