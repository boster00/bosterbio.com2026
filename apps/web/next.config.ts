import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,

  transpilePackages: ["@bosterbio/types"],

  /**
   * Don't fail prod builds on ESLint. The default Next 15 config flags
   * `React` as undefined in files using `React.ReactNode` (modern JSX
   * transform doesn't need the import). TypeScript still validates types
   * during the build. Re-enable once we either (a) import React explicitly
   * in those files or (b) add a project-level ESLint config that declares
   * React as a global.
   */
  eslint: {
    ignoreDuringBuilds: true,
  },

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
