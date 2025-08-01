"use client";

import React, { useState } from "react";
import { useParams, notFound } from "next/navigation";
import { brands } from "@/lib/brands";
import BrandPageLayout from "@/ui/layouts/BrandPageLayout";

import GameOnGames from "@/ui/components/GameOnGames";
import GameOnWaitlistBlock from "@/ui/components/GameOnWaitlistBlock";
import { ReserveBlock } from "@/ui/components/ReserveBlock";
import RotatingSearchInput from "@/ui/components/RotatingSearchInput";
import { LoginModal } from "@/ui/components/LoginModal";
import FeaturedCoaches from "@/ui/components/GameOnCoaches";
import { BrandThemeProvider } from "@/app/context/BrandThemeContext";


// Convert the brands object into an array of search suggestions
const searchPages = Object.entries(brands).map(([key, config]) => ({
  name: config.companyName || key,
  description: config.tagline || config.description || "Explore this brand",
  path: `/brand/${key}`,
}));

export default function BrandLandingPage() {
  const { brand } = useParams();
  const brandKey = brand as keyof typeof brands;
  const brandConfig = brands[brandKey];
  const [showLogin, setShowLogin] = useState(false);

  if (!brandConfig) return notFound();

  const isFixOn = brandKey === "fixon";

  // Dynamic coach cards
  const featuredCoaches = isFixOn
    ? [
        {
          name: "AutoPro99",
          color: "text-orange-500",
          badge: "Auto Specialist",
          image: "/images/fixon/experts/autopro.jpg",
          description: "Car diagnostics, battery swaps, brake repairs",
          badgeVariant: "warning",
          bookingUrl: brandConfig.reserveBlock.formUrl,
        },
        {
          name: "HomeHackR",
          color: "text-orange-300",
          badge: "DIY Pro",
          image: "/images/fixon/experts/homehackr.jpg",
          description: "Wall patching, painting, faucet leaks",
          badgeVariant: "success",
          bookingUrl: brandConfig.reserveBlock.formUrl,
        },
        {
          name: "SafeSpark",
          color: "text-orange-400",
          badge: "Electrician",
          image: "/images/fixon/experts/safespark.jpg",
          description: "Outlet repair, light installs, breaker fixes",
          badgeVariant: "brand",
          bookingUrl: brandConfig.reserveBlock.formUrl,
        },
      ]
    : [
        {
          name: "Coach Alex",
          color: "text-brand-700",
          badge: "Minecraft Expert",
          image: "/images/gameon/david.jpg",
          description: "Professional builder & redstone specialist",
          badgeVariant: "brand",
          bookingUrl: brandConfig.reserveBlock.formUrl,
        },
        {
          name: "Coach Sarah",
          color: "text-warning-700",
          badge: "DBD Pro",
          image: "/images/gameon/emma.jpg",
          description: "Competitive survivor & strategy expert",
          badgeVariant: "warning",
          bookingUrl: brandConfig.reserveBlock.formUrl,
        },
        {
          name: "Coach Mike",
          color: "text-success-700",
          badge: "LoL Master",
          image: "/images/gameon/michael.jpg",
          description: "Diamond ranked player & macro strategist",
          badgeVariant: "success",
          bookingUrl: brandConfig.reserveBlock.formUrl,
        },
      ];

  return (
    <BrandThemeProvider brandName={brandKey}>
      <BrandPageLayout
        brandName={brandKey}
        navLinks={[
          { label: isFixOn ? "Find Help" : "Find a Coach", href: "#experts" },
          { label: isFixOn ? "Categories" : "Games", href: "#categories" },
          { label: "Login", onClick: () => setShowLogin(true) },
        ]}
        ctaButton={{
          label: brandConfig.reserveBlock.buttonText,
          href: brandConfig.reserveBlock.formUrl,
        }}
      >
        {/* Search Bar */}
        <div className="w-full max-w-2xl px-4 pt-6 mx-auto">
<RotatingSearchInput />
        </div>

        {/* Waitlist Block */}
        <GameOnWaitlistBlock
          colors={brandConfig.colors}
          formUrl={brandConfig.reserveBlock.formUrl}
        />

        {/* Game Cards */}
        <GameOnGames />

        {/* Coach Cards */}
        <FeaturedCoaches
          coaches={featuredCoaches}
          colors={brandConfig.colors}
        />

        {/* Reserve Block */}
        <ReserveBlock
          headline={brandConfig.reserveBlock.headline}
          subtext={brandConfig.reserveBlock.subtext}
          buttonText={brandConfig.reserveBlock.buttonText}
          formUrl={brandConfig.reserveBlock.formUrl}
          colors={brandConfig.colors}
        />

        {/* Login Modal */}
        <LoginModal
          open={showLogin}
          onClose={() => setShowLogin(false)}
          colors={brandConfig.colors}
        />
      </BrandPageLayout>
    </BrandThemeProvider>
  );
}