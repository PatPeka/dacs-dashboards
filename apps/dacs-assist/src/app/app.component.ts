import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CockpitFacade } from "./features/production-cockpit/cockpit.facade";
import { CockpitView } from "./core/models/domain.models";

const COPY = {
  fr: {
    title: "Cockpit de production quotidien",
    sub: "Séquençage des unités tenant compte du risque",
    recommend: "Séquence recommandée — calculée par DACS Assist",
    why: "Calculée dans l’application à partir du RCP médian et de la progression. Ceci n’est ni une instruction robot automatique ni une sortie SPP officielle.",
    next: "Prochaine unité recommandée",
    patients: "Patients",
    doses: "Doses",
    rcp: "RCP médian",
    coverage: "Couverture RCP",
    progress: "Progression",
    cutoff: "Heure limite",
    duration: "Durée estimée",
    unavailable: "Indisponible",
    refresh: "Actualiser",
    sequence: "Séquence par unité",
    exceptions: "Exceptions à surveiller",
    start: "Début production",
    forecast: "Fin prévue",
    sla: "Prévision SLA",
    human: "Recommandation + supervision · Humain dans la boucle",
    partial:
      "Les données live de planning sont combinées aux commandes fictives, faute d’endpoint bulk journalier.",
    rank: "Rang",
    ward: "Unité",
    origin: "Origine",
  },
  en: {
    title: "Daily Production Cockpit",
    sub: "Risk-aware ward sequencing",
    recommend: "Recommended sequence — calculated by DACS Assist",
    why: "Calculated in the application from ward median RCP and current production progress. This is not an automated robot instruction or official SPP output.",
    next: "Next recommended ward",
    patients: "Patients",
    doses: "Doses",
    rcp: "Median RCP",
    coverage: "RCP coverage",
    progress: "Progress",
    cutoff: "Cut-off",
    duration: "Estimated duration",
    unavailable: "Unavailable",
    refresh: "Refresh",
    sequence: "Ward sequence",
    exceptions: "Exceptions to monitor",
    start: "Production start",
    forecast: "Forecast end",
    sla: "SLA forecast",
    human: "Recommendation + supervision · Human-in-the-loop",
    partial:
      "Live planning data is combined with fictional orders because the daily bulk endpoint is missing.",
    rank: "Rank",
    ward: "Ward",
    origin: "Origin",
  },
} as const;
@Component({
  selector: "dacs-root",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./app.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private facade = inject(CockpitFacade);
  private destroy = inject(DestroyRef);
  readonly language = signal<"fr" | "en">("fr");
  readonly state = signal<"loading" | "loaded" | "error" | "empty">("loading");
  readonly data = signal<CockpitView | null>(null);
  readonly mode = signal<"mock" | "auto" | "live">("auto");
  readonly refreshIntervalSeconds = signal(60);
  selectedDate = this.todayBrussels();
  readonly t = () => COPY[this.language()];
  constructor() {
    this.load();
    const timer = window.setInterval(
      () => this.load(false),
      this.refreshIntervalSeconds() * 1000,
    );
    this.destroy.onDestroy(() => window.clearInterval(timer));
  }
  load(showLoading = true) {
    if (showLoading) this.state.set("loading");
    this.facade
      .load(this.selectedDate, this.mode())
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe({
        next: (data) => {
          this.data.set(data);
          this.state.set(data.wards.length ? "loaded" : "empty");
        },
        error: () => this.state.set("error"),
      });
  }
  toggleLanguage() {
    this.language.update((x) => (x === "fr" ? "en" : "fr"));
  }
  fmt(value: Date | null) {
    return value
      ? new Intl.DateTimeFormat(this.language() === "fr" ? "fr-BE" : "en-BE", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Brussels",
        }).format(value)
      : this.t().unavailable;
  }
  pct(value: number | null) {
    return value === null ? this.t().unavailable : `${Math.round(value)}%`;
  }
  private todayBrussels() {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Brussels",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());
    const get = (x: string) => parts.find((p) => p.type === x)?.value;
    return `${get("year")}-${get("month")}-${get("day")}`;
  }
}
