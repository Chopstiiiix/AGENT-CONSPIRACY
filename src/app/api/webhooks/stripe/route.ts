import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createServerClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[stripe-webhook] Signature verification failed:", message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { agentSlug, userId, billingPeriod } = session.metadata ?? {};

    if (agentSlug && userId && billingPeriod) {
      const supabase = createServerClient();

      const { data: agent } = await supabase
        .from("agents")
        .select("id")
        .eq("slug", agentSlug)
        .single();

      if (agent) {
        await supabase.from("contracts").insert({
          agent_id: agent.id,
          client_id: userId,
          billing_period: billingPeriod,
          status: "active",
          stripe_subscription_id: session.subscription?.toString() ?? session.payment_intent?.toString() ?? null,
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
