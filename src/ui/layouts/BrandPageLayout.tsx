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

  const logo = theme?.logo;
  const colors = theme?.colors || {};
  const socials = theme?.socials || [];
  const legalLinks = theme?.legalLinks || [];
  const companyName = theme?.companyName || brandName || "Your Brand";
  const backgroundColor = colors.primary || "#0A0A0A";

  // ✅ Skillery-specific transparency logic
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
        <Link href={`/brand/${brandName}`} className="flex items-center">
          {logo && (
            <img
              src={logo}
              alt={`${brandName} logo`}
              className="w-auto"
              style={{
                height: "48px",
                maxHeight: "48px",
                marginTop: "-6px",
                marginBottom: "-6px",
              }}
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
              href={ctaButton.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-4 py-2 rounded-lg font-semibold text-white transition"
              style={{
                backgroundColor: colors.button || "#FF00C8",
              }}
              onMouseOver={(e) => {
                (e.target as HTMLElement).style.backgroundColor =
                  colors.buttonHover || "#00CFFF";
              }}
              onMouseOut={(e) => {
                (e.target as HTMLElement).style.backgroundColor =
                  colors.button || "#FF00C8";
              }}
            >
              {ctaButton.label}
            </a>
          )}
        </nav>
      </header>

      {/* Optional Center Logo (smaller for mobile) */}
      {logo && (
        <div
          className="flex justify-center my-6 md:my-10"
          style={{ backgroundColor: resolvedBackground }}
        >
          <img
            src={logo}
            alt={`${brandName} logo`}
            className="h-[120px] md:h-[200px] lg:h-[300px] w-auto"
          />
        </div>
      )}

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
        logo={logo}
      />
    </div>
  );
}