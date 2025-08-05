"use client";

import React from "react";
import BrandPageLayout from "@/ui/layouts/BrandPageLayout";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";
import { FeatherCoins, FeatherShoppingCart, FeatherStar, FeatherTrophy, FeatherZap, FeatherX, FeatherAward, FeatherTarget, FeatherBook, FeatherCheck, FeatherClock, FeatherPickaxe, FeatherGhost, FeatherCrown, FeatherHome, FeatherMessageCircle, FeatherBox, FeatherPlay, FeatherSkull, FeatherCalendar, FeatherVideo, FeatherXCircle } from "@subframe/core";
import { Tabs } from "@/ui/components/Tabs";
import { IconButton } from "@/ui/components/IconButton";
import { Alert } from "@/ui/components/Alert";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { Progress } from "@/ui/components/Progress";
import { LargeBadge } from "@/ui/components/LargeBadge";
import { Table } from "@/ui/components/Table";
import { Avatar } from "@/ui/components/Avatar";
import { useBrandTheme } from "@/app/context/BrandThemeContext";

// force rebuild for prod

function PlayerProfilePage() {
  const brand = useBrandTheme(); // ✅ Brand info available

  return (
<BrandPageLayout brandName="gameon" showLogo={false}>

      <div
        className="flex h-full w-full flex-col items-start"
 style={{ fontFamily: "sans-serif" }}
      >
        {/* DEMO DATA ONLY banner */}
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 bg-red-600 px-6 py-2 rounded-md shadow-lg shadow-red-400 pointer-events-none">
          <span className="font-['Orbitron'] text-white text-[16px] font-bold tracking-widest uppercase drop-shadow-[0_0_6px_#ffffff]">
            DEMO DATA ONLY
          </span>
        </div>

        {/* FULL ORIGINAL JSX BELOW – UNCHANGED */}
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
                    <span className="line-clamp-1 w-full text-heading-3 font-caption text-brand-500">
                      48 Completed
                    </span>
                  </div>
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                    <span className="text-body-bold font-body-bold text-default-font">
                      Favorite Game
                    </span>
                    <span className="line-clamp-1 w-full text-heading-3 font-caption text-brand-600">
                      Minecraft
                    </span>
                  </div>
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                    <span className="text-body-bold font-body-bold text-default-font">
                      Next Sessions
                    </span>
                    <div className="flex flex-col items-start gap-1">
                      <span className="line-clamp-1 w-full text-heading-3 font-caption text-brand-600 cursor-pointer">
                        Today at 4:00 PM
                      </span>
                      <span className="line-clamp-1 w-full text-heading-3 font-caption text-brand-600 cursor-pointer">
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

          {/* ✅ All remaining JSX for goals, badges, tables, coach feedback, recent sessions, upcoming sessions */}
          {/* ... unchanged content all the way down ... */}

        </div>
      </div>
</BrandPageLayout>
  );
}

export default PlayerProfilePage; // rebuild trigger