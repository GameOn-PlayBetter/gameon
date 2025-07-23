"use client";

import React from "react";
import { DrawerLayout } from "@/ui/layouts/DrawerLayout";
import { Tooltip } from "@/ui/components/Tooltip";
import * as SubframeCore from "@subframe/core";
import { Button } from "@/ui/components/Button";
import { FeatherCoins } from "@subframe/core";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherMenu } from "@subframe/core";
import { FeatherZap } from "@subframe/core";
import { FeatherArrowRight } from "@subframe/core";
import { FeatherArrowRightCircle } from "@subframe/core";
import { Avatar } from "@/ui/components/Avatar";
import { Badge } from "@/ui/components/Badge";
import { FeatherInstagram } from "@subframe/core";
import { FeatherTwitch } from "@subframe/core";
import { FeatherX } from "@subframe/core";
import { FeatherCloud } from "@subframe/core";
import { FeatherMessageCircle } from "@subframe/core";
import { BoldFooter } from "@/ui/components/BoldFooter";

function LandingPage() {
  return (
    <DrawerLayout open={false} onOpenChange={() => {}}>
      <div className="flex w-full flex-col items-center bg-black min-h-screen">
        <div className="flex w-full items-center justify-between border-b border-solid border-neutral-border px-6 py-4">
          <div className="flex max-w-[1024px] grow shrink-0 basis-0 items-center justify-between mx-auto">
            <img
              className="h-12 flex-none object-contain"
              src="https://res.cloudinary.com/subframe/image/upload/v1752180871/uploads/19984/xz0wrne7nh62oxklt6fo.png"
            />
            <SubframeCore.Tooltip.Provider>
              <SubframeCore.Tooltip.Root>
                <SubframeCore.Tooltip.Trigger asChild={true}>
                  <Button
                    size="small"
                    icon={<FeatherCoins />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Buy Tokens
                  </Button>
                </SubframeCore.Tooltip.Trigger>
                <SubframeCore.Tooltip.Portal>
                  <SubframeCore.Tooltip.Content
                    side="bottom"
                    align="center"
                    sideOffset={4}
                    asChild={true}
                  >
                    <Tooltip>Click here to buy more tokens</Tooltip>
                  </SubframeCore.Tooltip.Content>
                </SubframeCore.Tooltip.Portal>
              </SubframeCore.Tooltip.Root>
            </SubframeCore.Tooltip.Provider>
            <div className="flex items-center gap-4 mobile:hidden">
              <span className="text-body font-body text-default-font">
                Home
              </span>
              <span className="text-body font-body text-default-font">
                Earn Tokens
              </span>
              <span className="text-body font-body text-default-font">
                Login
              </span>
            </div>
            <IconButton
              className="hidden mobile:flex"
              icon={<FeatherMenu />}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            />
          </div>
        </div>
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start bg-black">
          <div className="flex w-full flex-col items-center justify-center gap-3 bg-black px-6 py-6">
            <div className="flex w-full max-w-[1024px] flex-col items-center justify-center">
              <img
                className="h-96 w-full flex-none object-contain"
                src="https://res.cloudinary.com/subframe/image/upload/v1752180871/uploads/19984/xz0wrne7nh62oxklt6fo.png"
              />
              <span className="w-full max-w-[768px] whitespace-pre-wrap font-['Orbitron'] text-[60px] font-[900] leading-[68px] text-default-font text-center -tracking-[0.04em] mobile:font-['Orbitron'] mobile:text-[48px] mobile:font-[400] mobile:leading-[44px] mobile:tracking-normal">
                {"LEVEL UP YOUR GAME"}
              </span>
              <span className="w-full max-w-[576px] whitespace-pre-wrap font-['Afacad_Flux'] text-[20px] font-[500] leading-[28px] text-success-700 text-center mobile:font-['Afacad_Flux'] mobile:text-[20px] mobile:font-[500] mobile:leading-[28px] mobile:tracking-normal">
                {
                  "Get tips, tricks, and tactics from real gamers. \nBecause sometimes, YouTube just isn't enough."
                }
              </span>
              <Button
                variant="destructive-primary"
                size="large"
                icon={<FeatherZap />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Join The Waitlist
              </Button>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-6 px-6 py-12">
            <div className="flex w-full max-w-[448px] flex-col items-center gap-6 rounded-lg border border-solid border-neutral-border bg-default-background px-8 py-8 shadow-lg">
              <div className="flex w-full items-start justify-center gap-4">
                <span className="text-heading-1 font-heading-1 text-success-600">
                  JOIN THE WAITLIST
                </span>
              </div>
              <span className="text-body font-body text-neutral-700 text-center">
                GameOn is currently in pre-launch. Sign up below to reserve your
                spot when we go live and get free tokens!
              </span>
              <Button
                className="h-10 w-full flex-none"
                variant="destructive-primary"
                size="large"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                SIGN UP NOW
              </Button>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-12 px-6 py-24">
            <div className="flex w-full max-w-[1280px] flex-col items-start gap-8">
              <span className="font-['Orbitron'] text-[36px] font-[700] leading-[40px] text-warning-700">
                Featured Games
              </span>
              <div className="w-full items-start gap-8 grid grid-cols-2">
                <div className="flex flex-col items-start overflow-hidden rounded-[32px] bg-brand-50 shadow-lg">
                  <img
                    className="h-64 w-full flex-none object-cover"
                    src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTljg5vWNmopi6Gn1lPHE4DmhERwFm0Rcmct1rsmCJntVOKRkho4y1HWK3_FQJukQPI_jK6rTrMg_8VyBl5B7_Zc9pYcnexD4CEZvafeVdapw"
                  />
                  <div className="flex w-full flex-col items-start gap-4 px-8 py-8">
                    <div className="flex w-full flex-col items-start gap-2">
                      <span className="font-['Orbitron'] text-[24px] font-[700] leading-[28px] text-default-font">
                        Minecraft
                      </span>
                      <span className="text-body font-body text-subtext-color">
                        Create the perfect gaming environment with our expert
                        setup guides and recommendations.
                      </span>
                    </div>
                    <Button
                      icon={<FeatherArrowRight />}
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {}}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-start overflow-hidden rounded-[32px] bg-brand-50 shadow-lg">
                  <img
                    className="h-64 w-full flex-none object-cover"
                    src="data:image/jpeg;base64,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"
                  />
                  <div className="flex w-full flex-col items-start gap-4 px-8 py-8">
                    <div className="flex w-full flex-col items-start gap-2">
                      <span className="font-['Orbitron'] text-[24px] font-[700] leading-[28px] text-default-font">
                        Dead by Daylight
                      </span>
                      <span className="text-body font-body text-subtext-color">
                        Join our gaming community events and compete with
                        players worldwide.
                      </span>
                    </div>
                    <Button
                      icon={<FeatherArrowRight />}
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {}}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-start overflow-hidden rounded-[32px] bg-brand-50 shadow-lg">
                  <img
                    className="h-64 w-full flex-none object-cover"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwbKGO9gIrqKvrEykDsGjAkN6yS5C4L4xP2g&s"
                  />
                  <div className="flex w-full flex-col items-start gap-4 px-8 py-8">
                    <div className="flex w-full flex-col items-start gap-2">
                      <span className="font-['Orbitron'] text-[24px] font-[700] leading-[28px] text-default-font">
                        League of Legends
                      </span>
                      <span className="text-body font-body text-subtext-color">
                        Master champion mechanics and climb the ranked ladder
                        with pro guidance.
                      </span>
                    </div>
                    <Button
                      icon={<FeatherArrowRight />}
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {}}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-start overflow-hidden rounded-[32px] bg-brand-50 shadow-lg">
                  <img
                    className="h-64 w-full flex-none object-cover"
                    src="data:image/jpeg;base64,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"
                  />
                  <div className="flex w-full flex-col items-start gap-4 px-8 py-8">
                    <div className="flex w-full flex-col items-start gap-2">
                      <span className="font-['Orbitron'] text-[24px] font-[700] leading-[28px] text-default-font">
                        Valorant
                      </span>
                      <span className="text-body font-body text-subtext-color">
                        Improve your aim and tactical decision-making with
                        personalized coaching.
                      </span>
                    </div>
                    <Button
                      icon={<FeatherArrowRight />}
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {}}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Button
              size="large"
              icon={<FeatherArrowRightCircle />}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              All Games
            </Button>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-12 px-6 py-24">
            <div className="flex w-full max-w-[1280px] flex-col items-start gap-8">
              <span className="font-['Orbitron'] text-[36px] font-[700] leading-[40px] text-success-700">
                Featured Coaches
              </span>
              <div className="flex w-full flex-wrap items-start gap-8">
                <div className="flex min-w-[288px] grow shrink-0 basis-0 flex-col items-center gap-6 rounded-[32px] bg-brand-50 px-8 py-12">
                  <Avatar
                    size="x-large"
                    image="https://res.cloudinary.com/subframe/image/upload/v1711417514/shared/ubsk7cs5hnnaj798efej.jpg"
                  >
                    A
                  </Avatar>
                  <span className="font-['Orbitron'] text-[24px] font-[700] leading-[28px] text-brand-700 text-center">
                    Coach Alex
                  </span>
                  <Badge>Minecraft Expert</Badge>
                  <span className="text-body font-body text-brand-700 text-center">
                    Professional builder &amp; redstone specialist
                  </span>
                  <Button
                    variant="destructive-primary"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Book Session
                  </Button>
                </div>
                <div className="flex min-w-[288px] grow shrink-0 basis-0 flex-col items-center gap-6 rounded-[32px] bg-brand-50 px-8 py-12">
                  <Avatar
                    size="x-large"
                    image="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/fychrij7dzl8wgq2zjq9.avif"
                  >
                    S
                  </Avatar>
                  <span className="font-['Orbitron'] text-[24px] font-[700] leading-[28px] text-warning-700 text-center">
                    Coach Sarah
                  </span>
                  <Badge variant="warning">DBD Pro</Badge>
                  <span className="text-body font-body text-warning-700 text-center">
                    Competitive survivor &amp; strategy expert
                  </span>
                  <Button
                    variant="destructive-primary"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Book Session
                  </Button>
                </div>
                <div className="flex min-w-[288px] grow shrink-0 basis-0 flex-col items-center gap-6 rounded-[32px] bg-brand-50 px-8 py-12">
                  <Avatar
                    size="x-large"
                    image="https://res.cloudinary.com/subframe/image/upload/v1711417513/shared/kwut7rhuyivweg8tmyzl.jpg"
                  >
                    M
                  </Avatar>
                  <span className="font-['Orbitron'] text-[24px] font-[700] leading-[28px] text-success-700 text-center">
                    Coach Mike
                  </span>
                  <Badge variant="success">LoL Master</Badge>
                  <span className="text-body font-body text-success-700 text-center">
                    Diamond ranked player &amp; macro strategist
                  </span>
                  <Button
                    variant="destructive-primary"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Book Session
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-6 bg-default-background px-6 py-24">
            <div className="flex w-full max-w-[1280px] flex-col items-center justify-center gap-8 rounded-[32px] bg-default-background px-6 pt-24 pb-16">
              <div className="flex w-full flex-col items-center justify-center gap-2">
                <span className="w-full max-w-[768px] whitespace-pre-wrap font-['Orbitron'] text-[48px] font-[900] leading-[52px] text-default-font text-center -tracking-[0.04em]">
                  {"JOIN THE ELITE"}
                </span>
                <span className="w-full max-w-[768px] whitespace-pre-wrap font-['Afacad_Flux'] text-[20px] font-[500] leading-[28px] text-brand-800 text-center">
                  {"Ready to share your knowledge?"}
                </span>
              </div>
              <Button
                size="large"
                icon={<FeatherArrowRight />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Start Coaching
              </Button>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-8 px-6 py-12">
            <span className="font-['Orbitron'] text-[24px] font-[700] leading-[28px] text-success-700">
              Connect With Us
            </span>
            <div className="flex items-center gap-4">
              <IconButton
                variant="brand-secondary"
                icon={<FeatherInstagram />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
              <IconButton
                variant="brand-secondary"
                icon={<FeatherTwitch />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
              <IconButton
                variant="brand-secondary"
                icon={<FeatherX />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
              <IconButton
                variant="brand-secondary"
                icon={<FeatherCloud />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
              <IconButton
                variant="brand-secondary"
                icon={<FeatherMessageCircle />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
            </div>
          </div>
          <BoldFooter />
        </div>
      </div>
    </DrawerLayout>
  );
}

export default LandingPage;