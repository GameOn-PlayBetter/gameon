"use client";
/*
 * Documentation:
 * Default Page Layout — https://app.subframe.com/2dcb043d3f5e/library?component=Default+Page+Layout_a57b1c43-310a-493f-b807-8cc88e2452cf
 * Badge — https://app.subframe.com/2dcb043d3f5e/library?component=Badge_97bdb082-1124-4dd7-a335-b14b822d0157
 * Topbar with right nav — https://app.subframe.com/2dcb043d3f5e/library?component=Topbar+with+right+nav_d20e2e52-ba3d-4133-901a-9a15f7f729a9
 * Dropdown Menu — https://app.subframe.com/2dcb043d3f5e/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
 * Avatar — https://app.subframe.com/2dcb043d3f5e/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { Badge } from "../components/Badge";
import { TopbarWithRightNav } from "../components/TopbarWithRightNav";
import { DropdownMenu } from "../components/DropdownMenu";
import { FeatherUser } from "@subframe/core";
import { FeatherSettings } from "@subframe/core";
import { FeatherLogOut } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import { Avatar } from "../components/Avatar";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginModal } from "../components/LoginModal";

interface DefaultPageLayoutRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const DefaultPageLayoutRoot = React.forwardRef<
  HTMLElement,
  DefaultPageLayoutRootProps
>(function DefaultPageLayoutRoot(
  { children, className, ...otherProps }: DefaultPageLayoutRootProps,
  ref
) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  const handleEarnTokensClick = () => {
    const isLoggedIn = false; // Temporary logic
    if (isLoggedIn) {
      router.push("/refer-friends");
    } else {
      setIsDrawerOpen(true);
    }
  };

  const handleDrawerConfirm = () => {
    setIsDrawerOpen(false);
    router.push("/refer-friends");
  };
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-screen w-full flex-col items-center",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <TopbarWithRightNav
        leftSlot={
          <>
            <Link href="/" passHref>
  <img
    className="h-20 min-w-[24px] flex-none object-cover cursor-pointer"
    src="https://res.cloudinary.com/subframe/image/upload/v1752251109/uploads/19984/hu20lhnnzh1u7drpjg4p.png"
    alt="GameOn Logo"
  />
</Link>
          </>
        }
        rightSlot={
          <>
            <div className="flex items-center justify-end gap-2">
              <TopbarWithRightNav.NavItem selected={true}>
                Home
              </TopbarWithRightNav.NavItem>
              <TopbarWithRightNav.NavItem onClick={() => setIsDrawerOpen(true)}>
  Login
</TopbarWithRightNav.NavItem>
              <TopbarWithRightNav.NavItem onClick={handleEarnTokensClick}>
  Earn Tokens
</TopbarWithRightNav.NavItem>
            </div>
            <SubframeCore.DropdownMenu.Root>
              <SubframeCore.DropdownMenu.Trigger asChild={true}>
                <Avatar image="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/fychrij7dzl8wgq2zjq9.avif">
                  A
                </Avatar>
              </SubframeCore.DropdownMenu.Trigger>
              <SubframeCore.DropdownMenu.Portal>
                <SubframeCore.DropdownMenu.Content
                  side="bottom"
                  align="end"
                  sideOffset={4}
                  asChild={true}
                >
                  <DropdownMenu>
                    <DropdownMenu.DropdownItem icon={<FeatherUser />}>
                      Profile
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon={<FeatherSettings />}>
                      Settings
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon={<FeatherLogOut />}>
                      Log out
                    </DropdownMenu.DropdownItem>
                  </DropdownMenu>
                </SubframeCore.DropdownMenu.Content>
              </SubframeCore.DropdownMenu.Portal>
            </SubframeCore.DropdownMenu.Root>
          </>
        }
      />
      {children ? (
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 overflow-y-auto bg-default-background">
          {children}
        </div>
      ) : null}
<LoginModal
  open={isDrawerOpen}
  onClose={() => setIsDrawerOpen(false)}
/>
    </div>
  );
});

export const DefaultPageLayout = DefaultPageLayoutRoot;
