import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        foreground: "#f4f4f5",
        panel: "#111113",
        panel2: "#18181b",
        border: "#27272a",
        command: "#dc2626",
        command2: "#facc15",
        success: "#22c55e",
        warning: "#eab308"
      },
      boxShadow: {
        glow: "0 0 32px rgba(220, 38, 38, 0.22)"
      }
    }
  },
  plugins: [animate]
};

export default config;
