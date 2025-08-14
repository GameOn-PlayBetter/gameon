"use client";

import React, { useEffect, useState } from "react";
import DefaultPageLayout from "@/ui/layouts/DefaultPageLayout";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";
import { FeatherCoins } from "@subframe/core";
import { FeatherShoppingCart } from "@subframe/core";
import { FeatherStar } from "@subframe/core";
import { FeatherTrophy } from "@subframe/core";
import { FeatherZap } from "@subframe/core";
import { Tabs } from "@/ui/components/Tabs";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherX } from "@subframe/core";
import { Alert } from "@/ui/components/Alert";
import { FeatherAward } from "@subframe/core";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { FeatherTarget } from "@subframe/core";
import { Progress } from "@/ui/components/Progress";
import { FeatherBook } from "@subframe/core";
import { FeatherCheck } from "@subframe/core";
import { FeatherClock } from "@subframe/core";
import { LargeBadge } from "@/ui/components/LargeBadge";
import { FeatherPickaxe } from "@subframe/core";
import { FeatherGhost } from "@subframe/core";
import { FeatherCrown } from "@subframe/core";
import { Table } from "@/ui/components/Table";
import { FeatherHome } from "@subframe/core";
import { FeatherMessageCircle } from "@subframe/core";
import { Avatar } from "@/ui/components/Avatar";
import { FeatherBox } from "@subframe/core";
import { FeatherPlay } from "@subframe/core";
import { FeatherSkull } from "@subframe/core";
import { FeatherCalendar } from "@subframe/core";
import { FeatherVideo } from "@subframe/core";
import { FeatherXCircle } from "@subframe/core";
import GameOnCoaches from "@/ui/components/GameOnCoaches";
import { Select } from "@/ui/components/Select";
import { TextArea } from "@/ui/components/TextArea";
// ✅ use your existing dialog component
import Dialog from "@/ui/components/Dialog";
import ReportCoachDialog from "@/ui/components/ReportCoachDialog";

// ✅ added for Sessions & brand-awareness
import { TextField } from "@/ui/components/TextField";
import { ToggleGroup } from "@/ui/components/ToggleGroup";
import {
  FeatherAlertTriangle,
  FeatherFlag,
  FeatherGift,
  FeatherPlus,
  FeatherShield,
  FeatherSword,
  FeatherCompass,
  FeatherHeart,
  FeatherUser, // ✅ for the coach selector icon
} from "@subframe/core";
import { usePathname } from "next/navigation";
import { supa } from "@/utils/supabaseClient";

// ---- placeholder text for Coach Feedback table ----
const feedbackSamples = [
  "Great improvement on reaction time!",
  "Work on map awareness and positioning.",
  "Excellent teamwork during clutch rounds.",
  "Focus on resource management next session.",
  "Aim consistency has improved — keep practicing."
];

const actionItemSamples = [
  "Practice aiming for 15 min daily",
  "Review match replays for missed shots",
  "Try different character builds",
  "Focus on early-game loot efficiency",
  "Run strategy drills with a friend"
];

// deterministic pick so rows don't shuffle each render
const pickSample = (arr: string[], i: number) => arr[i % arr.length];

// ---- Quick-win coach API wiring ----
interface CoachLite {
  id?: number;
  display_name: string;
  avatar_url?: string;
  games?: string[];
}
// -----------------------------------

// force rebuild for prod

interface Coach {
  id?: number;
  display_name: string;
  title: string;
  avatar_url?: string;
  tags?: string[];
  description?: string;
  rating?: number;
  num_reviews?: number;
  tokens_per_hour?: number;
  games?: string[];
}

function PlayerProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "sessions" | "badges">("overview");

  // brand-aware token label (simple fallback). Adjust map as you add brands.
  const pathname = usePathname();
  const brandSeg = pathname?.split("/").filter(Boolean)?.[0]?.toLowerCase();
  const tokenLabel = brandSeg === "fiton" ? "Points" : "Tokens";

  // ==== Supabase-fed state (brand-aware) ====
  const [summary, setSummary] = useState<any | null>(null);
  const [goals, setGoals] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [feedbackRows, setFeedbackRows] = useState<any[]>([]);
  const [ownedBadges, setOwnedBadges] = useState<any[]>([]);
  const [recentSessions, setRecentSessions] = useState<any[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadErr, setLoadErr] = useState<string | null>(null);

  // Coach profile cache for names/avatars
  const [coachMap, setCoachMap] = useState<Record<string, { display_name?: string; avatar_url?: string }>>({});

  function fmt(dt?: string | null) {
    try {
      if (!dt) return "—";
      return new Date(dt).toLocaleString();
    } catch { return String(dt ?? "—"); }
  }

  // Tip dialog state
  const [tipOpen, setTipOpen] = useState(false);
  const [tipAmount, setTipAmount] = useState<string>("10");
  const [tipMessage, setTipMessage] = useState<string>("");

  function openTip(amount?: string) {
    if (amount) setTipAmount(amount);
    setTipMessage("");
    setTipOpen(true);
  }

  function sendTip() {
    // TODO: hook up to real token/tipping action
    setTipOpen(false);
  }

  // ========== REPORT DIALOG STATE ==========
  const [reportOpen, setReportOpen] = useState(false);
  const [reportCoach, setReportCoach] = useState<string>(""); // e.g., from row click
  const [reportReason, setReportReason] = useState<string>("");
  const [reportDetails, setReportDetails] = useState<string>("");

  function openReport(coachName: string) {
    setReportCoach(coachName);
    setReportReason("");
    setReportDetails("");
    setReportOpen(true);
  }

  function submitReport() {
    // TODO: replace with real submit → API call / Supabase action
    setReportOpen(false);
  }
  // ========================================

  // ====== Fetch real coaches for placeholders ======
  const [coaches, setCoaches] = useState<CoachLite[]>([]);
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/coaches?brand=${encodeURIComponent(brandSeg ?? "")}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (isMounted && Array.isArray(data)) setCoaches(data);
      } catch (e) {
        console.error("Failed to load coaches for Sessions/Feedback:", e);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [brandSeg]);

  // Brand-aware data load from Supabase (current user)
  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);
      setLoadErr(null);
      try {
        const sb = supa();
        const { data: { user } } = await sb.auth.getUser();
        const uid = user?.id ?? "7c1e55f2-0160-468e-ba1a-4f31c08fee13"; // TEST USER FALLBACK
        if (!user) {
          console.warn("Not signed in; using TEST user for local dev.");
        } else {
          console.log("Signed-in user:", user.id);
        }

        // 1) Top summary from view
        const { data: sum, error: sumErr } = await sb
          .from("v_user_dashboard_summary")
          .select("*")
          .eq("user_id", uid)
          .single();
        if (sumErr) throw sumErr;

        // 2) Goals (brand-filtered)
        const { data: goalsData, error: goalsErr } = await sb
          .from("user_goals")
          .select("id,title,progress_percent,sort_order,updated_at,brand")
          .eq("user_id", uid)
          .eq("brand", brandSeg ?? "gameon")
          .order("sort_order", { ascending: true });
        if (goalsErr) throw goalsErr;

        // 3) Skills (brand-filtered)
        const { data: skillsData, error: skillsErr } = await sb
          .from("user_skills_progress")
          .select("id,skill_name,initial_level,current_level,improvement_note,coach_notes,sort_order,updated_at,brand")
          .eq("user_id", uid)
          .eq("brand", brandSeg ?? "gameon")
          .order("sort_order", { ascending: true });
        if (skillsErr) throw skillsErr;

        // 4) Coach feedback (brand-filtered)
        const { data: fbData, error: fbErr } = await sb
          .from("coach_feedback")
          .select("id,coach_id,game,feedback,action_items,created_at,brand")
          .eq("user_id", uid)
          .eq("brand", brandSeg ?? "gameon")
          .order("created_at", { ascending: false })
          .limit(10);
        if (fbErr) throw fbErr;

        // 5) Owned badges (brand-filtered)
        const { data: badgesData, error: badgesErr } = await sb
          .from("user_badges")
          .select("badge_id, acquired_at, brand, badges ( slug, name, icon_url )")
          .eq("user_id", uid)
          .eq("brand", brandSeg ?? "gameon")
          .order("acquired_at", { ascending: false });
        if (badgesErr) throw badgesErr;

        // 6) Recent sessions (brand-filtered, with recording)
        const { data: recentData, error: recentErr } = await sb
          .from("user_sessions")
          .select("id, game, focus_area, duration_minutes, ended_at, starts_at, coach_id, session_recordings ( recording_url, created_at )")
          .eq("user_id", uid)
          .eq("brand", brandSeg ?? "gameon")
          .not("ended_at", "is", null)
          .order("ended_at", { ascending: false })
          .limit(5);
        if (recentErr) throw recentErr;

        // 7) Upcoming sessions (brand-filtered)
        const { data: upcomingData, error: upcomingErr } = await sb
          .from("user_sessions")
          .select("id, game, focus_area, duration_minutes, starts_at, coach_id")
          .eq("user_id", uid)
          .eq("brand", brandSeg ?? "gameon")
          .gt("starts_at", new Date().toISOString())
          .order("starts_at", { ascending: true })
          .limit(5);
        if (upcomingErr) throw upcomingErr;

        // 8) Brand-scoped token balance from ledger
        const { data: ledgerRows, error: ledgerErr } = await sb
          .from("user_tokens_ledger")
          .select("delta")
          .eq("user_id", uid)
          .eq("brand", brandSeg ?? "gameon");
        if (ledgerErr) throw ledgerErr;
        const computedTokens = (ledgerRows ?? []).reduce((acc: number, r: any) => acc + (Number(r.delta) || 0), 0);

        // 9) Brand-scoped total sessions completed
        const { count: completedCount, error: countErr } = await sb
          .from("user_sessions")
          .select("id", { count: "exact", head: true })
          .eq("user_id", uid)
          .eq("brand", brandSeg ?? "gameon")
          .not("ended_at", "is", null);
        if (countErr) throw countErr;

        // 10) Load coach display names/avatars for any coach_ids present
        const coachIdsSet = new Set<string>();
        (recentData ?? []).forEach((s: any) => { if (s.coach_id) coachIdsSet.add(String(s.coach_id)); });
        (upcomingData ?? []).forEach((s: any) => { if (s.coach_id) coachIdsSet.add(String(s.coach_id)); });
        (fbData ?? []).forEach((r: any) => { if (r.coach_id) coachIdsSet.add(String(r.coach_id)); });

        let coachProfilesMap: Record<string, { display_name?: string; avatar_url?: string }> = {};
        if (coachIdsSet.size > 0) {
          const coachIds = Array.from(coachIdsSet);
          const { data: coachProfiles, error: coachErr } = await sb
            .from("profiles")
            .select("id, display_name, avatar_url")
            .in("id", coachIds);
          if (coachErr) throw coachErr;
          (coachProfiles ?? []).forEach((p: any) => {
            coachProfilesMap[p.id] = { display_name: p.display_name, avatar_url: p.avatar_url };
          });
        }

        if (!isMounted) return;
        setSummary({
          ...(sum as any),
          tokens_balance: computedTokens,
          total_sessions_completed: completedCount ?? 0,
          next_sessions: upcomingData ?? (sum as any)?.next_sessions ?? [],
        });
        setGoals(goalsData ?? []);
        setSkills(skillsData ?? []);
        setFeedbackRows(fbData ?? []);
        setOwnedBadges(badgesData ?? []);
        setRecentSessions(recentData ?? []);
        setUpcomingSessions(upcomingData ?? []);
        setCoachMap(coachProfilesMap);
      } catch (e: any) {
        if (!isMounted) return;
        setLoadErr(e?.message ?? "Failed to load data");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, [brandSeg]);

  const coachA = coaches[0]?.display_name || "Coach Alex";
  const coachAImg = coaches[0]?.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde";
  const coachB = coaches[1]?.display_name || "Coach Sarah";
  const coachBImg = coaches[1]?.avatar_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330";
  // ===============================================================

  return (
    <>
      {/* Glowing banner to confirm LIVE code + data */}
      <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 bg-emerald-600 px-6 py-2 rounded-md shadow-lg shadow-emerald-400 pointer-events-none">
        <span className="font-['Orbitron'] text-white text-[16px] font-bold tracking-widest uppercase drop-shadow-[0_0_6px_#ffffff]">
          {summary ? `LIVE DATA — ${summary.display_name ?? "Player"} — ${(summary.tokens_balance ?? 0)} ${tokenLabel}` : "LIVE DATA"}
        </span>
      </div>

      <DefaultPageLayout>
        <div className="sticky top-20 z-20 w-full bg-neutral-0/60 backdrop-blur supports-[backdrop-filter]:bg-neutral-0/40 mb-6">
          <div className="flex w-full flex-col items-start pb-2">
          <div className="flex w-full flex-col items-start gap-6 px-12 pt-6 pb-4">
            <div className="flex w-full flex-wrap items-start gap-4">
              <div className="flex h-36 w-36 flex-none flex-col items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-100 relative cursor-pointer">
                <img
                  className="h-36 w-36 flex-none object-cover absolute"
                  src={summary?.avatar_url ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(summary?.display_name ?? "Player")}`}
                />
                <div className="flex items-center justify-center bg-neutral-0 group:hover .group-hover:opacity-70 absolute inset-0 opacity-0" />
              </div>
              <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-6 pt-4">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-heading-2 font-heading-2 text-default-font">
                      {summary?.display_name ?? "Player"}
                    </span>
                    {Array.isArray(summary?.active_memberships) && summary.active_memberships.length > 0 && summary.active_memberships.map((tier: string) => (
                      <Badge key={tier}>{tier.charAt(0).toUpperCase() + tier.slice(1)} Member</Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button icon={<FeatherCoins />} onClick={() => {}}>
                      {(summary?.tokens_balance ?? 0)} {tokenLabel}
                    </Button>
                    <Button variant="neutral-secondary" icon={<FeatherShoppingCart />} onClick={() => {}}>
                      Buy Tokens
                    </Button>
                  </div>
                </div>
                <div className="flex w-full flex-wrap items-start gap-6 mobile:flex-col mobile:flex-wrap mobile:gap-6">
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                    <span className="text-body-bold font-body-bold text-default-font">
                      Total Sessions
                    </span>
                    <span className="line-clamp-1 w-full text-heading-3 font-caption text-brand-500">
                      {(summary?.total_sessions_completed ?? 0)} Completed
                    </span>
                  </div>
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                    <span className="text-body-bold font-body-bold text-default-font">
                      Favorite Game
                    </span>
                    <span className="line-clamp-1 w-full text-heading-3 font-caption text-brand-600">
                      {summary?.favorite_game ?? "—"}
                    </span>
                  </div>
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                    <span className="text-body-bold font-body-bold text-default-font">
                      Next Sessions
                    </span>
                    <div className="flex flex-col items-start gap-1">
                      {(Array.isArray(summary?.next_sessions) ? summary?.next_sessions : []).slice(0,2).map((s, i) => (
                        <button
                          key={s.session_id ?? i}
                          type="button"
                          onClick={() => {
                            const el = document.getElementById("upcoming-sessions");
                            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          className="text-left line-clamp-1 w-full text-heading-3 font-caption text-brand-600 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-500 rounded cursor-pointer"
                        >
                          {fmt(s.starts_at)}{s.game ? ` — ${s.game}` : ""}
                        </button>
                      ))}
                      {(!summary?.next_sessions || summary?.next_sessions?.length === 0) && (
                        <span className="line-clamp-1 w-full text-heading-3 font-caption text-subtext-color">No upcoming</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full items-end">
            <div className="flex h-px w-12 flex-none flex-col items-center gap-2 bg-neutral-200" />
            <Tabs>
              <Tabs.Item active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
                Overview
              </Tabs.Item>
              <Tabs.Item active={activeTab === "sessions"} onClick={() => setActiveTab("sessions")}>
                Sessions
              </Tabs.Item>
              <Tabs.Item active={activeTab === "badges"} onClick={() => setActiveTab("badges")}>
                Badge Shop
              </Tabs.Item>
            </Tabs>
          </div>
        </div>

          {/* ===== OVERVIEW TAB ===== */}
          {activeTab === "overview" && (
            <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-12 px-12 py-12 pb-40 min-h-[70vh] overflow-visible">
              <div className="flex w-full flex-wrap items-start gap-6 rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6">
                {loading && (
                  <Alert variant="brand" title="Loading data…" description="Fetching your latest stats" />
                )}
                {loadErr && (
                  <Alert variant="error" title="Error" description={loadErr} />
                )}
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6">
                  <Alert
                    variant="success"
                    icon={<FeatherAward />}
                    title="Achievement Unlocked!"
                    description={
                      <span className="text-heading-3 font-heading-3 text-default-font">
                        You&apos;ve completed all homework assignments from your last 3 sessions.
                      </span>
                    }
                    actions={<IconButton icon={<FeatherX />} onClick={() => {}} />}
                  />
                  <div className="flex w-full flex-wrap items-start gap-6">
                    <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-brand-primary bg-neutral-50 px-6 py-6">
                      <div className="flex w-full items-center gap-2">
                        <IconWithBackground icon={<FeatherTarget />} />
                        <span className="text-heading-3 font-heading-3 text-default-font">Current Goals</span>
                      </div>
                      <div className="flex w-full flex-col items-start">
                        {goals.map(g => (
                          <div key={g.id} className="flex w-full items-center gap-2 py-4">
                            <span className="line-clamp-1 w-40 flex-none text-caption-bold font-caption-bold text-default-font">
                              {g.title}
                            </span>
                            <Progress value={Math.max(0, Math.min(100, g.progress_percent ?? 0))} />
                            <span className="line-clamp-1 w-14 flex-none text-caption font-caption text-brand-500 text-right">
                              {(g.progress_percent ?? 0)}%
                            </span>
                          </div>
                        ))}
                        {goals.length === 0 && (
                          <div className="text-subtext-color text-caption py-2">No goals yet</div>
                        )}
                      </div>
                    </div>
                    <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-brand-primary bg-neutral-50 px-6 py-6">
                      <div className="flex w-full items-center gap-2">
                        <IconWithBackground icon={<FeatherBook />} />
                        <span className="text-heading-3 font-heading-3 text-default-font">Player Progress</span>
                      </div>
                      <div className="flex w-full flex-wrap items-start gap-2">
                        <Badge variant="success" icon={<FeatherCheck />}>
                          Building Basics
                        </Badge>
                        <Badge variant="success" icon={<FeatherCheck />}>
                          Resource Management
                        </Badge>
                        <Badge variant="warning" icon={<FeatherClock />}>
                          Advanced Redstone
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full min-w-[240px] flex-col items-start gap-4 rounded-md border border-solid border-brand-primary bg-neutral-50 px-6 py-6">
                    <div className="flex w-full items-center gap-2">
                      <IconWithBackground icon={<FeatherAward />} />
                      <span className="text-heading-3 font-heading-3 text-default-font">Your Badges</span>
                      <div className="flex w-px flex-none flex-col items-center gap-2 self-stretch bg-neutral-border" />
                      <Button variant="neutral-secondary" icon={<FeatherShoppingCart />} onClick={() => {}}>
                        Buy Badges
                      </Button>
                    </div>
                    {ownedBadges.length > 0 ? (
                      <div className="flex w-full flex-wrap items-start gap-2">
                        {ownedBadges.map((b) => (
                          <LargeBadge key={b.badge_id} icon={<FeatherAward />}>
                            {b.badges?.name ?? b.badges?.slug ?? "Badge"}
                          </LargeBadge>
                        ))}
                      </div>
                    ) : (
                      <div className="text-subtext-color text-caption">No badges yet</div>
                    )}
                  </div>
                  <Table
                    header={
                      <Table.HeaderRow>
                        <Table.HeaderCell>Skill</Table.HeaderCell>
                        <Table.HeaderCell>Initial Level</Table.HeaderCell>
                        <Table.HeaderCell>Current Level</Table.HeaderCell>
                        <Table.HeaderCell>Improvement</Table.HeaderCell>
                        <Table.HeaderCell>Coach Notes</Table.HeaderCell>
                      </Table.HeaderRow>
                    }
                  >
                    <Table.Row>
                      <Table.Cell>
                        <div className="flex items-center gap-4">
                          <IconWithBackground icon={<FeatherHome />} />
                          <span className="text-body-bold font-body-bold text-default-font">Speedrunning</span>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant="neutral">Beginner</Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant="success">Intermediate</Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-success-600">+2 Levels</span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-default-font">Mastered basic foundations</span>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <div className="flex items-center gap-4">
                          <IconWithBackground icon={<FeatherZap />} />
                          <span className="text-body-bold font-body-bold text-default-font">Survival</span>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant="neutral">Novice</Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant="warning">Advanced Beginner</Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-success-600">+1 Level</span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-default-font">Making steady progress</span>
                      </Table.Cell>
                    </Table.Row>
                  </Table>
                </div>
              </div>

              {/* Coach Feedback */}
              <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6">
                <div className="flex w-full items-center justify-between">
                  <span className="text-heading-3 font-heading-3 text-default-font">Coach Feedback</span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <IconWithBackground icon={<FeatherMessageCircle />} />
                  <span className="text-heading-3 font-heading-3 text-default-font">Latest Notes</span>
                </div>

                  <Table
                    header={
                      <Table.HeaderRow>
                        <Table.HeaderCell>Coach</Table.HeaderCell>
                        <Table.HeaderCell>Game</Table.HeaderCell>
                        <Table.HeaderCell>Feedback</Table.HeaderCell>
                        <Table.HeaderCell>Action Items</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                      </Table.HeaderRow>
                    }
                  >
                    {feedbackRows.length > 0 ? feedbackRows.map((row) => (
                      <Table.Row key={row.id}>
                        <Table.Cell>
                          <div className="flex items-center gap-2">
                            <Avatar size="small" image={coachMap[String(row.coach_id)]?.avatar_url}>
                              {(coachMap[String(row.coach_id)]?.display_name ?? "C").toString().slice(0,1)}
                            </Avatar>
                            <span className="text-body font-body text-default-font">
                              {coachMap[String(row.coach_id)]?.display_name ?? String(row.coach_id) ?? "Coach"}
                            </span>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <Badge>{row.game ?? "—"}</Badge>
                        </Table.Cell>
                        <Table.Cell>
                          <span className="text-body font-body text-default-font">
                            {row.feedback}
                          </span>
                        </Table.Cell>
                        <Table.Cell>
                          <Badge variant="warning">
                            {row.action_items ?? "—"}
                          </Badge>
                        </Table.Cell>
                        <Table.Cell>
                          <span className="text-body font-body text-subtext-color">
                            {fmt(row.created_at)}
                          </span>
                        </Table.Cell>
                      </Table.Row>
                    )) : (
                      <Table.Row>
                        <Table.Cell colSpan={5}>
                          <span className="text-subtext-color text-caption">No feedback yet</span>
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Table>
              </div>

              <div id="upcoming-sessions" className="flex w-full flex-col items-start gap-4">
                <div className="flex w-full items-center justify-between">
                  <span className="text-heading-3 font-heading-3 text-default-font">Recent Sessions</span>
                  <Button variant="neutral-secondary" onClick={() => {}}>
                    View all available recordings
                  </Button>
                </div>
                <Table
                  header={
                    <Table.HeaderRow>
                      <Table.HeaderCell>Game</Table.HeaderCell>
                      <Table.HeaderCell>Coach</Table.HeaderCell>
                      <Table.HeaderCell>Duration</Table.HeaderCell>
                      <Table.HeaderCell>Focus Area</Table.HeaderCell>
                      <Table.HeaderCell>Recording</Table.HeaderCell>
                      <Table.HeaderCell>Date</Table.HeaderCell>
                    </Table.HeaderRow>
                  }
                >
                  {recentSessions.length > 0 ? recentSessions.map((s) => {
                    const recUrl = Array.isArray(s.session_recordings) ? s.session_recordings[0]?.recording_url : null;
                    return (
                      <Table.Row key={s.id}>
                        <Table.Cell>
                          <div className="flex items-center gap-4">
                            <IconWithBackground icon={<FeatherBox />} />
                            <span className="text-body-bold font-body-bold text-default-font">{s.game ?? "—"}</span>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex items-center gap-2">
                            <Avatar size="small" image={coachMap[String(s.coach_id)]?.avatar_url}>
                              {(coachMap[String(s.coach_id)]?.display_name ?? "C").toString().slice(0,1)}
                            </Avatar>
                            <span className="text-body font-body text-default-font">
                              {coachMap[String(s.coach_id)]?.display_name ?? String(s.coach_id) ?? "Coach"}
                            </span>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <span className="text-body font-body text-brand-500">{s.duration_minutes ?? 0} min</span>
                        </Table.Cell>
                        <Table.Cell>
                          <Badge variant="neutral">{s.focus_area ?? "—"}</Badge>
                        </Table.Cell>
                        <Table.Cell>
                          {recUrl ? (
                            <Button variant="neutral-secondary" size="small" icon={<FeatherPlay />} onClick={() => window.open(recUrl, "_blank")}>
                              Watch
                            </Button>
                          ) : (
                            <span className="text-subtext-color text-caption">—</span>
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          <span className="text-body font-body text-subtext-color">{fmt(s.ended_at)}</span>
                        </Table.Cell>
                      </Table.Row>
                    );
                  }) : (
                    <Table.Row>
                      <Table.Cell colSpan={6}>
                        <span className="text-subtext-color text-caption">No recent sessions</span>
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table>
              </div>

              <div className="flex w-full flex-col items-start gap-4">
                <div className="flex w-full items-center justify-between">
                  <span className="text-heading-3 font-heading-3 text-default-font">Upcoming Sessions</span>
                  <Button icon={<FeatherCalendar />} onClick={() => {}}>
                    Schedule New
                  </Button>
                </div>
                <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-brand-primary bg-neutral-50 px-6 py-6">
                  {upcomingSessions.length > 0 ? upcomingSessions.map((s) => (
                    <div key={s.id} className="flex w-full items-center gap-4">
                      <IconWithBackground icon={<FeatherCalendar />} />
                      <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                        <span className="text-body-bold font-body-bold text-default-font">
                          {s.game ?? "Session"}
                        </span>
                        <span className="text-body font-body text-subtext-color">
                          {fmt(s.starts_at)} — Coach {coachMap[String(s.coach_id)]?.display_name ?? String(s.coach_id) ?? "?"}
                        </span>
                      </div>
                      <Button variant="neutral-tertiary" icon={<FeatherClock />} onClick={() => {}}>
                        Upcoming
                      </Button>
                    </div>
                  )) : (
                    <div className="text-subtext-color text-caption">No upcoming sessions</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ===== SESSIONS TAB ===== */}
          {activeTab === "sessions" && (
            <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-12 px-12 py-12 pb-40 min-h-[70vh] overflow-visible">
              <div className="flex w-full items-start gap-8">
                {/* Filters */}
                <div className="flex w-64 flex-none flex-col items-start gap-4">
                  <TextField className="w-full">
                    <TextField.Input placeholder="Search sessions..." />
                  </TextField>
                  <ToggleGroup defaultValue="all">
                    <ToggleGroup.Item icon={null} value="all">
                      All Sessions
                    </ToggleGroup.Item>
                    <ToggleGroup.Item icon={null} value="unrated">
                      Needs Rating
                    </ToggleGroup.Item>
                    <ToggleGroup.Item icon={null} value="completed">
                      Completed
                    </ToggleGroup.Item>
                  </ToggleGroup>
                </div>

                {/* Content */}
                <div className="flex grow flex-col items-start gap-6">
                  <Alert
                    variant="warning"
                    icon={<FeatherAlertTriangle />}
                    title={`Rate Your Recent Session with ${coachA}`}
                    description="Your feedback helps maintain coaching quality. Please rate your recent session."
                    actions={
                      <div className="flex items-center gap-2">
                        <Button variant="neutral-secondary" icon={<FeatherX />}>
                          Later
                        </Button>
                        <Button icon={<FeatherStar />}>Rate Now</Button>
                      </div>
                    }
                  />

                  <Table
                    header={
                      <Table.HeaderRow>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Coach</Table.HeaderCell>
                        <Table.HeaderCell>Game</Table.HeaderCell>
                        <Table.HeaderCell>Duration</Table.HeaderCell>
                        <Table.HeaderCell>Rating Status</Table.HeaderCell>
                        <Table.HeaderCell>{tokenLabel} Given</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                      </Table.HeaderRow>
                    }
                  >
                    <Table.Row>
                      <Table.Cell>
                        <span className="text-body font-body text-default-font">Mar 15, 2024</span>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <Avatar size="small" image={coachAImg}>
                            {coachA?.[0] ?? "C"}
                          </Avatar>
                          <span className="text-body font-body text-default-font">{coachA}</span>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge>Minecraft</Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-brand-500">60 min</span>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant="warning">Not Rated</Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-brand-500">0 {tokenLabel}</span>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <Button variant="neutral-secondary" size="small" icon={<FeatherStar />}>
                            Rate
                          </Button>
                          <Button
                            variant="neutral-secondary"
                            size="small"
                            icon={<FeatherCoins />}
                            onClick={() => openTip("10")}
                          >
                            Tip
                          </Button>
                          <Button
                            variant="destructive-secondary"
                            size="small"
                            icon={<FeatherFlag />}
                            onClick={() => openReport(coachA)}
                          >
                            Report
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <span className="text-body font-body text-default-font">Mar 14, 2024</span>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <Avatar size="small" image={coachBImg}>
                            {coachB?.[0] ?? "C"}
                          </Avatar>
                          <span className="text-body font-body text-default-font">{coachB}</span>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge>Dead by Daylight</Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-brand-500">45 min</span>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant="success">5.0 ★</Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-body font-body text-success-600">10 {tokenLabel}</span>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="neutral-secondary"
                            size="small"
                            icon={<FeatherCoins />}
                            onClick={() => openTip("10")}
                          >
                            Tip More
                          </Button>
                          <Button
                            variant="destructive-secondary"
                            size="small"
                            icon={<FeatherFlag />}
                            onClick={() => openReport(coachB)}
                          >
                            Report
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  </Table>
                </div>
              </div>
            </div>
          )}

          {/* ===== BADGE SHOP TAB ===== */}
          {activeTab === "badges" && (
            <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-12 px-12 py-12 pb-40 min-h-[70vh] overflow-visible">
              {/* Brand promo */}
              <Alert
                variant="brand"
                icon={<FeatherGift />}
                title="Special Offer!"
                description={`Get 20% extra ${tokenLabel.toLowerCase()} on any ${tokenLabel.toLowerCase()} package purchase today!`}
                actions={<IconButton icon={<FeatherX />} onClick={() => {}} />}
              />

              <div className="flex w-full flex-col items-start gap-8">
                {/* Legendary */}
                <div className="flex w/full flex-col items-start gap-6">
                  <div className="flex w/full items-center gap-2">
                    <IconWithBackground variant="brand" icon={<FeatherStar />} />
                    <span className="text-heading-2 font-heading-2 text-default-font">
                      Legendary Badges
                    </span>
                  </div>

                  <div className="grid w-full grid-cols-3 gap-4">
                    <div className="flex flex-col items-start gap-4 rounded-md border border-solid border-brand-primary bg-neutral-50 p-6">
                      <div className="flex w-full items-center justify-between">
                        <LargeBadge icon={<FeatherCrown />}>Supreme Champion</LargeBadge>
                        <Badge variant="brand">500 {tokenLabel}</Badge>
                      </div>
                      <span className="text-body font-body text-subtext-color">
                        Reserved for the most elite players
                      </span>
                      <Button className="w-full" variant="brand-primary" icon={<FeatherPlus />}>
                        Purchase Badge
                      </Button>
                    </div>

                    <div className="flex flex-col items-start gap-4 rounded-md border border-solid border-brand-primary bg-neutral-50 p-6">
                      <div className="flex w-full items-center justify-between">
                        <LargeBadge icon={<FeatherZap />}>Speed Demon</LargeBadge>
                        <Badge variant="brand">450 {tokenLabel}</Badge>
                      </div>
                      <span className="text-body font-body text-subtext-color">
                        For the fastest speedrunners
                      </span>
                      <Button className="w-full" variant="brand-primary" icon={<FeatherPlus />}>
                        Purchase Badge
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Epic */}
                <div className="flex w/full flex-col items-start gap-6">
                  <div className="flex w/full items-center gap-2">
                    <IconWithBackground variant="success" icon={<FeatherShield />} />
                    <span className="text-heading-2 font-heading-2 text-default-font">
                      Epic Badges
                    </span>
                  </div>

                  <div className="grid w/full grid-cols-3 gap-4">
                    <div className="flex flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 p-6">
                      <div className="flex w/full items-center justify-between">
                        <LargeBadge icon={<FeatherSword />}>Battle Master</LargeBadge>
                        <Badge variant="success">300 {tokenLabel}</Badge>
                      </div>
                      <span className="text-body font-body text-subtext-color">
                        For exceptional combat skills
                      </span>
                      <Button className="w/full" variant="brand-primary" icon={<FeatherPlus />}>
                        Purchase Badge
                      </Button>
                    </div>

                    <div className="flex flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 p-6">
                      <div className="flex w-full items-center justify-between">
                        <LargeBadge icon={<FeatherCompass />}>Explorer Elite</LargeBadge>
                        <Badge variant="success">250 {tokenLabel}</Badge>
                      </div>
                      <span className="text-body font-body text-subtext-color">
                        For dedicated world explorers
                      </span>
                      <Button className="w/full" variant="brand-primary" icon={<FeatherPlus />}>
                        Purchase Badge
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Rare */}
                <div className="flex w/full flex-col items-start gap-6">
                  <div className="flex w/full items-center gap-2">
                    <IconWithBackground variant="warning" icon={<FeatherAward />} />
                    <span className="text-heading-2 font-heading-2 text-default-font">
                      Rare Badges
                    </span>
                  </div>

                  <div className="grid w/full grid-cols-3 gap-4">
                    <div className="flex flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 p-6">
                      <div className="flex w/full items-center justify-between">
                        <LargeBadge icon={<FeatherHeart />}>Team Player</LargeBadge>
                        <Badge variant="warning">150 {tokenLabel}</Badge>
                      </div>
                      <span className="text-body font-body text-subtext-color">
                        For cooperative excellence
                      </span>
                      <Button className="w/full" variant="brand-primary" icon={<FeatherPlus />}>
                        Purchase Badge
                      </Button>
                    </div>

                    <div className="flex flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 p-6">
                      <div className="flex w/full items-center justify-between">
                        <LargeBadge icon={<FeatherTarget />}>Sharpshooter</LargeBadge>
                        <Badge variant="warning">125 {tokenLabel}</Badge>
                      </div>
                      <span className="text-body font-body text-subtext-color">
                        For exceptional accuracy
                      </span>
                      <Button className="w/full" variant="brand-primary" icon={<FeatherPlus />}>
                        Purchase Badge
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tip Dialog — uses your Dialog API */}
        <Dialog open={tipOpen} onOpenChange={setTipOpen}>
          <Dialog.Content className="w/full max-w-lg p-6">
            <div className="flex w/full items-center gap-4">
              <Avatar
                size="large"
                image="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3"
              >
                A
              </Avatar>
              <div className="flex flex-col items-start gap-1 grow">
                <span className="text-heading-3 font-heading-3 text-default-font">Coach Alex</span>
                <span className="text-body font-body text-subtext-color">Minecraft Session — Mar 15, 2024</span>
              </div>
              <IconButton variant="neutral-tertiary" icon={<FeatherX />} onClick={() => setTipOpen(false)} />
            </div>

            <div className="mt-6">
              <Alert
                variant="brand"
                icon={<FeatherCoins />}
                title="Your Token Balance"
                description={`You have ${(summary?.tokens_balance ?? 0)} ${tokenLabel.toLowerCase()} available`}
              />
            </div>

            <div className="mt-6 flex w/full flex-col items-start gap-6">
              <Select
                className="h-auto w/full flex-none"
                label={`${tokenLabel} Amount`}
                placeholder="Select amount"
                icon={<FeatherCoins />}
                value={tipAmount}
                onValueChange={(v: string) => setTipAmount(v)}
              >
                <Select.Item value="5">5 {tokenLabel}</Select.Item>
                <Select.Item value="10">10 {tokenLabel}</Select.Item>
                <Select.Item value="25">25 {tokenLabel}</Select.Item>
                <Select.Item value="50">50 {tokenLabel}</Select.Item>
                <Select.Item value="custom">Custom Amount</Select.Item>
              </Select>

              <TextArea className="w/full" label="Message (Optional)" helpText="Add a note with your tip">
                <TextArea.Input
                  className="h-auto min-h-[96px] w/full flex-none"
                  placeholder="Thanks for the great session!"
                  value={tipMessage}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTipMessage(e.target.value)}
                />
              </TextArea>
            </div>

            <div className="mt-6 flex w/full items-center justify-end gap-2">
              <Button variant="neutral-secondary" icon={<FeatherX />} onClick={() => setTipOpen(false)}>
                Cancel
              </Button>
              <Button variant="brand-primary" icon={<FeatherCoins />} onClick={sendTip}>
                Send Tip
              </Button>
            </div>
          </Dialog.Content>
        </Dialog>

        {/* Report Dialog — now using the reusable component */}
        <ReportCoachDialog
          open={reportOpen}
          onOpenChange={setReportOpen}
          coachName={reportCoach}
          onSubmit={(payload: any) => {
            // TODO: replace with real submit → API call / Supabase action
            // payload = { coachName, reason, details }
            setReportOpen(false);
          }}
        />
      </DefaultPageLayout>
    </>
  );
}

export default PlayerProfilePage; // rebuild trigger