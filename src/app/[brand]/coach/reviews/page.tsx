"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import DefaultPageLayout from "@/ui/layouts/DefaultPageLayout";
import { createClient } from "@/utils/supabase/client";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";
import { Avatar } from "@/ui/components/Avatar";
import { brands } from "@/lib/brands";
import { Tabs } from "@/ui/components/Tabs";
import {
  FeatherShield,
  FeatherStar,
  FeatherSearch,
  FeatherFilter,
  FeatherMessageCircle,
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

type ReviewRow = {
  id: number | string;
  brand?: string | null;
  coach_id?: number | null;
  coach_name?: string | null;
  rating: number | null;
  comment?: string | null;
  created_at: string; // ISO
  student_name?: string | null;
  student_avatar?: string | null;
  session_id?: number | string | null;
};

export default function CoachReviewsPage() {
  const params = (useParams() as { brand?: string }) ?? {};
  const brandRaw = (params as { brand?: string | string[] }).brand;
  const brandKey = (Array.isArray(brandRaw) ? brandRaw[0] : brandRaw || "gameon").toLowerCase();

  const router = useRouter();
  const base = `/${brandKey}/coach`;

  const brandConfig = brands[brandKey as keyof typeof brands] || brands.gameon;
  const colors = (brandConfig.colors as any) || {};
  const backgroundColor = colors.pageBackground || colors.background || colors.primary || "#000000";

  const [authChecked, setAuthChecked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [coach, setCoach] = useState<Coach | null>(null);
  const [loadingCoach, setLoadingCoach] = useState(true);

  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState<number>(0);

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
        .select(
          "id, brand, display_name, title, is_active, avatar_url, languages, bookings_count"
        )
        .eq("auth_user_id", userId)
        .eq("is_active", true);

      if (brandKey) query = query.ilike("brand", brandKey);

      const { data, error } = await query.maybeSingle();

      if (!cancelled) {
        if (error || !data) {
          console.error("coach fetch error (reviews):", error?.message);
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
  }, [authChecked, userId, brandKey]);

  // Reviews by coach
  useEffect(() => {
    if (!coach?.id) return;

    let cancelled = false;
    (async () => {
      setLoadingReviews(true);

      // primary: by coach_id
      let { data: byId, error: errId } = await supabase
        .from("reviews")
        .select(
          "id, brand, coach_id, coach_name, rating, comment, created_at, student_name, student_avatar, session_id"
        )
        .eq("coach_id", coach.id)
        .order("created_at", { ascending: false });

      // fallback: by coach_name (demo rows)
      if ((!byId || !byId.length) && (coach.display_name || coach.title)) {
        const coachName = coach.display_name || coach.title || "";
        const { data: byName, error: errName } = await supabase
          .from("reviews")
          .select(
            "id, brand, coach_id, coach_name, rating, comment, created_at, student_name, student_avatar, session_id"
          )
          .ilike("coach_name", coachName)
          .order("created_at", { ascending: false });

        if (!cancelled) {
          if (errName) console.error("reviews fallback by name error:", errName?.message);
          setReviews(byName || []);
          setLoadingReviews(false);
        }
        return;
      }

      if (!cancelled) {
        if (errId) console.error("reviews by coach_id error:", errId?.message);
        setReviews(byId || []);
        setLoadingReviews(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [coach?.id, coach?.display_name, coach?.title]);

  // Filtering/search
  const filtered = useMemo(() => {
    let out = reviews.slice();

    if (brandKey) {
      out = out.filter((r) => !r.brand || r.brand.toLowerCase() === brandKey);
    }
    if (minRating > 0) {
      out = out.filter((r) => (r.rating ?? 0) >= minRating);
    }
    if (search) {
      const q = search.toLowerCase();
      out = out.filter(
        (r) =>
          (r.comment || "").toLowerCase().includes(q) ||
          (r.student_name || "").toLowerCase().includes(q)
      );
    }
    return out;
  }, [reviews, brandKey, minRating, search]);

  const avgRating =
    filtered.length > 0
      ? Math.round(
          (filtered.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / filtered.length) * 10
        ) / 10
      : null;

  // Guards
  if (!authChecked) {
    return (
      <DefaultPageLayout style={{ backgroundColor }}>
        <div className="p-6 text-subtext-color">Checking session…</div>
      </DefaultPageLayout>
    );
  }

  if (!userId) {
    return (
      <DefaultPageLayout style={{ backgroundColor }}>
        <div className="p-6">
          <p className="text-default-font">You must be logged in to view your Reviews.</p>
          <div className="mt-4">
            <Link href={`/login?next=${encodeURIComponent(base + "/reviews")}`}>
              <Button>Log in</Button>
            </Link>
          </div>
        </div>
      </DefaultPageLayout>
    );
  }

  return (
    <DefaultPageLayout style={{ backgroundColor }}>
      <div className="flex w-full flex-col items-start px-12 pt-24 pb-12 min-h-[60vh]">

        {/* --- HEADER: EXACT match with Dashboard --- */}
        <div className="flex w-full flex-col items-start gap-8 pb-6">
          <div className="flex w-full flex-wrap items-start gap-4">
            <div className="flex h-36 w-36 flex-none flex-col items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-100 relative">
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
            <div className="flex min-w-[160px] grow basis-0 flex-col gap-6 pt-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-heading-2 font-heading-2 text-default-font">
                    {loadingCoach ? (
                      <span className="inline-block h-6 w-32 animate-pulse rounded bg-neutral-200" />
                    ) : (
                      coach?.display_name ?? "—"
                    )}
                  </span>
                  <Badge variant="success" icon={<FeatherShield />}>Verified Coach</Badge>
                  <Badge>Elite Level</Badge>
                </div>
              </div>
              <div className="flex w-full flex-wrap items-start gap-6">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-default-font">Total Sessions</span>
                  <span className="line-clamp-1 w-full text-caption font-caption text-brand-500">
                    {loadingCoach ? (
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
                    ) : (
                      coach?.languages?.length ? coach.languages.join(", ") : "—"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- TABS: same as Dashboard/Sessions --- */}
        <div className="flex w-full items-end">
          <div className="flex h-px w-12 flex-none flex-col items-center gap-2 bg-neutral-200" />
          <Tabs>
            <Tabs.Item onClick={() => router.push(`${base}`)}>Dashboard</Tabs.Item>
            <Tabs.Item onClick={() => router.push(`${base}/sessions`)}>Sessions</Tabs.Item>
            <Tabs.Item active={true}>Reviews</Tabs.Item>
          </Tabs>
        </div>

        {/* --- Toolbar (filters/search) --- */}
        <div className="flex w-full items-end pt-4">
          <div className="flex h-px w-12 flex-none bg-neutral-200" />
          <div className="ml-4 flex items-center gap-3">
            <select
              className="rounded-md border border-neutral-300 bg-default-background px-3 py-2"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              aria-label="Minimum rating"
            >
              <option value={0}>All ratings</option>
              <option value={5}>5★ only</option>
              <option value={4}>4★ & up</option>
              <option value={3}>3★ & up</option>
              <option value={2}>2★ & up</option>
              <option value={1}>1★ & up</option>
            </select>

            <div className="ml-2 flex items-center gap-2">
              <input
                className="rounded-md border border-neutral-300 bg-default-background px-3 py-2"
                placeholder="Search reviews"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="neutral-secondary" icon={<FeatherSearch />}>Search</Button>
              <Button
                variant="neutral-secondary"
                icon={<FeatherFilter />}
                onClick={() => {
                  setSearch("");
                  setMinRating(0);
                }}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>

        {/* --- Body --- */}
        <div className="flex w-full flex-col gap-8 py-8">
          {loadingCoach || loadingReviews ? (
            <div className="text-subtext-color">Loading reviews…</div>
          ) : !coach ? (
            <div className="text-error">Coach not found.</div>
          ) : (
            <>
              {/* Summary */}
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-heading-3 font-heading-3 text-default-font">Reviews</span>
                  {avgRating != null ? (
                    <Badge variant="success" icon={<FeatherStar />}>
                      {avgRating.toFixed(1)} / 5
                    </Badge>
                  ) : null}
                  <Badge>{filtered.length} total</Badge>
                </div>
              </div>

              {/* List */}
              {filtered.length === 0 ? (
                <div className="text-subtext-color">No reviews yet.</div>
              ) : (
                <div className="flex w-full flex-col gap-4">
                  {filtered.map((r) => {
                    const when = new Date(r.created_at);
                    const dateStr = when.toLocaleDateString();
                    const stars = Math.max(0, Math.min(5, Math.round(Number(r.rating) || 0)));

                    return (
                      <div
                        key={String(r.id)}
                        className="flex w-full items-start gap-4 rounded-md border border-neutral-200 bg-neutral-50 px-6 py-5"
                      >
                        <Avatar size="small" image={r.student_avatar || undefined}>
                          {(r.student_name || "S")[0]}
                        </Avatar>
                        <div className="flex grow flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-body-bold text-default-font">
                              {r.student_name || "Student"}
                            </span>
                            <span className="text-caption text-subtext-color">• {dateStr}</span>
                            <span className="ml-2">
                              {"★★★★★☆☆☆☆☆".slice(5 - stars, 10 - stars)}
                            </span>
                            <Badge variant="neutral">{r.rating ?? "—"}★</Badge>
                          </div>
                          <div className="text-body text-default-font">
                            {r.comment || <span className="text-subtext-color">No comment.</span>}
                          </div>
                          {r.session_id ? (
                            <div className="mt-2">
                              <Button size="small" variant="neutral-secondary" icon={<FeatherMessageCircle />}>
                                View session notes
                              </Button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </DefaultPageLayout>
  );
}