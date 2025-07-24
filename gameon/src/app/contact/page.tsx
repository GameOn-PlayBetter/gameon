"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { BoldFooter } from "@/ui/components/BoldFooter";

export default function ContactPage() {
  const email = "gameon_playbetter" + "@gmail.com";

  return (
    <DefaultPageLayout>
      <div className="w-full max-w-4xl px-6 py-12 text-white mx-auto">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

        <div className="space-y-6 text-lg">
          <p>
            Have questions, feedback, or need help? We’d love to hear from you.
          </p>

          <p>Reach out any time at {email}</p>

          <p>
            We typically respond within 24–48 hours. For urgent moderation or
            safety issues, please use the in-app report tools.
          </p>
        </div>
      </div>
      <BoldFooter />
    </DefaultPageLayout>
  );
}