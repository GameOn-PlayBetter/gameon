"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";
import { FeatherCoins } from "@subframe/core";
import { FeatherShoppingCart } from "@subframe/core";
import { FeatherStar } from "@subframe/core";
import { FeatherTrophy } from "@subframe/core";
import { FeatherZap } from "@subframe/core";
import { Tabs } from "@/ui/components/Tabs";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherX } from "@subframe/core";
import { Alert } from "@/ui/components/Alert";
import { FeatherAward } from "@subframe/core";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { FeatherTarget } from "@subframe/core";
import { Progress } from "@/ui/components/Progress";
import { FeatherBook } from "@subframe/core";
import { FeatherCheck } from "@subframe/core";
import { FeatherClock } from "@subframe/core";
import { LargeBadge } from "@/ui/components/LargeBadge";
import { FeatherPickaxe } from "@subframe/core";
import { FeatherGhost } from "@subframe/core";
import { FeatherCrown } from "@subframe/core";
import { Table } from "@/ui/components/Table";
import { FeatherHome } from "@subframe/core";
import { FeatherMessageCircle } from "@subframe/core";
import { Avatar } from "@/ui/components/Avatar";
import { FeatherBox } from "@subframe/core";
import { FeatherPlay } from "@subframe/core";
import { FeatherSkull } from "@subframe/core";
import { FeatherCalendar } from "@subframe/core";
import { FeatherVideo } from "@subframe/core";
import { FeatherXCircle } from "@subframe/core";

function PlayerProfilePage() {
  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start bg-default-background">
        <div className="flex w-full flex-col items-start gap-8 px-12 pt-12 pb-6">
          <div className="flex w-full flex-wrap items-start gap-4">
            <div className="flex h-36 w-36 flex-none flex-col items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-100 relative cursor-pointer">
              <img
                className="h-36 w-36 flex-none object-cover absolute"
                src="https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-4.0.3"
              />
              <div className="flex items-center justify-center bg-neutral-0 group:hover .group-hover:opacity-70 absolute inset-0 opacity-0" />
            </div>
            <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-6 pt-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-heading-2 font-heading-2 text-default-font">
                    GameMaster_Pro
                  </span>
                  <Badge>Premium Member</Badge>
                  <Badge variant="success">In Session</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    icon={<FeatherCoins />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    25 Tokens
                  </Button>
                  <Button
                    variant="neutral-secondary"
                    icon={<FeatherShoppingCart />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Buy Tokens
                  </Button>
                </div>
              </div>
              <div className="flex w-full flex-wrap items-start gap-6 mobile:flex-col mobile:flex-wrap mobile:gap-6">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Total Sessions
                  </span>
                  <span className="line-clamp-1 w-full text-caption font-caption text-brand-500">
                    48 Completed
                  </span>
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Favorite Game
                  </span>
                  <span className="line-clamp-1 w-full text-caption font-caption text-brand-600">
                    Minecraft
                  </span>
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Next Sessions
                  </span>
                  <div className="flex flex-col items-start gap-1">
                    <span className="line-clamp-1 w-full text-caption font-caption text-brand-600 cursor-pointer">
                      Today at 4:00 PM
                    </span>
                    <span className="line-clamp-1 w-full text-caption font-caption text-brand-600 cursor-pointer">
                      Tomorrow at 2:00 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge icon={<FeatherStar />}>Pro</Badge>
            <Badge variant="success" icon={<FeatherTrophy />}>
              Elite
            </Badge>
            <Badge variant="warning" icon={<FeatherZap />}>
              VIP
            </Badge>
          </div>
        </div>
        <div className="flex w-full items-end">
          <div className="flex h-px w-12 flex-none flex-col items-center gap-2 bg-neutral-200" />
          <Tabs>
            <Tabs.Item active={true}>Overview</Tabs.Item>
            <Tabs.Item>Sessions</Tabs.Item>
            <Tabs.Item>Badge Shop</Tabs.Item>
          </Tabs>
        </div>
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-12 px-12 py-12 overflow-auto">
          <div className="flex w-full flex-wrap items-start gap-6 rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6">
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6">
              <Alert
                variant="success"
                icon={<FeatherAward />}
                title="Achievement Unlocked!"
                description="You've completed all homework assignments from your last 3 sessions."
                actions={
                  <IconButton
                    icon={<FeatherX />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                }
              />
              <div className="flex w-full flex-wrap items-start gap-6">
                <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-brand-primary bg-neutral-50 px-6 py-6">
                  <div className="flex w-full items-center gap-2">
                    <IconWithBackground icon={<FeatherTarget />} />
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Current Goals
                    </span>
                  </div>
                  <div className="flex w-full flex-col items-start">
                    <div className="flex w-full items-center gap-2 py-4">
                      <span className="line-clamp-1 w-24 flex-none text-caption-bold font-caption-bold text-default-font">
                        Building
                      </span>
                      <Progress value={75} />
                      <span className="line-clamp-1 w-12 flex-none text-caption font-caption text-brand-500 text-right">
                        75%
                      </span>
                    </div>
                    <div className="flex w-full items-center gap-2 py-4">
                      <span className="line-clamp-1 w-24 flex-none text-caption-bold font-caption-bold text-default-font">
                        Survival
                      </span>
                      <Progress value={60} />
                      <span className="line-clamp-1 w-12 flex-none text-caption font-caption text-brand-600 text-right">
                        60%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-brand-primary bg-neutral-50 px-6 py-6">
                  <div className="flex w-full items-center gap-2">
                    <IconWithBackground icon={<FeatherBook />} />
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Player Progress
                    </span>
                  </div>
                  <div className="flex w-full flex-wrap items-start gap-2">
                    <Badge variant="success" icon={<FeatherCheck />}>
                      Building Basics
                    </Badge>
                    <Badge variant="success" icon={<FeatherCheck />}>
                      Resource Management
                    </Badge>
                    <Badge variant="warning" icon={<FeatherClock />}>
                      Advanced Redstone
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex w-full min-w-[240px] flex-col items-start gap-4 rounded-md border border-solid border-brand-primary bg-neutral-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <IconWithBackground icon={<FeatherAward />} />
                  <span className="text-heading-3 font-heading-3 text-default-font">
                    Your Badges
                  </span>
                  <div className="flex w-px flex-none flex-col items-center gap-2 self-stretch bg-neutral-border" />
                  <Button
                    variant="neutral-secondary"
                    icon={<FeatherShoppingCart />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Buy Badges
                  </Button>
                </div>
                <div className="flex w-full flex-wrap items-start gap-2">
                  <LargeBadge icon={<FeatherPickaxe />}>
                    Master Builder
                  </LargeBadge>
                  <LargeBadge icon={<FeatherGhost />}>Survivor Pro</LargeBadge>
                  <LargeBadge icon={<FeatherStar />}>Party Champion</LargeBadge>
                  <LargeBadge icon={<FeatherCrown />}>Elite Player</LargeBadge>
                </div>
              </div>
              <Table
                header={
                  <Table.HeaderRow>
                    <Table.HeaderCell>Skill</Table.HeaderCell>
                    <Table.HeaderCell>Initial Level</Table.HeaderCell>
                    <Table.HeaderCell>Current Level</Table.HeaderCell>
                    <Table.HeaderCell>Improvement</Table.HeaderCell>
                    <Table.HeaderCell>Coach Notes</Table.HeaderCell>
                  </Table.HeaderRow>
                }
              >
                <Table.Row>
                  <Table.Cell>
                    <div className="flex items-center gap-4">
                      <IconWithBackground icon={<FeatherHome />} />
                      <span className="text-body-bold font-body-bold text-default-font">
                        Speedrunning
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="neutral">Beginner</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="success">Intermediate</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-success-600">
                      +2 Levels
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-default-font">
                      Mastered basic foundations
                    </span>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <div className="flex items-center gap-4">
                      <IconWithBackground icon={<FeatherZap />} />
                      <span className="text-body-bold font-body-bold text-default-font">
                        Survival
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="neutral">Novice</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="warning">Advanced Beginner</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-success-600">
                      +1 Level
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-default-font">
                      Making steady progress
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6">
            <div className="flex w-full items-center justify-between">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Coach Feedback
              </span>
            </div>
            <div className="flex w-full items-center gap-2">
              <IconWithBackground icon={<FeatherMessageCircle />} />
              <span className="text-heading-3 font-heading-3 text-default-font">
                Latest Notes
              </span>
            </div>
            <Table
              header={
                <Table.HeaderRow>
                  <Table.HeaderCell>Coach</Table.HeaderCell>
                  <Table.HeaderCell>Game</Table.HeaderCell>
                  <Table.HeaderCell>Feedback</Table.HeaderCell>
                  <Table.HeaderCell>Action Items</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                </Table.HeaderRow>
              }
            >
              <Table.Row>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Avatar
                      size="small"
                      image="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3"
                    >
                      A
                    </Avatar>
                    <span className="text-body font-body text-default-font">
                      Coach Alex
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge>Minecraft</Badge>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-default-font">
                    Excellent progress on building techniques
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="warning">Practice Redstone</Badge>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-subtext-color">
                    2h ago
                  </span>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Avatar
                      size="small"
                      image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3"
                    >
                      S
                    </Avatar>
                    <span className="text-body font-body text-default-font">
                      Coach Sarah
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="warning">Dead By Daylight</Badge>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-default-font">
                    Good map awareness, needs work on timing
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="warning">Practice Loops</Badge>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-subtext-color">
                    1d ago
                  </span>
                </Table.Cell>
              </Table.Row>
            </Table>
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Recent Sessions
              </span>
              <Button
                variant="neutral-secondary"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                View all available recordings
              </Button>
            </div>
            <Table
              header={
                <Table.HeaderRow>
                  <Table.HeaderCell>Game</Table.HeaderCell>
                  <Table.HeaderCell>Coach</Table.HeaderCell>
                  <Table.HeaderCell>Duration</Table.HeaderCell>
                  <Table.HeaderCell>Focus Area</Table.HeaderCell>
                  <Table.HeaderCell>Recording</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                </Table.HeaderRow>
              }
            >
              <Table.Row>
                <Table.Cell>
                  <div className="flex items-center gap-4">
                    <IconWithBackground icon={<FeatherBox />} />
                    <span className="text-body-bold font-body-bold text-default-font">
                      Minecraft
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Avatar
                      size="small"
                      image="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3"
                    >
                      C
                    </Avatar>
                    <span className="text-body font-body text-default-font">
                      Coach Alex
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-brand-500">
                    60 min
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="neutral">Building</Badge>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    variant="neutral-secondary"
                    size="small"
                    icon={<FeatherPlay />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Watch
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-subtext-color">
                    2h ago
                  </span>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <div className="flex items-center gap-4">
                    <IconWithBackground icon={<FeatherSkull />} />
                    <span className="text-body-bold font-body-bold text-default-font">
                      Dead By Daylight
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Avatar
                      size="small"
                      image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3"
                    >
                      S
                    </Avatar>
                    <span className="text-body font-body text-default-font">
                      Coach Sarah
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-brand-500">
                    45 min
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="neutral">Strategy</Badge>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    variant="neutral-secondary"
                    size="small"
                    icon={<FeatherPlay />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Watch
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-subtext-color">
                    1d ago
                  </span>
                </Table.Cell>
              </Table.Row>
            </Table>
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Upcoming Sessions
              </span>
              <Button
                icon={<FeatherCalendar />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Schedule New
              </Button>
            </div>
            <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-brand-primary bg-neutral-50 px-6 py-6">
              <div className="flex w-full items-center gap-4">
                <IconWithBackground
                  variant="success"
                  icon={<FeatherCalendar />}
                />
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Mario Party Coaching
                  </span>
                  <span className="text-body font-body text-subtext-color">
                    Today at 4:00 PM with Coach Mike
                  </span>
                </div>
                <Button
                  variant="neutral-secondary"
                  icon={<FeatherVideo />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Join Call
                </Button>
              </div>
              <div className="flex w-full items-center gap-4">
                <IconWithBackground icon={<FeatherCalendar />} />
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-default-font">
                    The Last of Us Speedrun
                  </span>
                  <span className="text-body font-body text-subtext-color">
                    Today at 8:00 PM with Coach Slaybase
                  </span>
                </div>
                <Button
                  disabled={true}
                  variant="neutral-tertiary"
                  icon={<FeatherXCircle />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Cancel
                </Button>
                <Button
                  variant="neutral-tertiary"
                  icon={<FeatherClock />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Upcoming
                </Button>
              </div>
              <div className="flex w-full items-center gap-4">
                <IconWithBackground icon={<FeatherCalendar />} />
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Minecraft Advanced Building
                  </span>
                  <span className="text-body font-body text-subtext-color">
                    Tomorrow at 2:00 PM with Coach Alex
                  </span>
                </div>
                <Button
                  variant="neutral-tertiary"
                  icon={<FeatherXCircle />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Cancel
                </Button>
                <Button
                  variant="neutral-tertiary"
                  icon={<FeatherClock />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Upcoming
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default PlayerProfilePage;