import React from "react";
import { useParams } from "next/navigation";
import { brands } from "@/lib/brands";

export default function Head() {
  // Detect the brand
  const params = useParams() || {};
  const brand = (params as Record<string, string | string[]>).brand;
  const brandKey = Array.isArray(brand) ? brand[0].toLowerCase() : brand?.toLowerCase() || "gameon";
  const brandConfig = brands[brandKey] || brands.gameon;

  // Default image per brand
  const ogImage = brandConfig.socialImage || "https://skillery.co/images/skillery-social-preview.png";
  const title = `${brandConfig.name} – Play Better Together`;
  const description = brandConfig.description || "Join live coaching sessions and master your skills.";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="apple-touch-icon" href="/favicon.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512.png" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://skillery.co/${brandKey}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}