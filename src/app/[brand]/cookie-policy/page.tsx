/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import { brands } from "@/lib/brands";
import BrandPageLayout from "@/ui/layouts/BrandPageLayout";
import LegalPageWrapper from "@/ui/components/LegalPageWrapper";
import { BrandThemeProvider } from "@/app/context/BrandThemeContext";

export default function CookiePolicyPage() {
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
    (colors as any).primary || (colors as any).background || "#000000";
  const email = "skilleryllc@gmail.com";

  return (
    <BrandThemeProvider brandName={brandKey}>
      <BrandPageLayout brandName={brandKey}>
        <LegalPageWrapper>
          <div
            className="flex flex-col min-h-screen w-full"
            style={{ backgroundColor }}
          >
            <div className="flex-grow w-full max-w-4xl mx-auto px-6 py-12 text-white">
              <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
              <p className="mb-6 text-lg">
                {brandConfig.companyName} uses cookies and similar technologies to
                enhance your experience, analyze usage, and provide personalized
                content.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-2">
                1. What Are Cookies?
              </h2>
              <p className="mb-4 text-lg">
                Cookies are small text files stored on your device by your browser.
                They help websites remember your preferences and activity.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-2">
                2. How We Use Cookies
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-lg">
                <li>To remember your login session</li>
                <li>To analyze platform usage and improve performance</li>
                <li>
                  To customize your experience with {brandConfig.companyName}
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-2">
                3. Managing Cookies
              </h2>
              <p className="mb-4 text-lg">
                You can adjust your browser settings to refuse cookies or alert you
                when cookies are being used. Disabling cookies may affect platform
                functionality.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-2">4. Updates</h2>
              <p className="mb-4 text-lg">
                We may update this Cookie Policy. Changes will be posted on this
                page with an updated revision date.
              </p>

              <p className="mt-8 text-sm text-gray-400">
                Questions? Contact us at {email}
              </p>
            </div>
          </div>
        </LegalPageWrapper>
      </BrandPageLayout>
    </BrandThemeProvider>
  );
}