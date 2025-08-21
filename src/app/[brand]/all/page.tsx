"use client";
import * as SubframeCore from "@subframe/core";
import { TextField } from "../../../ui/components/TextField";
import { Alert } from "../../../ui/components/Alert";
import { Button } from "../../../ui/components/Button";
import { Badge } from "../../../ui/components/Badge";
import BrandPageLayout from "../../../ui/layouts/BrandPageLayout";
import { BrandThemeProvider } from "../../../app/context/BrandThemeContext";
import { getBrandConfig } from "../../../lib/brands";
import {
  Search as FeatherSearch,
  ChevronDown as FeatherChevronDown,
  Info as FeatherInfo,
  TrendingUp as FeatherTrendingUp,
  Users as FeatherUsers,
  DollarSign as FeatherDollarSign,
  Plus as FeatherPlus,
} from "react-feather";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Page({ params }: { params: { brand: string } }) {
  const brandName = params?.brand?.toLowerCase?.() ?? "";
  const brandConfig = getBrandConfig(brandName) as any;
  const themeColors = ((brandConfig && brandConfig.colors) || {}) as any;
  const btnBg = themeColors.button ?? themeColors.primary ?? "#DC00B0";
  const btnText = themeColors.textOnPrimary ?? themeColors.text ?? "#FFFFFF";
  const btnHover = themeColors.hover ?? themeColors.primary ?? "#DC00B0";
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const PAGE_SIZE = 9;
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // filters
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minTokens, setMinTokens] = useState<number | null>(null);
  const [maxTokens, setMaxTokens] = useState<number | null>(null);
  const [sort, setSort] = useState<"newest" | "tokens_asc" | "tokens_desc">("newest");

  // options (fetched per-brand)
  const [categories, setCategories] = useState<string[]>([]);
  const [tokenOptions, setTokenOptions] = useState<number[]>([]);

  const [openCat, setOpenCat] = useState(false);
  const [openMin, setOpenMin] = useState(false);
  const [openMax, setOpenMax] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function run() {
      setLoading(true);
      setError(null);
      const start = page * PAGE_SIZE;
      const end = start + PAGE_SIZE - 1;

      let queryBuilder = supabase
        .from("catalog_items")
        .select("id, title, image_url, category, tokens, brand, active, created_at, coaches_count")
        .eq("brand", brandName)
        .eq("active", true);

      if (query && query.trim().length > 0) {
        queryBuilder = queryBuilder.ilike("title", `%${query.trim()}%`);
      }
      if (selectedCategory) {
        queryBuilder = queryBuilder.eq("category", selectedCategory);
      }
      if (minTokens !== null) {
        queryBuilder = queryBuilder.gte("tokens", minTokens);
      }
      if (maxTokens !== null) {
        queryBuilder = queryBuilder.lte("tokens", maxTokens);
      }

      if (sort === "tokens_asc") {
        queryBuilder = queryBuilder.order("tokens", { ascending: true, nullsFirst: false });
      } else if (sort === "tokens_desc") {
        queryBuilder = queryBuilder.order("tokens", { ascending: false, nullsFirst: false });
      } else {
        queryBuilder = queryBuilder.order("created_at", { ascending: false });
      }

      const { data, error } = await queryBuilder.range(start, end);

      if (!isMounted) return;
      if (error) {
        setError(error.message);
        setItems([]);
        setHasMore(false);
      } else {
        const rows = data ?? [];
        if (page === 0) {
          setItems(rows);
        } else {
          setItems(prev => [...prev, ...rows]);
        }
        if (rows.length < PAGE_SIZE) setHasMore(false);
      }
      setLoading(false);
    }
    if (brandName) run();
    return () => {
      isMounted = false;
    };
  }, [brandName, page, query, selectedCategory, minTokens, maxTokens, sort]);

  useEffect(() => { setItems([]); setPage(0); setHasMore(true); }, [brandName]);

  // load filter options for this brand
  useEffect(() => {
    let isMounted = true;
    async function loadOptions() {
      // categories
      const { data: catRows } = await supabase
        .from("catalog_items")
        .select("category")
        .eq("brand", brandName)
        .eq("active", true)
        .not("category", "is", null);
      const cats = Array.from(new Set((catRows || []).map(r => r.category))).sort();

      // tokens (distinct)
      const { data: tokRows } = await supabase
        .from("catalog_items")
        .select("tokens")
        .eq("brand", brandName)
        .eq("active", true)
        .not("tokens", "is", null);
      const toks = Array.from(new Set((tokRows || []).map(r => r.tokens))).filter(n => typeof n === 'number').sort((a: number, b: number) => a - b);

      if (!isMounted) return;
      setCategories(cats);
      setTokenOptions(toks as number[]);
    }
    if (brandName) loadOptions();
    return () => { isMounted = false; };
  }, [brandName]);

  // reset pagination whenever filters/sort change
  useEffect(() => {
    setItems([]);
    setPage(0);
    setHasMore(true);
  }, [query, selectedCategory, minTokens, maxTokens, sort]);

  return (
    <BrandThemeProvider brandName={brandName}>
      <BrandPageLayout brandName={brandName}>
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full items-center justify-between border-b border-solid border-neutral-border px-8 py-4">
            <span className="text-heading-2 font-heading-2 text-default-font">Browse</span>
            <TextField className="w-64" variant="filled" icon={<FeatherSearch />}>
              <TextField.Input placeholder="Search..." value={query} onChange={(e: any) => setQuery(e.target.value)} />
            </TextField>
          </div>
          <div className="flex w-full flex-col gap-6 p-6">
            <Alert 
              variant="neutral" 
              icon={<FeatherInfo />}
              title="Most Popular"
              description="Showing the most active items. Use filters to refine."
            />
            <div className="flex w-full items-start gap-6">
              <div className="flex w-80 flex-none flex-col gap-6 relative" onMouseLeave={() => { setOpenCat(false); setOpenMin(false); setOpenMax(false); }}>
                <div className="flex w-full flex-col gap-3">
                  <span className="text-body-bold font-body-bold text-default-font">Category</span>
                  <div className="w-full">
                    <Button
                      onClick={() => { setOpenCat(v => !v); setOpenMin(false); setOpenMax(false); }}
                      style={{ backgroundColor: btnBg, color: btnText }}
                      iconRight={<FeatherChevronDown />}
                      className="hover:brightness-110 transition"
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = btnHover;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = btnBg;
                      }}
                    >
                      {selectedCategory ?? "All Categories"}
                    </Button>
                    {openCat && (
                      <div className="mt-2 max-h-64 w-full overflow-auto rounded-md border border-neutral-border bg-[rgba(0,0,0,0.6)] backdrop-blur p-2 z-10">
                        <div>
                          <div
                            key="all-categories"
                            role="button"
                            className="w-full text-left px-3 py-2 rounded cursor-pointer font-body text-body text-default-font hover:bg-[rgba(255,255,255,0.06)]"
                            onClick={() => { setSelectedCategory(null); setOpenCat(false); }}
                          >
                            All Categories
                          </div>
                          <div className="my-1 h-px bg-neutral-border" />
                          {categories.map((cat) => (
                            <div
                              key={cat}
                              role="button"
                              className="w-full text-left px-3 py-2 rounded cursor-pointer font-body text-body text-default-font hover:bg-[rgba(255,255,255,0.06)]"
                              onClick={() => { setSelectedCategory(cat); setOpenCat(false); }}
                            >
                              {cat}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex w-full flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-body-bold font-body-bold text-default-font">Price Range</span>
                    <span
                      role="button"
                      className="text-sm text-subtext-color underline hover:opacity-80 cursor-pointer"
                      onClick={() => { setMinTokens(null); setMaxTokens(null); }}
                    >
                      Clear
                    </span>
                  </div>
                  <div className="flex w-full items-center gap-2">
                    <div className="w-full relative">
                      <Button
                        onClick={() => { setOpenMin(v => !v); setOpenCat(false); setOpenMax(false); }}
                        style={{ backgroundColor: btnBg, color: btnText }}
                        iconRight={<FeatherChevronDown />}
                        className="hover:brightness-110 transition"
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = btnHover;
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = btnBg;
                        }}
                      >
                        Min Tokens{minTokens !== null ? `: ${minTokens}` : ""}
                      </Button>
                      {openMin && (
                        <div className="absolute mt-2 max-h-64 w-full overflow-auto rounded-md border border-neutral-border bg-[rgba(0,0,0,0.6)] backdrop-blur p-2 z-10">
                          <div>
                            <div
                              key="min-any"
                              role="button"
                              className="w-full text-left px-3 py-2 rounded cursor-pointer font-body text-body text-default-font hover:bg-[rgba(255,255,255,0.06)]"
                              onClick={() => { setMinTokens(null); setOpenMin(false); }}
                            >
                              Any
                            </div>
                            <div className="my-1 h-px bg-neutral-border" />
                            {tokenOptions.map((i) => (
                              <div
                                key={i}
                                role="button"
                                className="w-full text-left px-3 py-2 rounded cursor-pointer font-body text-body text-default-font hover:bg-[rgba(255,255,255,0.06)]"
                                onClick={() => { setMinTokens(i); setOpenMin(false); }}
                              >
                                {i}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="w-full relative">
                      <Button
                        onClick={() => { setOpenMax(v => !v); setOpenCat(false); setOpenMin(false); }}
                        style={{ backgroundColor: btnBg, color: btnText }}
                        iconRight={<FeatherChevronDown />}
                        className="hover:brightness-110 transition"
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = btnHover;
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = btnBg;
                        }}
                      >
                        Max Tokens{maxTokens !== null ? `: ${maxTokens}` : ""}
                      </Button>
                      {openMax && (
                        <div className="absolute mt-2 max-h-64 w-full overflow-auto rounded-md border border-neutral-border bg-[rgba(0,0,0,0.6)] backdrop-blur p-2 z-10">
                          <div>
                            <div
                              key="max-any"
                              role="button"
                              className="w-full text-left px-3 py-2 rounded cursor-pointer font-body text-body text-default-font hover:bg-[rgba(255,255,255,0.06)]"
                              onClick={() => { setMaxTokens(null); setOpenMax(false); }}
                            >
                              Any
                            </div>
                            <div className="my-1 h-px bg-neutral-border" />
                            {tokenOptions.map((i) => (
                              <div
                                key={i}
                                role="button"
                                className="w-full text-left px-3 py-2 rounded cursor-pointer font-body text-body text-default-font hover:bg-[rgba(255,255,255,0.06)]"
                                onClick={() => { setMaxTokens(i); setOpenMax(false); }}
                              >
                                {i}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex grow flex-col gap-6">
                <div className="flex items-center justify-end">
                  <SubframeCore.DropdownMenu.Root>
                    <SubframeCore.DropdownMenu.Trigger asChild={true}>
                      <Button
                        style={{ cursor: "pointer", backgroundColor: btnBg, color: btnText }}
                        iconRight={<FeatherChevronDown />}
                        className="hover:brightness-110 transition"
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = btnHover;
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = btnBg;
                        }}
                      >
                        Sort by: {sort === "newest" ? "Newest" : sort === "tokens_asc" ? "Tokens: Low to High" : "Tokens: High to Low"}
                      </Button>
                    </SubframeCore.DropdownMenu.Trigger>
                    <SubframeCore.DropdownMenu.Content side="bottom" align="end" sideOffset={4} asChild={true} className="z-[9999]">
                      <div className="z-50">
                        <SubframeCore.DropdownMenu.Item className="cursor-pointer select-none" onSelect={() => setSort("newest")}>
                          <div className="flex items-center gap-2">
                            <FeatherTrendingUp />
                            <span>Newest</span>
                          </div>
                        </SubframeCore.DropdownMenu.Item>
                        <SubframeCore.DropdownMenu.Item className="cursor-pointer select-none" onSelect={() => setSort("tokens_asc")}>
                          <div className="flex items-center gap-2">
                            <FeatherDollarSign />
                            <span>Tokens: Low to High</span>
                          </div>
                        </SubframeCore.DropdownMenu.Item>
                        <SubframeCore.DropdownMenu.Item className="cursor-pointer select-none" onSelect={() => setSort("tokens_desc")}>
                          <div className="flex items-center gap-2">
                            <FeatherDollarSign />
                            <span>Tokens: High to Low</span>
                          </div>
                        </SubframeCore.DropdownMenu.Item>
                      </div>
                    </SubframeCore.DropdownMenu.Content>
                  </SubframeCore.DropdownMenu.Root>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {loading && (
                    <div className="col-span-full">
                      <Alert variant="neutral" icon={<FeatherInfo />} title="Loading" description="Fetching content..." />
                    </div>
                  )}
                  {error && (
                    <div className="col-span-full">
                      <Alert variant="error" icon={<FeatherInfo />} title="Error" description={error} />
                    </div>
                  )}
                  {!loading && !error && items.length === 0 && (
                    <div className="col-span-full text-center text-gray-400 text-xl py-12">No results found.</div>
                  )}
                  {!loading && !error && items.map((item) => (
                    <div key={item.id} className="flex flex-col gap-4 rounded-lg border border-solid border-neutral-border p-4">
                      <img className="h-48 w-full rounded-md object-cover" src={item.image_url || "https://placehold.co/600x400"} alt={item.title} />
                      <div className="flex flex-col gap-2">
                        <span className="text-heading-3 font-heading-3 text-default-font">{item.title}</span>
                        <div className="flex gap-2">
                          {/* Coach count will come later from a view; for now just show category badge if present */}
                          {item.category && <Badge variant="neutral">{item.category}</Badge>}
                        </div>
                        {typeof item.tokens === "number" && (
                          <span className="text-body font-body text-subtext-color">
                            Starting from {item.tokens} tokens
                          </span>
                        )}
                      </div>
                      <Button
                        style={{ backgroundColor: btnBg, color: btnText }}
                        icon={<FeatherUsers />}
                        className="hover:brightness-110 transition"
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = btnHover;
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLButtonElement).style.backgroundColor = btnBg;
                        }}
                      >
                        Find Coach
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex w-full justify-center pt-8">
                  <Button
                    size="large"
                    style={{ backgroundColor: btnBg, color: btnText }}
                    icon={<FeatherPlus />}
                    onClick={() => setPage(p => p + 1)}
                    disabled={!hasMore || loading}
                    className="hover:brightness-110 transition"
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = btnHover;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = btnBg;
                    }}
                  >
                    {loading ? "Loading..." : hasMore ? "Load More" : "No more items"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrandPageLayout>
    </BrandThemeProvider>
  );
}
