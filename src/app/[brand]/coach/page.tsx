import { type Metadata } from "next";
import { getBrandConfig } from "@/lib/brands"; // adjust path if needed

export async function generateMetadata({ params }: { params: { brand: string } }): Promise<Metadata> {
  const config = getBrandConfig(params.brand);

  if (!config) {
    return {
      title: "Skillery — Unlock Your Potential",
      description: "Live expert coaching across skills, trades, and passions.",
    };
  }

  return {
    title: `${config.name} — ${config.tagline}`,
    description: config.description,
    openGraph: {
      title: `${config.name} — ${config.tagline}`,
      description: config.description,
      url: `https://skillery.co/${params.brand}`,
      siteName: config.name,
      images: [
        {
          url: `https://skillery.co/${params.brand}/${params.brand}_og.png`,
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${config.name} — ${config.tagline}`,
      description: config.description,
      images: [`https://skillery.co/${params.brand}/${params.brand}_og.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

"use client";

import React from "react";
import DefaultPageLayout from "@/ui/layouts/DefaultPageLayout";
import { Badge } from "@/ui/components/Badge";
import { FeatherShield } from "@subframe/core";
import { Button } from "@/ui/components/Button";
import { FeatherDownload } from "@subframe/core";
import { Tabs } from "@/ui/components/Tabs";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { FeatherDollarSign } from "@subframe/core";
import { Progress } from "@/ui/components/Progress";
import { FeatherTrendingUp } from "@subframe/core";
import { FeatherCreditCard } from "@subframe/core";
import { Alert } from "@/ui/components/Alert";
import { FeatherAlertTriangle } from "@subframe/core";
import { Avatar } from "@/ui/components/Avatar";
import { FeatherClock } from "@subframe/core";
import { FeatherX } from "@subframe/core";
import { FeatherCheck } from "@subframe/core";
import { FeatherSave } from "@subframe/core";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherZap } from "@subframe/core";
import { FeatherEye } from "@subframe/core";
import { FeatherHelpCircle } from "@subframe/core";
import { FeatherUsers } from "@subframe/core";
import { TextField } from "@/ui/components/TextField";
import { Select } from "@/ui/components/Select";
import { FeatherCalendar } from "@subframe/core";
import { FeatherSearch } from "@subframe/core";
import { FeatherFilter } from "@subframe/core";
import { Table } from "@/ui/components/Table";
import { FeatherPlay } from "@subframe/core";
import { FeatherFlag } from "@subframe/core";
import { FeatherTicket } from "@subframe/core";
import { FeatherBook } from "@subframe/core";

function CoachPage() {
 return (
<>
  {/* Glowing "DEMO DATA ONLY" banner */}
  <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 bg-red-600 px-6 py-2 rounded-md shadow-lg shadow-red-400 pointer-events-none">
    <span className="font-['Orbitron'] text-white text-[16px] font-bold tracking-widest uppercase drop-shadow-[0_0_6px_#ffffff]">
      DEMO DATA ONLY
    </span>
  </div>

    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start bg-default-background">
        <div className="flex w-full flex-col items-start gap-8 px-12 pt-12 pb-6">
          <div className="flex w-full flex-wrap items-start gap-4">
            <div className="flex h-36 w-36 flex-none flex-col items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-100 relative">
              <img
                className="h-36 w-36 flex-none object-cover absolute"
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
              />
            </div>
            <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-6 pt-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-heading-2 font-heading-2 text-default-font">
                    Sarah Tactical
                  </span>
                  <Badge variant="success" icon={<FeatherShield />}>
                    Verified Coach
                  </Badge>
                  <Badge>Elite Level</Badge>
                </div>
                <Button
                  variant="neutral-secondary"
                  icon={<FeatherDownload />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Export Data
                </Button>
              </div>
              <div className="flex w-full flex-wrap items-start gap-6">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Total Sessions
                  </span>
                  <span className="line-clamp-1 w-full text-caption font-caption text-brand-500">
                    43
                  </span>
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Success Rate
                  </span>
                  <span className="line-clamp-1 w-full text-caption font-caption text-brand-600">
                    94%
                  </span>
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Languages
                  </span>
                  <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                    English, Spanish
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-end">
          <div className="flex h-px w-12 flex-none flex-col items-center gap-2 bg-neutral-200" />
          <Tabs>
            <Tabs.Item active={true}>Dashboard</Tabs.Item>
            <Tabs.Item>Sessions</Tabs.Item>
            <Tabs.Item>Reviews</Tabs.Item>
          </Tabs>
        </div>
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-12 px-12 py-12 overflow-auto">
          <div className="flex w-full flex-wrap items-start gap-6">
            <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-brand-primary bg-neutral-50 px-6 py-6">
              <div className="flex w-full items-center gap-2">
                <IconWithBackground icon={<FeatherDollarSign />} />
                <span className="text-heading-3 font-heading-3 text-default-font">
                  Current Month Earnings
                </span>
              </div>
              <div className="flex w-full flex-col items-start">
                <span className="text-heading-1 font-heading-1 text-brand-500">
                  $146.25
                </span>
                <div className="flex w-full items-center gap-2 py-4">
                  <span className="line-clamp-1 w-24 flex-none text-caption-bold font-caption-bold text-default-font">
                    Target
                  </span>
                  <Progress value={85} />
                  <span className="line-clamp-1 w-12 flex-none text-caption font-caption text-brand-500 text-right">
                    85%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-brand-primary bg-neutral-50 px-6 py-6">
              <div className="flex w-full items-center gap-2">
                <IconWithBackground icon={<FeatherTrendingUp />} />
                <span className="text-heading-3 font-heading-3 text-default-font">
                  Previous Month Earnings
                </span>
              </div>
              <div className="flex w-full flex-col items-start gap-2">
                <span className="text-heading-1 font-heading-1 text-brand-600">
                  $3,156.00
                </span>
                <span className="text-caption font-caption text-success-600">
                  Final
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Pending Requests
              </span>
            </div>
            <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6">
              <Alert
                variant="warning"
                icon={<FeatherAlertTriangle />}
                title="Connect Stripe to accept bookings"
                description="You need to connect your Stripe account before you can start accepting booking requests."
                actions={
                  <Button
                    icon={<FeatherCreditCard />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Connect Stripe
                  </Button>
                }
              />
              <div className="flex w-full items-center gap-4">
                <Avatar
                  size="large"
                  image="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80"
                >
                  A
                </Avatar>
                <div className="flex flex-col items-start gap-1 grow">
                  <div className="flex items-center gap-2">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Alex Chen
                    </span>
                    <Badge>Minecraft</Badge>
                    <Badge variant="warning" icon={<FeatherClock />}>
                      Pending
                    </Badge>
                  </div>
                  <span className="text-body font-body text-subtext-color">
                    60 min Speedrun coaching session
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="neutral-secondary"
                    icon={<FeatherX />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Decline
                  </Button>
                  <Button
                    disabled={true}
                    icon={<FeatherCheck />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Accept
                  </Button>
                </div>
              </div>
              <div className="flex w-full items-center gap-4">
                <Avatar
                  size="large"
                  image="https://res.cloudinary.com/subframe/image/upload/v1711417512/shared/m0kfajqpwkfief00it4v.jpg"
                >
                  A
                </Avatar>
                <div className="flex flex-col items-start gap-1 grow">
                  <div className="flex items-center gap-2">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Mandy Lopez
                    </span>
                    <Badge>Dead By Daylight</Badge>
                    <Badge variant="warning" icon={<FeatherClock />}>
                      Pending
                    </Badge>
                  </div>
                  <span className="text-body font-body text-subtext-color">
                    60 min Speedrun coaching session
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="neutral-secondary"
                    icon={<FeatherX />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Decline
                  </Button>
                  <Button
                    disabled={true}
                    icon={<FeatherCheck />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Accept
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Rate Configuration
              </span>
              <Button
                icon={<FeatherSave />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Save Changes
              </Button>
            </div>
            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6">
                <Alert
                  title="Set your rates and session durations"
                  description="Configure your rates and available durations for each game and category. "
                  actions={
                    <IconButton
                      icon={<FeatherX />}
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {}}
                    />
                  }
                />
                <div className="flex w-full items-center gap-4 border-b border-solid border-neutral-border pb-4">
                  <div className="flex w-48 flex-none items-start" />
                  <div className="flex items-center justify-between px-4 grow">
                    <Badge icon={<FeatherZap />}>Speedrun</Badge>
                    <Badge variant="warning" icon={<FeatherEye />}>
                      Watcher/Friend
                    </Badge>
                    <Badge variant="error" icon={<FeatherHelpCircle />}>
                      Quick Help
                    </Badge>
                    <Badge variant="success" icon={<FeatherUsers />}>
                      Co-op Player
                    </Badge>
                  </div>
                </div>
                <div className="flex w-full flex-col items-start gap-4">
                  <div className="flex w-full items-center gap-4">
                    <div className="flex w-48 flex-none items-center gap-2">
                      <Badge>Minecraft</Badge>
                    </div>
                    <div className="flex items-center justify-between grow">
                      <div className="flex flex-col items-start gap-2">
                        <TextField
                          className="h-auto w-32 flex-none"
                          label=""
                          helpText=""
                          icon={<FeatherDollarSign />}
                        >
                          <TextField.Input
                            placeholder="0.00"
                            value=""
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {}}
                          />
                        </TextField>
                        <Select
                          className="h-auto w-32 flex-none"
                          label=""
                          placeholder="Duration"
                          helpText=""
                          value={undefined}
                          onValueChange={(value: string) => {}}
                        >
                          <Select.Item value="30">30</Select.Item>
                          <Select.Item value="60">60</Select.Item>
                        </Select>
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        <TextField
                          className="h-auto w-32 flex-none"
                          label=""
                          helpText=""
                          icon={<FeatherDollarSign />}
                        >
                          <TextField.Input
                            placeholder="0.00"
                            value=""
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {}}
                          />
                        </TextField>
                        <Select
                          className="h-auto w-32 flex-none"
                          label=""
                          placeholder="Duration"
                          helpText=""
                          value={undefined}
                          onValueChange={(value: string) => {}}
                        >
                          <Select.Item value="30">30</Select.Item>
                          <Select.Item value="60">60</Select.Item>
                        </Select>
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        <TextField
                          className="h-auto w-32 flex-none"
                          label=""
                          helpText=""
                          icon={<FeatherDollarSign />}
                        >
                          <TextField.Input
                            placeholder="0.00"
                            value=""
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {}}
                          />
                        </TextField>
                        <Select
                          className="h-auto w-32 flex-none"
                          label=""
                          placeholder="Duration"
                          helpText=""
                          value={undefined}
                          onValueChange={(value: string) => {}}
                        >
                          <Select.Item value="15">15</Select.Item>
                          <Select.Item value="30">30</Select.Item>
                        </Select>
                      </div>
                      <div className="flex flex-col items-start gap-2">
                        <TextField
                          className="h-auto w-32 flex-none"
                          label=""
                          helpText=""
                          icon={<FeatherDollarSign />}
                        >
                          <TextField.Input
                            placeholder="0.00"
                            value=""
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {}}
                          />
                        </TextField>
                        <Select
                          className="h-auto w-32 flex-none"
                          label=""
                          placeholder="Duration"
                          helpText=""
                          value={undefined}
                          onValueChange={(value: string) => {}}
                        >
                          <Select.Item value="30">30</Select.Item>
                          <Select.Item value="60">60</Select.Item>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Default Session Length
                  </span>
                </div>
                <Select
                  className="h-auto w-48 flex-none"
                  label=""
                  placeholder=""
                  helpText=""
                  value={undefined}
                  onValueChange={(value: string) => {}}
                >
                  <Select.Item value="30">30</Select.Item>
                  <Select.Item value="60">60</Select.Item>
                  <Select.Item value="90">90</Select.Item>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Calendar Integration
              </span>
              <Button
                variant="brand-secondary"
                icon={<FeatherCalendar />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Sync Calendar
              </Button>
            </div>
            <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6">
              <div className="flex w-full items-center gap-4">
                <IconWithBackground
                  size="large"
                  icon={<FeatherCalendar />}
                  square={true}
                />
                <div className="flex flex-col items-start gap-1 grow">
                  <span className="text-heading-3 font-heading-3 text-default-font">
                    Google Calendar
                  </span>
                  <span className="text-body font-body text-subtext-color">
                    Manage your coaching availability
                  </span>
                </div>
                <Badge variant="success" icon={<FeatherCheck />}>
                  Connected
                </Badge>
              </div>
              <Alert
                title="Your calendar is synced"
                description="Players can now book sessions during your available time slots"
                actions={
                  <IconButton
                    icon={<FeatherX />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                }
              />
              <div className="flex w-full items-center gap-4" />
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Recent Sessions
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="neutral-secondary"
                  icon={<FeatherSearch />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Search Recordings
                </Button>
                <Button
                  variant="neutral-secondary"
                  icon={<FeatherFilter />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Filter
                </Button>
                <Button
                  variant="neutral-secondary"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  View all
                </Button>
              </div>
            </div>
            <Table
              header={
                <Table.HeaderRow>
                  <Table.HeaderCell>Session Date</Table.HeaderCell>
                  <Table.HeaderCell>Player</Table.HeaderCell>
                  <Table.HeaderCell>Game</Table.HeaderCell>
                  <Table.HeaderCell>Duration</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Rating</Table.HeaderCell>
                  <Table.HeaderCell>Earnings</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.HeaderRow>
              }
            >
              <Table.Row>
                <Table.Cell>
                  <span className="text-body font-body text-default-font">
                    Mar 15, 2024
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Avatar
                      size="small"
                      image="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80"
                    >
                      J
                    </Avatar>
                    <span className="text-body font-body text-default-font">
                      John Smith
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge>Minecraft</Badge>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-default-font">
                    60 min
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="success" icon={<FeatherCheck />}>
                    Complete
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="neutral">Pending</Badge>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-brand-primary">
                    $45.00
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="neutral-secondary"
                      size="small"
                      icon={<FeatherPlay />}
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {}}
                    >
                      Watch
                    </Button>
                    <Button
                      variant="neutral-secondary"
                      size="small"
                      icon={<FeatherFlag />}
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {}}
                    >
                      Report
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table>
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Support &amp; Help
              </span>
            </div>
            <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6">
              <div className="flex w-full items-center gap-4">
                <IconWithBackground
                  size="large"
                  icon={<FeatherHelpCircle />}
                  square={true}
                />
                <div className="flex flex-col items-start gap-1 grow">
                  <span className="text-heading-3 font-heading-3 text-default-font">
                    Need assistance?
                  </span>
                  <span className="text-body font-body text-subtext-color">
                    Get help with your coaching account or report issues
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-wrap items-start gap-4">
                <Button
                  variant="neutral-primary"
                  icon={<FeatherTicket />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Submit a ticket
                </Button>
                <Button
                  variant="neutral-primary"
                  icon={<FeatherBook />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Coach Code of Conduct
                </Button>
                <Button
                  variant="neutral-primary"
                  icon={<FeatherHelpCircle />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  FAQs
                </Button>
                <Button
                  variant="neutral-primary"
                  icon={<FeatherFlag />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Report a player
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout></>
  );
}

export default CoachPage;