import type { Config } from "tailwindcss";

/**
 * Breakpoints are pinned here (Tailwind defaults) so the project does not drift
 * silently when upgrading Tailwind. Use `px-page` in globals.css for shared gutters.
 * @see lib/breakpoints.ts for the same values in TS (matchMedia, etc.)
 */
export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      maxWidth: {
        content: "var(--content-width, 1600px)",
        wrapper: "var(--content-wrapper, 1520px)",
      },
      colors: {
        breakout: {
          teal: "#719B9A",
          gray: "#4D5152",
          light: "#E0E0E0",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
