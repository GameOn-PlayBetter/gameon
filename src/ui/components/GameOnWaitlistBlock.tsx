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

  // ✅ Normalize brand string
  const brandStr: string = Array.isArray(brand) ? brand[0] : brand || "";

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
    "https://docs.google.com/forms/d/e/1FAIpQLSchRbr7JxV_pGQuP24j46fguvDiaQCveeFKvilhh_mWFt4I9w/viewform?usp=dialog";
  const fixOnFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSf7LbDaBGQBx7GnDxY5tn2ZCJerVM_VB5vuMpsWoRRKM1xoqA/viewform?usp=dialog";
  const fitOnStudentFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSesUepKOGjzCWZFpjdYkpg4jZ9GdqGLVqAozbShkfLsHD2CWA/viewform?usp=dialog";
  const jamOnStudentFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSf6W87gRrxzA6pEMOz_Xyqj3wyJcJ3VAfn88aLh4qeu8umprA/viewform?usp=dialog"; // ✅ JamOn student
  const codeOnFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSfRFhCl06sOOekDJhJfNINXBgvglv4fG004fpgbIhO28GcliA/viewform?usp=dialog"; // ✅ CodeOn

// ✅ Determine correct form URL per brand
const finalFormUrl =
  brandStr.toLowerCase() === "fixon"
    ? fixOnFormUrl
    : brandStr.toLowerCase() === "fiton"
    ? fitOnStudentFormUrl
    : brandStr.toLowerCase() === "jamon"
    ? jamOnStudentFormUrl
    : brandStr.toLowerCase() === "codeon"
    ? codeOnFormUrl
    : formUrl || gameOnFormUrl;

  // ✅ Dynamic headline and subtext per brand
  const headline = "JOIN THE WAITLIST";
const subtext =
    brandStr.toLowerCase() === "fixon"
      ? "FixOn is currently in pre-launch. Sign up below to reserve your spot when we go live and get help credits!"
      : brandStr.toLowerCase() === "fiton"
      ? "FitOn is currently in pre-launch. Sign up below to reserve your spot and start your fitness journey!"
      : brandStr.toLowerCase() === "codeon"
      ? "CodeOn is currently in pre-launch. Sign up below to reserve your spot and start your coding journey!"
      : "GameOn is currently in pre-launch. Sign up below to reserve your spot and start your journey!";
  const buttonText = "Join the Waitlist"; // ✅ add this line

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