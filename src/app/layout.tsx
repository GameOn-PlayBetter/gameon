// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Skillery",
  description: "Unlock Your Potential",
  metadataBase: new URL("https://skillery.co"), // 👈 added line
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Skillery",
              url: "https://skillery.co",
              sameAs: [
                "https://bsky.app/profile/skillery.bsky.social",
                "https://www.instagram.com/skillery.co/",
                "https://discord.com/invite/FpydNne7",
                "https://www.linkedin.com/company/skillery-co"
              ]
            }),
          }}
        />
      </head>
      <body className="bg-black text-white overflow-x-hidden m-0 p-0">
        {children}
      </body>
    </html>
  );
}