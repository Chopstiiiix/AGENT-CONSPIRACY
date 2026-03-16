"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@clerk/nextjs";
import { getAgentBySlug } from "@/lib/data/agents";
import { StepBar } from "@/components/checkout/StepBar";
import { StepPlan } from "@/components/checkout/steps/StepPlan";
import { StepConfigure } from "@/components/checkout/steps/StepConfigure";
import { StepDeploy } from "@/components/checkout/steps/StepDeploy";

export interface CheckoutData {
  period: string;
  companyName: string;
  businessContext: string;
  integrations: string[];
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isSignedIn, isLoaded, userId } = useAuth();

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      const returnUrl = `/checkout?${searchParams.toString()}`;
      router.push(`/sign-in?redirect_url=${encodeURIComponent(returnUrl)}`);
    }
  }, [isLoaded, isSignedIn, router, searchParams]);

  const agentSlug = searchParams.get("agent") ?? "emily";
  const initialPeriod = searchParams.get("period") ?? "daily";
  const agent = getAgentBySlug(agentSlug);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [data, setData] = useState<CheckoutData>({
    period: initialPeriod,
    companyName: "",
    businessContext: "",
    integrations: [],
  });

  if (!agent) {
    router.push("/");
    return null;
  }

  if (!isLoaded || !isSignedIn) {
    return (
      <div
        className="flex items-center justify-center min-h-[60vh] text-[11px] tracking-[2px]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
      >
        AUTHENTICATING...
      </div>
    );
  }

  function update(partial: Partial<CheckoutData>) {
    setData((prev) => ({ ...prev, ...partial }));
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <StepBar currentStep={step} />

      {step === 1 && (
        <StepPlan
          data={data}
          onChange={update}
          onNext={() => setStep(2)}
          onBack={() => router.back()}
        />
      )}
      {step === 2 && (
        <StepConfigure
          data={data}
          onChange={update}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <StepDeploy
          data={data}
          agent={agent}
          userId={userId!}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  );
}

export default function CheckoutPage() {
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
      <CheckoutContent />
    </Suspense>
  );
}
