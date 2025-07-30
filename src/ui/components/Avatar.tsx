"use client";

import React from "react";
import * as SubframeUtils from "../utils";

interface AvatarRootProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "brand" | "neutral" | "error" | "success" | "warning";
  size?: "x-large" | "large" | "medium" | "small" | "x-small";
  children?: React.ReactNode;
  image?: string;
  square?: boolean;
  className?: string;
}

const AvatarRoot = React.forwardRef<HTMLElement, AvatarRootProps>(
  function AvatarRoot(
    {
      variant = "brand",
      size = "medium",
      children,
      image,
      square = false,
      className,
      ...otherProps
    }: AvatarRootProps,
    ref
  ) {

    const [imgError, setImgError] = React.useState(false);

    const sizeClasses = {
      "x-small": "h-5 w-5",
      small: "h-6 w-6",
      medium: "h-8 w-8",
      large: "h-12 w-12",
      "x-large": "h-16 w-16",
    }[size];

    const variantClasses = {
      brand: "bg-brand-100",
      warning: "bg-warning-100",
      success: "bg-success-100",
      error: "bg-error-100",
      neutral: "bg-neutral-100",
    }[variant];

    return (
      <div
        className={SubframeUtils.twClassNames(
          `relative flex flex-col items-center justify-center overflow-hidden ${
            square ? "rounded-md" : "rounded-full"
          } ${sizeClasses} ${variantClasses}`,
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        {image && !imgError ? (
          <img
            src={image}
            alt="Avatar"
className="absolute w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span
            className={SubframeUtils.twClassNames(
              "absolute text-brand-800 text-center font-['Inter']",
              {
                "text-[10px] leading-[10px]": size === "x-small" || size === "small",
                "text-[14px] leading-[14px]": size === "medium",
                "text-[18px] leading-[18px]": size === "large",
                "text-[24px] leading-[24px]": size === "x-large",
              }
            )}
          >
            {children || "Avatar"}
          </span>
        )}
      </div>
    );
  }
);

export const Avatar = AvatarRoot;