"use client";

import React from "react";
import { useParams } from "next/navigation";
import { brands } from "@/lib/brands";
import { Button } from "@/ui/components/Button";
import { FeatherArrowRight, FeatherArrowRightCircle } from "@subframe/core";

export default function FeaturedGames() {
  const { brand } = useParams();
  const brandKey = brand as keyof typeof brands;
  const brandConfig = brands[brandKey];

  const glowColor = brandConfig.colors.glow;

  const featuredGames = brandConfig.featuredGames ?? [
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
        <span className="font-['Orbitron'] text-[36px] font-[700] leading-[40px]" style={{ color: glowColor }}>
          Featured Games
        </span>
        <div className="w-full items-start gap-8 grid grid-cols-2">
          {featuredGames.map((game, index) => (
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
                src={game.image}
                alt={game.title}
              />
              <div className="flex w-full flex-col items-start gap-4 px-8 py-8">
                <div className="flex w-full flex-col items-start gap-2">
                  <span className="font-['Orbitron'] text-[24px] font-[700] leading-[28px] text-default-font">
                    {game.title}
                  </span>
                  <span className="text-body font-body text-subtext-color">
                    {game.description}
                  </span>
                </div>
                <a
                  href={brandConfig.reserveBlock.formUrl}
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
      <a
        href={brandConfig.reserveBlock.formUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button size="large" icon={<FeatherArrowRightCircle />}>
          All Games
        </Button>
      </a>
    </div>
  );
}