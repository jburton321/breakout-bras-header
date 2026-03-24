/** Pinned to `tailwind.config.ts` — use for `matchMedia` / resize logic only. */
export const BREAKPOINTS_PX = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type BreakpointName = keyof typeof BREAKPOINTS_PX;

export function minWidthQuery(breakpoint: BreakpointName): string {
  return `(min-width: ${BREAKPOINTS_PX[breakpoint]}px)`;
}
