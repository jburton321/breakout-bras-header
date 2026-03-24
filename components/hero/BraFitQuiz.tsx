"use client";

import { useCallback, useMemo, useState } from "react";

const TOTAL_STEPS = 10;

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

export function BraFitQuiz() {
  const [step, setStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
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
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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
        return bandSize && cupSize;
      case 2:
        return brablems.length > 0;
      case 3:
        return styles.length > 0;
      case 4:
        return preferences.length > 0;
      case 5:
        return true;
      case 6:
        return hookUsage !== "";
      case 7:
        return braAge !== "";
      case 8:
        return underwearStyles.length > 0 && underwearSize !== "";
      case 9:
        return braSituation !== "";
      case 10:
        return email.includes("@") && email.includes(".");
      default:
        return false;
    }
  }, [
    step,
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
    email,
  ]);

  const progress = showConfirmation ? 100 : ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  const quizPayload = useMemo(
    () => ({
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
      email,
      phone,
    }),
    [
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
      email,
      phone,
    ]
  );

  const resetQuiz = useCallback(() => {
    setShowConfirmation(false);
    setStep(1);
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
    setEmail("");
    setPhone("");
  }, []);

  const card = (sel: boolean) =>
    `cursor-pointer rounded-lg border px-4 py-4 text-center text-sm font-medium transition ${
      sel
        ? "border-[#719B9A] bg-[#719B9A] text-white"
        : "border-[#ddd] bg-white hover:border-[#719B9A] hover:bg-[#f0f6f6]"
    }`;

  return (
    <div className="w-full rounded-2xl border border-white/20 bg-white/70 p-6 text-[#3b3a36] backdrop-blur-xl backdrop-saturate-150 sm:p-8 md:p-10">
      <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-[#eee]">
        <div
          className="h-full bg-[#719B9A] transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

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
        <div>
          <h2 className="mb-2 text-2xl font-semibold">You&apos;re all set!</h2>
          <p className="mb-6 text-sm text-[#666]">
            Here&apos;s a summary of your Find My Fit answers. We&apos;ll use this to tailor your results.
          </p>
          <dl className="space-y-4 text-sm">
            <div className="grid gap-1 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-x-4">
              <dt className="font-semibold text-[#666]">Current bra size</dt>
              <dd className="text-[#3b3a36]">
                {quizPayload.bandSize} {quizPayload.cupSize}
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-x-4">
              <dt className="font-semibold text-[#666]">Looking to solve</dt>
              <dd className="text-[#3b3a36]">{quizPayload.brablems.join(", ")}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-x-4">
              <dt className="font-semibold text-[#666]">Styles</dt>
              <dd className="text-[#3b3a36]">{quizPayload.styles.join(", ")}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-x-4">
              <dt className="font-semibold text-[#666]">Preferences</dt>
              <dd className="text-[#3b3a36]">{quizPayload.preferences.join(", ")}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-x-4">
              <dt className="font-semibold text-[#666]">Cup fit</dt>
              <dd className="text-[#3b3a36]">
                {quizPayload.cupFitLabel}{" "}
                <span className="text-[#888]">({quizPayload.cupFit}/5)</span>
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-x-4">
              <dt className="font-semibold text-[#666]">Band fit</dt>
              <dd className="text-[#3b3a36]">
                {quizPayload.bandFitLabel}{" "}
                <span className="text-[#888]">({quizPayload.bandFit}/5)</span>
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-x-4">
              <dt className="font-semibold text-[#666]">Hook</dt>
              <dd className="text-[#3b3a36]">{quizPayload.hookUsage}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-x-4">
              <dt className="font-semibold text-[#666]">Go-to bra age</dt>
              <dd className="text-[#3b3a36]">{quizPayload.braAge}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-x-4">
              <dt className="font-semibold text-[#666]">Underwear</dt>
              <dd className="text-[#3b3a36]">
                {quizPayload.underwearStyles.join(", ")} — {quizPayload.underwearSize}
              </dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-x-4">
              <dt className="font-semibold text-[#666]">Situation</dt>
              <dd className="text-[#3b3a36]">{quizPayload.braSituation}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-x-4">
              <dt className="font-semibold text-[#666]">Email</dt>
              <dd className="break-all text-[#3b3a36]">{quizPayload.email}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-x-4">
              <dt className="font-semibold text-[#666]">Phone</dt>
              <dd className="text-[#3b3a36]">{quizPayload.phone || "—"}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => {
                setShowConfirmation(false);
                setStep(10);
              }}
              className="rounded-full border border-[#719B9A] bg-white px-8 py-3.5 text-sm font-semibold text-[#719B9A] transition hover:bg-[#f0f6f6]"
            >
              Edit contact info
            </button>
            <button
              type="button"
              onClick={resetQuiz}
              className="rounded-full bg-[#719B9A] px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Start over
            </button>
          </div>
        </div>
      ) : (
        <>
      <form onSubmit={(e) => e.preventDefault()}>
        {step === 1 && (
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

        {step === 2 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold">Got a bra-blem? We have a solution.</h2>
            <p className="mb-6 text-sm text-[#666]">Select up to 2</p>
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {BRABLEMS.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => toggle(brablems, setBrablems, o, 2)}
                  className={card(brablems.includes(o))}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold">Which styles are you looking for?</h2>
            <p className="mb-6 text-sm text-[#666]">Select up to 2</p>
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {STYLES.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => toggle(styles, setStyles, o, 2)}
                  className={card(styles.includes(o))}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
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
                  className={card(preferences.includes(o))}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
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

        {step === 6 && (
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
                  className={card(hookUsage === o)}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 7 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold">How old is your go-to bra?</h2>
            <div className="mb-6 grid grid-cols-2 gap-3">
              {BRA_AGES.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setBraAge(o)}
                  className={card(braAge === o)}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 8 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold">We make underwear too!</h2>
            <p className="mb-4 text-sm text-[#666]">Select up to 2</p>
            <div className="mb-6 grid grid-cols-2 gap-3">
              {UNDERWEAR_STYLES.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => toggle(underwearStyles, setUnderwearStyles, o, 2)}
                  className={card(underwearStyles.includes(o))}
                >
                  {o}
                </button>
              ))}
            </div>
            <h3 className="mb-4 text-lg font-medium">Underwear size?</h3>
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {UNDERWEAR_SIZES.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setUnderwearSize(o)}
                  className={card(underwearSize === o)}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 9 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold">What&apos;s your current bra situation?</h2>
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {BRA_SITUATIONS.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setBraSituation(o)}
                  className={card(braSituation === o)}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 10 && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold">Your new fit is ready!</h2>
            <p className="mb-6 text-sm text-[#666]">
              $20 off your first purchase!
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="mb-4 w-full rounded-lg border border-[#ddd] px-4 py-3.5 outline-none focus:border-[#719B9A]"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (optional)"
              className="w-full rounded-lg border border-[#ddd] px-4 py-3.5 outline-none focus:border-[#719B9A]"
            />
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
