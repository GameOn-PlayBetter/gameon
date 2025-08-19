"use client";

import React from "react";
import BrandPageLayout from "@/ui/layouts/BrandPageLayout";
import { BrandThemeProvider } from "@/app/context/BrandThemeContext";

export default function ContactPage() {
  return (
    <BrandThemeProvider brandName="skillery">
      {/* Force Skillery navy across this page */}
      <style jsx global>{`
        html, body, main { background-color: #0F1E30 !important; }
      `}</style>
      <BrandPageLayout brandName="skillery">
        <div className="w-full min-h-screen" style={{ backgroundColor: "#0F1E30", color: "white" }}>
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-3xl font-bold mb-6">Contact</h1>
            <p className="mb-6">
              We’d love to hear from you. For questions or support related to Skillery and all brands under the Skillery umbrella, reach us here:
            </p>

            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">General Inquiries</h2>
                <p className="mt-1">yo@skillery.co</p>
              </div>
            </div>

            <div className="mt-12 text-sm text-white/80">
            </div>
          </div>
        </div>
      </BrandPageLayout>
    </BrandThemeProvider>
  );
}