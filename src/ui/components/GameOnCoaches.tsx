"use client";

import React from "react";
import { useBrandTheme } from "@/app/context/BrandThemeContext";
import { Button } from "@/ui/components/Button";
import { Avatar } from "@/ui/components/Avatar";
import { Badge } from "@/ui/components/Badge";

interface Coach {
  name: string;
  color: string;
  badge: string;
  image: string;
  description: string;
  badgeVariant?: "error" | "success" | "brand" | "neutral" | "warning";
  bookingUrl: string;
}

export default function FeaturedCoaches({
  coaches,
  colors: overrideColors,
}: {
  coaches: Coach[];
  colors?: any;
}) {
  const { theme } = useBrandTheme();
  const colors = theme?.colors || overrideColors;

  if (!colors) {
    console.warn("FeaturedCoaches: No colors provided");
    return null;
  }

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-12 px-6 py-24"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="flex w-full max-w-[1280px] flex-col items-start gap-8">
        <span
          className="text-[36px] font-[700] leading-[40px]"
          style={{ color: colors.glow }}
        >
          Featured Coaches
        </span>
        <div className="flex w-full flex-wrap items-start gap-8">
          {coaches.map((coach, index) => (
            <div
              key={`${coach.name}-${index}`}
              className="flex min-w-[288px] grow shrink-0 basis-0 flex-col items-center gap-6 rounded-[32px] px-8 py-12"
              style={{
                backgroundColor: colors.primary,
                boxShadow: `0 0 12px ${colors.glow}`,
                border: `2px solid ${colors.glow}`,
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
              <span className={`text-body text-center ${coach.color}`}>
                {coach.description}
              </span>
              <a
                href={coach.bookingUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant="destructive-primary"
                  className="w-full"
                  style={{
                    backgroundColor: colors.button,
                    borderColor: colors.buttonHover,
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