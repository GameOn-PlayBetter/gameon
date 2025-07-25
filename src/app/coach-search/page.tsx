"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { FeatherUsers, FeatherSearch, FeatherChevronDown, FeatherTrendingUp, FeatherClock, FeatherHeart, FeatherStar, FeatherChevronLeft } from "@subframe/core";
import { TextField } from "@/ui/components/TextField";
import { ToggleGroup } from "@/ui/components/ToggleGroup";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import * as SubframeCore from "@subframe/core";
import { Button } from "@/ui/components/Button";
import { Slider } from "@/ui/components/Slider";
import { Avatar } from "@/ui/components/Avatar";
import { IconButton } from "@/ui/components/IconButton";
import { Badge } from "@/ui/components/Badge";
import { coachData } from "@/lib/coachData";

function CoachSearchPage() {
  return (
    <DefaultPageLayout>
      <div className="container max-w-none flex h-full w-full flex-col items-start gap-12 bg-default-background py-12">
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <div className="flex w-full max-w-[576px] flex-col items-center justify-center gap-6">
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <FeatherUsers className="text-heading-1 font-heading-1 text-default-font" />
              <span className="w-full text-heading-1 font-heading-1 text-default-font text-center">
                Find Your Perfect Coach
              </span>
              <span className="text-body font-body text-subtext-color text-center">
                Connect with expert coaches who can help you achieve your goals and unlock your potential.
              </span>
            </div>
            <TextField
              className="h-auto w-full flex-none"
              variant="filled"
              label=""
              helpText=""
              icon={<FeatherSearch />}
            >
              <TextField.Input
                placeholder="Search by name, expertise, or location"
                value=""
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
              />
            </TextField>
          </div>
        </div>

        <div className="flex w-full items-start gap-8">
          {/* Sidebar Filters */}
          <div className="flex w-64 flex-none flex-col items-start gap-4">
            <SubframeCore.DropdownMenu.Root>
              <SubframeCore.DropdownMenu.Trigger asChild={true}>
                <Button
                  className="h-8 w-full flex-none"
                  variant="neutral-secondary"
                  iconRight={<FeatherChevronDown />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Expertise
                </Button>
              </SubframeCore.DropdownMenu.Trigger>
              <SubframeCore.DropdownMenu.Portal>
                <SubframeCore.DropdownMenu.Content
                  side="bottom"
                  align="start"
                  sideOffset={4}
                  asChild={true}
                >
                  <DropdownMenu />
                </SubframeCore.DropdownMenu.Content>
              </SubframeCore.DropdownMenu.Portal>
            </SubframeCore.DropdownMenu.Root>

            <ToggleGroup
              className="h-auto w-full flex-none"
              value=""
              onValueChange={(value: string) => {}}
            >
              <ToggleGroup.Item icon={null} value="beginner">
                Beginner
              </ToggleGroup.Item>
              <ToggleGroup.Item icon={null} value="intermediate">
                Intermediate
              </ToggleGroup.Item>
              <ToggleGroup.Item icon={null} value="advanced">
                Advanced
              </ToggleGroup.Item>
            </ToggleGroup>

            <Slider label="Price Range" value={[0, 100]} onValueChange={() => {}} />

            <Button
              className="h-8 w-full flex-none"
              variant="neutral-outline"
              onClick={() => {}}
            >
              Clear Filters
            </Button>
          </div>

          {/* Coach Cards */}
          <div className="flex grow flex-col gap-4">
            {coachData.map((coach, index) => (
              <div key={index} className="flex items-center gap-4 rounded-lg bg-surface p-4 shadow-md">
                <Avatar size="md" src={coach.imageUrl} alt={coach.name} />
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">{coach.name}</span>
                  <span className="text-sm text-subtext-color">{coach.expertise}</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Badge>{coach.badge}</Badge>
                  <IconButton icon={<FeatherHeart />} onClick={() => {}} />
                </div>
              </div>
            ))}
            <div className="flex justify-between pt-4">
              <Button
                variant="brand-secondary"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Previous
              </Button>
              <Button
                variant="brand-secondary"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default CoachSearchPage;