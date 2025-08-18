// src/app/login/layout.tsx
import React from "react";
import BrandedHeader from "@/ui/components/BrandedHeader";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Correct, branded header for login pages */}
      <BrandedHeader />
      <main className="min-h-screen bg-black flex items-center justify-center px-6 py-10">
        {children}
      </main>
    </>
  );
}