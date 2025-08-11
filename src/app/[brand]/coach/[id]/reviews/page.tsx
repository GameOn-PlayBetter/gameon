"use client";

import React, { useEffect, useState } from "react";
import DefaultPageLayout from "@/ui/layouts/DefaultPageLayout";
import { Tabs } from "@/ui/components/Tabs";
import { Select } from "@/ui/components/Select";
import { Table } from "@/ui/components/Table";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";
import { Avatar } from "@/ui/components/Avatar";
import { IconButton } from "@/ui/components/IconButton";
import { TextField } from "@/ui/components/TextField";
import {
  FeatherCheck,
  FeatherClock,
  FeatherEdit2,
  FeatherEye,
  FeatherFlag,
  FeatherGift,
  FeatherShield,
} from "@subframe/core";
import { Alert } from "@/ui/components/Alert";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type CoachFromDB = {
  id: number;
  display_name: string | null;
  rating: number | null;
  num_reviews: number | null;
};

const supabase = createClient();

export default function CoachReviewsPage() {
  const { brand, id } = useParams() as { brand: string; id: string };
  const coachId = Number(id);

  const [coach, setCoach] = useState<CoachFromDB | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!coachId || Number.isNaN(coachId)) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("coaches")
        .select("id, display_name, rating, num_reviews")
        .eq("id", coachId)
        .maybeSingle();

      if (!cancelled) {
        if (error) {
          console.error("coach fetch (reviews):", error.message);
          setCoach(null);
        } else {
          setCoach((data as CoachFromDB) || null);
        }
        setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [coachId]);

  const avgRating =
    coach?.rating !== null && coach?.rating !== undefined
      ? `${Number(coach.rating).toFixed(1)}/5.0`
      : "4.9/5.0";

  const totalReviews =
    coach?.num_reviews !== null && coach?.num_reviews !== undefined
      ? coach.num_reviews
      : 156;

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start bg-default-background">
        {/* Tabs row (Reviews active). No duplicate profile header here. */}
        <div className="flex w-full items-end px-12 pt-8">
          <div className="flex h-px w-12 flex-none bg-neutral-200" />
          <Tabs>
            <Tabs.Item>Dashboard</Tabs.Item>
            <Tabs.Item>Sessions</Tabs.Item>
            <Tabs.Item active={true}>Reviews</Tabs.Item>
          </Tabs>
        </div>

        <div className="flex w-full grow items-start gap-6 px-12 py-12 overflow-auto">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6">
            {/* Top stats (dynamic where possible) */}
            <div className="flex w-full flex-wrap items-start gap-6">
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                <span className="text-body-bold font-body-bold text-default-font">
                  Average Rating
                </span>
                <span className="line-clamp-1 w-full text-caption font-caption text-brand-500">
                  {loading ? "…" : avgRating}
                </span>
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                <span className="text-body-bold font-body-bold text-default-font">
                  Total Reviews
                </span>
                <span className="line-clamp-1 w-full text-caption font-caption text-brand-600">
                  {loading ? "…" : totalReviews}
                </span>
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                <span className="text-body-bold font-body-bold text-default-font">
                  Response Rate
                </span>
                <span className="line-clamp-1 w-full text-caption font-caption text-success-600">
                  98%
                </span>
              </div>
            </div>

            {/* Promo / info – static placeholder */}
            <Alert
              variant="brand"
              icon={<FeatherGift />}
              title="Review Tips"
              description="Give specific, actionable feedback to help your students improve."
              actions={<IconButton icon={<FeatherShield />} />}
            />

            {/* Reviews to Submit – static demo rows for now */}
            <div className="flex w-full items-center justify-between">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Reviews to Submit
              </span>
              <Select className="w-48" placeholder="All Games" value={undefined} onValueChange={() => {}}>
                <Select.Item value="minecraft">Minecraft</Select.Item>
                <Select.Item value="dbd">Dead By Daylight</Select.Item>
              </Select>
            </div>

            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-brand-primary bg-neutral-50 px-6 py-6">
                <div className="flex w-full items-center gap-4">
                  <Avatar
                    size="large"
                    image="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80"
                  >
                    J
                  </Avatar>
                  <div className="flex flex-col items-start gap-1 grow">
                    <div className="flex items-center gap-2">
                      <span className="text-heading-3 font-heading-3 text-default-font">
                        John Chen
                      </span>
                      <Badge>Minecraft</Badge>
                      <Badge variant="warning" icon={<FeatherClock />}>
                        Review Due
                      </Badge>
                    </div>
                    <span className="text-body font-body text-subtext-color">
                      60 min session completed on Mar 15, 2024
                    </span>
                  </div>
                  <Button icon={<FeatherEdit2 />}>Write Review</Button>
                </div>
              </div>
            </div>

            {/* Past Reviews – table stays static for now */}
            <div className="flex w-full items-center justify-between">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Past Reviews
              </span>
            </div>

            <Table
              header={
                <Table.HeaderRow>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell>Student</Table.HeaderCell>
                  <Table.HeaderCell>Game</Table.HeaderCell>
                  <Table.HeaderCell>Rating</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.HeaderRow>
              }
            >
              <Table.Row>
                <Table.Cell>
                  <span className="text-body font-body text-default-font">
                    Mar 14, 2024
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Avatar
                      size="small"
                      image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80"
                    >
                      S
                    </Avatar>
                    <span className="text-body font-body text-default-font">
                      Sarah Miller
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge>Dead By Daylight</Badge>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="success">5.0</Badge>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="success" icon={<FeatherCheck />}>
                    Published
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="neutral-secondary"
                      size="small"
                      icon={<FeatherEdit2 />}
                    >
                      Edit
                    </Button>
                    <IconButton size="small" icon={<FeatherEye />} />
                    <IconButton size="small" icon={<FeatherFlag />} />
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table>
          </div>

          {/* Right column: Write Review – static UI for now */}
          <div className="flex w-px flex-none self-stretch bg-neutral-border" />
          <div className="flex w-[400px] flex-none flex-col items-start gap-6 px-6">
            <span className="text-heading-3 font-heading-3 text-default-font">
              Write Review
            </span>
            <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6">
              <div className="flex w-full items-center gap-4">
                <Avatar
                  size="large"
                  image="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80"
                >
                  J
                </Avatar>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-heading-3 font-heading-3 text-default-font">
                    John Chen
                  </span>
                  <span className="text-body font-body text-subtext-color">
                    Minecraft Session
                  </span>
                </div>
              </div>

              <div className="flex w-full flex-col items-start gap-4">
                <span className="text-body-bold font-body-bold text-default-font">
                  Overall Rating
                </span>
                <div className="flex items-center gap-2">
                  <IconButton icon={<FeatherShield />} />
                  <IconButton icon={<FeatherShield />} />
                  <IconButton icon={<FeatherShield />} />
                  <IconButton icon={<FeatherShield />} />
                  <IconButton icon={<FeatherShield />} />
                </div>
              </div>

              <div className="flex w-full flex-col items-start gap-4">
                <span className="text-body-bold font-body-bold text-default-font">
                  Feedback
                </span>
                <TextField variant="filled" label="" helpText="Provide detailed feedback about the student's performance">
                  <TextField.Input placeholder="Write your review..." />
                </TextField>
              </div>

              <div className="flex w-full flex-col items-start gap-4">
                <span className="text-body-bold font-body-bold text-default-font">
                  Areas for Improvement
                </span>
                <div className="flex w-full flex-wrap items-start gap-2">
                  <Badge variant="neutral">Game Mechanics</Badge>
                  <Badge variant="neutral">Strategy</Badge>
                  <Badge variant="neutral">Communication</Badge>
                  <Badge variant="neutral">Teamwork</Badge>
                </div>
              </div>

              <div className="flex w-full items-center gap-2">
                <Button variant="neutral-secondary" icon={<FeatherCheck />}>
                  Save Draft
                </Button>
                <Button icon={<FeatherCheck />}>Publish Review</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}