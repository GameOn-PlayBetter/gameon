"use client";

import React from "react";
import * as SubframeUtils from "../utils";
import Link from "next/link";
import Image from "next/image";

interface BoldFooterRootProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  logoSrc?: string;
  companyName?: string;
  colors?: {
    primary?: string;
    button?: string;
    buttonHover?: string;
  };
  socials?: { icon: string; href: string }[];
  bottomText?: string;
}

const BoldFooterRoot = React.forwardRef<HTMLDivElement, BoldFooterRootProps>(
  function BoldFooterRoot(props, ref) {
    const {
      className,
      logoSrc,
      companyName = "GameOn LLC",
      colors = {},
      socials = [],
      bottomText,
      ...otherProps
    } = props;

    const hoverColor = colors.button || "#FF00C8";

    return (
      <div
        className={SubframeUtils.twClassNames(
          "w-full border-t border-solid border-neutral-100 text-white px-6 py-24",
          className
        )}
        style={{ backgroundColor: colors.primary || "#000000" }}
        ref={ref}
        {...otherProps}
      >
        {/* Top Section */}
        <div className="w-full flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
          {/* Left: Logo */}
          <div className="flex w-full md:w-1/3 justify-end pr-4 items-start">
            <div className="relative h-[80px] w-[240px] md:h-[100px] md:w-[300px]">
              <Image
                src={logoSrc || "/images/gameon/gameon_logo_stacked.png"}
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Middle: Legal Links */}
          <div className="flex flex-col gap-3 w-full md:w-1/3">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white text-left">
              {[
                { label: "Legal", href: "/legal" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
                { label: "Prohibited Titles", href: "/prohibited-titles" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
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
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white text-left">
              {[
                { label: "Coach Eligibility", href: "/coach-requirements-eligibility" },
                { label: "Cookie Policy", href: "/cookie-policy" },
                { label: "Safety Guidelines", href: "/safety-guidelines" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
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
          </div>

          {/* Right: Social Icons */}
          <div className="flex w-full md:w-1/3 justify-start pl-4">
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`/icons/social/${social.icon}.svg`}
                    alt={social.icon}
                    className="social-glow w-5 h-5 md:w-6 md:h-6"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-neutral-200 mt-12" />

        {/* Footer Text */}
        <div className="mx-auto max-w-[768px] flex flex-col items-center gap-4 mt-6 text-center text-subtext-color text-[14px] font-medium leading-[20px] font-['Montserrat'] whitespace-pre-wrap">
          <span>© {companyName} 2025</span>
          <span>
            {bottomText ||
              `${companyName} is an independent digital platform connecting users and coaches for live sessions, education, and support.\nAll sessions may be recorded for safety. All coaches are vetted.\n${companyName}. All rights reserved. Based in Texas, operating across galaxies (as long as they have decent ping).\nNot affiliated with any game publisher, appliance maker, or repair service. All trademarks are the property of their respective owners.`}
          </span>
        </div>
      </div>
    );
  }
);

export const BoldFooter = BoldFooterRoot;