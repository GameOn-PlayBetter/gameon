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

  const [allCoaches, setAllCoaches] = useState<Coach[]>([]);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  // Search state
  const [search, setSearch] = useState<string>("");
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [category, setCategory] = useState<string>(""); // "" means all
  const [coachingTypeOptions, setCoachingTypeOptions] = useState<string[]>([]);
  const [coachingType, setCoachingType] = useState<string>(""); // "" means all
  const [minTokens, setMinTokens] = useState<number | "">("");
  const [maxTokens, setMaxTokens] = useState<number | "">("");
  const [tokensRange, setTokensRange] = useState<{ min: number; max: number }>({ min: 0, max: 0 });

  // Fetch all coaches and derive filter options
  useEffect(() => {
    async function fetchCoaches() {
      setLoading(true);
      try {
        const res = await fetch(`/api/coaches?brand=${pathBrand}`);
        const data = await res.json();
        setAllCoaches(data);
        setCoaches(data);

        // Distinct categories/games
        const categoriesSet = new Set<string>();
        data.forEach((c: Coach) => {
          if (c.title) categoriesSet.add(c.title);
        });
        setCategoryOptions(Array.from(categoriesSet));

        // Distinct tags
        const tagsSet = new Set<string>();
        data.forEach((c: Coach) => {
          if (c.tags) c.tags.forEach((t) => tagsSet.add(t));
        });
        setCoachingTypeOptions(Array.from(tagsSet));

        // Min/max tokens per hour
        let min = Number.POSITIVE_INFINITY;
        let max = Number.NEGATIVE_INFINITY;
        data.forEach((c: Coach) => {
          if (typeof c.tokens_per_hour === "number") {
            min = Math.min(min, c.tokens_per_hour);
            max = Math.max(max, c.tokens_per_hour);
          }
        });
        if (min === Number.POSITIVE_INFINITY) min = 0;
        if (max === Number.NEGATIVE_INFINITY) max = 0;
        setTokensRange({ min, max });
        setMinTokens("");
        setMaxTokens("");
      } catch (err) {
        console.error("Error fetching coaches:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCoaches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathBrand]);

  // Filtering logic: combine all filters and search
  useEffect(() => {
    let filtered = allCoaches;
    if (category && category !== "") {
      filtered = filtered.filter((c) => c.title === category);
    }
    if (coachingType && coachingType !== "") {
      filtered = filtered.filter((c) => c.tags?.includes(coachingType));
    }
    if (minTokens !== "" || maxTokens !== "") {
      filtered = filtered.filter((c) => {
        if (typeof c.tokens_per_hour !== "number") return false;
        if (minTokens !== "" && c.tokens_per_hour < Number(minTokens)) return false;
        if (maxTokens !== "" && c.tokens_per_hour > Number(maxTokens)) return false;
        return true;
      });
    }
    // Search filter: match display_name, title, or tags, case-insensitive
    if (search.trim() !== "") {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter((c) => {
        const name = c.display_name?.toLowerCase() ?? "";
        const title = c.title?.toLowerCase() ?? "";
        const tags = (c.tags ?? []).map((t) => t.toLowerCase());
        return (
          name.includes(q) ||
          title.includes(q) ||
          tags.some((t) => t.includes(q))
        );
      });
    }
    setCoaches(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, coachingType, minTokens, maxTokens, allCoaches, search]);

  // Handlers
  function handleClearFilters() {
    setCategory("");
    setCoachingType("");
    setMinTokens("");
    setMaxTokens("");
    setSearch("");
    setCoaches(allCoaches);
  }

  function handleMinTokensChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (val === "") setMinTokens("");
    else if (/^\d+$/.test(val)) setMinTokens(Number(val));
  }
  function handleMaxTokensChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (val === "") setMaxTokens("");
    else if (/^\d+$/.test(val)) setMaxTokens(Number(val));
  }

  return (
    <>
      <div className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 px-6 py-2 rounded-md shadow-lg pointer-events-none bg-[${brandConfig.bannerBg}] shadow-[${brandConfig.bannerShadow}]`}>
        <span className="font-['Orbitron'] text-white text-[16px] font-bold tracking-widest uppercase drop-shadow-[0_0_6px_#ffffff]">
          DEMO DATA
        </span>
      </div>

      <DefaultPageLayout>
        <div className="container max-w-none flex h-full w-full flex-col items-start gap-12 bg-transparent py-12">
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </TextField>
            </div>
          </div>

          <div className="flex w-full items-start gap-8">
            {/* Sidebar Filters */}
            <div className="flex flex-col flex-none items-start gap-4" style={{ width: "260px", alignItems: "flex-start" }}>
              <div className="w-full flex flex-col gap-2" style={{ alignItems: "flex-start" }}>
                <span
                  className="text-xs font-bold text-subtext-color cursor-pointer underline mb-1"
                  onClick={handleClearFilters}
                  style={{ alignSelf: "flex-start" }}
                  tabIndex={0}
                  role="button"
                >
                  Clear
                </span>
                {/* Categories / Games */}
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild={true}>
                    <Button
                      className="h-8 w-full flex-none"
                      style={{ width: "260px" }}
                      variant="neutral-secondary"
                      iconRight={<FeatherChevronDown />}
                      disabled={categoryOptions.length === 0}
                    >
                      {category
                        ? category
                        : "All Categories"}
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content align="start" className="bg-black/40">
                      <ToggleGroup
                        className="h-auto w-full flex-col flex-none"
                        value={category}
                        onValueChange={(val) => setCategory(val === category ? "" : val)}
                      >
                        <ToggleGroup.Item icon={null} value="">
                          All Categories
                        </ToggleGroup.Item>
                        {categoryOptions.map((cat) => (
                          <ToggleGroup.Item icon={null} value={cat} key={cat}>
                            {cat}
                          </ToggleGroup.Item>
                        ))}
                      </ToggleGroup>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
                {/* Coaching Type */}
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild={true}>
                    <Button
                      className="h-8 w-full flex-none"
                      style={{ width: "260px" }}
                      variant="neutral-secondary"
                      iconRight={<FeatherChevronDown />}
                      disabled={coachingTypeOptions.length === 0}
                    >
                      {coachingType
                        ? coachingType
                        : "Coaching Type"}
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content align="start" className="bg-black/40">
                      <ToggleGroup
                        className="h-auto w-full flex-col flex-none"
                        value={coachingType}
                        onValueChange={(val) => setCoachingType(val === coachingType ? "" : val)}
                      >
                        <ToggleGroup.Item icon={null} value="">
                          All Types
                        </ToggleGroup.Item>
                        {coachingTypeOptions.map((tag) => (
                          <ToggleGroup.Item icon={null} value={tag} key={tag}>
                            {tag}
                          </ToggleGroup.Item>
                        ))}
                      </ToggleGroup>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
                {/* Min/Max Tokens as side-by-side dropdowns */}
                <div className="flex flex-row gap-2 w-full" style={{ width: "260px" }}>
                  {/* Min Tokens Dropdown */}
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild={true}>
                      <Button
                        className="h-8 w-full flex-1"
                        style={{ minWidth: "130px", width: "130px" }}
                        variant="neutral-secondary"
                        iconRight={<FeatherChevronDown />}
                        disabled={
                          allCoaches.filter((c) => typeof c.tokens_per_hour === "number").length === 0
                        }
                      >
                        {minTokens !== ""
                          ? `Min: ${minTokens}`
                          : "Min Tokens"}
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content align="start" className="bg-black/40">
                        <ToggleGroup
                          className="h-auto w-full flex-col flex-none"
                          value={minTokens === "" ? "" : String(minTokens)}
                          onValueChange={(val) => {
                            setMinTokens(val === "" ? "" : Number(val));
                          }}
                        >
                          <ToggleGroup.Item icon={null} value="">
                            Any Min
                          </ToggleGroup.Item>
                          {Array.from(
                            new Set(
                              allCoaches
                                .map((c) => c.tokens_per_hour)
                                .filter((t): t is number => typeof t === "number")
                            )
                          )
                            .sort((a, b) => a - b)
                            .map((val) => (
                              <ToggleGroup.Item icon={null} value={String(val)} key={val}>
                                {val}
                              </ToggleGroup.Item>
                            ))}
                        </ToggleGroup>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                  {/* Max Tokens Dropdown */}
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild={true}>
                      <Button
                        className="h-8 w-full flex-1"
                        style={{ minWidth: "130px", width: "130px" }}
                        variant="neutral-secondary"
                        iconRight={<FeatherChevronDown />}
                        disabled={
                          allCoaches.filter((c) => typeof c.tokens_per_hour === "number").length === 0
                        }
                      >
                        {maxTokens !== ""
                          ? `Max: ${maxTokens}`
                          : "Max Tokens"}
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content align="start" className="bg-black/40">
                        <ToggleGroup
                          className="h-auto w-full flex-col flex-none"
                          value={maxTokens === "" ? "" : String(maxTokens)}
                          onValueChange={(val) => {
                            setMaxTokens(val === "" ? "" : Number(val));
                          }}
                        >
                          <ToggleGroup.Item icon={null} value="">
                            Any Max
                          </ToggleGroup.Item>
                          {Array.from(
                            new Set(
                              allCoaches
                                .map((c) => c.tokens_per_hour)
                                .filter((t): t is number => typeof t === "number")
                            )
                          )
                            .sort((a, b) => a - b)
                            .map((val) => (
                              <ToggleGroup.Item icon={null} value={String(val)} key={val}>
                                {val}
                              </ToggleGroup.Item>
                            ))}
                        </ToggleGroup>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </div>
              </div>
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
                      className="flex flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-black/40 px-4 py-4"
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
                          {(() => {
                            // Default to 60 min if not provided, as no duration field in Coach type
                            const duration = (coach as any).duration ?? 60;
                            const tokens = coach.tokens_per_hour ?? 0;
                            if (duration === 30) {
                              return `${tokens} Tokens/30 minutes`;
                            } else if (duration >= 60) {
                              const hours = duration / 60;
                              return `${tokens} Tokens/${hours === 1 ? "1 hr" : `${hours} hrs`}`;
                            } else {
                              return `${tokens} Tokens/${duration} min`;
                            }
                          })()}
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