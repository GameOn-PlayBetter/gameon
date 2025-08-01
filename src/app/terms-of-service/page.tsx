"use client";

import React from "react";
import { useParams } from "next/navigation";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { BoldFooter } from "@/ui/components/BoldFooter";
import { brands } from "@/lib/brands";

export default function TermsOfServicePage() {
  const { brand } = useParams();
  const brandName = brand ? String(brand) : "Skillery";
  const brandConfig = brands[brandName as keyof typeof brands];

  return (
    <DefaultPageLayout>
      <div className="w-full max-w-4xl mx-auto px-6 py-12 text-white">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-6 text-lg">
          By using {brandConfig.companyName}, you agree to abide by these Terms of Service. These terms govern your access to and use of the {brandConfig.companyName} platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">1. Eligibility</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>You must be at least 13 years old to use the platform.</li>
          <li>Coaches must meet all eligibility and safety requirements.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">2. Account Responsibilities</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>You’re responsible for your account activity and keeping login credentials secure.</li>
          <li>{brandConfig.companyName} reserves the right to suspend accounts that violate our policies.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">3. Session Rules</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>All sessions are recorded for safety and moderation.</li>
          <li>Inappropriate behavior or harassment will result in suspension.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">4. Payments and Refunds</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>Sessions are paid using {brandConfig.companyName} Tokens.</li>
          <li>Tips go directly to coaches. Token purchases are non-refundable.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">5. Modifications</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>We may update these terms at any time. Continued use indicates acceptance.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">6. Session Restrictions</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>
            {brandConfig.companyName} coaches may offer sessions in a wide variety of games, including titles not officially supported by the platform. Sessions involving prohibited content, ESRB Adults Only (AO) ratings, or games banned by streaming platforms may not be recorded or monetized, and may be blocked from certain platform features. {brandConfig.companyName} is not liable for session content related to unsupported or restricted games. It is the responsibility of the player and coach to ensure the session complies with local laws, platform rules (e.g. Terms of Service), and Community Guidelines.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">7. Contact Us</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>
            If you have any questions or concerns about these terms, please contact us at gameon_playbetter@gmail.com
          </li>
        </ul>
      </div>
      <BoldFooter
        logoSrc={brandConfig.logo}
        companyName={brandConfig.companyName}
        colors={{
          primary: brandConfig.colors.primary,
          button: brandConfig.colors.button,
          buttonHover: brandConfig.colors.buttonHover,
        }}
      />
    </DefaultPageLayout>
  );
}