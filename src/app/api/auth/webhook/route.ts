import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

interface ClerkWebhookEvent {
  type: string;
  data: {
    id: string;
    email_addresses?: { email_address: string; id: string }[];
    first_name?: string | null;
    last_name?: string | null;
    created_at?: number;
  };
}

export async function POST(req: NextRequest) {
  // In production, verify the Clerk webhook signature using svix.
  // See: https://clerk.com/docs/webhooks/sync-data
  const payload: ClerkWebhookEvent = await req.json();

  if (payload.type === "user.created") {
    const { id, email_addresses, first_name, last_name } = payload.data;
    const email = email_addresses?.[0]?.email_address ?? "";

    const supabase = createServerClient();

    const { error } = await supabase.from("users").insert({
      clerk_id: id,
      email,
      display_name: [first_name, last_name].filter(Boolean).join(" ") || null,
    });

    if (error) {
      console.error("[webhook] Failed to create user in Supabase:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
