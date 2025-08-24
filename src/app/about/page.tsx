// src/app/about/page.tsx
import React from "react";
import DefaultPageLayout from "src/ui/layouts/DefaultPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Skillery",
  description: "Learn more about Skillery, our mission, and the people behind it.",
  alternates: {
    canonical: "https://skillery.co/about",
  },
};

export default function AboutPage() {
  return (
    <DefaultPageLayout>
      <main className="flex flex-col items-center px-6 py-16 max-w-3xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-6">About Skillery</h1>
        <p className="mb-6 text-lg leading-relaxed">
          <strong>Skillery</strong> is a multi-brand coaching and learning platform built to help
          people unlock their potential. We connect learners with experts through live,
          scheduled sessions across gaming, fitness, music, tutoring, home repair, and more.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Our Mission</h2>
        <p className="mb-6 text-lg leading-relaxed">
          Our mission is simple: <em>Unlock Your Potential.</em> Skillery empowers both learners
          and coaches by making high-quality, one-on-one guidance accessible, safe, and engaging.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Our Brands</h2>
        <ul className="list-disc list-inside mb-6 space-y-2 text-lg">
          <li><strong>GameOn</strong> — Gaming coaching and esports support</li>
          <li><strong>FixOn</strong> — Home, auto, and pool repair coaching</li>
          <li><strong>FitOn</strong> — Health and fitness coaching</li>
          <li><strong>JamOn</strong> — Live music lessons and mentoring</li>
          <li><strong>LearnOn</strong> — Tutoring and academic support</li>
          <li><strong>GrowOn</strong> — Gardening and outdoor coaching</li>
          <li><strong>CookOn</strong> — Cooking lessons and culinary skills</li>
          <li><strong>StyleOn</strong> — Fashion and personal styling guidance</li>
          <li><strong>MoneyOn</strong> — Personal finance coaching</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Our Founders</h2>
        <p className="mb-6 text-lg leading-relaxed">
          Skillery, LLC is co-founded and managed by <strong>Mandy K. Lopez</strong> (Managing Member) and
          <strong> Amy Dee Lopez</strong> (Member). Together, we combine decades of leadership in
          fintech, banking, operations, and international project support with a lifelong passion for gaming,
          learning, and community building.
        </p>


        {/* AboutPage schema */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              name: "About Skillery",
              url: "https://skillery.co/about",
              mainEntity: {
                "@type": "Organization",
                name: "Skillery",
                url: "https://skillery.co",
                sameAs: [
                  "https://bsky.app/profile/skillery.bsky.social",
                  "https://www.instagram.com/skillery.co/",
                  "https://discord.com/invite/FpydNne7",
                  "https://www.linkedin.com/company/skillery-co",
                ],
              },
            }),
          }}
        />
      </main>
    </DefaultPageLayout>
  );
}