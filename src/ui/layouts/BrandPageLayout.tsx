// src/ui/layouts/BrandPageLayout.tsx
"use client";

import React from "react";
import { SkilleryFooter } from "@/ui/components/SkilleryFooter"; // Or make footer dynamic later

interface BrandPageLayoutProps {
  children: React.ReactNode;
  logo?: string;
  backgroundColor?: string;
}

export default function BrandPageLayout({
  children,
  logo = "/images/skillery_logo_wheadline.png", // fallback logo
  backgroundColor = "#010818", // fallback color
}: BrandPageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor }}>
     <main className="flex-grow w-full flex flex-col items-center justify-center text-white px-4">
<img
  src={logo}
  alt="Brand Logo"
  className="w-full max-w-[480px] h-auto px-6 mb-8"
/>
  {children}
</main>
      <SkilleryFooter />
    </div>
  );
}