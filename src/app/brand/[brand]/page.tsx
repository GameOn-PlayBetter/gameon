"use client";

import React, { useState } from "react";
import { useParams, notFound } from "next/navigation";
import { brands } from "@/lib/brands";
import BrandPageLayout from "@/ui/layouts/BrandPageLayout";

import GameOnHero from "@/ui/components/GameOnHero";
import GameOnGames from "@/ui/components/GameOnGames";
import GameOnWaitlistBlock from "@/ui/components/GameOnWaitlistBlock";
import { ReserveBlock } from "@/ui/components/ReserveBlock"
import RotatingSearchInput from "@/ui/components/RotatingSearchInput";
import { LoginModal } from "@/ui/components/LoginModal";
import { FixOnHero } from "@/ui/components/FixOnHero";
import { FeaturedCoaches } from "@/ui/components/FeaturedCoaches";

export default function BrandLandingPage() {
  const { brand } = useParams();
  const brandKey = brand as keyof typeof brands;
  const brandConfig = brands[brandKey];
  const [showLogin, setShowLogin] = useState(false);

  if (!brandConfig) return notFound();

  const featuredCoaches = [
    {
      name: "Coach Alex",
      color: "text-brand-700",
      badge: "Minecraft Expert",
      image: "/images/fixon/david.jpg",
      description: "Professional builder & redstone specialist",
      badgeVariant: "brand",
      bookingUrl:
        "https://docs.google.com/forms/d/e/1FAIpQLSchRbr7JxV_pGQuP24j46fguvDiaQCveeFKvilhh_mWFt4I9w/viewform",
    },
    {
      name: "Coach Sarah",
      color: "text-warning-700",
      badge: "DBD Pro",
      image: "/images/fixon/emma.jpg",
      description: "Competitive survivor & strategy expert",
      badgeVariant: "warning",
      bookingUrl:
        "https://docs.google.com/forms/d/e/1FAIpQLSchRbr7JxV_pGQuP24j46fguvDiaQCveeFKvilhh_mWFt4I9w/viewform",
    },
    {
      name: "Coach Mike",
      color: "text-success-700",
      badge: "LoL Master",
      image: "/images/gameon/michael.jpg",
      description: "Diamond ranked player & macro strategist",
      badgeVariant: "success",
      bookingUrl:
        "https://docs.google.com/forms/d/e/1FAIpQLSchRbr7JxV_pGQuP24j46fguvDiaQCveeFKvilhh_mWFt4I9w/viewform",
    },
  ];

  const renderGameOn = () => (
    <BrandPageLayout
fontFamily={brandConfig.fontFamily}
      logoSrc={brandConfig.logo}
      primaryColor={brandConfig.colors.primary}
      companyName={brandConfig.companyName}
      bottomText={brandConfig.bottomText}
      legalLinks={brandConfig.legalLinks}
      socials={[
        { icon: "tiktok", href: "https://www.tiktok.com/@gameon.gg" },
        { icon: "instagram", href: "https://www.instagram.com/gameon_playbetter_together1/" },
        { icon: "x", href: "https://x.com/game_on_gg" },
        { icon: "discord", href: "https://discord.com/channels/1389283723412902080/1389283724851413164" },
      ]}
      brandName={brandKey}
      description={brandConfig.description}
      navLinks={[
        { label: "Find a Coach", href: "#experts" },
        { label: "Games", href: "#categories" },
        { label: "Login", onClick: () => setShowLogin(true) },
      ]}
      ctaButton={{
        label: "Apply to Coach",
        href: "https://docs.google.com/forms/d/1LddJuKRXpjIFPaVevI-nyurxjnD3iofQpap8pjC-tII/viewform",
        target: "_blank",
      }}
      colors={brandConfig.colors}
    >

      <div className="w-full max-w-2xl px-4 pt-6 mx-auto">
        <RotatingSearchInput
          borderColor={brandConfig.colors.border}
          glowColor={brandConfig.colors.glow}
          buttonColor={brandConfig.colors.button}
          buttonHoverColor={brandConfig.colors.buttonHover}
        />
      </div>
<GameOnWaitlistBlock
  colors={brandConfig.colors}
  formUrl={brandConfig.reserveBlock.formUrl}
/>
      <GameOnGames />
      <FeaturedCoaches coaches={featuredCoaches} />
      <ReserveBlock
        brandName={brandKey}
        headline={brandConfig.reserveBlock.headline}
        subtext={brandConfig.reserveBlock.subtext}
        buttonText={brandConfig.reserveBlock.buttonText}
        formUrl={brandConfig.reserveBlock.formUrl}
        backgroundColor={brandConfig.colors.primary}
        textColor={brandConfig.colors.text}
        buttonColor={brandConfig.colors.button}
        buttonHoverColor={brandConfig.colors.buttonHover}
borderColor={brandConfig.colors.border}
      />
      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        colors={brandConfig.colors}
      />
    </BrandPageLayout>
  );

  const renderFixOn = () => {
    const fixExperts = [
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
    ];

    return (
      <div className={brandKey}>
        <BrandPageLayout
fontFamily={brandConfig.fontFamily}
          logoSrc={brandConfig.logo}
          primaryColor={brandConfig.colors.primary}
          companyName={brandConfig.companyName}
          bottomText={brandConfig.bottomText}
          legalLinks={brandConfig.legalLinks}
          socials={[]} // Add when ready
          brandName={brandKey}
          description={brandConfig.description}
          navLinks={[
            { label: "Find Help", href: "#experts" },
            { label: "Categories", href: "#categories" },
            { label: "Login", onClick: () => setShowLogin(true) },
          ]}
          ctaButton={{
            label: brandConfig.reserveBlock.buttonText,
            href: brandConfig.reserveBlock.formUrl,
            target: "_blank",
          }}
          colors={brandConfig.colors}
        >
          <FixOnHero colors={brandConfig.colors} />
          <div className="w-full max-w-2xl px-4 pt-6 mx-auto">
            <RotatingSearchInput
              borderColor={brandConfig.colors.border}
              glowColor={brandConfig.colors.glow}
              buttonColor={brandConfig.colors.button}
              buttonHoverColor={brandConfig.colors.buttonHover}
              terms={[
                "clogged sink",
                "install ceiling fan",
                "pool filter leaking",
                "jumpstart my car",
                "breaker keeps tripping",
              ]}
            />
          </div>
          <GameOnWaitlistBlock
            colors={brandConfig.colors}
            formUrl={brandConfig.reserveBlock.formUrl}
          />
          <GameOnGames />
          <FeaturedCoaches coaches={fixExperts} />
<ReserveBlock
  headline={brandConfig.reserveBlock.headline}
  subtext={brandConfig.reserveBlock.subtext}
  buttonText={brandConfig.reserveBlock.buttonText}
  formUrl={brandConfig.reserveBlock.formUrl}
  colors={{
    primary: brandConfig.colors.primary,
    text: brandConfig.colors.text,
    button: brandConfig.colors.button,
    buttonHover: brandConfig.colors.buttonHover,
    border: brandConfig.colors.border,
    glow: brandConfig.colors.glow,
  }}
/>
          <LoginModal
            open={showLogin}
            onClose={() => setShowLogin(false)}
            colors={brandConfig.colors}
          />
        </BrandPageLayout>
      </div>
    );
  };

  const renderFallback = () => (
    <BrandPageLayout
fontFamily={brandConfig.fontFamily}
      logoSrc={brandConfig.logo}
      primaryColor={brandConfig.colors.primary}
      companyName={brandConfig.companyName}
      bottomText={brandConfig.bottomText}
      legalLinks={brandConfig.legalLinks}
      socials={[]}
      brandName={brandKey}
      description={brandConfig.description}
    >
      <div className="flex flex-col items-center text-white w-full px-4 pt-24 gap-6">
        <h1 className="text-3xl font-bold">{brandConfig.name}</h1>
        <p>Branded landing page coming soon!</p>
      </div>
    </BrandPageLayout>
  );

  switch (brandKey) {
    case "gameon":
      return renderGameOn();
    case "fixon":
      return renderFixOn();
    default:
      return renderFallback();
  }
}