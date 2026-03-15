import type { AgentData } from "@/lib/data/agents";

export function AgentHeader({ agent }: { agent: AgentData }) {
  const initials = agent.name.replace(/-\d+$/, "").slice(0, 2);

  const stats = [
    { label: "RATING", value: `★ ${agent.rating}` },
    { label: "REVIEWS", value: agent.reviewCount.toLocaleString() },
    { label: "CONTRACTS", value: agent.contracts.toLocaleString() },
    { label: "UPTIME", value: agent.uptime },
    { label: "RESPONSE", value: agent.responseTime },
  ];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "var(--surface-1)",
        border: "1px solid var(--border-dim)",
      }}
    >
      {/* Top gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, #00ff88, #00d4ff, #ff0066)",
        }}
      />

      <div className="flex flex-col gap-6 p-6 pt-8">
        {/* Identity row */}
        <div className="flex items-center gap-4">
          <div
            className="relative flex h-[60px] w-[60px] shrink-0 items-center justify-center text-lg font-bold tracking-wider rounded-xl"
            style={{
              fontFamily: "var(--font-heading)",
              background: `${agent.accentColor}15`,
              border: `1px solid ${agent.accentColor}40`,
              color: agent.accentColor,
            }}
          >
            {initials}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h1
                className="text-2xl"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text-primary)" }}
              >
                {agent.name}
              </h1>

              {/* Available badge */}
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[9px] tracking-[2px]"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--neon)",
                  border: "1px solid rgba(0,255,136,0.3)",
                  background: "rgba(0,255,136,0.06)",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: "var(--neon)",
                    boxShadow: "0 0 6px rgba(0,255,136,0.6)",
                    animation: "pulse-dot 2s ease-in-out infinite",
                  }}
                />
                AVAILABLE
              </span>
            </div>

            <span
              className="text-[11px] tracking-[2px]"
              style={{ fontFamily: "var(--font-mono)", color: agent.accentColor }}
            >
              {agent.code} · {agent.specialty}
            </span>
          </div>
        </div>

        {/* Stat pills */}
        <div className="flex flex-wrap gap-2">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-0.5 px-4 py-2"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border-dim)",
              }}
            >
              <span
                className="text-sm font-semibold"
                style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
              >
                {s.value}
              </span>
              <span
                className="text-[8px] tracking-[2px]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
