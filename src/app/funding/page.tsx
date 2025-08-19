"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBrandConfig, brands } from "@/lib/brands";
import { FeatherInstagram, FeatherLinkedin } from "@subframe/core";
import { siBluesky, siDiscord } from "simple-icons/icons";

const neonPulse = `
@keyframes neonPulse {
  0%, 100% {
    filter: drop-shadow(0 0 4px rgba(255,0,200,0.9)) drop-shadow(0 0 8px rgba(0,207,255,0.8)) drop-shadow(0 0 15px rgba(255,0,200,0.7));
  }
  50% {
    filter: drop-shadow(0 0 6px rgba(0,207,255,0.9)) drop-shadow(0 0 12px rgba(255,0,200,0.8)) drop-shadow(0 0 20px rgba(0,207,255,0.7));
  }
}
`;

export default function FundingPage() {
  const IconBlueSky: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className="w-[18px] h-[18px]" {...props}>
      <path d={siBluesky.path} />
    </svg>
  );
  const IconDiscord: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className="w-[20px] h-[20px]" {...props}>
      <path d={siDiscord.path} />
    </svg>
  );
  const IconMap: Record<string, React.ElementType> = {
    linkedin: FeatherLinkedin,
    instagram: FeatherInstagram,
    bluesky: IconBlueSky,
    discord: IconDiscord,
  };

  const skillery = getBrandConfig("skillery");
  const {
    name,
    tagline,
    logo,
    colors,
  } = skillery;

  const tokens = (skillery as any)?.tokens as
    | { pageBackground?: string; headerBackground?: string }
    | undefined;

  const router = useRouter();
  const [coachOpen, setCoachOpen] = useState(false);
  const [studentOpen, setStudentOpen] = useState(false);

  function handleCoachSelect(brand: string) {
    if (!brand) return;
    window.open(`/${brand}/coach`, "_blank", "noopener,noreferrer");
  }

  function handleStudentSelect(brand: string) {
    if (!brand) return;
    window.open(`/${brand}`, "_blank", "noopener,noreferrer");
  }

  // Footer socials: use your exact Skillery socials + global Discord
  const footerSocials = [
    { icon: "linkedin", href: "https://www.linkedin.com/company/skillery-co", label: "LinkedIn" },
    { icon: "bluesky", href: "https://bsky.app/profile/skillery.bsky.social", label: "Bluesky" },
    { icon: "instagram", href: "https://www.instagram.com/skillery.co/", label: "Instagram" },
    { icon: "discord", href: "https://discord.gg/FpydNne7", label: "Discord" },
  ];

  // All brand logos to render in the grid (name + logo) using your stored paths
  const brandKeys = [
    "gameon","fixon","jamon","learnon","growon","fiton","codeon","cookon","styleon","moneyon",
  ] as const;

  const brandCards = brandKeys
    .map((k) => ({ key: k, cfg: (brands as any)[k] }))
    .filter((b) => b?.cfg?.logo)
    .map(({ key, cfg }) => ({
      key,
      title: cfg.name,
      logo: cfg.logo,
    }));

  // Optional per-page logo overrides: set a brand key here to swap its logo ONLY on this page
  // Example: gameon: "/images/brands/gameon-new.svg"
  const logoOverrides: Partial<Record<typeof brandKeys[number], string>> = {
   codeon: "/images/codeon/codeon-logo1.png",
   jamon: "/images/jamon/jamon_logo2.png",
  };

  // Per-brand scale factors to normalize visual size to the FixOn baseline (1 = baseline)
  const brandScale: Record<typeof brandKeys[number], number> = {
    gameon: 1.1,
    fixon: 1,
    jamon: 1.12,
    learnon: 0.82,
    growon: 0.92,
    fiton: 1.08,
    codeon: 1,
    cookon: 0.9,
    styleon: 0.84,
    moneyon: 0.86,
  };

  // Tokens & colors (no assumptions)
  const pageBg =
    (tokens && tokens.pageBackground) ||
    (colors as any)?.primary ||
    (colors as any)?.background ||
    "#0A0F18";
  const headerBg = (tokens && tokens.headerBackground) || pageBg;
  const footerBg = "transparent";

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#0A0F18" }}>
      <style>{neonPulse}</style>
      {/* Hero */}
      <header
        className="w-full"
        style={{ background: "#0A0F18" }}
      >
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 text-center">
          <div className="flex flex-col items-center gap-4">
            <Image src={logo} alt={`${name} logo`} width={56} height={56} priority />
            <div className="flex flex-col">
              <span className="text-sm/none uppercase tracking-widest text-white/70">{name}</span>
              <h1 className="text-3xl md:text-5xl font-bold">{tagline}</h1>
            </div>
          </div>

          <div className="mt-8 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold">
              The Great Transfer of Knowledge starts here
            </h2>
            <p className="mt-4 text-white/80">
              As trillions move between generations, Skillery ensures wisdom, skills, and opportunity move with it.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/contact"
              className="rounded-2xl px-6 py-3 text-sm font-semibold shadow-lg transition
                         ring-1 ring-white/10"
              style={{
                backgroundColor: colors?.button,
              }}
            >
              Invest in Skillery
            </Link>

            {/* Explore Brands (smooth scroll) */}
            <button
              onClick={() => {
                const el = document.getElementById("skillery-solution");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="rounded-2xl px-5 py-2.5 text-sm font-medium transition bg-transparent ring-1 ring-white/15 hover:ring-white/30"
              aria-label="Scroll to The Skillery Solution"
            >
              Explore Brands
            </button>

            {/* Become a Student → Brand picker */}
            <div className="relative">
              <button
                onClick={() => setStudentOpen((o) => !o)}
                className="rounded-2xl px-5 py-2.5 text-sm font-medium transition bg-transparent ring-1 ring-white/15 hover:ring-white/30"
                aria-expanded={studentOpen}
                aria-controls="student-brand-picker"
              >
                Become a Student
              </button>
              {studentOpen && (
                <div
                  id="student-brand-picker"
                  className="absolute z-20 mt-2 w-56 rounded-xl ring-1 ring-white/15 bg-[#0F1624] p-3"
                >
                  <label htmlFor="studentBrand" className="block text-xs text-white/70 mb-2">
                    Pick a brand
                  </label>
                  <select
                    id="studentBrand"
                    className="w-full rounded-lg bg-[#0B1220] ring-1 ring-white/10 px-3 py-2 text-sm"
                    defaultValue=""
                    onChange={(e) => {
                      handleStudentSelect(e.target.value);
                      setStudentOpen(false);
                    }}
                  >
                    <option value="" disabled>Choose…</option>
                    {brandKeys.map((k) => (
                      <option key={k} value={k}>{(brands as any)[k].name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Become a Coach → Brand picker */}
            <div className="relative">
              <button
                onClick={() => setCoachOpen((o) => !o)}
                className="rounded-2xl px-5 py-2.5 text-sm font-medium transition bg-transparent ring-1 ring-white/15 hover:ring-white/30"
                aria-expanded={coachOpen}
                aria-controls="coach-brand-picker"
              >
                Become a Coach
              </button>
              {coachOpen && (
                <div
                  id="coach-brand-picker"
                  className="absolute z-20 mt-2 w-56 rounded-xl ring-1 ring-white/15 bg-[#0F1624] p-3"
                >
                  <label htmlFor="coachBrand" className="block text-xs text-white/70 mb-2">
                    Pick a brand
                  </label>
                  <select
                    id="coachBrand"
                    className="w-full rounded-lg bg-[#0B1220] ring-1 ring-white/10 px-3 py-2 text-sm"
                    defaultValue=""
                    onChange={(e) => {
                      handleCoachSelect(e.target.value);
                      setCoachOpen(false);
                    }}
                  >
                    <option value="" disabled>Choose…</option>
                    {brandKeys.map((k) => (
                      <option key={k} value={k}>{(brands as any)[k].name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Problem */}
      <section className="mx-auto max-w-7xl px-6 py-14 border-t text-center" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <div className="grid gap-8 md:grid-cols-2 md:justify-center md:text-center">
          <div>
            <div
              className="text-4xl md:text-5xl font-extrabold"
              style={{ color: (colors as any)?.hover || (colors as any)?.primary || "#C9E6FF" }}
            >
              $70 trillion+
            </div>
            <p className="mt-2 text-white/80">Largest intergenerational wealth shift in history.</p>
          </div>
          <div className="text-white/85">
            Wealth without knowledge fades. At the same time, AI is disrupting white-collar work while
            trades, creativity, and people-first skills are rising. Families want to future-proof the next generation.
          </div>
        </div>
      </section>

      {/* Solution */}
      <section id="skillery-solution" className="mx-auto max-w-7xl px-6 py-14 border-t text-center" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <h3 className="text-2xl md:text-3xl font-bold">The Skillery Solution</h3>
        <p className="mt-3 text-white/80 max-w-4xl mx-auto">
          A multi-brand platform for live skill-sharing, connecting learners with real experts across gaming, trades,
          academics, creative arts, fitness, coding, cooking, beauty, and finance.
        </p>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
          {brandCards.map((b, i) => (
            <Link
              key={b.key}
              href={`/${b.key}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${b.title}`}
              className="rounded-2xl p-2 flex flex-col items-center gap-3 ring-1 ring-white/10 hover:ring-white/25 transition"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="relative w-[200px] h-[200px]">
                <Image
                  src={logoOverrides[b.key as keyof typeof logoOverrides] ?? b.logo}
                  alt={`${b.title} logo`}
                  fill
                  sizes="200px"
                  style={{
                    objectFit: "contain",
                    transform: `scale(${brandScale[b.key] ?? 1})${b.key === "jamon" ? " translateY(8px)" : ""}`,
                    transformOrigin: "center",
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Now */}
      <section className="mx-auto max-w-7xl px-6 py-14 border-t text-center" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <h3 className="text-2xl md:text-3xl font-bold">Why Now</h3>
        <ul className="mt-4 grid gap-3 text-white/85 max-w-xl mx-auto">
          <li>Parents and grandparents want to pass down wisdom, not just money.</li>
          <li>AI is reshaping work; durable, human-centered skills matter more.</li>
          <li>Remote, digital-first learning makes Skillery scalable across every brand.</li>
        </ul>
      </section>

      {/* Raise */}
      <section className="mx-auto max-w-7xl px-6 py-14 border-t text-center" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <div
          className="rounded-2xl p-6 ring-1 ring-white/10 mx-auto max-w-3xl"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <h3 className="text-xl md:text-2xl font-bold">The Raise</h3>
          <p className="mt-2 text-white/85">
            We are raising our pre-seed round to expand the Skillery brand family, onboard coaches, and scale launch campaigns.
          </p>
          <div className="mt-5">
            <Link
              href="/contact"
              className="inline-flex rounded-2xl px-6 py-3 text-sm font-semibold shadow-lg transition
                         ring-1 ring-white/10"
              style={{ backgroundColor: colors?.button }}
            >
              Join Us
            </Link>
          </div>
        </div>
      </section>

      <footer className="mt-16 border-t border-white/5" style={{ background: "transparent" }}>
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col items-center gap-4">
            <Image src={logo} alt={`${name} logo`} width={44} height={44} />
            <div className="text-sm text-white/80">Unlock Your Potential</div>
            <div className="mt-2 flex items-center gap-6">
              {footerSocials.map(({ icon, href, label }) => {
                const Icon = IconMap[icon];
                return (
                  <Link key={icon} href={href} aria-label={label} target="_blank" className="group">
                    <span
                      className="inline-flex items-center justify-center transition outline-none focus-visible:outline-none"
                    >
                      {Icon ? (
                        <Icon
                          className="w-5 h-5"
                          style={{ animation: "neonPulse 2s infinite ease-in-out", color: "#FFFFFF" }}
                        />
                      ) : (
                        <span className="text-sm">{label[0]}</span>
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 text-xs text-white/50">© {new Date().getFullYear()} Skillery LLC. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}