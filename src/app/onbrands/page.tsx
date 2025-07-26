"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Badge } from "@/ui/components/Badge";
import { BoldFooter } from "@/ui/components/BoldFooter";

const brands = [
  {
    name: "GameOn",
    badge: "Gaming",
    description: "Level up your gaming with expert coaching",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80",
    href: "/gameon",
    variant: "error",
    live: true,
  },
  {
    name: "FixOn",
    badge: "Home & Auto",
    description: "Live expert help for repairs",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80",
    href: "",
    variant: "secondary",
    live: false,
  },
  {
    name: "JamOn",
    badge: "Music",
    description: "Music coaching and live lessons",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80",
    href: "",
    variant: "secondary",
    live: false,
  },
  {
    name: "LearnOn",
    badge: "Tutoring",
    description: "Tutoring and study help",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80",
    href: "",
    variant: "secondary",
    live: false,
  },
  {
    name: "GrowOn",
    badge: "Gardening",
    description: "Gardening and outdoor coaching",
    image:
      "https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&q=80",
    href: "",
    variant: "secondary",
    live: false,
  },
  {
    name: "FitOn",
    badge: "Health & Fitness",
    description: "Health coaching and fitness tracking",
    image:
      "https://images.unsplash.com/photo-1554284126-2ddefdd764c7?auto=format&fit=crop&q=80",
    href: "",
    variant: "secondary",
    live: false,
  },
  {
    name: "CodeOn",
    badge: "Coding",
    description: "Live coding sessions and mentorship",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80",
    href: "",
    variant: "secondary",
    live: false,
  },
  {
    name: "CookOn",
    badge: "Cooking",
    description: "Live cooking lessons and recipes",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80",
    href: "",
    variant: "secondary",
    live: false,
  },
  {
    name: "StyleOn",
    badge: "Fashion",
    description: "Personal styling and fashion advice",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80",
    href: "",
    variant: "secondary",
    live: false,
  },
  {
    name: "MoneyOn",
    badge: "Finance",
    description: "Personal finance and budgeting coaching",
    image:
      "https://images.unsplash.com/photo-1542223616-42b8de2d4c3f?auto=format&fit=crop&q=80",
    href: "",
    variant: "secondary",
    live: false,
  },
];

export default function OnBrandsPage() {
  return (
    <DefaultPageLayout>
      <div className="flex w-full flex-col items-center bg-black min-h-screen">
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start bg-black">
          <div className="flex w-full flex-col items-center justify-center gap-6 px-6 py-24">
            <div className="flex w-full max-w-[1024px] flex-col items-center justify-center gap-6">
              <span className="w-full max-w-[768px] whitespace-pre-wrap font-['Orbitron'] text-[72px] font-[900] leading-[80px] text-default-font text-center">
                {"The ON Family"}
              </span>
              <span className="w-full max-w-[576px] text-[24px] font-[500] leading-[32px] text-neutral-600 text-center">
                {"A unified brand system for expert coaching and guidance"}
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
                        className="flex flex-col items-start overflow-hidden rounded-[32px] bg-brand-50 shadow-lg hover:shadow-2xl transition-shadow duration-300"
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
                        className="flex flex-col items-start overflow-hidden rounded-[32px] bg-gray-800 shadow-lg opacity-60 cursor-not-allowed select-none"
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

          <BoldFooter />
        </div>
      </div>
    </DefaultPageLayout>
  );
}