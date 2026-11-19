import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08080f",
        foreground: "#f8fafc",
        vice: {
          pink: "#ff007f",
          cyan: "#00f0ff",
          purple: "#8a2be2",
          gold: "#fbbf24",
          dark: "#0b0b14",
          card: "rgba(18, 18, 30, 0.75)",
          border: "rgba(255, 255, 255, 0.08)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-orbitron)", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2.5s infinite ease-in-out",
        "stream-flow": "stream-flow 1.5s infinite linear",
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", filter: "drop-shadow(0 0 15px rgba(0,240,255,0.4))" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 30px rgba(255,0,127,0.8))" },
        },
        "stream-flow": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
