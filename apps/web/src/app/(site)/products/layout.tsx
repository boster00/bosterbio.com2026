import type { ReactNode } from "react"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-catalog-inter",
})

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return <div className={`${inter.className} antialiased`}>{children}</div>
}
