import React from "react";
import FixonHeader from "@/ui/components/FixonHeader";
import { BoldFooter } from "@/ui/components/BoldFooter";
import Image from "next/image";

interface BrandPageLayoutProps {
  children: React.ReactNode;
  logo?: string;
  backgroundColor?: string;
}

export default function BrandPageLayout({
  children,
  logo,
  backgroundColor = "#0A0A0A",
}: BrandPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor }}>
      <FixonHeader />
      <main className="flex flex-col items-center flex-grow">
        {logo && (
          <div className="w-full flex justify-center">
            <Image
              src={logo}
              alt="Brand Logo"
              width={480}
              height={180}
              className="w-full max-w-[480px] h-auto px-6 mb-8"
            />
          </div>
        )}
        {children}
      </main>
<BoldFooter
  logoUrl="/images/fixon/fixonlogo_cropped.png"
  brandName="FixOn"
  company="Skillery, LLC"
  year={new Date().getFullYear()}
  legalLinks={[
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Safety", href: "/safety" },
  ]}
  disclaimer={`FixOn is a digital platform for live DIY repair help. All sessions are user-initiated.\nFixOn is not liable for property damage or injuries resulting from unsupervised repairs.`}
/>
    </div>
  );
}