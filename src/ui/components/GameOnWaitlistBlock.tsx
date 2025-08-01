"use client";

import React from "react";
import { useBrandTheme } from "@/app/context/BrandThemeContext";

export default function GameOnWaitlistBlock({
  colors,
  formUrl,
}: {
  colors?: any;
  formUrl: string;
}) {
  const theme = useBrandTheme();
  const appliedColors = theme?.colors || colors;

  if (!appliedColors) return null;

  return (
    <div
      className="p-6 rounded-xl text-center"
      style={{
        backgroundColor: appliedColors.primary,
        color: appliedColors.text || "#fff",
      }}
    >
      <h2 className="text-2xl font-bold mb-2">Join the Waitlist</h2>
      <a
        href={formUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 mt-4 rounded-lg font-semibold"
        style={{
          backgroundColor: appliedColors.button,
        }}
      >
        Sign Up
      </a>
    </div>
  );
}