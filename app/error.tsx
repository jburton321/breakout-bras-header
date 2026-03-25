"use client";

import { safeErrorMessage } from "@/lib/safeReactText";

/**
 * Catches runtime errors in the app segment tree (including many server render failures
 * surfaced to the client). Pair with `npm run dev` after a clean cache if you see 500s.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-xl font-semibold text-neutral-900">Something went wrong</h1>
      <p className="text-sm text-neutral-600">
        {process.env.NODE_ENV === "development" ? safeErrorMessage(error) : "Please try again."}
      </p>
      <button
        type="button"
        className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
