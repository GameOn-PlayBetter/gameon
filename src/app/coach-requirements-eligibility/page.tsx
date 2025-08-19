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
        html, body, main { background-color: #0F1E30 !important; }
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
            <h1 className="text-4xl font-bold mb-6">Coach Requirements & Eligibility</h1>
            <ul className="list-disc pl-6 space-y-4 text-lg">
              <li>Webcam required for safety and transparency.</li>
              <li>Upload a valid government-issued ID.</li>
              <li>Intro required: either a pre-recorded video or a live trial session.</li>
              <li>All sessions are recorded and reviewed if needed.</li>
              <li>Auto-approval at launch, but every submission is logged for later review.</li>
            </ul>
          </div>
        </div>
      </BrandPageLayout>
    </BrandThemeProvider>
  );
}