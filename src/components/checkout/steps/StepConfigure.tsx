"use client";

import type { CheckoutData } from "@/app/checkout/page";

const INTEGRATIONS = ["Gmail", "Zendesk", "Shopify", "Slack"];

interface Props {
  data: CheckoutData;
  onChange: (d: Partial<CheckoutData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepConfigure({ data, onChange, onNext, onBack }: Props) {
  function toggleIntegration(name: string) {
    const set = new Set(data.integrations);
    if (set.has(name)) set.delete(name);
    else set.add(name);
    onChange({ integrations: Array.from(set) });
  }

  return (
    <div className="flex flex-col gap-8 max-w-xl mx-auto">
      <h2
        className="text-lg tracking-[3px]"
        style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text-primary)" }}
      >
        CONFIGURE AGENT
      </h2>

      {/* Company name */}
      <div className="flex flex-col gap-2">
        <label
          className="text-[9px] tracking-[2px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
        >
          COMPANY_NAME
        </label>
        <input
          type="text"
          value={data.companyName}
          onChange={(e) => onChange({ companyName: e.target.value })}
          placeholder="Acme Corp"
          className="w-full px-4 py-3 text-[13px] outline-none transition-colors focus:border-[var(--neon)]"
          style={{
            fontFamily: "var(--font-body)",
            background: "var(--surface-2)",
            border: "1px solid var(--border-dim)",
            color: "var(--text-primary)",
          }}
        />
      </div>

      {/* Business context */}
      <div className="flex flex-col gap-2">
        <label
          className="text-[9px] tracking-[2px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
        >
          BUSINESS_CONTEXT
        </label>
        <textarea
          rows={3}
          value={data.businessContext}
          onChange={(e) => onChange({ businessContext: e.target.value })}
          placeholder="Describe your business and how this agent will be used..."
          className="w-full px-4 py-3 text-[13px] outline-none resize-none transition-colors focus:border-[var(--neon)]"
          style={{
            fontFamily: "var(--font-body)",
            background: "var(--surface-2)",
            border: "1px solid var(--border-dim)",
            color: "var(--text-primary)",
          }}
        />
      </div>

      {/* File upload */}
      <div className="flex flex-col gap-2">
        <label
          className="text-[9px] tracking-[2px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
        >
          TRAINING_DATA
        </label>
        <div
          className="flex flex-col items-center justify-center gap-2 py-8 px-4 text-center transition-all duration-200 cursor-pointer hover:border-[var(--neon)] hover:shadow-[0_0_15px_rgba(0,255,136,0.06)]"
          style={{
            border: "1px dashed var(--border-bright)",
            background: "var(--surface-2)",
          }}
        >
          <span
            className="text-[10px] tracking-[2px]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
          >
            DROP FILES HERE OR CLICK TO UPLOAD
          </span>
          <span
            className="text-[9px]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
          >
            PDF, CSV, JSON, TXT — max 50MB
          </span>
        </div>
      </div>

      {/* Integrations */}
      <div className="flex flex-col gap-3">
        <label
          className="text-[9px] tracking-[2px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
        >
          INTEGRATIONS
        </label>
        {INTEGRATIONS.map((name) => {
          const checked = data.integrations.includes(name);
          return (
            <div
              key={name}
              className="flex items-center justify-between px-4 py-3"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border-dim)",
              }}
            >
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  className="flex h-4 w-4 items-center justify-center text-[10px] transition-colors"
                  style={{
                    border: checked
                      ? "1px solid var(--neon)"
                      : "1px solid var(--border-bright)",
                    background: checked ? "rgba(0,255,136,0.1)" : "transparent",
                    color: checked ? "var(--neon)" : "transparent",
                  }}
                  onClick={() => toggleIntegration(name)}
                >
                  {checked && "✓"}
                </div>
                <span
                  className="text-[12px]"
                  style={{ fontFamily: "var(--font-body)", color: "var(--text-primary)" }}
                >
                  {name}
                </span>
              </label>
              <span
                className="text-[9px] tracking-[1px] cursor-pointer transition-colors hover:brightness-125"
                style={{ fontFamily: "var(--font-mono)", color: "var(--neon)" }}
              >
                CONNECT →
              </span>
            </div>
          );
        })}
      </div>

      {/* Nav */}
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
