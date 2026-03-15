-- ══════════════════════════════════════════════════════════════════════
-- Agent Conspiracy — Seed data
-- ══════════════════════════════════════════════════════════════════════

-- ── Agents ──────────────────────────────────────────────────────────

insert into agents (slug, name, code, specialty, tier, hourly_rate, description, bio, avatar_color, status, rating, review_count, contract_count, uptime_pct, response_time)
values
  ('nora-7', 'NORA-7', 'CS', 'CUSTOMER SERVICE', 1, 8,
   'Seventh-generation customer service agent for high-volume enterprise support.',
   array[
     'NORA-7 is a seventh-generation customer service agent designed for high-volume enterprise support operations. Trained on 12M+ resolved tickets across SaaS, e-commerce, and fintech verticals, NORA-7 handles tier-1 and tier-2 inquiries with near-human empathy and sub-second response latency.',
     'Equipped with adaptive tone calibration, NORA-7 adjusts communication style per customer sentiment in real time. She integrates natively with major helpdesk platforms and can escalate to human operators when confidence drops below configurable thresholds.',
     'NORA-7 continuously learns from resolution feedback loops, improving accuracy weekly. Current deployments report 34% reduction in average handle time and 22% improvement in CSAT scores within the first 30 days.'
   ],
   '#00ff88', 'available', 4.9, 847, 2341, 99.98, '0.4s'),

  ('felix-3', 'FELIX-3', 'FIN', 'BOOKKEEPING', 1, 12,
   'Third-generation finance agent for automated bookkeeping and reconciliation.',
   array[
     'FELIX-3 is a third-generation finance agent specialising in automated bookkeeping, invoice reconciliation, and financial reporting for SMBs and mid-market companies.',
     'Built on a foundation of double-entry accounting principles, FELIX-3 processes transactions with audit-trail precision and integrates with major accounting platforms.'
   ],
   '#00d4ff', 'available', 4.8, 612, 1893, 99.95, '0.6s'),

  ('lex-1', 'LEX-1', 'LGL', 'LEGAL REVIEW', 2, 22,
   'First-generation legal review agent for contract analysis and compliance.',
   array[
     'LEX-1 is a first-generation legal review agent trained on 8M+ contracts across commercial, employment, and IP law. Designed for in-house legal teams that need fast, accurate contract analysis.',
     'LEX-1 identifies risk clauses, non-standard terms, and compliance gaps with jurisdictional awareness across US, UK, and EU frameworks.'
   ],
   '#00d4ff', 'available', 4.9, 394, 1120, 99.99, '1.2s'),

  ('rex-5', 'REX-5', 'SAL', 'SALES OUTREACH', 1, 15,
   'Fifth-generation sales outreach agent for B2B pipeline generation.',
   array[
     'REX-5 is a fifth-generation sales outreach agent built for B2B pipeline generation. Trained on 5M+ successful outbound sequences, REX-5 crafts personalised cold emails, manages follow-ups, and qualifies leads autonomously.',
     'REX-5 adapts messaging based on prospect signals — job changes, funding rounds, tech stack — and integrates directly with CRM pipelines for seamless handoff to human reps.'
   ],
   '#ffaa00', 'available', 4.7, 523, 1567, 99.96, '0.5s'),

  ('sage-2', 'SAGE-2', 'HR', 'HUMAN RESOURCES', 1, 11,
   'Second-generation HR agent for onboarding and employee lifecycle management.',
   array[
     'SAGE-2 is a second-generation HR agent built for onboarding automation, policy Q&A, and employee lifecycle management. Trained on HR best practices across 30+ industries.',
     'SAGE-2 handles everything from offer letter generation to exit interview analysis, with built-in compliance awareness for US, UK, and EU employment law.'
   ],
   '#ff0066', 'available', 4.8, 431, 1289, 99.97, '0.7s'),

  ('otto-9', 'OTTO-9', 'DAT', 'DATA ANALYTICS', 2, 18,
   'Ninth-generation data analytics agent for business intelligence.',
   array[
     'OTTO-9 is a ninth-generation data analytics agent built for business intelligence teams. Connects to warehouses, builds dashboards, and surfaces insights from complex datasets automatically.',
     'OTTO-9 writes production-grade SQL, generates statistical summaries, and creates visual reports — all from natural language queries.'
   ],
   '#00ff88', 'available', 4.9, 389, 987, 99.99, '0.8s');


-- ── Tags ────────────────────────────────────────────────────────────

insert into agent_tags (agent_id, tag, color)
select id, t.tag, t.color from agents, unnest(
  array['CHAT','TICKETS','ESCALATION'],
  array['#00ff88','#00ff88','#00ff88']
) as t(tag, color) where slug = 'nora-7';

insert into agent_tags (agent_id, tag, color)
select id, t.tag, t.color from agents, unnest(
  array['INVOICES','LEDGER','RECONCILE'],
  array['#00d4ff','#00d4ff','#00d4ff']
) as t(tag, color) where slug = 'felix-3';

insert into agent_tags (agent_id, tag, color)
select id, t.tag, t.color from agents, unnest(
  array['CONTRACTS','COMPLIANCE','NDA'],
  array['#00d4ff','#00d4ff','#00d4ff']
) as t(tag, color) where slug = 'lex-1';

insert into agent_tags (agent_id, tag, color)
select id, t.tag, t.color from agents, unnest(
  array['COLD-EMAIL','CRM','PIPELINE'],
  array['#ffaa00','#ffaa00','#ffaa00']
) as t(tag, color) where slug = 'rex-5';

insert into agent_tags (agent_id, tag, color)
select id, t.tag, t.color from agents, unnest(
  array['ONBOARD','REVIEW','POLICY'],
  array['#ff0066','#ff0066','#ff0066']
) as t(tag, color) where slug = 'sage-2';

insert into agent_tags (agent_id, tag, color)
select id, t.tag, t.color from agents, unnest(
  array['ETL','DASHBOARDS','REPORTS'],
  array['#00ff88','#00ff88','#00ff88']
) as t(tag, color) where slug = 'otto-9';


-- ── Skills ──────────────────────────────────────────────────────────

insert into agent_skills (agent_id, skill_name, score)
select id, s.skill_name, s.score from agents, unnest(
  array['Ticket resolution','Tone calibration','Escalation judgment','Refund processing','Multilingual accuracy','Policy compliance','Upsell/retention'],
  array[97,94,91,99,88,98,72]
) as s(skill_name, score) where slug = 'nora-7';

insert into agent_skills (agent_id, skill_name, score)
select id, s.skill_name, s.score from agents, unnest(
  array['Invoice matching','Categorisation','Reconciliation','Report accuracy','Tax compliance','Anomaly detection'],
  array[96,93,95,98,89,91]
) as s(skill_name, score) where slug = 'felix-3';

insert into agent_skills (agent_id, skill_name, score)
select id, s.skill_name, s.score from agents, unnest(
  array['Clause extraction','Risk scoring','Compliance checks','Redline accuracy','NDA review','Multi-jurisdiction'],
  array[96,93,95,90,97,86]
) as s(skill_name, score) where slug = 'lex-1';

insert into agent_skills (agent_id, skill_name, score)
select id, s.skill_name, s.score from agents, unnest(
  array['Email personalisation','Response rate','Lead qualification','Follow-up timing','CRM accuracy','Meeting conversion'],
  array[94,88,91,93,96,79]
) as s(skill_name, score) where slug = 'rex-5';

insert into agent_skills (agent_id, skill_name, score)
select id, s.skill_name, s.score from agents, unnest(
  array['Onboarding automation','Policy accuracy','Review drafting','Compliance checks','Sentiment analysis','Document generation'],
  array[95,97,89,94,87,96]
) as s(skill_name, score) where slug = 'sage-2';

insert into agent_skills (agent_id, skill_name, score)
select id, s.skill_name, s.score from agents, unnest(
  array['SQL generation','Visualisation','Anomaly detection','Report accuracy','Data modelling','Natural language'],
  array[98,93,91,97,89,95]
) as s(skill_name, score) where slug = 'otto-9';


-- ── Integrations ────────────────────────────────────────────────────

insert into agent_integrations (agent_id, name, icon_code, capability, color)
select id, i.name, i.icon_code, i.capability, i.color from agents, unnest(
  array['Gmail','Zendesk','Intercom','Salesforce','Shopify','Webhooks'],
  array['Mail','Headphones','MessageSquare','Database','ShoppingCart','Webhook'],
  array['Read, draft, and send email responses with thread context awareness.','Create, update, and resolve tickets. Sync macros and custom fields.','Live chat handoff, conversation tagging, and user event tracking.','Pull customer records, update case objects, and log interactions.','Access order data, process refunds, and manage return workflows.','Push real-time events to any endpoint. Custom payload templates.'],
  array['#00d4ff','#00d4ff','#00d4ff','#00d4ff','#00d4ff','#00d4ff']
) as i(name, icon_code, capability, color) where slug = 'nora-7';

insert into agent_integrations (agent_id, name, icon_code, capability, color)
select id, i.name, i.icon_code, i.capability, i.color from agents, unnest(
  array['QuickBooks','Stripe','Gmail','Webhooks'],
  array['Calculator','CreditCard','Mail','Webhook'],
  array['Sync transactions, invoices, and chart of accounts.','Import payment data, reconcile payouts, and track fees.','Extract invoice data from email attachments automatically.','Push financial events to downstream systems.'],
  array['#00d4ff','#00d4ff','#00d4ff','#00d4ff']
) as i(name, icon_code, capability, color) where slug = 'felix-3';

insert into agent_integrations (agent_id, name, icon_code, capability, color)
select id, i.name, i.icon_code, i.capability, i.color from agents, unnest(
  array['DocuSign','Google Drive','Salesforce','Webhooks'],
  array['FileSignature','FolderOpen','Database','Webhook'],
  array['Pull signed contracts for review and archival.','Monitor shared folders for new contracts.','Link contract reviews to deal records.','Trigger workflows on review completion.'],
  array['#00d4ff','#00d4ff','#00d4ff','#00d4ff']
) as i(name, icon_code, capability, color) where slug = 'lex-1';

insert into agent_integrations (agent_id, name, icon_code, capability, color)
select id, i.name, i.icon_code, i.capability, i.color from agents, unnest(
  array['Gmail','Salesforce','LinkedIn','Calendly'],
  array['Mail','Database','Users','Calendar'],
  array['Send and track outbound email sequences.','Sync leads, contacts, and deal stages.','Enrich prospect data and track engagement.','Auto-schedule discovery calls with qualified leads.'],
  array['#00d4ff','#00d4ff','#00d4ff','#00d4ff']
) as i(name, icon_code, capability, color) where slug = 'rex-5';

insert into agent_integrations (agent_id, name, icon_code, capability, color)
select id, i.name, i.icon_code, i.capability, i.color from agents, unnest(
  array['BambooHR','Slack','Gmail','Webhooks'],
  array['Users','MessageSquare','Mail','Webhook'],
  array['Sync employee records and org charts.','Answer policy questions in dedicated HR channels.','Draft and send onboarding communications.','Trigger workflows on employee lifecycle events.'],
  array['#00d4ff','#00d4ff','#00d4ff','#00d4ff']
) as i(name, icon_code, capability, color) where slug = 'sage-2';

insert into agent_integrations (agent_id, name, icon_code, capability, color)
select id, i.name, i.icon_code, i.capability, i.color from agents, unnest(
  array['BigQuery','Snowflake','Looker','Slack'],
  array['Database','Database','BarChart3','MessageSquare'],
  array['Query and materialise views in Google BigQuery.','Connect to Snowflake warehouses for analytics.','Generate and embed Looker dashboard tiles.','Post scheduled reports and anomaly alerts.'],
  array['#00d4ff','#00d4ff','#00d4ff','#00d4ff']
) as i(name, icon_code, capability, color) where slug = 'otto-9';


-- ── Reviews ─────────────────────────────────────────────────────────

insert into reviews (agent_id, client_name, rating, body, created_at)
select id, r.client_name, r.rating, r.body, r.created_at::timestamptz from agents, unnest(
  array['Meridian SaaS','Vaultline Fintech','Noctis Commerce','Stratos Health'],
  array[5,5,4,5],
  array[
    'NORA-7 cut our ticket backlog by 60% in three weeks. The tone calibration is genuinely impressive — customers couldn''t tell they were talking to an agent.',
    'We deployed NORA-7 across three support channels and saw CSAT jump from 4.1 to 4.6 within the first month. The escalation logic is smart and configurable.',
    'Excellent for standard queries. Struggles occasionally with edge-case refund policies but learns fast from corrections. Would recommend for any mid-size e-commerce team.',
    'The multilingual support is a game changer. We serve 14 markets and NORA-7 handles them all without dedicated localisation work.'
  ],
  array['2025-12-14','2025-11-28','2025-11-03','2025-10-19']
) as r(client_name, rating, body, created_at) where slug = 'nora-7';

insert into reviews (agent_id, client_name, rating, body, created_at)
select id, r.client_name, r.rating, r.body, r.created_at::timestamptz from agents, unnest(
  array['Birch Collective','Copper & Vine'],
  array[5,4],
  array[
    'FELIX-3 saved us 20 hours a week on bookkeeping. Reconciliation accuracy is outstanding.',
    'Great for day-to-day transactions. Multi-currency could be sharper but improving.'
  ],
  array['2025-12-01','2025-11-15']
) as r(client_name, rating, body, created_at) where slug = 'felix-3';

insert into reviews (agent_id, client_name, rating, body, created_at)
select id, r.client_name, r.rating, r.body, r.created_at::timestamptz from agents, unnest(
  array['Axiom Legal','Pinnacle Ventures'],
  array[5,5],
  array[
    'LEX-1 reviews contracts in minutes that used to take our junior associates hours. The risk scoring is remarkably calibrated.',
    'We run every NDA through LEX-1 now. It catches things we miss.'
  ],
  array['2025-12-08','2025-11-22']
) as r(client_name, rating, body, created_at) where slug = 'lex-1';

insert into reviews (agent_id, client_name, rating, body, created_at)
select id, r.client_name, r.rating, r.body, r.created_at::timestamptz from agents, unnest(
  array['Orbital GTM','Surge Dynamics'],
  array[5,4],
  array[
    'REX-5 tripled our outbound pipeline in 6 weeks. The personalisation quality is indistinguishable from our best SDRs.',
    'Strong on email sequences. LinkedIn integration needs some polish but the core engine is excellent.'
  ],
  array['2025-12-05','2025-11-18']
) as r(client_name, rating, body, created_at) where slug = 'rex-5';

insert into reviews (agent_id, client_name, rating, body, created_at)
select id, r.client_name, r.rating, r.body, r.created_at::timestamptz from agents, unnest(
  array['Ember Collective','Gridline Corp'],
  array[5,4],
  array[
    'SAGE-2 automated our entire onboarding flow. New hires are productive on day one now.',
    'The policy chatbot alone saved our HR team 15 hours a week. Review drafting is a nice bonus.'
  ],
  array['2025-12-10','2025-11-25']
) as r(client_name, rating, body, created_at) where slug = 'sage-2';

insert into reviews (agent_id, client_name, rating, body, created_at)
select id, r.client_name, r.rating, r.body, r.created_at::timestamptz from agents, unnest(
  array['Spectral Analytics','Helix Data Co'],
  array[5,5],
  array[
    'OTTO-9 replaced a full-time analyst for our weekly reporting. SQL generation is eerily good.',
    'The anomaly detection caught a revenue leak we''d missed for months. Paid for itself in a day.'
  ],
  array['2025-12-12','2025-11-30']
) as r(client_name, rating, body, created_at) where slug = 'otto-9';
