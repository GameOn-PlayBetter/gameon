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
  FeatherTrendingUp,
  FeatherTag,
} from "@subframe/core";

import DefaultPageLayout from "@/ui/layouts/DefaultPageLayout";
import { TextField } from "@/ui/components/TextField";
import { ToggleGroup } from "@/ui/components/ToggleGroup";
import * as SubframeCore from "@subframe/core";
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
  const overlay = brandConfig.overlay ?? "rgba(0,0,0,0.35)";

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
  // Sort state (visual ordering only; data source unchanged)
  const [sort, setSort] = useState<"default" | "tokens_asc" | "tokens_desc">("default");

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

  // Derive sorted list for display (no data changes)
  const sortedCoaches = React.useMemo(() => {
    const arr = [...coaches];
    if (sort === "tokens_asc") {
      return arr.sort((a, b) => (a.tokens_per_hour ?? Infinity) - (b.tokens_per_hour ?? Infinity));
    }
    if (sort === "tokens_desc") {
      return arr.sort((a, b) => (b.tokens_per_hour ?? -Infinity) - (a.tokens_per_hour ?? -Infinity));
    }
    return arr; // default order
  }, [coaches, sort]);

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
<style jsx global>{`
  html, body {
    background: ${brandConfig.pageBackground} !important;
  }
  footer {
    background: ${brandConfig.footerBackground ?? brandConfig.pageBackground} !important;
  }
`}</style>
  <div
    aria-hidden
    className="fixed inset-0 -z-10"
    style={{ background: brandConfig.pageBackground }}
  />
        <div
  className="container max-w-none flex h-full w-full flex-col items-start gap-12 py-12"
  style={{ background: brandConfig.pageBackground }}
>
          <div className="flex w-full items-center justify-between border-b border-solid border-neutral-border px-8 py-4">
            <span className="text-xl font-bold text-default-font">BROWSE</span>
            <TextField className="w-64" variant="filled" icon={<FeatherSearch />}> 
              <TextField.Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </TextField>
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
                <SubframeCore.DropdownMenu.Root>
                  <SubframeCore.DropdownMenu.Trigger asChild={true}>
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
                  </SubframeCore.DropdownMenu.Trigger>
                  <SubframeCore.DropdownMenu.Portal>
                    <SubframeCore.DropdownMenu.Content side="bottom" sideOffset={6} align="start" className="text-white p-2" style={{ background: "#000", color: "#fff", zIndex: 9999 }}>
                      <div className="max-h-64 overflow-auto min-w-[260px]">
                        <SubframeCore.DropdownMenu.Item className="text-white hover:bg-[rgba(255,255,255,0.06)]" onSelect={() => setCategory("")}>All Categories</SubframeCore.DropdownMenu.Item>
                        {categoryOptions.map((cat) => (
                          <SubframeCore.DropdownMenu.Item key={cat} className="text-white hover:bg-[rgba(255,255,255,0.06)]" onSelect={() => setCategory(cat)}>
                            {cat}
                          </SubframeCore.DropdownMenu.Item>
                        ))}
                      </div>
                    </SubframeCore.DropdownMenu.Content>
                  </SubframeCore.DropdownMenu.Portal>
                </SubframeCore.DropdownMenu.Root>
                {/* Coaching Type */}
                <SubframeCore.DropdownMenu.Root>
                  <SubframeCore.DropdownMenu.Trigger asChild={true}>
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
                  </SubframeCore.DropdownMenu.Trigger>
                  <SubframeCore.DropdownMenu.Portal>
                    <SubframeCore.DropdownMenu.Content side="bottom" sideOffset={6} align="start" className="text-white p-2" style={{ background: "#000", color: "#fff", zIndex: 9999 }}>
                      <div className="max-h-64 overflow-auto min-w-[260px]">
                        <SubframeCore.DropdownMenu.Item className="text-white hover:bg-[rgba(255,255,255,0.06)]" onSelect={() => setCoachingType("")}>All Types</SubframeCore.DropdownMenu.Item>
                        {coachingTypeOptions.map((tag) => (
                          <SubframeCore.DropdownMenu.Item key={tag} className="text-white hover:bg-[rgba(255,255,255,0.06)]" onSelect={() => setCoachingType(tag)}>
                            {tag}
                          </SubframeCore.DropdownMenu.Item>
                        ))}
                      </div>
                    </SubframeCore.DropdownMenu.Content>
                  </SubframeCore.DropdownMenu.Portal>
                </SubframeCore.DropdownMenu.Root>
                {/* Min/Max Tokens as side-by-side dropdowns */}
                <div className="flex flex-row gap-2 w-full" style={{ width: "260px" }}>
                  {/* Min Tokens Dropdown */}
                  <SubframeCore.DropdownMenu.Root>
                    <SubframeCore.DropdownMenu.Trigger asChild={true}>
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
                    </SubframeCore.DropdownMenu.Trigger>
                    <SubframeCore.DropdownMenu.Portal>
                      <SubframeCore.DropdownMenu.Content side="bottom" sideOffset={6} align="start" className="text-white p-2" style={{ background: "#000", color: "#fff", zIndex: 9999 }}>
                        <div className="max-h-64 overflow-auto min-w-[200px]">
                          <SubframeCore.DropdownMenu.Item className="text-white hover:bg-[rgba(255,255,255,0.06)]" onSelect={() => setMinTokens("")}>Any Min</SubframeCore.DropdownMenu.Item>
                          {Array.from(new Set(allCoaches.map((c) => c.tokens_per_hour).filter((t) => typeof t === "number")))
                            .sort((a, b) => (a as number) - (b as number))
                            .map((val) => (
                              <SubframeCore.DropdownMenu.Item key={String(val)} className="text-white hover:bg-[rgba(255,255,255,0.06)]" onSelect={() => setMinTokens(Number(val))}>
                                {String(val)}
                              </SubframeCore.DropdownMenu.Item>
                            ))}
                        </div>
                      </SubframeCore.DropdownMenu.Content>
                    </SubframeCore.DropdownMenu.Portal>
                  </SubframeCore.DropdownMenu.Root>
                  {/* Max Tokens Dropdown */}
                  <SubframeCore.DropdownMenu.Root>
                    <SubframeCore.DropdownMenu.Trigger asChild={true}>
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
                    </SubframeCore.DropdownMenu.Trigger>
                    <SubframeCore.DropdownMenu.Portal>
                      <SubframeCore.DropdownMenu.Content side="bottom" sideOffset={6} align="start" className="text-white p-2" style={{ background: "#000", color: "#fff", zIndex: 9999 }}>
                        <div className="max-h-64 overflow-auto min-w-[200px]">
                          <SubframeCore.DropdownMenu.Item className="text-white hover:bg-[rgba(255,255,255,0.06)]" onSelect={() => setMaxTokens("")}>Any Max</SubframeCore.DropdownMenu.Item>
                          {Array.from(new Set(allCoaches.map((c) => c.tokens_per_hour).filter((t) => typeof t === "number")))
                            .sort((a, b) => (a as number) - (b as number))
                            .map((val) => (
                              <SubframeCore.DropdownMenu.Item key={String(val)} className="text-white hover:bg-[rgba(255,255,255,0.06)]" onSelect={() => setMaxTokens(Number(val))}>
                                {String(val)}
                              </SubframeCore.DropdownMenu.Item>
                            ))}
                        </div>
                      </SubframeCore.DropdownMenu.Content>
                    </SubframeCore.DropdownMenu.Portal>
                  </SubframeCore.DropdownMenu.Root>
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
              <div className="flex w-full items-center justify-end">
                <SubframeCore.DropdownMenu.Root>
                  <SubframeCore.DropdownMenu.Trigger asChild={true}>
                    <Button className="h-8 flex-none" variant="neutral-secondary" iconRight={<FeatherChevronDown />}> 
                      Sort by: {sort === "default" ? "Default" : sort === "tokens_asc" ? "Tokens: Low to High" : "Tokens: High to Low"}
                    </Button>
                  </SubframeCore.DropdownMenu.Trigger>
                  <SubframeCore.DropdownMenu.Portal>
                    <SubframeCore.DropdownMenu.Content align="end" className="text-white p-2" style={{ background: "#000", color: "#fff", minWidth: "260px" }}>
                      <SubframeCore.DropdownMenu.Item onSelect={() => setSort("default")}>
                        <div className="flex items-center gap-2"><FeatherTrendingUp /><span>Default</span></div>
                      </SubframeCore.DropdownMenu.Item>
                      <SubframeCore.DropdownMenu.Item onSelect={() => setSort("tokens_asc")}>
                        <div className="flex items-center gap-2"><FeatherTag /><span>Tokens: Low to High</span></div>
                      </SubframeCore.DropdownMenu.Item>
                      <SubframeCore.DropdownMenu.Item onSelect={() => setSort("tokens_desc")}>
                        <div className="flex items-center gap-2"><FeatherTag /><span>Tokens: High to Low</span></div>
                      </SubframeCore.DropdownMenu.Item>
                    </SubframeCore.DropdownMenu.Content>
                  </SubframeCore.DropdownMenu.Portal>
                </SubframeCore.DropdownMenu.Root>
              </div>

              <div className="w-full items-start gap-4 grid grid-cols-3">
                {!loading &&
                  sortedCoaches.map((coach) => (
                    <div
                      key={coach.display_name}
                      className="flex flex-col items-start gap-4 rounded-lg border border-solid border-neutral-border p-4"
                      style={{ background: overlay, boxShadow: "0 0 20px rgba(255,255,255,0.6)" }}
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