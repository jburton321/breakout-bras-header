"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { Logo } from "@/components/breakout-bras/Logo";
import { BraFitQuiz } from "./BraFitQuiz";
import {
  SLIDE_BG_CROSSFADE_EASE,
  SLIDE_BG_CROSSFADE_MS,
  SLIDE_COPY_FADE_EASE,
  SLIDE_COPY_FADE_MS,
} from "@/lib/heroSlideMotion";

const SLIDES: Array<{
  id: string;
  title: [string, string];
  subtitle: string;
  href: string;
  /** Shown at `sm` and up; hidden on narrow viewports. */
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
      className="relative isolate min-h-[min(28vh,280px)] w-full overflow-hidden"
      aria-label="Featured"
      style={
        {
          "--hero-slide-copy-duration": `${SLIDE_COPY_FADE_MS}ms`,
          "--hero-slide-copy-ease": SLIDE_COPY_FADE_EASE,
        } as CSSProperties
      }
    >
      {/* Background: slider images desktop/tablet only; mobile uses solid fill (no M-* slides). */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[#fafaf8] sm:bg-transparent"
        aria-hidden
      >
        {SLIDES.map((s, i) => {
          const desktopSrc = s.backgroundImage ?? backgroundImage;
          if (!desktopSrc) return null;
          const isActive = i === active;
          const layerTransition = {
            opacity: isActive ? 1 : 0,
            transitionDuration: `${SLIDE_BG_CROSSFADE_MS}ms`,
            transitionTimingFunction: SLIDE_BG_CROSSFADE_EASE,
          } as const;
          return (
            <div
              key={s.id}
              className="absolute inset-0 hidden sm:block"
              style={{ zIndex: isActive ? 1 : 0 }}
            >
              <div className="relative h-full w-full">
                <Image
                  src={desktopSrc}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover object-center transition-opacity"
                  style={layerTransition}
                  priority={i === 0}
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-[1] flex flex-col">
        <div className="flex min-h-[min(28vh,280px)] flex-col items-start justify-center px-page pt-8 pb-2 text-left sm:pt-12 md:pt-16">
          <div className="relative mx-auto w-full max-w-wrapper">
            <div className="w-full max-w-3xl">
              <div className="relative min-h-[10rem] w-full sm:min-h-[12rem] md:min-h-[14rem]">
                <article
                  key={active}
                  className="hero-slide-copy-in grid w-full grid-cols-[auto,minmax(0,1fr)] items-center gap-x-2.5 gap-y-3 sm:gap-x-4 md:gap-x-5"
                  aria-live="polite"
                >
                  <div className="col-start-1 row-start-1 flex shrink-0 items-center">
                    <Logo variant="slider" />
                  </div>
                  <div className="col-start-2 row-start-1 flex min-w-0 items-center">
                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-neutral-900 min-[400px]:text-4xl sm:text-5xl md:text-6xl">
                      {slide.title[0]}
                      <br />
                      {slide.title[1]}
                    </h1>
                  </div>
                  <p className="col-start-2 row-start-2 self-start max-w-lg text-base leading-snug text-neutral-800 sm:text-lg md:text-xl">
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
          {/* Same outer/inner pattern as hero copy: wrapper centers in viewport; inner column is left-aligned */}
          <div className="relative mx-auto w-full max-w-wrapper">
            <div className="w-full max-w-3xl lg:max-w-[min(100%,calc(var(--content-wrapper)/2))]">
              <BraFitQuiz />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
