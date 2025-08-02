"use client";

import React, { useState } from "react";
import { useParams, notFound } from "next/navigation";
import { brands } from "@/lib/brands";
import { searchPages } from "@/lib/searchData"; // ✅ Centralized search data
import BrandPageLayout from "@/ui/layouts/BrandPageLayout";

import GameOnGames from "@/ui/components/GameOnGames";
import GameOnWaitlistBlock from "@/ui/components/GameOnWaitlistBlock";
import { ReserveBlock } from "@/ui/components/ReserveBlock";
import RotatingSearchInput from "@/ui/components/RotatingSearchInput";
import { LoginModal } from "@/ui/components/LoginModal";
import FeaturedCoaches from "@/ui/components/GameOnCoaches";
import { BrandThemeProvider } from "@/app/context/BrandThemeContext";

// ✅ Strongly typed badge & coach interfaces
type BadgeVariant = "success" | "error" | "brand" | "neutral" | "warning";

interface Coach {
  name: string;
  color: string;
  badge: string;
  image: string;
  description: string;
  badgeVariant: BadgeVariant;
  bookingUrl: string;
}

export default function BrandLandingPage() {
  const { brand } = useParams();
  const brandKey = brand as keyof typeof brands;
  const brandConfig = brands[brandKey];

  const [showLogin, setShowLogin] = useState(false);

  if (!brandConfig) return notFound();

  const isFixOn = brandKey === "fixon";
  const isGameOn = brandKey === "gameon";

  // ✅ Hardcoded form links
  const formUrl =
    isGameOn
      ? "https://docs.google.com/forms/d/1LddJuKRXpjIFPaVevI-nyurxjnD3iofQpap8pjC-tII/edit"
      : isFixOn
      ? "https://docs.google.com/forms/d/1FMqO0e7DviXzhhivyRBsHVGvIYrHg64e4hhzFEoRTJs/edit"
      : brandConfig.reserveBlock?.formUrl || "#";

  // ✅ Safe fallback references for build stability
  const colors = brandConfig.colors ?? {
    primary: "#000000",
    border: "#333333",
    glow: "#ffffff",
    button: "#ff00c8",
    buttonHover: "#00cfff",
    text: "#ffffff",
    hover: "#cccccc",
  };

  const reserveBlock = brandConfig.reserveBlock ?? {
    headline: "",
    subtext: "",
    buttonText: "Reserve",
    formUrl: "#",
  };

  // ✅ Strongly typed coach arrays with `as const`
  const featuredCoaches: Coach[] = isFixOn
    ? [
        {
          name: "AutoPro99",
          color: "text-orange-500",
          badge: "Auto Specialist",
          image: "/images/fixon/experts/autopro.jpg",
          description: "Car diagnostics, battery swaps, brake repairs",
          badgeVariant: "warning",
          bookingUrl: formUrl,
        },
        {
          name: "HomeHackR",
          color: "text-orange-300",
          badge: "DIY Pro",
          image: "/images/fixon/experts/homehackr.jpg",
          description: "Wall patching, painting, faucet leaks",
          badgeVariant: "success",
          bookingUrl: formUrl,
        },
        {
          name: "SafeSpark",
          color: "text-orange-400",
          badge: "Electrician",
          image: "/images/fixon/experts/safespark.jpg",
          description: "Outlet repair, light installs, breaker fixes",
          badgeVariant: "brand",
          bookingUrl: formUrl,
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
          bookingUrl: formUrl,
        },
        {
          name: "Coach Sarah",
          color: "text-warning-700",
          badge: "DBD Pro",
          image: "/images/gameon/emma.jpg",
          description: "Competitive survivor & strategy expert",
          badgeVariant: "warning",
          bookingUrl: formUrl,
        },
        {
          name: "Coach Mike",
          color: "text-success-700",
          badge: "LoL Master",
          image: "/images/gameon/michael.jpg",
          description: "Diamond ranked player & macro strategist",
          badgeVariant: "success",
          bookingUrl: formUrl,
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
          label: reserveBlock.buttonText,
          href: formUrl,
        }}
      >
        {/* Search Bar */}
        <div className="w-full max-w-2xl px-4 pt-6 mx-auto">
          <RotatingSearchInput pages={searchPages} />
        </div>

        {/* Waitlist Block */}
        <GameOnWaitlistBlock
          colors={colors}
          formUrl={formUrl}
        />

        {/* Game Cards */}
        <GameOnGames />

        {/* Coach Cards */}
        <FeaturedCoaches />

        {/* Reserve Block */}
        <ReserveBlock
          headline={reserveBlock.headline}
          subtext={reserveBlock.subtext}
          buttonText={reserveBlock.buttonText}
          formUrl={formUrl}
          colors={colors}
        />

        {/* Login Modal */}
        <LoginModal
          open={showLogin}
          onClose={() => setShowLogin(false)}
        />
      </BrandPageLayout>
    </BrandThemeProvider>
  );
}