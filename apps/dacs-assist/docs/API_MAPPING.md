# API mapping

Authoritative contract inspected: DACS API [TEST] v0.3.7.1, OpenAPI 3.0, JWT bearer. No login endpoint is invented.

| API | Domain/use |
|---|---|
| `stability` | `rcp` — explicit prototype semantic assumption |
| `tackingTime` | `administrationTargetTime` |
| `sendingCycle` | hard latest production deadline |
| `hasBeenProduct` | authoritative produced flag |
| `serviceId` / `service` | ward grouping/display |
| `quantity` | dose workload |
| `patientCode` | distinct pseudonym count only |

Approved read methods are isolated in `DacsApiClient`: real production planning, iteration planning, next SPP iteration, robot schedules, one dispense order by ID, sites and services. The UI currently calls real production planning only; other methods are ready for screens/adapters that have sufficient identifiers. No write, cancellation, recovery, SPP-trigger or robot-control method exists in the client.

The hand-written client is intentional because the full NSwag client would expose prohibited writes. `npm run api:generate -- <swagger-path>` verifies contract identity; adapters keep transport details out of the UI.
