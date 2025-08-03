/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { brands } from "@/lib/brands";
import { Button } from "@/ui/components/Button";
import { Avatar } from "@/ui/components/Avatar";
import { Badge } from "@/ui/components/Badge";

export default function GameOnCoaches() {
  const { brand } = useParams();
  const brandKey = (brand as keyof typeof brands) || "gameon";
  const brandConfig = brands[brandKey];

const coaches =
  brandKey === "fixon"
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
          image: "/images/fixon/experts/homehackr.jpg",
          description: "Wall patching, painting, faucet leaks",
          badgeVariant: "warning",
        },
        {
          name: "SafeSpark",
          color: "text-warning-500",
          badge: "Electrician",
          image: "/images/fixon/experts/safespark.jpg",
          description: "Outlet repair, light installs, breaker fixes",
          badgeVariant: "warning",
        },
      ]
    : brandKey === "jamon"
    ? [
        {
          name: "ConcertViolinist",
          color: "text-brand-700",
          badge: "Violin Coach",
          image: "/jamon/violin1.jpg",
          description: "Live violin lessons for chords, scales, and solos",
          badgeVariant: "brand",
        },
        {
          name: "PianoPro",
          color: "text-success-700",
          badge: "Piano Instructor",
          image: "/jamon/pianopro.jpg",
          description: "Learn scales, technique, and songs live",
          badgeVariant: "success",
        },
        {
          name: "VocalVibes",
          color: "text-warning-700",
          badge: "Vocal Coach",
          image: "/jamon/vocals1.jpg",
          description: "Improve tone, range, and stage confidence",
          badgeVariant: "warning",
        },
      ]
    : brandKey === "fiton"
    ? [
        {
          name: "Trainer H2Oman",
          color: "text-brand-700",
          badge: "Personal Trainer",
          image: "/images/fiton/experts/trainermax.jpg",
          description: "1:1 live workouts, form checks, and custom plans",
          badgeVariant: "brand",
        },
        {
          name: "YogaLina",
          color: "text-success-700",
          badge: "Yoga Coach",
          image: "/images/fiton/experts/yogalina.jpg",
          description: "Guided yoga sessions for flexibility and relaxation",
          badgeVariant: "success",
        },
        {
          name: "CardioKing",
          color: "text-warning-700",
          badge: "Cardio Expert",
          image: "/images/fiton/experts/cardioking.jpg",
          description: "HIIT and endurance training to boost stamina",
          badgeVariant: "warning",
        },
      ]
    : [
        {
          name: "Coach Alex",
          color: "text-brand-700",
          badge: "Minecraft Expert",
          image: "/images/gameon/david2.jpg",
          description: "Professional builder & redstone specialist",
          badgeVariant: "brand",
        },
        {
          name: "Coach Sarah",
          color: "text-warning-700",
          badge: "DBD Pro",
          image: "/images/gameon/sarah.jpg",
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
// ✅ TypeScript-safe access
const bookSessionUrl =
  (brandConfig as any).forms?.waitlistUrl ||
  (brandConfig as any).forms?.studentFormUrl ||
  (brandKey === "gameon" ? "/coach-search" : "#");

  return (
    <div className="flex w-full flex-col items-center justify-center gap-12 px-6 py-24">
      <div className="flex w-full max-w-[1280px] flex-col items-start gap-8">
<span className="text-[36px] font-[700] leading-[40px] text-success-700">
  {brandKey === "fixon"
    ? "Featured Fixers"
    : brandKey === "jamon"
    ? "Featured Music Coaches"
    : "Featured Coaches"}
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
              <Badge
                variant={
                  (coach.badgeVariant as
                    | "brand"
                    | "neutral"
                    | "error"
                    | "warning"
                    | "success") || "brand"
                }
              >
                {coach.badge}
              </Badge>
              <span className={`text-body text-center ${coach.color}`}>
                {coach.description}
              </span>
              <a
                href={bookSessionUrl}
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