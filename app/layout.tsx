import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { BreakoutBrasHeader } from "@/components/breakout-bras/BreakoutBrasHeader";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Bras, Nursing Bras & Supplies, Bra Size Swim & More | Breakout Bras",
  description:
    "Breakout Bras is committed to truth in sizing and full customer support. Shop bras from A to O cups and 28 to 54 bands.",
  authors: [{ name: "Breakout Bras" }],
  robots: "index, follow",
  icons: {
    icon: "/logo/logo-grey.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning style={{ minHeight: "100dvh" }}>
      <body
        className={`${montserrat.variable} ${cormorant.variable} font-sans antialiased`}
        style={{ minHeight: "100dvh", margin: 0 }}
        suppressHydrationWarning
      >
        <noscript>
          <div
            style={{
              padding: "1rem",
              fontFamily: "system-ui, sans-serif",
              background: "#fff8e6",
              borderBottom: "1px solid #e6d9a8",
            }}
          >
            JavaScript is required for the full Breakout Bras experience (quiz, navigation). Enable JavaScript in your
            browser, or open this site in a regular browser window (not a stripped-down preview).
          </div>
        </noscript>
        <BreakoutBrasHeader />
        <main id="main" className="w-full min-h-[100dvh]">
          {children}
        </main>
      </body>
    </html>
  );
}
