import { defineConfig, loadEnv, Modules } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },

  admin: {
    // Disable built-in admin in production; deploy separately if needed
    disable: process.env.NODE_ENV === "production",
  },

  modules: [
    // ─── Payment Provider (swappable abstraction) ────────────────────────────
    // To swap providers: change PAYMENT_PROVIDER env var and add the new
    // provider's resolve path here. No storefront code should change.
    {
      resolve: "./src/modules/payment",
      options: {
        provider: process.env.PAYMENT_PROVIDER || "stripe",
        apiKey: process.env.STRIPE_API_KEY,
      },
    },
  ],

  plugins: [],
})
