"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AgentData } from "@/lib/data/agents";
import { BILLING_PERIODS } from "@/lib/constants";

export function HirePanel({ agent }: { agent: AgentData }) {
  const [period, setPeriod] = useState("daily");
  const router = useRouter();

  const priceMap: Record<string, number> = {
    hourly: agent.price.hourly,
    daily: agent.price.daily,
    monthly: agent.price.monthly,
    yearly: agent.price.yearly,
  };

  const currentPeriod = BILLING_PERIODS.find((p) => p.id === period)!;
  const currentPrice = priceMap[period];

  return (
    <div className="flex flex-col gap-4 w-[260px]">
      {/* Hire card */}
      <div
        className="flex flex-col gap-5 p-5 sticky top-6"
        style={{
          background: "var(--surface-1)",
          border: "1px solid var(--border-dim)",
        }}
      >
        <span
          className="text-[10px] tracking-[2px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
        >
          {"// HIRE " + agent.name}
        </span>

        {/* Price display */}
        <div className="flex items-baseline gap-1">
          <span
            className="text-3xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--neon)" }}
          >
            ${currentPrice}
          </span>
          <span
            className="text-[11px]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
          >
            /{currentPeriod.unit}
          </span>
          {currentPeriod.savePct > 0 && (
            <span
              className="ml-2 px-1.5 py-0.5 text-[9px] tracking-[1px]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--neon)",
                background: "rgba(0,255,136,0.08)",
                border: "1px solid rgba(0,255,136,0.2)",
              }}
            >
              SAVE {currentPeriod.savePct}%
            </span>
          )}
        </div>

        {/* Period selector */}
        <div className="grid grid-cols-2 gap-1.5">
          {BILLING_PERIODS.map((bp) => (
            <button
              key={bp.id}
              onClick={() => setPeriod(bp.id)}
              className="px-3 py-2 text-[10px] tracking-[1px] transition-all duration-150 cursor-pointer"
              style={{
                fontFamily: "var(--font-mono)",
                background: period === bp.id ? "rgba(0,255,136,0.08)" : "var(--surface-2)",
                border: period === bp.id ? "1px solid var(--neon)" : "1px solid var(--border-dim)",
                color: period === bp.id ? "var(--neon)" : "var(--text-secondary)",
              }}
            >
              {bp.label}
            </button>
          ))}
        </div>

        {/* Deploy button */}
        <button
          onClick={() => router.push(`/checkout?agent=${agent.slug}&period=${period}`)}
          className="w-full py-3 text-[11px] tracking-[2px] font-semibold transition-all duration-200 cursor-pointer hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]"
          style={{
            fontFamily: "var(--font-heading)",
            background: "var(--neon)",
            color: "var(--background)",
            border: "1px solid var(--neon)",
          }}
        >
          DEPLOY AGENT →
        </button>

        {/* Try agent button (only for agents with chat) */}
        {agent.slug === "emily" && (
          <button
            onClick={() => router.push(`/agents/emily/chat`)}
            className="w-full py-3 text-[11px] tracking-[2px] font-semibold transition-all duration-200 cursor-pointer hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]"
            style={{
              fontFamily: "var(--font-heading)",
              background: "transparent",
              color: "var(--cyan)",
              border: "1px solid var(--cyan)",
            }}
          >
            TALK TO EMILY →
          </button>
        )}

        <p
          className="text-center text-[10px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
        >
          Cancel anytime · No setup fees
        </p>

        {/* Status card */}
        <div
          className="flex flex-col gap-3 p-3 mt-1"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border-dim)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: "var(--neon)",
                boxShadow: "0 0 6px rgba(0,255,136,0.6)",
                animation: "pulse-dot 2s ease-in-out infinite",
              }}
            />
            <span
              className="text-[10px] tracking-[1px]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--neon)" }}
            >
              ONLINE
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between">
              <span
                className="text-[10px]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
              >
                ACTIVE_INSTANCES
              </span>
              <span
                className="text-[10px]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}
              >
                {agent.instances}
              </span>
            </div>
            <div className="flex justify-between">
              <span
                className="text-[10px]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
              >
                LAST_TRAINED
              </span>
              <span
                className="text-[10px]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}
              >
                {agent.lastTrained}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
