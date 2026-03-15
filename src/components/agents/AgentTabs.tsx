"use client";

import { useState } from "react";
import type { AgentData } from "@/lib/data/agents";

const TABS = ["OVERVIEW", "SKILLS", "INTEGRATIONS", "REVIEWS"] as const;
type Tab = (typeof TABS)[number];

export function AgentTabs({ agent }: { agent: AgentData }) {
  const [active, setActive] = useState<Tab>("OVERVIEW");

  return (
    <div>
      {/* Tab bar */}
      <div
        className="flex gap-0 mb-6"
        style={{ borderBottom: "1px solid var(--border-dim)" }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className="px-4 py-3 text-[10px] tracking-[2px] transition-colors relative"
            style={{
              fontFamily: "var(--font-mono)",
              color: active === tab ? "var(--neon)" : "var(--text-secondary)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            {tab}
            {active === tab && (
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ background: "var(--neon)" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {active === "OVERVIEW" && <OverviewPanel agent={agent} />}
      {active === "SKILLS" && <SkillsPanel agent={agent} />}
      {active === "INTEGRATIONS" && <IntegrationsPanel agent={agent} />}
      {active === "REVIEWS" && <ReviewsPanel agent={agent} />}
    </div>
  );
}

function OverviewPanel({ agent }: { agent: AgentData }) {
  const perfStats = [
    { label: "Avg. handle time", value: "1m 42s" },
    { label: "First-contact resolution", value: "89%" },
    { label: "CSAT improvement", value: "+22%" },
    { label: "Escalation rate", value: "7.3%" },
    { label: "Languages supported", value: "42" },
    { label: "Avg. weekly learning delta", value: "+0.4%" },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Bio */}
      <div className="flex flex-col gap-4">
        {agent.bio.map((p, i) => (
          <p
            key={i}
            className="text-[13px] leading-relaxed"
            style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}
          >
            {p}
          </p>
        ))}
      </div>

      {/* 2-col: capabilities + performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3
            className="mb-4 text-[10px] tracking-[3px]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
          >
            {"// CORE_CAPABILITIES"}
          </h3>
          <ul className="flex flex-col gap-2">
            {agent.capabilities.map((cap) => (
              <li
                key={cap}
                className="text-[12px]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
              >
                <span style={{ color: "var(--neon)", marginRight: 8 }}>→</span>
                {cap}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3
            className="mb-4 text-[10px] tracking-[3px]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
          >
            {"// PERFORMANCE_STATS"}
          </h3>
          <ul className="flex flex-col gap-2">
            {perfStats.map((s) => (
              <li
                key={s.label}
                className="flex justify-between text-[12px]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <span style={{ color: "var(--text-secondary)" }}>{s.label}</span>
                <span style={{ color: "var(--text-primary)" }}>{s.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SkillsPanel({ agent }: { agent: AgentData }) {
  return (
    <div className="flex flex-col gap-4">
      {agent.skills.map((skill) => (
        <div key={skill.label} className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <span
              className="text-[11px]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
            >
              {skill.label}
            </span>
            <span
              className="text-[11px]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}
            >
              {skill.pct}%
            </span>
          </div>
          <div
            className="h-2 w-full overflow-hidden"
            style={{ background: "var(--surface-3)", borderRadius: 1 }}
          >
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${skill.pct}%`,
                background: "linear-gradient(90deg, var(--neon), var(--cyan))",
                borderRadius: 1,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function IntegrationsPanel({ agent }: { agent: AgentData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {agent.integrations.map((intg) => (
        <div
          key={intg.name}
          className="flex items-start gap-3 p-4"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border-dim)",
          }}
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center text-[10px] tracking-[1px] font-bold"
            style={{
              fontFamily: "var(--font-mono)",
              background: "var(--surface-3)",
              border: "1px solid var(--border-bright)",
              color: "var(--cyan)",
            }}
          >
            {intg.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col gap-1">
            <span
              className="text-[12px] font-semibold"
              style={{ fontFamily: "var(--font-body)", color: "var(--text-primary)" }}
            >
              {intg.name}
            </span>
            <span
              className="text-[11px] leading-relaxed"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
            >
              {intg.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReviewsPanel({ agent }: { agent: AgentData }) {
  return (
    <div className="flex flex-col gap-4">
      {agent.reviews.map((review, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 p-4"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border-dim)",
          }}
        >
          <div className="flex items-center justify-between">
            <span
              className="text-[12px] font-semibold"
              style={{ fontFamily: "var(--font-body)", color: "var(--text-primary)" }}
            >
              {review.company}
            </span>
            <span
              className="text-[10px]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
            >
              {review.date}
            </span>
          </div>
          <span
            className="text-[11px]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--amber)" }}
          >
            {"★".repeat(review.stars)}
            {"☆".repeat(5 - review.stars)}
          </span>
          <p
            className="text-[12px] leading-relaxed"
            style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}
          >
            {review.text}
          </p>
        </div>
      ))}
    </div>
  );
}
