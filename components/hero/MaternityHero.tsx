"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/breakout-bras/Logo";
import { BraFitQuiz } from "./BraFitQuiz";

const SLIDES: Array<{
  id: string;
  title: [string, string];
  subtitle: string;
  label: string;
  href: string;
  backgroundImage?: string;
}> = [
  {
    id: "bras",
    title: ["Bras Fit", "Is Everything"],
    subtitle: "Discover sizes that celebrate your shape and give superior lift and containment.",
    label: "Shop Bras",
    href: "/bras",
    backgroundImage: "/images/slide1.png",
  },
  {
    id: "fitting",
    title: ["Professional Fitting", "Changes Everything"],
    subtitle: "Reserve your spot for in-store or virtual fitting with our expert team.",
    label: "Book a Fitting",
    href: "/appointments",
    backgroundImage: "/images/slide2.png",
  },
  {
    id: "sports",
    title: ["Strong, Soft", "& Secure"],
    subtitle: "Sports bras that move with you—unbeatable support, comfort, and real lift.",
    label: "Sports Bras",
    href: "/bras",
    backgroundImage: "/images/slide3.png",
  },
];

const ROTATE_MS = 6500;

type MaternityHeroProps = {
  /** Fallback background when a slide has no backgroundImage */
  backgroundImage?: string;
};

export function MaternityHero({ backgroundImage }: MaternityHeroProps) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(Date.now());

  const goTo = useCallback((index: number) => {
    const i = ((index % SLIDES.length) + SLIDES.length) % SLIDES.length;
    setActive(i);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const p = Math.min(100, (elapsed / ROTATE_MS) * 100);
      setProgress(p);
      if (p >= 100) {
        setActive((i) => (i + 1) % SLIDES.length);
        setProgress(0);
        startTimeRef.current = Date.now();
      }
    }, 50);
    return () => window.clearInterval(id);
  }, [active]);

  const slide = SLIDES[active];
  const bgImage = slide.backgroundImage ?? backgroundImage;

  return (
    <section className="relative w-full overflow-hidden" aria-label="Featured">
      {/* Background image — per-slide when defined, spans full hero + quiz */}
      <AnimatePresence mode="sync">
        {bgImage && (
          <motion.div
            key={bgImage}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgImage})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
            aria-hidden
          />
        )}
      </AnimatePresence>
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0.35)_50%,transparent_100%)]"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col">
        <div className="flex min-h-[min(55vh,480px)] flex-col items-start justify-center px-4 pt-16 pb-2 text-left sm:px-6 sm:pt-20 lg:px-8">
          <div className="mx-auto w-full max-w-wrapper">
            <motion.div
              className="max-w-2xl"
              initial={false}
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.072,
                    delayChildren: 0.04,
                  },
                },
              }}
            >
                <motion.div
                  className="mb-6 [&_svg]:h-20 [&_svg]:w-auto sm:[&_svg]:h-24"
                  initial={false}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                >
                  <Logo />
                </motion.div>
                <motion.h1
                  className="min-h-[2.2em] text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl"
                  initial={false}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                >
                  {slide.title[0]}
                  <br />
                  {slide.title[1]}
                </motion.h1>
                <motion.p
                  className="mt-2 min-h-[3em] max-w-lg text-base text-neutral-800 sm:text-lg md:text-xl"
                  initial={false}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                >
                  {slide.subtitle}
                </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Quiz — part of hero section */}
        <div
          id="find-my-fit-quiz"
          className="scroll-mt-24 w-full px-4 pb-16 pt-0 sm:px-6 sm:pb-8 lg:px-8"
        >
          <div className="mx-auto w-full max-w-wrapper">
            <BraFitQuiz />
          </div>
        </div>

        {/* Progress bars */}
        <div className="w-full px-4 pb-6 pt-4 sm:px-6 sm:pb-8 lg:px-8">
          <div className="mx-auto w-full max-w-wrapper">
            <div className="rounded-2xl border border-white/20 bg-white/70 p-6 backdrop-blur-xl backdrop-saturate-150 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                <div className="min-w-0 flex-1">
                  <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                    {SLIDES.map((item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => goTo(index)}
                        className="group relative text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
                        aria-current={index === active}
                        aria-label={`Show ${item.label}`}
                      >
                        <div className="relative mb-3 h-1 w-full overflow-hidden rounded-full bg-neutral-300">
                          {index === active && (
                            <div
                              className="absolute inset-y-0 left-0 rounded-full bg-neutral-700 transition-[width] duration-75 ease-linear"
                              style={{ width: `${progress}%` }}
                            />
                          )}
                        </div>
                        <span
                          className={`block text-[10px] sm:text-[11px] md:text-xs ${
                            index === active
                              ? "font-semibold text-neutral-900"
                              : "font-normal text-neutral-600 group-hover:text-neutral-800"
                          }`}
                        >
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
