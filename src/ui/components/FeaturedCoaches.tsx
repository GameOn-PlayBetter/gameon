"use client";

import React from "react";
import { Button } from "@/ui/components/Button";
import { Avatar } from "@/ui/components/Avatar";
import { Badge } from "@/ui/components/Badge";
import { useBrandTheme } from "@/app/context/BrandThemeContext";

export interface Coach {
  name: string;
  badge: string;
  image: string;
  description: string;
  badgeVariant?: "brand" | "neutral" | "warning" | "success" | "error";
  bookingUrl: string;
}

interface FeaturedCoachesProps {
  coaches: Coach[];
  title?: string;
}

export function FeaturedCoaches({ coaches, title = "Featured Coaches" }: FeaturedCoachesProps) {
  const { brand } = useBrandTheme();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-12 px-6 py-24">
      <div className="flex w-full max-w-[1280px] flex-col items-start gap-8">
        <span
          className={`font-['Orbitron'] text-[36px] font-[700] leading-[40px] ${
            brand?.colors?.accent || "text-success-700"
          }`}
        >
          {title}
        </span>
        <div className="flex w-full flex-wrap items-start gap-8">
          {coaches.map((coach, index) => (
            <div
              key={index}
              className={`flex min-w-[288px] grow shrink-0 basis-0 flex-col items-center gap-6 rounded-[32px] ${
                brand?.colors?.cardBg || "bg-brand-50"
              } px-8 py-12`}
            >
              <Avatar size="x-large" image={coach.image} />
              <span
                className={`font-['Orbitron'] text-[24px] font-[700] leading-[28px] text-center ${
                  brand?.colors?.textPrimary || "text-white"
                }`}
              >
                {coach.name}
              </span>
              <Badge variant={coach.badgeVariant || "brand"}>{coach.badge}</Badge>
              <span
                className={`text-body font-body text-center ${
                  brand?.colors?.textSecondary || "text-white"
                }`}
              >
                {coach.description}
              </span>
              <a
                href={coach.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  variant={brand?.buttonVariant || "destructive-primary"}
                  className="w-full"
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