import { cookies, headers } from "next/headers"
import { SiteShell } from "@/components/site/SiteShell"

export default async function AboutUsLayout({ children }: { children: React.ReactNode }) {
  await cookies()
  await headers()
  return <SiteShell>{children}</SiteShell>
}
