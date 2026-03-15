const STATS = [
  { value: "42+", label: "AGENT_TYPES" },
  { value: "1,800+", label: "ACTIVE_CLIENTS" },
  { value: "247", label: "DEPLOYED_NOW" },
  { value: "99.97%", label: "UPTIME_SLA" },
];

export function StatsStrip() {
  return (
    <section
      className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-8"
      style={{
        borderTop: "1px solid var(--border-dim)",
        borderBottom: "1px solid var(--border-dim)",
      }}
    >
      {STATS.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
          <span
            className="text-2xl md:text-3xl"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--neon)",
            }}
          >
            {stat.value}
          </span>
          <span
            className="text-[9px] tracking-[2px]"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--text-secondary)",
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </section>
  );
}
