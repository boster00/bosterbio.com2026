import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Design tokens — populate from Figma once accessible
      colors: {
        brand: {
          DEFAULT: "#0057A8", // placeholder — update from Figma
          light: "#3A7FBF",
          dark: "#003D7A",
        },
        accent: {
          DEFAULT: "#E8720C", // placeholder
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}

export default config
