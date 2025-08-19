/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import BrandPageLayout from "@/ui/layouts/BrandPageLayout";
import { BrandThemeProvider } from "@/app/context/BrandThemeContext";

export default function CoachRequirementsEligibilityPage() {
  return (
    <BrandThemeProvider brandName="skillery">
      {/* Force Skillery navy across this page, no white bands */}
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
            <h1 className="text-4xl font-bold mb-6">Coach Requirements & Eligibility</h1>
            <ul className="list-disc pl-6 space-y-4 text-lg">
              <li>A <strong>webcam is required</strong> for all sessions to ensure safety, transparency, and quality.</li>
              <li>Coaches must <strong>upload a valid government-issued ID</strong> for verification.</li>
              <li>A <strong>coach introduction</strong> is required, either through a pre-recorded video or a scheduled live trial session.</li>
              <li><strong>All sessions will be recorded</strong> and may be reviewed for quality, safety, and compliance.</li>
              <li>Coaches <strong>may be auto-approved at launch</strong>, but all submissions are logged and subject to later review.</li>
              <li>Coaches must be <strong>at least 18 years old</strong> (or meet the legal age requirement in their region).</li>
              <li>Coaches must <strong>demonstrate expertise</strong> in their subject area; certain categories may require certifications.</li>
              <li>Coaches must agree to <strong>Skillery’s Code of Conduct</strong> and maintain professionalism in all interactions.</li>
              <li>Coaches must <strong>keep availability accurate</strong> and honor scheduled sessions.</li>
            </ul>
          </div>
        </div>
      </BrandPageLayout>
    </BrandThemeProvider>
  );
}