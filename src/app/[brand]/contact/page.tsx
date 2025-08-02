"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { BoldFooter } from "@/ui/components/BoldFooter";
import { brands } from "@/lib/brands";

export default function ContactPage() {
  const { brand } = useParams();
  const brandKey = Array.isArray(brand)
    ? brand[0].toLowerCase()
    : brand?.toLowerCase() || "gameon";
  const brandConfig = brands[brandKey as keyof typeof brands];

  if (!brandConfig) return notFound();

  // ✅ Shared + brand-specific links
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

  // ✅ Plain email string
  const email = `${brandKey}_playbetter@gmail.com`;

  return (
    <DefaultPageLayout
      style={{ backgroundColor: brandConfig.colors.primary }} // ✅ Brand-specific background
    >
      <div className="w-full max-w-4xl px-6 py-12 text-white mx-auto">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

        <div className="space-y-6 text-lg">
          <p>Have questions, feedback, or need help? We’d love to hear from you.</p>

          <p>Reach out any time at {email}</p>

          <p>
            We typically respond within 24–48 hours. For urgent moderation or
            safety issues, please use the in-app report tools.
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