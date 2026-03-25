"use client";

import "./globals.css";
import { safeErrorMessage } from "@/lib/safeReactText";

/**
 * Root-level error UI when the root layout fails. Must define its own html/body
 * (replaces the entire root layout when active).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" style={{ minHeight: "100dvh" }}>
      <body style={{ margin: 0, minHeight: "100dvh", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Something went wrong</h1>
        <p style={{ color: "#444", maxWidth: "36rem" }}>
          {process.env.NODE_ENV === "development" ? safeErrorMessage(error) : "Please refresh the page or try again."}
        </p>
        <button
          type="button"
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "9999px",
            border: "none",
            background: "#171717",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={() => reset()}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
