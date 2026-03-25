import { AnimatedBirdMark } from "./AnimatedBirdMark";

/** Full static lockup from `public/logo/logo-grey.svg` — same asset as footer (no animation). */
export function StaticSiteLogoImg({
  className = "block h-10 w-auto max-w-full sm:h-12",
}: {
  className?: string;
}) {
  return (
    <img
      src="/logo/logo-grey.svg"
      alt="Breakout Bras"
      width={776}
      height={167}
      className={className}
    />
  );
}

/** Left edge of wordmark in full logo viewBox (animated butterfly replaces static butterfly in the SVG). */
const WORDMARK_MIN_X = 235;
const ORIGINAL_WIDTH = 776.16;
const ORIGINAL_HEIGHT = 167.36;

export type LogoVariant = "nav" | "slider";

type NavClasses = {
  root: string;
  wordmark: string;
  markClassName: string;
  markSvgClassName: string;
};

type SliderClasses = {
  root: string;
  markClassName: string;
  markSvgClassName: string;
};

const NAV: NavClasses = {
  root: "inline-flex items-end gap-1 sm:gap-1.5 h-8 sm:h-10",
  wordmark: "h-full w-auto min-w-0 max-w-[min(100%,22rem)]",
  markClassName: "h-full",
  markSvgClassName: "h-full w-auto",
};

/** Animated mark only — no wordmark/tagline (hero slider). Explicit SVG size avoids h-full collapse with flex. */
const SLIDER: SliderClasses = {
  root: "inline-flex shrink-0 items-end",
  markClassName: "shrink-0",
  markSvgClassName: "h-16 w-auto sm:h-20 md:h-24",
};

export type LogoProps = {
  variant?: LogoVariant;
};

/** Nav: animated mark + static wordmark/tagline from `public/logo/logo-grey.svg#bb-logo`. Slider: animated mark only. */
export function Logo({ variant = "nav" }: LogoProps) {
  const w = ORIGINAL_WIDTH - WORDMARK_MIN_X;

  if (variant === "slider") {
    return (
      <div className={SLIDER.root} role="img" aria-label="Breakout Bras">
        <AnimatedBirdMark className={SLIDER.markClassName} svgClassName={SLIDER.markSvgClassName} />
      </div>
    );
  }

  return (
    <div className={NAV.root} role="img" aria-label="Breakout Bras">
      <AnimatedBirdMark className={NAV.markClassName} svgClassName={NAV.markSvgClassName} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`${WORDMARK_MIN_X} 0 ${w} ${ORIGINAL_HEIGHT}`}
        className={NAV.wordmark}
        aria-hidden
      >
        <use href="/logo/logo-grey.svg#bb-logo" />
      </svg>
    </div>
  );
}
