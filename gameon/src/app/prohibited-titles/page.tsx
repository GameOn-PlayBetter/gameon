"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { BoldFooter } from "@/ui/components/BoldFooter";

export default function ProhibitedTitlesPage() {
  return (
    <DefaultPageLayout>
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 md:px-10 pt-24 pb-40 text-white">
        <h1 className="text-4xl font-bold mb-8">GameOn Prohibited Titles List</h1>
        <p className="mb-6 text-lg">
          To protect players, coaches, and the platform, the following games are prohibited from being coached, streamed, or used in any GameOn session. These titles may be banned due to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-lg mb-10">
          <li>Adult-only or sexually explicit content</li>
          <li>Extreme violence or glorified gore</li>
          <li>Platform Terms of Service violations</li>
          <li>Hate speech, discrimination, or harassment themes</li>
          <li>Inappropriate for minors or COPPA-ineligible titles</li>
          <li>Legal takedown risk or known DMCA violations</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">🚫 Banned Titles (Non-Exhaustive)</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg mb-10">
          <li>Second Life</li>
          <li>The Guy Game</li>
          <li>RapeLay</li>
          <li>HuniePop / HunieCam series</li>
          <li>Custom Maid 3D / Custom Order Maid</li>
          <li>Leisure Suit Larry: Wet Dreams Don’t Dry</li>
          <li>Agony</li>
          <li>BMX XXX</li>
          <li>House Party</li>
          <li>Manhunt 2</li>
          <li>Sakura series (e.g., Sakura Beach, Sakura Swim Club)</li>
          <li>Hatred</li>
          <li>Criminal Girls</li>
          <li>Any game rated AO (Adults Only) by the ESRB</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">⚠️ Games That May Be Rejected or Reviewed</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg mb-10">
          <li>Grand Theft Auto V (context-dependent)</li>
          <li>Rust</li>
          <li>Postal series</li>
          <li>VRChat</li>
          <li>VR Kanojo</li>
          <li>Yandere Simulator</li>
          <li>Cult of the Lamb</li>
          <li>Baldi’s Basics</li>
          <li>Any modded ROM or hacked version of a copyrighted title</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">📝 Appeals & Exceptions</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>Want to coach a game that’s not on this list but might raise red flags? Submit it for manual review by GameOn Admins.</li>
          <li>GameOn reserves the right to update this list at any time for safety, brand integrity, or legal compliance.</li>
        </ul>
      </div>
      <BoldFooter />
    </DefaultPageLayout>
  );
}