/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import { brands } from "@/lib/brands";
import BrandPageLayout from "@/ui/layouts/BrandPageLayout";
import LegalPageWrapper from "@/ui/components/LegalPageWrapper";
import { BrandThemeProvider } from "@/app/context/BrandThemeContext";

export default function PrivacyPolicyPage() {
  // ✅ Grab brand from URL or default to "gameon"
  const params = useParams() || {};
  const brand = (params as Record<string, string | string[]>).brand;

  const brandKey = Array.isArray(brand)
    ? brand[0].toLowerCase()
    : brand?.toLowerCase() || "gameon";

  const brandConfig = brands[brandKey as keyof typeof brands];
  if (!brandConfig) return notFound();

  // ✅ Safe background fallback
  const colors = brandConfig.colors;
  const backgroundColor =
    (colors as any).primary || (colors as any).background || "#000000";

  const email = "skilleryllc@gmail.com";

  return (
    <BrandThemeProvider brandName={brandKey}>
      <BrandPageLayout brandName={brandKey}>
        <LegalPageWrapper>
          <div
            className="flex-grow w-full max-w-4xl mx-auto px-6 py-12 text-white"
            style={{ backgroundColor }}
          >
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <p className="mb-6 text-lg">
              {brandConfig.companyName} is committed to protecting your privacy.
              This policy outlines what data we collect, how we use it, and your
              rights as a user.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-2">1. Data Collection</h2>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li>We collect basic account details (email, username, avatar).</li>
              <li>Session recordings are stored for safety and review purposes.</li>
              <li>We log platform activity for quality and support reasons.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-2">2. Data Usage</h2>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li>
                We use your data to facilitate sessions, improve safety, and
                optimize performance.
              </li>
              <li>
                We do not sell or share personal data with third parties for
                advertising.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-2">3. Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li>
                You can request to view, correct, or delete your data at any
                time.
              </li>
              <li>
                You may opt out of marketing communications via your account
                settings.
              </li>
            </ul>

            <p className="mt-8 text-sm text-gray-400">
              For questions or requests related to privacy, contact us at {email}
            </p>
          </div>
        </LegalPageWrapper>
      </BrandPageLayout>
    </BrandThemeProvider>
  );
}