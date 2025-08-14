"use client";

import React from "react";
import * as SubframeUtils from "../utils";
import Link from "next/link";
import Image from "next/image";
import { useBrandTheme } from "@/app/context/BrandThemeContext";

import {
  FeatherInstagram,
  FeatherTwitter,
  FeatherTwitch,
  FeatherMessageCircle,
} from "@subframe/core";

interface BoldFooterRootProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  className?: string;
  ctaButton?: { label: string; href: string };
  companyName?: string;
  logoSrc?: string;
  socials?: { icon: string; href: string }[];
  colors?: {
    primary?: string;
    button?: string;
    buttonHover?: string;
    text?: string;
    hover?: string;
  };
  legalLinks?: { label: string; href: string }[];
}

const FeatherIconsMap: Record<string, React.ElementType> = {
  instagram: FeatherInstagram,
  twitter: FeatherTwitter,
  tiktok: FeatherTwitch,
  discord: FeatherMessageCircle,
};

// 🔹 Neon pulse animation for social icons
const neonPulse = `
@keyframes neonPulse {
  0%, 100% {
    filter: drop-shadow(0 0 4px rgba(255,0,200,0.9))
            drop-shadow(0 0 8px rgba(0,207,255,0.8))
            drop-shadow(0 0 15px rgba(255,0,200,0.7));
  }
  50% {
    filter: drop-shadow(0 0 6px rgba(0,207,255,0.9))
            drop-shadow(0 0 12px rgba(255,0,200,0.8))
            drop-shadow(0 0 20px rgba(0,207,255,0.7));
  }
}
`;

const BoldFooterRoot = React.forwardRef<HTMLDivElement, BoldFooterRootProps>(
  function BoldFooterRoot(
    {
      brandName,
      className,
      ctaButton,
      companyName,
      logoSrc,
      socials = [],
      colors = {},
      legalLinks = [],
      ...otherProps
    },
    ref
  ) {
    const theme = useBrandTheme();

    const brandCompany = companyName || theme?.companyName || "Your Brand";
    const brandLogo = logoSrc || theme?.logo || "";
    const brandTokens = (theme as any)?.tokens || {};
    const brandColors = { ...theme?.colors, ...colors };
    const brandSocials = socials.length ? socials : theme?.socials || [];
    const brandLegal =
      legalLinks.length ? legalLinks : (theme as any)?.legalLinks || [];

    // ✅ Prefer tokens first, then colors
    const palette = (theme?.colors as any) || {};
    const footerBackground =
      brandTokens.footerBackground ??
      brandTokens.pageBackground ??
      palette.footerBackground ??
      palette.pageBackground ??
      palette.background ??
      palette.primary ??
      "#0A0A0A";

    const hoverColor = brandColors.button || "#FF00C8";

    // Split legal links into rows of 4
    const legalRows: { label: string; href: string }[][] = [];
    for (let i = 0; i < brandLegal.length; i += 4) {
      legalRows.push(brandLegal.slice(i, i + 4));
    }

// ✅ Safe link handler: prevents /brand/brand/path
const formatHref = (href: string) => {
  if (!brandName) return href;

  // ✅ For Skillery, always use root-level pages
  if (brandName.toLowerCase() === "skillery") {
    return href;  // <-- no brand prefix
  }

  // ✅ Any other brand only prepends if not already included
  if (href.startsWith(`/${brandName}`) || href.startsWith("/brand")) {
    return href;
  }

  return `/${brandName}${href}`;
};

    return (
      <div
        className={SubframeUtils.twClassNames(
          "w-full border-t border-solid border-neutral-100 px-6 py-24 text-white",
          className
        )}
        style={{ backgroundColor: footerBackground, color: "white" }}
        ref={ref}
        {...otherProps}
      >
        <style>{neonPulse}</style>

        {/* Top Section */}
        <div className="w-full flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
          {/* Left: Logo */}
          <div className="flex w-full md:w-1/3 justify-end pr-4 items-start">
            {brandLogo && (
              <div className="relative h-[120px] w-[320px] md:h-[140px] md:w-[360px]">
                <Image
                  src={brandLogo}
                  alt={`${brandCompany} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>

          {/* Middle: Legal Links */}
          <div className="flex flex-col gap-4 w-full md:w-1/3 text-lg">
            {legalRows.map((row, idx) => (
              <div
                key={idx}
                className="flex flex-wrap gap-x-6 gap-y-2 text-white justify-center"
              >
                {row.map((link: { label: string; href: string }) => (
                  <Link
                    key={link.label}
                    href={formatHref(link.href)}
                    className="transition"
                    style={{ color: "white", transition: "color 0.3s" }}
                    onMouseOver={(e) => {
                      (e.target as HTMLElement).style.color = hoverColor;
                    }}
                    onMouseOut={(e) => {
                      (e.target as HTMLElement).style.color = "white";
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Right: Neon Glowing Social Icons */}
          <div className="flex w-full md:w-1/3 justify-start pl-4">
            <div className="flex items-center gap-6">
              {brandSocials.map((social) => {
                const Icon = FeatherIconsMap[social.icon];
                return Icon ? (
                  <a
                    key={social.icon}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-125"
                  >
                    <Icon
                      className="w-12 h-12 text-white"
                      style={{
                        animation: "neonPulse 2s infinite ease-in-out",
                      }}
                    />
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-neutral-200 mt-12" />

        {/* Footer Text */}
        <div className="mx-auto max-w-[768px] flex flex-col items-center gap-4 mt-6 text-center text-subtext-color text-[16px] font-medium leading-[22px] font-['Montserrat'] whitespace-pre-wrap">
          <span>© {brandCompany} 2025</span>
          <span>
            {brandCompany} is an independent digital platform connecting users and
            coaches for live sessions, education, and support.
            <br />
            All sessions may be recorded for safety. All coaches are vetted.
            <br />
            {brandCompany}. All rights reserved. Based in Texas, operating across
            galaxies (as long as they have decent ping).
            <br />
            Not affiliated with any game publisher, appliance maker, or repair
            service. All trademarks are the property of their respective owners.
          </span>
        </div>
      </div>
    );
  }
);

export const BoldFooter = BoldFooterRoot;