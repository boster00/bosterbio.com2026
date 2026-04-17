import type { Config } from "tailwindcss"

/** BosterBio 2026 design system — primary blue, accent orange, light blue */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        brand: {
          /** Primary blue #004C95 */
          DEFAULT: "#004C95",
          primary: "#004C95",
          deep: "#003366",
          dark: "#002847",
          /** Light blue accent #3CA9D6 */
          light: "#3CA9D6",
          sky: "#3CA9D6",
          muted: "#e8eef6",
          tint: "#f0f7fc",
        },
        accent: {
          /** Orange #EA8D28 */
          DEFAULT: "#EA8D28",
          warm: "#EA8D28",
          hover: "#d67a1c",
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
        heading: ["var(--font-heading)", "var(--font-sans)", "system-ui", "sans-serif"],
        /** Alias for legacy components — same as heading (Josefin) */
        display: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-md": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        title: ["1.25rem", { lineHeight: "1.35", fontWeight: "600" }],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 76, 149, 0.08), 0 10px 28px rgba(0, 76, 149, 0.1)",
        nav: "0 1px 0 rgba(0, 76, 149, 0.08)",
      },
      maxWidth: {
        content: "1200px",
        /** Product PLP/PDP smoke layout — align with 1440 Figma exports */
        smoke: "1440px",
      },
    },
  },
  plugins: [],
}

export default config
