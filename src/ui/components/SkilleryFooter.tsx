"use client";

import React from "react";
import * as SubframeUtils from "../utils";
import { LinkButton } from "./LinkButton";
import Link from "next/link";

interface SkilleryFooterRootProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SkilleryFooterRoot = React.forwardRef<HTMLElement, SkilleryFooterRootProps>(
  function SkilleryFooterRoot(
    { className, ...otherProps }: SkilleryFooterRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex w-full flex-col items-center justify-center gap-6 border-t border-solid border-neutral-100 bg-[#010818] px-6 py-24",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div className="flex w-full max-w-[1280px] flex-col items-center">
          <div className="flex w-full flex-wrap items-start gap-6">
            {/* Product Links – hidden just like BoldFooter */}
            <div className="hidden min-w-[144px] grow shrink-0 basis-0 flex-col items-start gap-6" />
            <div className="hidden min-w-[144px] grow shrink-0 basis-0 flex-col items-start gap-6">
              <span className="w-full font-['Montserrat'] text-[14px] font-[600] leading-[20px] text-default-font -tracking-[0.01em]">
                Company
              </span>
              <div className="flex flex-col items-start gap-4">
                <LinkButton>Team</LinkButton>
                <LinkButton>Press</LinkButton>
                <LinkButton>Careers</LinkButton>
              </div>
            </div>
            <div className="hidden min-w-[144px] grow shrink-0 basis-0 flex-col items-start gap-6">
              <span className="w-full font-['Montserrat'] text-[14px] font-[600] leading-[20px] text-default-font -tracking-[0.01em]">
                Resources
              </span>
              <div className="flex flex-col items-start gap-4">
                <LinkButton>News</LinkButton>
                <LinkButton>Blog</LinkButton>
                <LinkButton>Help Center</LinkButton>
              </div>
            </div>
          </div>

          <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-200" />

          <div className="flex w-full flex-wrap items-start gap-6">
<div className="flex min-w-[144px] grow shrink-0 basis-0 items-start gap-2">
  <img
    src="/images/skillery_logo_footer_hd.png"
    alt="Skillery Logo"
    className="h-[140px] w-auto object-contain"
  />
</div>

            <div className="flex min-w-[144px] grow shrink-0 basis-0 flex-col items-start gap-4">
              <LinkButton href="/legal">Legal</LinkButton>
              <LinkButton href="/coach-requirements-eligibility">Coach Requirements and Eligibility</LinkButton>
            </div>

            <div className="flex min-w-[144px] grow shrink-0 basis-0 flex-col items-start gap-4">
              <LinkButton href="/privacy-policy">Privacy Policy</LinkButton>
              <LinkButton href="/terms-of-service">Terms of Service</LinkButton>
            </div>

            <div className="flex min-w-[144px] grow shrink-0 basis-0 flex-col items-start gap-4">
              <LinkButton href="/cookie-policy">Cookie Policy</LinkButton>
              <LinkButton href="/safety-guidelines">Safety Guidelines</LinkButton>
            </div>

            <div className="flex min-w-[144px] grow shrink-0 basis-0 flex-col items-start gap-4">
              <LinkButton href="/prohibited-titles">Prohibited Titles</LinkButton>
              <LinkButton href="/contact">Contact</LinkButton>
            </div>
          </div>

          <div className="flex w-full max-w-[768px] flex-col items-center gap-4">
            <span className="font-['Montserrat'] text-[14px] font-[500] leading-[20px] text-subtext-color text-center">
              © Skillery, LLC 2025
            </span>
            <span className="whitespace-pre-wrap font-['Montserrat'] text-[14px] font-[500] leading-[20px] text-subtext-color text-center">
              {
                "Skillery is an independent digital platform connecting learners and experts for live coaching, study help, and skill mastery. All sessions are recorded for safety.\n© 2025 \nSkillery LLC. All rights reserved. Based in Texas, operating across galaxies (as long as they have decent ping).\nSkillery is not affiliated with any educational institution or publisher. All trademarks are the property of their respective owners."
              }
            </span>
          </div>
        </div>
      </div>
    );
  }
);

export const SkilleryFooter = SkilleryFooterRoot;