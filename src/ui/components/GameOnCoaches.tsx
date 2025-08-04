/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { brands } from "@/lib/brands";
import { Button } from "@/ui/components/Button";
import { Avatar } from "@/ui/components/Avatar";
import { Badge } from "@/ui/components/Badge";

export default function GameOnCoaches() {
  const params = useParams() || {};
  const brand = (params as Record<string, string | string[]>).brand;
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
          image: "images/jamon/violin1.jpg",
          description: "Live violin lessons for chords, scales, and solos",
          badgeVariant: "brand",
        },
        {
          name: "PianoPro",
          color: "text-success-700",
          badge: "Piano Instructor",
          image: "images/jamon/pianopro.jpg",
          description: "Learn scales, technique, and songs live",
          badgeVariant: "success",
        },
        {
          name: "VocalVibes",
          color: "text-warning-700",
          badge: "Vocal Coach",
          image: "images/jamon/vocals1.jpg",
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
: brandKey === "learnon"
    ? [
        {
          name: "TutorMia",
          color: "text-brand-700",
          badge: "Math & Science Tutor",
          image: "/images/learnon/tutormia.jpg",
          description: "Step-by-step help with math and science assignments",
          badgeVariant: "brand",
        },
        {
          name: "CoachLeo",
          color: "text-success-700",
          badge: "Language Coach",
          image: "/images/learnon/coachleo.jpg",
          description: "Real-time conversation and grammar practice",
          badgeVariant: "success",
        },
        {
          name: "StudySensei",
          color: "text-warning-700",
          badge: "Study Skills Mentor",
          image: "/images/learnon/studysensei.jpg",
          description: "Learn test prep and smarter study techniques live",
          badgeVariant: "warning",
        },
      ]
: brandKey === "codeon"
    ? [
        {
          name: "DevMentor",
          color: "text-brand-700",
          badge: "Full Stack Developer",
          image: "/images/codeon/devmentor.png",
          description: "Guidance on React, Node, and full stack projects",
          badgeVariant: "brand",
        },
        {
          name: "PythonGuru",
          color: "text-success-700",
          badge: "Python Expert",
          image: "/images/codeon/pythonguru.jpg",
          description: "Debugging, automation, and data scripting help",
          badgeVariant: "success",
        },
        {
          name: "BugHunter",
          color: "text-warning-700",
          badge: "Debug Specialist",
          image: "/images/codeon/bughunter.jpg",
          description: "Live debugging sessions for any project or language",
          badgeVariant: "warning",
        },
      ]
: brandKey === "growon"
    ? [
        {
          name: "GreenThumb",
          color: "text-brand-700",
          badge: "Gardening Coach",
          image: "/images/growon/greenthumb.jpg",
          description: "Vegetable & flower gardening guidance",
          badgeVariant: "brand",
        },
        {
          name: "LawnBoss",
          color: "text-success-700",
          badge: "Lawn & Landscaping Pro",
          image: "/images/growon/lawnboss.jpg",
          description: "Lawn care, design, and maintenance tips",
          badgeVariant: "success",
        },
        {
          name: "PlantWhisperer",
          color: "text-warning-700",
          badge: "Plant Care Specialist",
          image: "/images/growon/plantwhisperer.jpg",
          description: "Indoor plant care & composting live help",
          badgeVariant: "warning",
        },
      ]
: brandKey === "cookon"
    ? [
        {
          name: "ChefMario",
          color: "text-brand-700",
          badge: "Italian Cuisine Coach",
          image: "/images/cookon/chefmario.jpg",
          description: "Live pasta, pizza, and classic Italian dishes",
          badgeVariant: "brand",
        },
        {
          name: "BakerBella",
          color: "text-success-700",
          badge: "Baking Expert",
          image: "/images/cookon/bakerbella.jpg",
          description: "Cakes, pastries, and bread making in real-time",
          badgeVariant: "success",
        },
        {
          name: "SpiceMaster",
          color: "text-warning-700",
          badge: "World Cuisine Coach",
          image: "/images/cookon/spicemaster.jpg",
          description: "Indian, Thai, and global flavors live in your kitchen",
          badgeVariant: "warning",
        },
      ]
: brandKey === "styleon"
    ? [
        {
          name: "BlendMaster",
          color: "text-brand-700",
          badge: "Makeup & Grooming Coach",
          image: "/images/styleon/blendmaster.jpg",
          description: "DIY makeup, beard care, and self-care routines",
          badgeVariant: "brand",
        },
        {
          name: "PolishPro",
          color: "text-success-700",
          badge: "Nails & Style Mentor",
          image: "/images/styleon/polishpro.jpg",
          description: "Live nail art, maintenance, and style guidance",
          badgeVariant: "success",
        },
        {
          name: "StyleSensei",
          color: "text-warning-700",
          badge: "Hair & Full Look Coach",
          image: "/images/styleon/stylesensei.jpg",
          description: "Hair styling, grooming, and complete DIY looks",
          badgeVariant: "warning",
        },
      ]
    : brandKey === "moneyon"
    ? [
        {
          name: "FinanceGuru",
          color: "text-brand-700",
          badge: "Certified Financial Coach",
          image: "/images/moneyon/financeguru.jpg",
          description: "Budgeting, investing, and financial planning",
          badgeVariant: "brand",
        },
        {
          name: "WealthMentor",
          color: "text-success-700",
          badge: "Investment Advisor",
          image: "/images/moneyon/wealthmentor.jpg",
          description: "Stocks, ETFs, and retirement strategies",
          badgeVariant: "success",
        },
        {
          name: "CreditWizard",
          color: "text-warning-700",
          badge: "Credit & Debt Specialist",
          image: "/images/moneyon/creditwizard.jpg",
          description: "Credit score boosts and debt management plans",
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
  : brandKey === "codeon"
  ? "Featured Code Coaches"
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