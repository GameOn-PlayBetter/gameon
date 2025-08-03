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
        <Link href={`/brand/${currentBrand}`} className="flex items-center">
          <Image
            src={config.logo}
            alt={`${config.name} Logo`}
            width={48}
            height={48}
            className="h-auto w-12"
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
            <Link
              href="/apply"
              className="ml-2 px-4 py-2 rounded-md transition"
              style={{
                backgroundColor: config.colors.button,
                color: "white",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  config.colors.buttonHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = config.colors.button)
              }
            >
              Become an Expert
            </Link>
          </nav>
        )}
      </header>

      {/* Modal mounts outside of header */}
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}