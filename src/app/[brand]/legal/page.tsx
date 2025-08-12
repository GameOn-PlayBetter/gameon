/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import BrandPageLayout from "@/ui/layouts/BrandPageLayout";
import { brands } from "@/lib/brands";
import LegalPageWrapper from "@/ui/components/LegalPageWrapper";
import { BrandThemeProvider } from "@/app/context/BrandThemeContext";

export default function LegalPage() {
  // ✅ Safe handling for strictNullChecks
  const params = useParams() || {};
  const brand = (params as Record<string, string | string[]>).brand;

  const brandKey = Array.isArray(brand)
    ? brand[0].toLowerCase()
    : brand?.toLowerCase() || "gameon";

  const brandConfig = brands[brandKey as keyof typeof brands];
  if (!brandConfig) return notFound();

  const colors = brandConfig.colors;
  const backgroundColor =
    (colors as any)?.pageBackground ||
    (colors as any)?.background ||
    (colors as any)?.primary ||
    "#000000";

  return (
    <BrandThemeProvider brandName={brandKey}>
      <BrandPageLayout brandName={brandKey}>
        <LegalPageWrapper>
          <div
            className="flex flex-col min-h-screen w-full"
            style={{ backgroundColor }}
          >
            <div className="flex-grow w-full max-w-4xl mx-auto px-6 py-12 text-white">
              <h1 className="text-4xl font-bold mb-8">Legal</h1>

              <div className="space-y-6 text-lg">
                <p>
                  This is placeholder legal content for {brandConfig.companyName}.
                  All official legal disclaimers, intellectual property statements,
                  and other required notices will be listed here.
                </p>
                <p>
                  For additional policies, please refer to the links in the footer below.
                </p>
              </div>
            </div>
          </div>
        </LegalPageWrapper>
      </BrandPageLayout>
    </BrandThemeProvider>
  );
}