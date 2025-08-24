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
      <body className="bg-black text-white overflow-x-hidden m-0 p-0">
        {children}
      </body>
    </html>
  );
}