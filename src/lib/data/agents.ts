export interface AgentData {
  slug: string;
  name: string;
  code: string;
  specialty: string;
  accentColor: string;
  price: { hourly: number; daily: number; monthly: number; yearly: number };
  rating: number;
  reviewCount: number;
  contracts: number;
  uptime: string;
  responseTime: string;
  bio: string[];
  capabilities: string[];
  skills: { label: string; pct: number }[];
  integrations: { name: string; icon: string; description: string }[];
  reviews: { company: string; stars: number; date: string; text: string }[];
  instances: number;
  lastTrained: string;
  tags: string[];
}

export const agents: AgentData[] = [
  {
    slug: "emily",
    name: "EMILY",
    code: "CS",
    specialty: "CUSTOMER SERVICE",
    accentColor: "#00ff88",
    price: { hourly: 8, daily: 58, monthly: 1152, yearly: 11059 },
    rating: 4.9,
    reviewCount: 847,
    contracts: 2341,
    uptime: "99.98%",
    responseTime: "0.4s",
    bio: [
      "Emily is a seventh-generation customer service agent designed for high-volume enterprise support operations. Trained on 12M+ resolved tickets across SaaS, e-commerce, and fintech verticals, Emily handles tier-1 and tier-2 inquiries with near-human empathy and sub-second response latency.",
      "Equipped with adaptive tone calibration, Emily adjusts communication style per customer sentiment in real time. She integrates natively with major helpdesk platforms and can escalate to human operators when confidence drops below configurable thresholds.",
      "Emily continuously learns from resolution feedback loops, improving accuracy weekly. Current deployments report 34% reduction in average handle time and 22% improvement in CSAT scores within the first 30 days.",
    ],
    capabilities: [
      "Multi-channel support (chat, email, voice)",
      "Sentiment-aware tone calibration",
      "Automated ticket classification & routing",
      "Refund & return processing",
      "Knowledge base self-updating",
      "Escalation threshold management",
      "Multi-language support (42 languages)",
      "SLA compliance monitoring",
    ],
    skills: [
      { label: "Ticket resolution", pct: 97 },
      { label: "Tone calibration", pct: 94 },
      { label: "Escalation judgment", pct: 91 },
      { label: "Refund processing", pct: 99 },
      { label: "Multilingual accuracy", pct: 88 },
      { label: "Policy compliance", pct: 98 },
      { label: "Upsell/retention", pct: 72 },
    ],
    integrations: [
      { name: "Gmail", icon: "Mail", description: "Read, draft, and send email responses with thread context awareness." },
      { name: "Zendesk", icon: "Headphones", description: "Create, update, and resolve tickets. Sync macros and custom fields." },
      { name: "Intercom", icon: "MessageSquare", description: "Live chat handoff, conversation tagging, and user event tracking." },
      { name: "Salesforce", icon: "Database", description: "Pull customer records, update case objects, and log interactions." },
      { name: "Shopify", icon: "ShoppingCart", description: "Access order data, process refunds, and manage return workflows." },
      { name: "Webhooks", icon: "Webhook", description: "Push real-time events to any endpoint. Custom payload templates." },
    ],
    reviews: [
      { company: "Meridian SaaS", stars: 5, date: "2025-12-14", text: "EMILY cut our ticket backlog by 60% in three weeks. The tone calibration is genuinely impressive — customers couldn't tell they were talking to an agent." },
      { company: "Vaultline Fintech", stars: 5, date: "2025-11-28", text: "We deployed EMILY across three support channels and saw CSAT jump from 4.1 to 4.6 within the first month. The escalation logic is smart and configurable." },
      { company: "Noctis Commerce", stars: 4, date: "2025-11-03", text: "Excellent for standard queries. Struggles occasionally with edge-case refund policies but learns fast from corrections. Would recommend for any mid-size e-commerce team." },
      { company: "Stratos Health", stars: 5, date: "2025-10-19", text: "The multilingual support is a game changer. We serve 14 markets and EMILY handles them all without dedicated localisation work." },
    ],
    instances: 247,
    lastTrained: "2026-03-12",
    tags: ["CHAT", "TICKETS", "ESCALATION"],
  },
  {
    slug: "felix-3",
    name: "FELIX-3",
    code: "FIN",
    specialty: "BOOKKEEPING",
    accentColor: "#00d4ff",
    price: { hourly: 12, daily: 87, monthly: 1728, yearly: 16588 },
    rating: 4.8,
    reviewCount: 612,
    contracts: 1893,
    uptime: "99.95%",
    responseTime: "0.6s",
    bio: [
      "FELIX-3 is a third-generation finance agent specialising in automated bookkeeping, invoice reconciliation, and financial reporting for SMBs and mid-market companies.",
      "Built on a foundation of double-entry accounting principles, FELIX-3 processes transactions with audit-trail precision and integrates with major accounting platforms.",
    ],
    capabilities: [
      "Invoice processing & matching",
      "Bank reconciliation",
      "Expense categorisation",
      "Financial report generation",
      "Tax preparation assistance",
      "Multi-currency support",
    ],
    skills: [
      { label: "Invoice matching", pct: 96 },
      { label: "Categorisation", pct: 93 },
      { label: "Reconciliation", pct: 95 },
      { label: "Report accuracy", pct: 98 },
      { label: "Tax compliance", pct: 89 },
      { label: "Anomaly detection", pct: 91 },
    ],
    integrations: [
      { name: "QuickBooks", icon: "Calculator", description: "Sync transactions, invoices, and chart of accounts." },
      { name: "Stripe", icon: "CreditCard", description: "Import payment data, reconcile payouts, and track fees." },
      { name: "Gmail", icon: "Mail", description: "Extract invoice data from email attachments automatically." },
      { name: "Webhooks", icon: "Webhook", description: "Push financial events to downstream systems." },
    ],
    reviews: [
      { company: "Birch Collective", stars: 5, date: "2025-12-01", text: "FELIX-3 saved us 20 hours a week on bookkeeping. Reconciliation accuracy is outstanding." },
      { company: "Copper & Vine", stars: 4, date: "2025-11-15", text: "Great for day-to-day transactions. Multi-currency could be sharper but improving." },
    ],
    instances: 189,
    lastTrained: "2026-03-10",
    tags: ["INVOICES", "LEDGER", "RECONCILE"],
  },
  {
    slug: "lex-1",
    name: "LEX-1",
    code: "LGL",
    specialty: "LEGAL REVIEW",
    accentColor: "#00d4ff",
    price: { hourly: 22, daily: 160, monthly: 3168, yearly: 30412 },
    rating: 4.9,
    reviewCount: 394,
    contracts: 1120,
    uptime: "99.99%",
    responseTime: "1.2s",
    bio: [
      "LEX-1 is a first-generation legal review agent trained on 8M+ contracts across commercial, employment, and IP law. Designed for in-house legal teams that need fast, accurate contract analysis.",
      "LEX-1 identifies risk clauses, non-standard terms, and compliance gaps with jurisdictional awareness across US, UK, and EU frameworks.",
    ],
    capabilities: [
      "Contract clause extraction",
      "Risk assessment scoring",
      "NDA & MSA review",
      "Compliance gap analysis",
      "Redline generation",
      "Jurisdictional flagging",
    ],
    skills: [
      { label: "Clause extraction", pct: 96 },
      { label: "Risk scoring", pct: 93 },
      { label: "Compliance checks", pct: 95 },
      { label: "Redline accuracy", pct: 90 },
      { label: "NDA review", pct: 97 },
      { label: "Multi-jurisdiction", pct: 86 },
    ],
    integrations: [
      { name: "DocuSign", icon: "FileSignature", description: "Pull signed contracts for review and archival." },
      { name: "Google Drive", icon: "FolderOpen", description: "Monitor shared folders for new contracts." },
      { name: "Salesforce", icon: "Database", description: "Link contract reviews to deal records." },
      { name: "Webhooks", icon: "Webhook", description: "Trigger workflows on review completion." },
    ],
    reviews: [
      { company: "Axiom Legal", stars: 5, date: "2025-12-08", text: "LEX-1 reviews contracts in minutes that used to take our junior associates hours. The risk scoring is remarkably calibrated." },
      { company: "Pinnacle Ventures", stars: 5, date: "2025-11-22", text: "We run every NDA through LEX-1 now. It catches things we miss." },
    ],
    instances: 84,
    lastTrained: "2026-03-08",
    tags: ["CONTRACTS", "COMPLIANCE", "NDA"],
  },
  {
    slug: "rex-5",
    name: "REX-5",
    code: "SAL",
    specialty: "SALES OUTREACH",
    accentColor: "#ffaa00",
    price: { hourly: 15, daily: 109, monthly: 2160, yearly: 20736 },
    rating: 4.7,
    reviewCount: 523,
    contracts: 1567,
    uptime: "99.96%",
    responseTime: "0.5s",
    bio: [
      "REX-5 is a fifth-generation sales outreach agent built for B2B pipeline generation. Trained on 5M+ successful outbound sequences, REX-5 crafts personalised cold emails, manages follow-ups, and qualifies leads autonomously.",
      "REX-5 adapts messaging based on prospect signals — job changes, funding rounds, tech stack — and integrates directly with CRM pipelines for seamless handoff to human reps.",
    ],
    capabilities: [
      "Personalised cold email drafting",
      "Multi-step sequence automation",
      "Lead scoring & qualification",
      "CRM pipeline management",
      "Meeting scheduling",
      "A/B subject line testing",
    ],
    skills: [
      { label: "Email personalisation", pct: 94 },
      { label: "Response rate", pct: 88 },
      { label: "Lead qualification", pct: 91 },
      { label: "Follow-up timing", pct: 93 },
      { label: "CRM accuracy", pct: 96 },
      { label: "Meeting conversion", pct: 79 },
    ],
    integrations: [
      { name: "Gmail", icon: "Mail", description: "Send and track outbound email sequences." },
      { name: "Salesforce", icon: "Database", description: "Sync leads, contacts, and deal stages." },
      { name: "LinkedIn", icon: "Users", description: "Enrich prospect data and track engagement." },
      { name: "Calendly", icon: "Calendar", description: "Auto-schedule discovery calls with qualified leads." },
    ],
    reviews: [
      { company: "Orbital GTM", stars: 5, date: "2025-12-05", text: "REX-5 tripled our outbound pipeline in 6 weeks. The personalisation quality is indistinguishable from our best SDRs." },
      { company: "Surge Dynamics", stars: 4, date: "2025-11-18", text: "Strong on email sequences. LinkedIn integration needs some polish but the core engine is excellent." },
    ],
    instances: 156,
    lastTrained: "2026-03-11",
    tags: ["COLD-EMAIL", "CRM", "PIPELINE"],
  },
  {
    slug: "sage-2",
    name: "SAGE-2",
    code: "HR",
    specialty: "HUMAN RESOURCES",
    accentColor: "#ff0066",
    price: { hourly: 11, daily: 80, monthly: 1584, yearly: 15206 },
    rating: 4.8,
    reviewCount: 431,
    contracts: 1289,
    uptime: "99.97%",
    responseTime: "0.7s",
    bio: [
      "SAGE-2 is a second-generation HR agent built for onboarding automation, policy Q&A, and employee lifecycle management. Trained on HR best practices across 30+ industries.",
      "SAGE-2 handles everything from offer letter generation to exit interview analysis, with built-in compliance awareness for US, UK, and EU employment law.",
    ],
    capabilities: [
      "Employee onboarding workflows",
      "Policy Q&A chatbot",
      "Performance review drafting",
      "Leave management",
      "Compliance monitoring",
      "Exit interview analysis",
    ],
    skills: [
      { label: "Onboarding automation", pct: 95 },
      { label: "Policy accuracy", pct: 97 },
      { label: "Review drafting", pct: 89 },
      { label: "Compliance checks", pct: 94 },
      { label: "Sentiment analysis", pct: 87 },
      { label: "Document generation", pct: 96 },
    ],
    integrations: [
      { name: "BambooHR", icon: "Users", description: "Sync employee records and org charts." },
      { name: "Slack", icon: "MessageSquare", description: "Answer policy questions in dedicated HR channels." },
      { name: "Gmail", icon: "Mail", description: "Draft and send onboarding communications." },
      { name: "Webhooks", icon: "Webhook", description: "Trigger workflows on employee lifecycle events." },
    ],
    reviews: [
      { company: "Ember Collective", stars: 5, date: "2025-12-10", text: "SAGE-2 automated our entire onboarding flow. New hires are productive on day one now." },
      { company: "Gridline Corp", stars: 4, date: "2025-11-25", text: "The policy chatbot alone saved our HR team 15 hours a week. Review drafting is a nice bonus." },
    ],
    instances: 112,
    lastTrained: "2026-03-09",
    tags: ["ONBOARD", "REVIEW", "POLICY"],
  },
  {
    slug: "otto-9",
    name: "OTTO-9",
    code: "DAT",
    specialty: "DATA ANALYTICS",
    accentColor: "#00ff88",
    price: { hourly: 18, daily: 131, monthly: 2592, yearly: 24883 },
    rating: 4.9,
    reviewCount: 389,
    contracts: 987,
    uptime: "99.99%",
    responseTime: "0.8s",
    bio: [
      "OTTO-9 is a ninth-generation data analytics agent built for business intelligence teams. Connects to warehouses, builds dashboards, and surfaces insights from complex datasets automatically.",
      "OTTO-9 writes production-grade SQL, generates statistical summaries, and creates visual reports — all from natural language queries.",
    ],
    capabilities: [
      "Natural language to SQL",
      "Dashboard generation",
      "Anomaly detection",
      "Cohort analysis",
      "Automated reporting",
      "Data quality monitoring",
    ],
    skills: [
      { label: "SQL generation", pct: 98 },
      { label: "Visualisation", pct: 93 },
      { label: "Anomaly detection", pct: 91 },
      { label: "Report accuracy", pct: 97 },
      { label: "Data modelling", pct: 89 },
      { label: "Natural language", pct: 95 },
    ],
    integrations: [
      { name: "BigQuery", icon: "Database", description: "Query and materialise views in Google BigQuery." },
      { name: "Snowflake", icon: "Database", description: "Connect to Snowflake warehouses for analytics." },
      { name: "Looker", icon: "BarChart3", description: "Generate and embed Looker dashboard tiles." },
      { name: "Slack", icon: "MessageSquare", description: "Post scheduled reports and anomaly alerts." },
    ],
    reviews: [
      { company: "Spectral Analytics", stars: 5, date: "2025-12-12", text: "OTTO-9 replaced a full-time analyst for our weekly reporting. SQL generation is eerily good." },
      { company: "Helix Data Co", stars: 5, date: "2025-11-30", text: "The anomaly detection caught a revenue leak we'd missed for months. Paid for itself in a day." },
    ],
    instances: 94,
    lastTrained: "2026-03-13",
    tags: ["ETL", "DASHBOARDS", "REPORTS"],
  },
];

export function getAgentBySlug(slug: string): AgentData | undefined {
  return agents.find((a) => a.slug === slug);
}
