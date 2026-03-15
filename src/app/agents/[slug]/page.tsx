import { notFound } from "next/navigation";
import { agents } from "@/lib/data/agents";
import { getAgentBySlug } from "@/lib/data/queries";
import { AgentHeader } from "@/components/agents/AgentHeader";
import { AgentTabs } from "@/components/agents/AgentTabs";
import { HirePanel } from "@/components/agents/HirePanel";

export function generateStaticParams() {
  return agents.map((a) => ({ slug: a.slug }));
}

export default async function AgentProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  if (!agent) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <AgentHeader agent={agent} />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6">
        <AgentTabs agent={agent} />
        <HirePanel agent={agent} />
      </div>
    </div>
  );
}
