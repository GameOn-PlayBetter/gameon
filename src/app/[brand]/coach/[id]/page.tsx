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
  FeatherTwitter,
  FeatherYoutube,
  FeatherTwitch,
  FeatherLinkedin,
  FeatherLink,
} from "@subframe/core";

type CoachRow = {
  id: number;
  brand: string;
  specialty: string;
  tokens_per_hour: number;
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

function SocialIcon({ url }: { url: string }) {
  const u = url.toLowerCase();
  if (u.includes("twitch")) return <FeatherTwitch className="w-6 h-6 text-white" />;
  if (u.includes("youtube")) return <FeatherYoutube className="w-6 h-6 text-white" />;
  if (u.includes("x.com") || u.includes("twitter")) return <FeatherTwitter className="w-6 h-6 text-white" />;
  if (u.includes("linkedin")) return <FeatherLinkedin className="w-6 h-6 text-white" />;
  return <FeatherLink className="w-6 h-6 text-white" />;
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
  const tz = coach.timezones?.[0];

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
            <div className="flex min-w-[240px] max-w-[448px] grow basis-0 flex-col items-center gap-6 rounded-md border border-neutral-border bg-default-background px-8 pt-12 pb-8 shadow-sm relative">
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
                  <span className="absolute -bottom-4 inline-flex items-center gap-1 rounded-md bg-success-100 px-2 py-1 text-success-700 text-xs">
                    <FeatherCheck />
                    Available
                  </span>
                </div>

                {/* Name + Book */}
                <div className="flex w-full flex-col items-center gap-6">
                  <span className="w-full text-heading-1 font-heading-1 text-default-font text-center">{name}</span>
                  <Link href={`/${brand}/coach/${coach.id}/book`}>
                    <Button className="h-10 min-w-[192px]" size="large" icon={<FeatherCalendar />}>
                      Book Session
                    </Button>
                  </Link>
                </div>
              </div>

              {/* LEFT column content — bigger text without moving layout */}
              <div className="flex w-full flex-col items-center gap-10">
                {/* Brand, Specialty, Experience */}
                <div className="flex w-full flex-wrap items-center gap-2">
                  <Badge variant="brand" className="!text-[13px] md:!text-[14px] !py-1.5 !px-3">
                    {coach.brand}
                  </Badge>
                  {coach.specialty ? (
                    <Badge variant="neutral" className="!text-[13px] md:!text-[14px] !py-1.5 !px-3">
                      {coach.specialty}
                    </Badge>
                  ) : null}
                  {coach.experience_years != null ? (
                    <Badge variant="neutral" className="!text-[13px] md:!text-[14px] !py-1.5 !px-3">
                      {coach.experience_years}+ yrs exp
                    </Badge>
                  ) : null}
                </div>

                {/* Rate */}
                <div className="flex w-full flex-col gap-2">
                  <span className="text-subtext-color font-semibold text-[15px] md:text-[17px]">SESSION RATE</span>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="!text-[13px] md:!text-[14px] !py-1.5 !px-3">
                      {tokenRange(coach.tokens_per_hour)}
                    </Badge>
                    <Badge variant="neutral" className="!text-[13px] md:!text-[14px] !py-1.5 !px-3">
                      {coach.tokens_per_hour} tokens/hr base
                    </Badge>
                  </div>
                </div>

                {/* Skills */}
                {coach.skills?.length ? (
                  <div className="flex w-full flex-col gap-2">
                    <span className="text-subtext-color font-semibold text-[15px] md:text-[17px]">SKILLS</span>
                    <div className="flex flex-wrap gap-2">
                      {coach.skills.map((s, i) => (
                        <Badge key={i} variant="neutral" className="!text-[13px] md:!text-[14px] !py-1.5 !px-3">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* About */}
                <div className="flex w-full flex-col gap-4">
                  <span className="text-subtext-color font-semibold text-[15px] md:text-[17px]">ABOUT</span>
                  <div className="flex flex-col gap-3">
                    {coach.bio ? (
                      <span className="text-default-font text-[16px] md:text-[18px] leading-relaxed">
                        {coach.bio}
                      </span>
                    ) : null}

                    {tz ? (
                      <div className="flex items-center gap-2 text-[15px] md:text-[17px]">
                        <FeatherClock className="w-5 h-5 md:w-6 md:h-6" />
                        <span>{tz}</span>
                      </div>
                    ) : null}

                    {langs.length ? (
                      <div className="flex items-center gap-2">
                        <FeatherMessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                        <div className="flex flex-wrap items-center gap-2">
                          {langs.map((l, i) => (
                            <Badge key={i} variant="neutral" className="!text-[13px] md:!text-[14px] !py-1.5 !px-3">
                              {l}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Socials with neon glow */}
                {coach.social_links?.length ? (
                  <div className="flex w-full flex-col gap-2">
                    <span className="text-subtext-color font-semibold text-[15px] md:text-[17px]">SOCIAL</span>
                    <div className="flex flex-wrap items-center gap-6 pl-1">
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
                {coach.tags?.length ? (
                  <div className="flex w-full flex-col gap-2">
                    <span className="text-subtext-color font-semibold text-[15px] md:text-[17px]">TAGS</span>
                    <div className="flex flex-wrap gap-2">
                      {coach.tags.map((t, i) => (
                        <Badge key={i} className="!text-[13px] md:!text-[14px] !py-1.5 !px-3">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Stats */}
                <div className="flex w-full flex-wrap gap-2">
                  {coach.rating != null ? (
                    <Badge variant="success" className="!text-[13px] md:!text-[14px] !py-1.5 !px-3">
                      ⭐ {coach.rating.toFixed(1)}
                    </Badge>
                  ) : null}
                  {coach.num_reviews ? (
                    <Badge variant="neutral" className="!text-[13px] md:!text-[14px] !py-1.5 !px-3">
                      {coach.num_reviews} reviews
                    </Badge>
                  ) : null}
                  {coach.bookings_count ? (
                    <Badge variant="neutral" className="!text-[13px] md:!text-[14px] !py-1.5 !px-3">
                      {coach.bookings_count} bookings
                    </Badge>
                  ) : null}
                  {coach.likes ? (
                    <Badge variant="neutral" className="!text-[13px] md:!text-[14px] !py-1.5 !px-3">
                      ❤️ {coach.likes}
                    </Badge>
                  ) : null}
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
                            <Badge variant="neutral" className="!text-[12px] !py-1 !px-2">
                              Popular topic
                            </Badge>
                            <Badge variant="neutral" className="!text-[12px] !py-1 !px-2">
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
                      <span className="text-heading-2 font-heading-2 text-default-font">{coach.specialty}</span>
                      {coach.skills?.length ? (
                        <div className="flex flex-wrap items-center gap-2">
                          {coach.skills.slice(0, 6).map((s, i) => (
                            <Badge key={i} variant="success" className="!text-[12px] !py-1 !px-2">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <span className="text-body text-default-font">
                    Coaching available for {coach.specialty}. Add brand‑specific details as you grow schema.
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