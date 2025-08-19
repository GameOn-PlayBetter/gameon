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
              <li>A <strong>webcam is required</strong> for all sessions to ensure safety, transparency, and quality.</li>
              <li>Coaches must <strong>upload a valid government-issued ID</strong> for verification.</li>
              <li>A <strong>coach introduction</strong> is required, either through a pre-recorded video or a scheduled live trial session.</li>
              <li><strong>All sessions will be recorded</strong> and may be reviewed for quality, safety, and compliance.</li>
              <li>Coaches <strong>may be auto-approved at launch</strong>, but all submissions are logged and subject to later review.</li>
              <li>Coaches must be <strong>at least 18 years old</strong> (or meet the legal age requirement in their region).</li>
              <li>Coaches must <strong>demonstrate expertise</strong> in their subject area; certain categories may require certifications.</li>
              <li>Coaches must agree to <strong>Skillery’s Code of Conduct</strong> and maintain professionalism in all interactions.</li>
              <li>Coaches must <strong>keep availability accurate</strong> and honor scheduled sessions.</li>
            </ul>
          </div>
        </LegalPageWrapper>
      </BrandPageLayout>
    </BrandThemeProvider>
  );
}