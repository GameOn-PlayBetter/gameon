"use client";

import { Inter } from "next/font/google";
import { ReactNode, useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';

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

const inter = Inter({ subsets: ["latin"] });

export default function BadgeShopPage() {
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
    <div className="bg-black min-h-screen p-8">
      <>
        <div className="p-6 mb-6 border-b border-white/20">
          <div className="cart-bar">
            <h2>Shopping cart</h2>
            <p>Your cart is empty</p>
          </div>
        </div>
        <div className="px-6 mb-4">
          <section className="brand-section">
            <h1>Badge storefront</h1>
            <p>Choose your favorite badge!</p>
          </section>
        </div>
        <div className="px-6 space-y-10">
          {Object.entries(badgesByBrand).map(([brand, badges]) => (
            <section key={brand}>
              <h2 className="text-xl font-bold mb-4">{brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase()}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
                {badges.map((badge: Badge) => (
                  <div key={badge.id} className="flex flex-col items-center gap-1 p-3 border border-white/20 rounded-lg break-words text-center w-[260px] h-[260px] bg-gray-900 hover:bg-gray-800 transition">
                    {badge.icon_url && <img src={badge.icon_url} alt={badge.name} className="w-24 h-24 object-contain mb-2" />}
                    <h3 className="font-semibold text-center">{badge.name}</h3>
                    {badge.description && <p className="text-sm text-center opacity-80">{badge.description}</p>}
                    <p className="text-xs text-center opacity-70">{badge.price_tokens} tokens{typeof badge.price === 'number' ? ` ($${badge.price.toFixed(2)})` : ''}</p>
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
      </>
    </div>
  );
}
