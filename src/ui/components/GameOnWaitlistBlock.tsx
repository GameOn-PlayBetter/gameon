"use client";

import React from "react";
import { Button } from "@/ui/components/Button";

interface WaitlistBlockProps {
  colors?: {
    primary?: string;
    button?: string;
    buttonHover?: string;
    glow?: string;
    text?: string;
  };
  formUrl: string;
}

export default function GameOnWaitlistBlock({
  colors = {},
  formUrl,
}: WaitlistBlockProps) {
  const {
    primary = "#000000",
    glow = "#FF00C8",
    text = "#FFFFFF",
    button = "#DC00B0",
    buttonHover = "#e600b8",
  } = colors;

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-6 px-6 py-12"
      style={{ backgroundColor: primary }}
    >
      <div
        className="flex w-full max-w-[448px] flex-col items-center gap-6 rounded-2xl px-8 py-10"
        style={{
          boxShadow: `0 0 16px ${glow}`,
          backgroundColor: "#0A0A0A",
          border: `1px solid ${glow}`,
        }}
      >
        <h2
          className="text-[24px] font-bold font-heading-1 text-center"
          style={{ color: text }}
        >
          JOIN THE WAITLIST
        </h2>
        <p
          className="text-center font-body text-[16px]"
          style={{ color: text }}
        >
          FixOn is currently in pre-launch. Sign up below to reserve your spot
          when we go live and get help credits!
        </p>
        <a
          href={formUrl}
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
            Join the Waitlist
          </button>
        </a>
      </div>
    </div>
  );
}