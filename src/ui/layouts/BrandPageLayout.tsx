"use client";

import React from "react";
import Head from "next/head"; // ✅ Added
import { usePathname } from "next/navigation"; // ✅ Added
import { BoldFooter } from "@/ui/components/BoldFooter";
import { useBrandTheme } from "@/app/context/BrandThemeContext";
import BrandedHeader from "@/ui/components/BrandedHeader";
import { brands } from "@/lib/brands";

interface BrandPageLayoutProps {
  children: React.ReactNode;
  brandName: string;
  navLinks?: { label: string; href?: string; onClick?: () => void }[];
  ctaButton?: { label: string; href: string };
  fontFamily?: string;
  showLogo?: boolean;
}

export default function BrandPageLayout({
  children,
  brandName,
  navLinks,
  ctaButton,
  fontFamily = "sans-serif",
}: BrandPageLayoutProps) {
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
      ? "/images/jamon/jamon_logo.png"
      : brandName === "learnon"
      ? "/images/learnon/learnon-logo.png"
      : brandName === "growon"
      ? "/images/growon/growon-logo1.png"
      : brandName === "cookon"
      ? "/images/cookon/cookon-logo.png"
      : brandName === "styleon"
      ? "/images/styleon/styleon-logo.png"
      : brandName === "moneyon"
      ? "/images/moneyon/moneyon-logo.png"
      : "";

  const resolvedBackground =
    brandName === "skillery" ? "transparent" : backgroundColor;

  // ✅ Canonical fix
  const pathname = usePathname() || "/";
  const parts = pathname.split("/").filter(Boolean);
  const restSegs = parts.slice(1); // skip brand
  const slug = restSegs.join("/");

  const DUPLICATE_SLUGS = new Set([
    "contact",
    "terms-of-service",
    "cookie-policy",
    "safety-guidelines",
    "coach-requirements-eligibility",
  ]);

  const canonicalHref =
    slug && DUPLICATE_SLUGS.has(slug)
      ? `https://skillery.co/${slug}`
      : null;

  return (
    <div
      className="min-h-screen w-full flex flex-col overflow-x-hidden"
      style={{
        backgroundColor: resolvedBackground,
        fontFamily: theme?.fontFamily || fontFamily,
      }}
    >
      {canonicalHref && (
        <Head>
          <link rel="canonical" href={canonicalHref} />
        </Head>
      )}

      <BrandedHeader />

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

      <main
        className="flex flex-col grow w-full -mt-12"
        style={{ backgroundColor: resolvedBackground }}
      >
        {children}
      </main>

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