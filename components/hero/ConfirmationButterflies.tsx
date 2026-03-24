import { AnimatedBirdMark } from "@/components/breakout-bras/AnimatedBirdMark";

const PLACEMENTS: Array<{
  className: string;
  svgClassName: string;
  delay: string;
  floatClass: string;
}> = [
  {
    className: "left-[2%] top-[2%] sm:left-[4%]",
    svgClassName: "h-9 w-auto opacity-50 sm:h-11",
    delay: "0s",
    floatClass: "confirmation-butterfly-float confirmation-butterfly-float-a",
  },
  {
    className: "right-[0%] top-[8%] sm:right-[3%]",
    svgClassName: "h-8 w-auto opacity-40 sm:h-10",
    delay: "0.35s",
    floatClass: "confirmation-butterfly-float confirmation-butterfly-float-b",
  },
  {
    className: "left-[0%] top-[42%] sm:left-[2%]",
    svgClassName: "h-7 w-auto opacity-35 sm:h-9",
    delay: "0.7s",
    floatClass: "confirmation-butterfly-float confirmation-butterfly-float-c",
  },
  {
    className: "right-[4%] bottom-[6%] sm:right-[6%]",
    svgClassName: "h-10 w-auto opacity-45 sm:h-12",
    delay: "0.2s",
    floatClass: "confirmation-butterfly-float confirmation-butterfly-float-d",
  },
];

/** Decorative animated marks (bird/butterfly) for the quiz confirmation step. */
export function ConfirmationButterflies() {
  return (
    <div
      className="confirmation-butterflies-layer pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {PLACEMENTS.map((p, i) => (
        <div
          key={i}
          className={`absolute ${p.className} ${p.floatClass}`}
          style={{ ["--bf-delay" as string]: p.delay }}
        >
          <AnimatedBirdMark className="shrink-0" svgClassName={p.svgClassName} />
        </div>
      ))}
    </div>
  );
}
