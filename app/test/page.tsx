import Link from "next/link";

/** Minimal page — if this loads but `/` does not, the issue is in the home page tree. */
export default function TestPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <p>OK — server is running.</p>
      <p>
        <Link href="/">Home</Link>
      </p>
    </main>
  );
}
