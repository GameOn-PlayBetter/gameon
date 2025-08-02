/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import React from "react";
import { useBrandTheme } from "@/app/context/BrandThemeContext";
import { Badge } from "@/ui/components/Badge";

type BadgeVariant = "success" | "error" | "brand" | "neutral" | "warning";

export interface Coach {
  name: string;
  color: string;
  badge: string;
  image: string;
  description: string;
  badgeVariant: BadgeVariant;
  bookingUrl: string;
}

interface FeaturedCoachesProps {
  coaches: Coach[];
  title?: string;
  colors?: {
    primary?: string;
    button?: string;
    buttonHover?: string;
    text?: string;
    hover?: string;
  };
}

export function FeaturedCoaches({
  coaches,
  title = "Featured Coaches",
  colors: propColors,
}: FeaturedCoachesProps) {
  // ✅ Safe use of theme
  const theme = useBrandTheme();
  const colors = { ...theme.colors, ...propColors };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-12 px-6 py-24">
      <h2 className="text-3xl font-bold text-white text-center">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {coaches.map((coach) => (
          <a
            key={coach.name}
            href={coach.bookingUrl}
            className="flex flex-col items-start overflow-hidden rounded-[32px] bg-brand-50 shadow-[0_0_20px_#FF00C8] hover:shadow-[0_0_30px_#00CFFF] transition-shadow duration-300"
            style={{
              border: `1px solid ${colors.button || "#FF00C8"}`,
            }}
          >
            <img
              className="h-64 w-full flex-none object-cover"
              src={coach.image}
              alt={coach.name}
            />
            <div className="flex w-full flex-col items-start gap-4 px-8 py-8">
              <Badge variant={coach.badgeVariant}>{coach.badge}</Badge>
              <div className="flex w-full flex-col items-start gap-2">
                <span
                  className={`text-[24px] font-[700] leading-[28px] ${coach.color}`}
                >
                  {coach.name}
                </span>
                <span className="text-body font-body text-subtext-color">
                  {coach.description}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default FeaturedCoaches;