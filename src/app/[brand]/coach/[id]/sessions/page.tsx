"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import DefaultPageLayout from "@/ui/layouts/DefaultPageLayout";
import { createClient } from "@/utils/supabase/client";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";
import { Avatar } from "@/ui/components/Avatar";
import {
  FeatherClock,
  FeatherVideo,
  FeatherMessageCircle,
  FeatherSearch,
  FeatherFilter,
  FeatherList,
  FeatherCalendar,
  FeatherPlay,
  FeatherCheck,
} from "@subframe/core";

type Coach = {
  id: number;
  brand: string;
  display_name: string | null;
  title: string;
  is_active: boolean;
};

type SessionRow = {
  id: number | string;
  brand?: string | null;
  coach_id?: number | null;
  coach_name?: string | null;
  title: string;
  description?: string | null;
  price?: number | null;
  scheduled_time: string; // ISO string
  game?: string | null;
  image?: string | null; // optional student or game image
  duration_minutes?: number | null;
  student_name?: string | null;
  recording_url?: string | null;
  status?: "upcoming" | "starting" | "completed" | "canceled" | null;
};

const supabase = createClient();

export default function CoachSessionsPage() {
  const { brand, id } = useParams() as { brand: string; id: string };
  const pathname = usePathname();
  const coachId = Number(id);

  const base = `/${brand}/coach/${id}`;

  const [coach, setCoach] = useState<Coach | null>(null);
  const [loadingCoach, setLoadingCoach] = useState(true);

  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

  const [view, setView] = useState<"list" | "calendar">("list");
  const [search, setSearch] = useState("");
  const [gameFilter, setGameFilter] = useState<string>("");

  // 1) Load coach (by id only — no brand filter, avoids random “not found”)
  useEffect(() => {
    if (!coachId || Number.isNaN(coachId)) return;

    let cancelled = false;
    (async () => {
      setLoadingCoach(true);
      const { data, error } = await supabase
        .from("coaches")
        .select("id, brand, display_name, title, is_active")
        .eq("id", coachId)
        .single();

      if (!cancelled) {
        if (error || !data || data.is_active === false) {
          console.error("coach fetch error (sessions):", error?.message);
          setCoach(null);
        } else {
          setCoach(data as Coach);
        }
        setLoadingCoach(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [coachId]);

  // 2) Load sessions for this coach.
  //    Prefer coach_id; if none are found, try fallback by coach_name (demo data).
  useEffect(() => {
    if (!coachId || Number.isNaN(coachId)) return;

    let cancelled = false;
    (async () => {
      setLoadingSessions(true);

      // Try by coach_id first
      let { data: byId, error: errId } = await supabase
        .from("sessions")
        .select(
          "id, brand, coach_id, coach_name, title, description, price, scheduled_time, game, image, duration_minutes, student_name, recording_url, status"
        )
        .eq("coach_id", coachId)
        .order("scheduled_time", { ascending: true });

      // If none found and we have a coach name/title, try fallback by coach_name
      if (!byId?.length && (coach?.display_name || coach?.title)) {
        const coachName = coach?.display_name || coach?.title || "";
        const { data: byName, error: errName } = await supabase
          .from("sessions")
          .select(
            "id, brand, coach_id, coach_name, title, description, price, scheduled_time, game, image, duration_minutes, student_name, recording_url, status"
          )
          .ilike("coach_name", coachName)
          .order("scheduled_time", { ascending: true });

        if (!cancelled) {
          if (errName) console.error("sessions fallback by name error:", errName?.message);
          setSessions(byName || []);
          setLoadingSessions(false);
        }
        return;
      }

      if (!cancelled) {
        if (errId) console.error("sessions by coach_id error:", errId?.message);
        setSessions(byId || []);
        setLoadingSessions(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [coachId, coach?.display_name, coach?.title]);

  // Derived data
  const now = new Date();
  const todayKey = now.toISOString().slice(0, 10); // YYYY-MM-DD

  const filtered = useMemo(() => {
    let out = sessions.slice();

    if (brand) {
      // keep across brands, but if your sessions have brand set, prefer matching
      out = out.filter((s) => !s.brand || s.brand.toLowerCase() === brand.toLowerCase());
    }
    if (gameFilter) {
      out = out.filter((s) => (s.game || "").toLowerCase() === gameFilter.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      out = out.filter(
        (s) =>
          (s.title || "").toLowerCase().includes(q) ||
          (s.description || "").toLowerCase().includes(q) ||
          (s.student_name || "").toLowerCase().includes(q) ||
          (s.game || "").toLowerCase().includes(q)
      );
    }
    return out;
  }, [sessions, brand, gameFilter, search]);

  const todays = filtered.filter((s) => (s.scheduled_time || "").slice(0, 10) === todayKey);
  const past = filtered.filter((s) => new Date(s.scheduled_time) < now);

  // Distinct game list for the filter dropdown
  const games = Array.from(
    new Set(filtered.map((s) => (s.game || "").trim()).filter(Boolean))
  ).sort();

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start bg-default-background">
        {/* --- TOP NAV TABS (brand/id-aware) --- */}
        <div className="flex w-full items-end px-6 pt-6">
          <div className="flex h-px w-12 flex-none bg-neutral-200" />
          <div className="ml-4">
            <div className="flex items-center gap-4">
              <div className="flex">
                {/* If your Tabs component accepts arbitrary children, we can nest Links inside */}
                <div className="flex items-end">
                  <div className="mr-2">
                    <a>
                      <span className="hidden" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Use your existing Tabs UI */}
        <div className="flex w-full items-end px-6">
          <div className="flex h-px w-12 flex-none bg-neutral-200" />
          <div className="ml-4 flex items-center gap-4">
            {/* Replace with your Tabs if it requires specific structure; keeping simple to avoid refactor */}
            <div className="flex items-center gap-4">
              <Link href={base} className={pathname === base ? "font-semibold underline" : ""}>
                Dashboard
              </Link>
              <Link
                href={`${base}/sessions`}
                className={pathname === `${base}/sessions` ? "font-semibold underline" : ""}
              >
                Sessions
              </Link>
              <Link
                href={`${base}/reviews`}
                className={pathname === `${base}/reviews` ? "font-semibold underline" : ""}
              >
                Reviews
              </Link>
            </div>
          </div>
        </div>

        {/* Existing Sessions controls (Calendar/List, filters, etc.) */}
        <div className="flex w-full items-end px-6 pt-4">
          <div className="flex h-px w-12 flex-none bg-neutral-200" />
          <div className="ml-4 flex items-center gap-4">
            <Button
              variant={view === "calendar" ? "brand-primary" : "neutral-secondary"}
              icon={<FeatherCalendar />}
              onClick={() => setView("calendar")}
            >
              Calendar
            </Button>
            <Button
              variant={view === "list" ? "brand-primary" : "neutral-secondary"}
              icon={<FeatherList />}
              onClick={() => setView("list")}
            >
              List
            </Button>

            {/* Game filter */}
            <select
              className="ml-4 rounded-md border border-neutral-300 bg-default-background px-3 py-2"
              value={gameFilter}
              onChange={(e) => setGameFilter(e.target.value)}
            >
              <option value="">All Games</option>
              {games.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            {/* Search */}
            <div className="ml-2 flex items-center gap-2">
              <input
                className="rounded-md border border-neutral-300 bg-default-background px-3 py-2"
                placeholder="Search sessions"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="neutral-secondary" icon={<FeatherSearch />}>
                Search
              </Button>
              <Button variant="neutral-secondary" icon={<FeatherFilter />} onClick={() => setGameFilter("")}>
                Clear
              </Button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex w-full grow flex-col gap-12 px-6 py-8 overflow-auto">
          {/* Loading states */}
          {loadingCoach || loadingSessions ? (
            <div className="text-subtext-color">Loading sessions…</div>
          ) : !coach ? (
            <div className="text-error">Coach not found.</div>
          ) : (
            <>
              {/* Today’s Sessions (List view only for now) */}
              {view === "list" && (
                <div className="flex w-full flex-col items-start gap-4">
                  <div className="flex w-full items-center justify-between">
                    <span className="text-heading-3 font-heading-3 text-default-font">Today&apos;s Sessions</span>
                  </div>

                  {todays.length === 0 ? (
                    <div className="text-subtext-color">No sessions today.</div>
                  ) : (
                    <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-brand-primary bg-neutral-50 px-6 py-6">
                      {todays.map((s) => {
                        const start = new Date(s.scheduled_time);
                        const timeStr = start.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
                        const dur = s.duration_minutes ? `${s.duration_minutes} min` : "";
                        const status = s.status || (start > now ? "upcoming" : "completed");

                        return (
                          <div key={String(s.id)} className="flex w-full items-center gap-4">
                            <div
                              className={`inline-flex h-8 w-8 items-center justify-center rounded-md ${
                                status === "starting"
                                  ? "bg-success-100 text-success-700"
                                  : status === "upcoming"
                                  ? "bg-neutral-100 text-default-font"
                                  : "bg-neutral-100 text-default-font"
                              }`}
                            >
                              <FeatherClock />
                            </div>

                            <div className="flex grow flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="text-body-bold text-default-font">
                                  {timeStr} — {s.title}
                                </span>
                                {status === "starting" ? (
                                  <Badge variant="success" icon={<FeatherVideo />}>
                                    Starting Soon
                                  </Badge>
                                ) : status === "upcoming" ? (
                                  <Badge variant="neutral" icon={<FeatherClock />}>
                                    Upcoming
                                  </Badge>
                                ) : status === "completed" ? (
                                  <Badge variant="success" icon={<FeatherCheck />}>
                                    Completed
                                  </Badge>
                                ) : null}
                              </div>

                              <div className="flex items-center gap-2">
                                <Avatar size="small" image={s.image || undefined}>
                                  {(s.student_name || "S")[0]}
                                </Avatar>
                                <span className="text-body text-subtext-color">
                                  {s.student_name || "Student"} — {dur || "60 min"}
                                </span>
                                {s.game ? <Badge>{s.game}</Badge> : null}
                              </div>
                            </div>

                            {status === "starting" ? (
                              <Button icon={<FeatherVideo />}>Join Call</Button>
                            ) : status === "upcoming" ? (
                              <Button variant="neutral-secondary" icon={<FeatherMessageCircle />}>
                                Message
                              </Button>
                            ) : s.recording_url ? (
                              <a href={s.recording_url} target="_blank" rel="noopener noreferrer">
                                <Button variant="neutral-secondary" icon={<FeatherPlay />}>
                                  Watch
                                </Button>
                              </a>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Past Sessions (simple table-like layout) */}
              <div className="flex w-full flex-col items-start gap-4">
                <div className="flex w-full items-center justify-between">
                  <span className="text-heading-3 font-heading-3 text-default-font">Past Sessions</span>
                </div>

                <div className="w-full overflow-x-auto rounded-md border border-neutral-200">
                  <div className="min-w-[720px]">
                    {/* header */}
                    <div className="grid grid-cols-7 gap-2 px-4 py-3 bg-neutral-50 text-subtext-color text-sm font-semibold">
                      <div>Date & Time</div>
                      <div>Student</div>
                      <div>Game</div>
                      <div>Duration</div>
                      <div>Status</div>
                      <div>Recording</div>
                      <div>Actions</div>
                    </div>

                    {/* rows */}
                    {past.length === 0 ? (
                      <div className="px-4 py-4 text-subtext-color">No past sessions.</div>
                    ) : (
                      past
                        .slice()
                        .sort((a, b) => +new Date(b.scheduled_time) - +new Date(a.scheduled_time))
                        .map((s) => {
                          const start = new Date(s.scheduled_time);
                          const dateStr = `${start.toLocaleDateString()} — ${start.toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                          })}`;
                          const status = s.status || "completed";
                          const dur = s.duration_minutes ? `${s.duration_minutes} min` : "60 min";

                          return (
                            <div
                              key={String(s.id)}
                              className="grid grid-cols-7 gap-2 px-4 py-3 border-t border-neutral-200 items-center"
                            >
                              <div className="text-default-font">{dateStr}</div>

                              <div className="flex items-center gap-2">
                                <Avatar size="small" image={s.image || undefined}>
                                  {(s.student_name || "S")[0]}
                                </Avatar>
                                <span className="text-default-font">{s.student_name || "Student"}</span>
                              </div>

                              <div>{s.game ? <Badge>{s.game}</Badge> : "-"}</div>

                              <div className="text-default-font">{dur}</div>

                              <div>
                                {status === "completed" ? (
                                  <Badge variant="success" icon={<FeatherCheck />}>
                                    Completed
                                  </Badge>
                                ) : status === "canceled" ? (
                                  <Badge variant="error">Canceled</Badge>
                                ) : (
                                  <Badge variant="neutral">{status}</Badge>
                                )}
                              </div>

                              <div>
                                {s.recording_url ? (
                                  <a href={s.recording_url} target="_blank" rel="noopener noreferrer">
                                    <Button variant="neutral-secondary" size="small" icon={<FeatherPlay />}>
                                      Watch
                                    </Button>
                                  </a>
                                ) : (
                                  <span className="text-subtext-color text-sm">—</span>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <Button variant="neutral-secondary" size="small" icon={<FeatherMessageCircle />}>
                                  Notes
                                </Button>
                              </div>
                            </div>
                          );
                        })
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </DefaultPageLayout>
  );
}