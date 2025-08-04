"use client";

import React, { useState } from "react";
import * as SubframeUtils from "../utils";
import { TopbarWithRightNav } from "../components/TopbarWithRightNav";
import { DropdownMenu } from "../components/DropdownMenu";
import { FeatherUser, FeatherSettings, FeatherLogOut } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import { Avatar } from "../components/Avatar";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { LoginModal } from "../components/LoginModal";
import { brands } from "@/lib/brands";

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
 const params = useParams() || {};
const brand = (params as Record<string, string | string[]>).brand;

const brandKey = Array.isArray(brand)
  ? brand[0].toLowerCase()
  : brand?.toLowerCase() || "gameon"; // fallback to gameon
const brandConfig = brands[brandKey] || brands.gameon; // fallback to GameOn
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
      style={{ backgroundColor: brandConfig.colors.primary }} // ✅ brand background
      ref={ref as any}
      {...otherProps}
    >
      <TopbarWithRightNav
        leftSlot={
<Link
  href={
    brandKey === "skillery"
      ? "/" // ✅ Skillery goes to root landing page
      : `/${brandKey || "gameon"}` // ✅ Other brands keep normal behavior
  }
  passHref
>
  <img
    className="h-20 min-w-[24px] flex-none object-cover cursor-pointer"
    src={brandConfig.logo}
    alt={`${brandConfig.name} Logo`}
  />
</Link>
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
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 overflow-y-auto">
          {children}
        </div>
      ) : null}

      <LoginModal open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
});

export const DefaultPageLayout = DefaultPageLayoutRoot;