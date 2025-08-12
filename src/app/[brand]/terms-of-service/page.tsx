"use client";

import React from "react";
import DefaultPageLayout from "@/ui/layouts/DefaultPageLayout";
import { brands } from "@/lib/brands";
import { useParams } from "next/navigation";

export default function CoachTermsOfUsePage() {
  const params = useParams<{ brand?: string }>() ?? {};
  const brandRaw = (params as { brand?: string | string[] }).brand;
  const brandKey = (
    Array.isArray(brandRaw) ? brandRaw[0] : brandRaw || "gameon"
  ).toLowerCase() as keyof typeof brands;
  const brandConfig = brands[brandKey] || brands.gameon;

  const brandName = (brandConfig.companyName || (brandConfig as any).name || brandKey).toString();

  const colors = (brandConfig.colors as any) || {};
  const backgroundColor =
    colors.pageBackground || colors.background || colors.primary || "#000000";

  return (
    <DefaultPageLayout style={{ backgroundColor }}>
      <div className="w-full max-w-4xl mx-auto px-6 pt-24 pb-12 text-white">
        <h1 className="text-3xl font-bold mb-6">{brandName} Terms of Use</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <ul className="list-disc pl-6 space-y-1 text-lg">
            <li>By accessing or using the {brandName} platform, you agree to comply with these Terms of Use.</li>
            <li>If you do not agree, you may not use the platform.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
          <ul className="list-disc pl-6 space-y-1 text-lg">
            <li>Users must be at least 13 years of age to create an account.</li>
            <li>Coaches must be at least 18 years old and complete identity verification.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Use of the Platform</h2>
          <ul className="list-disc pl-6 space-y-1 text-lg">
            <li>You may not use {brandName} for any unlawful or prohibited purpose.</li>
            <li>Respect all community guidelines, session rules, and platform restrictions.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Payment and Token System</h2>
          <ul className="list-disc pl-6 space-y-1 text-lg">
            <li>{brandName} sessions are booked using tokens purchased through the platform.</li>
            <li>Tips go 100% to the coach. {brandName} retains 100% of revenue from token sales, subscriptions, and badge unlocks.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Session Conduct and Safety</h2>
          <ul className="list-disc pl-6 space-y-1 text-lg">
            <li>All sessions are recorded and must follow {brandName}’s Code of Conduct.</li>
            <li>Do not attempt to bypass platform moderation or safety systems.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Intellectual Property</h2>
          <ul className="list-disc pl-6 space-y-1 text-lg">
            <li>All platform content, branding, and design elements are owned by {brandName}.</li>
            <li>Do not reproduce or reuse content without permission.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
          <ul className="list-disc pl-6 space-y-1 text-lg">
            <li>{brandName} may suspend or terminate your access at any time for policy violations.</li>
            <li>You may delete your account at any time from your settings page.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
          <ul className="list-disc pl-6 space-y-1 text-lg">
            <li>{brandName} reserves the right to modify these Terms at any time.</li>
            <li>Material changes will be communicated through platform notifications.</li>
          </ul>
        </section>
      </div>
    </DefaultPageLayout>
  );
}