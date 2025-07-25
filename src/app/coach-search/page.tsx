"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { FeatherGamepad } from "@subframe/core";
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
import { BoldFooter } from "@/ui/components/BoldFooter";

function CoachSearchPage() {
  return (
<>
{/* Glowing "DEMO DATA ONLY" banner */}
<div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 bg-red-600 px-6 py-2 rounded-md shadow-lg shadow-red-400 pointer-events-none">
  <span className="font-['Orbitron'] text-white text-[16px] font-bold tracking-widest uppercase drop-shadow-[0_0_6px_#ffffff]">
    DEMO DATA ONLY
  </span>
</div>

    <DefaultPageLayout>
      <div className="container max-w-none flex h-full w-full flex-col items-start gap-12 bg-default-background py-12">
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <div className="flex w-full max-w-[576px] flex-col items-center justify-center gap-6">
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <FeatherGamepad className="text-heading-1 font-heading-1 text-default-font" />
              <span className="w-full text-heading-1 font-heading-1 text-default-font text-center">
                Find Your Perfect Gaming Coach
              </span>
              <span className="text-body font-body text-subtext-color text-center">
                Level up your gameplay with expert coaches who can help you
                master mechanics, improve strategies, and achieve your gaming
                goals.
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
                placeholder="Search by game, expertise, or coaching style"
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
                  Coaching Type
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
                      <ToggleGroup.Item icon={null} value="6c23df4b">
                        Standard Coaching
                      </ToggleGroup.Item>
                      <ToggleGroup.Item icon={null} value="86f5b1bc">
                        Speedrun/Co-op
                      </ToggleGroup.Item>
                      <ToggleGroup.Item icon={null} value="683ee124">
                        Troubleshooting
                      </ToggleGroup.Item>
                      <ToggleGroup.Item icon={null} value="c32cbd0e">
                        Gear Review
                      </ToggleGroup.Item>
                      <ToggleGroup.Item icon={null} value="24fdeb44">
                        Social Gaming
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
                  Game
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
                      <ToggleGroup.Item icon={null} value="89c1c263">
                        Minecraft
                      </ToggleGroup.Item>
                      <ToggleGroup.Item icon={null} value="b0f07e52">
                        Dead by Daylight
                      </ToggleGroup.Item>
                      <ToggleGroup.Item icon={null} value="57c33981">
                        Valorant
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
                            placeholder="$10"
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
                            placeholder="$100"
                            value=""
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {}}
                          />
                        </TextField>
                      </div>
                    </div>
                  </DropdownMenu>
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
                      <DropdownMenu>
                        <DropdownMenu.DropdownItem icon={<FeatherTrendingUp />}>
                          Most Relevant
                        </DropdownMenu.DropdownItem>
                        <DropdownMenu.DropdownItem>
                          Top Rated
                        </DropdownMenu.DropdownItem>
                        <DropdownMenu.DropdownItem icon={<FeatherClock />}>
                          Recently Active
                        </DropdownMenu.DropdownItem>
                      </DropdownMenu>
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
                      S
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-heading-3 font-heading-3 text-default-font">
                        SpeedrunSage
                      </span>
                      <span className="text-body font-body text-subtext-color">
                        Speedrun Expert
                      </span>
                    </div>
                  </div>
                  <IconButton
                    icon={<FeatherHeart />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                </div>
                <div className="flex flex-wrap items-start gap-2">
                  <Badge>Speedrunning</Badge>
                  <Badge>Co-op Play</Badge>
                </div>
                <span className="text-body font-body text-default-font">
                  World record holder in multiple Minecraft categories.
                  Specializing in speedrun strategies and optimal route
                  planning.
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
                    $45/hr
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
                      T
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-heading-3 font-heading-3 text-default-font">
                        TechWizard
                      </span>
                      <span className="text-body font-body text-subtext-color">
                        Setup Specialist
                      </span>
                    </div>
                  </div>
                  <IconButton
                    icon={<FeatherHeart />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                </div>
                <div className="flex flex-wrap items-start gap-2">
                  <Badge>Gear Review</Badge>
                  <Badge>Troubleshooting</Badge>
                </div>
                <span className="text-body font-body text-default-font">
                  Professional streamer helping optimize your gaming setup, from
                  PC builds to stream configurations.
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
                    $35/hr
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
                      P
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-heading-3 font-heading-3 text-default-font">
                        ProGamer_Pat
                      </span>
                      <span className="text-body font-body text-subtext-color">
                        Skill Coach
                      </span>
                    </div>
                  </div>
                  <IconButton
                    icon={<FeatherHeart />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                </div>
                <div className="flex flex-wrap items-start gap-2">
                  <Badge>Standard Coaching</Badge>
                  <Badge>Strategy</Badge>
                </div>
                <span className="text-body font-body text-default-font">
                  Former esports pro specializing in Valorant and tactical
                  shooters. Focus on aim training and game sense.
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
                    $50/hr
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
                      image="https://images.unsplash.com/photo-1542144582-1ba00456b5e3"
                    >
                      M
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-heading-3 font-heading-3 text-default-font">
                        MobaKing
                      </span>
                      <span className="text-body font-body text-subtext-color">
                        MOBA Expert
                      </span>
                    </div>
                  </div>
                  <IconButton
                    icon={<FeatherHeart />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                </div>
                <div className="flex flex-wrap items-start gap-2">
                  <Badge>League of Legends</Badge>
                  <Badge>DOTA 2</Badge>
                </div>
                <span className="text-body font-body text-default-font">
                  Challenger rank coach specializing in lane mechanics, map
                  awareness, and team fight positioning.
                </span>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-1">
                    <FeatherStar className="text-body font-body text-default-font" />
                    <span className="text-body-bold font-body-bold text-default-font">
                      4.7
                    </span>
                    <span className="text-body font-body text-subtext-color">
                      (203)
                    </span>
                  </div>
                  <span className="text-body-bold font-body-bold text-default-font">
                    $55/hr
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
                      image="https://images.unsplash.com/photo-1534308143481-c55f00be8bd7"
                    >
                      R
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-heading-3 font-heading-3 text-default-font">
                        RetroMaster
                      </span>
                      <span className="text-body font-body text-subtext-color">
                        Retro Gaming Expert
                      </span>
                    </div>
                  </div>
                  <IconButton
                    icon={<FeatherHeart />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                </div>
                <div className="flex flex-wrap items-start gap-2">
                  <Badge>Classic Games</Badge>
                  <Badge>Speed Techniques</Badge>
                </div>
                <span className="text-body font-body text-default-font">
                  Mastering classic games from NES to PS2. Expert in
                  speedrunning techniques and glitch exploitation.
                </span>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-1">
                    <FeatherStar className="text-body font-body text-default-font" />
                    <span className="text-body-bold font-body-bold text-default-font">
                      4.9
                    </span>
                    <span className="text-body font-body text-subtext-color">
                      (167)
                    </span>
                  </div>
                  <span className="text-body-bold font-body-bold text-default-font">
                    $40/hr
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
                      image="https://images.unsplash.com/photo-1566577739112-5180d4bf9390"
                    >
                      B
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-heading-3 font-heading-3 text-default-font">
                        BattleRoyalePro
                      </span>
                      <span className="text-body font-body text-subtext-color">
                        BR Tactics Coach
                      </span>
                    </div>
                  </div>
                  <IconButton
                    icon={<FeatherHeart />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                </div>
                <div className="flex flex-wrap items-start gap-2">
                  <Badge>Fortnite</Badge>
                  <Badge>Apex Legends</Badge>
                </div>
                <span className="text-body font-body text-default-font">
                  Professional battle royale player teaching advanced building,
                  rotation strategies, and end-game tactics.
                </span>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-1">
                    <FeatherStar className="text-body font-body text-default-font" />
                    <span className="text-body-bold font-body-bold text-default-font">
                      4.8
                    </span>
                    <span className="text-body font-body text-subtext-color">
                      (145)
                    </span>
                  </div>
                  <span className="text-body-bold font-body-bold text-default-font">
                    $60/hr
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
                      image="https://images.unsplash.com/photo-1511512578047-dfb367046420"
                    >
                      R
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-heading-3 font-heading-3 text-default-font">
                        RPGSensei
                      </span>
                      <span className="text-body font-body text-subtext-color">
                        RPG Strategist
                      </span>
                    </div>
                  </div>
                  <IconButton
                    icon={<FeatherHeart />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                </div>
                <div className="flex flex-wrap items-start gap-2">
                  <Badge>Character Builds</Badge>
                  <Badge>Quest Guidance</Badge>
                </div>
                <span className="text-body font-body text-default-font">
                  Expert in RPG mechanics, character optimization, and quest
                  completion strategies across multiple games.
                </span>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-1">
                    <FeatherStar className="text-body font-body text-default-font" />
                    <span className="text-body-bold font-body-bold text-default-font">
                      4.9
                    </span>
                    <span className="text-body font-body text-subtext-color">
                      (178)
                    </span>
                  </div>
                  <span className="text-body-bold font-body-bold text-default-font">
                    $45/hr
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
                      image="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e"
                    >
                      F
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-heading-3 font-heading-3 text-default-font">
                        FightingMaster
                      </span>
                      <span className="text-body font-body text-subtext-color">
                        FGC Coach
                      </span>
                    </div>
                  </div>
                  <IconButton
                    icon={<FeatherHeart />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                </div>
                <div className="flex flex-wrap items-start gap-2">
                  <Badge>Combo Training</Badge>
                  <Badge>Frame Data</Badge>
                </div>
                <span className="text-body font-body text-default-font">
                  Tournament player teaching advanced fighting game mechanics,
                  combo execution, and match analysis.
                </span>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-1">
                    <FeatherStar className="text-body font-body text-default-font" />
                    <span className="text-body-bold font-body-bold text-default-font">
                      5.0
                    </span>
                    <span className="text-body font-body text-subtext-color">
                      (134)
                    </span>
                  </div>
                  <span className="text-body-bold font-body-bold text-default-font">
                    $65/hr
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
                      image="https://images.unsplash.com/photo-1509198397868-475647b2a1e5"
                    >
                      S
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-heading-3 font-heading-3 text-default-font">
                        StrategyLord
                      </span>
                      <span className="text-body font-body text-subtext-color">
                        RTS Expert
                      </span>
                    </div>
                  </div>
                  <IconButton
                    icon={<FeatherHeart />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                </div>
                <div className="flex flex-wrap items-start gap-2">
                  <Badge>Resource Management</Badge>
                  <Badge>Micro Control</Badge>
                </div>
                <span className="text-body font-body text-default-font">
                  High-ranked RTS player specializing in build orders, army
                  composition, and economic optimization.
                </span>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-1">
                    <FeatherStar className="text-body font-body text-default-font" />
                    <span className="text-body-bold font-body-bold text-default-font">
                      4.7
                    </span>
                    <span className="text-body font-body text-subtext-color">
                      (198)
                    </span>
                  </div>
                  <span className="text-body-bold font-body-bold text-default-font">
                    $55/hr
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
        <BoldFooter />
      </div>
    </DefaultPageLayout>
   </>
  );
}

export default CoachSearchPage;