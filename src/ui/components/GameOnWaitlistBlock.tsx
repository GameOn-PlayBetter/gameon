/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useBrandTheme } from "@/app/context/BrandThemeContext";

interface WaitlistBlockProps {
  colors?: {
    primary?: string;
    button?: string;
    buttonHover?: string;
    glow?: string;
    text?: string;
  };
  formUrl?: string;
}

export default function GameOnWaitlistBlock({
  colors = {},
  formUrl,
}: WaitlistBlockProps) {
  const { brand } = useParams();
  const theme = useBrandTheme();

  const {
    primary = "#000000",
    glow = "#FF00C8",
    text = "#FFFFFF",
    button = "#DC00B0",
    buttonHover = "#00CFFF",
  } = { ...colors, ...theme.colors };

  // ✅ Hardcoded Google Form URLs
  const gameOnFormUrl =
    "https://docs.google.com/forms/d/1LddJuKRXpjIFPaVevI-nyurxjnD3iofQpap8pjC-tII/edit";
  const fixOnFormUrl =
    "https://docs.google.com/forms/d/1FMqO0e7DviXzhhivyRBsHVGvIYrHg64e4hhzFEoRTJs/edit";

  const finalFormUrl =
    formUrl || (brand === "fixon" ? fixOnFormUrl : gameOnFormUrl);

  // ✅ Dynamic headline per brand
  const headline = brand === "fixon" ? "JOIN THE WAITLIST" : "JOIN THE WAITLIST";
  const subtext =
    brand === "fixon"
      ? "FixOn is currently in pre-launch. Sign up below to reserve your spot when we go live and get help credits!"
      : "GameOn is currently in pre-launch. Sign up below to reserve your spot and start your journey!";
  const buttonText = brand === "fixon" ? "Join the Waitlist" : "Join the Waitlist";

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-6 px-6 py-12"
      style={{ backgroundColor: primary }}
    >
      <div
        className="flex w-full max-w-[448px] flex-col items-center gap-6 rounded-2xl px-8 py-10"
        style={{
          boxShadow: `0 0 16px ${glow}`,
          backgroundColor: primary,
          border: `1px solid ${glow}`,
        }}
      >
        <h2
          className="text-[24px] font-bold font-heading-1 text-center"
          style={{ color: text }}
        >
          {headline}
        </h2>
        <p
          className="text-center font-body text-[16px]"
          style={{ color: text }}
        >
          {subtext}
        </p>
        <a
          href={finalFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <button
            className="w-full text-white py-3 rounded-lg font-bold text-[16px]"
            style={{ backgroundColor: button }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = buttonHover)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = button)
            }
          >
            {buttonText}
          </button>
        </a>
      </div>
    </div>
  );
}