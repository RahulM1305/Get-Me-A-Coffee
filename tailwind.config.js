/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF6EE",
        paper: "#FFFDF7",
        ink: {
          DEFAULT: "#221A12",
          soft: "#4A3F33",
        },
        mocha: "#7A6A58",
        latte: {
          DEFAULT: "#E9DFCE",
          dark: "#D8CBB4",
        },
        roast: {
          DEFAULT: "#D4551E",
          dark: "#B54312",
          light: "#F7E4D4",
        },
        moss: "#4C7A4C",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-instrument)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(34,26,18,0.05), 0 8px 24px -8px rgba(34,26,18,0.10)",
        lift: "0 2px 4px rgba(34,26,18,0.06), 0 18px 44px -12px rgba(34,26,18,0.20)",
        note: "0 12px 28px -10px rgba(34,26,18,0.22)",
      },
      borderRadius: {
        "2.5xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
