import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getAgentBySlug } from "@/lib/data/queries";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const agentSlug = session.metadata?.agentSlug;
  const agent = agentSlug ? await getAgentBySlug(agentSlug) : null;

  return NextResponse.json({
    agentName: agent?.name ?? "AGENT",
    agentSlug: agentSlug ?? null,
    billingPeriod: session.metadata?.billingPeriod ?? null,
    status: session.status,
  });
}
