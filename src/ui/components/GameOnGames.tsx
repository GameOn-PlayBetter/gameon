/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { brands } from "@/lib/brands";
import { Button } from "@/ui/components/Button";
import { FeatherArrowRight, FeatherArrowRightCircle } from "@subframe/core";

export default function GameOnGames() {
  const { brand } = useParams();
  const brandKey = (brand as keyof typeof brands) || "gameon";
  const brandConfig = brands[brandKey];
  const glowColor = brandConfig.colors.glow;

  // ✅ Default fallback for GameOn
  const gameOnFormUrl =
    "https://docs.google.com/forms/d/1LddJuKRXpjIFPaVevI-nyurxjnD3iofQpap8pjC-tII/edit";

  // ✅ Brand-specific waitlist form
  const formUrl =
    (brandConfig as any).forms?.waitlistUrl || gameOnFormUrl;

  // ✅ Section title per brand
  const sectionTitle =
    brandKey === "fixon"
      ? "Featured Fixes"
      : brandKey === "fiton"
      ? "Featured Workouts"
      : brandKey === "jamon"
      ? "Featured Music"
      : brandKey === "codeon"
      ? "Featured Projects"
      : brandKey === "learnon"
      ? "Featured Lessons"
      : brandKey === "growon"
      ? "Featured Outdoor Skills"
      : "Featured Games";

  // ✅ Featured items per brand
  const featuredItems =
    brandKey === "fixon"
      ? [
          { title: "Household Issues & Questions", description: "All things home repair.", image: "/images/fixon/garage-door.jpg" },
          { title: "Leaks", description: "Stop drips and save water. Get step-by-step faucet repair guidance.", image: "/images/fixon/faucet.jpg" },
          { title: "Pool Repair", description: "Learn to troubleshoot and repair your pool with live help from pros.", image: "/images/fixon/pool-pump.jpg" },
          { title: "Fence Repair", description: "Fix broken boards or leaning posts with real-time help.", image: "/images/fixon/fence.jpg" },
        ]
      : brandKey === "fiton"
      ? [
          { title: "Strength Training", description: "Live sessions with expert trainers to build muscle safely and effectively.", image: "/images/fiton/fitnesswomanlifting.jpg" },
          { title: "Yoga & Flexibility", description: "Improve mobility and reduce stress with guided live yoga classes.", image: "/images/fiton/fitnessyoga.jpg" },
          { title: "Cardio & HIIT", description: "Burn calories and boost stamina with high-energy, trainer-led workouts.", image: "/images/fiton/cardio.jpg" },
          { title: "Nutrition & Wellness", description: "Learn how to complement your workouts with proper nutrition and lifestyle habits.", image: "/images/fiton/nutrition.jpg" },
        ]
      : brandKey === "jamon"
      ? [
          { title: "Violin Lessons", description: "Learn chords, theory, and your favorite songs with live instruction.", image: "jamon/violin.jpg" },
          { title: "Piano & Keys", description: "Master scales, bowing technique, and your favorite pieces with real-time guidance.", image: "jamon/piano.jpg" },
          { title: "Vocal Coaching", description: "Improve tone, range, and performance skills with live coaching.", image: "jamon/vocals.jpg" },
          { title: "Songwriting & Music Theory", description: "Understand music structure and create your own songs live with an expert.", image: "jamon/theory.jpg" },
        ]
      : brandKey === "codeon"
      ? [
          { title: "Web Development", description: "Get live help building websites and fixing frontend issues.", image: "/images/codeon/webdev.jpg" },
          { title: "Python Projects", description: "Debug scripts, learn new libraries, and solve coding challenges.", image: "/images/codeon/python.jpg" },
          { title: "Game Development", description: "Learn Unity or Unreal basics and get support on your game projects.", image: "/images/codeon/gamedev.jpg" },
          { title: "Code Reviews & Pull Requests", description: "Get your code reviewed live by experienced developers.", image: "/images/codeon/codereview.webp" },
        ]
      : brandKey === "learnon"
      ? [
          { title: "Math & Science Help", description: "Get live, step-by-step help on tough assignments and core concepts.", image: "/images/learnon/math.jpg" },
          { title: "Language Learning", description: "Practice speaking and improve your fluency with real-time conversation coaching.", image: "/images/learnon/language.jpg" },
          { title: "Study Skills & Tutoring", description: "Learn smarter, not harder. Develop strong study habits and test prep strategies.", image: "/images/learnon/study.jpg" },
          { title: "College & Test Prep", description: "Get live coaching for SAT, ACT, and other major exams.", image: "/images/learnon/testprep.jpg" },
        ]
      : brandKey === "growon"
      ? [
          { title: "Vegetable & Flower Gardening", description: "Learn to plant, grow, and maintain healthy, beautiful gardens.", image: "/images/growon/gardening.jpg" },
          { title: "Lawn Care & Landscaping", description: "Master mowing, fertilizing, and designing the yard of your dreams.", image: "/images/growon/lawn.jpg" },
          { title: "Plant Care & Composting", description: "Discover how to keep your plants thriving and create rich soil naturally.", image: "/images/growon/plants.jpg" },
          { title: "Outdoor Projects & DIY", description: "Get guidance on raised beds, edging, and other outdoor projects.", image: "/images/growon/outdoor.jpg" },
        ]
      : [
          { title: "Minecraft", description: "Create the perfect gaming environment with our expert setup guides and recommendations.", image: "/images/minecraft.webp" },
          { title: "Dead by Daylight", description: "Join our gaming community events and compete with players worldwide.", image: "/images/dbd.jpg" },
          { title: "League of Legends", description: "Master champion mechanics and climb the ranked ladder with pro guidance.", image: "/images/league.jpg" },
          { title: "Valorant", description: "Improve your aim and tactical decision-making with personalized coaching.", image: "/images/valorant.jpg" },
        ];

  return (
    <div className="flex w-full flex-col items-center justify-center gap-12 px-6 py-24">
      <div className="flex w-full max-w-[1280px] flex-col items-start gap-8">
        <span className="font-['Orbitron'] text-[36px] font-[700] leading-[40px]" style={{ color: glowColor }}>
          {sectionTitle}
        </span>
        <div className="w-full items-start gap-8 grid grid-cols-2">
          {featuredItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start overflow-hidden rounded-[32px] bg-brand-50"
              style={{ boxShadow: `0 0 25px ${glowColor}`, border: `2px solid ${glowColor}` }}
            >
              <img className="h-64 w-full flex-none object-cover" src={item.image} alt={item.title} />
              <div className="flex w-full flex-col items-start gap-4 px-8 py-8">
                <div className="flex w-full flex-col items-start gap-2">
                  <span className="font-['Orbitron'] text-[24px] font-[700] leading-[28px] text-default-font">
                    {item.title}
                  </span>
                  <span className="text-body font-body text-subtext-color">{item.description}</span>
                </div>
                <a href={formUrl} target="_blank" rel="noopener noreferrer">
                  <Button icon={<FeatherArrowRight />}>Learn More</Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <a href={formUrl} target="_blank" rel="noopener noreferrer">
        <Button size="large" icon={<FeatherArrowRightCircle />}>
{brandKey === "fixon"
  ? "All Fixes"
  : brandKey === "fiton"
  ? "All Workouts"
  : brandKey === "jamon"
  ? "All Music Lessons"
  : brandKey === "codeon"
  ? "All Projects"
  : brandKey === "learnon"
  ? "All Lessons"
  : brandKey === "growon"
  ? "All Outdoor Skills"
  : "All Games"}
        </Button>
      </a>
    </div>
  );
}