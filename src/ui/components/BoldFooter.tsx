"use client";

import React from "react";
import * as SubframeUtils from "../utils";
import { LinkButton } from "./LinkButton";

interface BrandLegal {
  label: string;
  href: string;
}

interface BoldFooterRootProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  logoUrl?: string;
  brandName: string;
  company: string;
  year: number;
  legalLinks: BrandLegal[];
  disclaimer?: string;
}

const BoldFooterRoot = React.forwardRef<HTMLElement, BoldFooterRootProps>(
  function BoldFooterRoot(
    {
      className,
      logoUrl,
      brandName,
      company,
      year,
      legalLinks,
      disclaimer,
      ...otherProps
    }: BoldFooterRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex w-full flex-col items-center justify-center gap-6 border-t border-solid border-neutral-100 px-6 py-24",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div className="flex w-full max-w-[1280px] flex-col items-center">
          <div className="flex w-full flex-wrap items-start gap-6">
            {logoUrl && (
              <div className="flex min-w-[144px] grow shrink-0 basis-0 items-start gap-2">
                <img
                  className="h-20 flex-none object-contain"
                  src={logoUrl}
                  alt={`${brandName} Logo`}
                />
              </div>
            )}

            {legalLinks.map((link, index) => (
              <div
                key={index}
                className="flex min-w-[144px] grow shrink-0 basis-0 flex-col items-start gap-4"
              >
                <LinkButton href={link.href}>{link.label}</LinkButton>
              </div>
            ))}
          </div>

          <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-200" />

          <div className="flex w-full max-w-[768px] flex-col items-center gap-4">
            <span className="font-['Montserrat'] text-[14px] font-[500] leading-[20px] text-subtext-color text-center">
              © {company} {year}
            </span>

            {disclaimer && (
              <span className="whitespace-pre-wrap font-['Montserrat'] text-[14px] font-[500] leading-[20px] text-subtext-color text-center">
                {disclaimer}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export const BoldFooter = BoldFooterRoot;