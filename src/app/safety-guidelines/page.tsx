/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import BrandPageLayout from "@/ui/layouts/BrandPageLayout";
import { BrandThemeProvider } from "@/app/context/BrandThemeContext";

const email = "yo@skillery.co";

export default function SafetyGuidelinesPage() {
  return (
    <BrandThemeProvider brandName="skillery">
      {/* Force Skillery navy across this page */}
      <style jsx global>{`
        html, body, main { background-color: #0A0F18 !important; }
      `}</style>

      <BrandPageLayout brandName="skillery">
        <div
          style={{
            backgroundColor: "#0A0F18",
            color: "white",
            minHeight: "100vh",
            padding: "2rem",
          }}
        >
          <div className="max-w-4xl mx-auto prose prose-invert">
            <h1 className="text-3xl font-bold mb-6">Skillery Community Safety Guidelines</h1>

            <section className="mt-8">
              <h2 className="text-xl font-bold">1. Acceptance of Terms</h2>
              <p className="mt-2">
                By accessing or using the Skillery platform, you agree to comply with and be bound by these Community Safety Guidelines. If you do not agree, please do not use Skillery.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-bold">2. Respect and Inclusion</h2>
              <p className="mt-2">
                All users must treat others with respect, regardless of identity, skill level, or background. Harassment, hate speech, and discrimination are strictly prohibited.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-bold">3. Safe Communication</h2>
              <p className="mt-2">
                Do not share or request personal contact details (phone, address, etc.). Use platform tools to report abuse or unsafe behavior immediately.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-bold">4. Coach Responsibilities</h2>
              <p className="mt-2">
                Coaches must follow the Code of Conduct, including webcam use and session professionalism. Coaches may not offer services outside of Skillery or solicit off-platform payments.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-bold">5. Player Responsibilities</h2>
              <p className="mt-2">
                Players must show respect during sessions and follow the coach’s instructions. No trolling, baiting, or inappropriate behavior in sessions or chat.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-bold">6. Reporting and Enforcement</h2>
              <p className="mt-2">
                Violations may result in warnings, suspensions, or permanent bans. Reports are reviewed by Admins. Repeated abuse leads to escalating penalties.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-bold">7. Appeals</h2>
              <p className="mt-2">Suspended users may appeal by emailing {email}.</p>
            </section>
          </div>
        </div>
      </BrandPageLayout>
    </BrandThemeProvider>
  );
}