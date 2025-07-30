"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { brands } from "@/lib/brands";
import { LoginModal } from "@/ui/components/LoginModal"; // ✅ Make sure this is a named import

export default function BrandHeader() {
  const { brand } = useParams();
  const config = brands[brand as keyof typeof brands];
console.log("config", config);
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (!config) return null;

  return (
    <>
      <header
        className="w-full border-b border-white/20 px-6 py-4 flex justify-between items-center z-50"
        style={{ backgroundColor: config.colors.primary }}
      >
        {/* Left: Logo */}
        <Link href={`/brand/${brand}`} className="flex items-center">
          <Image
            src={config.logo}
            alt={`${config.name} Logo`}
            width={48}
            height={48}
            className="h-auto w-12"
          />
        </Link>

        {/* Right: Nav */}
        <nav className="flex items-center gap-4 text-sm font-medium text-white">
          <Link href="https://skillery.co" className="hover:underline">
            ← Return to Skillery
          </Link>
          <Link href="#categories" className="hover:underline">Categories</Link>
          <Link href="#experts" className="hover:underline">Experts</Link>
          <button
            onClick={() => setShowLoginModal(true)}
            className="hover:underline focus:outline-none"
          >
            Login
          </button>
          <Link
            href="/apply"
            className={`ml-2 px-4 py-2 rounded-md transition`}
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
            Become an Expert
          </Link>
        </nav>
      </header>

      {/* Modal mounts outside of header */}
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}