"use client";

import React from "react";
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
                    src="https://res.cloudinary.com/subframe/image/upload/v1753278662/uploads/19984/m77supwrvtgqnsvkzxup.webp"
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
                    src="https://res.cloudinary.com/subframe/image/upload/v1753278671/uploads/19984/zpdm7vpfodvethzws5oo.jpg"
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
                    src="https://res.cloudinary.com/subframe/image/upload/v1753278651/uploads/19984/jdz5c8o2khxxfkxaruof.jpg"
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
                    src="https://res.cloudinary.com/subframe/image/upload/v1753278635/uploads/19984/iweltd05or4rpwp9njfl.jpg"
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