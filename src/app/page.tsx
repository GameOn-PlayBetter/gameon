"use client";

import React, { useState, useMemo } from "react";
import { Badge } from "@/ui/components/Badge";
import BrandPageLayout from "@/ui/layouts/BrandPageLayout";
import RotatingSearchInput from "@/ui/components/RotatingSearchInput";
import { BrandThemeProvider } from "@/app/context/BrandThemeContext";
import { searchPages } from "@/lib/searchData"; // ✅ Centralized search data

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
    href: "jamon",
    variant: "neutral",
    live: true,
  },
  {
    name: "FitOn",
    badge: "Health & Fitness",
    description: "Health coaching and fitness tracking",
    image: "images/fiton/fitness.jpg",
    href: "fiton",
    variant: "neutral",
    live: true,
  },
  {
    name: "CodeOn",
    badge: "Coding",
    description: "Live coding sessions and mentorship",
    image: "images/codeoncode1.jpg",
    href: "codeon",
    variant: "neutral",
    live: true,
  },
  {
    name: "LearnOn",
    badge: "Tutoring",
    description: "Tutoring, language learning, and academic success",
    image: "images/learnonphonemath.jpg",
    href: "learnon",
    variant: "neutral",
    live: false,
  },
  {
    name: "GrowOn",
    badge: "Gardening",
    description: "Gardening and outdoor coaching",
    image: "images/growonpansies.jpg",
    href: "grownon",
    variant: "neutral",
    live: false,
  },
  {
    name: "CookOn",
    badge: "Cooking",
    description: "Live cooking lessons and recipes",
    image: "images/cookonsushi.jpg",
    href: "cookon",
    variant: "neutral",
    live: false,
  },
  {
    name: "StyleOn",
    badge: "Fashion",
    description: "Personal styling, makeup and fashion advice",
    image: "images/styleonglamorwoman.jpg",
    href: "styleon",
    variant: "neutral",
    live: false,
  },
  {
    name: "MoneyOn",
    badge: "Finance",
    description: "Personal finance and budgeting coaching",
    image: "images/moneyonbitcoin2.jpg",
    href: "moneyon",
    variant: "neutral",
    live: false,
  },
];

export default function Page() {
  const [query, setQuery] = useState("");

  // Filter brands based on search query
  const filteredBrands = useMemo(() => {
    if (!query.trim()) return brands;
    return brands.filter((brand) =>
      [brand.name, brand.badge, brand.description]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <BrandThemeProvider brandName="skillery">
      <div
        className="min-h-screen w-full relative z-0"
        style={{
          backgroundImage: "linear-gradient(to bottom, #0A0F18, #000000)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          fontFamily: "sans-serif",
        }}
      >
        <BrandPageLayout brandName="skillery">
          {/* Hero with search */}
          <div className="flex w-full flex-col items-center justify-center gap-6 px-6 py-24">
            <div className="flex w-full max-w-[1024px] flex-col items-center justify-center gap-6">
              <p className="text-white text-2xl font-semibold text-center tracking-wide">
                What Do{" "}
                <span className="text-orange-400 font-bold animate-[pulse-once_0.6s_ease-in-out]">
                  You
                </span>{" "}
                Want To Master Today?
              </p>
              {/* ✅ Use centralized searchPages */}
              <RotatingSearchInput pages={searchPages} />
            </div>
          </div>

          {/* Brand grid */}
          <div className="flex w-full flex-col items-center justify-center gap-12 px-6 py-12">
            <div className="w-full">
              <div className="px-6 sm:px-12 lg:px-24 xl:px-32">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {filteredBrands.map((brand) =>
                    brand.live ? (
                      <a
                        key={brand.name}
                        href={brand.href}
                        className="flex flex-col items-start overflow-hidden rounded-[32px] bg-brand-50 shadow-[0_0_20px_#FF9C00] hover:shadow-[0_0_30px_#EF5716] transition-shadow duration-300"
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
                        className="flex flex-col items-start overflow-hidden rounded-[32px] bg-brand-50 shadow-[0_0_20px_#FF9C00] hover:shadow-[0_0_30px_#EE9E3A] transition-shadow duration-300"
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
                  {filteredBrands.length === 0 && (
                    <div className="col-span-full text-center text-gray-400 text-xl py-12">
                      No results found.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </BrandPageLayout>
      </div>
    </BrandThemeProvider>
  );
}