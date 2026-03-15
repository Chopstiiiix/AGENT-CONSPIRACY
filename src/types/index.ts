export interface Agent {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  price: number;
  billingPeriod: string;
  status: "active" | "inactive" | "beta";
  capabilities: string[];
  integrations: AgentIntegration[];
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface AgentCategory {
  id: string;
  label: string;
  code: string;
  color: "neon" | "cyan" | "amber" | "pink";
  count: number;
}

export interface BillingPeriod {
  id: string;
  label: string;
  price: number;
  unit: string;
  savePct: number;
}

export interface Review {
  id: string;
  agentId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
}

export interface AgentIntegration {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
}
