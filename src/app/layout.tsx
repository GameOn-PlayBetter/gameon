import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skillery — Unlock Your Potential",
  description: "Live expert coaching across skills, trades, and passions. Finally learn it. Live.",
  keywords: ["Skillery", "Live Coaching", "Online Learning", "Skill Mastery", "Tutoring", "FixOn", "JamOn", "GameOn"],
  openGraph: {
    title: "Skillery — Unlock Your Potential",
    description: "Real help. Real experts. Real learning — live.",
    url: "https://skillery.co",
    siteName: "Skillery",
    images: [
      {
        url: "https://skillery.co/skillery_social_512.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skillery — Unlock Your Potential",
    description: "Live expert coaching across skills, trades, and passions.",
    images: ["https://skillery.co/skillery_social_512.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossOrigin="anonymous"
  />
  {/* eslint-disable-next-line */}
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
    rel="stylesheet"
  />

  {/* ✅ Favicon */}
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="apple-touch-icon" href="/skillery_social_512.png" />
</head>

      <body>{children}</body>
    </html>
  );
}
