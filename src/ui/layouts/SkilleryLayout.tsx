// src/ui/layouts/SkilleryLayout.tsx
"use client";

import React from "react";
import { BoldFooter } from "@/ui/components/BoldFooter";

interface SkilleryLayoutProps {
  children: React.ReactNode;
}

export default function SkilleryLayout({ children }: SkilleryLayoutProps) {
  return (
    <div
      className="min-h-screen w-full flex flex-col justify-between"
      style={{
        backgroundImage: "linear-gradient(to bottom, #0A0F18, #000000)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        fontFamily: "sans-serif",
      }}
    >
      {/* Main page content */}
      <main className="flex-grow flex flex-col">{children}</main>

      {/* Footer with all your neon/glow logic */}
      <BoldFooter
        brandName="Skillery"
        companyName="Skillery, LLC"
        legalLinks={[
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Use", href: "/terms" },
        ]}
      />
    </div>
  );
}