/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import { brands } from "@/lib/brands";
import BrandPageLayout from "@/ui/layouts/BrandPageLayout";
import LegalPageWrapper from "@/ui/components/LegalPageWrapper";
import { BrandThemeProvider } from "@/app/context/BrandThemeContext";

export default function ContactPage() {
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
  const email = "yo@skillery.co";

  return (
    <BrandThemeProvider brandName={brandKey}>
      <BrandPageLayout brandName={brandKey}>
        <LegalPageWrapper>
          <div
            className="flex flex-col min-h-screen w-full"
            style={{ backgroundColor }}
          >
            <div className="flex-grow w-full max-w-4xl px-6 py-12 text-white mx-auto">
              <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

              <div className="space-y-6 text-lg">
                <p>
                  Have questions, feedback, or need help? We’d love to hear from you.
                </p>

                <p>Reach out any time at {email}</p>

                <p>
                  We typically respond within 24–48 hours. For urgent moderation or
                  safety issues, please use the in-app report tools.
                </p>
              </div>
            </div>
          </div>
        </LegalPageWrapper>
      </BrandPageLayout>
    </BrandThemeProvider>
  );
}