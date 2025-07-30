"use client";

import React from "react";
import { Badge } from "@/ui/components/Badge";
import BrandPageLayout from "@/ui/layouts/BrandPageLayout";
import RotatingSearchInput from "@/ui/components/RotatingSearchInput";

type BadgeVariant = "brand" | "neutral" | "error" | "warning" | "success";

interface Brand {
  name: string;
  badge: string;
  description: string;
  image: string;
  href: string;
  variant: BadgeVariant;
  live: boolean;
}

const brands: Brand[] = [
  {
    name: "GameOn",
    badge: "Gaming",
    description: "Level up your gaming with expert coaching",
    image: "images/gameon/gameongaming2.avif",
    href: "/gameon",
    variant: "neutral",
    live: true,
  },
  {
    name: "FixOn",
    badge: "Home, Pool & Auto",
    description: "Live expert help for repairs or advice",
    image: "images/fixonhomerepair.jpg",
    href: "/fixon",
    variant: "neutral",
    live: true,
  },
  {
    name: "JamOn",
    badge: "Music",
    description: "Music coaching and live lessons",
    image: "images/jamonmusicscrolls.jpg",
    href: "",
    variant: "neutral",
    live: false,
  },
  {
    name: "LearnOn",
    badge: "Tutoring",
    description: "Tutoring and study help",
    image: "images/learnonphonemath.jpg",
    href: "",
    variant: "neutral",
    live: false,
  },
  {
    name: "GrowOn",
    badge: "Gardening",
    description: "Gardening and outdoor coaching",
    image: "images/growonpansies.jpg",
    href: "",
    variant: "neutral",
    live: false,
  },
  {
    name: "FitOn",
    badge: "Health & Fitness",
    description: "Health coaching and fitness tracking",
    image: "images/fitness.jpg",
    href: "",
    variant: "neutral",
    live: false,
  },
  {
    name: "CodeOn",
    badge: "Coding",
    description: "Live coding sessions and mentorship",
    image: "images/codeoncode1.jpg",
    href: "",
    variant: "neutral",
    live: false,
  },
  {
    name: "CookOn",
    badge: "Cooking",
    description: "Live cooking lessons and recipes",
    image: "images/cookonsushi.jpg",
    href: "",
    variant: "neutral",
    live: false,
  },
  {
    name: "StyleOn",
    badge: "Fashion",
    description: "Personal styling, makeup and fashion advice",
    image: "images/styleonglamorwoman.jpg",
    href: "",
    variant: "neutral",
    live: false,
  },
  {
    name: "MoneyOn",
    badge: "Finance",
    description: "Personal finance and budgeting coaching",
    image: "images/moneyonbitcoin2.jpg",
    href: "",
    variant: "neutral",
    live: false,
  },
];

export default function Page() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "linear-gradient(to bottom, #0F1E30, #000000)",
        fontFamily: "sans-serif",
      }}
    >
      <BrandPageLayout
        brandName="skillery"
        logoSrc="/images/skillery_logo_footer_hd.png"
        companyName="Skillery LLC"
        description="Unlock Your Potential. Book expert help in anything from gaming to gardening."
        legalLinks={[
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Use", href: "/terms" },
          { label: "Contact", href: "/contact" },
        ]}
        socials={[
          { icon: "discord", href: "https://discord.gg/skillery" },
          { icon: "x", href: "https://x.com/skillery" },
          { icon: "instagram", href: "https://instagram.com/skillery" },
        ]}
        fontFamily="sans-serif"
        colors={{
          border: "border-white/30",
          glow: "#FF9C00",
          button: "#FF6B00",
          buttonHover: "#EF5716",
          text: "#FFFFFF",
          hover: "#FF9C00",
        }}
      >
        {/* --- Everything below remains the same --- */}
        <div className="flex w-full flex-col items-center justify-center gap-6 px-6 py-24">
          <div className="flex w-full max-w-[1024px] flex-col items-center justify-center gap-6">
            <img
              src="/images/skillery_logo_wheadline.png"
              alt="Skillery Logo"
              className="max-w-[400px] w-full h-auto object-contain"
            />
            <p className="text-white text-2xl font-semibold text-center tracking-wide">
              What Do{" "}
              <span className="text-orange-400 font-bold animate-[pulse-once_0.6s_ease-in-out]">
                You
              </span>{" "}
              Want To Master Today?
            </p>
            <RotatingSearchInput
              glowColor="#FF9C00"
              borderColor="rgba(255, 255, 255, 0.3)"
              buttonColor="#FF6B00"
              buttonHoverColor="#EF5716"
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-12 px-6 py-12">
          <div className="w-full">
            <div className="px-6 sm:px-12 lg:px-24 xl:px-32">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {brands.map((brand) =>
                  brand.live ? (
                    <a
                      key={brand.name}
                      href={brand.href}
                      className="flex flex-col items-start overflow-hidden rounded-[32px] bg-brand-50 shadow-[0_0_20px_#FF9C00] hover:shadow-[0_0_30px_#EE9E3A] transition-shadow duration-300"
                    >
                      <img
                        className="h-64 w-full flex-none object-cover"
                        src={brand.image}
                        alt={`${brand.name} brand`}
                      />
                      <div className="flex w-full flex-col items-start gap-4 px-8 py-8">
                        <Badge variant={brand.variant}>{brand.badge}</Badge>
                        <div className="flex w-full flex-col items-start gap-2">
                          <span className="text-[24px] font-[700] leading-[28px] text-gray-400">
                            {brand.name}
                          </span>
                          <span className="text-body font-body text-subtext-color">
                            {brand.description}
                          </span>
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div
                      key={brand.name}
                      className="flex flex-col items-start overflow-hidden rounded-[32px] bg-brand-50 shadow-[0_0_20px_#FF9C00] hover:shadow-[0_0_30px_#EF5716] transition-shadow duration-300"
                    >
                      <img
                        className="h-64 w-full flex-none object-cover"
                        src={brand.image}
                        alt={`${brand.name} brand placeholder`}
                      />
                      <div className="flex w-full flex-col items-start gap-4 px-8 py-8">
                        <Badge variant={brand.variant}>{brand.badge}</Badge>
                        <div className="flex w-full flex-col items-start gap-2">
                          <span className="text-[24px] font-[700] leading-[28px] text-gray-400">
                            {brand.name} (Coming Soon)
                          </span>
                          <span className="text-body font-body text-subtext-color">
                            {brand.description}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </BrandPageLayout>
    </div>
  );
}