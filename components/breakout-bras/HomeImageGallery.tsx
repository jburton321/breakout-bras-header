"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SLIDE_BG_CROSSFADE_EASE, SLIDE_BG_CROSSFADE_MS } from "@/lib/heroSlideMotion";

const GALLERY_ITEMS = [1, 2, 3, 4, 5, 6, 7] as const;

/** Show this many tiles below `md`; full set from `md` up. */
const GALLERY_VISIBLE_MOBILE = 6;

function frontSrc(n: number) {
  return `/front-back-gallery/${n}-front`;
}

function backSrc(n: number) {
  return `/front-back-gallery/${n}-back`;
}

/**
 * Full-width strip above the footer.
 * Thumbnails: hover crossfades back → front. Tap opens front in a lightbox.
 */
export function HomeImageGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightboxIndex]);

  const lightbox =
    mounted &&
    lightboxIndex !== null &&
    createPortal(
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/88 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Enlarged front view"
        onClick={() => setLightboxIndex(null)}
      >
        <button
          type="button"
          className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 transition hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close"
          onClick={(e) => {
            e.stopPropagation();
            setLightboxIndex(null);
          }}
        >
          <CloseIcon className="h-6 w-6" />
        </button>
        <div
          className="relative h-[min(85dvh,880px)] w-full max-w-[min(92vw,560px)]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={frontSrc(lightboxIndex)}
            alt={`Gallery image ${lightboxIndex}, front view`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 92vw, 560px"
            unoptimized
            priority
          />
        </div>
      </div>,
      document.body
    );

  return (
    <section
      className="w-full border-t border-[#e8e8e4] bg-[#fafaf8] pt-16 sm:pt-20 md:pt-24"
      aria-labelledby="home-gallery-heading"
    >
      <div className="mx-auto max-w-wrapper px-page pb-10 text-center sm:pb-12 md:pb-14">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#719B9A] sm:text-xs">
          Breakout Bras
        </p>
        <h2
          id="home-gallery-heading"
          className="mx-auto max-w-3xl text-balance text-2xl font-bold leading-tight tracking-tight text-[#2d2c28] sm:text-3xl md:text-4xl"
        >
          Twice the detail. Zero guesswork.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-[#5c5a56] sm:text-base">
          Front, back, and every curve, hover any look to see how it fits from every angle. Tap an image
          to view the front full size. Real bras, real views, so you can choose with confidence.
        </p>
      </div>

      <div className="mx-auto w-full max-w-wrapper px-page">
        <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-7">
          {GALLERY_ITEMS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setLightboxIndex(n)}
              className={`group relative aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-md bg-[#e8eeed] text-left ring-1 ring-[#dcdcd8] ring-inset transition hover:ring-[#c5cbc8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#719B9A] focus-visible:ring-offset-2 ${
                n > GALLERY_VISIBLE_MOBILE ? "hidden md:block" : ""
              }`}
              aria-label={`Open gallery image ${n} front view larger`}
            >
              <span className="pointer-events-none absolute inset-0 block">
                <Image
                  src={backSrc(n)}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 14vw"
                  unoptimized
                  aria-hidden
                />
                <Image
                  src={frontSrc(n)}
                  alt=""
                  fill
                  className="z-10 object-cover transition-opacity motion-reduce:transition-none motion-reduce:!opacity-100 group-hover:opacity-0"
                  style={{
                    transitionDuration: `${SLIDE_BG_CROSSFADE_MS}ms`,
                    transitionTimingFunction: SLIDE_BG_CROSSFADE_EASE,
                  }}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 14vw"
                  unoptimized
                  aria-hidden
                />
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-wrapper px-page pb-14 pt-10 sm:pb-16 sm:pt-12 md:pt-14">
        <p className="mx-auto max-w-3xl text-pretty text-center text-sm leading-relaxed text-[#5c5a56] sm:text-base">
          Breakout Bras offers an inclusive selection of underwire, wireless, sports, strapless, nursing,
          and everyday bras in extended sizes from 26DD to 56F+. Shop premium brands like{" "}
          <span className="font-medium text-[#3b3a36]">
            Comexim, Elomi, Goddess, Panache, Freya, Natori, and Parfait
          </span>
          , known for exceptional fit, comfort, and support.
        </p>
        <div className="mt-8 flex justify-center sm:mt-9">
          <Link
            href="#find-my-fit-quiz"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#E55932] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E55932]"
          >
            Find My Fit
          </Link>
        </div>
      </div>

      {lightbox}
    </section>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
