/**
 * Prevents React from rendering SyntheticEvent/DOM Event as text ("[object Event]") when
 * state is accidentally set to an event (e.g. onChange={setX} instead of e => setX(e.target.value)).
 */

function isSyntheticEventLike(value: unknown): value is { target?: unknown; nativeEvent?: unknown } {
  return (
    typeof value === "object" &&
    value !== null &&
    ("nativeEvent" in value || ("target" in value && typeof (value as { preventDefault?: unknown }).preventDefault === "function"))
  );
}

/** Coerce unknown values to a plain string for controlled inputs and display. */
export function safeString(value: unknown): string {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  if (typeof value === "number" && !Number.isNaN(value)) return String(value);
  if (typeof value === "boolean") return String(value);
  if (typeof value === "object") {
    if (typeof Event !== "undefined" && value instanceof Event) return "";
    if (isSyntheticEventLike(value)) {
      const t = value.target;
      if (t && typeof t === "object" && "value" in t && typeof (t as HTMLInputElement).value === "string") {
        return (t as HTMLInputElement).value;
      }
      return "";
    }
  }
  return "";
}

/** Safe one-line message for error boundaries / dev overlay display. */
export function safeErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message || "Unknown error";
  if (typeof err === "string") return err;
  if (typeof err === "object" && err !== null) {
    if (typeof Event !== "undefined" && err instanceof Event) {
      return "A browser event was passed where a string or Error was expected. Check onChange handlers use e.target.value.";
    }
    if ("message" in err && typeof (err as { message: unknown }).message === "string") {
      return (err as { message: string }).message;
    }
  }
  return "Something went wrong.";
}
