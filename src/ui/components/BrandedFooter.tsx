// src/ui/components/BrandedFooter.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LinkItem {
  label: string;
  href: string;
}

interface BrandedFooterProps {
  brandName: string;
  description?: string;
  legalLinks: LinkItem[];
  bottomText?: string;
  companyName?: string;
  logoSrc?: string;
  year?: number;
  disclaimer?: string;
}

export default function BrandedFooter({
  brandName,
  description,
  legalLinks,
  bottomText,
  companyName = "Skillery LLC",
  logoSrc,
  year = new Date().getFullYear(),
  disclaimer,
}: BrandedFooterProps) {
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-6 border-t border-neutral-200 bg-[#0A0A0A] px-6 py-24 text-white">
      <div className="flex w-full max-w-[1280px] flex-col items-center">
        {/* TOP ROW */}
        <div className="flex w-full flex-wrap items-start gap-6">
          {/* LOGO & DESCRIPTION */}
          {logoSrc && (
            <div className="flex min-w-[144px] grow shrink-0 basis-0 items-start gap-2">
              <div className="relative h-24 w-48">
                <Image
                  src={logoSrc}
                  alt={`${brandName} Logo`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100px, 192px"
                  className="object-contain"
                />
              </div>
            </div>
          )}

          {/* LEGAL LINKS */}
          {legalLinks.map((link, index) => (
            <div
              key={index}
              className="flex min-w-[144px] grow shrink-0 basis-0 flex-col items-start gap-4"
            >
              <Link
                href={link.href}
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="mt-12 h-px w-full bg-neutral-700" />

        {/* BOTTOM ROW */}
        <div className="mt-6 flex w-full max-w-[768px] flex-col items-center gap-4 text-center">
          <span className="font-['Montserrat'] text-sm font-medium text-neutral-500">
            © {companyName} {year}
          </span>

          {disclaimer && (
            <span className="whitespace-pre-wrap font-['Montserrat'] text-sm font-medium text-neutral-500">
              {disclaimer}
            </span>
          )}

          {bottomText && (
            <span className="whitespace-pre-wrap font-['Montserrat'] text-sm font-medium text-neutral-500">
              {bottomText}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}