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
  demoBadge?: React.ReactNode;
}

export default function BrandPageLayout({
  children,
  brandName,
  navLinks,
  ctaButton,
  fontFamily = "sans-serif",
  showLogo = true,
  demoBadge,
}: BrandPageLayoutProps) {
  const configTheme = brands[brandName as keyof typeof brands];
  const contextTheme = useBrandTheme();
  const theme = configTheme || contextTheme;

  const colors = theme?.colors || {};
  const socials = theme?.socials || [];
  const legalLinks = theme?.legalLinks || [];
  const companyName =
    (configTheme as any)?.companyName ||
    (configTheme as any)?.name ||
    (theme as any)?.companyName ||
    brandName ||
    "Your Brand";
  const backgroundColor =
    (colors as any)?.pageBackground ||
    (colors as any)?.background ||
    (colors as any)?.primary ||
    "#0A0A0A";

  const headerLogo =
    (theme as any)?.headerLogo ||
    (theme as any)?.navLogo ||
    (theme as any)?.logo ||
    (brandName === "gameon"
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
      : "");

  const isSkillery = (brandName || "").toLowerCase() === "skillery";
  const SKILLERY_BG = "#0A0F18";

  // ✅ Canonical fix
  const pathname = usePathname() || "/";
  const parts = pathname.split("/").filter(Boolean);
  const restSegs = parts.slice(1); // skip brand
  const slug = restSegs.join("/");
  // Pages with dense dashboards should use a compact hero
  const isCompactPage = /^(coach($|\/)|player-profile($|\/)|coach-search$)/.test(slug);

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

  // Force Skillery pages to the exact Skillery blue, leave everything else untouched
  const applySkilleryOverride = isSkillery;

  const resolvedBackground = applySkilleryOverride ? SKILLERY_BG : backgroundColor;

  const footerColor = applySkilleryOverride
    ? SKILLERY_BG
    : ((colors as any)?.footerBackground ||
       (colors as any)?.pageBackground ||
       (colors as any)?.background ||
       (colors as any)?.primary ||
       resolvedBackground);


  const globalCss = applySkilleryOverride
    ? `
      html, body, main { background-color: ${SKILLERY_BG} !important; }
      header, .brand-header, [data-legal-header] { background-color: ${SKILLERY_BG} !important; }
    `
    : `
      html, body { background-color: ${resolvedBackground} !important; }
    `;

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

      <style jsx global>{globalCss}</style>

      <BrandedHeader currentBrand={brandName} />

      {showLogo && (
        <div
          className={`flex justify-center ${
            isCompactPage ? "mt-16 md:mt-20 mb-0" : "mt-20 md:mt-24 mb-1 md:mb-2"
          }`}
          style={{ backgroundColor: resolvedBackground }}
        >
          {(() => {
            const sizeDefault = isCompactPage
              ? "max-h-[210px] md:max-h-[231px]"
              : "max-h-[231px] md:max-h-[254px]";
            const sizeSmall = isCompactPage
              ? "max-h-[170px] md:max-h-[190px]"
              : "max-h-[185px] md:max-h-[208px]";
            return (
              <img
                src={headerLogo}
                alt={`${brandName} logo`}
                className={`w-auto max-w-[520px] mx-auto ${
                  ["styleon", "moneyon"].includes(brandName) ? sizeSmall : sizeDefault
                }`}
                style={{ display: "block" }}
              />
            );
          })()}
        </div>
      )}

      {demoBadge && (
        <div className="flex justify-center mt-3">
          {demoBadge}
        </div>
      )}

      <main
        className="flex flex-col flex-1 w-full"
        style={{ backgroundColor: resolvedBackground }}
      >
        {children}
      </main>

      <div
        style={{
          backgroundColor: footerColor,
          borderTop: isSkillery ? "1px solid rgba(255,255,255,0.10)" : undefined,
        }}
      >
        <BoldFooter
          className={isSkillery ? "mt-auto border-white/10" : "mt-auto"}
          brandName={brandName}
          companyName={companyName}
          socials={socials}
          colors={colors}
          legalLinks={legalLinks}
          ctaButton={ctaButton}
          logoSrc={headerLogo}
        />
      </div>
    </div>
  );
}