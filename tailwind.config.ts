import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-dm-serif)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      colors: {
        sage: "#8F9F82",
        forest: "#2A3324",
        cream: "#F5F0E8",
        mist: "#C8D4BF",
        parchment: "#EDE8DC",
        charcoal: "#1A1F18",
      },
      letterSpacing: {
        widest: "0.15em",
      },
    },
  },
  plugins: [],
};
export default config;
