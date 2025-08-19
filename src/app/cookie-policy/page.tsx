"use client";

import React from "react";
import BrandPageLayout from "@/ui/layouts/BrandPageLayout";
import { BrandThemeProvider } from "@/app/context/BrandThemeContext";

export default function CookiePolicyPage() {
  return (
    <BrandThemeProvider brandName="skillery">
      {/* Force the entire page (and any legal header area) to Skillery navy */}
      <style jsx global>{`
        html, body, main { background-color: #0F1E30 !important; }
        .brand-header, header, [data-legal-header] { background-color: #0F1E30 !important; }
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
            <h1>Cookie Policy</h1>
            <p>
              Skillery LLC uses cookies and similar technologies to enhance your experience,
              analyze usage, and provide personalized content.
            </p>

            <h2 className="mt-8">What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device by your browser. They help websites
              remember your preferences and activity.
            </p>

            <h2 className="mt-8">How We Use Cookies</h2>
            <ul>
              <li>To remember your login session</li>
              <li>To analyze platform usage and improve performance</li>
              <li>To customize your experience with Skillery</li>
            </ul>

            <h2 className="mt-8">Managing Cookies</h2>
            <p>
              You can adjust your browser settings to refuse cookies or alert you when cookies are being used.
              Disabling cookies may affect platform functionality.
            </p>

            <h2 className="mt-8">Updates</h2>
            <p>
              We may update this Cookie Policy. Changes will be posted on this page with an updated revision date.
            </p>

            <h2>Contact</h2>
            <p>Questions? Contact us at yo@skillery.co</p>

            <footer className="mt-16 text-sm text-white/80">
              © {new Date().getFullYear()} Skillery, LLC. All rights reserved.
            </footer>
          </div>
        </div>
      </BrandPageLayout>
    </BrandThemeProvider>
  );
}