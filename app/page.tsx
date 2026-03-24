import { Footer } from "@/components/breakout-bras/Footer";
import { HomeImageGallery } from "@/components/breakout-bras/HomeImageGallery";
import { MaternityHero } from "@/components/hero/MaternityHero";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative">
        <MaternityHero />
      </div>
      <HomeImageGallery />
      <Footer />
    </div>
  );
}
