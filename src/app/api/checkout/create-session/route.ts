import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getAgentBySlug } from "@/lib/data/queries";

const PRICE_KEY: Record<string, "hourly" | "daily" | "monthly" | "yearly"> = {
  hourly: "hourly",
  daily: "daily",
  monthly: "monthly",
  yearly: "yearly",
};

export async function POST(req: NextRequest) {
  const { agentSlug, billingPeriod, userId } = (await req.json()) as {
    agentSlug: string;
    billingPeriod: string;
    userId: string;
  };

  const agent = await getAgentBySlug(agentSlug);
  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  const key = PRICE_KEY[billingPeriod];
  if (!key) {
    return NextResponse.json({ error: "Invalid billing period" }, { status: 400 });
  }

  const unitAmount = agent.price[key] * 100; // cents
  const isRecurring = billingPeriod === "monthly" || billingPeriod === "yearly";

  const origin = req.nextUrl.origin;

  const stripe = getStripe();

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: isRecurring ? "subscription" : "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${agent.name} — ${agent.specialty}`,
            description: `AI Agent deployment (${billingPeriod})`,
          },
          unit_amount: unitAmount,
          ...(isRecurring && {
            recurring: {
              interval: billingPeriod === "monthly" ? "month" : "year",
            },
          }),
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout?agent=${agentSlug}&period=${billingPeriod}`,
    metadata: {
      agentSlug,
      userId,
      billingPeriod,
    },
  };

  const session = await stripe.checkout.sessions.create(sessionParams);

  return NextResponse.json({ url: session.url });
}
