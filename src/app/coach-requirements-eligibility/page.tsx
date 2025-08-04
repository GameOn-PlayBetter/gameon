/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import { brands } from "@/lib/brands";
import BrandPageLayout from "@/ui/layouts/BrandPageLayout";
import LegalPageWrapper from "@/ui/components/LegalPageWrapper";
import { BrandThemeProvider } from "@/app/context/BrandThemeContext";

export default function CoachRequirementsEligibilityPage() {
  // ✅ Safe handling for strictNullChecks
  const params = useParams() || {};
  const brand = (params as Record<string, string | string[]>).brand;

  const brandKey = Array.isArray(brand)
    ? brand[0].toLowerCase()
    : brand?.toLowerCase() || "gameon";

  const brandConfig = brands[brandKey as keyof typeof brands];
  if (!brandConfig) return notFound();

  // ✅ Safe background fallback handles brands without `primary`
  const colors = brandConfig.colors;
  const backgroundColor =
    (colors as any).primary || (colors as any).background || "#000000";

  return (
    <BrandThemeProvider brandName={brandKey}>
      <BrandPageLayout brandName={brandKey}>
        <LegalPageWrapper>
          <div
            className="flex-grow w-full max-w-4xl mx-auto px-6 py-12 text-white"
            style={{ backgroundColor }}
          >
            <h1 className="text-4xl font-bold mb-6">
              Coach Requirements & Eligibility
            </h1>
            <ul className="list-disc pl-6 space-y-4 text-lg">
              <li>Webcam required for safety and transparency.</li>
              <li>Upload a valid government-issued ID.</li>
              <li>
                Intro required: either a pre-recorded video or a live trial
                session.
              </li>
              <li>All sessions are recorded and reviewed if needed.</li>
              <li>
                Auto-approval at launch, but every submission is logged for
                later review.
              </li>
            </ul>
          </div>
        </LegalPageWrapper>
      </BrandPageLayout>
    </BrandThemeProvider>
  );
}