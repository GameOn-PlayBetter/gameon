// src/app/privacy-policy/page.tsx
"use client";

import React from "react";
import BrandPageLayout from "@/ui/layouts/BrandPageLayout";
import { BrandThemeProvider } from "@/app/context/BrandThemeContext";
import { brands } from "@/lib/brands";

export default function PrivacyPolicyPage() {
  const logo = brands?.skillery?.logo as string | undefined;
  return (
    <BrandThemeProvider brandName="skillery">
      <style jsx global>{`
        html, body, main {
          background-color: #0F1E30 !important;
        }
      `}</style>
      <BrandPageLayout brandName="skillery">
        <div
          style={{
            backgroundColor: "#0F1E30",
            color: "white",
            minHeight: "100vh",
            padding: "2rem",
          }}
        >

          <div className="max-w-4xl mx-auto prose prose-invert">
            <h1>Privacy Policy</h1>
            <p>
              Skillery, LLC ("Skillery") is committed to protecting your privacy. This policy applies to Skillery and all its brands, including GameOn, LearnOn, JamOn, FixOn, GrowOn, FitOn, CodeOn, CookOn, StyleOn, and MoneyOn.
            </p>

            <h2>1. Data Collection</h2>
            <ul>
              <li>We collect basic account details (email, username, avatar).</li>
              <li>Session recordings may be stored for safety and review.</li>
              <li>We log platform activity for quality and support purposes.</li>
            </ul>

            <h2>2. Data Usage</h2>
            <ul>
              <li>We use your data to facilitate sessions, improve safety, and optimize performance.</li>
              <li>We do not sell or share your personal data with third parties for advertising.</li>
            </ul>

            <h2>3. Your Rights</h2>
            <ul>
              <li>You can request to view, correct, or delete your data at any time.</li>
              <li>You may opt out of marketing communications via your account settings.</li>
            </ul>

            <h2>Children’s Privacy (COPPA)</h2>
            <p>
              We are committed to protecting the privacy of children under 13 and complying with the Children’s Online Privacy Protection Act (COPPA). We obtain verifiable parental consent before collecting personal information from children under 13. Parents or guardians may review, delete, or refuse further collection of their child’s information at any time by contacting us.
            </p>

            <h2>Security</h2>
            <p>
              We implement reasonable security measures to protect personal information from unauthorized access or disclosure.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We encourage you to review it periodically.
            </p>

            <h2>Contact</h2>
            <p>
              For questions or requests related to privacy, contact us at yo@skillery.co.
            </p>

            <footer className="mt-16 text-sm text-white/80">
              © {new Date().getFullYear()} Skillery, LLC. All rights reserved.
            </footer>
          </div>
        </div>
      </BrandPageLayout>
    </BrandThemeProvider>
  );
}