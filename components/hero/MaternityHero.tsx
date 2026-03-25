"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/breakout-bras/Logo";
import { BraFitQuiz } from "./BraFitQuiz";
import { SLIDE_BG_CROSSFADE_EASE, SLIDE_BG_CROSSFADE_MS } from "@/lib/heroSlideMotion";

const SLIDES: Array<{
  id: string;
  title: [string, string];
  subtitle: string;
  href: string;
  backgroundImage?: string;
}> = [
  {
    id: "bras",
    title: ["Say Goodbye to", "Bad Bra Days"],
    subtitle:
      "Find your perfect fit with this quick 1-minute quiz.",
    href: "/bras",
    backgroundImage: "/images/Slide1.png",
  },
  {
    id: "fitting",
    title: ["Get Fit", "by the Pros"],
    subtitle:
      "Let our expert team guide you. Book your dedicated in-store or virtual appointment now.",
    href: "/appointments",
    backgroundImage: "/images/Slide2.png",
  },
  {
    id: "sports",
    title: ["Strong, Soft, and", "Completely Secure"],
    subtitle:
      "Experience bras that move with you, offering unbeatable support, comfort, and real lift.",
    href: "/bras",
    backgroundImage: "/images/Slide3.png",
  },
];

const ROTATE_MS = 6500;

type MaternityHeroProps = {
  backgroundImage?: string;
};

export function MaternityHero({ backgroundImage }: MaternityHeroProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  const slide = SLIDES[active];

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="Featured"
      style={
        {
          "--hero-slide-copy-duration": `${SLIDE_BG_CROSSFADE_MS}ms`,
          "--hero-slide-copy-ease": SLIDE_BG_CROSSFADE_EASE,
        } as React.CSSProperties
      }
    >
      {/* Background: stacked layers, opacity-only crossfade — no Framer */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {SLIDES.map((s, i) => {
          const src = s.backgroundImage ?? backgroundImage;
          if (!src) return null;
          return (
            <div
              key={s.id}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity"
              style={{
                backgroundImage: `url(${src})`,
                opacity: i === active ? 1 : 0,
                transitionDuration: `${SLIDE_BG_CROSSFADE_MS}ms`,
                transitionTimingFunction: SLIDE_BG_CROSSFADE_EASE,
                zIndex: i === active ? 1 : 0,
              }}
            />
          );
        })}
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0.35)_50%,transparent_100%)]"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col">
        <div className="flex min-h-[min(55vh,480px)] flex-col items-start justify-center px-page pt-16 pb-2 text-left sm:pt-20">
          <div className="relative mx-auto min-h-[22rem] w-full max-w-wrapper sm:min-h-[24rem]">
            <div className="absolute left-0 top-0 w-full max-w-2xl">
              <div className="mb-6 [&_svg]:h-20 [&_svg]:w-auto sm:[&_svg]:h-24">
                <Logo />
              </div>

              <div className="relative h-[23rem] w-full overflow-hidden sm:h-[25rem] md:h-[26rem]">
                <article
                  key={active}
                  className="hero-slide-copy-in absolute inset-0 flex max-w-2xl flex-col justify-start"
                  aria-live="polite"
                >
                  <div className="min-h-[7.5rem] sm:min-h-[8.5rem] md:min-h-[9.5rem]">
                    <h1 className="text-4xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
                      {slide.title[0]}
                      <br />
                      {slide.title[1]}
                    </h1>
                  </div>
                  <p className="mt-2 max-w-lg text-base leading-snug text-neutral-800 sm:text-lg md:text-xl">
                    {slide.subtitle}
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>

        <div
          id="find-my-fit-quiz"
          className="scroll-mt-24 w-full px-page pb-16 pt-0 sm:pb-8"
        >
          <div className="mx-auto w-full max-w-wrapper">
            <BraFitQuiz />
          </div>
        </div>
      </div>
    </section>
  );
}
