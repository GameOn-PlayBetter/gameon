"use client";

import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import BrandPageLayout from "@/ui/layouts/BrandPageLayout";
import { BrandThemeProvider } from "@/app/context/BrandThemeContext";
import { FeatherShoppingCart } from "@subframe/core";

// Strongly type what comes back from Supabase
type Badge = {
  id: string | number;
  brand?: string | null;
  icon_url?: string | null;
  name: string;
  description?: string | null;
  price_tokens?: number | null;
  price?: number | null;
};

export default function ShopPage() {
  const [fetchedBadges, setFetchedBadges] = useState<Badge[]>([]);
  useEffect(() => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    supabase.from('badges').select('*').then(({ data, error }) => {
      if (data) setFetchedBadges(data as Badge[]);
    });
  }, []);

  // Group badges by brand
  const badgesByBrand = fetchedBadges.reduce<Record<string, Badge[]>>((acc, badge) => {
    const brandKey = (badge.brand ?? "Unknown").toString();
    if (!acc[brandKey]) acc[brandKey] = [];
    acc[brandKey].push(badge);
    return acc;
  }, {});

  return (
    <BrandThemeProvider brandName="skillery">
      <div
        className="min-h-screen w-full relative z-0"
        style={{ backgroundColor: "#0A0F18", fontFamily: "sans-serif" }}
      >
        <BrandPageLayout brandName="skillery">
          <div className="px-6 py-8">
            <div className="p-6 mb-6 border-b border-white/20">
              <div className="cart-bar flex items-center justify-end gap-3">
                <FeatherShoppingCart className="h-5 w-5 text-white/80" />
                <h2 className="text-white/90 text-lg sm:text-xl font-semibold tracking-wide uppercase">Your Cart</h2>
                <span className="text-xs sm:text-sm text-white/60 select-none">Empty</span>
              </div>
            </div>
            <div className="px-0 mb-4">
              <section className="brand-section text-center">
                <h1>Badges & Frames Shop</h1>
                <p className="max-w-[900px] mx-auto text-white/80">
                  Personalize your profile with premium badges and frames. Unlock status, show off achievements, and stand out across Skillery brands.
                </p>
              </section>
            </div>
            <div className="px-0 space-y-10">
              {Object.entries(badgesByBrand).map(([brand, badges]) => (
                <section key={brand}>
                  <h2 className="text-xl font-bold mb-4">
                    {brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase()}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
                    {badges.map((badge: Badge) => (
                      <div
                        key={badge.id}
                        className="flex flex-col items-center gap-1 p-3 border border-white/20 rounded-lg break-words text-center w-[260px] h-[260px] bg-gray-900 hover:bg-gray-800 transition"
                      >
                        {badge.icon_url && (
                          <img
                            src={badge.icon_url}
                            alt={badge.name}
                            className="w-24 h-24 object-contain mb-2"
                          />
                        )}
                        <h3 className="font-semibold text-center">{badge.name}</h3>
                        {badge.description && (
                          <p className="text-sm text-center opacity-80">{badge.description}</p>
                        )}
                        <p className="text-xs text-center opacity-70">
                          {typeof badge.price_tokens === 'number'
                            ? `${badge.price_tokens} token${badge.price_tokens === 1 ? '' : 's'}`
                            : ''}
                          {typeof badge.price === 'number'
                            ? `${typeof badge.price_tokens === 'number' ? ' • ' : ''}$${badge.price.toFixed(2)}`
                            : ''}
                        </p>
                        <button
                          className="mt-2 px-3 py-1 rounded-md font-semibold bg-gray-800 text-white hover:bg-gray-700 transition cursor-pointer w-auto text-center shadow-md"
                        >
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </BrandPageLayout>
      </div>
    </BrandThemeProvider>
  );
}