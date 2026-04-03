import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Transpile shared packages from the monorepo
  transpilePackages: ["@bosterbio/types"],

  images: {
    remotePatterns: [
      // Medusa API media
      { protocol: "https", hostname: "**.medusajs.com" },
      // Cloudflare CDN
      { protocol: "https", hostname: "**.bosterbio.com" },
    ],
  },

  // Headers for security
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
