"use client";

import React from "react";
import { brands } from "@/lib/brands";
import { useParams, notFound } from "next/navigation";

interface LegalPageWrapperProps {
  children: React.ReactNode;
}

export default function LegalPageWrapper({ children }: LegalPageWrapperProps) {
  const params = useParams() || {};
  const brand = (params as Record<string, string | string[]>).brand;
  const brandKey = Array.isArray(brand)
    ? brand[0].toLowerCase()
    : brand?.toLowerCase() || "gameon";

  const brandConfig = brands[brandKey as keyof typeof brands];
  if (!brandConfig) return notFound();

const backgroundColor =
  (brandConfig as any)?.tokens?.pageBackground ||
  (brandConfig as any)?.tokens?.headerBackground ||
  (brandConfig.colors as any)?.pageBackground ||
  (brandConfig.colors as any)?.primary ||
  "#000000";

  return (
    <div
      className="w-full min-h-screen flex flex-col"
      style={{
        backgroundColor: backgroundColor,
        color: "#FFFFFF",
      }}
    >
      {children}
    </div>
  );
}