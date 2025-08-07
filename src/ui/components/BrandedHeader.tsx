"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useBrandTheme } from "@/app/context/BrandThemeContext";
import { LoginModal } from "@/ui/components/LoginModal";

export default function BrandHeader() {
  const config = useBrandTheme();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (!config) return null;

  const currentBrand = config.name?.toLowerCase() || "";
  const headerColor =
    currentBrand === "skillery" ? "#0A0F18" : config.colors.primary;

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full border-b border-white/20 px-6 py-4 flex justify-between items-center z-50"
        style={{ backgroundColor: headerColor }}
      >
        {/* Left: Logo */}
        <Link
          href={currentBrand === "skillery" ? "/" : `/${currentBrand}`}
          className="flex items-center"
        >
          <Image
            src={config.logo}
            alt={`${config.name} Logo`}
            width={64}
            height={64}
            className="h-18 w-auto"
            style={{ display: "block" }}
          />
        </Link>

        {/* Right: Nav (hidden for Skillery) */}
        {currentBrand !== "skillery" && (
          <nav className="flex items-center gap-4 text-sm font-medium text-white">
            <Link href="https://skillery.co" className="hover:underline">
              ← Return to Skillery
            </Link>
            <Link href="#categories" className="hover:underline">
              Categories
            </Link>
            <Link href="#experts" className="hover:underline">
              Experts
            </Link>
            <button
              onClick={() => setShowLoginModal(true)}
              className="hover:underline focus:outline-none"
            >
              Login
            </button>

            {/* ✅ Apply to Coach opens Google Form in a new tab */}
            <a
              href={
                currentBrand === "gameon"
                  ? "https://docs.google.com/forms/d/1LddJuKRXpjIFPaVevI-nyurxjnD3iofQpap8pjC-tII/edit"
                  : currentBrand === "fixon"
                  ? "https://docs.google.com/forms/d/e/1FAIpQLSfUcvdybuE4rjzMYfcB8pQp676BxYhOZVWWJjx1cDTao7ZBIA/viewform?usp=dialog"
                  : currentBrand === "fiton"
                  ? "https://docs.google.com/forms/d/e/1FAIpQLSdvRLccUqutavNKZLAF7GF2jqfy0PRyJxppNz8hKfUX5dD8pw/viewform?usp=dialog"
                  : currentBrand === "jamon"
                  ? "https://docs.google.com/forms/d/e/1FAIpQLScm0_HE0ScDHm2OGFM3DE3i90AeI96gq-fl2p3tV2zkuMJvAw/viewform?usp=dialog"
                  : currentBrand === "codeon"
                  ? "https://docs.google.com/forms/d/e/1FAIpQLSeJCKV6nT2K39Y72PXNBkmx6A-12OEYfxu9EOKbYkCVQkul3A/viewform?usp=dialog"
                  : currentBrand === "learnon"
                  ? "https://docs.google.com/forms/d/e/1FAIpQLScSimd1XyMa8AWpaSo0qQAyzVwdUwe9EZgGUVcoSPT6o5byJA/viewform?usp=dialog"
                  : currentBrand === "growon"
                  ? "https://docs.google.com/forms/d/e/1FAIpQLSd5zh3KkUgWT5VqY0leGrdk4csBZ7IgTTy2Qr-y8RB_rFzDWw/viewform?usp=dialog"
                  : currentBrand === "cookon"
                  ? "https://docs.google.com/forms/d/e/1FAIpQLSfiahiIqw4e0fq2Ac0IRfTdJHpU7pw0o6Iik0956tdM80Fuiw/viewform?usp=dialog"
                  : currentBrand === "styleon"
                  ? "https://docs.google.com/forms/d/e/1FAIpQLSd0dUnJg-m34vIHALS-hAz3UUSTS80-2W3MQcBsFfZSmdGx7Q/viewform?usp=dialog"
                  : currentBrand === "moneyon"
                  ? "https://docs.google.com/forms/d/e/1FAIpQLSdyzHNv2g-DetGnikmWCqQJytU3XUnlyDF9vrvTTCAM6nLcrg/viewform?usp=dialog"
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 rounded-md transition"
              style={{
                backgroundColor: config.colors.button,
                color: "white",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = config.colors.buttonHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = config.colors.button)
              }
            >
              Apply to Coach
            </a>
          </nav>
        )}
      </header>

      {/* Modal mounts outside of header */}
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}