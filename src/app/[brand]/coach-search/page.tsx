"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";


import {
  FeatherGamepad,
  FeatherSearch,
  FeatherChevronDown,
  FeatherStar,
  FeatherChevronLeft,
  FeatherHeart,
} from "@subframe/core";

import DefaultPageLayout from "@/ui/layouts/DefaultPageLayout";
import { TextField } from "@/ui/components/TextField";
import { ToggleGroup } from "@/ui/components/ToggleGroup";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import { Button } from "@/ui/components/Button";
import { Slider } from "@/ui/components/Slider";
import { Avatar } from "@/ui/components/Avatar";
import { IconButton } from "@/ui/components/IconButton";
import { Badge } from "@/ui/components/Badge";
import { brands } from "@/lib/brands";

interface Coach {
  display_name: string;
  title: string;
  avatar_url?: string;
  tags?: string[];
  description?: string;
  rating?: number;
  num_reviews?: number;
  tokens_per_hour?: number;
}

function PlayerProfilePage() {
  const pathname = usePathname();
  const pathBrand = pathname?.split("/")[1] || "skillery";
  const brandConfig = brands[pathBrand] || brands["skillery"];

  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoaches() {
      try {
        const res = await fetch(`/api/coaches?brand=${pathBrand}`);
        const data = await res.json();
        setCoaches(data);
      } catch (err) {
        console.error("Error fetching coaches:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCoaches();
  }, [pathBrand]);

  return (
    <>
      <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 bg-red-600 px-6 py-2 rounded-md shadow-lg shadow-red-400 pointer-events-none">
        <span className="font-['Orbitron'] text-white text-[16px] font-bold tracking-widest uppercase drop-shadow-[0_0_6px_#ffffff]">
          DEMO DATA
        </span>
      </div>

      <DefaultPageLayout>
        <div className="container max-w-none flex h-full w-full flex-col items-start gap-12 bg-default-background py-12">
          <div className="flex w-full flex-col items-center justify-center gap-6">
            <div className="flex w-full max-w-[576px] flex-col items-center justify-center gap-6">
              <div className="flex w-full flex-col items-center justify-center gap-2">
                <FeatherGamepad className="text-heading-1 font-heading-1 text-default-font" />
                <span className="w-full text-heading-1 font-heading-1 text-default-font text-center">
                  {`Find Your Perfect ${brandConfig.name} Coach`}
                </span>
                <span className="text-body font-body text-subtext-color text-center">
                  {brandConfig.description}
                </span>
              </div>
              <TextField
                className="h-auto w-full flex-none"
                variant="filled"
                label=""
                helpText=""
                icon={<FeatherSearch />}
              >
                <TextField.Input
                  placeholder="Search by game, expertise, or coaching style"
                  value=""
                  onChange={() => {}}
                />
              </TextField>
            </div>
          </div>

          <div className="flex w-full items-start gap-8">
            {/* Sidebar Filters */}
            <div className="flex w-64 flex-none flex-col items-start gap-4">
              {["Coaching Type", "Game", "Price Range"].map((label, idx) => (
                <DropdownMenu.Root key={label}>
                  <DropdownMenu.Trigger asChild={true}>
                    <Button
                      className="h-8 w-full flex-none"
                      variant="neutral-secondary"
                      iconRight={<FeatherChevronDown />}
                    >
                      {label}
                    </Button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content align="start">
                      {idx < 2 ? (
                        <ToggleGroup
                          className="h-auto w-full flex-none"
                          value=""
                          onValueChange={() => {}}
                        >
                          <ToggleGroup.Item icon={null} value="1">
                            Option 1
                          </ToggleGroup.Item>
                          <ToggleGroup.Item icon={null} value="2">
                            Option 2
                          </ToggleGroup.Item>
                        </ToggleGroup>
                      ) : (
                        <div className="flex w-full flex-col items-start gap-4 px-4 py-4">
                          <Slider value={[]} onValueChange={() => {}} />
                        </div>
                      )}
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              ))}
            </div>

            {/* Coach Grid */}
            <div className="flex flex-col items-start gap-6 grow">
              <div className="flex w-full items-center justify-between">
                <span className="text-body font-body text-subtext-color">
                  {loading ? "Loading..." : `${coaches.length} coaches found`}
                </span>
              </div>

              <div className="w-full items-start gap-4 grid grid-cols-3">
                {!loading &&
                  coaches.map((coach) => (
                    <div
                      key={coach.display_name}
                      className="flex flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-4"
                    >
                      <div className="flex w-full items-start justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar size="large" image={coach.avatar_url}>
                            {coach.display_name[0]}
                          </Avatar>
                          <div className="flex flex-col items-start">
                            <span className="text-heading-3 font-heading-3 text-default-font">
                              {coach.display_name}
                            </span>
                            <span className="text-body font-body text-subtext-color">
                              {coach.title}
                            </span>
                          </div>
                        </div>
                        <IconButton icon={<FeatherHeart />} onClick={() => {}} />
                      </div>

                      <div className="flex flex-wrap items-start gap-2">
                        {coach.tags?.map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>

                      <span className="text-body font-body text-default-font">
                        {coach.description}
                      </span>

                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-1">
                          <FeatherStar className="text-body font-body text-default-font" />
                          <span className="text-body-bold font-body-bold text-default-font">
                            {coach.rating?.toFixed(1) ?? "N/A"}
                          </span>
                          <span className="text-body font-body text-subtext-color">
                            ({coach.num_reviews ?? 0})
                          </span>
                        </div>
                        <span className="text-body-bold font-body-bold text-default-font">
                          ${coach.tokens_per_hour}/hr
                        </span>
                      </div>

                      <Button
                        className="h-8 w-full flex-none"
                        variant="brand-secondary"
                        onClick={() => {}}
                      >
                        View Profile
                      </Button>
                    </div>
                  ))}
              </div>

              <div className="flex w-full items-center justify-center gap-2">
                <Button variant="neutral-secondary" icon={<FeatherChevronLeft />}>
                  Previous
                </Button>
                <Button variant="brand-secondary">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </DefaultPageLayout>
    </>
  );
}

export default PlayerProfilePage;