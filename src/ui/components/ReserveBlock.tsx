/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useBrandTheme } from "@/app/context/BrandThemeContext";
import { Button } from "@/ui/components/Button";

interface ReserveBlockProps {
  brandName?: string;
  headline: string;
  subtext: string;
  buttonText: string;
  formUrl: string;
  colors?: {
    primary?: string;
    text?: string;
    button?: string;
    buttonHover?: string;
    border?: string;
    glow?: string;
  };
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonHoverColor?: string;
  borderColor?: string;
}

export function ReserveBlock({
  brandName,
  headline,
  subtext,
  buttonText,
  formUrl,
  colors,
  backgroundColor,
  textColor,
  buttonColor,
  buttonHoverColor,
  borderColor,
}: ReserveBlockProps) {
  const theme = useBrandTheme();

  const primary =
    backgroundColor ||
    colors?.primary ||
    theme?.colors.primary ||
    "#000000";

  const pageBackground =
    backgroundColor ||
    colors?.primary ||
    (theme?.colors as any)?.pageBackground ||
    (theme?.colors as any)?.background ||
    theme?.colors.primary ||
    "#000000";

  const text =
    textColor || colors?.text || theme?.colors.text || "#FFFFFF";

  const button =
    buttonColor || colors?.button || theme?.colors.button || "#DC00B0";

  const buttonHover =
    buttonHoverColor ||
    colors?.buttonHover ||
    theme?.colors.buttonHover ||
    "#00CFFF";

const border =
  borderColor || colors?.border || (theme?.colors as any)?.border || "rgba(255,255,255,0.3)";

  const glow =
    colors?.glow || theme?.colors.glow || button;

// ✅ Hardcode Google Form links for all brands
const finalFormUrl =
  (brandName || "").toLowerCase() === "gameon"
    ? "https://docs.google.com/forms/d/1LddJuKRXpjIFPaVevI-nyurxjnD3iofQpap8pjC-tII/edit"
    : (brandName || "").toLowerCase() === "fixon"
    ? "https://docs.google.com/forms/d/1FMqO0e7DviXzhhivyRBsHVGvIYrHg64e4hhzFEoRTJs/edit"
    : (brandName || "").toLowerCase() === "fiton"
    ? "https://docs.google.com/forms/d/e/1FAIpQLSesUepKOGjzCWZFpjdYkpg4jZ9GdqGLVqAozbShkfLsHD2CWA/viewform?usp=dialog"
    : (brandName || "").toLowerCase() === "jamon"
    ? "https://docs.google.com/forms/d/e/1FAIpQLScm0_HE0ScDHm2OGFM3DE3i90AeI96gq-fl2p3tV2zkuMJvAw/viewform?usp=dialog"
    : (brandName || "").toLowerCase() === "codeon"
    ? "https://docs.google.com/forms/d/e/1FAIpQLSeJCKV6nT2K39Y72PXNBkmx6A-12OEYfxu9EOKbYkCVQkul3A/viewform?usp=dialog"
    : (brandName || "").toLowerCase() === "learnon"
    ? "https://docs.google.com/forms/d/e/1FAIpQLScBmxT9-07ECY-ZWRgvMBTD0EJaYaY6zM_3yMxIZhcFXR7uIw/viewform?usp=dialog"
    : (brandName || "").toLowerCase() === "growon"
    ? "https://docs.google.com/forms/d/e/1FAIpQLScuiYejOy2kiTrzgrtLul1gsdcWkPVLf-JnYoOlosmenWzjqw/viewform?usp=dialog"
    : (brandName || "").toLowerCase() === "cookon"
    ? "https://docs.google.com/forms/d/e/1FAIpQLSd7kJCjrqEhtYXrYiYND90qfYILrIKI-myW-gwct3AZvdHVjQ/viewform?usp=dialog"
    : (brandName || "").toLowerCase() === "styleon"
    ? "https://docs.google.com/forms/d/e/1FAIpQLScLW9RfsiHPB54C_kdDx2C4BRTg4IkYSC-Uyiz76Vq-W6JwnQ/viewform?usp=dialog"
    : (brandName || "").toLowerCase() === "moneyon"
    ? "https://docs.google.com/forms/d/e/1FAIpQLSe5sqBzdbspQ4sDQFyoLA8aVpo3EZ1chbo_LMhaPFLMCSsuNg/viewform?usp=dialog"
    : formUrl;

  return (
    <div
      className="flex w-full flex-col items-center justify-center px-6 py-12"
      style={{ backgroundColor: pageBackground }}
    >
      <div
        className="flex w-full max-w-[448px] flex-col items-center gap-6 rounded-2xl px-8 py-10"
        style={{
          backgroundColor: pageBackground,
          boxShadow: `0 0 16px ${glow}`,
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
          <Button
            variant="brand-primary"
            className="w-full font-bold text-[16px]"
            style={{
              backgroundColor: button,
              borderColor: border,
              color: "#FFFFFF",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = buttonHover)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = button)
            }
          >
            {buttonText}
          </Button>
        </a>
      </div>
    </div>
  );
}
export default ReserveBlock;