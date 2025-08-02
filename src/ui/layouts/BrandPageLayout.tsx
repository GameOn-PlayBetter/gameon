"use client";

import React from "react";
import Link from "next/link";
import { BoldFooter } from "@/ui/components/BoldFooter";
import { useBrandTheme } from "@/app/context/BrandThemeContext";

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
  const theme = useBrandTheme();

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
    : brandName === "jamon"
    ? "/jamon/jamon_logo.png"
    : "";

  // ✅ Skillery gets transparent container so its navy shows
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
      {/* HEADER */}
      <header className="w-full px-6 py-4 flex justify-between items-center">
<Link
  href={brandName === "skillery" ? "/" : `/${brandName}`}
  className="flex items-center"
>
{headerLogo && (
  <img
    src={headerLogo}
    alt={`${brandName} logo`}
    className="h-20 min-w-[24px] flex-none object-cover cursor-pointer"
  />
)}
        </Link>

        <nav className="flex gap-6 items-center">
          {navLinks?.map((link, idx) =>
            link.href ? (
              <Link
                key={idx}
                href={link.href}
                className="text-white hover:underline text-sm"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={idx}
                onClick={link.onClick}
                className="text-white hover:underline text-sm"
              >
                {link.label}
              </button>
            )
          )}

          {ctaButton && (
            <a
href={
  brandName.toLowerCase() === "fiton"
    ? "https://docs.google.com/forms/d/e/1FAIpQLSdvRLccUqutavNKZLAF7GF2jqfy0PRyJxppNz8hKfUX5dD8pw/viewform?usp=dialog"
    : ctaButton.href
}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-4 py-2 rounded-lg font-semibold text-white transition"
              style={{
backgroundColor: (colors as any).button || "#FF00C8",
              }}
              onMouseOver={(e) => {
                (e.target as HTMLElement).style.backgroundColor =
(colors as any).buttonHover || "#00CFFF";
              }}
              onMouseOut={(e) => {
                (e.target as HTMLElement).style.backgroundColor =
(colors as any).button || "#FF00C8";
              }}
            >
              {ctaButton.label}
            </a>
          )}
        </nav>
      </header>

      {/* Center Logo (forced render) */}
      <div
        className="flex justify-center my-6 md:my-10"
        style={{ backgroundColor: resolvedBackground }}
      >
        <img
          src={headerLogo}
          alt={`${brandName} logo`}
          className="h-[120px] md:h-[200px] lg:h-[300px] w-auto"
          style={{ display: "block" }}
        />
      </div>

      {/* MAIN CONTENT */}
      <main
        className="flex flex-col grow w-full"
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