# DACS Dashboards — Demo

Interactive HTML demos of DACS user-facing dashboards. No build step — plain HTML + Tailwind CDN.

## One dataset, three views

All three dashboards project from a single source of truth, `data/dataset.json`
(patients + dispense orders + ward aggregates for one CHU Liège evening).
`js/datasource.js` derives each view from it, exactly as the live DACS platform
would server-side:

| File | Description |
|---|---|
| `index.html` | Demo hub landing page |
| `where-is-my-meds.html` | Patient lookup: supply status + delivery timeline |
| `production-cockpit.html` | Ward-level production sequencing (aggregate view) |
| `ward-status.html` | Bed-level supply + administration status (ward 224) |
| `data/dataset.json` | Single source of truth: patients, dispense orders, wards |
| `js/datasource.js` | Projection layer (dataset now, live API later) |

A patient found in "Where is my med" (e.g. admission `A2203`, ward 224) also
appears on the Ward Status board, and their ward appears in the Cockpit.

## Deploy on GitHub Pages

Files sit at the repo root. Settings -> Pages -> Deploy from a branch ->
`main` / `/ (root)`. Live at `https://patpeka.github.io/dacs-dashboards/`.

## Connecting to the DACS test platform (later)

Set `API_BASE = '/api'` in `js/datasource.js` and expose Azure Functions
`/api/orders`, `/api/cockpit`, `/api/ward-status` that project the same shapes
from the DACS test platform server-side (credentials stay server-side, no CORS).

Demo data is fictional; no real patient data.
