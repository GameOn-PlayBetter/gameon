"use client";

import React from "react";
import { BoldFooter } from "@/ui/components/BoldFooter";
import { useBrandTheme } from "@/app/context/BrandThemeContext";
import BrandedHeader from "@/ui/components/BrandedHeader"; // ✅ Added
import { brands } from "@/lib/brands"; // ✅ IMPORT AT TOP


interface BrandPageLayoutProps {
  children: React.ReactNode;
  brandName: string;
  navLinks?: { label: string; href?: string; onClick?: () => void }[];
  ctaButton?: { label: string; href: string };
  fontFamily?: string;
}

export default function BrandPageLayout({
  children,
  brandName,
  navLinks,
  ctaButton,
  fontFamily = "sans-serif",
}: BrandPageLayoutProps) {
  // ✅ Only one definition
  const theme = useBrandTheme() || brands[brandName as keyof typeof brands];

  const colors = theme?.colors || {};
  const socials = theme?.socials || [];
  const legalLinks = theme?.legalLinks || [];
  const companyName = theme?.companyName || brandName || "Your Brand";
  const backgroundColor = (colors as any)?.primary || "#0A0A0A";

  const headerLogo =
    brandName === "gameon"
      ? "/images/gameon/go-logo.png"
      : brandName === "skillery"
      ? "/images/skillery_logo_wheadline.png"
      : brandName === "fixon"
      ? "/images/fixon/fixon_logo_shinier.png"
      : brandName === "fiton"
      ? "/images/fiton/fiton_logo.png"
      : brandName === "codeon"
      ? "/images/codeon/codeon-logo.png"
      : brandName === "jamon"
      ? "/jamon/jamon_logo.png"
      : brandName === "learnon"
      ? "/images/learnon/learnon-logo.png"
      : "";

  const resolvedBackground =
    brandName === "skillery" ? "transparent" : backgroundColor;

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{
        backgroundColor: resolvedBackground,
        fontFamily: theme?.fontFamily || fontFamily,
      }}
    >
      {/* HEADER replaced with BrandedHeader */}
      <BrandedHeader />

      {/* Center Logo (forced render) */}
      <div
        className="flex justify-center my-6 md:my-10 pt-20"
        style={{ backgroundColor: resolvedBackground }}
      >
<img
  src={headerLogo}
  alt={`${brandName} logo`}
  className="max-h-[400px] w-auto max-w-[600px] mx-auto"
  style={{ display: "block" }}
/>
      </div>

      {/* MAIN CONTENT - pulled closer to logo */}
      <main
        className="flex flex-col grow w-full -mt-12"
        style={{ backgroundColor: resolvedBackground }}
      >
        {children}
      </main>

      {/* FOOTER */}
      <BoldFooter
        className="mt-auto"
        brandName={brandName}
        companyName={companyName}
        socials={socials}
        colors={colors}
        legalLinks={legalLinks}
        ctaButton={ctaButton}
        logoSrc={headerLogo}
      />
    </div>
  );
}