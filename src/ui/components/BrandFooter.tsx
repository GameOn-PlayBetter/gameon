import Link from "next/link";
import React from "react";

interface BrandFooterProps {
  brand: string;
  company: string;
  year: string | number;
  legal: {
    contact?: string;
    privacy?: string;
    terms?: string;
    safety?: string;
  };
}

export default function BrandFooter({
  brand,
  company,
  year,
  legal,
}: BrandFooterProps) {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#222] px-6 py-10 text-white text-sm w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-7xl mx-auto">
        {/* Left side */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center md:text-left">
          <span className="font-semibold">{brand} © {year}</span>
          <span className="opacity-70">by {company}</span>
        </div>

        {/* Right side */}
        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-xs font-medium text-gray-400">
          {legal.contact && (
            <Link href={legal.contact} className="hover:text-white transition">
              Contact
            </Link>
          )}
          {legal.privacy && (
            <Link href={legal.privacy} className="hover:text-white transition">
              Privacy
            </Link>
          )}
          {legal.terms && (
            <Link href={legal.terms} className="hover:text-white transition">
              Terms
            </Link>
          )}
          {legal.safety && (
            <Link href={legal.safety} className="hover:text-white transition">
              Safety
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}