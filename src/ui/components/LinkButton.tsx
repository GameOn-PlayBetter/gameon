"use client";
/*
 * Documentation:
 * Link Button — https://app.subframe.com/2dcb043d3f5e/library?component=Link+Button_a4ee726a-774c-4091-8c49-55b659356024
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface LinkButtonRootProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "brand" | "neutral" | "inverse";
  size?: "large" | "medium" | "small";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  href?: string;
}

const LinkButtonRoot = React.forwardRef<HTMLElement, LinkButtonRootProps>(
  function LinkButtonRoot(
    {
      variant = "neutral",
      size = "medium",
      icon = null,
      children,
      iconRight = null,
      className,
      type = "button",
      href,
      ...otherProps
    }: LinkButtonRootProps,
    ref
  ) {
    const commonClasses = SubframeUtils.twClassNames(
      "group/a4ee726a flex cursor-pointer items-center gap-1 border-none bg-transparent",
      { "flex-row flex-nowrap gap-1": size === "large" },
      className
    );

    const contents = (
      <>
        {icon ? (
          <SubframeCore.IconWrapper
            className={SubframeUtils.twClassNames(
              "text-body font-body text-neutral-700 group-hover/a4ee726a:text-brand-700 group-disabled/a4ee726a:text-neutral-400 group-hover/a4ee726a:group-disabled/a4ee726a:text-neutral-400",
              {
                "text-caption font-caption": size === "small",
                "text-heading-3 font-heading-3": size === "large",
                "text-black group-hover/a4ee726a:text-black":
                  variant === "inverse",
                "text-brand-700 group-hover/a4ee726a:text-brand-700":
                  variant === "brand",
              }
            )}
          >
            {icon}
          </SubframeCore.IconWrapper>
        ) : null}
        {children ? (
          <span
            className={SubframeUtils.twClassNames(
              "text-body font-body text-neutral-700 group-hover/a4ee726a:text-brand-700 group-hover/a4ee726a:underline group-disabled/a4ee726a:text-neutral-400 group-hover/a4ee726a:group-disabled/a4ee726a:text-neutral-400 group-hover/a4ee726a:group-disabled/a4ee726a:no-underline",
              {
                "text-caption font-caption": size === "small",
                "text-heading-3 font-heading-3": size === "large",
                "text-black group-hover/a4ee726a:text-black":
                  variant === "inverse",
                "text-brand-700 group-hover/a4ee726a:text-brand-700":
                  variant === "brand",
              }
            )}
          >
            {children}
          </span>
        ) : null}
        {iconRight ? (
          <SubframeCore.IconWrapper
            className={SubframeUtils.twClassNames(
              "text-body font-body text-neutral-700 group-hover/a4ee726a:text-brand-700 group-disabled/a4ee726a:text-neutral-400 group-hover/a4ee726a:group-disabled/a4ee726a:text-neutral-400",
              {
                "text-caption font-caption": size === "small",
                "text-heading-3 font-heading-3": size === "large",
                "text-black group-hover/a4ee726a:text-black":
                  variant === "inverse",
                "text-brand-700 group-hover/a4ee726a:text-brand-700":
                  variant === "brand",
              }
            )}
          >
            {iconRight}
          </SubframeCore.IconWrapper>
        ) : null}
      </>
    );

    if (href) {
      return (
        <a
          className={commonClasses}
          href={href}
          ref={ref as any}
          {...(otherProps as any)}
        >
          {contents}
        </a>
      );
    }

    return (
      <button
        className={commonClasses}
        type={type}
        ref={ref as any}
        {...otherProps}
      >
        {contents}
      </button>
    );
  }
);

export const LinkButton = LinkButtonRoot;