import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subframe Next.js Starter",
  description: "Your starter kit for integrating Subframe into Next.js",
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

  {/* ✅ Social previews */}
  <meta property="og:image" content="https://skillery.co/skillery_social_512.png" />
  <meta property="twitter:image" content="https://skillery.co/skillery_social_512.png" />
  <meta property="og:title" content="Skillery" />
  <meta property="og:description" content="Unlock your potential." />
</head>

      <body>{children}</body>
    </html>
  );
}
