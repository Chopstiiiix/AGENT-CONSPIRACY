import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getAgentBySlug } from "@/lib/data/queries";

export async function GET(req: NextRequest) {
  const stripe = getStripe();
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
