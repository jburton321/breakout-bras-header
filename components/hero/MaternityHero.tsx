"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BraFitQuiz } from "./BraFitQuiz";

const SLIDES = [
  {
    id: "bras",
    title: ["Bras Fit", "Is Everything"],
    subtitle: "Discover sizes that celebrate your shape and give superior lift and containment.",
    label: "Shop Bras",
    href: "/bras",
  },
  {
    id: "fitting",
    title: ["Professional Fitting", "Changes Everything"],
    subtitle: "Reserve your spot for in-store or virtual fitting with our expert team.",
    label: "Book a Fitting",
    href: "/appointments",
  },
  {
    id: "sports",
    title: ["Strong, Soft", "& Secure"],
    subtitle: "Sports bras that move with you—unbeatable support, comfort, and real lift.",
    label: "Sports Bras",
    href: "/bras",
  },
  {
    id: "welcome",
    title: ["Welcome To", "Breakout Bras"],
    subtitle: "For twenty-five years we have served women the fashion industry often overlooks.",
    label: "Our Story",
    href: "/about",
  },
] as const;

const ROTATE_MS = 6500;

export function MaternityHero() {
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

  return (
    <section className="relative w-full overflow-hidden" aria-label="Featured">
      <div
        className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent sm:from-black/50"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col">
        <div className="flex min-h-[min(55vh,480px)] flex-col items-center justify-center px-6 pt-52 pb-12 text-center sm:px-10 sm:pt-56 md:px-14 lg:px-16">
          <div className="mx-auto w-full max-w-[1600px]">
            <motion.div
              className="mx-auto max-w-xl"
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
              <motion.h1
                className="min-h-[2.6em] text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
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
                className="mx-auto mt-3 min-h-[4.5em] max-w-md text-base text-white/95 sm:text-lg md:text-xl"
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
              <motion.div
                className="mt-8 flex justify-center"
                initial={false}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                <Link
                  href="#find-my-fit-quiz"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-8 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-white/95"
                >
                  Find My Fit
                  <span aria-hidden>›</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Progress bars */}
        <div className="px-4 pb-6 pt-4 sm:px-8 sm:pb-8 md:px-12">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="min-w-0 flex-1">
              <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-4 sm:gap-x-4">
                {SLIDES.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(index)}
                    className="group relative text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                    aria-current={index === active}
                    aria-label={`Show ${item.label}`}
                  >
                    <div className="relative mb-3 h-1 w-full overflow-hidden rounded-full bg-white/30">
                      {index === active && (
                        <div
                          className="absolute inset-y-0 left-0 rounded-full bg-white transition-[width] duration-75 ease-linear"
                          style={{ width: `${progress}%` }}
                        />
                      )}
                    </div>
                    <span
                      className={`block text-[10px] sm:text-[11px] md:text-xs ${
                        index === active
                          ? "font-semibold text-white"
                          : "font-normal text-white/75 group-hover:text-white/90"
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

        {/* Quiz */}
        <div
          id="find-my-fit-quiz"
          className="scroll-mt-24 px-4 pb-16 pt-2 sm:px-8 md:px-12 lg:px-16"
        >
          <div className="mx-auto w-full max-w-[1600px]">
            <BraFitQuiz />
          </div>
        </div>
      </div>
    </section>
  );
}
