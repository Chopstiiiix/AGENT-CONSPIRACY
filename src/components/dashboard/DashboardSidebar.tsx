"use client";

const LINKS = [
  { id: "agents", label: "MY AGENTS" },
  { id: "activity", label: "ACTIVITY" },
  { id: "billing", label: "BILLING" },
  { id: "settings", label: "SETTINGS" },
];

export function DashboardSidebar({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <aside
      className="w-[200px] shrink-0 flex flex-col gap-1 py-6 pr-4"
      style={{ borderRight: "1px solid var(--border-dim)" }}
    >
      <span
        className="mb-4 text-[9px] tracking-[3px] px-3"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
      >
        {"// DASHBOARD"}
      </span>

      {LINKS.map((link) => (
        <button
          key={link.id}
          onClick={() => onNavigate(link.id)}
          className="w-full text-left px-3 py-2 text-[10px] tracking-[2px] transition-all duration-150 cursor-pointer"
          style={{
            fontFamily: "var(--font-mono)",
            color: active === link.id ? "var(--neon)" : "var(--text-secondary)",
            background: active === link.id ? "rgba(0,255,136,0.06)" : "transparent",
            borderLeft: active === link.id ? "2px solid var(--neon)" : "2px solid transparent",
          }}
        >
          {link.label}
        </button>
      ))}
    </aside>
  );
}
