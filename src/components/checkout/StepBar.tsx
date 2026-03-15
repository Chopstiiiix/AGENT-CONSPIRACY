"use client";

const STEPS = [
  { num: "01", label: "PLAN" },
  { num: "02", label: "CONFIGURE" },
  { num: "03", label: "DEPLOY" },
];

type StepStatus = "done" | "active" | "pending";

export function StepBar({ currentStep }: { currentStep: number }) {
  function status(idx: number): StepStatus {
    const step = idx + 1;
    if (step < currentStep) return "done";
    if (step === currentStep) return "active";
    return "pending";
  }

  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((s, i) => {
        const st = status(i);
        return (
          <div key={s.num} className="flex items-center">
            {/* Circle + label */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="flex h-9 w-9 items-center justify-center text-[11px] font-bold tracking-wider transition-all duration-300"
                style={{
                  fontFamily: "var(--font-heading)",
                  borderRadius: "50%",
                  ...(st === "done"
                    ? {
                        background: "var(--neon)",
                        color: "var(--background)",
                        border: "2px solid var(--neon)",
                        boxShadow: "0 0 10px rgba(0,255,136,0.3)",
                      }
                    : st === "active"
                      ? {
                          background: "transparent",
                          color: "var(--neon)",
                          border: "2px solid var(--neon)",
                        }
                      : {
                          background: "transparent",
                          color: "var(--text-tertiary)",
                          border: "2px solid var(--border-dim)",
                        }),
                }}
              >
                {st === "done" ? "✓" : s.num}
              </div>
              <span
                className="text-[9px] tracking-[2px] transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-mono)",
                  color:
                    st === "done"
                      ? "var(--neon)"
                      : st === "active"
                        ? "var(--neon)"
                        : "var(--text-tertiary)",
                }}
              >
                {s.label}
              </span>
            </div>

            {/* Connecting line */}
            {i < STEPS.length - 1 && (
              <div
                className="mx-4 h-px w-16 sm:w-24 transition-colors duration-300"
                style={{
                  background:
                    status(i) === "done" ? "var(--neon)" : "var(--border-dim)",
                  marginBottom: 24,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
