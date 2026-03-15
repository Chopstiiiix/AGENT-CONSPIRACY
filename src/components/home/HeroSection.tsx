import Link from "next/link";

export function HeroSection() {
  return (
    <section
      className="relative min-h-[320px] flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden"
    >
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,255,136,0.07) 0%, transparent 70%)",
        }}
      />

      <p
        className="relative mb-6 text-[11px] tracking-[4px]"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--neon)",
        }}
      >
        {"// PROFESSIONAL AI AGENTS — ON DEMAND"}
      </p>

      <h1
        className="relative mb-3 text-5xl sm:text-6xl md:text-7xl leading-none"
        style={{ fontFamily: "var(--font-heading)", fontWeight: 900 }}
      >
        <span style={{ color: "var(--text-primary)" }}>AGENT </span>
        <span
          style={{
            color: "var(--neon)",
            textShadow: "0 0 30px rgba(0,255,136,0.4), 0 0 60px rgba(0,255,136,0.15)",
          }}
        >
          CONSPIRACY
        </span>
      </h1>

      <p
        className="relative mb-6 text-sm tracking-[6px]"
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--text-secondary)",
        }}
      >
        HIRE · DEPLOY · AUTOMATE
      </p>

      <p
        className="relative mb-10 max-w-[440px] text-[13px] leading-relaxed"
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--text-secondary)",
        }}
      >
        Access a curated network of specialised AI agents built for enterprise
        workflows. Deploy in minutes, scale on demand, pay only for what you use.
      </p>

      <div className="relative flex gap-4">
        <Link
          href="/browse"
          className="inline-flex items-center justify-center px-7 py-3 text-xs font-semibold tracking-[2px] transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]"
          style={{
            fontFamily: "var(--font-heading)",
            background: "var(--neon)",
            color: "var(--background)",
            border: "1px solid var(--neon)",
          }}
        >
          BROWSE AGENTS
        </Link>
        <Link
          href="#"
          className="inline-flex items-center justify-center px-7 py-3 text-xs font-semibold tracking-[2px] transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]"
          style={{
            fontFamily: "var(--font-heading)",
            background: "transparent",
            color: "var(--cyan)",
            border: "1px solid var(--cyan)",
          }}
        >
          WATCH DEMO
        </Link>
      </div>
    </section>
  );
}
