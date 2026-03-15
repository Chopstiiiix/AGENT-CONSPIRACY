import { AgentCard } from "@/components/agents/AgentCard";
import type { AgentData } from "@/lib/data/agents";

export function FeaturedAgents({ agents }: { agents: AgentData[] }) {
  return (
    <section className="px-6 py-16" style={{ background: "var(--surface-1)" }}>
      <div className="mx-auto max-w-6xl">
        <span
          className="mb-8 block text-[11px] tracking-[3px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
        >
          {"// FEATURED AGENTS"}
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {agents.map((agent) => (
            <AgentCard
              key={agent.slug}
              name={agent.name}
              code={agent.code}
              specialty={agent.specialty}
              tags={agent.tags}
              price={agent.price.hourly}
              rating={agent.rating}
              accentColor={agent.accentColor}
              slug={agent.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
