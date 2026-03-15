"use client";

import { useState } from "react";
import { BILLING_PERIODS } from "@/lib/constants";
import type { CheckoutData } from "@/app/checkout/page";
import type { AgentData } from "@/lib/data/agents";

interface Props {
  data: CheckoutData;
  agent: AgentData;
  userId: string;
  onBack: () => void;
}

export function StepDeploy({ data, agent, userId, onBack }: Props) {
  const [loading, setLoading] = useState(false);
  const bp = BILLING_PERIODS.find((p) => p.id === data.period)!;
  const priceMap: Record<string, number> = {
    hourly: agent.price.hourly,
    daily: agent.price.daily,
    monthly: agent.price.monthly,
    yearly: agent.price.yearly,
  };
  const price = priceMap[data.period];

  async function handleDeploy() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentSlug: agent.slug,
          billingPeriod: data.period,
          userId,
        }),
      });

      const { url, error } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        console.error("[checkout] Failed:", error);
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-xl mx-auto">
      <h2
        className="text-lg tracking-[3px]"
        style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text-primary)" }}
      >
        CONFIRM & DEPLOY
      </h2>

      {/* Order summary */}
      <div
        className="flex flex-col gap-4 p-5"
        style={{
          background: "var(--surface-1)",
          border: "1px solid var(--border-dim)",
        }}
      >
        <span
          className="text-[9px] tracking-[2px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
        >
          {"// ORDER_SUMMARY"}
        </span>

        <div className="flex flex-col gap-2">
          <SummaryRow label="AGENT" value={agent.name} />
          <SummaryRow label="PERIOD" value={`${bp.label} — $${price}/${bp.unit}`} />
          <SummaryRow label="TIER" value="STANDARD" />
          <SummaryRow
            label="INTEGRATIONS"
            value={data.integrations.length > 0 ? data.integrations.join(", ") : "None"}
          />
        </div>

        <div
          className="flex justify-between items-baseline pt-3 mt-2"
          style={{ borderTop: "1px solid var(--border-dim)" }}
        >
          <span
            className="text-[10px] tracking-[2px]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
          >
            TOTAL DUE TODAY
          </span>
          <span
            className="text-xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--neon)" }}
          >
            ${price}
            <span
              className="text-[10px] font-normal"
              style={{ color: "var(--text-tertiary)" }}
            >
              /{bp.unit}
            </span>
          </span>
        </div>
      </div>

      {/* Stripe notice */}
      <p
        className="text-center text-[10px]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
      >
        You will be redirected to Stripe to complete payment securely.
      </p>

      {/* Nav */}
      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          disabled={loading}
          className="px-6 py-2.5 text-[10px] tracking-[2px] transition-colors cursor-pointer disabled:opacity-40"
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
          onClick={handleDeploy}
          disabled={loading}
          className="px-6 py-2.5 text-[10px] tracking-[2px] font-semibold transition-all duration-200 cursor-pointer hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] disabled:opacity-60 disabled:cursor-wait"
          style={{
            fontFamily: "var(--font-heading)",
            background: "var(--neon)",
            color: "var(--background)",
            border: "1px solid var(--neon)",
          }}
        >
          {loading ? "REDIRECTING..." : "CONFIRM & DEPLOY →"}
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span
        className="text-[10px] tracking-[1px]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
      >
        {label}
      </span>
      <span
        className="text-[11px]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}
      >
        {value}
      </span>
    </div>
  );
}
