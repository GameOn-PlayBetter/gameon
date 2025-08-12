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

  const coachA = coaches[0]?.display_name || "Coach Alex";
  const coachAImg = coaches[0]?.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde";
  const coachB = coaches[1]?.display_name || "Coach Sarah";
  const coachBImg = coaches[1]?.avatar_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330";
  // ===============================================================

  return (
    <>
      {/* Glowing "DEMO DATA ONLY" banner */}
      <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 bg-red-600 px-6 py-2 rounded-md shadow-lg shadow-red-400 pointer-events-none">
        <span className="font-['Orbitron'] text-white text-[16px] font-bold tracking-widest uppercase drop-shadow-[0_0_6px_#ffffff]">
          DEMO DATA ONLY
        </span>
      </div>

      <DefaultPageLayout>
        <div className="sticky top-20 z-20 w-full bg-transparent backdrop-blur mb-6">
          <div className="flex w-full flex-col items-start pb-2">
          <div className="flex w-full flex-col items-start gap-6 px-12 pt-6 pb-4">
            <div className="flex w-full flex-wrap items-start gap-4">
              <div className="flex h-36 w-36 flex-none flex-col items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-100 relative cursor-pointer">
                <img
                  className="h-36 w-36 flex-none object-cover absolute"
                  src="https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-4.0.3"
                />
                <div className="flex items-center justify-center bg-neutral-0 group:hover .group-hover:opacity-70 absolute inset-0 opacity-0" />
              </div>
              <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-6 pt-4">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-heading-2 font-heading-2 text-default-font">
                      GameMaster_Pro
                    </span>
                    <Badge>Premium Member</Badge>
                    <Badge variant="success">Founding Member</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button icon={<FeatherCoins />} onClick={() => {}}>
                      25 Tokens
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
                      48 Completed
                    </span>
                  </div>
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                    <span className="text-body-bold font-body-bold text-default-font">
                      Favorite Game
                    </span>
                    <span className="line-clamp-1 w-full text-heading-3 font-caption text-brand-600">
                      Minecraft
                    </span>
                  </div>
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                    <span className="text-body-bold font-body-bold text-default-font">
                      Next Sessions
                    </span>
                    <div className="flex flex-col items-start gap-1">
                      <span className="line-clamp-1 w-full text-heading-3 font-caption text-brand-600 cursor-pointer">
                        Today at 4:00 PM
                      </span>
                      <span className="line-clamp-1 w-full text-heading-3 font-caption text-brand-600 cursor-pointer">
                        Tomorrow at 2:00 PM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge icon={<FeatherStar />}>Pro</Badge>
              <Badge variant="success" icon={<FeatherTrophy />}>
                Elite
              </Badge>
              <Badge variant="warning" icon={<FeatherZap />}>
                VIP
              </Badge>
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
                        <div className="flex w-full items-center gap-2 py-4">
                          <span className="line-clamp-1 w-24 flex-none text-caption-bold font-caption-bold text-default-font">
                            Building
                          </span>
                          <Progress value={75} />
                          <span className="line-clamp-1 w-12 flex-none text-caption font-caption text-brand-500 text-right">
                            75%
                          </span>
                        </div>
                        <div className="flex w-full items-center gap-2 py-4">
                          <span className="line-clamp-1 w-24 flex-none text-caption-bold font-caption-bold text-default-font">
                            Survival
                          </span>
                          <Progress value={60} />
                          <span className="line-clamp-1 w-12 flex-none text-caption font-caption text-brand-600 text-right">
                            60%
                          </span>
                        </div>
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
                    <div className="flex w-full flex-wrap items-start gap-2">
                      <LargeBadge icon={<FeatherPickaxe />}>Master Builder</LargeBadge>
                      <LargeBadge icon={<FeatherGhost />}>Survivor Pro</LargeBadge>
                      <LargeBadge icon={<FeatherStar />}>Party Champion</LargeBadge>
                      <LargeBadge icon={<FeatherCrown />}>Elite Player</LargeBadge>
                    </div>
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
                  {coaches.slice(0, 5).map((coach, idx) => (
                    <Table.Row key={coach.id ?? idx}>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <Avatar size="small" image={coach.avatar_url}>
                            {coach.display_name?.[0] ?? "C"}
                          </Avatar>
                          <span className="text-body font-body text-default-font">
                            {coach.display_name ?? "Coach"}
                          </span>
                        </div>
                      </Table.Cell>

                      <Table.Cell>
                        <Badge>{coach.games?.[0] || "N/A"}</Badge>
                      </Table.Cell>

                      <Table.Cell>
                        <span className="text-body font-body text-default-font">
                          {pickSample(feedbackSamples, idx)}
                        </span>
                      </Table.Cell>

                      <Table.Cell>
                        <Badge variant="warning">
                          {pickSample(actionItemSamples, idx)}
                        </Badge>
                      </Table.Cell>

                      <Table.Cell>
                        <span className="text-body font-body text-subtext-color">
                          {idx + 1}d ago
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table>
              </div>

              <div className="flex w-full flex-col items-start gap-4">
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
                  <Table.Row>
                    <Table.Cell>
                      <div className="flex items-center gap-4">
                        <IconWithBackground icon={<FeatherBox />} />
                        <span className="text-body-bold font-body-bold text-default-font">Minecraft</span>
                      </div>
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
                      <span className="text-body font-body text-brand-500">60 min</span>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant="neutral">Building</Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Button variant="neutral-secondary" size="small" icon={<FeatherPlay />} onClick={() => {}}>
                        Watch
                      </Button>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="text-body font-body text-subtext-color">2h ago</span>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <div className="flex items-center gap-4">
                        <IconWithBackground icon={<FeatherSkull />} />
                        <span className="text-body-bold font-body-bold text-default-font">
                          Dead By Daylight
                        </span>
                      </div>
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
                      <span className="text-body font-body text-brand-500">45 min</span>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant="neutral">Strategy</Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Button variant="neutral-secondary" size="small" icon={<FeatherPlay />} onClick={() => {}}>
                        Watch
                      </Button>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="text-body font-body text-subtext-color">1d ago</span>
                    </Table.Cell>
                  </Table.Row>
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
                  <div className="flex w-full items-center gap-4">
                    <IconWithBackground variant="success" icon={<FeatherCalendar />} />
                    <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                      <span className="text-body-bold font-body-bold text-default-font">Mario Party Coaching</span>
                      <span className="text-body font-body text-subtext-color">Today at 4:00 PM with Coach Mike</span>
                    </div>
                    <Button variant="neutral-secondary" icon={<FeatherVideo />} onClick={() => {}}>
                      Join Call
                    </Button>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <IconWithBackground icon={<FeatherCalendar />} />
                    <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                      <span className="text-body-bold font-body-bold text-default-font">
                        The Last of Us Speedrun
                      </span>
                      <span className="text-body font-body text-subtext-color">Today at 8:00 PM with Coach Mandy</span>
                    </div>
                    <Button disabled variant="neutral-tertiary" icon={<FeatherXCircle />} onClick={() => {}}>
                      Cancel
                    </Button>
                    <Button variant="neutral-tertiary" icon={<FeatherClock />} onClick={() => {}}>
                      Upcoming
                    </Button>
                  </div>
                  <div className="flex w-full items-center gap-4">
                    <IconWithBackground icon={<FeatherCalendar />} />
                    <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                      <span className="text-body-bold font-body-bold text-default-font">
                        Minecraft Advanced Building
                      </span>
                      <span className="text-body font-body text-subtext-color">Tomorrow at 2:00 PM with Coach Alex</span>
                    </div>
                    <Button variant="neutral-tertiary" icon={<FeatherXCircle />} onClick={() => {}}>
                      Cancel
                    </Button>
                    <Button variant="neutral-tertiary" icon={<FeatherClock />} onClick={() => {}}>
                      Upcoming
                    </Button>
                  </div>
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
                description={`You have 25 ${tokenLabel.toLowerCase()} available`}
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