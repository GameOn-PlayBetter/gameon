"use client";

import React from "react";
import { useParams } from "next/navigation";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import BrandedFooter from "@/ui/components/BrandedFooter";

export default function CoachRequirementsEligibilityPage() {
  const { brand } = useParams();
  const brandName = brand ? String(brand) : "Skillery";

  const legalLinks =
    brandName === "gameon"
      ? [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Use", href: "/terms" },
          { label: "Prohibited Titles", href: "/prohibited-titles" },
        ]
      : [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Use", href: "/terms" },
        ];

  return (
    <DefaultPageLayout>
      <div className="w-full max-w-4xl mx-auto px-6 py-12 text-white">
        <h1 className="text-4xl font-bold mb-6">Coach Requirements & Eligibility</h1>
        <ul className="list-disc pl-6 space-y-4 text-lg">
          <li>Webcam required for safety and transparency.</li>
          <li>Upload a valid government-issued ID.</li>
          <li>Intro required: either a pre-recorded video or a live trial session.</li>
          <li>All sessions are recorded and reviewed if needed.</li>
          <li>Auto-approval at launch, but every submission is logged for later review.</li>
        </ul>
      </div>

      <BrandedFooter
        brandName={gameon}
        description="Empowering experts and learners across every field."
        legalLinks={legalLinks}
        bottomText="A brand of Skillery LLC."
        companyName="Skillery LLC"
        logoSrc={`/images/${brandName}/logo.png`} // optional — include if you have logos per brand
        primaryColor="#FF00C8" // or your default
      />
    </DefaultPageLayout>
  );
}