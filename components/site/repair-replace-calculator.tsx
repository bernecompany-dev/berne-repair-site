"use client";

import { useMemo, useState } from "react";
import { Calculator, RotateCcw, CheckCircle2, AlertTriangle, XCircle, Wrench } from "lucide-react";
import {
  LUX_CATEGORIES,
  CALCULATOR_BRANDS,
  evaluateRepairOrReplace,
  type Verdict,
} from "@/data/luxury-cost-guide";
import { COMPANY } from "@/data/company";

type Locale = "en" | "es";

const T = {
  en: {
    eyebrow: "Interactive tool",
    heading: "Repair or replace your high-end appliance?",
    lede: "Enter your appliance and the quote you were given. The tool applies our luxury repair-vs-replace logic — a higher break-even than the textbook 50% rule, because replacing a built-in drags in cabinetry and lead time.",
    category: "Appliance category",
    brand: "Brand",
    age: "Age (years)",
    repairCost: "Repair quote ($)",
    repairCostPh: "e.g. 650",
    reset: "Reset",
    result: "Your result",
    replacementEst: "Comparable replacement (installed, est.)",
    repairShare: "Your repair is",
    ofReplacement: "of replacement cost",
    lifeLeft: "Service life used",
    breakeven: "Repair-worth threshold (age-adjusted)",
    disclaimer:
      "An estimate to guide budgeting — the firm number comes from the on-site $59 diagnostic, credited to the repair. Ranges exclude the diagnostic and assume the part is available.",
    cta: "Get a written quote",
    verdicts: {
      repair: {
        title: "Repair — clear value",
        body: "This repair is a small fraction of replacing a comparable luxury unit, and the appliance has meaningful life left. Fixing it is the rational call.",
      },
      "lean-repair": {
        title: "Lean toward repair",
        body: "The repair sits below the break-even for a unit of this age and class. Replacing a built-in also means matching cabinetry and weeks of lead time — repair is usually still the value play.",
      },
      borderline: {
        title: "Borderline — get a second opinion",
        body: "This quote is near the break-even point. It's worth confirming the diagnosis and asking whether a single repair restores the unit, or whether more failures are likely behind it.",
      },
      replace: {
        title: "Consider replacing",
        body: "The repair is a large share of replacement cost for a unit this far into its life. Replacement may be the better long-term value — though a second opinion on the diagnosis is always worth it before a five-figure decision.",
      },
    } as Record<Verdict, { title: string; body: string }>,
  },
  es: {
    eyebrow: "Herramienta interactiva",
    heading: "¿Reparar o reemplazar su electrodoméstico de lujo?",
    lede: "Ingrese su electrodoméstico y el presupuesto que le dieron. La herramienta aplica nuestra lógica de lujo reparar-vs-reemplazar — un punto de equilibrio más alto que la regla clásica del 50%, porque reemplazar un empotrado arrastra carpintería y tiempo de espera.",
    category: "Categoría del electrodoméstico",
    brand: "Marca",
    age: "Antigüedad (años)",
    repairCost: "Presupuesto de reparación ($)",
    repairCostPh: "ej. 650",
    reset: "Reiniciar",
    result: "Su resultado",
    replacementEst: "Reemplazo comparable (instalado, est.)",
    repairShare: "Su reparación es el",
    ofReplacement: "del costo de reemplazo",
    lifeLeft: "Vida útil usada",
    breakeven: "Umbral de conveniencia (ajustado por edad)",
    disclaimer:
      "Una estimación para orientar el presupuesto — el número firme sale del diagnóstico a domicilio de $59, abonado a la reparación. Los rangos excluyen el diagnóstico y asumen que la pieza está disponible.",
    cta: "Pedir un presupuesto por escrito",
    verdicts: {
      repair: {
        title: "Reparar — valor claro",
        body: "Esta reparación es una fracción de reemplazar una unidad de lujo comparable, y al electrodoméstico le queda vida útil significativa. Repararlo es lo razonable.",
      },
      "lean-repair": {
        title: "Inclínese por reparar",
        body: "La reparación está por debajo del punto de equilibrio para una unidad de esta edad y clase. Reemplazar un empotrado además implica igualar la carpintería y semanas de espera — reparar suele seguir siendo lo conveniente.",
      },
      borderline: {
        title: "En el límite — busque una segunda opinión",
        body: "Este presupuesto está cerca del punto de equilibrio. Conviene confirmar el diagnóstico y preguntar si una sola reparación restaura la unidad o si es probable que haya más fallas detrás.",
      },
      replace: {
        title: "Considere reemplazar",
        body: "La reparación es una parte grande del costo de reemplazo para una unidad tan avanzada en su vida útil. Reemplazar puede ser el mejor valor a largo plazo — aunque siempre vale una segunda opinión sobre el diagnóstico antes de una decisión de cinco cifras.",
      },
    } as Record<Verdict, { title: string; body: string }>,
  },
} as const;

const VERDICT_STYLE: Record<
  Verdict,
  { ring: string; text: string; Icon: typeof CheckCircle2 }
> = {
  repair: { ring: "border-emerald-500/40 bg-emerald-500/[0.07]", text: "text-emerald-500", Icon: CheckCircle2 },
  "lean-repair": { ring: "border-brand/40 bg-brand/[0.07]", text: "text-brand", Icon: Wrench },
  borderline: { ring: "border-amber-500/40 bg-amber-500/[0.07]", text: "text-amber-500", Icon: AlertTriangle },
  replace: { ring: "border-rose-500/40 bg-rose-500/[0.07]", text: "text-rose-500", Icon: XCircle },
};

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const pct = (n: number) => `${Math.round(n * 100)}%`;

export function RepairReplaceCalculator({ locale = "en" }: { locale?: Locale }) {
  const t = T[locale];
  const [categoryId, setCategoryId] = useState(LUX_CATEGORIES[0].id);
  const [brand, setBrand] = useState(CALCULATOR_BRANDS[0]);
  const [age, setAge] = useState("8");
  const [repairCost, setRepairCost] = useState("");

  const ageYears = Math.max(0, Number(age) || 0);
  const repairNum = Math.max(0, Number(repairCost) || 0);
  const hasInput = repairCost.trim() !== "" && repairNum > 0;

  const result = useMemo(
    () =>
      evaluateRepairOrReplace({
        categoryId,
        brand,
        ageYears,
        repairCost: repairNum,
      }),
    [categoryId, brand, ageYears, repairNum],
  );

  const reset = () => {
    setCategoryId(LUX_CATEGORIES[0].id);
    setBrand(CALCULATOR_BRANDS[0]);
    setAge("8");
    setRepairCost("");
  };

  const style = VERDICT_STYLE[result.verdict];
  const v = t.verdicts[result.verdict];
  const bookHref = locale === "es" ? "/es/request-dispatch" : "/request-dispatch";

  const fieldCls =
    "mt-1.5 h-11 w-full rounded-xl border border-border bg-card/60 px-3 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/30";
  const labelCls = "text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground";

  return (
    <section id="calculator" className="container-prose py-16 sm:py-20">
      <div className="rounded-3xl border border-brand/30 bg-brand/[0.05] p-6 sm:p-10">
        <span className="eyebrow">
          <Calculator className="mr-1.5 inline size-3.5" aria-hidden />
          {t.eyebrow}
        </span>
        <h2 className="heading-section mt-3">{t.heading}</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">{t.lede}</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Inputs */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelCls} htmlFor="calc-category">
                {t.category}
              </label>
              <select
                id="calc-category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className={fieldCls}
              >
                {LUX_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.shortName[locale]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelCls} htmlFor="calc-brand">
                {t.brand}
              </label>
              <select
                id="calc-brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className={fieldCls}
              >
                {CALCULATOR_BRANDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelCls} htmlFor="calc-age">
                {t.age}
              </label>
              <input
                id="calc-age"
                type="number"
                min={0}
                max={40}
                inputMode="numeric"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className={fieldCls}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelCls} htmlFor="calc-cost">
                {t.repairCost}
              </label>
              <input
                id="calc-cost"
                type="number"
                min={0}
                inputMode="numeric"
                placeholder={t.repairCostPh}
                value={repairCost}
                onChange={(e) => setRepairCost(e.target.value)}
                className={fieldCls}
              />
            </div>

            <button
              type="button"
              onClick={reset}
              className="inline-flex h-10 items-center gap-1.5 self-start rounded-full border border-border bg-tint/[0.04] px-4 text-sm font-semibold text-foreground transition-colors hover:bg-tint/[0.07]"
            >
              <RotateCcw className="size-3.5" aria-hidden />
              {t.reset}
            </button>
          </div>

          {/* Result */}
          <div
            className={`rounded-2xl border p-6 transition-colors ${
              hasInput ? style.ring : "border-border bg-card/40"
            }`}
            aria-live="polite"
          >
            <span className={labelCls}>{t.result}</span>
            {hasInput ? (
              <>
                <div className="mt-3 flex items-start gap-3">
                  <style.Icon className={`mt-0.5 size-7 shrink-0 ${style.text}`} aria-hidden />
                  <div>
                    <h3 className={`text-xl font-bold tracking-tight ${style.text}`}>
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">{v.body}</p>
                  </div>
                </div>

                <dl className="mt-6 space-y-2.5 border-t border-border/60 pt-5 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">{t.replacementEst}</dt>
                    <dd className="font-semibold text-foreground">{usd(result.replacementEstimate)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">{t.repairShare}</dt>
                    <dd className="font-semibold text-foreground">
                      {pct(result.ratio)} {t.ofReplacement}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">{t.breakeven}</dt>
                    <dd className="font-semibold text-foreground">{pct(result.appliedThresholdPct)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">{t.lifeLeft}</dt>
                    <dd className="font-semibold text-foreground">{pct(Math.min(1, result.lifeUsed))}</dd>
                  </div>
                </dl>

                <a
                  href={bookHref}
                  className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-brand-foreground transition-[transform,filter] hover:-translate-y-px hover:brightness-110"
                >
                  {t.cta}
                </a>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{t.disclaimer}</p>
              </>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.disclaimer}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
