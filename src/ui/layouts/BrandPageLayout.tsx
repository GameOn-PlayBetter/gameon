// src/ui/layouts/BrandPageLayout.tsx
import React from "react";
import BrandedFooter from "@/ui/components/BrandedFooter";

interface LinkItem {
  label: string;
  href: string;
}

interface BrandPageLayoutProps {
  children: React.ReactNode;
  brandName: string;
  description: string;
  legalLinks: LinkItem[];
  bottomText?: string;
  companyName?: string;
  logoSrc?: string;
  primaryColor?: string;
  rightColumnContent?: React.ReactNode;
}

export default function BrandPageLayout({
  children,
  brandName,
  description,
  legalLinks,
  bottomText,
  companyName,
  logoSrc,
  primaryColor,
  rightColumnContent,
}: BrandPageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white">
      <main className="flex-grow">{children}</main>
      <BrandedFooter
        brandName={brandName}
        description={description}
        legalLinks={legalLinks}
        bottomText={bottomText}
        companyName={companyName}
        logoSrc={logoSrc}
        primaryColor={primaryColor}
        rightColumnContent={rightColumnContent}
      />
    </div>
  );
}