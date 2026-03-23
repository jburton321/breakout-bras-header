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
      <Footer />
    </div>
  );
}
