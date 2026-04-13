import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://sdrqhejvvmbolqzfujej.supabase.co"
const anonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable_hXnqxeLhrPGeBtUsDEKsVg_c5gtqQfC"

/** Read-only browser / server client (anon key). */
export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})
