import type { Metadata } from "next"
import { cookies, headers } from "next/headers"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "BosterBio — Antibodies, ELISA Kits & Research Reagents",
    template: "%s | BosterBio",
  },
  description:
    "High-quality antibodies, ELISA kits, and research reagents for life science research. 16,000+ validated products.",
  metadataBase: new URL("https://bosterbio.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bosterbio.com",
    siteName: "BosterBio",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await cookies()
  await headers()

  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  )
}
