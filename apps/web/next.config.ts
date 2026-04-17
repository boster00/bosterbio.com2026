import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,

  transpilePackages: ["@bosterbio/types"],

  /**
   * Puppeteer and some tools use http://127.0.0.1:3000 while the browser may
   * treat that as cross-origin vs localhost for /_next/* assets in dev.
   * Without this, CSS/JS chunks can be blocked and inner routes look unstyled.
   */
  allowedDevOrigins: ["127.0.0.1", "localhost"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.medusajs.com" },
      { protocol: "https", hostname: "**.bosterbio.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ]
  },
}

export default nextConfig
