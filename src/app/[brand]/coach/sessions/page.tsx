"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import DefaultPageLayout from "@/ui/layouts/DefaultPageLayout";
import { createClient } from "@/utils/supabase/client";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";
import { Avatar } from "@/ui/components/Avatar";
import { Tabs } from "@/ui/components/Tabs";
import {
  FeatherShield,
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

const supabase = createClient();

type Coach = {
  id: number;
  brand?: string;
  display_name: string | null;
  title?: string | null;
  is_active?: boolean | null;
  avatar_url?: string | null;
  languages: string[] | null;
  bookings_count: number | null;
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
  image?: string | null;
  duration_minutes?: number | null;
  student_name?: string | null;
  recording_url?: string | null;
  status?: "upcoming" | "starting" | "completed" | "canceled" | null;
};

export default function CoachSessionsPage() {
  const { brand } = useParams() as { brand: string };
  const router = useRouter();
  const base = `/${brand}/coach`;

  const [authChecked, setAuthChecked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [coach, setCoach] = useState<Coach | null>(null);
  const [loadingCoach, setLoadingCoach] = useState(true);

  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

  const [view, setView] = useState<"list" | "calendar">("list");
  const [search, setSearch] = useState("");
  const [gameFilter, setGameFilter] = useState<string>("");

  // Auth
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!cancelled) {
        setUserId(data.user?.id ?? null);
        setAuthChecked(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Coach by auth user (brand‑scoped)
  useEffect(() => {
    if (!authChecked) return;
    let cancelled = false;

    (async () => {
      if (!userId) {
        setCoach(null);
        setLoadingCoach(false);
        return;
      }

      setLoadingCoach(true);
      let query = supabase
        .from("coaches")
        .select("id, brand, display_name, title, is_active, avatar_url, languages, bookings_count")
        .eq("auth_user_id", userId)
        .eq("is_active", true);

      if (brand) query = query.ilike("brand", String(brand));

      const { data, error } = await query.maybeSingle();

      if (!cancelled) {
        if (error || !data) {
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
  }, [authChecked, userId, brand]);

  // Sessions by coach
  useEffect(() => {
    if (!coach?.id) return;

    let cancelled = false;
    (async () => {
      setLoadingSessions(true);

      let { data: byId, error: errId } = await supabase
        .from("sessions")
        .select(
          "id, brand, coach_id, coach_name, title, description, price, scheduled_time, game, image, duration_minutes, student_name, recording_url, status"
        )
        .eq("coach_id", coach.id)
        .order("scheduled_time", { ascending: true });

      if ((!byId || !byId.length) && (coach.display_name || coach.title)) {
        const coachName = coach.display_name || coach.title || "";
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
  }, [coach?.id, coach?.display_name, coach?.title]);

  // Derived
  const now = new Date();
  const todayKey = now.toISOString().slice(0, 10);

  const filtered = useMemo(() => {
    let out = sessions.slice();

    if (brand) {
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

  // Guards
  if (!authChecked) {
    return (
      <DefaultPageLayout>
        <div className="p-6 text-subtext-color">Checking session…</div>
      </DefaultPageLayout>
    );
  }

  if (!userId) {
    return (
      <DefaultPageLayout>
        <div className="p-6">
          <p className="text-default-font">You must be logged in to view your Sessions.</p>
          <div className="mt-4">
            <Link href={`/login?next=${encodeURIComponent(base + "/sessions")}`}>
              <Button>Log in</Button>
            </Link>
          </div>
        </div>
      </DefaultPageLayout>
    );
  }

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start bg-default-background">

        {/* --- HEADER: same structure as Dashboard; no placeholders that show other names/images --- */}
        <div className="flex w-full flex-col items-start gap-8 px-12 pt-12 pb-6">
          <div className="flex w-full flex-wrap items-start gap-4">
            <div className="flex h-36 w-36 flex-none flex-col items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-100 relative">
              {/* Skeleton while loading; neutral circle if no avatar; never a stock image */}
              {loadingCoach ? (
                <div className="h-36 w-36 animate-pulse rounded-full bg-neutral-200" />
              ) : coach?.avatar_url ? (
                <img
                  className="h-36 w-36 flex-none object-cover absolute"
                  src={coach.avatar_url}
                  alt={coach?.display_name ?? "Coach avatar"}
                />
              ) : (
                <div className="h-36 w-36 rounded-full bg-neutral-200" />
              )}
            </div>
            <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-6 pt-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-heading-2 font-heading-2 text-default-font">
                    {loadingCoach ? (
                      <span className="inline-block h-6 w-32 animate-pulse rounded bg-neutral-200" />
                    ) : (
                      coach?.display_name ?? "—"
                    )}
                  </span>
                  {!loadingCoach && (
                    <>
                      <Badge variant="success" icon={<FeatherShield />}>Verified Coach</Badge>
                      <Badge>Elite Level</Badge>
                    </>
                  )}
                </div>
              </div>
              <div className="flex w-full flex-wrap items-start gap-6">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-default-font">Total Sessions</span>
                  <span className="line-clamp-1 w-full text-caption font-caption text-brand-500">
                    {loadingSessions ? (
                      <span className="inline-block h-4 w-10 animate-pulse rounded bg-neutral-200" />
                    ) : (
                      String(coach?.bookings_count ?? 0)
                    )}
                  </span>
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-default-font">Success Rate</span>
                  <span className="line-clamp-1 w-full text-caption font-caption text-brand-600">94%</span>
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-default-font">Languages</span>
                  <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                    {loadingCoach ? (
                      <span className="inline-block h-4 w-24 animate-pulse rounded bg-neutral-200" />
                    ) : coach?.languages?.length ? (
                      coach.languages.join(", ")
                    ) : (
                      "—"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- TABS --- */}
        <div className="flex w-full items-end">
          <div className="flex h-px w-12 flex-none flex-col items-center gap-2 bg-neutral-200" />
          <Tabs>
            <Tabs.Item onClick={() => router.push(`${base}`)}>Dashboard</Tabs.Item>
            <Tabs.Item active={true}>Sessions</Tabs.Item>
            <Tabs.Item onClick={() => router.push(`${base}/reviews`)}>Reviews</Tabs.Item>
          </Tabs>
        </div>

        {/* --- Controls --- */}
        <div className="flex w-full items-end px-12 pt-4">
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

            <select
              className="ml-4 rounded-md border border-neutral-300 bg-default-background px-3 py-2"
              value={gameFilter}
              onChange={(e) => setGameFilter(e.target.value)}
            >
              <option value="">All Games</option>
              {Array.from(new Set(sessions.map((s) => (s.game || "").trim()).filter(Boolean)))
                .sort()
                .map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
            </select>

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

        {/* --- Body --- */}
        <div className="flex w-full grow flex-col gap-12 px-12 py-8 overflow-auto">
          {loadingCoach || loadingSessions ? (
            <div className="text-subtext-color">Loading sessions…</div>
          ) : !coach ? (
            <div className="text-error">Coach not found.</div>
          ) : (
            <>
              {/* Today’s Sessions (List view) */}
              {view === "list" && (
                <div className="flex w-full flex-col items-start gap-4">
                  <div className="flex w-full items-center justify-between">
                    <span className="text-heading-3 font-heading-3 text-default-font">Today&apos;s Sessions</span>
                  </div>

                  {filtered.filter((s) => (s.scheduled_time || "").slice(0, 10) === todayKey).length === 0 ? (
                    <div className="text-subtext-color">No sessions today.</div>
                  ) : (
                    <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-brand-primary bg-neutral-50 px-6 py-6">
                      {filtered
                        .filter((s) => (s.scheduled_time || "").slice(0, 10) === todayKey)
                        .map((s) => {
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

              {/* Past Sessions */}
              <div className="flex w-full flex-col items-start gap-4">
                <div className="flex w-full items-center justify-between">
                  <span className="text-heading-3 font-heading-3 text-default-font">Past Sessions</span>
                </div>

                <div className="w-full overflow-x-auto rounded-md border border-neutral-200">
                  <div className="min-w-[720px]">
                    <div className="grid grid-cols-7 gap-2 px-4 py-3 bg-neutral-50 text-subtext-color text-sm font-semibold">
                      <div>Date & Time</div>
                      <div>Student</div>
                      <div>Game</div>
                      <div>Duration</div>
                      <div>Status</div>
                      <div>Recording</div>
                      <div>Actions</div>
                    </div>

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