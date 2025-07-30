"use client";

import React, { useState } from "react";
import Link from "next/link";

interface ReserveBlockProps {
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
    glow?: string; // dynamic glow color
  };
}

export function ReserveBlock({
  headline,
  subtext,
  buttonText,
  formUrl,
  colors = {},
}: ReserveBlockProps) {
  const {
    primary = "#000000",
    text = "#FFFFFF",
    button = "#FF00C8",
    buttonHover = "#00CFFF",
    border = "1px solid #999999",
    glow = "transparent", // fallback: no glow
  } = colors;

  const [hover, setHover] = useState(false);

  return (
    <div
      className="w-full py-16 px-6 text-center"
      style={{
        backgroundColor: primary,
        color: text,
      }}
    >
      <div
        className="max-w-xl mx-auto rounded-xl p-8"
        style={{
          border,
          backgroundColor: "#0A0A0A",
          boxShadow: `0 0 16px ${glow}`, // dynamic glow
        }}
      >
        <h2 className="text-3xl font-bold mb-4" style={{ color: text }}>
          {headline}
        </h2>
        <p className="text-lg mb-6" style={{ color: text }}>
          {subtext}
        </p>
        <Link
          href={formUrl}
          target="_blank"
          className="inline-block px-6 py-3 rounded-md font-semibold transition-colors duration-200"
          style={{
            backgroundColor: hover ? buttonHover : button,
            color: text,
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}