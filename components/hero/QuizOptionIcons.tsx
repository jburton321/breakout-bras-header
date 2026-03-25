import type { ReactNode } from "react";

function I({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg [&>svg]:block [&>svg]:h-5 [&>svg]:w-5 [&>svg]:max-h-5 [&>svg]:max-w-5 ${className ?? ""}`}
      aria-hidden
    >
      {children}
    </span>
  );
}

const stroke = { strokeWidth: 1.5 as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** Shared outline icon set — uses currentColor for selected/unselected states. */
export function QuizOptionIcon({
  group,
  label,
  selected,
}: {
  group:
    | "brablem"
    | "style"
    | "preference"
    | "underwearStyle"
    | "underwearSize"
    | "braAge"
    | "hook"
    | "situation";
  label: string;
  selected: boolean;
}) {
  const tone = selected ? "bg-white/20 text-white" : "bg-[#719B9A]/12 text-[#719B9A]";
  const icon = pickIcon(group, label);
  return <I className={tone}>{icon}</I>;
}

export function FittingTypeIcon({ type, selected }: { type: "virtual" | "in-person"; selected: boolean }) {
  const tone = selected ? "bg-white/20 text-white" : "bg-[#719B9A]/12 text-[#719B9A]";
  return (
    <I className={tone}>
      {type === "virtual" ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
          <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )}
    </I>
  );
}

function pickIcon(group: string, label: string): ReactNode {
  switch (group) {
    case "brablem":
      return brablemIcons[label] ?? defaultIcon();
    case "style":
      return styleIcons[label] ?? defaultIcon();
    case "preference":
      return preferenceIcons[label] ?? defaultIcon();
    case "underwearStyle":
      return underwearStyleIcons[label] ?? defaultIcon();
    case "underwearSize":
      return sizeIcon();
    case "braAge":
      return braAgeIcons[label] ?? defaultIcon();
    case "hook":
      return hookIcons[label] ?? defaultIcon();
    case "situation":
      return situationIcons[label] ?? defaultIcon();
    default:
      return defaultIcon();
  }
}

function defaultIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l2 2" />
    </svg>
  );
}

const brablemIcons: Record<string, ReactNode> = {
  "Underwires dig into my sides or sternum": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M6 16c2-4 4-6 6-6s4 2 6 6M9 10l3-4 3 4" />
      <path d="M8 18h8" />
    </svg>
  ),
  "Breast tissue spills over the top or sides of the cup": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M6 14c2-3 4-4 6-4s4 1 6 4M5 10h3M16 10h3M10 8l2-2 2 2" />
      <path d="M8 16c1 2 2 3 4 3s3-1 4-3" />
    </svg>
  ),
  "Cups gap or wrinkle, they don't fill out": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M8 8c2 2 4 2 8 0M8 16c2-2 4-2 8 0M12 4v16" />
    </svg>
  ),
  "My band rides up in the back throughout the day": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M4 14c3-2 6-3 8-3s5 1 8 3M6 10l6-4 6 4M10 18l2-3 2 3" />
    </svg>
  ),
  "My straps fall off my shoulders constantly": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M8 7c2 0 4-1 4-3M16 7c-2 0-4-1-4-3M8 17c2 0 4 1 4 3M16 17c-2 0-4 1-4 3M8 7v10M16 7v10" />
    </svg>
  ),
  "I have chronic back, neck, or shoulder pain": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  "I'm not getting enough lift or shape": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M12 19V5M7 10l5-5 5 5" />
    </svg>
  ),
  "No major complaints, I just want better options": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M9 12l2 2 4-4M12 22c5 0 8-3 8-8 0-4-3-7-8-10-5 3-8 6-8 10 0 5 3 8 8 8z" />
    </svg>
  ),
};

const styleIcons: Record<string, ReactNode> = {
  Wireless: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M8 12h8M6 8c0-2 2-4 6-4s6 2 6 4M6 16c0 2 2 4 6 4s6-2 6-4" />
      <path d="M4 12h2M18 12h2" strokeDasharray="2 2" />
    </svg>
  ),
  "Push Up": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M12 18V6M8 10l4-4 4 4" />
    </svg>
  ),
  Plunge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M8 6l8 6-8 6V6z" />
    </svg>
  ),
  Unlined: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M6 8h12M6 12h12M6 16h8" />
    </svg>
  ),
  "Convertible/Multi-way": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M7 16V8l5-3 5 3v8M7 8l5 3 5-3M12 11v9" />
    </svg>
  ),
  "Front Closure": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <rect x="8" y="4" width="8" height="16" rx="1" />
      <path d="M12 8v2M12 12v2M12 16v2" />
    </svg>
  ),
  Racerback: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M8 6l4 6 4-6M8 18h8" />
    </svg>
  ),
  "Lightly Lined": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M6 10h12M6 14h12M8 6h8v12H8z" opacity="0.5" />
    </svg>
  ),
  "Full Coverage": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M6 8c0-2 2.5-4 6-4s6 2 6 4v8c0 2-2.5 4-6 4s-6-2-6-4V8z" />
    </svg>
  ),
};

const preferenceIcons: Record<string, ReactNode> = {
  Cooling: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M12 3v18M8 7a4 4 0 108 0 4 4 0 10-8 0z" />
    </svg>
  ),
  Sheer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M4 8h16M4 12h10M4 16h16" opacity="0.4" />
      <path d="M4 8h16M4 12h16M4 16h16" />
    </svg>
  ),
  "Irritation-Free": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M9 12l2 2 4-4M12 22c5 0 8-3 8-8 0-4-3-7-8-10-5 3-8 6-8 10 0 5 3 8 8 8z" />
    </svg>
  ),
  Sustainable: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M12 3c3 3 6 5 6 9a6 6 0 11-12 0c0-4 3-6 6-9z" />
      <path d="M12 12v9" />
    </svg>
  ),
  Lacey: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M12 3l1.5 4 4 .5-3 3 1 4-3.5-2-3.5 2 1-4-3-3 4-.5L12 3z" />
    </svg>
  ),
  Smoothing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M4 12c2 2 4 3 8 3s6-1 8-3M4 8c2-1 4-2 8-2s6 1 8 2M4 16c2 1 4 2 8 2s6-1 8-2" />
    </svg>
  ),
  "Temperature Regulating": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" />
    </svg>
  ),
};

const underwearStyleIcons: Record<string, ReactNode> = {
  "Bikini & Hipster": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M6 10h12v2c0 3-2.5 6-6 8-3.5-2-6-5-6-8v-2z" />
    </svg>
  ),
  Thong: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M8 8h8M12 8v12M8 20h8" />
    </svg>
  ),
  Brief: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M6 10h12c0 4-2 8-6 10-4-2-6-6-6-10z" />
    </svg>
  ),
  Cheeky: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M6 10h12v1c0 2-2 5-6 7-4-2-6-5-6-7v-1z" />
    </svg>
  ),
  Shorts: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M6 8h12v4H6zM8 12v6M16 12v6" />
    </svg>
  ),
};

function sizeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M4 6h16M4 12h12M4 18h8" />
      <path d="M18 4v16" />
    </svg>
  );
}

const braAgeIcons: Record<string, ReactNode> = {
  "Less than 6 months": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  "6-12 months": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 3v4M16 3v4M4 11h16" />
    </svg>
  ),
  "1-2 years": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M8 2v4M16 2v4" />
    </svg>
  ),
  "More than 2 years": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M12 8v4l3 3M12 3a9 9 0 100 18 9 9 0 000-18z" />
      <path d="M8 2l1 2M16 2l-1 2" />
    </svg>
  ),
};

const hookIcons: Record<string, ReactNode> = {
  Tightest: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M8 8h8v2H8zM8 12h6v2H8zM8 16h4v2H8z" />
    </svg>
  ),
  Middle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M8 8h8v2H8zM8 12h8v2H8zM8 16h8v2H8z" />
    </svg>
  ),
  Loosest: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M8 8h4v2H8zM8 12h8v2H8zM8 16h8v2H8z" />
    </svg>
  ),
};

const situationIcons: Record<string, ReactNode> = {
  "I'm recovering from surgery and need extra support.": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  ),
  "I'm pregnant or nursing.": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  "My body has been changing and my fit has too.": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M12 3c2 2 4 4 4 7s-2 6-4 8c-2-2-4-5-4-8s2-5 4-7z" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  ),
  "None of the above.": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...stroke}>
      <path d="M9 12l2 2 4-4M12 22c5 0 8-3 8-8 0-4-3-7-8-10-5 3-8 6-8 10 0 5 3 8 8 8z" />
    </svg>
  ),
};
