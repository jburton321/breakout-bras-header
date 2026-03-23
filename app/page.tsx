import { BreakoutBrasHeader } from "@/components/breakout-bras/BreakoutBrasHeader";
import { Footer } from "@/components/breakout-bras/Footer";
import { MaternityHero } from "@/components/hero/MaternityHero";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative">
        <BreakoutBrasHeader overlay />
        <MaternityHero />
      </div>
      <main className="mx-auto max-w-[1320px] px-4 py-16 text-center text-sm text-[#4D5152] sm:px-6 lg:px-8">
        <p>More content below the hero.</p>
      </main>
      <Footer />
    </div>
  );
}
