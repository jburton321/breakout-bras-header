import { Footer } from "@/components/breakout-bras/Footer";
import { HomeImageGallery } from "@/components/breakout-bras/HomeImageGallery";
import { MaternityHero } from "@/components/hero/MaternityHero";

export default function Home() {
  return (
    <div className="min-h-screen min-w-0 bg-white">
      <div className="relative min-w-0">
        <MaternityHero />
      </div>
      <HomeImageGallery />
      <Footer />
    </div>
  );
}
