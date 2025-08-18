"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useBrandTheme } from "@/app/context/BrandThemeContext";
import { LoginModal } from "@/ui/components/LoginModal";
import { useRouter, usePathname } from "next/navigation";
import { Avatar } from "@/ui/components/Avatar";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import { createClient } from "@/utils/supabase/client";
import { FeatherUser, FeatherSettings, FeatherLogOut } from "@subframe/core";
import { brands, getBrandConfig } from "@/lib/brands";

export default function BrandHeader({ currentBrand }: { currentBrand?: string }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [sessionRole, setSessionRole] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const [queryBrand, setQueryBrand] = useState<string | null>(null);
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const b = sp.get("brand");
      setQueryBrand(b ? b.toLowerCase().trim() : null);
    } catch {
      setQueryBrand(null);
    }
  }, []);

  const pathname = usePathname() || "";
  const segments = pathname.split("/").filter(Boolean);
  const isLoginRoute = segments[0]?.toLowerCase() === "login";
  const theme = useBrandTheme();
  // Prefer prop, then /[brand]/... or /brands/[brand]/..., else theme name
  const urlBrand =
    segments[0]?.toLowerCase() === "brands"
      ? segments[1]?.toLowerCase()
      : segments[0]?.toLowerCase();

  let brandSlug =
    (queryBrand && queryBrand.trim()) ||
    (currentBrand?.toLowerCase() || "").trim() ||
    (urlBrand || "").trim() ||
    (theme?.name?.toLowerCase() || "").trim() ||
    "skillery";

  // Resolve a reliable brand config
  const resolvedConfig = getBrandConfig?.(brandSlug) || brands[brandSlug as keyof typeof brands];
  const config = resolvedConfig || theme;

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-brand", brandSlug);
    } catch {}
  }, [brandSlug]);

  useEffect(() => {
    let role: string | null = null;
    try {
      const r = localStorage.getItem("sessionRole");
      role = r === "user" || r === "coach" ? r : null;
    } catch {}
    setSessionRole(role);
  }, []);

  useEffect(() => {
    if (!showLoginModal) {
      try {
        const r = localStorage.getItem("sessionRole");
        const role = r === "user" || r === "coach" ? r : null;
        if (role !== sessionRole) setSessionRole(role);
      } catch {
        if (sessionRole !== null) setSessionRole(null);
      }
    }
  }, [showLoginModal, sessionRole]);

  const handleLogout = () => {
    // Open confirmation modal instead of logging out immediately
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch {}
    try {
      localStorage.removeItem("sessionRole");
      localStorage.clear();
      if (typeof sessionStorage !== "undefined") sessionStorage.clear();
    } catch {}
    setSessionRole(null);
    setShowLogoutConfirm(false);
    router.refresh();
    router.push(brandSlug === "skillery" ? "/" : `/${brandSlug}`);
  };

  if (!config) return null;

  const tokens  = (config as any)?.tokens || {};
  const palette = (config as any)?.colors || {};
  const headerColor =
    brandSlug === "skillery"
      ? "#0A0F18"
      : (tokens.headerBackground ??
         tokens.pageBackground ??
         (palette as any).headerBackground ??
         (palette as any).pageBackground ??
         (palette as any).primary ??
         "#000000");

  // Brand-aware modal colors (prefer tokens, then colors)
  const cardBg       = (tokens.pageBackground ?? (palette as any)?.cardBackground ?? (palette as any)?.pageBackground ?? "#0A0F18");
  const cardText     = ((palette as any)?.text ?? "#ffffff");
  const cardBorder   = ((palette as any)?.border ?? "rgba(255,255,255,0.12)");
  const btnPrimary   = ((palette as any)?.button ?? (palette as any)?.primary ?? "#2563EB");
  const btnPrimaryHv = ((palette as any)?.buttonHover ?? btnPrimary);
  const btnSubtle    = "rgba(255,255,255,0.10)";
  const btnSubtleHv  = "rgba(255,255,255,0.16)";

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full border-b border-white/20 px-6 py-2 flex justify-between items-center z-50"
        style={{ backgroundColor: headerColor }}
      >
        {/* Left: Logo */}
        <Link
          href={brandSlug === "skillery" ? "/" : `/${brandSlug}`}
          className="flex items-center"
        >
          <Image
            key={brandSlug}
            src={
              (config as any)?.headerLogo ||
              (config as any)?.navLogo ||
              (config as any)?.logo ||
              "/default-logo.png"
            }
            alt={`${config.name} Logo`}
            width={56}
            height={56}
            className="h-14 w-auto"
            style={{ display: "block" }}
          />
        </Link>

        {/* Right: Nav (hidden for Skillery) */}
        {brandSlug !== "skillery" && (
          <nav className="flex items-center gap-4 text-sm font-medium text-white">
            <Link href="https://skillery.co" className="hover:underline">
              ← Return to Skillery
            </Link>
            <Link href={`/${brandSlug}/refer-friends`} className="hover:underline">
              Refer Friends
            </Link>
            <Link href={`/${brandSlug}/coach-search`} className="hover:underline">
              Experts
            </Link>
            {sessionRole ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="focus:outline-none">
                    <Avatar image="/default-avatar.png">
                      {sessionRole.charAt(0).toUpperCase()}
                    </Avatar>
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    side="bottom"
                    align="end"
                    className="bg-black/90 text-white border border-white/10 rounded-md shadow-lg py-1 z-[80] text-sm"
                    style={{
                      fontFamily: "inherit",
                      backgroundColor: "rgba(0,0,0,0.9)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.1)"
                    }}
                  >
                    <DropdownMenu.DropdownItem
                      onSelect={() => {
                        const target =
                          sessionRole === "user"
                            ? `/${brandSlug}/player-profile`
                            : `/${brandSlug}/coach`;
                        router.push(target);
                      }}
                      icon={<FeatherUser className="w-4 h-4" />}
                      className="flex items-center gap-2 px-4 py-2 text-white data-[highlighted]:bg-white/10 cursor-pointer w-full leading-6 outline-none focus:outline-none"
                    >
                      <span>Profile</span>
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem
                      icon={<FeatherSettings className="w-4 h-4" />}
                      className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer w-full leading-6 outline-none focus:outline-none"
                    >
                      <span>Settings</span>
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem
                      onSelect={() => setShowLogoutConfirm(true)}
                      icon={<FeatherLogOut className="w-4 h-4" />}
                      className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer w-full leading-6 outline-none focus:outline-none"
                    >
                      <span>Logout</span>
                    </DropdownMenu.DropdownItem>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            ) : (
              isLoginRoute ? (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="hover:underline focus:outline-none"
                >
                  Login
                </button>
              ) : null
            )}

            {/* Student Waitlist (replaces Sign Up during prelaunch) */}
            {(config as any)?.forms?.waitlistUrl && (
              <a
                href={(config as any).forms.waitlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-4 py-2 rounded-md transition"
                style={{ backgroundColor: btnPrimary, color: "white" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = btnPrimaryHv)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = btnPrimary)}
              >
                Student Waitlist
              </a>
            )}
            <a
              href={
                brandSlug === "gameon"
                  ? "https://docs.google.com/forms/d/1LddJuKRXpjIFPaVevI-nyurxjnD3iofQpap8pjC-tII/edit"
                  : brandSlug === "fixon"
                  ? "https://docs.google.com/forms/d/e/1FAIpQLSfUcvdybuE4rjzMYfcB8pQp676BxYhOZVWWJjx1cDTao7ZBIA/viewform?usp=dialog"
                  : brandSlug === "fiton"
                  ? "https://docs.google.com/forms/d/e/1FAIpQLSdvRLccUqutavNKZLAF7GF2jqfy0PRyJxppNz8hKfUX5dD8pw/viewform?usp=dialog"
                  : brandSlug === "jamon"
                  ? "https://docs.google.com/forms/d/e/1FAIpQLScm0_HE0ScDHm2OGFM3DE3i90AeI96gq-fl2p3tV2zkuMJvAw/viewform?usp=dialog"
                  : brandSlug === "codeon"
                  ? "https://docs.google.com/forms/d/e/1FAIpQLSeJCKV6nT2K39Y72PXNBkmx6A-12OEYfxu9EOKbYkCVQkul3A/viewform?usp=dialog"
                  : brandSlug === "learnon"
                  ? "https://docs.google.com/forms/d/e/1FAIpQLScSimd1XyMa8AWpaSo0qQAyzVwdUwe9EZgGUVcoSPT6o5byJA/viewform?usp=dialog"
                  : brandSlug === "growon"
                  ? "https://docs.google.com/forms/d/e/1FAIpQLSd5zh3KkUgWT5VqY0leGrdk4csBZ7IgTTy2Qr-y8RB_rFzDWw/viewform?usp=dialog"
                  : brandSlug === "cookon"
                  ? "https://docs.google.com/forms/d/e/1FAIpQLSfiahiIqw4e0fq2Ac0IRfTdJHpU7pw0o6Iik0956tdM80Fuiw/viewform?usp=dialog"
                  : brandSlug === "styleon"
                  ? "https://docs.google.com/forms/d/e/1FAIpQLSd0dUnJg-m34vIHALS-hAz3UUSTS80-2W3MQcBsFfZSmdGx7Q/viewform?usp=dialog"
                  : brandSlug === "moneyon"
                  ? "https://docs.google.com/forms/d/e/1FAIpQLSdyzHNv2g-DetGnikmWCqQJytU3XUnlyDF9vrvTTCAM6nLcrg/viewform?usp=dialog"
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 rounded-md transition"
              style={{
                backgroundColor: btnPrimary,
                color: "white",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = btnPrimaryHv)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = btnPrimary)}
            >
              Apply to Coach
            </a>
          </nav>
        )}
      </header>

      {/* Modal mounts outside of header */}
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={(role) => {
          // persist role so brand pages can trust the header login
          try {
            localStorage.setItem("sessionRole", role);
          } catch {}

          setSessionRole(role);
          setShowLoginModal(false);

          // brand-aware post-login redirect
          const dest =
            role === "coach"
              ? `/${brandSlug}/coach`
              : role === "user"
              ? `/${brandSlug}/player-profile`
              : `/${brandSlug}`;
          router.push(dest);
          router.refresh();
        }}
      />
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <div
            className="rounded-lg shadow-xl p-6 w-[90%] max-w-sm border"
            style={{ backgroundColor: cardBg, color: cardText, borderColor: cardBorder }}
          >
            <h3 className="text-lg font-semibold mb-2">Log out?</h3>
            <p className="text-sm opacity-80 mb-4">
              You'll be signed out and sent to the {config.name} home page.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-3 py-2 rounded-md border transition"
                style={{ borderColor: cardBorder, backgroundColor: btnSubtle, color: cardText }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = btnSubtleHv)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = btnSubtle)}
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-3 py-2 rounded-md text-white transition"
                style={{ backgroundColor: btnPrimary }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = btnPrimaryHv)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = btnPrimary)}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}