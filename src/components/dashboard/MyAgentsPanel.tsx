"use client";

import type { ContractRecord } from "@/lib/data/queries";

export function MyAgentsPanel({
  contracts,
  onManage,
}: {
  contracts: ContractRecord[];
  onManage: (contract: ContractRecord) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <h2
        className="text-[11px] tracking-[3px]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
      >
        {"// MY_AGENTS"}
      </h2>

      {contracts.length === 0 && (
        <p
          className="py-16 text-center text-[11px] tracking-[2px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
        >
          NO ACTIVE AGENTS
        </p>
      )}

      <div className="flex flex-col gap-3">
        {contracts.map((c) => {
          const initials = c.agentName.replace(/-\d+$/, "").slice(0, 2);
          const daysSinceStart = Math.floor(
            (Date.now() - new Date(c.startedAt).getTime()) / 86400000,
          );

          return (
            <div
              key={c.id}
              className="flex items-center gap-4 p-4"
              style={{
                background: "var(--surface-1)",
                border: "1px solid var(--border-dim)",
              }}
            >
              {/* Avatar */}
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center text-xs font-bold tracking-wider rounded-full"
                style={{
                  fontFamily: "var(--font-heading)",
                  background: `${c.accentColor}15`,
                  border: `1px solid ${c.accentColor}40`,
                  color: c.accentColor,
                }}
              >
                {initials}
              </div>

              {/* Info */}
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                  >
                    {c.agentName}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[8px] tracking-[1px]"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: c.status === "active" ? "var(--neon)" : "var(--text-tertiary)",
                      border: `1px solid ${c.status === "active" ? "rgba(0,255,136,0.3)" : "var(--border-dim)"}`,
                      background: c.status === "active" ? "rgba(0,255,136,0.06)" : "transparent",
                    }}
                  >
                    {c.status === "active" && (
                      <span
                        className="h-1 w-1 rounded-full"
                        style={{ background: "var(--neon)", boxShadow: "0 0 4px rgba(0,255,136,0.6)" }}
                      />
                    )}
                    {c.status.toUpperCase()}
                  </span>
                </div>
                <span
                  className="text-[10px] tracking-[1px]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
                >
                  {c.agentCode} · {c.specialty}
                </span>
              </div>

              {/* Billing + days */}
              <div className="flex flex-col items-end gap-0.5 shrink-0">
                <span
                  className="text-sm"
                  style={{ fontFamily: "var(--font-heading)", color: c.accentColor }}
                >
                  ${c.price}
                  <span className="text-[9px] font-normal" style={{ color: "var(--text-tertiary)" }}>
                    /{c.unit}
                  </span>
                </span>
                <span
                  className="text-[9px]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
                >
                  {daysSinceStart}d ACTIVE
                </span>
              </div>

              {/* Manage */}
              <button
                onClick={() => onManage(c)}
                className="px-3 py-1.5 text-[9px] tracking-[2px] transition-colors cursor-pointer hover:border-[var(--neon)] hover:text-[var(--neon)]"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-dim)",
                  background: "transparent",
                }}
              >
                MANAGE
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
