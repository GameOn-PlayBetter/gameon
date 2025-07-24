'use client';

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { BoldFooter } from "@/ui/components/BoldFooter";

export default function LegalPage() {
  return (
    <DefaultPageLayout>
      <div className="w-full max-w-4xl mx-auto px-6 py-12 text-white">
        <h1 className="text-4xl font-bold mb-8">Legal</h1>

        <div className="space-y-6 text-lg">
          <p>This is placeholder legal content.</p>
        </div>
      </div>
      <BoldFooter />
    </DefaultPageLayout>
  );
}