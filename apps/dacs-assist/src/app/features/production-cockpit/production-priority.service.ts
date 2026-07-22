import { Injectable } from "@angular/core";
import {
  DEFAULT_RULES,
  DispenseOrder,
  ExceptionItem,
  ProductionRulesConfig,
  WardProductionMetrics,
} from "../../core/models/domain.models";
@Injectable({ providedIn: "root" })
export class ProductionPriorityService {
  median(values: (number | null)[]): number | null {
    const v = values
      .filter((x): x is number => typeof x === "number" && Number.isFinite(x))
      .sort((a, b) => a - b);
    if (!v.length) return null;
    const m = Math.floor(v.length / 2);
    return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2;
  }
  operationalDate(date: Date, timeZone = "Europe/Brussels"): string {
    const p = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(date);
    const get = (x: string) => p.find((v) => v.type === x)?.value;
    return `${get("year")}-${get("month")}-${get("day")}`;
  }
  aggregate(
    orders: DispenseOrder[],
    rules: ProductionRulesConfig = DEFAULT_RULES,
  ): WardProductionMetrics[] {
    if (rules.priorityStrategy === "powerbi-formula")
      throw new Error("Exact Power BI formula is not configured");
    const eligible = orders.filter(
      (o) => !rules.terminalStatuses.includes(o.status),
    );
    const groups = new Map<string, DispenseOrder[]>();
    for (const o of eligible)
      groups.set(o.serviceId, [...(groups.get(o.serviceId) ?? []), o]);
    return [...groups.entries()]
      .map(([wardId, items]) => {
        const validQty = items.filter(
          (o) => Number.isFinite(o.quantity) && o.quantity >= 0,
        );
        const totalDoses = validQty.reduce((s, o) => s + o.quantity, 0);
        const producedDoses = validQty
          .filter((o) => o.hasBeenProduct)
          .reduce((s, o) => s + o.quantity, 0);
        const producedOrders = items.filter((o) => o.hasBeenProduct).length;
        const progress =
          rules.progressMeasure === "dose-quantity"
            ? totalDoses
              ? (producedDoses / totalDoses) * 100
              : null
            : items.length
              ? (producedOrders / items.length) * 100
              : null;
        const validRcp = items.filter((o) => o.rcp !== null).length;
        const cutoffs = items
          .filter((o) => !o.hasBeenProduct && o.sendingCycle)
          .map((o) => o.sendingCycle as Date);
        const blocked = items.some(
          (o) => !o.hasStock || o.status === "OnHold" || o.status === "Error",
        );
        const medianRcp = this.median(items.map((o) => o.rcp));
        const rationaleCodes: string[] = [];
        if (medianRcp !== null) rationaleCodes.push("LOW_MEDIAN_RCP");
        else rationaleCodes.push("RCP_DATA_INCOMPLETE");
        if ((progress ?? 0) > 50) rationaleCodes.push("HIGH_PROGRESS");
        if (blocked) rationaleCodes.push("PRODUCTION_BLOCKED");
        return {
          wardId,
          wardName: items[0].serviceName,
          patientCount: new Set(items.map((o) => o.patientCode).filter(Boolean))
            .size,
          totalOrders: items.length,
          producedOrders,
          totalDoses,
          producedDoses,
          progressPercent: progress,
          medianRcp,
          rcpCoveragePercent: items.length
            ? (validRcp / items.length) * 100
            : 0,
          cutoff: cutoffs.sort((a, b) => a.valueOf() - b.valueOf())[0] ?? null,
          estimatedDurationMinutes: null,
          exceptionCount: this.exceptions(items).reduce(
            (s, e) => s + e.count,
            0,
          ),
          blocked,
          rationaleCodes,
        };
      })
      .sort(this.comparator(rules));
  }
  comparator(rules: ProductionRulesConfig) {
    return (a: WardProductionMetrics, b: WardProductionMetrics): number => {
      if (rules.priorityStrategy === "powerbi-formula")
        throw new Error("Exact Power BI formula is not configured");
      const ac =
          (a.progressPercent ?? 0) >= rules.completedProgressThresholdPercent,
        bc =
          (b.progressPercent ?? 0) >= rules.completedProgressThresholdPercent;
      return (
        Number(ac) - Number(bc) ||
        Number(a.blocked) - Number(b.blocked) ||
        Number(a.medianRcp === null) - Number(b.medianRcp === null) ||
        (a.medianRcp ?? Infinity) - (b.medianRcp ?? Infinity) ||
        (b.progressPercent ?? -1) - (a.progressPercent ?? -1) ||
        (a.cutoff?.valueOf() ?? Infinity) - (b.cutoff?.valueOf() ?? Infinity) ||
        a.wardName.localeCompare(b.wardName)
      );
    };
  }
  exceptions(orders: DispenseOrder[]): ExceptionItem[] {
    const defs: [
      string,
      (o: DispenseOrder) => boolean,
      ExceptionItem["severity"],
      boolean,
    ][] = [
      [
        "RECEIVED_TOO_LATE",
        (o) => o.status === "ReceivedTooLate",
        "danger",
        true,
      ],
      [
        "CANCELLED_BY_ADT",
        (o) => o.status === "CancelledByAdt",
        "warning",
        false,
      ],
      [
        "OTHER_CANCELLATION",
        (o) =>
          o.status === "Cancelled" || o.status === "CancelledByExternalSource",
        "warning",
        false,
      ],
      ["STOCK_UNAVAILABLE", (o) => !o.hasStock, "danger", true],
      ["WARNING", (o) => o.warning, "warning", false],
      ["ERROR", (o) => o.status === "Error", "danger", true],
      ["ON_HOLD", (o) => o.status === "OnHold", "warning", true],
      ["WAITING_FOR_RCP", (o) => o.rcp === null, "warning", false],
      ["UNVERIFIED", (o) => !o.verified, "warning", false],
      [
        "CANCELLED_AFTER_PRODUCTION",
        (o) => o.cancelledAfterDacsProduction,
        "danger",
        false,
      ],
      [
        "INVALID_QUANTITY",
        (o) => !Number.isFinite(o.quantity) || o.quantity < 0,
        "danger",
        true,
      ],
    ];
    return defs
      .map(([code, test, severity, blocking]) => ({
        code,
        count: orders.filter(test).length,
        severity,
        blocking,
        origin: "MOCK DATA" as const,
      }))
      .filter((e) => e.count > 0);
  }
}
