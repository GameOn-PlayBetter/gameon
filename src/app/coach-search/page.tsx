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

function CoachSearchPage() {
  return (
    <DefaultPageLayout>
      <>
        {/* Glowing "DEMO DATA ONLY" banner */}
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 bg-red-600 px-6 py-2 rounded-md shadow-lg shadow-red-400 pointer-events-none">
          <span className="font-['Orbitron'] text-white text-[16px] font-bold tracking-widest uppercase drop-shadow-[0_0_6px_#ffffff]">
            DEMO DATA ONLY
          </span>
        </div>
        <div className="container max-w-none flex h-full w-full flex-col items-start gap-12 bg-default-background py-12">
          <div className="flex w-full flex-col items-center justify-center gap-6">
            <div className="flex w-full max-w-[576px] flex-col items-center justify-center gap-6">
              <div className="flex w-full flex-col items-center justify-center gap-2">
                <FeatherUsers className="text-heading-1 font-heading-1 text-default-font" />
                <span className="w-full text-heading-1 font-heading-1 text-default-font text-center">
                  Find Your Perfect Coach
                </span>
                <span className="text-body font-body text-subtext-color text-center">
                  Connect with expert coaches who can help you achieve your goals
                  and unlock your potential.
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
                    <DropdownMenu>
                      <ToggleGroup
                        className="h-auto w-full flex-none"
                        value=""
                        onValueChange={(value: string) => {}}
                      >
                        <ToggleGroup.Item icon={null} value="14c00a3b">
                          Coaching
                        </ToggleGroup.Item>
                        <ToggleGroup.Item icon={null} value="092fe2b9">
                          Speedrunning
                        </ToggleGroup.Item>
                        <ToggleGroup.Item icon={null} value="534f6adc">
                          Gear Builds
                        </ToggleGroup.Item>
                        <ToggleGroup.Item icon={null} value="deeda2d8">
                          Support Play
                        </ToggleGroup.Item>
                      </ToggleGroup>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>
              <SubframeCore.DropdownMenu.Root>
                <SubframeCore.DropdownMenu.Trigger asChild={true}>
                  <Button
                    className="h-8 w-full flex-none"
                    variant="neutral-secondary"
                    iconRight={<FeatherChevronDown />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Experience Level
                  </Button>
                </SubframeCore.DropdownMenu.Trigger>
                <SubframeCore.DropdownMenu.Portal>
                  <SubframeCore.DropdownMenu.Content
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    asChild={true}
                  >
                    <DropdownMenu>
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
                        <ToggleGroup.Item icon={null} value="f8ad547b">
                          Expert
                        </ToggleGroup.Item>
                      </ToggleGroup>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>

              <SubframeCore.DropdownMenu.Root>
                <SubframeCore.DropdownMenu.Trigger asChild={true}>
                  <Button
                    className="h-8 w-full flex-none"
                    variant="neutral-secondary"
                    iconRight={<FeatherChevronDown />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Price Range
                  </Button>
                </SubframeCore.DropdownMenu.Trigger>
                <SubframeCore.DropdownMenu.Portal>
                  <SubframeCore.DropdownMenu.Content
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    asChild={true}
                  >
                    <DropdownMenu>
                      <div className="flex w-full flex-col items-start gap-4 px-4 py-4">
                        <Slider
                          value={[]}
                          onValueChange={(value: number[]) => {}}
                          onValueCommit={(value: number[]) => {}}
                        />
                        <div className="flex w-full items-center justify-between">
                          <TextField
                            className="h-auto w-24 flex-none"
                            label=""
                            helpText=""
                          >
                            <TextField.Input
                              placeholder="$0"
                              value=""
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                            />
                          </TextField>
                          <TextField
                            className="h-auto w-24 flex-none"
                            label=""
                            helpText=""
                          >
                            <TextField.Input
                              placeholder="$500"
                              value=""
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                            />
                          </TextField>
                        </div>
                      </div>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>
            </div>
            <div className="flex grow flex-col items-start gap-6">
              <div className="flex w-full items-center justify-between">
                <span className="text-label font-label text-default-font">
                  8 coaches found
                </span>
                <DropdownMenu>
                  <SubframeCore.DropdownMenu.Trigger asChild={true}>
                    <Button
                      className="h-8 flex-none"
                      variant="neutral-secondary"
                      iconRight={<FeatherChevronDown />}
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                    >
                      Sort by
                    </Button>
                  </SubframeCore.DropdownMenu.Trigger>
                  <SubframeCore.DropdownMenu.Content
                    side="bottom"
                    align="end"
                    sideOffset={4}
                    asChild={true}
                  >
                    <DropdownMenu>
                      <DropdownMenu.Item icon={<FeatherTrendingUp />}>
                        Popularity
                      </DropdownMenu.Item>
                      <DropdownMenu.Item icon={<FeatherClock />}>
                        Availability
                      </DropdownMenu.Item>
                      <DropdownMenu.Item icon={<FeatherChevronDown />}>
                        Price: Low to High
                      </DropdownMenu.Item>
                      <DropdownMenu.Item icon={<FeatherChevronDown />}>
                        Price: High to Low
                      </DropdownMenu.Item>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </DropdownMenu>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {coachData.map((coach, index) => (
                  <div
                    key={index}
                    className="flex w-full flex-col items-start gap-4 rounded-xl border border-solid border-[#262626] bg-[#0F0F0F] px-6 py-6"
                  >
                    <div className="flex w-full items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar size="md" src={coach.avatar} />
                        <div className="flex flex-col">
                          <span className="text-label font-label text-white">
                            {coach.name}
                          </span>
                          <span className="text-label font-label text-subtext-color">
                            {coach.expertise}
                          </span>
                        </div>
                      </div>
                      <IconButton
                        size="md"
                        variant="ghost"
                        icon={<FeatherHeart />}
                        onClick={() => {}}
                      />
                    </div>
                    <div className="flex w-full items-center gap-2">
                      {coach.tags.map((tag, i) => (
                        <Badge key={i} size="sm" variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <span className="text-label font-label text-white">
                        {coach.price} tokens/hr
                      </span>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <FeatherStar className="h-4 w-4" />
                        <span className="text-label font-label">{coach.rating}</span>
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      variant="primary"
                      onClick={() => {}}
                    >
                      View Profile
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default CoachSearchPage;// force rebuild
// force touch
