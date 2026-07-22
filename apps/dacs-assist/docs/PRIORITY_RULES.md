# Priority and aggregation rules

Eligible orders have `sendingCycle` on the selected Brussels operational day. Terminal cancellations, received-too-late and never-planned orders are excluded from progress but remain exception evidence. The mock adapter supplies the selected date; a future bulk adapter must enforce the timezone filter before aggregation.

- Ward: group by `serviceId`; mapper documents code/name fallback.
- Patients: distinct non-empty `patientCode`; no name is displayed.
- Progress: produced eligible dose quantity / eligible dose quantity. Order-count progress is configurable. `hasBeenProduct`, not `SentToRobot`, is authoritative.
- RCP: statistical median of finite `stability`; null/invalid ignored. Coverage is valid RCP orders / eligible orders.
- Cut-off: earliest `sendingCycle` with remaining work.
- Invalid/negative quantity: excluded from dose sums and raised as a data exception.

Provisional comparator: incomplete wards only, producible before blocked, valid RCP before missing, median RCP ascending, progress descending, earliest cut-off, ward name. This is deterministic and transparent but **not claimed to match Power BI**. No opaque weights exist. The `powerbi-formula` strategy throws until the exact formula is configured.

SLA is unknown unless measured duration and cut-off exist. Future classification: on-track at buffer ≥30 minutes, watch from 0–29 minutes, at-risk below zero.
