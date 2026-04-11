import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,

  transpilePackages: ["@bosterbio/types"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.medusajs.com" },
      { protocol: "https", hostname: "**.bosterbio.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
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
