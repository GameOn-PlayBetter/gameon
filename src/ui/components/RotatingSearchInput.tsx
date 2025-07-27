"use client";

import React, { useEffect, useState } from "react";

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
  "Ask anything."
];

export default function RotatingSearchInput() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

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

  return (
    <div className="mt-6 w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full rounded-full bg-transparent text-white px-6 pr-28 py-3 text-base border border-white/30 focus:outline-none focus:shadow-[0_0_14px_#EE9E3A] transition"
          placeholder=""
        />
        {!isFocused && (
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
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-orange-500 text-white rounded-full text-sm font-semibold hover:bg-orange-600 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}