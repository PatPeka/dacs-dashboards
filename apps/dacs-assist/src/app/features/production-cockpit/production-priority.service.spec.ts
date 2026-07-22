import { describe, expect, it } from "vitest";
import { ProductionPriorityService } from "./production-priority.service";
import { DEFAULT_RULES, DispenseOrder } from "../../core/models/domain.models";
const order = (p: Partial<DispenseOrder> = {}): DispenseOrder => ({
  id: "1",
  serviceId: "A",
  serviceName: "Ward A",
  patientCode: "P1",
  quantity: 10,
  administrationTargetTime: null,
  sendingCycle: new Date("2026-07-22T18:00:00+02:00"),
  rcp: 0.2,
  status: "ReadyForSpp",
  hasBeenProduct: false,
  hasStock: true,
  verified: true,
  warning: false,
  cancelledAfterDacsProduction: false,
  ...p,
});
describe("ProductionPriorityService", () => {
  const s = new ProductionPriorityService();
  it("uses the Europe/Brussels operational date", () => {
    expect(s.operationalDate(new Date("2026-07-21T22:30:00Z"))).toBe(
      "2026-07-22",
    );
  });
  it("calculates odd/even and empty medians", () => {
    expect(s.median([3, 1, 2])).toBe(2);
    expect(s.median([1, 3, 2, 4])).toBe(2.5);
    expect(s.median([null, Number.NaN])).toBeNull();
    expect(s.median([])).toBeNull();
  });
  it("calculates dose progress and excludes terminal orders", () => {
    const w = s.aggregate([
      order({ quantity: 30, hasBeenProduct: true }),
      order({ id: "2", quantity: 70 }),
      order({ id: "3", quantity: 100, status: "Cancelled" }),
    ])[0];
    expect(w.totalDoses).toBe(100);
    expect(w.progressPercent).toBe(30);
  });
  it("supports order-count progress and zero denominator", () => {
    const rules = { ...DEFAULT_RULES, progressMeasure: "order-count" as const };
    expect(
      s.aggregate(
        [order({ hasBeenProduct: true }), order({ id: "2" })],
        rules,
      )[0].progressPercent,
    ).toBe(50);
    expect(s.aggregate([order({ quantity: 0 })])[0].progressPercent).toBeNull();
  });
  it("groups wards and counts distinct non-empty patients", () => {
    const wards = s.aggregate([
      order(),
      order({ id: "2", patientCode: "P1" }),
      order({
        id: "3",
        serviceId: "B",
        serviceName: "Ward B",
        patientCode: null,
      }),
    ]);
    expect(wards).toHaveLength(2);
    expect(wards.find((x) => x.wardId === "A")?.patientCount).toBe(1);
  });
  it("orders producible wards before blocked, then valid RCP before missing", () => {
    const wards = s.aggregate([
      order({ serviceId: "M", serviceName: "Missing", rcp: null }),
      order({
        serviceId: "B",
        serviceName: "Blocked",
        rcp: 0.1,
        hasStock: false,
      }),
      order({ serviceId: "A", serviceName: "Active", rcp: 0.2 }),
    ]);
    expect(wards.map((x) => x.wardId)).toEqual(["A", "M", "B"]);
  });
  it("uses progress and cutoff tie-breaks", () => {
    const wards = s.aggregate([
      order({ serviceId: "B", serviceName: "Beta" }),
      order({ serviceId: "A", serviceName: "Alpha", hasBeenProduct: true }),
      order({ id: "a2", serviceId: "A", serviceName: "Alpha" }),
      order({
        serviceId: "C",
        serviceName: "Charlie",
        sendingCycle: new Date("2026-07-22T17:00:00+02:00"),
      }),
    ]);
    expect(wards.map((x) => x.wardId)).toEqual(["A", "C", "B"]);
  });
  it("maps exceptions", () => {
    const e = s.exceptions([
      order({
        status: "ReceivedTooLate",
        hasStock: false,
        verified: false,
        rcp: null,
      }),
    ]);
    expect(e.map((x) => x.code)).toEqual(
      expect.arrayContaining([
        "RECEIVED_TOO_LATE",
        "STOCK_UNAVAILABLE",
        "WAITING_FOR_RCP",
        "UNVERIFIED",
      ]),
    );
  });
  it("fails explicitly for unconfigured Power BI formula", () => {
    expect(() =>
      s.aggregate([order()], {
        ...DEFAULT_RULES,
        priorityStrategy: "powerbi-formula",
      }),
    ).toThrow(/Power BI/);
  });
});
