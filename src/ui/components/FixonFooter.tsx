// src/ui/components/FixonFooter.tsx
import React from "react";

export default function FixonFooter() {
  return (
    <footer className="bg-[#0A0A0A] text-white px-6 pt-12 pb-8 text-sm mt-20 border-t border-[#222]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left: FixOn Summary */}
        <div>
          <h4 className="text-lg font-semibold mb-3">FixOn</h4>
          <p className="opacity-70 leading-relaxed">
            Real-time help with home, auto, and everything in between. Confidence built live.
          </p>
        </div>

        {/* Center: Legal Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Legal</h4>
          <ul className="space-y-1">
            <li><a href="/coach-requirements" className="hover:text-orange-400">Coach Requirements</a></li>
            <li><a href="/privacy" className="hover:text-orange-400">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-orange-400">Terms of Service</a></li>
            <li><a href="/cookie-policy" className="hover:text-orange-400">Cookie Policy</a></li>
            <li><a href="/prohibited" className="hover:text-orange-400">Prohibited Titles</a></li>
            <li><a href="/contact" className="hover:text-orange-400">Contact</a></li>
          </ul>
        </div>

        {/* Right: Empty / Optional Placeholder */}
        <div />
      </div>

      <div className="mt-10 text-center opacity-50">
        © {new Date().getFullYear()} Skillery LLC. All rights reserved.
      </div>
    </footer>
  );
}