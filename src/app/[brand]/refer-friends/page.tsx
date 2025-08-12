"use client";

import React from "react";
import DefaultPageLayout from "@/ui/layouts/DefaultPageLayout";
import { TextFieldUnstyled } from "@/ui/components/TextFieldUnstyled";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherCopy } from "@subframe/core";
import { Button } from "@/ui/components/Button";
import { FeatherMail } from "@subframe/core";
import { FeatherLinkedin } from "@subframe/core";
import { FeatherTwitter } from "@subframe/core";
import { Table } from "@/ui/components/Table";
import { Avatar } from "@/ui/components/Avatar";
import { Badge } from "@/ui/components/Badge";
import { Progress } from "@/ui/components/Progress";
import { FeatherZap } from "@subframe/core";
import { FeatherZapOff } from "@subframe/core";
import { FeatherBolt } from "@subframe/core";
import { BoldFooter } from "@/ui/components/BoldFooter";
import { useParams } from "next/navigation";
import { getBrandConfig } from "@/lib/brands";

function ReferFriendsPage() {
  const params = useParams<{ brand?: string }>() ?? {};
const brandRaw = (params as { brand?: string | string[] }).brand;
const brandKey = Array.isArray(brandRaw) ? brandRaw[0] : (brandRaw || "");
  const brandName =
    (brandKey && getBrandConfig?.(brandKey)?.name) ||
    (brandKey ? brandKey.charAt(0).toUpperCase() + brandKey.slice(1) : "Skillery");
  return (
    <>
      <DefaultPageLayout>
        {/* Glowing "DEMO DATA ONLY" banner */}
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 bg-red-600 px-6 py-2 rounded-md shadow-lg shadow-red-400 pointer-events-none">
          <span className="font-['Orbitron'] text-white text-[16px] font-bold tracking-widest uppercase drop-shadow-[0_0_6px_#ffffff]">
            DEMO DATA ONLY
          </span>
        </div>
        {/* DO NOT CHANGE ANYTHING BELOW THIS LINE */}
        <div className="flex h-full w-full flex-col items-center bg-transparent">
          <div className="flex w-full max-w-[1024px] flex-col items-center gap-12 px-6 py-12">
            <div className="flex w-full flex-col items-center gap-6">
              <div className="flex w-full flex-wrap items-end gap-12">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex h-2 w-4 flex-none flex-col items-start gap-2 rounded-full bg-brand-600" />
                    <span className="font-['Inter'] text-[14px] font-[500] leading-[20px] text-default-font -tracking-[0.01em]">
                      Referral Program
                    </span>
                  </div>
                  <span className="w-full font-['Inter'] text-[56px] font-[700] leading-[62px] text-default-font -tracking-[0.04em]">
                    {`Share ${brandName}, earn rewards`}
                  </span>
                </div>
                <span className="grow shrink-0 basis-0 font-['Inter'] text-[17px] font-[500] leading-[24px] text-white -tracking-[0.01em]">
                  {`Share the power of ${brandName} with your network and earn rewards for`}
                  {" "}every friend who books a coaching session. Rewards given as
                  tokens and may be redeemed for additional coaching sessions or
                  purchasing badges.
                </span>
              </div>
            </div>
            <div className="flex w-full flex-col items-start gap-6 rounded-md bg-brand-100 px-8 py-8">
              <div className="flex w-full items-start gap-2">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-neutral-100 px-6 py-6 shadow-lg">
                  <span className="text-body-bold font-body-bold text-white">
                    Total Referrals
                  </span>
                  <span className="text-heading-1 font-heading-1 text-default-font">
                    124
                  </span>
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-neutral-100 px-6 py-6 shadow-lg">
                  <span className="text-body-bold font-body-bold text-white">
                    Successful Bookings
                  </span>
                  <span className="text-heading-1 font-heading-1 text-default-font">
                    86
                  </span>
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-neutral-100 px-6 py-6 shadow-lg">
                  <span className="text-body-bold font-body-bold text-white">
                    Tokens Earned
                  </span>
                  <span className="text-heading-1 font-heading-1 text-default-font">
                    124
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col items-start gap-4">
                <span className="text-heading-2 font-heading-2 text-brand-900">
                  Your Referral Link
                </span>
                <span className="text-body font-body text-brand-900">
                  Share your unique referral link and earn rewards for every
                  successful sign-up.
                </span>
              </div>
              <div className="flex w-full items-center gap-2 rounded-full bg-transparent px-4 py-3">
                <TextFieldUnstyled className="h-auto grow shrink-0 basis-0">
                  <TextFieldUnstyled.Input
                    className="text-white placeholder-white/70"
                    placeholder="https://skillery.co/invite/YOUR_CODE"
                    value=""
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                  />
                </TextFieldUnstyled>
                <IconButton
                  icon={<FeatherCopy />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
              </div>
              <div className="flex w-full flex-wrap items-center gap-2">
                <Button
                  variant="brand-secondary"
                  icon={<FeatherMail />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Email
                </Button>
                <Button
                  variant="brand-secondary"
                  icon={<FeatherLinkedin />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Discord
                </Button>
                <Button
                  variant="brand-secondary"
                  icon={<FeatherTwitter />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Twitter
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-col items-start gap-6">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Active Invites
              </span>
              <Table
                header={
<Table.HeaderRow>
  <Table.HeaderCell style={{ color: "white" }}>Friend</Table.HeaderCell>
  <Table.HeaderCell style={{ color: "white" }}>Status</Table.HeaderCell>
  <Table.HeaderCell style={{ color: "white" }}>Invited</Table.HeaderCell>
  <Table.HeaderCell style={{ color: "white" }}>Reward</Table.HeaderCell>
</Table.HeaderRow>
                }
              >
                <Table.Row>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Avatar image="https://images.unsplash.com/photo-1494790108377-be9c29b29330">
                        A
                      </Avatar>
                      <span className="text-body-bold font-body-bold text-default-font">
                        Sarah Chen
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="success">Active</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-white">
                      2 days ago
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge>1 Token</Badge>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Avatar image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d">
                        A
                      </Avatar>
                      <span className="text-body-bold font-body-bold text-default-font">
                        Michael Kim
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="warning">Pending</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-white">
                      5 days ago
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="neutral">--</Badge>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Avatar image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80">
                        A
                      </Avatar>
                      <span className="text-body-bold font-body-bold text-default-font">
                        Emma Wilson
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="success">Active</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-white">
                      1 week ago
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge>1 Token</Badge>
                  </Table.Cell>
                </Table.Row>
              </Table>
            </div>
            <div className="flex w-full flex-col items-start gap-6">
              <div className="flex w-full items-center justify-between">
                <span className="text-heading-3 font-heading-3 text-default-font">
                  Referral Progress
                </span>
                <Badge variant="success">3 Active Referrals</Badge>
              </div>
              <div className="flex w-full items-center gap-4">
                <Progress value={60} />
                <span className="text-caption-bold font-caption-bold text-brand-700">
                  3/5 to next reward
                </span>
              </div>
            </div>
            <div className="flex w-full flex-col items-start gap-6">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Reward Tiers
              </span>
              <div className="flex w-full flex-wrap items-start gap-6">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6">
                  <div className="flex items-center gap-2">
                    <FeatherZap className="text-heading-2 font-heading-2 text-brand-700" />
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Tier 1
                    </span>
                  </div>
                  <span className="text-body font-body text-white">
                    Invite 3 friends
                  </span>
                  <Badge>5 Tokens</Badge>
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6">
                  <div className="flex items-center gap-2">
                    <FeatherZapOff className="text-heading-2 font-heading-2 text-brand-700" />
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Tier 2
                    </span>
                  </div>
                  <span className="text-body font-body text-white">
                    Invite 5 friends
                  </span>
                  <Badge>8 Tokens</Badge>
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6">
                  <div className="flex items-center gap-2">
                    <FeatherBolt className="text-heading-2 font-heading-2 text-brand-700" />
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Tier 3
                    </span>
                  </div>
                  <span className="text-body font-body text-white">
                    Invite 10 friends
                  </span>
                  <Badge>15 Tokens</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultPageLayout>
    </>
  );
}

export default ReferFriendsPage;