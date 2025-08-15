"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import DefaultPageLayout from "@/ui/layouts/DefaultPageLayout";
import { Button } from "@/ui/components/Button";
import { Badge } from "@/ui/components/Badge";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { FeatherArrowLeft, FeatherCheckCircle } from "@subframe/core";

type CoachRow = {
  id: number | string;
  display_name: string | null;
  title: string;
  avatar_url: string;
  tokens_per_hour: number | number[] | Record<string, number> | string;
  timezones: string[] | null;
  languages: string[] | null;
  brand: string;
  specialty?: string | string[] | Record<string, any>;
  is_active: boolean;
};

const supabase = createClient();

function tokenRange(tph: number) {
  const min = Math.max(1, Math.round(tph * 0.8));
  const max = Math.max(min, Math.round(tph * 1.2));
  return `${min}–${max} tokens/hr`;
}

export default function CoachBookPage() {
  const { brand, id } = useParams() as { brand: string; id: string | number };
  let coachId: string | number = id;
  if (typeof id === "string" && !Number.isNaN(Number(id))) {
    coachId = Number(id);
  }

  const [coach, setCoach] = useState<CoachRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const searchParams = useSearchParams();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedRate, setSelectedRate] = useState<number | null>(null);

  useEffect(() => {
    if (coachId === null || coachId === undefined) return;
    if (typeof coachId === "number" && Number.isNaN(coachId)) return;
    if (typeof coachId === "string" && coachId.trim() === "") return;

    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("coaches")
        .select(
          `
          id, display_name, title, avatar_url, tokens_per_hour, timezones, languages, brand, specialty, is_active
        `
        )
        .eq("id", coachId)
        .ilike("brand", brand) // case-insensitive
        .single<CoachRow>();

      if (error || !data || !data.is_active) {
        setNotFound(true);
      } else {
        setCoach(data);
        // Initialize selected specialty/rate
        const pairs = normalizeSpecialtyRates((data as any).specialty, data.tokens_per_hour);
        const wanted = searchParams?.get("specialty") ?? null;
        if (pairs.length) {
          const match = wanted ? pairs.find(p => p.name.toLowerCase() === wanted.toLowerCase()) : null;
          const chosen = match || pairs[0];
          setSelectedSpecialty(chosen.name);
          setSelectedRate(chosen.rate);
        } else {
          setSelectedSpecialty(null);
          setSelectedRate(null);
        }
      }
      setLoading(false);
    })();
  }, [brand, coachId]);

  // Canonical storage format (preferred):
  // - specialty: string[]                      e.g., ["Advanced Makeup","Bridal"]
  // - tokens_per_hour: Record<string, number>  e.g., {"Advanced Makeup":80,"Bridal":95}
  function normalizeSpecialtyRates(
    specialtyVal: unknown,
    rateVal: unknown
  ): Array<{ name: string; rate: number }> {
    const out: Array<{ name: string; rate: number }> = [];
    const parseSpecialties = (v: unknown): string[] => {
      if (Array.isArray(v)) return v.map(x => String(x).trim()).filter(Boolean);
      if (typeof v === "string") {
        try {
          const maybe = JSON.parse(v);
          if (Array.isArray(maybe)) return maybe.map(x => String(x).trim()).filter(Boolean);
        } catch {}
        return v.split(",").map(s => s.trim()).filter(Boolean);
      }
      if (v && typeof v === "object") return Object.keys(v as any);
      return [];
    };
    const parseRates = (v: unknown): { map?: Record<string, number>; list?: number; arr?: number[] } => {
      if (typeof v === "number" && isFinite(v)) return { list: v };
      if (typeof v === "string") {
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
    const specialties = parseSpecialties((coach as any)?.specialty ?? specialtyVal);
    const rates = parseRates(rateVal);
    if (rates.map) {
      for (const [spec, rate] of Object.entries(rates.map)) out.push({ name: spec, rate });
      return out;
    }
    if (typeof rates.list === "number") {
      if (specialties.length) {
        for (const spec of specialties) out.push({ name: spec, rate: rates.list });
        return out;
      }
      if (typeof (coach as any)?.specialty === "string") {
        out.push({ name: (coach as any).specialty.trim(), rate: rates.list });
        return out;
      }
      out.push({ name: "Session", rate: rates.list });
      return out;
    }
    if (rates.arr && specialties.length) {
      const len = Math.min(specialties.length, rates.arr.length);
      for (let i = 0; i < len; i++) out.push({ name: specialties[i], rate: rates.arr[i] });
      if (specialties.length > len && rates.arr.length > 0) {
        const last = rates.arr[rates.arr.length - 1];
        for (let i = len; i < specialties.length; i++) out.push({ name: specialties[i], rate: last });
      }
      return out;
    }
    return out;
  }

  if (loading) {
    return (
      <DefaultPageLayout>
        <div className="p-8">Loading…</div>
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

  const name = coach.display_name || coach.title;
  const pairs = normalizeSpecialtyRates((coach as any)?.specialty, coach.tokens_per_hour);

  function brandThemeFor(brand: string) {
    const b = (brand || "").toLowerCase();
    const glowHex: Record<string, string> = {
      gameon: "#FF00C8",
      styleon: "#8B0000",
      fixon: "#FF9B6A",
      fiton: "#67CFFF",
      codeon: "#00FFC8",
      jamon: "#FF6A00",
      learnon: "#A56B2C",
      growon: "#4CAF50",
      cookon: "#FF914D",
      moneyon: "#FFFFFF",
    };
    return { glow: glowHex[b] ?? "#FFFFFF" };
  }
  const theme = brandThemeFor(coach.brand);

  const safePairs = pairs.length ? pairs : (() => {
    const specVal: any = (coach as any)?.specialty;
    const firstName = Array.isArray(specVal)
      ? String(specVal[0] ?? "Session")
      : typeof specVal === "string"
        ? (specVal.split(",")[0]?.trim() || "Session")
        : (specVal && typeof specVal === "object")
          ? (Object.keys(specVal)[0] || "Session")
          : "Session";
    const rateRaw: any = coach.tokens_per_hour as any;
    let rate: number | undefined;
    if (typeof rateRaw === "number" && isFinite(rateRaw)) rate = rateRaw;
    else if (typeof rateRaw === "string") { const n = Number(rateRaw); if (isFinite(n)) rate = n; }
    else if (Array.isArray(rateRaw)) { const n = Number(rateRaw[0]); if (isFinite(n)) rate = n; }
    else if (rateRaw && typeof rateRaw === "object") {
      const k = Object.keys(rateRaw)[0]; const n = Number(rateRaw[k as any]); if (isFinite(n)) rate = n;
    }
    return [{ name: firstName, rate: rate ?? 0 }];
  })();


  // Revert specialty chips inside this page to green background with pink text (no glow)
  const chipBgClass = "!bg-success-100 !border-success-200";
  const chipTextClass = "[&>span]:!text-pink-700";

  // Updated input/select classes for white text and visible placeholder
  const inputBaseClass = "rounded-md border border-neutral-border bg-default-background px-3 py-2 text-default-font placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-pink-500";

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start">
        <div className="container max-w-none flex w-full grow flex-col items-center gap-6 bg-default-background py-12 overflow-auto">
          <div
            className="w-full max-w-[880px] flex flex-col gap-6 rounded-xl border-2 bg-default-background p-6 md:p-8"
            style={{
              borderColor: theme.glow,
              boxShadow: `0 0 14px ${theme.glow}, 0 0 28px ${theme.glow}B3, 0 0 54px ${theme.glow}80, inset 0 0 10px ${theme.glow}66`
            }}
          >
            {/* Header summary */}
            <div className="flex items-center gap-4">
              <img
                src={coach.avatar_url || "/default-avatar.png"}
                alt={name}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-heading-2 font-heading-2">{name}</span>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge size="lg" className={`${chipBgClass} ${chipTextClass}`}>
                    {coach.brand}
                  </Badge>
                  {selectedSpecialty ? (
                    <Badge size="lg" className={`${chipBgClass} ${chipTextClass}`}>
                      {selectedSpecialty}
                    </Badge>
                  ) : null}
                  {coach.languages?.map((l, i) => (
                    <Badge key={i} size="lg" className={`${chipBgClass} ${chipTextClass}`}>
                      {l}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Session Rates */}
            <div className="flex flex-col gap-2">
              <span className="text-heading-3 font-heading-3">Session Rates</span>
              <div className="flex items-center gap-3 rounded-md border border-neutral-border bg-neutral-50 p-3">
                {pairs.length > 1 ? (
                  <select
                    className={`${inputBaseClass} min-w-[220px] disabled:opacity-100 disabled:cursor-default`}
                    value={selectedSpecialty ?? (safePairs[0]?.name ?? "")}
                    onChange={(e) => {
                      const next = e.target.value;
                      setSelectedSpecialty(next);
                      const found = safePairs.find(p => p.name.toLowerCase() === next.toLowerCase());
                      setSelectedRate(found ? found.rate : null);
                    }}
                    disabled={safePairs.length === 1}
                  >
                    {safePairs.map((p, i) => (
                      <option key={i} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                ) : (
                  <div
                    className={`${inputBaseClass} min-w-[220px] flex items-center`}
                    style={{ pointerEvents: "none" }}
                  >
                    {safePairs[0]?.name ?? ""}
                  </div>
                )}
                {selectedRate != null ? (
                  <Badge size="lg" className={`${chipBgClass} ${chipTextClass}`}>
                    {selectedRate} tokens/hr
                  </Badge>
                ) : null}
              </div>
            </div>

            {/* Booking widgets (stub) */}
            <div className="flex flex-col gap-4">
              <span className="text-heading-3 font-heading-3">Select a time</span>
              <div className="rounded-md border border-neutral-border p-4">
                <div className="text-subtext-color text-body">
                  Calendar integration goes here.
                </div>
              </div>

              <span className="text-heading-3 font-heading-3">Session details</span>
              <textarea
                className={`${inputBaseClass} w-full resize-none bg-default-background`}
                placeholder="What do you want help with?"
                rows={5}
              />

            </div>

            <div className="flex justify-end gap-3 border-t border-neutral-border pt-4">
              <Link href={`/${brand}/coach/${coach.id}`}>
                <Button variant="neutral-secondary" icon={<FeatherArrowLeft />}>
                  Back to Coach
                </Button>
              </Link>
              <Button icon={<FeatherCheckCircle />} disabled={!selectedSpecialty} data-specialty={selectedSpecialty || undefined}>
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}