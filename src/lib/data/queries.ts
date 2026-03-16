import { agents as seedAgents, type AgentData } from "./agents";
import { AGENT_CATEGORIES } from "@/lib/constants";

// ─────────────────────────────────────────────────────────────────────
// Query layer — currently reads from the hardcoded seed data.
// When Supabase is connected, swap each function body to use
// createServerClient() from "@/lib/supabase".
// ─────────────────────────────────────────────────────────────────────

interface AgentFilters {
  category?: string;
  tier?: number;
  search?: string;
}

export async function getAgents(filters?: AgentFilters): Promise<AgentData[]> {
  let results = [...seedAgents];

  if (filters?.category) {
    // Resolve category id (e.g. "customer-service") to code (e.g. "CS")
    const cat = AGENT_CATEGORIES.find((c) => c.id === filters.category);
    const code = cat?.code?.toLowerCase();

    results = results.filter(
      (a) =>
        (code && a.code.toLowerCase() === code) ||
        a.code.toLowerCase() === filters.category!.toLowerCase() ||
        a.specialty.toLowerCase().includes(filters.category!.toLowerCase()),
    );
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.specialty.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  return results;
}

export async function getAgentBySlug(slug: string): Promise<AgentData | null> {
  return seedAgents.find((a) => a.slug === slug) ?? null;
}

export async function getAgentReviews(agentSlug: string) {
  const agent = seedAgents.find((a) => a.slug === agentSlug);
  return agent?.reviews ?? [];
}

export async function getFeaturedAgents(): Promise<AgentData[]> {
  return [...seedAgents]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
}

// ── Dashboard queries (seed-based stubs) ──────────────────────────

export interface ContractRecord {
  id: string;
  agentSlug: string;
  agentName: string;
  agentCode: string;
  specialty: string;
  accentColor: string;
  billingPeriod: string;
  status: "active" | "expired" | "cancelled";
  startedAt: string;
  endsAt: string | null;
  price: number;
  unit: string;
}

export interface InvoiceRecord {
  id: string;
  date: string;
  agentName: string;
  amount: number;
  status: "paid" | "pending";
}

// Stub contracts for demo — replace with Supabase query by userId
export async function getUserContracts(_userId: string): Promise<ContractRecord[]> {
  return [
    {
      id: "ctr-001",
      agentSlug: "emily",
      agentName: "EMILY",
      agentCode: "CS",
      specialty: "CUSTOMER SERVICE",
      accentColor: "#00ff88",
      billingPeriod: "daily",
      status: "active",
      startedAt: "2026-02-28",
      endsAt: null,
      price: 58,
      unit: "day",
    },
    {
      id: "ctr-002",
      agentSlug: "felix-3",
      agentName: "FELIX-3",
      agentCode: "FIN",
      specialty: "BOOKKEEPING",
      accentColor: "#00d4ff",
      billingPeriod: "monthly",
      status: "active",
      startedAt: "2026-01-15",
      endsAt: "2026-04-15",
      price: 1728,
      unit: "mo",
    },
  ];
}

export async function getUserInvoices(_userId: string): Promise<InvoiceRecord[]> {
  return [
    { id: "inv-001", date: "2026-03-01", agentName: "EMILY", amount: 58, status: "paid" },
    { id: "inv-002", date: "2026-03-01", agentName: "FELIX-3", amount: 1728, status: "paid" },
    { id: "inv-003", date: "2026-02-01", agentName: "EMILY", amount: 58, status: "paid" },
    { id: "inv-004", date: "2026-02-01", agentName: "FELIX-3", amount: 1728, status: "paid" },
    { id: "inv-005", date: "2026-01-15", agentName: "FELIX-3", amount: 1728, status: "paid" },
  ];
}
