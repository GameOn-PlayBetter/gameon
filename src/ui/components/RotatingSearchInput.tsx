"use client";

import React, { useEffect, useState } from "react";
import { useBrandTheme } from "@/app/context/BrandThemeContext";

const phrases = [
  "Game. Fix. Jam. Learn.",
  "From game help to garden hacks...",
  "Start mastering something...",
  "Level up. Fix it. Learn it. Style it.",
  "Search expert help across all topics...",
  "Speedruns, syntax, or recipes?",
  "Master it.",
  "Study smarter.",
  "Crack the code.",
  "Jam like a pro.",
  "Boss that bug.",
  "Cook it. Style it. Fix it.",
  "Garden goals?",
  "Real help, fast.",
  "Search real skills.",
  "Ask anything.",
];

// Example search pages
const searchPages = [
  { name: "GameOn", description: "Gaming coaching and help", path: "/brand/gameon" },
  { name: "FixOn", description: "Live help for home, auto & pool", path: "/brand/fixon" },
  { name: "Skillery", description: "Master new skills across topics", path: "/" },
];

export default function RotatingSearchInput() {
  const { colors } = useBrandTheme();
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isFocused) return;

    const fadeOut = setTimeout(() => setFade(false), 7000);
    const changePhrase = setTimeout(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
      setFade(true);
    }, 9000);

    return () => {
      clearTimeout(fadeOut);
      clearTimeout(changePhrase);
    };
  }, [index, isFocused]);

  // Filtered dropdown suggestions
  const filteredPages = searchPages.filter((page) =>
    page.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mt-6 w-full max-w-md mx-auto relative">
      {/* Input with orange glow */}
      <div
        className="relative w-full rounded-full transition-all duration-300"
style={{
  boxShadow: isFocused
    ? `0 0 14px ${colors.glow}, 0 0 28px rgba(0,207,255,0.4)`
    : `0 0 8px rgba(255,0,200,0.2), 0 0 16px rgba(0,207,255,0.2)`,
  border: isFocused
    ? `1px solid ${colors.glow}`
    : "1px solid rgba(255, 255, 255, 0.3)",
  transition: "box-shadow 0.3s ease, border-color 0.3s ease",
}}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setShowDropdown(true);
          }}
          onBlur={() => {
            setIsFocused(false);
            setTimeout(() => setShowDropdown(false), 150);
          }}
          className="w-full rounded-full bg-transparent text-white px-6 pr-28 py-3 text-base outline-none border-none transition"
          placeholder=" "
        />
        {!isFocused && !query && (
          <span
            className={`absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-opacity duration-1000 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            {phrases[index]}
          </span>
        )}
        <button
          type="button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-sm font-semibold text-white"
          style={{
            backgroundColor: isHovered ? colors.buttonHover : colors.button,
            border: `1px solid ${isHovered ? colors.buttonHover : colors.button}`,
            transition: "background-color 0.3s ease, border-color 0.3s ease",
          }}
        >
          Search
        </button>
      </div>

      {/* Dropdown with pink/blue neon glow */}
      {showDropdown && (
        <div
          className="absolute w-full mt-2 rounded-xl overflow-hidden z-50 transition-shadow"
          style={{
            backgroundColor: "rgba(10, 10, 10, 0.95)",
            boxShadow:
              "0 0 12px rgba(255,0,200,0.6), 0 0 24px rgba(0,207,255,0.4)",
            border: "1px solid rgba(255,0,200,0.7)",
          }}
        >
          {filteredPages.length > 0 ? (
            filteredPages.map((page) => (
              <a
                key={page.path}
                href={page.path}
                className="block px-4 py-2 text-white hover:bg-[rgba(255,0,200,0.1)] transition-colors"
              >
                <div className="font-semibold">{page.name}</div>
                <div className="text-xs text-gray-400">{page.description}</div>
              </a>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-400">No matches found</div>
          )}
        </div>
      )}
    </div>
  );
}