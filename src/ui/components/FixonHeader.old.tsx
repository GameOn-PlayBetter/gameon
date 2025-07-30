import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function FixonHeader() {
  return (
    <header className="w-full bg-[#0A0A0A] border-b border-[#222] px-6 py-4 flex justify-between items-center z-50">
      {/* Left: Logo */}
      <Link href="/fixon" className="flex items-center">
<Image
  src="/images/fixon/fixonlogo_cropped.png"
  alt="FixOn Logo"
  width={48}
  height={48}
  className="h-auto w-12"
/>
      </Link>

      {/* Right: Navigation */}
      <nav className="flex items-center gap-4 text-sm font-medium text-white">
        <Link href="https://skillery.co" className="hover:text-orange-400 transition">
          ← Return to Skillery
        </Link>
        <Link href="#categories" className="hover:text-orange-400 transition">
          Categories
        </Link>
        <Link href="#experts" className="hover:text-orange-400 transition">
          Experts
        </Link>
        <Link href="/login" className="hover:text-orange-400 transition">
          Login
        </Link>
        <Link
          href="/apply"
          className="ml-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition"
        >
          Become an Expert
        </Link>
      </nav>
    </header>
  );
}