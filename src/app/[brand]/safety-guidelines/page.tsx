"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { BoldFooter } from "@/ui/components/BoldFooter";
import { brands } from "@/lib/brands";

export default function SafetyGuidelinesPage() {
  const { brand } = useParams();
  const brandKey = Array.isArray(brand)
    ? brand[0].toLowerCase()
    : brand?.toLowerCase() || "gameon";
  const brandConfig = brands[brandKey as keyof typeof brands];

  if (!brandConfig) return notFound();

  // ✅ Legal links: shared + brand-specific
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
      : [{ label: "Terms of Service", href: `/${brandKey}/terms-of-service` }]),
  ];

  // ✅ Brand email
  const email = `${brandKey}_playbetter@gmail.com`;

  return (
    <DefaultPageLayout>
      <div className="w-full max-w-4xl mx-auto px-6 py-12 text-white">
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