import Link from "next/link";
import { AGENT_CATEGORIES } from "@/lib/constants";

const COLOR_MAP: Record<string, string> = {
  neon: "#00ff88",
  cyan: "#00d4ff",
  amber: "#ffaa00",
  pink: "#ff0066",
};

export function CategoryGrid() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <span
            className="text-[11px] tracking-[3px]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
          >
            {"// AGENT CATEGORIES"}
          </span>
          <Link
            href="/browse"
            className="text-[11px] tracking-[2px] transition-colors hover:brightness-125"
            style={{ fontFamily: "var(--font-mono)", color: "var(--neon)" }}
          >
            VIEW ALL →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {AGENT_CATEGORIES.map((cat) => {
            const accent = COLOR_MAP[cat.color];
            return (
              <Link
                key={cat.id}
                href={`/browse?category=${cat.id}`}
                className="group relative flex flex-col gap-3 p-5 transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "var(--surface-1)",
                  border: "1px solid var(--border-dim)",
                }}
                onMouseEnter={undefined}
              >
                {/* Hover glow overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  style={{
                    boxShadow: `inset 0 0 30px rgba(0,255,136,0.04), 0 0 15px rgba(0,255,136,0.06)`,
                    border: "1px solid var(--border-bright)",
                  }}
                />

                <span
                  className="relative inline-flex w-fit items-center justify-center px-2 py-0.5 text-[10px] font-bold tracking-[1px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: accent,
                    border: `1px solid ${accent}33`,
                    background: `${accent}0d`,
                  }}
                >
                  {cat.code}
                </span>
                <span
                  className="relative text-sm"
                  style={{ fontFamily: "var(--font-body)", color: "var(--text-primary)" }}
                >
                  {cat.label}
                </span>
                <span
                  className="relative text-[10px] tracking-[1px]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
                >
                  {cat.count} AGENTS
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
