import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#F5F5F7",
          dark: "#08080A",
        },
        coti: {
          violet: "#8B5CF6",
          "violet-light": "#C4B5FD",
          cyan: "#06B6D4",
          emerald: "#10B981",
          amber: "#F59E0B",
          dark: "#0D0E12",
        },
        border: {
          subtle: "rgba(0, 0, 0, 0.06)",
          dark: "rgba(255, 255, 255, 0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "card-rest": "0 4px 20px -2px rgba(0, 0, 0, 0.03)",
        "card-elevated": "0 12px 32px -8px rgba(0, 0, 0, 0.04)",
        "card-hover": "0 20px 48px -12px rgba(0, 0, 0, 0.08)",
        "btn-black": "0 8px 20px -4px rgba(0, 0, 0, 0.25)",
        "btn-black-hover": "0 12px 28px -6px rgba(0, 0, 0, 0.35)",
        "dark-card": "0 20px 50px -10px rgba(0, 0, 0, 0.5)",
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};

export default config;
