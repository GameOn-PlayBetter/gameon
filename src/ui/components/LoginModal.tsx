"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useBrandTheme } from "@/app/context/BrandThemeContext";

export function LoginModal({
  open,
  onClose,
  onLoginSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onLoginSuccess?: (role: 'user' | 'coach') => void;
}) {
  const router = useRouter();
  const theme = useBrandTheme(); // ✅ Consistent with other components
  const colors = theme.colors || {
    primary: "#000000",
    button: "#FF00C8",
    buttonHover: "#00CFFF",
    text: "#FFFFFF",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [headingText, setHeadingText] = useState("Log in to Earn Tokens");
  const [selectedRole, setSelectedRole] = useState<'user' | 'coach'>('user');
  const [returnUrl, setReturnUrl] = useState<string>('');
  const modalRef = useRef<HTMLDivElement>(null);

 const brandHeadings: Record<string, string[]> = {
    gameon: [
      "Log in to Earn Tokens",
      "Ready to Unlock Rewards?",
      "Time to Level Up!",
      "Claim Your Bonus Tokens",
      "Power Up Your Session",
    ],
    fiton: [
      "Crush Your Fitness Goals",
      "Time to Train Smarter",
      "Unlock Your Personal Best",
      "Fuel Your Workout",
      "Your Next Rep Starts Here",
    ],
    skillery: [
      "Unlock Your Potential",
      "Your Next Skill Awaits",
      "Learn Something New Today",
      "Level Up Your Knowledge",
      "Master a Skill, Anytime",
    ],
    fixon: [
      "Fix It Like a Pro",
      "Your DIY Journey Starts Here",
      "Unlock Live Repair Help",
      "Ready to Tackle Your Next Fix?",
      "Hands-On Help, One Click Away",
    ],
    jamon: [
      "Tune In and Jam",
      "Your Next Lesson Awaits",
      "Make Music Happen",
      "Learn. Play. Vibe.",
      "Unlock Your Inner Musician",
    ],
codeon: [
  "Debug It Live",
  "Your Next Project Awaits",
  "Code Smarter, Not Harder",
  "Build. Fix. Deploy.",
  "Level Up Your Coding Skills",
],
learnon: [
  "Study Smarter, Not Harder",
  "Your Next Lesson Awaits",
  "Master Any Subject Live",
  "Unlock Academic Success",
  "Learn. Practice. Succeed.",
],
growon: [
  "Grow Your Green Thumb",
  "Your Garden Awaits",
  "Plant It. Grow It. Love It.",
  "From Seed to Success",
  "Make Your Garden Thrive",
],
cookon: [
  "Cook Like a Pro",
  "Your Next Recipe Awaits",
  "From Kitchen to Table",
  "Sizzle. Stir. Serve.",
  "Unlock Your Inner Chef",
],
styleon: [
  "Style Your Confidence",
  "Your Next Look Awaits",
  "From Closet to Catwalk",
  "Glam Up and Shine",
  "Unlock Your Inner Stylist",
],
moneyon: [
  "Master Your Money",
  "Your Financial Journey Starts Here",
  "Unlock Smart Spending",
  "Plan, Save, Succeed",
  "Take Control of Your Future",
],
  };

  const currentBrand = theme?.name?.toLowerCase?.() || "gameon";
  const headings = brandHeadings[currentBrand] || brandHeadings["gameon"];

  // Capture where to return the user after login
  useEffect(() => {
    if (!open) return;
    try {
      const url = new URL(window.location.href);
      const fromQuery = url.searchParams.get('next');
      const fallback = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      setReturnUrl(fromQuery || fallback || '/');
    } catch {
      setReturnUrl('/');
    }
  }, [open]);

  // Update heading randomly each time modal opens
  useEffect(() => {
    if (open) {
      const random = headings[Math.floor(Math.random() * headings.length)];
      setHeadingText(random);
    }
  }, [open, headings]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  const handleLogin = () => {
    const brandPath = theme?.name?.toLowerCase?.() || 'gameon';
    try {
      localStorage.setItem('sessionRole', selectedRole);
    } catch {}
    if (onLoginSuccess) {
      try { onLoginSuccess(selectedRole); } catch {}
    }
    onClose(); // Close modal
    if (selectedRole === 'coach') {
      router.push(`/${brandPath}/coach`);
    } else {
      // return user to the page they were on (or fallback to brand root)
      const safeReturn = returnUrl && typeof returnUrl === 'string' ? returnUrl : `/${brandPath}`;
      router.push(safeReturn);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
    >
      <div
        ref={modalRef}
        style={{ backgroundColor: colors.primary }}
        className="border border-[#333] rounded-xl p-6 w-full max-w-sm shadow-lg animate-fadeInUp"
      >
        <h2 className="text-2xl font-bold text-white mb-4 animate-glitchPulse">
          {headingText}
        </h2>
        {/* Role selector (minimal visual change) */}
        <div className="mb-3 flex w-full rounded border border-gray-600 overflow-hidden" role="tablist" aria-label="Login role selector">
          <button
            type="button"
            onClick={() => setSelectedRole('user')}
            className={`flex-1 px-3 py-2 text-sm ${selectedRole === 'user' ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white' : 'bg-black text-gray-300 hover:text-white'}`}
            aria-selected={selectedRole === 'user'}
          >
            Player
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('coach')}
            className={`flex-1 px-3 py-2 text-sm border-l border-gray-600 ${selectedRole === 'coach' ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white' : 'bg-black text-gray-300 hover:text-white'}`}
            aria-selected={selectedRole === 'coach'}
          >
            Coach
          </button>
        </div>
        <input
          className="w-full rounded px-4 py-2 border border-gray-500 bg-black text-white placeholder-gray-400"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded px-4 py-2 border border-gray-500 bg-black text-white mt-2 placeholder-gray-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full mt-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white py-2 px-4 rounded hover:brightness-110 transition"
        >
          Log In
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 text-sm text-gray-400 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default LoginModal;