import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { EMILY_SYSTEM_PROMPT, EMILY_METADATA } from "@/lib/agents/emily";

let _client: Anthropic | null = null;
function getClient() {
  if (!_client) {
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
  }
  return _client;
}

interface WebhookPayload {
  type: "ticket" | "email" | "chat";
  from: string;
  subject?: string;
  body: string;
  metadata?: Record<string, string>;
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const expectedToken = process.env.AGENT_WEBHOOK_SECRET;

  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload: WebhookPayload = await req.json();

  if (!payload.body || !payload.type) {
    return NextResponse.json(
      { error: "Missing required fields: type, body" },
      { status: 400 },
    );
  }

  const contextPrefix = payload.type === "ticket"
    ? `[INCOMING TICKET from ${payload.from}] Subject: ${payload.subject ?? "No subject"}\n\n`
    : payload.type === "email"
      ? `[INCOMING EMAIL from ${payload.from}] Subject: ${payload.subject ?? "No subject"}\n\n`
      : `[LIVE CHAT from ${payload.from}]\n\n`;

  const client = getClient();

  const response = await client.messages.create({
    model: EMILY_METADATA.model,
    max_tokens: EMILY_METADATA.maxTokens,
    temperature: EMILY_METADATA.temperature,
    system: EMILY_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: contextPrefix + payload.body,
      },
    ],
  });

  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("");

  return NextResponse.json({
    agent: EMILY_METADATA.name,
    response: text,
    type: payload.type,
    usage: {
      input_tokens: response.usage.input_tokens,
      output_tokens: response.usage.output_tokens,
    },
  });
}
