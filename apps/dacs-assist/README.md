# DACS Assist — Daily Production Cockpit

Angular 20 standalone application implementing the approved static cockpit as a human-in-the-loop recommendation UI.

## Run

```bash
npm install
npm start
npm test
npm run build
```

The development proxy forwards `/api` to `http://localhost:27501`; change `proxy.conf.json` locally for another DACS environment. Never commit a token. If supplied by a host shell, the replaceable prototype token provider reads `dacs_access_token` from session storage.

Data modes: `MOCK` is entirely fictional, `LIVE` exposes only what the current read API can supply, and `AUTO` becomes `MIXED DATA` when live planning is available while mock orders supply the currently unavailable bulk detail. Default polling configuration is 60 seconds in `public/runtime-config.json`; this prototype provides manual refresh and does not claim push real time.

The mock adapter covers normal progress, missing/partial RCP, stock failure, hold, warning, unverified and received-too-late cases. Empty/all-complete/failure scenarios are directly injectable through the datasource/facade in tests.

See [API mapping](docs/API_MAPPING.md), [missing capabilities](docs/MISSING_API_CAPABILITIES.md), and [priority rules](docs/PRIORITY_RULES.md).
