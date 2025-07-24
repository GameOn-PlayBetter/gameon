"use client";

import React, { useState } from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { FeatherUsers } from "@subframe/core";
import { TextField } from "@/ui/components/TextField";
import { FeatherSearch } from "@subframe/core";
import { ToggleGroup } from "@/ui/components/ToggleGroup";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import * as SubframeCore from "@subframe/core";
import { Button } from "@/ui/components/Button";
import { FeatherChevronDown } from "@subframe/core";
import { Slider } from "@/ui/components/Slider";
import { FeatherTrendingUp } from "@subframe/core";
import { FeatherClock } from "@subframe/core";
import { Avatar } from "@/ui/components/Avatar";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherHeart } from "@subframe/core";
import { Badge } from "@/ui/components/Badge";
import { FeatherStar } from "@subframe/core";
import { FeatherChevronLeft } from "@subframe/core";
import { emojiTagMap } from "@/lib/emojiTagMap";
import { coachData } from "@/lib/coachData";
import { FeatherChevronRight } from "@subframe/core";

function CoachSearchPage() {
  return (
    <>
      {/* Glowing "DEMO DATA ONLY" banner */}
      <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 bg-red-600 px-6 py-2 rounded-md shadow-lg shadow-red-400 pointer-events-none">
        <span className="font-[Orbitron] text-white text-[16px] font-bold tracking-widest uppercase drop-shadow-[0_0_6px_#ffffff]">
          DEMO DATA ONLY
        </span>
      </div>

      <DefaultPageLayout>
        <div className="container max-w-none flex h-full w-full flex-col items-start gap-12 bg-default-background py-12">
          <div className="flex w-full flex-col items-center justify-center gap-6">
            <div className="flex w-full max-w-[576px] flex-col items-center justify-center gap-6">
              <div className="flex w-full flex-col items-center justify-center gap-2">
                <FeatherUsers className="text-heading-1 font-heading-1 text-default-font" />
                <span className="w-full text-heading-1 font-heading-1 text-default-font text-center">
                  Find Your Perfect Coach
                </span>
              </div>
              <TextField
  icon={FeatherSearch}
  placeholder="Search by name, tag, or game..."
/>
              <div className="flex w-full flex-col gap-4">
                <span className="text-default-font text-xs font-semibold uppercase tracking-wide">
                  Filter by tag
                </span>
                <ToggleGroup
                  options={Object.entries(emojiTagMap).map(([key, label]) => ({
                    id: key,
                    label,
                  }))}
                  multiple
                />
              </div>
              <div className="flex w-full flex-col gap-4">
                <span className="text-default-font text-xs font-semibold uppercase tracking-wide">
                  Sort
                </span>
                <DropdownMenu
                  options={[
                    {
                      label: "Trending",
                      value: "trending",
                      icon: FeatherTrendingUp,
                    },
                    {
                      label: "Duration (asc)",
                      value: "duration-asc",
                      icon: FeatherClock,
                    },
                    {
                      label: "Duration (desc)",
                      value: "duration-desc",
                      icon: FeatherClock,
                    },
                  ]}
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <span className="text-default-font text-xs font-semibold uppercase tracking-wide">
                  Minimum Rating
                </span>
                <Slider
  icon={FeatherStar}
  value={Number(starRatingFilter)}
  onValueChange={(value) => setStarRatingFilter(String(value))}
/>
              </div>
            </div>
          </div>

          {/* Coach List */}
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coachData.map((coach) => (
              <div
                key={coach.id}
                className="flex w-full flex-col items-start gap-4 rounded-xl bg-surface-primary p-4"
              >
                <div className="flex w-full items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar size="md" imageUrl={coach.imageUrl} />
                    <div className="flex flex-col">
                      <span className="text-default-font text-sm font-semibold">
                        {coach.name}
                      </span>
                      <span className="text-subtext text-xs">{coach.game}</span>
                    </div>
                  </div>
                  <IconButton
  icon={FeatherHeart}
  variant="ghost"
  className="text-default-font"
/>
                </div>
 <div className="flex flex-wrap gap-2">
  {coach.tags.map((tag) => (
    <Badge key={tag} size="sm">
      {`${String(emojiTagMap[tag] || "")} ${tag}`}
    </Badge>
  ))}
</div>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1">
                    <FeatherStar className="w-4 h-4 text-yellow-400" />
                    <span className="text-default-font text-sm">
                      {coach.rating.toFixed(1)}
                    </span>
                  </div>
                  <Button
                    rightIcon={FeatherChevronRight />}
                    size="sm"
                    variant="primary"
                  >
                    Book
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DefaultPageLayout>
    </>
  );
}

export default CoachSearchPage;