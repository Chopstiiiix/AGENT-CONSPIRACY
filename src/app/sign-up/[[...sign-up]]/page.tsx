import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          <span
            className="text-sm tracking-[3px]"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--neon)" }}
          >
            AGENT
          </span>
          <span
            className="text-sm tracking-[3px]"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--text-primary)" }}
          >
            CONSPIRACY
          </span>
        </div>

        <div
          className="p-1"
          style={{ border: "1px solid var(--border-dim)", background: "var(--surface-1)" }}
        >
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
          />
        </div>
      </div>
    </div>
  );
}
