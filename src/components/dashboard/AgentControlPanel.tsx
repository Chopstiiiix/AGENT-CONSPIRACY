"use client";

import { useState } from "react";
import type { ContractRecord } from "@/lib/data/queries";

const RECENT_OUTPUTS = [
  "Resolved ticket #4821 — order status query",
  "Processed refund $42.99 — order #91204",
  "Escalated ticket #4819 — low confidence",
  "Resolved ticket #4818 — shipping delay",
  "Updated knowledge base — return policy v3.2",
];

export function AgentControlPanel({
  contract,
  onClose,
}: {
  contract: ContractRecord;
  onClose: () => void;
}) {
  const [paused, setPaused] = useState(false);
  const [ratings, setRatings] = useState<Record<number, "up" | "down" | null>>({});
  const trainingSignals = 47 + Object.values(ratings).filter(Boolean).length;

  const initials = contract.agentName.replace(/-\d+$/, "").slice(0, 2);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center text-xs font-bold tracking-wider rounded-full"
            style={{
              fontFamily: "var(--font-heading)",
              background: `${contract.accentColor}15`,
              border: `1px solid ${contract.accentColor}40`,
              color: contract.accentColor,
            }}
          >
            {initials}
          </div>
          <div className="flex flex-col">
            <span
              className="text-sm"
              style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
            >
              {contract.agentName}
            </span>
            <span
              className="text-[10px] tracking-[1px]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
            >
              {contract.agentCode} · {contract.specialty}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-[10px] tracking-[2px] cursor-pointer transition-colors hover:text-[var(--text-primary)]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)", background: "transparent", border: "none" }}
        >
          ← BACK
        </button>
      </div>

      {/* Pause / Resume */}
      <div
        className="flex items-center justify-between p-4"
        style={{ background: "var(--surface-1)", border: "1px solid var(--border-dim)" }}
      >
        <div className="flex flex-col gap-0.5">
          <span
            className="text-[10px] tracking-[2px]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
          >
            AGENT STATUS
          </span>
          <span
            className="text-[11px]"
            style={{
              fontFamily: "var(--font-mono)",
              color: paused ? "var(--amber)" : "var(--neon)",
            }}
          >
            {paused ? "PAUSED" : "RUNNING"}
          </span>
        </div>
        <button
          onClick={() => setPaused(!paused)}
          className="px-4 py-2 text-[10px] tracking-[2px] cursor-pointer transition-all duration-200"
          style={{
            fontFamily: "var(--font-heading)",
            color: paused ? "var(--neon)" : "var(--amber)",
            border: `1px solid ${paused ? "var(--neon)" : "var(--amber)"}`,
            background: "transparent",
          }}
        >
          {paused ? "RESUME →" : "PAUSE ⏸"}
        </button>
      </div>

      {/* Upload knowledge base */}
      <div className="flex flex-col gap-2">
        <span
          className="text-[9px] tracking-[2px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
        >
          KNOWLEDGE_BASE
        </span>
        <div
          className="flex flex-col items-center justify-center gap-2 py-6 px-4 text-center transition-all duration-200 cursor-pointer hover:border-[var(--neon)]"
          style={{
            border: "1px dashed var(--border-bright)",
            background: "var(--surface-2)",
          }}
        >
          <span
            className="text-[10px] tracking-[2px]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
          >
            DROP FILES TO UPDATE KNOWLEDGE BASE
          </span>
          <span
            className="text-[9px]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
          >
            PDF, CSV, JSON, TXT — max 50MB
          </span>
        </div>
      </div>

      {/* Rating interface */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span
            className="text-[9px] tracking-[2px]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
          >
            RATE_RECENT_OUTPUTS
          </span>
          <span
            className="text-[10px]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
          >
            Training signals sent:{" "}
            <span style={{ color: "var(--neon)" }}>{trainingSignals}</span>
          </span>
        </div>

        {RECENT_OUTPUTS.map((output, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-3 py-2.5"
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border-dim)",
            }}
          >
            <span
              className="flex-1 text-[11px]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
            >
              {output}
            </span>
            <div className="flex gap-1 shrink-0">
              <button
                onClick={() => setRatings((r) => ({ ...r, [i]: r[i] === "up" ? null : "up" }))}
                className="px-2 py-1 text-[12px] cursor-pointer transition-all"
                style={{
                  background: ratings[i] === "up" ? "rgba(0,255,136,0.12)" : "transparent",
                  border: ratings[i] === "up" ? "1px solid var(--neon)" : "1px solid var(--border-dim)",
                  color: ratings[i] === "up" ? "var(--neon)" : "var(--text-tertiary)",
                }}
              >
                ▲
              </button>
              <button
                onClick={() => setRatings((r) => ({ ...r, [i]: r[i] === "down" ? null : "down" }))}
                className="px-2 py-1 text-[12px] cursor-pointer transition-all"
                style={{
                  background: ratings[i] === "down" ? "rgba(255,0,102,0.12)" : "transparent",
                  border: ratings[i] === "down" ? "1px solid var(--pink)" : "1px solid var(--border-dim)",
                  color: ratings[i] === "down" ? "var(--pink)" : "var(--text-tertiary)",
                }}
              >
                ▼
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
