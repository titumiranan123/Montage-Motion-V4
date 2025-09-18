import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1FB5DD",
      },
      fontFamily: {
        popins: ["var(--font-poppins)"],
        opensans: ["var( --font-open-sans)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
