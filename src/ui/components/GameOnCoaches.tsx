"use client";

import React from "react";
import { useParams } from "next/navigation";
import { brands } from "@/lib/brands";
import { Button } from "@/ui/components/Button";
import { Avatar } from "@/ui/components/Avatar";
import { Badge } from "@/ui/components/Badge";

export default function GameOnCoaches() {
  const { brand } = useParams();
  const brandConfig = brands[brand as keyof typeof brands];

  const coaches =
    brand === "fixon"
      ? [
          {
            name: "AutoPro99",
            color: "text-warning-500",
            badge: "Auto Specialist",
            image: "/images/fixon/experts/autopro.jpg",
            description: "Car diagnostics, battery swaps, brake repairs",
            badgeVariant: "warning",
          },
          {
            name: "HomeHackR",
            color: "text-warning-500",
            badge: "DIY Pro",
            image: "/images/fixon/experts/emma.jpg",
            description: "Wall patching, painting, faucet leaks",
            badgeVariant: "warning",
          },
          {
            name: "SafeSpark",
            color: "text-warning-500",
            badge: "Electrician",
            image: "/images/fixon/experts/david.jpg",
            description: "Outlet repair, light installs, breaker fixes",
            badgeVariant: "warning",
          },
        ]
      : [
          {
            name: "Coach Alex",
            color: "text-brand-700",
            badge: "Minecraft Expert",
            image: "/images/gameon/david.jpg",
            description: "Professional builder & redstone specialist",
            badgeVariant: "destructive-primary",
          },
          {
            name: "Coach Sarah",
            color: "text-warning-700",
            badge: "DBD Pro",
            image: "/images/gameon/emma.jpg",
            description: "Competitive survivor & strategy expert",
            badgeVariant: "warning",
          },
          {
            name: "Coach Mike",
            color: "text-success-700",
            badge: "LoL Master",
            image: "/images/gameon/michael.jpg",
            description: "Diamond ranked player & macro strategist",
            badgeVariant: "success",
          },
        ];

  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-12 px-6 py-24 ${brandConfig.fontClass || ""}`}
    >
      <div className="flex w-full max-w-[1280px] flex-col items-start gap-8">
        <span
          className={`text-[36px] font-[700] leading-[40px] text-success-700`}
        >
          Featured Coaches
        </span>
        <div className="flex w-full flex-wrap items-start gap-8">
          {coaches.map((coach, index) => (
            <div
              key={`${coach.name}-${index}`}
              className="flex min-w-[288px] grow shrink-0 basis-0 flex-col items-center gap-6 rounded-[32px] bg-brand-50 px-8 py-12"
              style={{
                boxShadow: `0 0 12px ${brandConfig.colors.glow}`,
                border: `2px solid ${brandConfig.colors.glow}`,
              }}
            >
              <Avatar size="x-large" image={coach.image} />
              <span
                className={`text-[24px] font-[700] leading-[28px] text-center ${coach.color}`}
              >
                {coach.name}
              </span>
              <Badge variant={coach.badgeVariant || "brand"}>
                {coach.badge}
              </Badge>
              <span
                className={`text-body text-center ${coach.color}`}
              >
                {coach.description}
              </span>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSchRbr7JxV_pGQuP24j46fguvDiaQCveeFKvilhh_mWFt4I9w/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant="destructive-primary"
                  className="w-full"
                  style={{
                    backgroundColor: brandConfig.colors.button,
                    borderColor: brandConfig.colors.buttonHover,
                  }}
                >
                  Book Session
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}