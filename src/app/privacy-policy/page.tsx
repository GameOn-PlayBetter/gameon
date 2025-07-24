"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { BoldFooter } from "@/ui/components/BoldFooter";

export default function PrivacyPolicyPage() {
  return (
    <DefaultPageLayout>
      <div className="w-full max-w-4xl mx-auto px-6 py-12 text-white">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="mb-6 text-lg">
          GameOn is committed to protecting your privacy. This policy outlines what data we collect, how we use it, and your rights as a user.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">1. Data Collection</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>We collect basic account details (email, username, avatar).</li>
          <li>Session recordings are stored for safety and review purposes.</li>
          <li>We log platform activity for quality and support reasons.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">2. Data Usage</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>We use your data to facilitate sessions, improve safety, and optimize performance.</li>
          <li>We do not sell or share personal data with third parties for advertising.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">3. Your Rights</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>You can request to view, correct, or delete your data at any time.</li>
          <li>You may opt out of marketing communications via your account settings.</li>
        </ul>

        <p className="mt-8 text-sm text-gray-400">
          For questions or requests related to privacy, contact us at gameon.playbetter@gmail.com
        </p>
      </div>
      <BoldFooter />
    </DefaultPageLayout>
  );
}