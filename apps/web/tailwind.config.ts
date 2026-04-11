import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0057A8",
          light: "#1A6BB8",
          dark: "#003D7A",
          muted: "#E8F1F9",
        },
        accent: {
          DEFAULT: "#E8720C",
          hover: "#C75F09",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F5F7FA",
          muted: "#E9EEF4",
        },
        ink: {
          DEFAULT: "#1A2332",
          secondary: "#4A5568",
          tertiary: "#718096",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-md": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "title": ["1.25rem", { lineHeight: "1.35", fontWeight: "600" }],
      },
      boxShadow: {
        card: "0 1px 3px rgba(26, 35, 50, 0.06), 0 8px 24px rgba(26, 35, 50, 0.06)",
        nav: "0 1px 0 rgba(26, 35, 50, 0.08)",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
}

export default config
