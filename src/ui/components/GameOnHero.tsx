"use client";

import React from "react";
import { Button } from "@/ui/components/Button";
import { FeatherZap } from "@subframe/core";

export default function GameOnHero() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 bg-black px-6 py-6">
      <div className="flex w-full max-w-[1024px] flex-col items-center justify-center gap-3">
        <img
          className="h-96 w-full flex-none object-contain"
          src="https://res.cloudinary.com/subframe/image/upload/v1752180871/uploads/19984/xz0wrne7nh62oxklt6fo.png"
        />
        <span className="w-full max-w-[768px] whitespace-pre-wrap font-['Orbitron'] text-[60px] font-[900] leading-[68px] text-default-font text-center -tracking-[0.04em] mobile:font-['Orbitron'] mobile:text-[48px] mobile:font-[400] mobile:leading-[44px] mobile:tracking-normal">
          {"LEVEL UP YOUR GAME"}
        </span>
        <span className="w-full max-w-[576px] whitespace-pre-wrap font-['Afacad_Flux'] text-[20px] font-[500] leading-[28px] text-success-700 text-center">
          {
            "Get tips, tricks, and tactics from real gamers.\nBecause sometimes, YouTube just isn't enough."
          }
        </span>
        <Button
          variant="destructive-primary"
          size="large"
          icon={<FeatherZap />}
          onClick={() => {
            window.open("https://forms.gle/9SuvcM8bGi5Lt2MS6", "_blank");
          }}
        >
          Join The Waitlist
        </Button>
      </div>
    </div>
  );
}