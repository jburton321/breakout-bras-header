import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        content: "var(--content-width, 1600px)",
        wrapper: "var(--content-wrapper, 1320px)",
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
