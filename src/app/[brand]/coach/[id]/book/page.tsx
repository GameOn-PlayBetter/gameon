"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DefaultPageLayout from "@/ui/layouts/DefaultPageLayout";
import { Button } from "@/ui/components/Button";
import { Badge } from "@/ui/components/Badge";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { FeatherArrowLeft, FeatherCheckCircle } from "@subframe/core";

type CoachRow = {
  id: number;
  display_name: string | null;
  title: string;
  avatar_url: string;
  tokens_per_hour: number;
  timezones: string[] | null;
  languages: string[] | null;
  brand: string;
  is_active: boolean;
};

const supabase = createClient();

function tokenRange(tph: number) {
  const min = Math.max(1, Math.round(tph * 0.8));
  const max = Math.max(min, Math.round(tph * 1.2));
  return `${min}–${max} tokens/hr`;
}

export default function CoachBookPage() {
  const { brand, id } = useParams() as { brand: string; id: string };
  const coachId = Number(id);

  const [coach, setCoach] = useState<CoachRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!coachId || Number.isNaN(coachId)) return;

    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("coaches")
        .select(
          `
          id, display_name, title, avatar_url, tokens_per_hour, timezones, languages, brand, is_active
        `
        )
        .eq("id", coachId)
        .ilike("brand", brand) // case-insensitive
        .single<CoachRow>();

      if (error || !data || !data.is_active) {
        setNotFound(true);
      } else {
        setCoach(data);
      }
      setLoading(false);
    })();
  }, [brand, coachId]);

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

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start">
        <div className="container max-w-none flex w-full grow flex-col items-center gap-6 bg-default-background py-12 overflow-auto">
          <div className="w-full max-w-[880px] flex flex-col gap-6 rounded-md border border-neutral-border bg-default-background p-6">
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
                  <Badge variant="brand">{coach.brand}</Badge>
                  <Badge>{tokenRange(coach.tokens_per_hour)}</Badge>
                  {coach.timezones?.[0] ? (
                    <Badge variant="neutral">{coach.timezones[0]}</Badge>
                  ) : null}
                </div>
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
                className="w-full rounded-md border border-neutral-border bg-default-background p-3"
                placeholder="What do you want help with?"
                rows={5}
              />

              <div className="flex flex-wrap items-center gap-2">
                {coach.languages?.map((l, i) => (
                  <Badge key={i} variant="neutral">
                    {l}
                  </Badge>
                ))}
              </div>
            </div>

<div className="flex justify-end gap-3">
  <Link href={`/${brand}/coach/${coach.id}`}>
    <Button variant="neutral-secondary" icon={<FeatherArrowLeft />}>
      Back to Coach
    </Button>
  </Link>
              <Button icon={<FeatherCheckCircle />}>Confirm Booking</Button>
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}