import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// ── Client-side (browser) ──────────────────────────────────────────
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

// ── Server-side (Server Components / Route Handlers) ───────────────
// Uses the same anon key but runs on the server.
// For row-level security with Clerk JWTs, swap the anon key for the
// user's Supabase token when auth is wired up.
export function createServerClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: { persistSession: false },
    },
  );
}
