"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { BoldFooter } from "@/ui/components/BoldFooter";

export default function CookiePolicyPage() {
  return (
    <DefaultPageLayout>
      <div className="w-full max-w-4xl mx-auto px-6 py-12 text-white">
        <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
        <p className="mb-6 text-lg">
          GameOn uses cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">1. What Are Cookies?</h2>
        <p className="mb-4 text-lg">
          Cookies are small text files stored on your device by your browser. They help websites remember your preferences and activity.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">2. How We Use Cookies</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>To remember your login session</li>
          <li>To analyze platform usage and improve performance</li>
          <li>To customize your experience with GameOn</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">3. Managing Cookies</h2>
        <p className="mb-4 text-lg">
          You can adjust your browser settings to refuse cookies or alert you when cookies are being used. Disabling cookies may affect platform functionality.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">4. Updates</h2>
        <p className="mb-4 text-lg">
          We may update this Cookie Policy. Changes will be posted on this page with an updated revision date.
        </p>

        <p className="mt-8 text-sm text-gray-400">
          Questions? Contact us at gameon_playbetter@gmail.com
        </p>
      </div>
      <BoldFooter />
    </DefaultPageLayout>
  );
}