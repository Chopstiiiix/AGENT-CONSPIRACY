"use client";

import { BILLING_PERIODS } from "@/lib/constants";
import type { CheckoutData } from "@/app/checkout/page";

interface Props {
  data: CheckoutData;
  onChange: (d: Partial<CheckoutData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepPlan({ data, onChange, onNext, onBack }: Props) {
  return (
    <div className="flex flex-col gap-8 max-w-xl mx-auto">
      <h2
        className="text-lg tracking-[3px]"
        style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text-primary)" }}
      >
        SELECT BILLING PERIOD
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {BILLING_PERIODS.map((bp) => {
          const selected = data.period === bp.id;
          return (
            <button
              key={bp.id}
              onClick={() => onChange({ period: bp.id })}
              className="flex flex-col gap-3 p-5 text-left transition-all duration-150 cursor-pointer"
              style={{
                background: selected ? "rgba(0,255,136,0.04)" : "var(--surface-1)",
                border: selected
                  ? "1px solid var(--neon)"
                  : "1px solid var(--border-dim)",
              }}
            >
              <span
                className="text-[9px] tracking-[2px]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
              >
                {bp.label.toUpperCase()}
              </span>

              <div className="flex items-baseline gap-1">
                <span
                  className="text-2xl"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    color: "var(--neon)",
                  }}
                >
                  ${bp.price}
                </span>
                <span
                  className="text-[10px]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
                >
                  /{bp.unit}
                </span>
              </div>

              {bp.savePct > 0 && (
                <span
                  className="inline-flex w-fit px-1.5 py-0.5 text-[9px] tracking-[1px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--amber)",
                    background: "rgba(255,170,0,0.08)",
                    border: "1px solid rgba(255,170,0,0.2)",
                  }}
                >
                  SAVE {bp.savePct}%
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-6 py-2.5 text-[10px] tracking-[2px] transition-colors cursor-pointer"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-secondary)",
            background: "transparent",
            border: "1px solid var(--border-dim)",
          }}
        >
          ← BACK
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2.5 text-[10px] tracking-[2px] font-semibold transition-all duration-200 cursor-pointer hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]"
          style={{
            fontFamily: "var(--font-heading)",
            background: "var(--neon)",
            color: "var(--background)",
            border: "1px solid var(--neon)",
          }}
        >
          CONTINUE →
        </button>
      </div>
    </div>
  );
}
