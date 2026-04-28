// Web App Manifest — enables Add-to-Home-Screen on mobile.
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Boster Bio — Antibodies, ELISA Kits & Research Reagents",
    short_name: "BosterBio",
    description: "Trusted antibodies, ELISA kits, and research reagents for life science labs.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1a365d",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  };
}
