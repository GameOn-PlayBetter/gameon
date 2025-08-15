"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DefaultPageLayout from "@/ui/layouts/DefaultPageLayout";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import {
  FeatherShare2,
  FeatherCalendar,
  FeatherCheck,
  FeatherClock,
  FeatherMessageCircle,
  FeatherYoutube,
  FeatherTwitch,
  FeatherLinkedin,
  FeatherLink,
} from "@subframe/core";

type CoachRow = {
  id: number;
  brand: string;
  specialty: string | string[] | Record<string, any>;
  tokens_per_hour: number | number[] | Record<string, number> | string;
  title: string;
  description: string;
  skills: string[];
  bio: string;
  avatar_url: string;
  display_name: string | null;
  rating: number | null;
  num_reviews: number;
  likes: number | null;
  bookings_count: number | null;
  is_featured: boolean | null;
  video_url: string | null;
  is_active: boolean;
  tags: string[] | null;
  experience_years: number | null;
  languages: string[] | null;
  social_links: string[] | null;
  timezones: string[] | null;
  games: string[] | null;
};

const supabase = createClient();

function tokenRange(tph: number) {
  const min = Math.max(1, Math.round(tph * 0.8));
  const max = Math.max(min, Math.round(tph * 1.2));
  return `${min}–${max} tokens/hr`;
}

function brandLogoFor(brand: string) {
  const key = (brand || "").toLowerCase();
  // Update these paths to your actual assets
  if (key === "styleon") return "/images/styleon/styleon-logo.png";
  if (key === "gameon") return "/images/gameon/go-logo.png";
  if (key === "fiton") return "/images/fiton/fiton_logo.png";
  if (key === "codeon") return "/images/codeon/codeon-logo.png";
  if (key === "learnon") return "/images/learnon/learnon-logo.png";
  if (key === "growon") return "/images/growon/growon-logo1.png";
  if (key === "cookon") return "/images/cookon/cookon-logo.png";
  if (key === "moneyon") return "/images/moneyon/moneyon-logo.png";
  if (key === "jamon") return "/images/jamon/jamon_logo.png";
  if (key === "fixon") return "/images/fixon/fixonlogo.png";
  return "/images/shared/logo.png"; // fallback
}

// --- Social brand SVGs (monotone, inherit currentColor) ---
function XIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1200 1227" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M714.163 519.284 1160.89 0H1053.5L665.093 450.887 356.286 0H0l468.906 684.804L0 1226.87h107.387l408.83-471.932 326.7 471.932H1200L714.163 519.284Zm-144.38 166.52-47.326-67.97-377.28-541.88h162.19l304.728 437.7 47.326 67.97 401.49 576.47H998.719L569.783 685.804Z" fill="currentColor"/>
    </svg>
  );
}

function InstagramIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5 3.66 9.14 8.44 9.86v-6.99H7.9v-2.9h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.56v1.88h2.77l-.44 2.9h-2.33v6.99C18.34 21.21 22 17.07 22 12.07z" fill="currentColor"/>
    </svg>
  );
}

function BlueskyIcon({ className = "w-6 h-6" }: { className?: string }) {
  // simplified butterfly mark
  return (
    <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <g fill="currentColor">
        <circle cx="20" cy="22" r="10" />
        <circle cx="44" cy="22" r="10" />
        <circle cx="22" cy="42" r="8" />
        <circle cx="42" cy="42" r="8" />
        <circle cx="32" cy="30" r="4" />
      </g>
    </svg>
  );
}

function SocialIcon({ url }: { url: string }) {
  const u = url.toLowerCase();
  if (u.includes("twitch.tv")) return <FeatherTwitch className="w-5 h-5 text-white" />;
  if (u.includes("youtube.com") || u.includes("youtu.be")) return <FeatherYoutube className="w-5 h-5 text-white" />;
  if (u.includes("x.com") || u.includes("twitter.com")) return <XIcon className="w-5 h-5 text-white" />;
  if (u.includes("instagram.com")) return <InstagramIcon className="w-5 h-5 text-white" />;
  if (u.includes("facebook.com") || u.includes("fb.com")) return <FacebookIcon className="w-5 h-5 text-white" />;
  if (u.includes("bsky.app") || u.includes("bluesky") || u.includes("bsky.social")) return <BlueskyIcon className="w-5 h-5 text-white" />;
  if (u.includes("linkedin.com")) return <FeatherLinkedin className="w-5 h-5 text-white" />;
  return <FeatherLink className="w-5 h-5 text-white" />;
}

export default function CoachProfilePage() {
  const { brand, id } = useParams() as { brand: string; id: string };
  const coachId = Number(id);

  const [coach, setCoach] = useState<CoachRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!coachId || Number.isNaN(coachId)) return;

    let cancelled = false;
    (async () => {
      setLoading(true);

      // base query by id
      let query = supabase
        .from("coaches")
        .select(`
          id, brand, specialty, tokens_per_hour, title, description, skills, bio, avatar_url,
          display_name, rating, num_reviews, likes, bookings_count, is_featured, video_url,
          is_active, tags, experience_years, languages, social_links, timezones, games
        `)
        .eq("id", coachId) as any;

      // only add brand filter if brand is present
      if (brand) query = query.ilike("brand", String(brand));

      const { data, error } = await query.single();

      if (!cancelled) {
        if (error || !data || !data.is_active) {
          console.error("coach fetch error:", error?.message, { brand, coachId });
          setNotFound(true);
        } else {
          setCoach(data as CoachRow);
        }
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [brand, coachId]);

  if (loading) {
    return (
      <DefaultPageLayout>
        <div className="p-8">Loading coach…</div>
      </DefaultPageLayout>
    );
  }
  if (notFound || !coach) {
    return (
      <DefaultPageLayout>
        <div className="p-8 text-error">Coach not found.</div>
      </DefaultPageLayout>
    );
  }

  const isGameOn = coach.brand.toLowerCase() === "gameon";
  const name = coach.display_name || coach.title;
  const langs = coach.languages || [];
  // Normalize and format timezone into a friendly string
  function pickTimezone(raw: any): string | undefined {
    // Accept a plain string
    if (typeof raw === "string") {
      const v = raw.trim();
      return v.length ? v : undefined;
    }
    // Accept an array: find the first non-empty string or object with a known key
    if (Array.isArray(raw)) {
      for (const item of raw) {
        if (typeof item === "string" && item.trim()) return item.trim();
        if (item && typeof item === "object") {
          const cand = item.timezone || item.tz || item.zone || item.name;
          if (typeof cand === "string" && cand.trim()) return cand.trim();
        }
      }
      return undefined;
    }
    // Accept an object { timezone | tz | zone | name }
    if (raw && typeof raw === "object") {
      const cand = raw.timezone || raw.tz || raw.zone || raw.name;
      if (typeof cand === "string" && cand.trim()) return cand.trim();
    }
    return undefined;
  }

  const tzRaw = pickTimezone(coach.timezones);

  let formattedTZ: string | undefined;
  if (tzRaw) {
    const raw = tzRaw.trim();
    // IANA like "America/Chicago"
    if (raw.includes("/")) {
      try {
        const dtf = new Intl.DateTimeFormat(undefined, { timeZone: raw, timeZoneName: "long" });
        const parts = dtf.formatToParts(new Date());
        const tzName = parts.find(p => p.type === "timeZoneName")?.value;
        formattedTZ = tzName || raw;
      } catch {
        formattedTZ = raw;
      }
    }
    // Offsets like "UTC-5", "GMT+2", "-05:00", "+0530", "UTC +05:30"
    else {
      // Extract sign, hours, minutes
      const m = raw.match(/^(?:(?:utc|gmt)\s*)?([+-])?\s*(\d{1,2})(?::?(\d{2}))?$/i)
            || raw.match(/^(?:utc|gmt)\s*([+-])\s*(\d{1,2})(?::?(\d{2}))?$/i)
            || raw.match(/^(?:utc|gmt)\s*([+-])\s*(\d{1,2})(?:h)?(?:\s*(\d{2})m)?$/i);
      if (m) {
        const sign = m[1] === "-" ? -1 : 1;
        const hh = parseInt(m[2] || "0", 10);
        const mm = parseInt(m[3] || "0", 10);
        const normHH = String(Math.min(14, Math.max(0, hh))).padStart(2, "0");
        const normMM = String(Math.min(59, Math.max(0, mm))).padStart(2, "0");
        const iso = `UTC${sign < 0 ? "−" : "+"}${normHH}:${normMM}`;

        // Best-effort friendly labels for common offsets (non-exhaustive, approximate)
        const key = `${sign < 0 ? "-" : "+"}${normHH}:${normMM}`;
        const labelMap: Record<string, string> = {
          "-10:00": "Hawaii–Aleutian Time",
          "-09:00": "Alaska Time",
          "-08:00": "Pacific Time",
          "-07:00": "Mountain Time",
          "-06:00": "Central Time",
          "-05:00": "Eastern Time",
          "-04:00": "Atlantic Time",
          "+00:00": "Greenwich Mean Time",
          "+01:00": "Central European Time",
          "+02:00": "Eastern European Time",
          "+03:00": "Moscow Time",
          "+05:30": "India Standard Time",
          "+08:00": "China Standard Time",
          "+09:00": "Japan/Korea Standard Time",
          "+10:00": "Australian Eastern Time",
        };
        const friendly = labelMap[key] || undefined;
        formattedTZ = friendly ? friendly : iso;
      }
      // "UTC" alone
      else if (/^utc$/i.test(raw)) {
        formattedTZ = "Coordinated Universal Time";
      }
      // ISO datetime in UTC -> show viewer's local zone name
      else if (/^\d{4}-\d{2}-\d{2}T.*Z$/.test(raw)) {
        try {
          const d = new Date(raw);
          const parts = new Intl.DateTimeFormat(undefined, { timeZoneName: "long" }).formatToParts(d);
          formattedTZ = parts.find(p => p.type === "timeZoneName")?.value || raw;
        } catch {
          formattedTZ = raw;
        }
      }
      // Fallback: show as-is
      else {
        formattedTZ = raw;
      }
    }
  }

  // Canonical storage format (preferred):
  // - specialty: string[]                 e.g., ["Advanced Makeup","Bridal"]
  // - tokens_per_hour: Record<string, number>  e.g., {"Advanced Makeup":80,"Bridal":95}
  // The normalizer below still supports legacy shapes (single string/number, arrays, JSON strings).
  // Build pairs of [specialty, rate] from coach.specialty and coach.tokens_per_hour
  function normalizeSpecialtyRates(specialtyVal: unknown, rateVal: unknown): Array<{ name: string; rate: number }> {
    const out: Array<{ name: string; rate: number }> = [];

    // Helper: parse specialties into an array of strings
    const parseSpecialties = (v: unknown): string[] => {
      if (Array.isArray(v)) return v.map(x => String(x).trim()).filter(Boolean);
      if (typeof v === "string") {
        // Try JSON array first
        try {
          const maybe = JSON.parse(v);
          if (Array.isArray(maybe)) return maybe.map(x => String(x).trim()).filter(Boolean);
        } catch {}
        // Fallback: split by commas
        return v.split(",").map(s => s.trim()).filter(Boolean);
      }
      if (v && typeof v === "object") {
        // If it's an object with keys (treat keys as specialties)
        return Object.keys(v as any);
      }
      return [];
    };

    // Helper: parse rates which can be a number, array, or map of specialty->number
    const parseRates = (v: unknown): { map?: Record<string, number>; list?: number; arr?: number[] } => {
      if (typeof v === "number" && isFinite(v)) return { list: v };
      if (typeof v === "string") {
        // Try JSON parse first (could be number, array, or map)
        try {
          const parsed = JSON.parse(v);
          if (typeof parsed === "number" && isFinite(parsed)) return { list: parsed };
          if (Array.isArray(parsed)) return { arr: parsed.map((n: any) => Number(n)).filter((n: any) => isFinite(n)) };
          if (parsed && typeof parsed === "object") {
            const map: Record<string, number> = {};
            for (const [k, val] of Object.entries(parsed)) {
              const num = Number(val as any);
              if (isFinite(num)) map[k] = num;
            }
            return { map };
          }
        } catch {}
        // If it's a plain number string
        const num = Number(v);
        if (isFinite(num)) return { list: num };
      }
      if (Array.isArray(v)) {
        const arr = v.map((n: any) => Number(n)).filter((n: any) => isFinite(n));
        if (arr.length) return { arr };
      }
      if (v && typeof v === "object") {
        const map: Record<string, number> = {};
        for (const [k, val] of Object.entries(v as any)) {
          const num = Number(val as any);
          if (isFinite(num)) map[k] = num;
        }
        if (Object.keys(map).length) return { map };
      }
      return {};
    };

    const specialties = parseSpecialties(specialtyVal);
    const rates = parseRates(rateVal);

    // Case 1: explicit map of specialty -> rate
    if (rates.map) {
      for (const [spec, rate] of Object.entries(rates.map)) {
        out.push({ name: spec, rate });
      }
      return out;
    }

    // Case 2: single rate + multiple specialties => repeat the same rate for each specialty
    if (typeof rates.list === "number") {
      if (specialties.length) {
        for (const spec of specialties) out.push({ name: spec, rate: rates.list });
        return out;
      }
      // No specialties array; fall back to single pair using the original specialty string if available
      if (typeof specialtyVal === "string" && specialtyVal.trim()) {
        out.push({ name: specialtyVal.trim(), rate: rates.list });
        return out;
      }
      // Absolute fallback: unknown specialty
      out.push({ name: "Session", rate: rates.list });
      return out;
    }

    // Case 3: arrays: zip specialties with rates
    if (rates.arr && specialties.length) {
      const len = Math.min(specialties.length, rates.arr.length);
      for (let i = 0; i < len; i++) {
        out.push({ name: specialties[i], rate: rates.arr[i] });
      }
      // If there are extra specialties without explicit rates, attach the last known rate if any
      if (specialties.length > len && rates.arr.length > 0) {
        const last = rates.arr[rates.arr.length - 1];
        for (let i = len; i < specialties.length; i++) {
          out.push({ name: specialties[i], rate: last });
        }
      }
      return out;
    }

    // Final fallback: if we only have specialties and no rates, leave empty (nothing to render)
    return out;
  }

  // Helper to display specialty as clean string for chips
  function displaySpecialty(spec: unknown): string {
    if (Array.isArray(spec)) return spec.map(s => String(s).trim()).filter(Boolean).join(", ");
    if (spec && typeof spec === "object") return Object.keys(spec as any).join(", ");
    if (typeof spec === "string") return spec.trim();
    return "";
  }

  // BIG readable chips, consistent across left column
  const CHIP_BASE = "!text-[18px] md:!text-[20px] !py-3 !px-5 !rounded-md border !leading-none";
  // Use prior green background with hot pink text for all chips
  const CHIP_COLORS = ["!bg-success-100 !text-pink-600 !border-success-200"];
  function chipClass(index: number) {
    return `${CHIP_BASE} ${CHIP_COLORS[0]}`;
  }

  return (
    <DefaultPageLayout>
      {/* neon keyframes (scoped global) */}
      <style jsx global>{`
        @keyframes neonPulse {
          0%, 100% { filter: drop-shadow(0 0 4px #ff00ff) drop-shadow(0 0 8px #00ffff); }
          50% { filter: drop-shadow(0 0 12px #ff00ff) drop-shadow(0 0 24px #00ffff); }
        }
      `}</style>

      <div className="flex h-full w-full flex-col items-start">
        <div className="container max-w-none flex w-full grow flex-col items-center gap-4 bg-default-background py-12 overflow-auto">
          <div className="flex w-full max-w-[1280px] flex-wrap items-start gap-8">
            {/* LEFT column */}
            <div className="flex shrink-0 w-fit max-w-full md:max-w-[600px] min-w-[240px] flex-col items-center gap-6 rounded-md border border-neutral-border bg-default-background px-8 pt-12 pb-8 shadow-sm relative">
              <button className="absolute right-4 top-4 text-subtext-color hover:opacity-80">
                <FeatherShare2 />
              </button>

              {/* Avatar + Availability */}
              <div className="flex w-full flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-6 relative">
                  <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-brand-100 relative">
                    {coach.avatar_url ? (
                      <img className="h-36 w-36 object-cover absolute" src={coach.avatar_url} alt={name} />
                    ) : null}
                  </div>
                  <span className="absolute -bottom-4 inline-flex items-center gap-1 rounded-md bg-success-100 px-2 py-1 text-success-700 text-sm">
                    <FeatherCheck />
                    Available
                  </span>
                </div>

                {/* Name + Book */}
                <div className="flex w-full flex-col items-center gap-6">
                  <span className="w-full text-heading-1 font-heading-1 text-default-font text-center">{name}</span>
                </div>
              </div>

              {/* LEFT column content — bigger text without moving layout */}
              <div className="flex w-full flex-col items-stretch gap-10">
                {/* (moved Brand/Specialty/Experience into TAGS section below) */}
                <></>

                {/* Rates */}
                <div className="flex w-full flex-col gap-2">
                  <span className="text-subtext-color font-semibold text-[16px] md:text-[18px]">SESSION RATES</span>
                  {(() => {
                    const pairs = normalizeSpecialtyRates(coach.specialty, coach.tokens_per_hour);
                    if (!pairs.length) return (
                      <div className="text-subtext-color text-[14px] md:text-[16px]">No rates listed.</div>
                    );
                    return (
                      <div className="flex w-full flex-col gap-2">
                        {pairs.map((p, i) => (
                          <div key={i} className="flex items-center gap-2 w-full py-1">
                            <Badge size="lg" className={chipClass(i)}>{p.name}</Badge>
                            <Badge size="lg" className={chipClass(i + 1)}>{p.rate} tokens/hr</Badge>
                            <div>
                              <Link href={`/${brand}/coach/${coach.id}/book?specialty=${encodeURIComponent(p.name)}`}>
                                <Button
                                  variant="brand-primary"
                                  // Chip styling: py-[0.375rem] px-[0.5rem], text-[18px] md:text-[20px], rounded-md
                                  className="ml-2 !h-auto !py-[0.375rem] !px-[0.5rem] !text-[18px] md:!text-[20px] !leading-none !rounded-md !min-w-0 !w-auto"
                                  icon={<FeatherCalendar />}
                                >
                                  Book Session
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* Skills */}
                {coach.skills?.length ? (
                  <div className="flex w-full flex-col gap-2">
                  <span className="text-subtext-color font-semibold text-[16px] md:text-[18px]">SKILLS</span>
                  <div className="flex flex-wrap gap-2">
                    {coach.skills.map((s, i) => (
                      <Badge key={i} size="lg" className={chipClass(i)}>
                        {s}
                      </Badge>
                    ))}
                  </div>
                  </div>
                ) : null}

                {/* About */}
                <div className="flex w-full flex-col gap-4">
                  <span className="text-subtext-color font-semibold text-[16px] md:text-[18px]">ABOUT</span>
                  <div className="flex flex-col gap-3">
                    {coach.bio ? (
                      <span className="text-default-font text-[16px] md:text-[18px] leading-relaxed">
                        {coach.bio}
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* TIMEZONE */}
                {(tzRaw || formattedTZ) ? (
                  <div className="flex w-full flex-col gap-2">
                    <span className="text-subtext-color font-semibold text-[16px] md:text-[18px]">TIMEZONE</span>
                    <div className="flex flex-wrap gap-2">
                      <Badge size="lg" className={chipClass(0)}>
                        {formattedTZ ?? tzRaw}
                      </Badge>
                    </div>
                  </div>
                ) : null}

                {/* LANGUAGES SPOKEN */}
                {langs.length ? (
                  <div className="flex w-full flex-col gap-2">
                    <span className="text-subtext-color font-semibold text-[16px] md:text-[18px]">LANGUAGES SPOKEN</span>
                    <div className="flex flex-wrap gap-2">
                      {langs.map((l, i) => (
                        <Badge key={i} size="lg" className={chipClass(i)}>
                          {l}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Socials with neon glow */}
                {coach.social_links?.length ? (
                  <div className="flex w-full flex-col gap-2">
                    <span className="text-subtext-color font-semibold text-[16px] md:text-[18px]">SOCIAL</span>
                    <div className="flex flex-wrap items-center gap-6">
                      {coach.social_links.map((u, i) => (
                        <a
                          key={i}
                          href={u}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-transform hover:scale-125"
                          aria-label={u}
                          title={u}
                        >
                          <span
                            style={{
                              animation: "neonPulse 2s infinite ease-in-out",
                              filter:
                                "drop-shadow(0 0 6px #ff00ff) drop-shadow(0 0 12px #00ffff)",
                              display: "inline-flex",
                            }}
                          >
                            <SocialIcon url={u} />
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Tags */}
                {(coach.tags?.length || coach.brand || coach.specialty || coach.experience_years != null) ? (
                  <div className="flex w-full flex-col gap-2">
                    <span className="text-subtext-color font-semibold text-[16px] md:text-[18px]">TAGS</span>
                    <div className="flex flex-wrap gap-2">
                      {/* moved from header */}
                      {coach.brand ? (
                        <Badge size="lg" className={chipClass(0)}>{coach.brand}</Badge>
                      ) : null}
                      {displaySpecialty(coach.specialty) ? (
                        <Badge size="lg" className={chipClass(1)}>{displaySpecialty(coach.specialty)}</Badge>
                      ) : null}
                      {coach.experience_years != null ? (
                        <Badge size="lg" className={chipClass(2)}>{coach.experience_years}+ yrs exp</Badge>
                      ) : null}
                      {/* existing tags */}
                      {coach.tags?.map((t, i) => (
                        <Badge key={i} size="lg" className={chipClass(i + 3)}>
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Stats */}
                <div className="flex w-full flex-col gap-2">
                  <span className="text-subtext-color font-semibold text-[16px] md:text-[18px]">STATS</span>
                  <div className="flex w-full flex-wrap gap-2">
                    {coach.rating != null ? (
                      <Badge size="lg" className={chipClass(0)}>
                        ⭐ {coach.rating.toFixed(1)}
                      </Badge>
                    ) : null}
                    {coach.num_reviews ? (
                      <Badge size="lg" className={chipClass(1)}>
                        {coach.num_reviews} reviews
                      </Badge>
                    ) : null}
                    {coach.bookings_count ? (
                      <Badge size="lg" className={chipClass(2)}>
                        {coach.bookings_count} bookings
                      </Badge>
                    ) : null}
                    {coach.likes ? (
                      <Badge size="lg" className={chipClass(3)}>
                        ❤️ {coach.likes}
                      </Badge>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT column */}
            <div className="flex grow basis-0 flex-col items-start gap-8">
              {/* Overview card */}
              <div className="flex w-full flex-col gap-4 rounded-md border border-neutral-border bg-default-background p-6">
                <span className="text-heading-2 font-heading-2 text-default-font">{coach.title}</span>
                <span className="text-body font-body text-default-font">{coach.description}</span>
                {coach.video_url ? (
                  <div className="mt-2">
                    <video className="w-full rounded-md" src={coach.video_url} controls />
                  </div>
                ) : null}
              </div>

              {/* Games (GameOn) or Specialty (others) */}
              {isGameOn ? (
                coach.games?.length ? (
                  coach.games.map((g, i) => (
                    <div
                      key={`${g}-${i}`}
                      className="flex w-full flex-col gap-6 rounded-md border border-neutral-border bg-default-background px-6 py-6"
                    >
                      <div className="flex w-full items-center gap-4">
                        <img
                          src={brandLogoFor(coach.brand)}
                          alt={`${coach.brand} logo`}
                          className="h-16 w-16 flex-none rounded-md object-contain bg-neutral-50 p-1"
                        />
                        <div className="flex grow flex-col gap-2">
                          <span className="text-heading-2 font-heading-2 text-default-font">{g}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="neutral" className="!text-[14px] md:!text-[16px] !py-2 !px-3.5">
                              Popular topic
                            </Badge>
                            <Badge variant="neutral" className="!text-[14px] md:!text-[16px] !py-2 !px-3.5">
                              Student favorite
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <span className="text-body text-default-font">
                        Coaching available for {g}. Add rank/hours later if you extend schema.
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-body text-subtext-color">No games listed yet.</div>
                )
              ) : (
                <div className="flex w-full flex-col gap-6 rounded-md border border-neutral-border bg-default-background px-6 py-6">
                  <div className="flex w-full items-center gap-4">
                    <img
                      src={brandLogoFor(coach.brand)}
                      alt={`${coach.brand} logo`}
                      className="h-16 w-16 flex-none rounded-md object-contain bg-neutral-50 p-1"
                    />
                    <div className="flex grow flex-col gap-2">
                      <span className="text-heading-2 font-heading-2 text-default-font">
  {displaySpecialty(coach.specialty)}
</span>
                      {coach.skills?.length ? (
                        <div className="flex flex-wrap items-center gap-2">
                          {coach.skills.slice(0, 6).map((s, i) => (
                            <Badge key={i} variant="success" className="!text-[14px] md:!text-[16px] !py-2 !px-3.5">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <span className="text-body text-default-font">
                    Coaching available for {displaySpecialty(coach.specialty)}.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}