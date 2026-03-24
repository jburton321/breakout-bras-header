import { AnimatedBirdMark } from "./AnimatedBirdMark";

/** Left edge of wordmark in full logo viewBox (bird is left of this; animated bird replaces static bird). */
const WORDMARK_MIN_X = 235;
const ORIGINAL_WIDTH = 776.16;
const ORIGINAL_HEIGHT = 167.36;

/** Single source of truth: `public/logo/logo-grey.svg#bb-logo` — cropped to wordmark only. */
export function Logo() {
  const w = ORIGINAL_WIDTH - WORDMARK_MIN_X;

  return (
    <div className="inline-flex items-end gap-1 sm:gap-1.5" role="img" aria-label="Breakout Bras">
      <AnimatedBirdMark />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`${WORDMARK_MIN_X} 0 ${w} ${ORIGINAL_HEIGHT}`}
        className="h-8 w-auto min-w-0 sm:h-10"
        aria-hidden
      >
        <use href="/logo/logo-grey.svg#bb-logo" />
      </svg>
    </div>
  );
}
