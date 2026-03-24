"use client";

import { useMemo, type CSSProperties } from "react";

/** Deterministic burst pattern (SSR-safe). */
function burstParticles() {
  const n = 32;
  return Array.from({ length: n }, (_, i) => {
    const angle = (i / n) * Math.PI * 2 + i * 0.09;
    const r = 58 + (i % 9) * 11 + (i % 4) * 7;
    return {
      tx: Math.round(Math.cos(angle) * r * 10) / 10,
      ty: Math.round(Math.sin(angle) * r * 10) / 10,
      rot: ((i * 83) % 300) - 150,
      delay: ((i * 17) % 140) / 1000,
      scale: 0.2 + (i % 7) * 0.038,
      hue: (i * 19) % 40,
    };
  });
}

function MiniMoth({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 150" className={className} aria-hidden>
      <use href="/quiz-moth-sprite.svg#quiz-moth-shape" />
    </svg>
  );
}

/**
 * One-shot confetti-style burst of small moths when the confirmation step mounts.
 */
export function ConfirmationButterflyBurst() {
  const particles = useMemo(() => burstParticles(), []);

  return (
    <div
      className="confirmation-burst-layer pointer-events-none absolute inset-0 z-[40] overflow-visible"
      aria-hidden
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className="confirmation-burst-particle"
          style={
            {
              "--burst-tx": `${p.tx}px`,
              "--burst-ty": `${p.ty}px`,
              "--burst-rot": `${p.rot}deg`,
              "--burst-delay": `${p.delay}s`,
              "--burst-scale": String(p.scale),
              filter: `hue-rotate(${p.hue}deg)`,
            } as CSSProperties
          }
        >
          <MiniMoth className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </div>
      ))}
    </div>
  );
}
