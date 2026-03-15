"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { DeploySuccess } from "@/components/checkout/DeploySuccess";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [agentName, setAgentName] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setError(true);
      return;
    }

    fetch(`/api/checkout/session?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.agentName) setAgentName(data.agentName);
        else setAgentName("AGENT");
      })
      .catch(() => setAgentName("AGENT"));
  }, [sessionId]);

  if (error) {
    return (
      <div
        className="flex items-center justify-center min-h-[60vh] text-[11px] tracking-[2px]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
      >
        INVALID SESSION
      </div>
    );
  }

  if (!agentName) {
    return (
      <div
        className="flex items-center justify-center min-h-[60vh] text-[11px] tracking-[2px]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
      >
        VERIFYING PAYMENT...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <DeploySuccess agentName={agentName} />
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div
          className="flex items-center justify-center min-h-[60vh] text-[11px] tracking-[2px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
        >
          LOADING...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
