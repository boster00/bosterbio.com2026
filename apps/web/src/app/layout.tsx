import type { Metadata } from "next"
import "./globals.css"

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
