/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import BrandPageLayout from "@/ui/layouts/BrandPageLayout";
import { brands } from "@/lib/brands";
import LegalPageWrapper from "@/ui/components/LegalPageWrapper";
import { BrandThemeProvider } from "@/app/context/BrandThemeContext";

export default function PrivacyPolicyPage() {
  // ✅ Safe handling for strictNullChecks with lowercase fallback
  const params = useParams() || {};
  const brand = (params as Record<string, string | string[]>).brand;

  const brandKey = Array.isArray(brand)
    ? brand[0].toLowerCase()
    : brand?.toLowerCase() || "gameon";

  const brandConfig = brands[brandKey as keyof typeof brands];
  if (!brandConfig) return notFound();

  const email = "skilleryllc@gmail.com";

  return (
    <BrandThemeProvider brandName={brandKey}>
      <BrandPageLayout brandName={brandKey}>
        <LegalPageWrapper>
          <div className="flex flex-col min-h-screen w-full">
            <div className="flex-grow w-full max-w-4xl mx-auto px-6 py-12 text-white">
              <h1 className="text-4xl font-bold mb-8">
                {brandConfig.name} Community Safety Guidelines
              </h1>

              <div className="space-y-8 text-lg">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">1. Respect and Inclusion</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All users must treat others with respect, regardless of identity, skill level, or background.</li>
                    <li>Harassment, hate speech, and discrimination are strictly prohibited.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-2">2. Safe Communication</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Do not share or request personal contact details (phone, address, etc.).</li>
                    <li>Use platform tools to report abuse or unsafe behavior immediately.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-2">3. Coach Responsibilities</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Coaches must follow the Code of Conduct, including webcam use and session professionalism.</li>
                    <li>Coaches may not offer services outside of {brandConfig.name} or solicit off-platform payments.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-2">4. Player Responsibilities</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Players must show respect during sessions and follow the coach’s instructions.</li>
                    <li>No trolling, baiting, or inappropriate behavior in sessions or chat.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-2">5. Reporting and Enforcement</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Violations may result in warnings, suspensions, or permanent bans.</li>
                    <li>Reports are reviewed by Admins. Repeated abuse leads to escalating penalties.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-2">6. Appeals</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Suspended users may appeal by emailing {email}.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </LegalPageWrapper>
      </BrandPageLayout>
    </BrandThemeProvider>
  );
}