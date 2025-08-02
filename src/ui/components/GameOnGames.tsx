/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { brands } from "@/lib/brands";
import { Button } from "@/ui/components/Button";
import { FeatherArrowRight, FeatherArrowRightCircle } from "@subframe/core";

export default function GameOnGames() {
  const { brand } = useParams();
  const brandKey = brand as keyof typeof brands;
  const brandConfig = brands[brandKey];
  const glowColor = brandConfig.colors.glow;

  // ✅ Hardcoded Google Form links
  const gameOnFormUrl =
    "https://docs.google.com/forms/d/1LddJuKRXpjIFPaVevI-nyurxjnD3iofQpap8pjC-tII/edit";
  const fixOnFormUrl =
    "https://docs.google.com/forms/d/1FMqO0e7DviXzhhivyRBsHVGvIYrHg64e4hhzFEoRTJs/edit";

  // ✅ Determine the correct form link per brand
  const formUrl = brandKey === "fixon" ? fixOnFormUrl : gameOnFormUrl;

  // ✅ Determine label dynamically
  const sectionTitle =
    brandKey === "fixon" ? "Featured Fixes" : "Featured Games";

  // ✅ Default cards based on brand
  const featuredItems =
    brandKey === "fixon"
      ? [
          {
            title: "Pool Pump Repair",
            description:
              "Learn to troubleshoot and repair your pool pump with live help from pros.",
            image: "/images/fixon/pool-pump.jpg",
          },
          {
            title: "Leaky Faucet",
            description:
              "Stop drips and save water. Get step-by-step faucet repair guidance.",
            image: "/images/fixon/faucet.jpg",
          },
          {
            title: "Fence Repair",
            description:
              "Fix broken boards or leaning posts with real-time help.",
            image: "/images/fixon/fence.jpg",
          },
          {
            title: "Garage Door Issues",
            description:
              "Learn to repair sensors, tracks, and openers safely.",
            image: "/images/fixon/garage-door.jpg",
          },
        ]
      : [
          {
            title: "Minecraft",
            description:
              "Create the perfect gaming environment with our expert setup guides and recommendations.",
            image: "/images/minecraft.webp",
          },
          {
            title: "Dead by Daylight",
            description:
              "Join our gaming community events and compete with players worldwide.",
            image: "/images/dbd.jpg",
          },
          {
            title: "League of Legends",
            description:
              "Master champion mechanics and climb the ranked ladder with pro guidance.",
            image: "/images/league.jpg",
          },
          {
            title: "Valorant",
            description:
              "Improve your aim and tactical decision-making with personalized coaching.",
            image: "/images/valorant.jpg",
          },
        ];

  return (
    <div className="flex w-full flex-col items-center justify-center gap-12 px-6 py-24">
      <div className="flex w-full max-w-[1280px] flex-col items-start gap-8">
        <span
          className="font-['Orbitron'] text-[36px] font-[700] leading-[40px]"
          style={{ color: glowColor }}
        >
          {sectionTitle}
        </span>
        <div className="w-full items-start gap-8 grid grid-cols-2">
          {featuredItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start overflow-hidden rounded-[32px] bg-brand-50"
              style={{
                boxShadow: `0 0 25px ${glowColor}`,
                border: `2px solid ${glowColor}`,
              }}
            >
              <img
                className="h-64 w-full flex-none object-cover"
                src={item.image}
                alt={item.title}
              />
              <div className="flex w-full flex-col items-start gap-4 px-8 py-8">
                <div className="flex w-full flex-col items-start gap-2">
                  <span className="font-['Orbitron'] text-[24px] font-[700] leading-[28px] text-default-font">
                    {item.title}
                  </span>
                  <span className="text-body font-body text-subtext-color">
                    {item.description}
                  </span>
                </div>
                {/* ✅ All Learn More buttons go to correct Google Form */}
                <a
                  href={formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button icon={<FeatherArrowRight />}>Learn More</Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ✅ Bottom button goes to correct Google Form */}
      <a href={formUrl} target="_blank" rel="noopener noreferrer">
        <Button size="large" icon={<FeatherArrowRightCircle />}>
          {brandKey === "fixon" ? "All Fixes" : "All Games"}
        </Button>
      </a>
    </div>
  );
}