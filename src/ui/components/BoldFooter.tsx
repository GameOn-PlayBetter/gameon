"use client";
/*
 * Documentation:
 * Bold footer — https://app.subframe.com/2dcb043d3f5e/library?component=Bold+footer_e35cb674-a3fb-4906-9ea1-3241dc9704d3
 * Link Button — https://app.subframe.com/2dcb043d3f5e/library?component=Link+Button_a4ee726a-774c-4091-8c49-55b659356024
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { LinkButton } from "./LinkButton";
import Link from "next/link";

interface BoldFooterRootProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const BoldFooterRoot = React.forwardRef<HTMLElement, BoldFooterRootProps>(
  function BoldFooterRoot(
    { className, ...otherProps }: BoldFooterRootProps,
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
            <div className="hidden min-w-[144px] grow shrink-0 basis-0 flex-col items-start gap-6">
              <span className="hidden w-full font-['Montserrat'] text-[14px] font-[600] leading-[20px] text-default-font -tracking-[0.01em]">
                Product
              </span>
              <div className="hidden flex-col items-start gap-4">
                <LinkButton>Accounts</LinkButton>
                <LinkButton>Business</LinkButton>
                <LinkButton>Platform</LinkButton>
                <LinkButton>Send &amp; receive</LinkButton>
              </div>
            </div>
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
                className="h-20 flex-none object-cover"
                src="https://res.cloudinary.com/subframe/image/upload/v1752180871/uploads/19984/xz0wrne7nh62oxklt6fo.png"
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
              © GameOn, LLC 2025
            </span>
            <span className="whitespace-pre-wrap font-['Montserrat'] text-[14px] font-[500] leading-[20px] text-subtext-color text-center">
              {
                "GameOn is an independent digital platform connecting players and streamers for gaming sessions, coaching, and co-op experiences. All sessions are recorded for safety, and all coaches are vetted.\n© 2025 \nGameOn LLC. All rights reserved. Based in Texas, operating across galaxies (as long as they have decent ping).\nGameOn is not affiliated with any game publisher or console maker. All trademarks are the property of their respective owners."
              }
            </span>
          </div>
        </div>
      </div>
    );
  }
);

export const BoldFooter = BoldFooterRoot;
