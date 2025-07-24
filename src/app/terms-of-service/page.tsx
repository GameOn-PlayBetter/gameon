"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { BoldFooter } from "@/ui/components/BoldFooter";

export default function TermsOfServicePage() {
  return (
    <DefaultPageLayout>
      <div className="w-full max-w-4xl mx-auto px-6 py-12 text-white">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-6 text-lg">
          By using GameOn, you agree to abide by these Terms of Service. These terms govern your access to and use of the GameOn platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">1. Eligibility</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>You must be at least 13 years old to use the platform.</li>
          <li>Coaches must meet all eligibility and safety requirements.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">2. Account Responsibilities</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>You’re responsible for your account activity and keeping login credentials secure.</li>
          <li>GameOn reserves the right to suspend accounts that violate our policies.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">3. Session Rules</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>All sessions are recorded for safety and moderation.</li>
          <li>Inappropriate behavior or harassment will result in suspension.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">4. Payments and Refunds</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>Sessions are paid using GameOn Tokens.</li>
          <li>Tips go directly to coaches. Token purchases are non-refundable.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">5. Modifications</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>We may update these terms at any time. Continued use indicates acceptance.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-2 text-yellow-400">
          ⚠️ Sessions in Unsupported or Restricted Games
        </h2>
        <p className="text-lg mb-4">
          GameOn coaches may offer sessions in a wide variety of games, including titles not officially supported by the platform. Sessions involving prohibited content, ESRB Adults Only (AO) ratings, or games banned by major streaming platforms may not be recorded or monetized, and may be blocked from certain platform features.
        </p>
        <p className="text-lg mb-6">
          GameOn is not liable for session content related to unsupported or restricted games. It is the responsibility of the player and coach to ensure the session complies with local laws, platform rules (e.g., GameOn Terms of Service), and GameOn’s Community Guidelines.
        </p>
        <p className="mt-4 text-lg">
          For a list of prohibited or flagged titles, please visit our{" "}
          <a href="/prohibited-titles" className="underline text-blue-400 hover:text-blue-300">
            Prohibited Titles page
          </a>.
        </p>

        <p className="mt-8 text-sm text-gray-400">
          Questions? Contact us at gameon_playbetter@gmail.com
        </p>
      </div>
      <BoldFooter />
    </DefaultPageLayout>
  );
}