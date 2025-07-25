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
                  <DropdownMenu />
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
                      <ToggleGroup.Item icon={null} value="f8ad547b">
                        Expert
                      </ToggleGroup.Item>
                    </ToggleGroup>
                  
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
                  <DropdownMenu />
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
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {}}
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
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {}}
                          />
                        </TextField>
                      </div>
                    </div>
                  
                </SubframeCore.DropdownMenu.Content>
              </SubframeCore.DropdownMenu.Portal>
            </SubframeCore.DropdownMenu.Root>
          </div>
          <div className="flex flex-col items-start gap-6 grow">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <SubframeCore.DropdownMenu.Root>
                  <SubframeCore.DropdownMenu.Trigger asChild={true}>
                    <Button
                      variant="neutral-secondary"
                      iconRight={<FeatherChevronDown />}
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {}}
                    >
                      Sort by: Most Relevant
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
                        <DropdownMenu.DropdownItem icon={<FeatherTrendingUp />}>
                          Most Relevant
                        </DropdownMenu.DropdownItem>
                        <DropdownMenu.DropdownItem>
                          Top Rated
                        </DropdownMenu.DropdownItem>
                        <DropdownMenu.DropdownItem icon={<FeatherClock />}>
                          Recently Active
                        </DropdownMenu.DropdownItem>
                      
                    </SubframeCore.DropdownMenu.Content>
                  </SubframeCore.DropdownMenu.Portal>
                </SubframeCore.DropdownMenu.Root>
              </div>
              <span className="text-body font-body text-subtext-color">
                24 coaches found
              </span>
            </div>
            <div className="w-full items-start gap-4 grid grid-cols-3">
              <div className="flex flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-4">
                <div className="flex w-full items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar
                      size="large"
                      image="https://images.unsplash.com/photo-1560250097-0b93528c311a"
                    >
                      D
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-heading-3 font-heading-3 text-default-font">
                        David Chen
                      </span>
                      <span className="text-body font-body text-subtext-color">
                        Career Coach
                      </span>
                    </div>
                  </div>
                  <IconButton
                    icon={<FeatherHeart />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                </div>
                <div className="flex flex-wrap items-start gap-2">
                  <Badge>Leadership</Badge>
                  <Badge>Career Growth</Badge>
                </div>
                <span className="text-body font-body text-default-font">
                  15+ years helping professionals navigate career transitions
                  and advance in tech leadership roles.
                </span>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-1">
                    <FeatherStar className="text-body font-body text-default-font" />
                    <span className="text-body-bold font-body-bold text-default-font">
                      4.9
                    </span>
                    <span className="text-body font-body text-subtext-color">
                      (124)
                    </span>
                  </div>
                  <span className="text-body-bold font-body-bold text-default-font">
                    $150/hr
                  </span>
                </div>
                <Button
                  className="h-8 w-full flex-none"
                  variant="brand-secondary"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  View Profile
                </Button>
              </div>
              <div className="flex flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-4">
                <div className="flex w-full items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar
                      size="large"
                      image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
                    >
                      S
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-heading-3 font-heading-3 text-default-font">
                        Sarah Johnson
                      </span>
                      <span className="text-body font-body text-subtext-color">
                        Business Coach
                      </span>
                    </div>
                  </div>
                  <IconButton
                    icon={<FeatherHeart />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                </div>
                <div className="flex flex-wrap items-start gap-2">
                  <Badge>Entrepreneurship</Badge>
                  <Badge>Strategy</Badge>
                </div>
                <span className="text-body font-body text-default-font">
                  Experienced business strategist helping entrepreneurs scale
                  their companies and optimize operations.
                </span>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-1">
                    <FeatherStar className="text-body font-body text-default-font" />
                    <span className="text-body-bold font-body-bold text-default-font">
                      4.8
                    </span>
                    <span className="text-body font-body text-subtext-color">
                      (89)
                    </span>
                  </div>
                  <span className="text-body-bold font-body-bold text-default-font">
                    $200/hr
                  </span>
                </div>
                <Button
                  className="h-8 w-full flex-none"
                  variant="brand-secondary"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  View Profile
                </Button>
              </div>
              <div className="flex flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-4">
                <div className="flex w-full items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar
                      size="large"
                      image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7"
                    >
                      M
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-heading-3 font-heading-3 text-default-font">
                        Michael Torres
                      </span>
                      <span className="text-body font-body text-subtext-color">
                        Life Coach
                      </span>
                    </div>
                  </div>
                  <IconButton
                    icon={<FeatherHeart />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                </div>
                <div className="flex flex-wrap items-start gap-2">
                  <Badge>Personal Growth</Badge>
                  <Badge>Mindfulness</Badge>
                </div>
                <span className="text-body font-body text-default-font">
                  Dedicated to helping individuals find purpose, balance, and
                  fulfillment in their personal and professional lives.
                </span>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-1">
                    <FeatherStar className="text-body font-body text-default-font" />
                    <span className="text-body-bold font-body-bold text-default-font">
                      5.0
                    </span>
                    <span className="text-body font-body text-subtext-color">
                      (156)
                    </span>
                  </div>
                  <span className="text-body-bold font-body-bold text-default-font">
                    $175/hr
                  </span>
                </div>
                <Button
                  className="h-8 w-full flex-none"
                  variant="brand-secondary"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  View Profile
                </Button>
              </div>
              <div className="flex flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-4">
                <div className="flex w-full items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar
                      size="large"
                      image="https://images.unsplash.com/photo-1580489944761-15a19d654956"
                    >
                      R
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-heading-3 font-heading-3 text-default-font">
                        Rachel Kim
                      </span>
                      <span className="text-body font-body text-subtext-color">
                        Executive Coach
                      </span>
                    </div>
                  </div>
                  <IconButton
                    icon={<FeatherHeart />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                </div>
                <div className="flex flex-wrap items-start gap-2">
                  <Badge>Leadership</Badge>
                  <Badge>Executive</Badge>
                </div>
                <span className="text-body font-body text-default-font">
                  Empowering executives and leaders to develop their potential
                  and drive organizational success.
                </span>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-1">
                    <FeatherStar className="text-body font-body text-default-font" />
                    <span className="text-body-bold font-body-bold text-default-font">
                      4.9
                    </span>
                    <span className="text-body font-body text-subtext-color">
                      (201)
                    </span>
                  </div>
                  <span className="text-body-bold font-body-bold text-default-font">
                    $250/hr
                  </span>
                </div>
                <Button
                  className="h-8 w-full flex-none"
                  variant="brand-secondary"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  View Profile
                </Button>
              </div>
              <div className="flex flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-4">
                <div className="flex w-full items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar
                      size="large"
                      image="https://images.unsplash.com/photo-1566492031773-4f4e44671857"
                    >
                      J
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-heading-3 font-heading-3 text-default-font">
                        James Wilson
                      </span>
                      <span className="text-body font-body text-subtext-color">
                        Performance Coach
                      </span>
                    </div>
                  </div>
                  <IconButton
                    icon={<FeatherHeart />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                </div>
                <div className="flex flex-wrap items-start gap-2">
                  <Badge>Athletics</Badge>
                  <Badge>Mental Game</Badge>
                </div>
                <span className="text-body font-body text-default-font">
                  Former pro athlete helping others achieve peak performance
                  through mental and physical training.
                </span>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-1">
                    <FeatherStar className="text-body font-body text-default-font" />
                    <span className="text-body-bold font-body-bold text-default-font">
                      4.7
                    </span>
                    <span className="text-body font-body text-subtext-color">
                      (167)
                    </span>
                  </div>
                  <span className="text-body-bold font-body-bold text-default-font">
                    $180/hr
                  </span>
                </div>
                <Button
                  className="h-8 w-full flex-none"
                  variant="brand-secondary"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  View Profile
                </Button>
              </div>
              <div className="flex flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-4">
                <div className="flex w-full items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar
                      size="large"
                      image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
                    >
                      E
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-heading-3 font-heading-3 text-default-font">
                        Emma Martinez
                      </span>
                      <span className="text-body font-body text-subtext-color">
                        Creative Coach
                      </span>
                    </div>
                  </div>
                  <IconButton
                    icon={<FeatherHeart />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                </div>
                <div className="flex flex-wrap items-start gap-2">
                  <Badge>Innovation</Badge>
                  <Badge>Creativity</Badge>
                </div>
                <span className="text-body font-body text-default-font">
                  Helping creative professionals unlock their full potential and
                  overcome creative blocks.
                </span>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-1">
                    <FeatherStar className="text-body font-body text-default-font" />
                    <span className="text-body-bold font-body-bold text-default-font">
                      4.8
                    </span>
                    <span className="text-body font-body text-subtext-color">
                      (143)
                    </span>
                  </div>
                  <span className="text-body-bold font-body-bold text-default-font">
                    $160/hr
                  </span>
                </div>
                <Button
                  className="h-8 w-full flex-none"
                  variant="brand-secondary"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  View Profile
                </Button>
              </div>
            </div>
            <div className="flex w-full items-center justify-center gap-2">
              <Button
                variant="neutral-secondary"
                icon={<FeatherChevronLeft />}
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
     </div> {/*
    </DefaultPageLayout>
  );
}

export default CoachSearchPage;