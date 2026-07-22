# Missing API capabilities

1. **Blocking:** no bulk read endpoint returns relevant daily `DispenseOrder` records. Without it, median RCP, progress, ward ranking and exceptions cannot be fully live. Recommended: `GET /v1/dispense-orders?productionDay=YYYY-MM-DD&siteId={guid}` or a purpose-built read model.
2. Exact Power BI combined priority formula and its filters are not supplied. The application exposes an honest provisional comparator; `powerbi-formula` fails explicitly.
3. No dedicated daily production target is confirmed. The UI displays actual eligible workload, not a fabricated target.
4. Reliable preparation duration/throughput observations are insufficient. Duration and forecast show `Unavailable`.
5. Transport, ward delivery confirmation and eMAR events are absent.
6. Patient name, admission number, room, bed and DOB are deliberately unavailable/out of scope.
7. Authentication is bearer JWT but no Swagger login flow exists. A hosting shell/token provider must supply the token.
8. The operational timezone is assumed to be `Europe/Brussels`; the backend should define operational-day boundaries explicitly.

Future recommended contracts: `GET /v1/assist/cockpit`, `GET /v1/assist/production-priorities`, or the filtered bulk endpoint above. They are documented only, not implemented.
