import type { Config } from "tailwindcss"

/** Brand from Figma asset library: deep blue primary, warm orange accent */
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
          DEFAULT: "#1a365d",
          deep: "#152a4a",
          /** Top bar / footer — maps legacy `brand-dark` */
          dark: "#152a4a",
          /** Hover / mid blue — maps legacy `brand-light` */
          light: "#2c5282",
          muted: "#e8eef6",
          tint: "#f0f5fb",
        },
        accent: {
          DEFAULT: "#f97316",
          hover: "#ea580c",
          soft: "#fff7ed",
        },
        surface: {
          DEFAULT: "#ffffff",
          subtle: "#f4f8fc",
          muted: "#e2eaf3",
        },
        ink: {
          DEFAULT: "#1e293b",
          secondary: "#475569",
          tertiary: "#64748b",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-md": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        title: ["1.25rem", { lineHeight: "1.35", fontWeight: "600" }],
      },
      boxShadow: {
        card: "0 1px 3px rgba(26, 54, 93, 0.06), 0 10px 28px rgba(26, 54, 93, 0.08)",
        nav: "0 1px 0 rgba(26, 54, 93, 0.08)",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
}

export default config
