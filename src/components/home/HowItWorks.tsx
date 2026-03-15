const STEPS = [
  {
    num: "01",
    title: "BROWSE",
    desc: "Search our curated catalogue of specialised AI agents by category, skill, or rating.",
  },
  {
    num: "02",
    title: "CONFIGURE",
    desc: "Set parameters, connect integrations, and define the agent's operational scope.",
  },
  {
    num: "03",
    title: "DEPLOY",
    desc: "Activate your agent in seconds. It runs 24/7 on secure, isolated infrastructure.",
  },
  {
    num: "04",
    title: "TRAIN & IMPROVE",
    desc: "Fine-tune with feedback loops. Your agent learns your workflows and gets smarter.",
  },
];

export function HowItWorks() {
  return (
    <section
      className="px-6 py-16"
      style={{ borderTop: "1px solid var(--border-dim)" }}
    >
      <div className="mx-auto max-w-6xl">
        <span
          className="mb-10 block text-[11px] tracking-[3px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
        >
          {"// HOW IT WORKS"}
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step) => (
            <div key={step.num} className="flex flex-col gap-3">
              <span
                className="text-4xl"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--text-tertiary)",
                }}
              >
                {step.num}
              </span>
              <span
                className="text-sm tracking-[2px]"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--text-primary)",
                }}
              >
                {step.title}
              </span>
              <p
                className="text-[12px] leading-relaxed"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-secondary)",
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
