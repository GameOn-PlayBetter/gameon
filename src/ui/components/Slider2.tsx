"use client";
/*
 * Documentation:
 * Slider2 — https://app.subframe.com/2dcb043d3f5e/library?component=Slider2_13851d73-d030-4e67-9019-662aaaf09d90
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface RangeProps
  extends React.ComponentProps<typeof SubframeCore.Slider.Range> {
  className?: string;
}

const Range = React.forwardRef<HTMLElement, RangeProps>(function Range(
  { className, ...otherProps }: RangeProps,
  ref
) {
  return (
    <SubframeCore.Slider.Range asChild={true} {...otherProps}>
      <div
        className={SubframeUtils.twClassNames(
          "flex h-full flex-col items-start rounded-full bg-brand-600",
          className
        )}
        ref={ref as any}
      />
    </SubframeCore.Slider.Range>
  );
});

interface ThumbProps
  extends React.ComponentProps<typeof SubframeCore.Slider.Thumb> {
  className?: string;
}

const Thumb = React.forwardRef<HTMLElement, ThumbProps>(function Thumb(
  { className, ...otherProps }: ThumbProps,
  ref
) {
  return (
    <SubframeCore.Slider.Thumb asChild={true} {...otherProps}>
      <div
        className={SubframeUtils.twClassNames(
          "flex h-5 w-5 items-center gap-2 rounded-full bg-brand-600",
          className
        )}
        ref={ref as any}
      />
    </SubframeCore.Slider.Thumb>
  );
});

interface TrackProps
  extends React.ComponentProps<typeof SubframeCore.Slider.Track> {
  className?: string;
}

const Track = React.forwardRef<HTMLElement, TrackProps>(function Track(
  { className, ...otherProps }: TrackProps,
  ref
) {
  return (
    <SubframeCore.Slider.Track asChild={true} {...otherProps}>
      <div
        className={SubframeUtils.twClassNames(
          "flex h-1.5 w-full flex-col items-start gap-2 rounded-full bg-neutral-100",
          className
        )}
        ref={ref as any}
      >
        <Slider2.Range />
      </div>
    </SubframeCore.Slider.Track>
  );
});

interface Slider2RootProps
  extends React.ComponentProps<typeof SubframeCore.Slider.Root> {
  value?: number[];
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
  className?: string;
}

const Slider2Root = React.forwardRef<HTMLElement, Slider2RootProps>(
  function Slider2Root({ className, ...otherProps }: Slider2RootProps, ref) {
    return (
      <SubframeCore.Slider.Root asChild={true} {...otherProps}>
        <div
          className={SubframeUtils.twClassNames(
            "flex h-5 w-full cursor-pointer flex-col items-start justify-center gap-2",
            className
          )}
          ref={ref as any}
        >
          <Track />
          <Thumb />
        </div>
      </SubframeCore.Slider.Root>
    );
  }
);

export const Slider2 = Object.assign(Slider2Root, {
  Range,
  Thumb,
  Track,
});
