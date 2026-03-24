"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ConfirmationButterflies } from "./ConfirmationButterflies";
import { FittingTypeIcon, QuizOptionIcon } from "./QuizOptionIcons";

const TOTAL_STEPS = 12;

/** Store visit address when customer chooses in-person fitting (step 1). */
const IN_PERSON_FITTING_ADDRESS = "525 Haywood Rd, Greenville, SC 29607";

const BRA_SITUATIONS = [
  "I'm recovering from surgery and need extra support.",
  "I'm pregnant or nursing.",
  "My body has been changing and my fit has too.",
  "None of the above.",
];

const BRABLEMS = [
  "More Lift",
  "Nipple Coverage",
  "Straps That Stay Put",
  "More Support",
  "Back & Armhole Smoothing",
  "Breathable",
  "Gaping Cups",
  "Temperature Regulating",
];

const STYLES = [
  "Wireless",
  "Push Up",
  "Plunge",
  "Unlined",
  "Convertible/Multi-way",
  "Front Closure",
  "Racerback",
  "Lightly Lined",
  "Full Coverage",
];

const PREFERENCES = [
  "Cooling",
  "Sheer",
  "Irritation-Free",
  "Sustainable",
  "Lacey",
  "Smoothing",
  "Temperature Regulating",
];

const UNDERWEAR_STYLES = ["Bikini & Hipster", "Thong", "Brief", "Cheeky", "Shorts"];

const UNDERWEAR_SIZES = [
  "XS (0-2)",
  "S (2-6)",
  "M (6-8)",
  "L (8-10)",
  "XL (10-12)",
  "1X (14-16)",
  "2X (18-20)",
  "3X (22-24)",
];

const BRA_AGES = [
  "Less than 6 months",
  "6-12 months",
  "1-2 years",
  "More than 2 years",
];

const HOOKS = ["Tightest", "Middle", "Loosest"];

const BAND_SIZES = ["30", "32", "34", "36", "38", "40", "42", "44", "46", "48"];
const CUP_SIZES = ["AA", "A", "B", "C", "D", "DD", "E", "F", "G", "H", "I"];

const SLIDER_LABELS = ["Too small", "Slightly small", "Just right", "Slightly big", "Too big"];

function sliderLabel(value: string) {
  const n = Number.parseInt(value, 10);
  if (Number.isNaN(n) || n < 1 || n > 5) return value;
  return SLIDER_LABELS[n - 1];
}

function isValidUsZip(value: string) {
  const t = value.trim();
  return /^\d{5}(-\d{4})?$/.test(t);
}

const BOOKING_SLOTS = ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"] as const;

/** Set NEXT_PUBLIC_BOOKING_SCHEDULER_URL to a Calendly/Cal.com embed URL to show a live scheduler iframe. */
function ConfirmationBookingScheduler() {
  const embedUrl = process.env.NEXT_PUBLIC_BOOKING_SCHEDULER_URL?.trim();
  const [dayIndex, setDayIndex] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);

  const weekDays = useMemo(() => {
    const out: { key: string; short: string; dayNum: number; iso: string }[] = [];
    const base = new Date();
    base.setHours(0, 0, 0, 0);
    for (let i = 0; i < 7; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      out.push({
        key: d.toISOString(),
        short: d.toLocaleDateString("en-US", { weekday: "short" }),
        dayNum: d.getDate(),
        iso: d.toISOString(),
      });
    }
    return out;
  }, []);

  const appointmentsHref = useMemo(() => {
    const path = "/appointments";
    const q = new URLSearchParams();
    if (weekDays[dayIndex]) q.set("date", weekDays[dayIndex].iso);
    if (slot) q.set("time", slot);
    const qs = q.toString();
    return qs ? `${path}?${qs}` : path;
  }, [slot, dayIndex, weekDays]);

  return (
    <div className="mt-3 w-full min-w-0 border-t border-neutral-100 pt-3">
      <div className="mb-2 flex w-full min-w-0 items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#719B9A]/10 text-[#719B9A]">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#888]">
          Schedule appointment
        </p>
      </div>

      {embedUrl ? (
        <iframe
          title="Book an appointment"
          src={embedUrl}
          className="block h-[min(280px,42vh)] w-full min-w-0 max-w-full rounded-lg border border-neutral-200 bg-white"
          loading="lazy"
          allow="camera; microphone; fullscreen; autoplay; clipboard-write"
        />
      ) : (
        <>
          <div className="grid w-full min-w-0 grid-cols-7 gap-1">
            {weekDays.map((d, i) => (
              <button
                key={d.key}
                type="button"
                onClick={() => {
                  setDayIndex(i);
                  setSlot(null);
                }}
                className={`flex min-w-0 w-full flex-col items-center rounded-lg border px-0.5 py-1.5 text-center transition ${
                  i === dayIndex
                    ? "border-[#719B9A] bg-[#719B9A] text-white shadow-sm"
                    : "border-neutral-200 bg-white hover:border-[#719B9A]/50"
                }`}
              >
                <span className="w-full truncate text-[7px] font-semibold uppercase leading-tight opacity-90 sm:text-[8px]">
                  {d.short}
                </span>
                <span className="text-[11px] font-bold leading-tight sm:text-xs">{d.dayNum}</span>
              </button>
            ))}
          </div>
          <p className="mb-1 mt-2 w-full text-[10px] font-medium text-neutral-500">Available times</p>
          <div className="grid w-full min-w-0 grid-cols-2 gap-1.5 sm:grid-cols-4">
            {BOOKING_SLOTS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSlot(t)}
                className={`min-w-0 w-full rounded-lg border px-1 py-1.5 text-center text-[10px] font-medium transition sm:text-[11px] ${
                  slot === t
                    ? "border-[#719B9A] bg-[#e8f2f1] text-[#3d5c5b]"
                    : "border-neutral-200 bg-white hover:border-[#719B9A]/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <Link
            href={appointmentsHref}
            className="mt-3 flex w-full min-w-0 items-center justify-center gap-1.5 rounded-full bg-[#719B9A] px-3 py-2 text-[11px] font-semibold text-white transition hover:brightness-[1.03]"
          >
            Book this time
            <span aria-hidden>→</span>
          </Link>
        </>
      )}
    </div>
  );
}

export function BraFitQuiz() {
  const [step, setStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [fittingType, setFittingType] = useState<"virtual" | "in-person" | "">("");
  const [bandSize, setBandSize] = useState("");
  const [cupSize, setCupSize] = useState("");
  const [brablems, setBrablems] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [cupFit, setCupFit] = useState("3");
  const [bandFit, setBandFit] = useState("3");
  const [hookUsage, setHookUsage] = useState("");
  const [braAge, setBraAge] = useState("");
  const [underwearStyles, setUnderwearStyles] = useState<string[]>([]);
  const [underwearSize, setUnderwearSize] = useState("");
  const [braSituation, setBraSituation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);

  const toggle = useCallback(
    (list: string[], set: (v: string[]) => void, val: string, max: number) => {
      const i = list.indexOf(val);
      if (i > -1) set(list.filter((x) => x !== val));
      else if (list.length < max) set([...list, val]);
    },
    []
  );

  const canNext = useMemo(() => {
    switch (step) {
      case 1:
        return fittingType !== "";
      case 2:
        return Boolean(bandSize && cupSize);
      case 3:
        return brablems.length > 0;
      case 4:
        return styles.length > 0;
      case 5:
        return preferences.length > 0;
      case 6:
        return true;
      case 7:
        return hookUsage !== "";
      case 8:
        return braAge !== "";
      case 9:
        return underwearStyles.length > 0;
      case 10:
        return underwearSize !== "";
      case 11:
        return braSituation !== "";
      case 12:
        return (
          firstName.trim().length > 0 &&
          lastName.trim().length > 0 &&
          isValidUsZip(zip) &&
          email.includes("@") &&
          email.includes(".") &&
          marketingConsent
        );
      default:
        return false;
    }
  }, [
    step,
    fittingType,
    bandSize,
    cupSize,
    brablems,
    styles,
    preferences,
    hookUsage,
    braAge,
    underwearStyles,
    underwearSize,
    braSituation,
    firstName,
    lastName,
    zip,
    email,
    marketingConsent,
  ]);

  const progress = showConfirmation ? 100 : ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  const quizPayload = useMemo(
    () => ({
      fittingType,
      fittingLabel:
        fittingType === "virtual"
          ? "Virtual fitting"
          : fittingType === "in-person"
            ? `In person · ${IN_PERSON_FITTING_ADDRESS}`
            : "",
      bandSize,
      cupSize,
      brablems,
      styles,
      preferences,
      cupFit,
      cupFitLabel: sliderLabel(cupFit),
      bandFit,
      bandFitLabel: sliderLabel(bandFit),
      hookUsage,
      braAge,
      underwearStyles,
      underwearSize,
      braSituation,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      zip: zip.trim(),
      email,
      phone,
      marketingConsent,
    }),
    [
      fittingType,
      bandSize,
      cupSize,
      brablems,
      styles,
      preferences,
      cupFit,
      bandFit,
      hookUsage,
      braAge,
      underwearStyles,
      underwearSize,
      braSituation,
      firstName,
      lastName,
      zip,
      email,
      phone,
      marketingConsent,
    ]
  );

  const resetQuiz = useCallback(() => {
    setShowConfirmation(false);
    setStep(1);
    setFittingType("");
    setBandSize("");
    setCupSize("");
    setBrablems([]);
    setStyles([]);
    setPreferences([]);
    setCupFit("3");
    setBandFit("3");
    setHookUsage("");
    setBraAge("");
    setUnderwearStyles([]);
    setUnderwearSize("");
    setBraSituation("");
    setFirstName("");
    setLastName("");
    setZip("");
    setEmail("");
    setPhone("");
    setMarketingConsent(false);
  }, []);

  const optionCard = (sel: boolean) =>
    `flex min-h-[3.5rem] flex-row items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-xs font-medium transition sm:min-h-[3.75rem] sm:text-sm ${
      sel
        ? "border-[#719B9A] bg-[#719B9A] text-white"
        : "border-[#ddd] bg-white hover:border-[#719B9A] hover:bg-[#f0f6f6]"
    }`;

  const fittingCard = (sel: boolean) =>
    `flex w-full cursor-pointer flex-row items-center gap-3 rounded-lg border px-4 py-4 text-left text-sm font-medium transition ${
      sel
        ? "border-[#719B9A] bg-[#719B9A] text-white"
        : "border-[#ddd] bg-white hover:border-[#719B9A] hover:bg-[#f0f6f6]"
    }`;

  return (
    <div
      className={`w-full rounded-2xl border border-white/20 bg-white/70 text-[#3b3a36] backdrop-blur-xl backdrop-saturate-150 ${
        showConfirmation ? "p-4 sm:p-5" : "p-6 sm:p-8 md:p-10"
      }`}
    >
      {!showConfirmation && (
        <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-[#eee]">
          <div
            className="h-full bg-[#719B9A] transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {step > 1 && !showConfirmation && (
        <button
          type="button"
          onClick={() => setStep((s) => s - 1)}
          className="mb-5 border-0 bg-transparent text-sm font-medium text-[#719B9A] hover:text-[#5a8584]"
        >
          ← Back
        </button>
      )}

      {showConfirmation ? (
        <div className="relative space-y-4">
          <ConfirmationButterflies />
          <div className="relative z-[1] space-y-4">
          <div className="relative overflow-hidden rounded-xl border border-[#719B9A]/20 bg-gradient-to-br from-[#e8f2f1] via-white to-[#f3ebe6] px-4 py-4 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset] sm:flex sm:items-center sm:gap-4 sm:py-3 sm:pl-4 sm:pr-5">
            <div
              className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#719B9A]/10 blur-xl"
              aria-hidden
            />
            <div className="relative mx-auto mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#719B9A] text-white shadow-md ring-2 ring-white/90 sm:mx-0 sm:mb-0">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth={2.25}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5a8584]">
                Find My Fit · Complete
              </p>
              <h2 className="mb-1 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                You&apos;re all set!
              </h2>
              <p className="text-xs leading-snug text-neutral-600 sm:text-sm">
                Answers saved—we&apos;ll personalize recommendations from your fit profile.
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
                <span className="rounded-full border border-[#719B9A]/25 bg-white/90 px-2 py-0.5 text-[10px] font-medium text-[#5a8584]">
                  Profile saved
                </span>
                <span className="rounded-full border border-[#719B9A]/20 bg-[#e8f2f1]/80 px-2 py-0.5 text-[10px] font-semibold text-[#5a8584]">
                  15% off code
                </span>
              </div>
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
            <section className="min-w-0 rounded-xl border border-neutral-200/90 bg-white/95 p-3 shadow-sm ring-1 ring-black/[0.03] sm:p-4">
              <div className="mb-2 flex items-center gap-2 border-b border-neutral-100 pb-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#719B9A]/12 text-[#719B9A]">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M4 7h16M4 12h10M4 17h7"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      strokeLinecap="round"
                    />
                    <path
                      d="M18 14l2 2 4-4"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="min-w-0 text-left">
                  <h3 className="text-sm font-semibold leading-tight text-neutral-900">Your fit profile</h3>
                </div>
              </div>
              <dl className="divide-y divide-neutral-100 text-xs leading-snug sm:text-[13px]">
                <div className="grid gap-0.5 py-1.5 first:pt-0 sm:grid-cols-[minmax(0,9.5rem)_1fr] sm:gap-x-3">
                  <dt className="font-medium text-neutral-500">Fitting</dt>
                  <dd className="text-neutral-800">{quizPayload.fittingLabel}</dd>
                </div>
                <div className="grid gap-0.5 py-1.5 sm:grid-cols-[minmax(0,9.5rem)_1fr] sm:gap-x-3">
                  <dt className="font-medium text-neutral-500">Current bra size</dt>
                  <dd className="font-medium text-neutral-900">
                    {quizPayload.bandSize} {quizPayload.cupSize}
                  </dd>
                </div>
                <div className="grid gap-0.5 py-1.5 sm:grid-cols-[minmax(0,9.5rem)_1fr] sm:gap-x-3">
                  <dt className="font-medium text-neutral-500">Looking to solve</dt>
                  <dd className="text-neutral-800">{quizPayload.brablems.join(", ")}</dd>
                </div>
                <div className="grid gap-0.5 py-1.5 sm:grid-cols-[minmax(0,9.5rem)_1fr] sm:gap-x-3">
                  <dt className="font-medium text-neutral-500">Styles</dt>
                  <dd className="text-neutral-800">{quizPayload.styles.join(", ")}</dd>
                </div>
                <div className="grid gap-0.5 py-1.5 sm:grid-cols-[minmax(0,9.5rem)_1fr] sm:gap-x-3">
                  <dt className="font-medium text-neutral-500">Preferences</dt>
                  <dd className="text-neutral-800">{quizPayload.preferences.join(", ")}</dd>
                </div>
                <div className="grid gap-0.5 py-1.5 sm:grid-cols-[minmax(0,9.5rem)_1fr] sm:gap-x-3">
                  <dt className="font-medium text-neutral-500">Cup fit</dt>
                  <dd className="text-neutral-800">
                    {quizPayload.cupFitLabel}{" "}
                    <span className="text-neutral-400">({quizPayload.cupFit}/5)</span>
                  </dd>
                </div>
                <div className="grid gap-0.5 py-1.5 sm:grid-cols-[minmax(0,9.5rem)_1fr] sm:gap-x-3">
                  <dt className="font-medium text-neutral-500">Band fit</dt>
                  <dd className="text-neutral-800">
                    {quizPayload.bandFitLabel}{" "}
                    <span className="text-neutral-400">({quizPayload.bandFit}/5)</span>
                  </dd>
                </div>
                <div className="grid gap-0.5 py-1.5 sm:grid-cols-[minmax(0,9.5rem)_1fr] sm:gap-x-3">
                  <dt className="font-medium text-neutral-500">Hook</dt>
                  <dd className="text-neutral-800">{quizPayload.hookUsage}</dd>
                </div>
                <div className="grid gap-0.5 py-1.5 sm:grid-cols-[minmax(0,9.5rem)_1fr] sm:gap-x-3">
                  <dt className="font-medium text-neutral-500">Go-to bra age</dt>
                  <dd className="text-neutral-800">{quizPayload.braAge}</dd>
                </div>
                <div className="grid gap-0.5 py-1.5 sm:grid-cols-[minmax(0,9.5rem)_1fr] sm:gap-x-3">
                  <dt className="font-medium text-neutral-500">Underwear</dt>
                  <dd className="text-neutral-800">
                    {quizPayload.underwearStyles.join(", ")} — {quizPayload.underwearSize}
                  </dd>
                </div>
                <div className="grid gap-0.5 py-1.5 pb-0 sm:grid-cols-[minmax(0,9.5rem)_1fr] sm:gap-x-3">
                  <dt className="font-medium text-neutral-500">Situation</dt>
                  <dd className="text-neutral-800">{quizPayload.braSituation}</dd>
                </div>
              </dl>
            </section>

            <section className="min-w-0 rounded-xl border border-neutral-200/90 bg-white/95 p-3 shadow-sm ring-1 ring-black/[0.03] sm:p-4">
              <div className="mb-2 flex items-center gap-2 border-b border-neutral-100 pb-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#a49184]/15 text-[#7d6c62]">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="min-w-0 text-left">
                  <h3 className="text-sm font-semibold leading-tight text-neutral-900">Contact details</h3>
                </div>
              </div>
              <dl className="divide-y divide-neutral-100 text-xs leading-snug sm:text-[13px]">
                <div className="grid gap-0.5 py-1.5 first:pt-0 sm:grid-cols-[minmax(0,9.5rem)_1fr] sm:gap-x-3">
                  <dt className="font-medium text-neutral-500">Name</dt>
                  <dd className="text-neutral-800">
                    {quizPayload.firstName} {quizPayload.lastName}
                  </dd>
                </div>
                <div className="grid gap-0.5 py-1.5 sm:grid-cols-[minmax(0,9.5rem)_1fr] sm:gap-x-3">
                  <dt className="font-medium text-neutral-500">ZIP</dt>
                  <dd className="text-neutral-800">{quizPayload.zip}</dd>
                </div>
                <div className="grid gap-0.5 py-1.5 sm:grid-cols-[minmax(0,9.5rem)_1fr] sm:gap-x-3">
                  <dt className="font-medium text-neutral-500">Email</dt>
                  <dd className="break-all text-neutral-800">{quizPayload.email}</dd>
                </div>
                <div className="grid gap-0.5 py-1.5 sm:grid-cols-[minmax(0,9.5rem)_1fr] sm:gap-x-3">
                  <dt className="font-medium text-neutral-500">Phone</dt>
                  <dd className="text-neutral-800">{quizPayload.phone || "—"}</dd>
                </div>
                <div className="grid gap-0.5 py-1.5 pb-0 sm:grid-cols-[minmax(0,9.5rem)_1fr] sm:gap-x-3">
                  <dt className="font-medium text-neutral-500">Updates</dt>
                  <dd>
                    {quizPayload.marketingConsent ? (
                      <span className="inline-flex items-center rounded-full bg-[#e8f2f1] px-2 py-0.5 text-[10px] font-semibold text-[#5a8584] ring-1 ring-[#719B9A]/25">
                        Opted in
                      </span>
                    ) : (
                      <span className="text-neutral-400">—</span>
                    )}
                  </dd>
                </div>
              </dl>
              <ConfirmationBookingScheduler />
            </section>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <p className="order-2 text-center text-[11px] text-neutral-500 sm:order-1 sm:text-left">
              Edit contact or retake the quiz anytime.
            </p>
            <div className="order-1 flex flex-col gap-2 sm:order-2 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setShowConfirmation(false);
                  setStep(12);
                }}
                className="rounded-full border-2 border-[#719B9A] bg-white px-6 py-2.5 text-sm font-semibold text-[#719B9A] shadow-sm transition hover:bg-[#f0f6f6]"
              >
                Edit contact info
              </button>
              <button
                type="button"
                onClick={resetQuiz}
                className="rounded-full bg-[#719B9A] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-[1.03]"
              >
                Start over
              </button>
            </div>
          </div>
          </div>
        </div>
      ) : (
        <>
      <form onSubmit={(e) => e.preventDefault()}>
        {step === 1 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold">How would you like to get fitted?</h2>
            <p className="mb-6 text-sm text-[#666]">
              Choose a virtual fitting or visit us in store.
            </p>
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setFittingType("virtual")}
                className={fittingCard(fittingType === "virtual")}
              >
                <FittingTypeIcon type="virtual" selected={fittingType === "virtual"} />
                <div className="min-w-0 flex-1">
                  <span className="font-semibold">Virtual fitting</span>
                  <span
                    className={`mt-1 block text-xs leading-snug ${
                      fittingType === "virtual" ? "text-white/90" : "text-[#666]"
                    }`}
                  >
                    One-on-one with a fitter online from home.
                  </span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setFittingType("in-person")}
                className={fittingCard(fittingType === "in-person")}
              >
                <FittingTypeIcon type="in-person" selected={fittingType === "in-person"} />
                <div className="min-w-0 flex-1">
                  <span className="font-semibold">In person</span>
                  <span
                    className={`mt-1 block text-xs leading-snug ${
                      fittingType === "in-person" ? "text-white/90" : "text-[#666]"
                    }`}
                  >
                    {IN_PERSON_FITTING_ADDRESS}
                  </span>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold">What is your current bra size?</h2>
            <p className="mb-6 text-sm text-[#666]">
              Even if it doesn&apos;t fit, that&apos;s OK — we are here to fix that!
            </p>
            <div className="mb-6 flex gap-4">
              <label className="flex flex-1 flex-col">
                <span className="mb-2 text-xs font-semibold uppercase text-[#888]">Band</span>
                <select
                  value={bandSize}
                  onChange={(e) => setBandSize(e.target.value)}
                  className="rounded-lg border border-[#ddd] bg-white px-4 py-3.5 outline-none focus:border-[#719B9A]"
                >
                  <option value="">Select</option>
                  {BAND_SIZES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-1 flex-col">
                <span className="mb-2 text-xs font-semibold uppercase text-[#888]">Cup</span>
                <select
                  value={cupSize}
                  onChange={(e) => setCupSize(e.target.value)}
                  className="rounded-lg border border-[#ddd] bg-white px-4 py-3.5 outline-none focus:border-[#719B9A]"
                >
                  <option value="">-</option>
                  {CUP_SIZES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <a href="#" className="text-sm text-[#a49184] underline">
              I don&apos;t know my bra size
            </a>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold">Got a bra-blem? We have a solution.</h2>
            <p className="mb-6 text-sm text-[#666]">Select up to 2</p>
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {BRABLEMS.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => toggle(brablems, setBrablems, o, 2)}
                  className={optionCard(brablems.includes(o))}
                >
                  <QuizOptionIcon group="brablem" label={o} selected={brablems.includes(o)} />
                  <span className="min-w-0 flex-1 leading-snug">{o}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold">Which styles are you looking for?</h2>
            <p className="mb-6 text-sm text-[#666]">Select up to 2</p>
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {STYLES.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => toggle(styles, setStyles, o, 2)}
                  className={optionCard(styles.includes(o))}
                >
                  <QuizOptionIcon group="style" label={o} selected={styles.includes(o)} />
                  <span className="min-w-0 flex-1 leading-snug">{o}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold">
              All of our bras are comfy. What else matters?
            </h2>
            <p className="mb-6 text-sm text-[#666]">Select up to 2</p>
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {PREFERENCES.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => toggle(preferences, setPreferences, o, 2)}
                  className={optionCard(preferences.includes(o))}
                >
                  <QuizOptionIcon group="preference" label={o} selected={preferences.includes(o)} />
                  <span className="min-w-0 flex-1 leading-snug">{o}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold">How do your cups fit?</h2>
            <div className="mb-8 px-2">
              <input
                type="range"
                min={1}
                max={5}
                value={cupFit}
                onChange={(e) => setCupFit(e.target.value)}
                className="mb-2 mt-6 h-1.5 w-full cursor-pointer appearance-none rounded bg-[#ddd] accent-[#719B9A]"
              />
              <div className="flex justify-between text-xs text-[#666]">
                <span>Too small</span>
                <span>Just right</span>
                <span>Too big</span>
              </div>
            </div>
          </div>
        )}

        {step === 7 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold">How does your band fit?</h2>
            <div className="mb-6">
              <input
                type="range"
                min={1}
                max={5}
                value={bandFit}
                onChange={(e) => setBandFit(e.target.value)}
                className="mb-2 mt-6 h-1.5 w-full cursor-pointer appearance-none rounded bg-[#ddd] accent-[#719B9A]"
              />
            </div>
            <h3 className="mb-4 text-lg font-medium">What hook are you on?</h3>
            <div className="mb-6 grid grid-cols-3 gap-3">
              {HOOKS.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setHookUsage(o)}
                  className={optionCard(hookUsage === o)}
                >
                  <QuizOptionIcon group="hook" label={o} selected={hookUsage === o} />
                  <span className="min-w-0 flex-1 leading-snug">{o}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 8 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold">How old is your go-to bra?</h2>
            <div className="mb-6 grid grid-cols-2 gap-3">
              {BRA_AGES.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setBraAge(o)}
                  className={optionCard(braAge === o)}
                >
                  <QuizOptionIcon group="braAge" label={o} selected={braAge === o} />
                  <span className="min-w-0 flex-1 leading-snug">{o}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 9 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold">We make underwear too!</h2>
            <p className="mb-4 text-sm text-[#666]">Select up to 2</p>
            <div className="mb-6 grid grid-cols-2 gap-3">
              {UNDERWEAR_STYLES.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => toggle(underwearStyles, setUnderwearStyles, o, 2)}
                  className={optionCard(underwearStyles.includes(o))}
                >
                  <QuizOptionIcon group="underwearStyle" label={o} selected={underwearStyles.includes(o)} />
                  <span className="min-w-0 flex-1 leading-snug">{o}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 10 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold">Underwear size?</h2>
            <p className="mb-6 text-sm text-[#666]">Pick the size that matches you best.</p>
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {UNDERWEAR_SIZES.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setUnderwearSize(o)}
                  className={optionCard(underwearSize === o)}
                >
                  <QuizOptionIcon group="underwearSize" label={o} selected={underwearSize === o} />
                  <span className="min-w-0 flex-1 leading-snug">{o}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 11 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold">What&apos;s your current bra situation?</h2>
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {BRA_SITUATIONS.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setBraSituation(o)}
                  className={optionCard(braSituation === o)}
                >
                  <QuizOptionIcon group="situation" label={o} selected={braSituation === o} />
                  <span className="min-w-0 flex-1 text-balance leading-snug">{o}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 12 && (
          <div>
            <h2 className="mb-3 text-2xl font-semibold">Your new fit is ready!</h2>
            <div className="mb-6 rounded-xl border border-[#719B9A]/25 bg-gradient-to-br from-[#f4faf9] to-white px-4 py-3.5 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] sm:px-5">
              <p className="text-[15px] font-medium leading-snug text-[#3b3a36] sm:text-base sm:leading-relaxed">
                Tell us where to send your{" "}
                <span className="relative inline-block rounded-md bg-[#719B9A] px-2 py-0.5 text-base font-bold tracking-tight text-white shadow-sm sm:text-lg">
                  15% OFF
                </span>{" "}
                code plus we&apos;ll get you set up for your custom fit!
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <label className="flex flex-col">
                <span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#888]">
                  First name
                </span>
                <input
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="h-12 w-full rounded-lg border border-[#ddd] bg-white px-4 text-sm text-[#3b3a36] outline-none ring-0 transition placeholder:text-neutral-400 focus:border-[#719B9A] focus:ring-2 focus:ring-[#719B9A]/20"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#888]">
                  Last name
                </span>
                <input
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="h-12 w-full rounded-lg border border-[#ddd] bg-white px-4 text-sm text-[#3b3a36] outline-none ring-0 transition placeholder:text-neutral-400 focus:border-[#719B9A] focus:ring-2 focus:ring-[#719B9A]/20"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#888]">
                  ZIP code
                </span>
                <input
                  type="text"
                  name="zip"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="12345"
                  className="h-12 w-full rounded-lg border border-[#ddd] bg-white px-4 text-sm text-[#3b3a36] outline-none ring-0 transition placeholder:text-neutral-400 focus:border-[#719B9A] focus:ring-2 focus:ring-[#719B9A]/20"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#888]">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="h-12 w-full rounded-lg border border-[#ddd] bg-white px-4 text-sm text-[#3b3a36] outline-none ring-0 transition placeholder:text-neutral-400 focus:border-[#719B9A] focus:ring-2 focus:ring-[#719B9A]/20"
                />
              </label>
              <label className="flex flex-col sm:col-span-2">
                <span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#888]">
                  Phone <span className="font-normal normal-case tracking-normal text-[#aaa]">(optional)</span>
                </span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 555-5555"
                  className="h-12 w-full rounded-lg border border-[#ddd] bg-white px-4 text-sm text-[#3b3a36] outline-none ring-0 transition placeholder:text-neutral-400 focus:border-[#719B9A] focus:ring-2 focus:ring-[#719B9A]/20"
                />
              </label>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-[#e8e8e4] bg-[#fafaf8] p-5 sm:p-6">
              <div className="grid grid-cols-[1.125rem_1fr] items-start gap-3 sm:gap-4">
                <input
                  id="marketing-consent"
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer rounded border-[#ccc] accent-[#719B9A]"
                />
                <label
                  htmlFor="marketing-consent"
                  className="cursor-pointer text-left text-xs leading-relaxed text-[#555] sm:text-[13px] sm:leading-relaxed"
                >
                  By checking this box, you agree to receive personalized fitting recommendations,
                  exclusive offers, new arrivals, and helpful bra tips from Breakout Bras via email,
                  SMS/text, and phone. Message and data rates may apply. SMS frequency may vary. You
                  can opt out at any time by replying STOP to any text, clicking unsubscribe in any
                  email. View our{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-[#719B9A] underline underline-offset-2 hover:text-[#5a8584]"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-[#719B9A] underline underline-offset-2 hover:text-[#5a8584]"
                  >
                    Terms and Conditions
                  </Link>
                  .
                </label>
              </div>
            </div>
          </div>
        )}
      </form>

      <div className="mt-6">
        {step < TOTAL_STEPS ? (
          <button
            type="button"
            disabled={!canNext}
            onClick={() => setStep((s) => s + 1)}
            className="w-full rounded-full bg-[#719B9A] px-10 py-4 text-sm font-semibold text-white transition disabled:cursor-not-allowed"
          >
            NEXT
          </button>
        ) : (
          <button
            type="button"
            disabled={!canNext}
            onClick={() => {
              console.log("Find My Fit submission", quizPayload);
              setShowConfirmation(true);
            }}
            className="w-full rounded-full bg-[#719B9A] px-10 py-4 text-sm font-semibold text-white transition disabled:cursor-not-allowed"
          >
            GET RESULTS
          </button>
        )}
      </div>
        </>
      )}
    </div>
  );
}
