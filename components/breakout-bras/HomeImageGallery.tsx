import Image from "next/image";
import Link from "next/link";
import { SLIDE_BG_CROSSFADE_EASE, SLIDE_BG_CROSSFADE_MS } from "@/lib/heroSlideMotion";

const GALLERY_ITEMS = [1, 2, 3, 4, 5, 6, 7] as const;

/**
 * Full-width strip above the footer.
 * Default: `public/front-back-gallery/{n}-front` — hover shows `{n}-back`.
 */
export function HomeImageGallery() {
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
          Front, back, and every curve, hover any look to see how it fits from every angle. Real bras,
          real views, so you can choose with confidence.
        </p>
      </div>

      <div className="mx-auto w-full max-w-wrapper px-page">
        <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-7">
          {GALLERY_ITEMS.map((n) => (
            <div
              key={n}
              className="group relative aspect-[4/5] w-full overflow-hidden rounded-md bg-[#e8eeed] ring-1 ring-[#dcdcd8] ring-inset"
              role="group"
              aria-label={`Gallery item ${n}: hover to see back view`}
            >
              <Image
                src={`/front-back-gallery/${n}-back`}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 14vw"
                unoptimized
                aria-hidden
              />
              <Image
                src={`/front-back-gallery/${n}-front`}
                alt={`Gallery image ${n}, front`}
                fill
                className="z-10 object-cover transition-opacity motion-reduce:transition-none motion-reduce:!opacity-100 group-hover:opacity-0"
                style={{
                  transitionDuration: `${SLIDE_BG_CROSSFADE_MS}ms`,
                  transitionTimingFunction: SLIDE_BG_CROSSFADE_EASE,
                }}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 14vw"
                unoptimized
              />
            </div>
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
    </section>
  );
}
