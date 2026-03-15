import { getAgents } from "@/lib/data/queries";
import { AgentCard } from "@/components/agents/AgentCard";

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const sp = await searchParams;
  const agents = await getAgents({
    category: sp.category,
    search: sp.search,
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <span
          className="text-[11px] tracking-[3px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}
        >
          {"// ALL AGENTS"}
          {sp.category && (
            <span style={{ color: "var(--neon)" }}>
              {" "}
              — {sp.category.toUpperCase()}
            </span>
          )}
        </span>
        <span
          className="text-[10px] tracking-[1px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
        >
          {agents.length} RESULTS
        </span>
      </div>

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

      {agents.length === 0 && (
        <div
          className="flex items-center justify-center py-20 text-[12px] tracking-[2px]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
        >
          NO AGENTS FOUND
        </div>
      )}
    </div>
  );
}
