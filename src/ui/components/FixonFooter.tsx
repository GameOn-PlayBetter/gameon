// src/ui/components/FixonFooter.tsx
import React from "react";
import BrandedFooter from "@/ui/components/BrandedFooter";

import BrandedFooter from "@/ui/components/BrandedFooter";

export default function FixonFooter() {
  return (
    <BrandedFooter
      brandName="FixOn"
      description="FixOn is a live support platform connecting DIYers and fixers with expert help. All sessions are recorded for safety and learning. FixOn is not affiliated with any manufacturer or brand mentioned by experts."
      legalLinks={[
        { href: "/coach-requirements", label: "Coach Requirements" },
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
        { href: "/cookie-policy", label: "Cookie Policy" },
        { href: "/contact", label: "Contact" },
      ]}
      companyName="Skillery LLC"
      logoSrc="/images/fixon/fixonlogo_cropped.png"
      primaryColor="orange-400"
    />
  );
}