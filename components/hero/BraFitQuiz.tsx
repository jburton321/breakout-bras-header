"use client";

import { useCallback, useMemo, useState } from "react";

const TOTAL_STEPS = 9;

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

export function BraFitQuiz() {
  const [step, setStep] = useState(1);
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
    email,
  ]);

  const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  const card = (sel: boolean) =>
    `cursor-pointer rounded-lg border px-4 py-4 text-center text-sm font-medium transition ${
      sel
        ? "border-[#3b3a36] bg-[#3b3a36] text-white"
        : "border-[#ddd] bg-white hover:border-[#a49184] hover:bg-[#f7ede2]"
    }`;

  return (
    <div className="w-full max-w-[600px] rounded-2xl bg-white p-8 text-[#3b3a36] shadow-xl sm:p-10">
      <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-[#eee]">
        <div
          className="h-full bg-[#a49184] transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {step > 1 && (
        <button
          type="button"
          onClick={() => setStep((s) => s - 1)}
          className="mb-5 border-0 bg-transparent text-sm font-medium text-[#a49184] hover:text-[#3b3a36]"
        >
          ← Back
        </button>
      )}

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
                  className="rounded-lg border border-[#ddd] bg-white px-4 py-3.5 outline-none focus:border-[#a49184]"
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
                  className="rounded-lg border border-[#ddd] bg-white px-4 py-3.5 outline-none focus:border-[#a49184]"
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
                className="mb-2 mt-6 h-1.5 w-full cursor-pointer appearance-none rounded bg-[#ddd] accent-[#3b3a36]"
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
                className="mb-2 mt-6 h-1.5 w-full cursor-pointer appearance-none rounded bg-[#ddd] accent-[#3b3a36]"
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
              className="mb-4 w-full rounded-lg border border-[#ddd] px-4 py-3.5 outline-none focus:border-[#a49184]"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (optional)"
              className="w-full rounded-lg border border-[#ddd] px-4 py-3.5 outline-none focus:border-[#a49184]"
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
            className="w-full rounded-full bg-[#3b3a36] px-10 py-4 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-[#ccc]"
          >
            NEXT
          </button>
        ) : (
          <button
            type="button"
            disabled={!canNext}
            onClick={() => {
              console.log({ bandSize, cupSize, brablems, styles, preferences, email, phone });
              alert("Quiz Submitted! Check console.");
            }}
            className="w-full rounded-full bg-[#3b3a36] px-10 py-4 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-[#ccc]"
          >
            GET RESULTS
          </button>
        )}
      </div>
    </div>
  );
}
