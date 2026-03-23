import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bras, Nursing Bras & Supplies, Bra Size Swim & More | Breakout Bras",
  description:
    "Breakout Bras is committed to truth in sizing and full customer support. Shop bras from A to O cups and 28 to 54 bands.",
  authors: [{ name: "Breakout Bras" }],
  robots: "index, follow",
  icons: {
    icon: "https://www.breakoutbras.com/cdn/shop/files/Favicon_8ac6e8fd-29cb-4fca-ab17-ea2bbde7b570_180x180.png?v=1685643316",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
