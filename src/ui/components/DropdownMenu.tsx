"use client";

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";
import {
  DropdownMenu as SubframeDropdownMenu,
  FeatherStar,
} from "@subframe/core";

// ==========================
// Custom Dropdown Item
// ==========================
interface DropdownItemProps
  extends React.ComponentProps<typeof SubframeDropdownMenu.Item> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const DropdownItem = React.forwardRef<HTMLElement, DropdownItemProps>(
  function DropdownItem(
    { children, icon = null, className, ...otherProps },
    ref
  ) {
    return (
      <SubframeDropdownMenu.Item
        {...otherProps}
        ref={ref as any}
        className={SubframeUtils.twClassNames(
          "group flex h-9 w-full cursor-pointer items-center gap-2 rounded-md px-3 outline-none focus:outline-none text-white data-[highlighted]:bg-white/10",
          className
        )}
      >
        {icon ? (
          <SubframeCore.IconWrapper className="text-current">
            {icon}
          </SubframeCore.IconWrapper>
        ) : null}
        {children ? (
          <span className="line-clamp-1 grow shrink-0 basis-0 text-white">
            {children}
          </span>
        ) : null}
      </SubframeDropdownMenu.Item>
    );
  }
);

// ==========================
// Custom Dropdown Divider
// ==========================
interface DropdownDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const DropdownDivider = React.forwardRef<HTMLElement, DropdownDividerProps>(
  function DropdownDivider({ className, ...otherProps }, ref) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex w-full items-start gap-2 px-1 py-1",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div className="flex h-px grow shrink-0 basis-0 flex-col items-center gap-2 bg-white/10" />
      </div>
    );
  }
);

// ==========================
// Re-export Subframe dropdown primitives
// ==========================
const Root = SubframeDropdownMenu.Root;
const Trigger = SubframeDropdownMenu.Trigger;
const Portal = SubframeDropdownMenu.Portal;
const Content = SubframeDropdownMenu.Content;

// ==========================
// Composite Export
// ==========================
export const DropdownMenu = Object.assign({}, {
  Root,
  Trigger,
  Portal,
  Content,
  DropdownItem,
  DropdownDivider,
});