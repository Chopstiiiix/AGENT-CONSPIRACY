import { HeroSection } from "@/components/home/HeroSection";
import { StatsStrip } from "@/components/home/StatsStrip";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedAgents } from "@/components/home/FeaturedAgents";
import { HowItWorks } from "@/components/home/HowItWorks";
import { getFeaturedAgents } from "@/lib/data/queries";

export default async function HomePage() {
  const featured = await getFeaturedAgents();

  return (
    <main>
      <HeroSection />
      <StatsStrip />
      <CategoryGrid />
      <FeaturedAgents agents={featured} />
      <HowItWorks />
    </main>
  );
}
