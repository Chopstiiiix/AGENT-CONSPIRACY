import Link from "next/link";

interface AgentCardProps {
  name: string;
  code: string;
  specialty: string;
  tags: string[];
  price: number;
  rating: number;
  accentColor: string;
  slug: string;
}

export function AgentCard({
  name,
  code,
  specialty,
  tags,
  price,
  rating,
  accentColor,
  slug,
}: AgentCardProps) {
  const initials = name.replace(/-\d+$/, "").slice(0, 2);

  return (
    <Link
      href={`/agents/${slug}`}
      className="group relative flex flex-col gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
      style={{
        background: "var(--surface-1)",
        border: "1px solid var(--border-dim)",
      }}
    >
      {/* Top shimmer line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        }}
      />

      {/* Avatar + status */}
      <div className="flex items-center gap-3">
        <div
          className="relative flex h-10 w-10 items-center justify-center text-xs font-bold tracking-wider"
          style={{
            fontFamily: "var(--font-heading)",
            background: `${accentColor}15`,
            border: `1px solid ${accentColor}40`,
            color: accentColor,
            borderRadius: "50%",
          }}
        >
          {initials}
          {/* Online dot */}
          <span
            className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full"
            style={{
              background: "var(--neon)",
              boxShadow: "0 0 6px rgba(0,255,136,0.6)",
              animation: "pulse-dot 2s ease-in-out infinite",
            }}
          />
        </div>
        <div className="flex flex-col">
          <span
            className="text-sm"
            style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
          >
            {name}
          </span>
          <span
            className="text-[10px] tracking-[1px]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
          >
            {code} · {specialty}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-[9px] tracking-[1px]"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-dim)",
              background: "var(--surface-2)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Price + Rating */}
      <div className="mt-auto flex items-center justify-between pt-2"
        style={{ borderTop: "1px solid var(--border-dim)" }}
      >
        <span
          className="text-sm font-semibold"
          style={{ fontFamily: "var(--font-heading)", color: accentColor }}
        >
          ${price}
          <span
            className="text-[10px] font-normal"
            style={{ color: "var(--text-tertiary)" }}
          >
            /hr
          </span>
        </span>
        <span
          className="text-[11px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--amber)" }}
        >
          ★ {rating}
        </span>
      </div>
    </Link>
  );
}
