"use client";

import React from "react";
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
import { coachData } from "@/lib/coachData";
import { FeatherChevronRight } from "@subframe/core";

function CoachSearchPage() {
  return (
    <DefaultPageLayout>
      {/* DO NOT CHANGE ANYTHING BELOW THIS LINE */}
      <div className="container max-w-none flex h-full w-full flex-col items-start gap-12 bg-default-background py-12">
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <div className="flex w-full max-w-[576px] flex-col items-center justify-center gap-6">
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <div className="flex w-full flex-col items-start gap-2">
                <div className="text-sm font-medium leading-[18px] text-default-500">
                  Search
                </div>
                <TextField
                  startIcon={<FeatherSearch />}
                  placeholder="e.g. Elden Ring, speedrun, beginner"
                />
              </div>
              <div className="flex w-full flex-row items-start gap-2">
                <DropdownMenu />
                <ToggleGroup
                  className="h-auto w-full flex-none"
                  value=""
                  onValueChange={(value: string) => {}}
                >
                  <ToggleGroup.Item icon={null} value="2dd43e21">
                    Beginner
                  </ToggleGroup.Item>
                  <ToggleGroup.Item icon={null} value="2fa39891">
                    Intermediate
                  </ToggleGroup.Item>
                  <ToggleGroup.Item icon={null} value="57b99147">
                    Expert
                  </ToggleGroup.Item>
                </ToggleGroup>
              </div>
            </div>
          </div>
          <div className="flex w-full max-w-[576px] flex-col items-start gap-2">
            {coachData.map((coach) => (
              <div
                key={coach.name}
                className="flex w-full flex-col items-start gap-2 rounded-xl border border-default-border bg-default-background p-4 shadow-sm"
              >
                <div className="flex flex-row items-center gap-2">
                  <Avatar size="md" src={coach.avatar} />
                  <div className="flex flex-col items-start gap-0">
                    <div className="text-sm font-semibold leading-[18px] text-default-foreground">
                      {coach.name}
                    </div>
                    <div className="text-xs font-normal leading-[16px] text-default-500">
                      {coach.tagline}
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-row items-center justify-between gap-2">
                  <div className="flex flex-row items-center gap-1">
                    <Badge size="sm" color="gray" icon={<FeatherStar />}>
                      {coach.rating}
                    </Badge>
                    <Badge size="sm" color="gray" icon={<FeatherClock />}>
                      {coach.duration}
                    </Badge>
                    <Badge size="sm" color="gray" icon={<FeatherTrendingUp />}>
                      {coach.experience}
                    </Badge>
                  </div>
                  <IconButton size="md" icon={<FeatherHeart />} />
                </div>
                <Button iconRight={<FeatherChevronRight />}>
                  View Profile
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default CoachSearchPage;