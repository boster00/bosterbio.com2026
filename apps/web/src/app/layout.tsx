import type { Metadata } from "next"
import { cookies, headers } from "next/headers"
import { Josefin_Sans, Mulish } from "next/font/google"
import { TrackingNoscript, TrackingScripts } from "@/components/site/TrackingScripts"
import "./globals.css"

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const mulish = Mulish({
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
  manifest: "/manifest.webmanifest",
}

// Next.js 15 wants themeColor + viewport in a separate export.
export const viewport = {
  themeColor: "#1a365d",
  width: "device-width",
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await cookies()
  await headers()
  return (
    <html lang="en" className={`${josefin.variable} ${mulish.variable}`}>
      <head>
        <TrackingScripts />
      </head>
      <body className="min-h-screen font-sans">
        <TrackingNoscript />
        {children}
      </body>
    </html>
  )
}
