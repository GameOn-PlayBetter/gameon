"use client";

import React from "react";
import Link from "next/link";
import { BoldFooter } from "@/ui/components/BoldFooter";

interface BrandPageLayoutProps {
  children: React.ReactNode;
  brandName: string;
  logoSrc: string;
  companyName?: string;
  description?: string;
  ctaButton?: { label: string; href: string };
  navLinks?: { label: string; href?: string; onClick?: () => void }[];
  legalLinks?: { label: string; href: string }[];
  bottomText?: string;
  primaryColor?: string;
  glowColor?: string;
  colors?: {
    button: string;
    buttonHover: string;
    text?: string;
    hover?: string;
    border?: string;
    glow?: string;
  };
  fontFamily?: string;
  socials?: { icon: string; href: string }[];
  hideHeaderLogo?: boolean; // ✅ new prop to suppress top logo
}

export default function BrandPageLayout({
  children,
  brandName,
  logoSrc,
  companyName,
  description,
  ctaButton,
  navLinks,
  legalLinks,
  bottomText,
  primaryColor = "#000000",
  glowColor,
  colors,
  fontFamily = "sans-serif",
  socials,
  hideHeaderLogo = false, // ✅ default to false
}: BrandPageLayoutProps) {
return (
  <div
    className="min-h-screen w-full"
    style={{
      background: "linear-gradient(to bottom, #020A16, #000000)",
      fontFamily
    }}
  >
    <header className="w-full px-6 py-4 flex justify-between items-center">
      {logoSrc && !hideHeaderLogo && (
        <Link href={`/brand/${brandName}`} className="flex items-center">
          <img
              src={logoSrc}
              alt="Brand Logo"
              className="w-auto"
              style={{
                height: "72px",
                maxHeight: "72px",
                marginTop: "-12px",
                marginBottom: "-12px",
              }}
            />
          </Link>
        )}
      </header>

      <main className="flex flex-col grow w-full">{children}</main>

      <BoldFooter
        logoSrc={logoSrc}
        companyName={companyName}
        brandName={brandName}
        description={description}
        legalLinks={legalLinks}
        bottomText={bottomText}
        ctaButton={ctaButton}
        navLinks={navLinks}
        colors={colors}
        glowColor={glowColor}
        socials={socials}
      />
    </div>
  );
}