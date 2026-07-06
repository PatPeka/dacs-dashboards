# DACS Dashboards — Demo

Interactive HTML demos of DACS user-facing dashboards. No build step required — plain HTML + Tailwind CDN.

## Contents

| File | Description |
|---|---|
| `index.html` | Demo hub landing page |
| `where-is-my-meds.html` | Medication delivery status tracker (patient-specific dispensing) |
| `production-cockpit.html` | Daily Production Cockpit — risk-aware ward sequencing |
| `data/orders.json` | Mock data snapshot (patients + orders) |
| `data/cockpit.json` | Mock data snapshot (production cockpit) |
| `js/datasource.js` | Data layer — reads the JSON snapshots today, switchable to a live API later |

## Deploy on GitHub Pages

1. Create a repository (e.g. `dacs-dashboards`) on github.com.
2. Upload the entire content of this folder (keep the `data/` and `js/` subfolders).
3. Settings → Pages → Source: branch `main`, folder `/ (root)` → Save.
4. After ~1 minute the demo is live at
   `https://<your-account>.github.io/dacs-dashboards/`

## Demo scenarios

Search by admission number: `A1234` delivered · `A5678` in transit · `A9012` in production · `A3456` cancelled · `A0000` connection error. Patient name search also works (e.g. "Jane").

## Connecting to the DACS test platform (later)

All data access goes through `js/datasource.js`:

- **Snapshot mode (current):** regenerate `data/orders.json` from a DACS export job and commit it.
- **Live mode:** deploy to Azure Static Web Apps, add Azure Functions under `/api/orders` and `/api/cockpit` that query the DACS test platform server-side (credentials never reach the browser, no CORS issues), then set `API_BASE = '/api'` in `js/datasource.js`. Each function must return the same JSON shape as the matching file in `data/`.

## Notes

- Tailwind and Lucide icons load from public CDNs — an internet connection is required to view the demos.
- Demo data is entirely fictional; no real patient data.
