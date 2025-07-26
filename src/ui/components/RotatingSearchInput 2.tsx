"use client";

import React, { useEffect, useState } from "react";

const phrases = [
  "Game. Fix. Jam. Learn.",
  "From game guides to garden hacks...",
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

function getNextIndex(currentIndex: number, length: number): number {
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * length);
  } while (nextIndex === currentIndex);
  return nextIndex;
}

export default function RotatingSearchInput() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(
    Math.floor(Math.random() * phrases.length)
  );
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    let typingDelay = 75;
    let deletingDelay = 50;
    let pauseAfterTyping = 2500;
    let pauseAfterDeleting = 1000;

    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex <= currentPhrase.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, charIndex));
        setCharIndex((prev) => prev + 1);
      }, typingDelay);
    } else if (!isDeleting && charIndex > currentPhrase.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
        setCharIndex((prev) => prev - 1);
      }, pauseAfterTyping);
    } else if (isDeleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, charIndex));
        setCharIndex((prev) => prev - 1);
      }, deletingDelay);
    } else if (isDeleting && charIndex < 0) {
      timeout = setTimeout(() => {
        const nextIndex = getNextIndex(currentPhraseIndex, phrases.length);
        setCurrentPhraseIndex(nextIndex);
        setIsDeleting(false);
        setCharIndex(0);
      }, pauseAfterDeleting);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentPhraseIndex]);

  return (
    <div className="mt-6 w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={displayText}
          placeholder=""
          readOnly
          className="w-full rounded-full bg-[#0F172A] text-gray-400 placeholder-gray-400 px-6 py-3 text-base border-none shadow-none focus:outline-none focus:shadow-[0_0_14px_#EE9E3A] transition"
        />
        <span className="absolute right-14 top-1/2 -translate-y-1/2 text-orange-400 animate-pulse text-lg">
          |
        </span>
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-orange-500 text-gray-400 rounded-full text-sm font-semibold hover:bg-orange-600 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}