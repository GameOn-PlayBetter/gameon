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
  FeatherLinkedin,
} from "@subframe/core";


import { siX, siBluesky, siDiscord } from "simple-icons/icons";

type BoldFooterRootProps = {
  brandName?: string;
  className?: string;
  ctaButton?: React.ReactNode;
  companyName?: string;
  logoSrc?: string;
  socials?: { icon: string; href: string }[];
  colors?: Record<string, string>;
  legalLinks?: { label: string; href: string }[];
  [key: string]: any;
};

const IconX: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className="w-[18px] h-[18px]" {...props}>
    <path d={siX.path} />
  </svg>
);

const IconBlueSky: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className="w-[18px] h-[18px]" {...props}>
    <path d={siBluesky.path} />
  </svg>
);

const IconDiscord: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className="w-[20px] h-[20px]" {...props}>
    <path d={siDiscord.path} />
  </svg>
);

const FeatherIconsMap: Record<string, React.ElementType> = {
  instagram: FeatherInstagram,
  twitter: IconX,
  x: IconX,
  bluesky: IconBlueSky,
  linkedin: FeatherLinkedin,
  tiktok: FeatherTwitch,
  discord: IconDiscord,
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

    const fallbackSkillerySocials = [
      { icon: "linkedin", href: "https://www.linkedin.com/company/skillery-co" },
      { icon: "bluesky",  href: "https://bsky.app/profile/skillery.bsky.social" },
      { icon: "instagram", href: "https://www.instagram.com/skillery.co/" },
    ];

    const isSkillery = (
      (brandName ?? (theme as any)?.brandName ?? (theme as any)?.companyName ?? "")
        .toLowerCase()
        .includes("skillery")
    );

    const effectiveSocials =
      brandSocials.length > 0
        ? brandSocials
        : (isSkillery ? fallbackSkillerySocials : []);

    const globalDiscord = { icon: "discord", href: "https://discord.gg/FpydNne7" };
    const socialsWithDiscord = (
      effectiveSocials.some(s => (s.icon || "").toLowerCase() === "discord")
        ? effectiveSocials
        : [...effectiveSocials, globalDiscord]
    );

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

    const finalFooterBackground = (isSkillery ? "transparent" : footerBackground);

    const isNavyFooter = (footerBackground || "").toLowerCase() === "#0f1e30";

    const hoverColor = brandColors.button || "#FF00C8";

    // Split legal links into rows of 3 (prevents wrapping with fixed width)
    const legalRows: { label: string; href: string }[][] = [];
    for (let i = 0; i < brandLegal.length; i += 3) {
      legalRows.push(brandLegal.slice(i, i + 3));
    }
// ✅ Safe link handler: prevents /brand/brand/path and fixes Skillery root routing
const formatHref = (href: string) => {
  // Normalize legacy bad links like "http://contact/" → "/contact"
  if (/^https?:\/\/contact\/?$/i.test(href)) {
    href = "/contact";
  }

  // Start with a clean leading-slash path
  let path = href.startsWith('/') ? href : `/${href}`;
  // Drop trailing slashes for comparisons
  path = path.replace(/\/+$/g, '');

  // Resolve brand context and whether we're on Skillery
  const rawBrand = (brandName ?? (theme as any)?.brandName ?? (theme as any)?.companyName ?? '').toString();
  const b = rawBrand.toLowerCase().trim();
  const isSkilleryBrand = b.includes('skillery');

  // Known brand slugs
  const brandSlugs = [
    'gameon','learnon','jamon','fixon','growon','fiton','codeon','cookon','styleon','moneyon'
  ];

  // ✅ Hard override for Contact on Skillery root: return absolute URL at runtime
  if (isSkilleryBrand && path === '/contact') {
    if (typeof window !== 'undefined' && window.location && window.location.origin) {
      return `${window.location.origin}/contact`;
    }
    return '/contact';
  }

  if (isSkilleryBrand) {
    // On Skillery root, drop any leading brand segment: /{brand}/x -> /x
    const parts = path.split('/').filter(Boolean);
    if (parts.length > 1 && brandSlugs.includes(parts[0].toLowerCase())) {
      return `/${parts.slice(1).join('/')}`;
    }
    return path || '/';
  }

  // Non‑Skillery: ensure current brand prefix exists exactly once
  const current = brandSlugs.includes(b) ? b : b.split(' ')[0];
  if (path.startsWith(`/${current}/`)) return path; // already branded
  if (path === `/${current}`) return path;          // brand root
  if (path === '/') return `/${current}`;           // root → /brand

  // If the path already carries ANOTHER brand, leave it (cross‑linking allowed)
  const parts = path.split('/').filter(Boolean);
  if (parts.length > 0 && brandSlugs.includes(parts[0].toLowerCase())) {
    return path;
  }

  return `/${current}${path}`; // prefix once
};

    const isSkilleryExact = brandName === "skillery";

    return (
      <div
        className={SubframeUtils.twClassNames(
          "w-full border-t border-solid px-6 py-24 text-white",
          (isSkillery || isNavyFooter) ? "border-white/5" : "border-neutral-100",
          className
        )}
        style={{ backgroundColor: finalFooterBackground, color: "white" }}
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
          <div className="w-full md:w-1/3 text-sm">
            {legalRows.slice(0, 2).map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-x-6 gap-y-2 mb-3 text-center">
                {row.map((item) => (
                  <Link
                    key={item.label}
                    href={formatHref(item.href)}
                    className="whitespace-nowrap leading-tight tracking-tight"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Right: Neon Glowing Social Icons */}
          <div className="flex w-full md:w-1/3 justify-start pl-4">
            <div className="flex items-center gap-6">
              {socialsWithDiscord.map((social) => {
                const Icon = FeatherIconsMap[social.icon];
                return Icon ? (
                  <a
                    key={social.icon}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-5 h-5 transition-transform hover:scale-125"
                  >
                    <Icon
                      className={`text-white align-middle ${
                        social.icon === "bluesky" || social.icon === "x" || social.icon === "twitter"
                          ? "w-[16px] h-[16px]"
                          : "w-5 h-5"
                      }`}
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
        <div className={`h-px w-full ${(isSkillery || isNavyFooter) ? "bg-white/5" : "bg-neutral-200"} mt-12`} />

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