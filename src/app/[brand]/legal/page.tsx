"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { BoldFooter } from "@/ui/components/BoldFooter";
import { brands } from "@/lib/brands";

export default function LegalPage() {
  const { brand } = useParams();
  const brandKey = Array.isArray(brand)
    ? brand[0].toLowerCase()
    : brand?.toLowerCase() || "gameon";
  const brandConfig = brands[brandKey as keyof typeof brands];

  if (!brandConfig) return notFound();

  // ✅ Dynamic legal links
  const legalLinks = [
    { label: "Privacy Policy", href: `/${brandKey}/privacy-policy` },
    { label: "Cookie Policy", href: `/${brandKey}/cookie-policy` },
    { label: "Safety Guidelines", href: `/${brandKey}/safety-guidelines` },
    { label: "Coach Eligibility", href: `/${brandKey}/coach-requirements-eligibility` },
    { label: "Contact", href: `/${brandKey}/contact` },
    ...(brandKey === "gameon"
      ? [
          { label: "Prohibited Titles", href: `/${brandKey}/prohibited-titles` },
          { label: "Terms of Service", href: `/${brandKey}/terms-of-service` },
        ]
      : [
          { label: "Terms of Service", href: `/${brandKey}/terms-of-service` },
        ]),
  ];

  return (
    <DefaultPageLayout>
      <div className="w-full max-w-4xl mx-auto px-6 py-12 text-white">
        <h1 className="text-4xl font-bold mb-8">Legal</h1>

        <div className="space-y-6 text-lg">
          <p>
            This is placeholder legal content for {brandConfig.companyName}. All
            official legal disclaimers, intellectual property statements, and
            other required notices will be listed here.
          </p>
          <p>
            For additional policies, please refer to the links in the footer
            below.
          </p>
        </div>
      </div>

      <BoldFooter
        logoSrc={brandConfig.logo}
        companyName={brandConfig.companyName}
        socials={brandConfig.socials}
        legalLinks={legalLinks}
        colors={{
          primary: brandConfig.colors.primary,
          button: brandConfig.colors.button,
          buttonHover: brandConfig.colors.buttonHover,
        }}
      />
    </DefaultPageLayout>
  );
}