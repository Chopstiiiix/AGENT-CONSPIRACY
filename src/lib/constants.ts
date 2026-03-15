import type { AgentCategory, BillingPeriod } from "@/types";

export const AGENT_CATEGORIES: AgentCategory[] = [
  { id: "customer-service", label: "Customer Service", code: "CS", color: "neon", count: 42 },
  { id: "finance", label: "Finance", code: "FIN", color: "cyan", count: 38 },
  { id: "sales", label: "Sales & Outreach", code: "SAL", color: "amber", count: 35 },
  { id: "hr", label: "Human Resources", code: "HR", color: "pink", count: 27 },
  { id: "legal", label: "Legal Review", code: "LGL", color: "cyan", count: 19 },
  { id: "data", label: "Data & Analytics", code: "DAT", color: "neon", count: 31 },
  { id: "operations", label: "Operations", code: "OPS", color: "amber", count: 24 },
  { id: "marketing", label: "Marketing", code: "MKT", color: "pink", count: 29 },
];

export const BILLING_PERIODS: BillingPeriod[] = [
  { id: "hourly", label: "Hourly", price: 8, unit: "hr", savePct: 0 },
  { id: "daily", label: "Daily", price: 58, unit: "day", savePct: 10 },
  { id: "monthly", label: "Monthly", price: 1152, unit: "mo", savePct: 20 },
  { id: "yearly", label: "Yearly", price: 11059, unit: "yr", savePct: 37 },
];
