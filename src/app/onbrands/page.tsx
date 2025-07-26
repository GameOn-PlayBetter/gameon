"use client";

import React from "react";
import { Badge } from "@/ui/components/Badge";
import { SkilleryFooter } from "../../ui/components/SkilleryFooter";

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
    image:
      "images/gameongaming2.avif",
    href: "/",
    variant: "neutral",
    live: true,
  },
  {
    name: "FixOn",
    badge: "Home, Pool & Auto",
    description: "Live expert help for repairs or advice",
    image:
      "images/fixonhomerepair.jpg",
    href: "",
    variant: "neutral",
    live: false,
  },
  {
    name: "JamOn",
    badge: "Music",
    description: "Music coaching and live lessons",
    image:
      "images/jamonmusicscrolls.jpg",
    href: "",
    variant: "neutral",
    live: false,
  },
  {
    name: "LearnOn",
    badge: "Tutoring",
    description: "Tutoring and study help",
    image:
      "images/learnonphonemath.jpg",
    href: "",
    variant: "neutral",
    live: false,
  },
  {
    name: "GrowOn",
    badge: "Gardening",
    description: "Gardening and outdoor coaching",
    image:
      "images/growonpansies.jpg",
    href: "",
    variant: "neutral",
    live: false,
  },
  {
    name: "FitOn",
    badge: "Health & Fitness",
    description: "Health coaching and fitness tracking",
    image:
      "images/fitness.jpg",
    href: "",
    variant: "neutral",
    live: false,
  },
  {
    name: "CodeOn",
    badge: "Coding",
    description: "Live coding sessions and mentorship",
    image:
      "images/codeoncode1.jpg",
    href: "",
    variant: "neutral",
    live: false,
  },
  {
    name: "CookOn",
    badge: "Cooking",
    description: "Live cooking lessons and recipes",
    image:
      "images/cookonsushi.jpg",
    href: "",
    variant: "neutral",
    live: false,
  },
  {
    name: "StyleOn",
    badge: "Fashion",
    description: "Personal styling, makeup and fashion advice",
    image:
      "images/styleonglamorwoman.jpg",
    href: "",
    variant: "neutral",
    live: false,
  },
  {
    name: "MoneyOn",
    badge: "Finance",
    description: "Personal finance and budgeting coaching",
    image:
      "images/moneyonbitcoin2.jpg",
    href: "",
    variant: "neutral",
    live: false,
  },
];

export default function OnBrandsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#010818]">
<div className="flex w-full grow shrink-0 basis-0 flex-col items-start bg-[#010818]">
          <div className="flex w-full flex-col items-center justify-center gap-6 px-6 py-24">
            <div className="flex w-full max-w-[1024px] flex-col items-center justify-center gap-6">
              <img
  src="/images/skillery_logo_wheadline.png"
  alt="Skillery Logo"
  className="max-w-[400px] w-full h-auto object-contain"
/>
              <span className="w-full max-w-[576px] text-[24px] font-[500] leading-[32px] text-neutral-600 text-center">
                {"What Do You Want To Master Today?"}
              </span>
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
                            <span
                              className={`font-['Orbitron'] text-[24px] font-[700] leading-[28px] ${
                                brand.variant === "error"
                                  ? "text-error-700"
                                  : "text-gray-400"
                              }`}
                            >
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
                            <span className="font-['Orbitron'] text-[24px] font-[700] leading-[28px] text-gray-400">
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
          <SkilleryFooter />
        </div>
      </div>
  );
}