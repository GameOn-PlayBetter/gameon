"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import DefaultPageLayout from "@/ui/layouts/DefaultPageLayout";
import { Badge } from "@/ui/components/Badge";
import { FeatherShield } from "@subframe/core";
import { Button } from "@/ui/components/Button";
import { FeatherDownload } from "@subframe/core";
import { Tabs } from "@/ui/components/Tabs";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { FeatherDollarSign } from "@subframe/core";
import { Progress } from "@/ui/components/Progress";
import { FeatherTrendingUp } from "@subframe/core";
import { FeatherCreditCard } from "@subframe/core";
import { Alert } from "@/ui/components/Alert";
import { FeatherAlertTriangle } from "@subframe/core";
import { Avatar } from "@/ui/components/Avatar";
import { FeatherClock } from "@subframe/core";
import { FeatherX } from "@subframe/core";
import { FeatherCheck } from "@subframe/core";
import { FeatherSave } from "@subframe/core";
import { FeatherEdit } from "@subframe/core";
import { FeatherTrash } from "@subframe/core";
import { FeatherCopy } from "@subframe/core";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherZap } from "@subframe/core";
import { FeatherEye } from "@subframe/core";
import { FeatherHelpCircle } from "@subframe/core";
import { FeatherUsers } from "@subframe/core";
import { FeatherPlus } from "@subframe/core";
import { TextField } from "@/ui/components/TextField";
import { Select } from "@/ui/components/Select";
import { FeatherCalendar } from "@subframe/core";
import { FeatherSearch } from "@subframe/core";
import { FeatherFilter } from "@subframe/core";
import { Table } from "@/ui/components/Table";
import { FeatherPlay } from "@subframe/core";
import { FeatherFlag } from "@subframe/core";
import { FeatherTicket } from "@subframe/core";
import { FeatherBook } from "@subframe/core";
import { FeatherArrowUp } from "@subframe/core";
import { FeatherArrowDown } from "@subframe/core";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { brands } from "@/lib/brands";

// shape we read from Supabase
type CoachFromDB = {
  id: number;
  display_name: string | null;
  avatar_url: string;
  languages: string[] | null;
  bookings_count: number | null;
  brand?: string | null;
  specialty?: string | string[] | Record<string, any> | null;
};


type CoachSpecialtyRow = {
  coach_id: number;
  brand: string;
  specialty: string;
  tokens_per_hour: number | null;
  minutes_15: number | null;
  minutes_30: number | null;
  minutes_60: number | null;
  minutes_120: number | null;
  offered_durations: number[] | null;
  sort_order: number | null;
};

// Helpers to support parent::variant grouping without a DB migration
function parseSpecialtyName(name: string | null | undefined): { parent: string; variant: string } {
  const raw = String(name ?? "").trim();
  if (!raw) return { parent: "General", variant: "General" };
  const parts = raw.split("::");
  const parent = (parts[0] ?? "").trim() || "General";
  const variant = (parts[1] ?? "General").trim() || "General";
  return { parent, variant };
}

export default function CoachPage() {
  const supabase = createClient();
  const params = (useParams() as { brand?: string }) ?? {};
  const brandRaw = (params as { brand?: string | string[] }).brand;
  const brandKey = (Array.isArray(brandRaw) ? brandRaw[0] : brandRaw || "gameon").toLowerCase();
  const brandConfig = brands[brandKey as keyof typeof brands] || brands.gameon;

  const colors = (brandConfig.colors as any) || {};
  const backgroundColor = colors.pageBackground || colors.background || colors.primary || "#000000";
  const router = useRouter();

  const [authChecked, setAuthChecked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [sessionRole, setSessionRole] = useState<string | null>(null);

  const [coach, setCoach] = useState<CoachFromDB | null>(null);
  const [loadingCoach, setLoadingCoach] = useState(true);

  // Founder cosmetics flags + avatar sizing
  const [hasFounderFrame, setHasFounderFrame] = useState<boolean>(false);
  const [hasFounderBadge, setHasFounderBadge] = useState<boolean>(false);
  const avatarBoxRef = useRef<HTMLDivElement | null>(null);
  const [avatarSizePx, setAvatarSizePx] = useState<number>(0);

  // ---- Unified durations + state ----
  const DURATION_OPTIONS = [
    { label: "15 mins", value: 15 },
    { label: "30 mins", value: 30 },
    { label: "1 hr", value: 60 },
    { label: "2 hrs", value: 120 },
  ];

  function formatDurationLabel(m: number) {
    switch (m) {
      case 15: return "15 mins.";
      case 30: return "30 mins.";
      case 60: return "1 hr.";
      case 120: return "2 hrs.";
      default: return `${m} mins.`;
    }
  }

  const [durations, setDurations] = useState<Array<number | null>>([]);
  const [rates, setRates] = useState<Array<string>>([]);
  const [specRows, setSpecRows] = useState<CoachSpecialtyRow[]>([]);

  // Compute a baseline (durations/rates) from fetched spec rows and detect if form is dirty
  const baseline = useMemo(() => {
    const pickFromRow = (row: CoachSpecialtyRow): { dur: number | null; rate: string } => {
      const pairs: Array<[number, number | null]> = [
        [15, row.minutes_15],
        [30, row.minutes_30],
        [60, row.minutes_60],
        [120, row.minutes_120],
      ];
      for (const [mins, val] of pairs) {
        if (val != null) return { dur: mins, rate: String(val) };
      }
      if (row.tokens_per_hour != null) {
        return { dur: 60, rate: String(row.tokens_per_hour) };
      }
      return { dur: null, rate: "" };
    };

    const durs: Array<number | null> = [];
    const rts: string[] = [];
    for (let i = 0; i < specRows.length; i++) {
      const picked = pickFromRow(specRows[i]);
      durs.push(picked.dur);
      rts.push(picked.rate);
    }
    return { durs, rts };
  }, [specRows]);

  const isDirty = useMemo(() => {
    if (specRows.length === 0) return false; // nothing to save
    if (durations.length !== specRows.length || rates.length !== specRows.length) return true;
    for (let i = 0; i < specRows.length; i++) {
      if (durations[i] !== baseline.durs[i]) return true;
      const a = String(rates[i] ?? "").trim();
      const b = String(baseline.rts[i] ?? "").trim();
      if (a !== b) return true;
    }
    return false;
  }, [durations, rates, baseline, specRows.length]);
  const [defaultSessionLength, setDefaultSessionLength] = useState<number | null>(null);
  const [prevDefaultSessionLength, setPrevDefaultSessionLength] = useState<number | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDefault, setPendingDefault] = useState<number | null>(null);
  const [newSpecParent, setNewSpecParent] = useState("");
  const [newSpecVariant, setNewSpecVariant] = useState("");
  const [newSpecDuration, setNewSpecDuration] = useState<string>("none");
  const [newSpecRate, setNewSpecRate] = useState("");
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editingName, setEditingName] = useState<string>("");
  const [editingParent, setEditingParent] = useState<string | null>(null);
  const [newParentName, setNewParentName] = useState<string>("");

  const [addingParent, setAddingParent] = useState<string | null>(null);
  const [addVariantName, setAddVariantName] = useState<string>("");
  const [addVariantDuration, setAddVariantDuration] = useState<string>("none");
  const [addVariantRate, setAddVariantRate] = useState<string>("");
  // Global composer for adding a new Group + first Offering
  const [showAddComposer, setShowAddComposer] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<string>(brandKey);
  // Toast state and helper
  type Toast = { id: number; message: string; variant?: "success" | "error" | "info" };
  const [toasts, setToasts] = useState<Toast[]>([]);
  function addToast(message: string, variant: Toast["variant"] = "info") {
    const id = Date.now() + Math.random();
    setToasts((ts) => [...ts, { id, message, variant }]);
    setTimeout(() => {
      setToasts((ts) => ts.filter((t) => t.id !== id));
    }, 3000);
  }
  // Keep the brand dropdown in sync with the URL segment. When the route changes
  // (e.g., /fiton/coach -> /gameon/coach), reset the selected brand and clear
  // any staged duration/rate edits to avoid cross-brand bleed/overwrites.
  useEffect(() => {
    setSelectedBrand(brandKey);
    // Clear staged edits; the prefill effect will repopulate after refetch
    setDurations([]);
    setRates([]);
    setShowAddComposer(false);
    void (async () => { await refetchSpecialties(); })();
  }, [brandKey]);
  const brandOptions = Object.keys(brands || {}).filter(b => b !== "skillery");
  const brandLabelMap: Record<string, string> = {
    gameon: "GameOn",
    styleon: "StyleOn",
    fixon: "FixOn",
    jamon: "JamOn",
    learnon: "LearnOn",
    growon: "GrowOn",
    fiton: "FitOn",
    codeon: "CodeOn",
    cookon: "CookOn",
    moneyon: "MoneyOn",
  };

  // Brand-aware examples for Group/Offering placeholders
  const exampleMap: Record<string, { group: string; offering: string }> = {
    gameon:  { group: "Dead by Daylight", offering: "Co-Op Play" },
    fiton:   { group: "Yoga",             offering: "1:1 Coaching" },
    styleon: { group: "Hair",             offering: "Styling" },
    jamon:   { group: "Guitar",           offering: "Beginner Lessons" },
    learnon: { group: "Algebra",          offering: "Homework Help" },
    growon:  { group: "Tomatoes",         offering: "Planting Guide" },
    codeon:  { group: "React",            offering: "Code Review" },
    cookon:  { group: "Italian",          offering: "Pasta Workshop" },
    moneyon: { group: "Budgeting",        offering: "1:1 Coaching" },
  };

  // auth
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (!cancelled) {
          setUserId(data.user?.id ?? null);
        }
      } catch {
        if (!cancelled) setUserId(null);
      } finally {
        try {
          const role = typeof window !== "undefined" ? window.localStorage.getItem("sessionRole") : null;
          if (!cancelled) setSessionRole(role);
        } catch {}
        if (!cancelled) setAuthChecked(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  // fetch coach by auth_user_id (no brand filter)
  useEffect(() => {
    if (!authChecked) return;
    let cancelled = false;

    (async () => {
      if (!userId) {
        setCoach(null);
        setLoadingCoach(false);
        return;
      }

      setLoadingCoach(true);
      const { data, error } = await supabase
        .from("coaches")
        .select("id, display_name, avatar_url, languages, bookings_count, brand, specialty")
        .eq("auth_user_id", userId)
        .limit(1)
        .maybeSingle();

      if (!cancelled) {
        if (error) {
          console.error("coach fetch error (private /coach):", error.message);
          setCoach(null);
        } else {
          setCoach((data as CoachFromDB) || null);
        }
        setLoadingCoach(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authChecked, userId, brandKey, supabase]);

  // Load user cosmetics for this signed-in user (global; not brand-scoped)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!userId) return;
      const { data, error } = await supabase
        .from("user_cosmetics")
        .select("cosmetic_type, cosmetic_value")
        .eq("user_id", userId);
      if (error || cancelled) return;
      let fFrame = false;
      let fBadge = false;
      (data ?? []).forEach((r: any) => {
        if (r.cosmetic_type === "frame" && r.cosmetic_value === "founder-frame") fFrame = true;
        if (r.cosmetic_type === "badge" && r.cosmetic_value === "founder-badge") fBadge = true;
      });
      setHasFounderFrame(fFrame);
      setHasFounderBadge(fBadge);
    })();
    return () => { cancelled = true; };
  }, [userId, supabase]);

  // Observe avatar box size to scale frame slightly larger than the avatar
  useEffect(() => {
    if (!avatarBoxRef.current) return;
    const el = avatarBoxRef.current;
    const setSize = () => {
      const rect = el.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height);
      setAvatarSizePx(size);
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // fetch coach_specialties for this coach and brand (scoped)
  useEffect(() => {
    if (!coach?.id) return;
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("coach_specialties")
        .select("coach_id, brand, specialty, tokens_per_hour, minutes_15, minutes_30, minutes_60, minutes_120, offered_durations, sort_order")
        .eq("coach_id", coach.id)
        .eq("brand", selectedBrand)
        .order("sort_order", { ascending: true });
      if (error) {
        console.error("coach_specialties fetch error:", error.message, { coachId: coach.id, selectedBrand });
        return;
      }
      if (!cancelled) {
        setSpecRows((data as CoachSpecialtyRow[]) || []);
      }
    })();
    return () => { cancelled = true; };
  }, [coach?.id, selectedBrand, supabase]);
  // Group rows by parent specialty (e.g., "Hair::Styling" -> parent "Hair")
  const groupedSpecs = useMemo(() => {
    const map = new Map<string, { parent: string; items: { row: CoachSpecialtyRow; index: number; variant: string }[] }>();
    specRows.forEach((row, index) => {
      const { parent, variant } = parseSpecialtyName(row.specialty);
      if (!map.has(parent)) map.set(parent, { parent, items: [] });
      map.get(parent)!.items.push({ row, index, variant });
    });
    // sort variants inside each parent by sort_order then variant name
    const groups = Array.from(map.values());
    groups.forEach(g => {
      g.items.sort((a, b) => {
        const soA = a.row.sort_order ?? 0;
        const soB = b.row.sort_order ?? 0;
        if (soA !== soB) return soA - soB;
        return a.variant.localeCompare(b.variant);
      });
    });
    // sort parents by name
    groups.sort((a, b) => a.parent.localeCompare(b.parent));
    return groups;
  }, [specRows]);

  // prefill durations and rates from fetched specialties
  useEffect(() => {
    if (!specRows || specRows.length === 0) return;

    const pickFromRow = (row: CoachSpecialtyRow): { dur: number | null; rate: string } => {
      const pairs: Array<[number, number | null]> = [
        [15, row.minutes_15],
        [30, row.minutes_30],
        [60, row.minutes_60],
        [120, row.minutes_120],
      ];
      for (const [mins, val] of pairs) {
        if (val != null) return { dur: mins, rate: String(val) };
      }
      if (row.tokens_per_hour != null) {
        return { dur: 60, rate: String(row.tokens_per_hour) };
      }
      return { dur: null, rate: "" };
    };

    const nextDur: Array<number | null> = [];
    const nextRates: Array<string> = [];

    for (let i = 0; i < specRows.length; i++) {
      const picked = pickFromRow(specRows[i]);
      nextDur.push(picked.dur);
      nextRates.push(picked.rate);
    }

    setDurations(nextDur);
    setRates(nextRates);
  }, [specRows]);

  // Helpers & handlers
  function durationField(mins: number): "minutes_15" | "minutes_30" | "minutes_60" | "minutes_120" {
    switch (mins) {
      case 15: return "minutes_15";
      case 30: return "minutes_30";
      case 60: return "minutes_60";
      case 120: return "minutes_120";
      default: return "minutes_60";
    }
  }
  function startEditParent(parent: string) {
    setEditingParent(parent);
    setNewParentName(parent);
  }

  function cancelEditParent() {
    setEditingParent(null);
    setNewParentName("");
  }

  async function saveEditParent(oldParent: string) {
    if (!coach?.id) return;
    const nextParent = newParentName.trim();
    if (!nextParent || nextParent === oldParent) { cancelEditParent(); return; }

    // Update all rows under this parent for the selected brand
    const rowsToUpdate = specRows.filter(r => parseSpecialtyName(r.specialty).parent === oldParent);
    for (const row of rowsToUpdate) {
      const { variant } = parseSpecialtyName(row.specialty);
      const { error } = await supabase
        .from("coach_specialties")
        .update({ specialty: `${nextParent}::${variant}` })
        .eq("coach_id", coach.id)
        .eq("brand", selectedBrand)
        .eq("specialty", row.specialty);
      if (error) {
        console.error("rename parent error:", error.message, { row });
        addToast("Couldn't rename group", "error");
        return;
      }
    }
    addToast("Group renamed", "success");
    cancelEditParent();
    await refetchSpecialties();
  }

  function startAddVariant(parent: string) {
    setShowAddComposer(false);
    setAddingParent(parent);
    setAddVariantName("");
    setAddVariantDuration("none");
    setAddVariantRate("");
  }

  function cancelAddVariant() {
    setAddingParent(null);
    setAddVariantName("");
    setAddVariantDuration("none");
    setAddVariantRate("");
  }

  async function addVariantToParent(parent: string) {
    if (!coach?.id) return;
    const variant = addVariantName.trim();
    const dur = addVariantDuration === "none" ? null : Number(addVariantDuration);
    const rate = Number(addVariantRate);
    if (!variant || dur == null || !Number.isFinite(rate)) return;

    // choose next sort order within parent (append)
    const nextSort =
      (specRows
        .filter(r => parseSpecialtyName(r.specialty).parent === parent)
        .reduce((m, r) => Math.max(m, r.sort_order ?? 0), 0) || 0) + 1;

    const field = durationField(dur);
    const payload: any = {
      coach_id: coach.id,
      brand: selectedBrand,
      specialty: `${parent}::${variant}`,
      is_active: true,
      offered_durations: [dur],
      sort_order: nextSort,
    };
    payload[field] = rate;
    if (dur === 60) payload.tokens_per_hour = rate;

    const { error } = await supabase.from("coach_specialties").insert(payload);
    if (error) {
      console.error("add variant insert error:", error.message);
      addToast("Couldn't add offering", "error");
      return;
    }
    addToast("Offering added", "success");
    cancelAddVariant();
    await refetchSpecialties();
  }
  async function moveVariant(i: number, dir: "up" | "down") {
    if (!coach?.id) return;
    const row = specRows[i];
    if (!row) return;
    const { parent } = parseSpecialtyName(row.specialty);
    // Build a list of sibling indices (indices into specRows) under the same parent
    const siblingIndices: number[] = [];
    specRows.forEach((r, idx) => {
      if (parseSpecialtyName(r.specialty).parent === parent) siblingIndices.push(idx);
    });
    // Sort siblings by sort_order then variant name to mirror UI order
    siblingIndices.sort((ia, ib) => {
      const a = specRows[ia];
      const b = specRows[ib];
      const soA = a.sort_order ?? 0;
      const soB = b.sort_order ?? 0;
      if (soA !== soB) return soA - soB;
      const va = parseSpecialtyName(a.specialty).variant;
      const vb = parseSpecialtyName(b.specialty).variant;
      return va.localeCompare(vb);
    });
    const pos = siblingIndices.indexOf(i);
    if (pos === -1) return;
    if (dir === "up" && pos === 0) return;
    if (dir === "down" && pos === siblingIndices.length - 1) return;
    const neighborPos = dir === "up" ? pos - 1 : pos + 1;
    const aIdx = siblingIndices[pos];
    const bIdx = siblingIndices[neighborPos];
    const a = specRows[aIdx];
    const b = specRows[bIdx];
    const aSort = a.sort_order ?? 0;
    const bSort = b.sort_order ?? 0;
    // Swap sort_order values in Supabase
    const { error: err1 } = await supabase
      .from("coach_specialties")
      .update({ sort_order: bSort })
      .eq("coach_id", coach.id)
      .eq("brand", selectedBrand)
      .eq("specialty", a.specialty);
    if (err1) {
      console.error("reorder update error (first)", err1.message);
      addToast("Couldn't update order", "error");
      return;
    }
    const { error: err2 } = await supabase
      .from("coach_specialties")
      .update({ sort_order: aSort })
      .eq("coach_id", coach.id)
      .eq("brand", selectedBrand)
      .eq("specialty", b.specialty);
    if (err2) {
      console.error("reorder update error (second)", err2.message);
      addToast("Couldn't update order", "error");
      return;
    }
    addToast("Order updated", "success");
    await refetchSpecialties();
  }

  async function handleCopySpecialty(i: number) {
    if (!coach?.id) return;
    const row = specRows[i];
    if (!row) return;
    const { parent, variant } = parseSpecialtyName(row.specialty);
    // Generate a unique variant name like "Variant (copy)", "(copy 2)", etc.
    const siblings = specRows.filter(r => parseSpecialtyName(r.specialty).parent === parent);
    let base = `${variant} (copy)`;
    let candidate = base;
    let counter = 2;
    while (siblings.some(r => parseSpecialtyName(r.specialty).variant === candidate)) {
      candidate = `${base} ${counter++}`;
    }

    const dur = (() => {
      if (row.minutes_15 != null) return 15;
      if (row.minutes_30 != null) return 30;
      if (row.minutes_60 != null) return 60;
      if (row.minutes_120 != null) return 120;
      if (row.tokens_per_hour != null) return 60;
      return 60;
    })();
    const rate =
      row[durationField(15)] ?? row[durationField(30)] ?? row[durationField(60)] ?? row[durationField(120)] ?? row.tokens_per_hour ?? 0;

    const newSort = (row.sort_order ?? 0) + 1;
    const field = durationField(dur);
    const payload: any = {
      coach_id: coach.id,
      brand: selectedBrand,
      specialty: `${parent}::${candidate}`,
      is_active: true,
      offered_durations: [dur],
      sort_order: newSort,
    };
    payload[field] = rate;
    if (dur === 60) payload.tokens_per_hour = rate;

    const { error } = await supabase.from("coach_specialties").insert(payload);
    if (error) {
      console.error("copy specialty insert error:", error.message);
      addToast("Couldn't copy offering", "error");
      return;
    }
    addToast("Offering copied", "success");
    await refetchSpecialties();
  }

  async function refetchSpecialties() {
    if (!coach?.id) return;
    const { data } = await supabase
      .from("coach_specialties")
      .select("coach_id, brand, specialty, tokens_per_hour, minutes_15, minutes_30, minutes_60, minutes_120, offered_durations, sort_order")
      .eq("coach_id", coach.id)
      .eq("brand", selectedBrand)
      .order("sort_order", { ascending: true });
    setSpecRows((data as CoachSpecialtyRow[]) || []);
  }

  async function handleAddSpecialty() {
    if (!coach?.id) return;
    const parent = newSpecParent.trim();
    const variant = newSpecVariant.trim();
    const dur = newSpecDuration === "none" ? null : Number(newSpecDuration);
    const rate = Number(newSpecRate);
    if (!parent || !variant || dur == null || !Number.isFinite(rate)) return;

    // determine next sort order (append) within this parent
    const nextSort =
      (specRows
        .filter(r => parseSpecialtyName(r.specialty).parent === parent)
        .reduce((m, r) => Math.max(m, r.sort_order ?? 0), 0) || 0) + 1;

    const field = durationField(dur);
    const payload: any = {
      coach_id: coach.id,
      brand: selectedBrand,
      specialty: `${parent}::${variant}`,
      is_active: true,
      offered_durations: [dur],
      sort_order: nextSort,
    };
    payload[field] = rate;
    if (dur === 60) payload.tokens_per_hour = rate;

    const { error } = await supabase.from("coach_specialties").insert(payload);

    if (error) {
      console.error("add specialty insert error:", error.message);
      addToast("Couldn't add specialty", "error");
      return;
    }

    addToast("Specialty added", "success");
    setNewSpecParent("");
    setNewSpecVariant("");
    setNewSpecDuration("none");
    setNewSpecRate("");
    setShowAddComposer(false);
    await refetchSpecialties();
  }

  function startEditSpecialty(i: number) {
    const current = specRows[i]?.specialty ?? "";
    const { variant } = parseSpecialtyName(current);
    setEditingIdx(i);
    setEditingName(variant);
  }

  function cancelEditSpecialty() {
    setEditingIdx(null);
    setEditingName("");
  }

  async function saveEditSpecialty(i: number) {
    if (!coach?.id) return;
    const oldName = specRows[i]?.specialty;
    const newName = editingName.trim();
    if (!oldName || !newName || oldName === newName) {
      cancelEditSpecialty();
      return;
    }

    const parts = parseSpecialtyName(oldName);
    const { error } = await supabase
      .from("coach_specialties")
      .update({ specialty: `${parts.parent}::${newName}` })
      .eq("coach_id", coach.id)
      .eq("brand", selectedBrand)
      .eq("specialty", oldName);

    if (error) {
      console.error("rename specialty error:", error.message);
      addToast("Couldn't rename offering", "error");
      return;
    }

    addToast("Offering renamed", "success");
    cancelEditSpecialty();
    await refetchSpecialties();
  }
  async function handleDeleteParent(parent: string) {
    if (!coach?.id) return;
    const ok = typeof window !== "undefined" ? window.confirm(`Delete ALL variants under "${parent}" for ${brandLabelMap[selectedBrand] || selectedBrand}?`) : true;
    if (!ok) return;

    const { error } = await supabase
      .from("coach_specialties")
      .delete()
      .eq("coach_id", coach.id)
      .eq("brand", selectedBrand)
      .ilike("specialty", `${parent}::%`);

    if (error) {
      console.error("delete parent specialties error:", error.message);
      addToast("Couldn't delete group", "error");
      return;
    }
    addToast("Group deleted", "success");
    await refetchSpecialties();
  }

  async function handleDeleteSpecialty(i: number) {
    if (!coach?.id) return;
    const row = specRows[i];
    if (!row) return;
    const ok = typeof window !== "undefined" ? window.confirm(`Delete specialty "${row.specialty}" for ${brandLabelMap[selectedBrand] || selectedBrand}?`) : true;
    if (!ok) return;

    const { error } = await supabase
      .from("coach_specialties")
      .delete()
      .eq("coach_id", coach.id)
      .eq("brand", selectedBrand)
      .eq("specialty", row.specialty);

    if (error) {
      console.error("delete specialty error:", error.message);
      addToast("Couldn't delete offering", "error");
      return;
    }

    addToast("Offering deleted", "success");
    await refetchSpecialties();
  }

  async function handleSaveChanges() {
    if (!coach?.id) return;
    let updatedCount = 0;

    for (let i = 0; i < specRows.length; i++) {
      const dur = durations[i];
      const rateNum = Number(rates[i]);
      const row = specRows[i];
      if (dur == null || !Number.isFinite(rateNum) || !row) continue;

      const field = durationField(dur);
      const offered = Array.from(new Set([...(row.offered_durations || []), dur]));
      const patch: any = { [field]: rateNum, offered_durations: offered, is_active: true };
      if (dur === 60 && (row.tokens_per_hour == null || row.tokens_per_hour === 0)) {
        patch.tokens_per_hour = rateNum;
      }

      const { error } = await supabase
        .from("coach_specialties")
        .update(patch)
        .eq("coach_id", coach.id)
        .eq("brand", selectedBrand)
        .eq("specialty", row.specialty);
      if (error) {
        console.error("save patch error:", error.message, { i, row });
      } else {
        updatedCount += 1;
      }
    }

    if (updatedCount === 0) {
      addToast("Nothing to save", "info");
    } else {
      addToast("Changes saved", "success");
    }

    await refetchSpecialties();
  }

  // BRAND-STRICT GUARDS: require real auth + a coach row for THIS brand before rendering anything
  if (!authChecked) {
    return (
      <DefaultPageLayout style={{ backgroundColor }}>
        <div className="p-8 text-subtext-color">Checking session…</div>
      </DefaultPageLayout>
    );
  }

  const next = `/${brandKey}/coach`;

  // Not logged in at all → prompt login
  if (!userId) {
    return (
      <DefaultPageLayout style={{ backgroundColor }}>
        <div className="p-8">
          <p className="text-default-font mb-4">
            You must be logged in to view your {brandLabelMap[brandKey] ?? brandKey} coach dashboard.
          </p>
          <Link href={`/login?next=${encodeURIComponent(next)}`}>
            <Button>Log in</Button>
          </Link>
        </div>
      </DefaultPageLayout>
    );
  }

  // We have a user; ensure they are a coach for THIS brand
  if (loadingCoach) {
    return (
      <DefaultPageLayout style={{ backgroundColor }}>
        <div className="p-8 text-subtext-color">Checking coach access…</div>
      </DefaultPageLayout>
    );
  }

  if (!coach?.id) {
    return (
      <DefaultPageLayout style={{ backgroundColor }}>
        <div className="p-8">
          <p className="text-default-font mb-4">
            You’re logged in, but this account isn’t set up as a coach yet.
          </p>
          <Link href={`/login?next=${encodeURIComponent(next)}`}>
            <Button>Switch account</Button>
          </Link>
        </div>
      </DefaultPageLayout>
    );
  }

  // normalize specialties
  function normalizeSpecialties(v: unknown): string[] {
    if (Array.isArray(v)) return v.map(x => String(x).trim()).filter(Boolean);
    if (typeof v === "string") {
      try {
        const parsed = JSON.parse(v);
        if (Array.isArray(parsed)) return parsed.map((x: any) => String(x).trim()).filter(Boolean);
        if (parsed && typeof parsed === "object") return Object.keys(parsed as any);
      } catch {}
      return v.split(",").map(s => s.trim()).filter(Boolean);
    }
    if (v && typeof v === "object") return Object.keys(v as any);
    return [];
  }
  const specialties = normalizeSpecialties(coach?.specialty ?? null);

  return (
    <DefaultPageLayout style={{ backgroundColor }}>
      <div className="flex w-full flex-col items-start px-8 pt-12 pb-8 min-h-[80vh] max-w-[1200px] mx-auto">
        <div className="flex w-full flex-col items-start gap-8 pb-6">
          <div className="flex w-full flex-wrap items-start gap-4">
            <div className="flex flex-col items-center">
              <div ref={avatarBoxRef} className="relative h-36 w-36 rounded-full overflow-visible">
                {loadingCoach ? (
                  <div className="h-36 w-36 animate-pulse rounded-full bg-neutral-200" />
                ) : coach?.avatar_url ? (
                  <img
                    className="absolute inset-0 h-36 w-36 object-cover rounded-full"
                    src={coach.avatar_url}
                    alt={coach?.display_name ?? "Coach avatar"}
                  />
                ) : (
                  <div className="h-36 w-36 flex items-center justify-center rounded-full bg-neutral-200" />
                )}
                {hasFounderFrame && (
                  <div
                    className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square"
                    style={{
                      width: avatarSizePx ? avatarSizePx * 1.30 : "11rem",
                      height: avatarSizePx ? avatarSizePx * 1.30 : "11rem",
                    }}
                  >
                    <img
                      src="/assets/cosmetics/founder/frame.png"
                      alt="Founder Frame"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
              {hasFounderBadge && (
                <img
                  src="/assets/cosmetics/founder/badge.png"
                  alt="Founder Badge"
                  className="mt-3 h-[72px] w-[72px] object-contain"
                />
              )}
            </div>
            <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-6 pt-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-heading-2 font-heading-2 text-default-font">
                    {loadingCoach ? (
                      <span className="inline-block h-6 w-32 animate-pulse rounded bg-neutral-200" />
                    ) : (
                      coach?.display_name ?? "—"
                    )}
                  </span>
                  {!loadingCoach && (
                    <>
                      <Badge variant="success" icon={<FeatherShield />}>
                        Verified Coach
                      </Badge>
                      <Badge>Elite Level</Badge>
                    </>
                  )}
                </div>
                <Button
                  variant="neutral-secondary"
                  icon={<FeatherDownload />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Export Data
                </Button>
              </div>
              <div className="flex w-full flex-wrap items-start gap-6">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-default-font">Total Sessions</span>
                  <span className="line-clamp-1 w-full text-body-bold font-body-bold text-brand-500">
                    {loadingCoach ? (
                      <span className="inline-block h-4 w-10 animate-pulse rounded bg-neutral-200" />
                    ) : (
                      String(coach?.bookings_count ?? 0)
                    )}
                  </span>
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-default-font">Success Rate</span>
                  <span className="line-clamp-1 w-full text-body-bold font-body-bold text-brand-600">94%</span>
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                  <span className="text-body-bold font-body-bold text-default-font">Languages</span>
                  <span className="line-clamp-1 w-full text-body font-body text-subtext-color">
                    {loadingCoach ? (
                      <span className="inline-block h-4 w-24 animate-pulse rounded bg-neutral-200" />
                    ) : coach?.languages?.length ? (
                      coach.languages.join(", ")
                    ) : (
                      "—"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Private tabs */}
        <div className="flex w-full items-end">
          <div className="flex h-px w-12 flex-none flex-col items-center gap-2 bg-neutral-200" />
          <Tabs>
            <Tabs.Item active={true}>Dashboard</Tabs.Item>
            <Tabs.Item onClick={() => router.push(`/${brandKey}/coach/sessions`)}>Sessions</Tabs.Item>
            <Tabs.Item onClick={() => router.push(`/${brandKey}/coach/reviews`)}>Reviews</Tabs.Item>
          </Tabs>
        </div>

        {/* Rest unchanged */}
        <div className="flex w-full flex-col items-start gap-12 py-12">
          <div className="flex w-full flex-wrap items-start gap-6">
            <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-white/30 bg-black/20 px-6 py-6">
              <div className="flex w-full items-center gap-2">
                <IconWithBackground size="large" icon={<FeatherDollarSign />} />
                <span className="text-2xl font-bold text-default-font">Current Month Earnings</span>
              </div>
              <div className="flex w-full flex-col items-start">
                <span className="text-3xl font-bold text-brand-500">$146.25</span>
                <div className="flex w-full items-center gap-2 py-4">
                  <span className="line-clamp-1 w-24 flex-none text-body-bold font-body-bold text-default-font">
                    Target
                  </span>
                  <Progress value={85} />
                  <span className="line-clamp-1 w-12 flex-none text-body-bold font-body-bold text-brand-500 text-right">
                    85%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-white/30 bg-black/20 px-6 py-6">
              <div className="flex w-full items-center gap-2">
                <IconWithBackground size="large" icon={<FeatherTrendingUp />} />
                <span className="text-2xl font-bold text-default-font">Previous Month Earnings</span>
              </div>
              <div className="flex w-full flex-col items-start gap-2">
                <span className="text-3xl font-bold text-brand-600">$3,156.00</span>
                <span className="text-body font-body text-success-600">Final</span>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-2xl font-bold text-default-font">Pending Requests</span>
            </div>
            <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-white/30 bg-black/20 px-6 py-6">
              <Alert
                variant="warning"
                icon={<FeatherAlertTriangle />}
                title="Connect Stripe to accept bookings"
                description={<span className="text-body font-body">You need to connect your Stripe account before you can start accepting booking requests.</span>}
                actions={
                  <Button icon={<FeatherCreditCard />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}>
                    Connect Stripe
                  </Button>
                }
              />
              <div className="flex w-full items-center gap-4">
                <Avatar
                  size="large"
                  image="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80"
                >
                  A
                </Avatar>
                <div className="flex flex-col items-start gap-1 grow">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-default-font">Alex Chen</span>
                    {specialties[0] ? <Badge>{specialties[0]}</Badge> : null}
                    <Badge variant="warning" icon={<FeatherClock />}>
                      Pending
                    </Badge>
                  </div>
                  <span className="text-body font-body text-subtext-color">60 min coaching session</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="neutral-secondary" icon={<FeatherX />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}>
                    Decline
                  </Button>
                  <Button disabled={true} icon={<FeatherCheck />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}>
                    Accept
                  </Button>
                </div>
              </div>
              <div className="flex w-full items-center gap-4">
                <Avatar
                  size="large"
                  image="https://res.cloudinary.com/subframe/image/upload/v1711417512/shared/m0kfajqpwkfief00it4v.jpg"
                >
                  A
                </Avatar>
                <div className="flex flex-col items-start gap-1 grow">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-default-font">Mandy Lopez</span>
                    {(specialties[1] ?? specialties[0]) ? <Badge>{specialties[1] ?? specialties[0]}</Badge> : null}
                    <Badge variant="warning" icon={<FeatherClock />}>
                      Pending
                    </Badge>
                  </div>
                  <span className="text-body font-body text-subtext-color">60 min coaching session</span>
                </div>
                <div className="flex items-center gap-2">
              <Button variant="neutral-secondary" icon={<FeatherX />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}} className="px-4 py-2 text-base">
                Decline
              </Button>
              <Button disabled={true} icon={<FeatherCheck />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}} className="px-4 py-2 text-base">
                Accept
              </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between gap-3">
              <span className="text-2xl font-bold text-default-font">Rate Configuration</span>
              <div className="flex items-center gap-2">
                <Select
                  className="h-auto w-48"
                  label=""
                  placeholder="Brand"
                  helpText=""
                  value={selectedBrand}
                  onValueChange={(value: string) => {
                    setSelectedBrand(value);
                    setDurations([]);
                    setRates([]);
                    void (async () => { await refetchSpecialties(); })();
                  }}
                >
                  {brandOptions.map((b) => (
                    <Select.Item key={b} value={b}>{brandLabelMap[b] || b}</Select.Item>
                  ))}
                </Select>
                <Button
                  variant="brand-secondary"
                  icon={<FeatherPlus />}
                  onClick={() => {
                    setShowAddComposer((s) => !s);
                    if (!showAddComposer) {
                      setNewSpecParent("");
                      setNewSpecVariant("");
                      setNewSpecDuration("none");
                      setNewSpecRate("");
                    }
                  }}
                  className="px-4 py-2 text-base"
                >
                  {showAddComposer ? "Close" : "+ Add New Group"}
                </Button>
                <Button icon={<FeatherSave />} onClick={() => { void handleSaveChanges(); }} disabled={!isDirty} className="px-4 py-2 text-base">
                  Save Changes
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-white/30 bg-black/20 px-6 py-6">
                <Alert
                  title="Set your rates and session durations"
                  description={<span className="text-body font-body">Configure your rates and durations for this brand.</span>}
                  actions={<IconButton icon={<FeatherX />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}} />}
                />
                <div className="w-full border-b border-solid border-neutral-border pb-3">
                  <div className="text-body-bold font-body-bold text-default-font">
                    Specialties for {brandLabelMap[selectedBrand] || selectedBrand}
                  </div>
                <div className="hidden md:grid w-full grid-cols-[220px_260px_160px_140px_auto] gap-x-8 mt-2 text-body-bold font-body-bold text-default-font">
                  <div className="pl-2">Group</div>
                  <div className="pl-2">Offering</div>
                  <div className="pl-2">Duration</div>
                  <div className="pl-2">Rate</div>
                  <div className="text-right pr-2">Actions</div>
                </div>
                </div>
                <div className="flex w-full flex-col items-start gap-6">
                  {showAddComposer ? (
                    <div className="grid w-full grid-cols-[220px_260px_160px_140px_auto] gap-x-8 items-center py-2">
                      {/* Col 1: Group */}
                      <div>
                        <TextField className="h-auto w-full" label="" helpText="">
                          <TextField.Input
                            placeholder={`Group (e.g., ${exampleMap[selectedBrand]?.group ?? "Category"})`}
                            value={newSpecParent}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSpecParent(e.target.value)}
                          />
                        </TextField>
                      </div>
                      {/* Col 2: Offering */}
                      <div>
                        <TextField className="h-auto w-full" label="" helpText="">
                          <TextField.Input
                            placeholder={`Offering (e.g., ${exampleMap[selectedBrand]?.offering ?? "Service"})`}
                            value={newSpecVariant}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSpecVariant(e.target.value)}
                          />
                        </TextField>
                      </div>
                      {/* Col 3: Duration */}
                      <div className="max-w-full">
                        <Select
                          className="h-auto w-full"
                          label=""
                          placeholder="Duration"
                          helpText=""
                          value={newSpecDuration}
                          onValueChange={(value: string) => setNewSpecDuration(value)}
                        >
                          <Select.Item value="none">Select duration</Select.Item>
                          {DURATION_OPTIONS.map((opt) => (
                            <Select.Item key={opt.value} value={String(opt.value)}>{opt.label}</Select.Item>
                          ))}
                        </Select>
                      </div>
                      {/* Col 4: Rate */}
                      <div className="max-w-full">
                        <TextField className="h-auto w-full" label="" helpText="" icon={<FeatherDollarSign />}>
                          <TextField.Input
                            placeholder="0.00"
                            value={newSpecRate}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSpecRate(e.target.value)}
                          />
                        </TextField>
                      </div>
                      {/* Col 5: Actions */}
                      <div className="hidden md:flex items-center justify-end">
                          <Button
                            variant="brand-secondary"
                            icon={<FeatherPlus />}
                            onClick={() => { void handleAddSpecialty(); }}
                            disabled={!newSpecParent.trim() || !newSpecVariant.trim() || newSpecDuration === "none" || !Number.isFinite(Number(newSpecRate))}
                            className="px-4 py-2 text-base"
                          >
                            Add group
                          </Button>
                          <Button
                            variant="neutral-secondary"
                            onClick={() => setShowAddComposer(false)}
                            className="ml-2 px-4 py-2 text-base"
                          >
                            Cancel
                          </Button>
                      </div>
                    </div>
                  ) : null}
                  {groupedSpecs.map((group) => (
                    <div key={group.parent} className="w-full">
                      <div className="flex items-center py-2">
                        <div className="flex items-center gap-2">
                          {editingParent === group.parent ? (
                            <>
                              <TextField className="h-auto w-56" label="" helpText="">
                                <TextField.Input
                                  placeholder="Group name"
                                  value={newParentName}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewParentName(e.target.value)}
                                />
                              </TextField>
                              <Button size="small" icon={<FeatherSave />} onClick={() => { void saveEditParent(group.parent); }}>
                                Save
                              </Button>
                              <Button size="small" variant="neutral-secondary" icon={<FeatherX />} onClick={cancelEditParent}>
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <>
                              <span className="text-body-bold font-body-bold text-default-font">{group.parent}</span>
                              <IconButton
                                icon={<FeatherEdit />}
                                onClick={() => startEditParent(group.parent)}
                                aria-label={`Edit ${group.parent}`}
                              />
                              <Button
                                size="small"
                                variant="neutral-secondary"
                                icon={<FeatherPlus />}
                                onClick={() => startAddVariant(group.parent)}
                                className="px-4 py-2 text-base"
                              >
                                Add offering
                              </Button>
                              <Button
                                size="small"
                                variant="neutral-secondary"
                                icon={<FeatherTrash />}
                                onClick={() => { void handleDeleteParent(group.parent); }}
                                className="px-4 py-2 text-base"
                              >
                                Delete group
                              </Button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex w-full flex-col items-start gap-3">
                        {group.items.map(({ row, index, variant }) => (
                          <div key={`${row.specialty}-${index}`} className="grid w-full grid-cols-[220px_260px_160px_140px_auto] gap-x-8 items-center py-2">
                            {/* Col 1: Group */}
                            <div className="text-body font-body text-default-font">
                              {parseSpecialtyName(row.specialty).parent}
                            </div>

                            {/* Col 2: Offering (editable) */}
                            <div className="flex items-center gap-2">
                              {editingIdx === index ? (
                                <>
                                  <TextField className="h-auto" label="" helpText="">
                                    <TextField.Input
                                      placeholder="Offering name"
                                      value={editingName}
                                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingName(e.target.value)}
                                    />
                                  </TextField>
                                  <Button size="small" icon={<FeatherSave />} onClick={() => saveEditSpecialty(index)} className="px-4 py-2 text-base">
                                    Save
                                  </Button>
                                  <Button size="small" variant="neutral-secondary" icon={<FeatherX />} onClick={cancelEditSpecialty} className="px-4 py-2 text-base">
                                    Cancel
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Badge>{variant}</Badge>
                                  <IconButton
                                    icon={<FeatherEdit />}
                                    onClick={() => startEditSpecialty(index)}
                                    aria-label={`Edit ${variant}`}
                                  />
                                </>
                              )}
                            </div>

                            {/* Duration column (unchanged) */}
                            <div className="max-w-full">
                              <Select
                                className="h-auto w-full"
                                label=""
                                placeholder="Duration"
                                helpText=""
                                value={durations[index] == null ? "none" : String(durations[index])}
                                onValueChange={(value: string) => {
                                  setDurations(d => {
                                    const next = [...d];
                                    next[index] = value === "none" ? null : Number(value);
                                    return next;
                                  });
                                  if (value === "none") {
                                    setRates(r => {
                                      const next = [...r];
                                      next[index] = "";
                                      return next;
                                    });
                                  }
                                }}
                              >
                                <Select.Item value="none">None</Select.Item>
                                {DURATION_OPTIONS.map((opt) => (
                                  <Select.Item key={opt.value} value={String(opt.value)}>{opt.label}</Select.Item>
                                ))}
                              </Select>
                            </div>

                            {/* Rate column (unchanged) */}
                            <div className="max-w-full">
                              <TextField className="h-auto w-full" label="" helpText="" icon={<FeatherDollarSign />}>
                                <TextField.Input
                                  placeholder="0.00"
                                  value={rates[index] ?? ""}
                                  disabled={durations[index] == null}
                                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    const v = event.target.value;
                                    setRates(r => {
                                      const next = [...r];
                                      next[index] = v;
                                      return next;
                                    });
                                  }}
                                />
                              </TextField>
                            </div>

                            {/* Actions column (unchanged) */}
                            <div className="hidden md:flex items-center justify-end">
                              {(() => {
                                const pos = group.items.findIndex(it => it.index === index);
                                const last = group.items.length - 1;
                                return (
                                  <div className="flex items-center gap-2">
                                    <IconButton
                                      icon={<FeatherArrowUp />}
                                      onClick={() => { void moveVariant(index, "up"); }}
                                      aria-label={`Move ${variant} up`}
                                      disabled={pos <= 0}
                                    />
                                    <IconButton
                                      icon={<FeatherArrowDown />}
                                      onClick={() => { void moveVariant(index, "down"); }}
                                      aria-label={`Move ${variant} down`}
                                      disabled={pos >= last}
                                    />
                                    <IconButton
                                      icon={<FeatherCopy />}
                                      onClick={() => { void handleCopySpecialty(index); }}
                                      aria-label={`Copy ${variant}`}
                                    />
                                    <IconButton
                                      icon={<FeatherTrash />}
                                      onClick={() => { void handleDeleteSpecialty(index); }}
                                      aria-label={`Delete ${variant}`}
                                    />
                                  </div>
                                );
                              })()}
                            </div>
                          </div>
                        ))}
                      </div>
                      {addingParent === group.parent ? (
                        <div className="grid w-full grid-cols-[220px_260px_160px_140px_auto] gap-x-8 items-center pt-2">
                          {/* Col 1: Group (static) */}
                          <div className="text-body font-body text-default-font">{group.parent}</div>
                          {/* Col 2: Offering */}
                          <div>
                            <TextField className="h-auto w-full" label="" helpText="">
                              <TextField.Input
                                placeholder={`Offering (e.g., ${exampleMap[selectedBrand]?.offering ?? "Service"})`}
                                value={addVariantName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddVariantName(e.target.value)}
                              />
                            </TextField>
                          </div>
                          {/* Duration column */}
                          <div className="max-w-full">
                            <Select
                              className="h-auto w-full"
                              label=""
                              placeholder="Duration"
                              helpText=""
                              value={addVariantDuration}
                              onValueChange={(value: string) => setAddVariantDuration(value)}
                            >
                              <Select.Item value="none">Select duration</Select.Item>
                              {DURATION_OPTIONS.map((opt) => (
                                <Select.Item key={opt.value} value={String(opt.value)}>{opt.label}</Select.Item>
                              ))}
                            </Select>
                          </div>
                          {/* Rate column */}
                          <div className="max-w-full">
                            <TextField className="h-auto w-full" label="" helpText="" icon={<FeatherDollarSign />}>
                              <TextField.Input
                                placeholder="0.00"
                                value={addVariantRate}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddVariantRate(e.target.value)}
                              />
                            </TextField>
                          </div>
                          {/* Actions column */}
                          <div className="hidden md:flex items-center justify-end">
                            <Button
                              size="small"
                              variant="brand-secondary"
                              onClick={() => { void addVariantToParent(group.parent); }}
                              disabled={!addVariantName.trim() || addVariantDuration === "none" || !Number.isFinite(Number(addVariantRate))}
                              className="px-4 py-2 text-base"
                            >
                              Add
                            </Button>
                            <Button
                              size="small"
                              variant="neutral-secondary"
                              onClick={cancelAddVariant}
                              className="ml-2 px-4 py-2 text-base"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-6">
                  <span className="text-body-bold font-body-bold text-default-font">Default Session Length</span>
                </div>
                <Select
                  className="h-auto w-48 flex-none"
                  label=""
                  placeholder="Select default"
                  helpText=""
                  value={defaultSessionLength == null ? "none" : String(defaultSessionLength)}
                  onValueChange={(value: string) => {
                    setPrevDefaultSessionLength(defaultSessionLength);
                    if (value === "none") {
                      setPendingDefault(null);
                      setConfirmOpen(true);
                      return;
                    }
                    const nextVal = Number(value);
                    if (!Number.isFinite(nextVal)) return;
                    setPendingDefault(nextVal);
                    setConfirmOpen(true);
                  }}
                >
                  <Select.Item value="none">None</Select.Item>
                  {DURATION_OPTIONS.map((opt) => (
                    <Select.Item key={opt.value} value={String(opt.value)}>{opt.label}</Select.Item>
                  ))}
                </Select>
                {confirmOpen ? (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
                    <div className="w-full max-w-md rounded-lg border border-neutral-border bg-[rgba(0,0,0,0.4)] backdrop-blur p-6 shadow-2xl">
                      <span className="block text-3xl font-bold text-default-font mb-2">Overwrite durations?</span>
                      <p className="text-body text-subtext-color mb-4">
                        Are you sure you want to overwrite all specialties to{" "}
                        <span className="font-semibold text-default-font">
                          {pendingDefault != null ? formatDurationLabel(pendingDefault) : "—"}
                        </span>
                        ?
                      </p>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="neutral-secondary" onClick={() => { setConfirmOpen(false); setPendingDefault(null); }}>
                          No
                        </Button>
                        <Button onClick={() => {
                          if (pendingDefault != null) {
                            setDefaultSessionLength(pendingDefault);
                            setDurations(Array.from({ length: specRows.length }, () => pendingDefault));
                            // keep existing rates as-is when a duration is set globally
                          } else {
                            setDefaultSessionLength(null);
                            setDurations(Array.from({ length: specRows.length }, () => null));
                            setRates(Array.from({ length: specRows.length }, () => ""));
                          }
                          setConfirmOpen(false);
                          setPendingDefault(null);
                        }}>
                          Yes, overwrite
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-2xl font-bold text-default-font">Calendar Integration</span>
              <Button variant="brand-secondary" icon={<FeatherCalendar />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}} className="px-4 py-2 text-base">
                Sync Calendar
              </Button>
            </div>
            <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-white/30 bg-black/20 px-6 py-6">
              <div className="flex w-full items-center gap-4">
                <IconWithBackground size="large" icon={<FeatherCalendar />} square={true} />
                <div className="flex flex-col items-start gap-1 grow">
                  <span className="text-2xl font-bold text-default-font">Google Calendar</span>
                  <span className="text-body font-body text-subtext-color">Manage your coaching availability</span>
                </div>
                <Badge variant="success" icon={<FeatherCheck />}>
                  Connected
                </Badge>
              </div>
              <Alert
                title="Your calendar is synced"
                description={<span className="text-body font-body">Players can now book sessions during your available time slots.</span>}
                actions={<IconButton icon={<FeatherX />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}} />}
              />
              <div className="flex w-full items-center gap-4" />
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-2xl font-bold text-default-font">Recent Sessions</span>
              <div className="flex items-center gap-2">
                <Button variant="neutral-secondary" icon={<FeatherSearch />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}>
                  Search Recordings
                </Button>
                <Button variant="neutral-secondary" icon={<FeatherFilter />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}>
                  Filter
                </Button>
                <Button variant="neutral-secondary" onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}>
                  View all
                </Button>
              </div>
            </div>
            <Table
              header={
                <Table.HeaderRow>
                  <Table.HeaderCell className="!text-white !text-base !font-semibold">Session Date</Table.HeaderCell>
                  <Table.HeaderCell className="!text-white !text-base !font-semibold">Player</Table.HeaderCell>
                  <Table.HeaderCell className="!text-white !text-base !font-semibold">Game</Table.HeaderCell>
                  <Table.HeaderCell className="!text-white !text-base !font-semibold">Duration</Table.HeaderCell>
                  <Table.HeaderCell className="!text-white !text-base !font-semibold">Status</Table.HeaderCell>
                  <Table.HeaderCell className="!text-white !text-base !font-semibold">Rating</Table.HeaderCell>
                  <Table.HeaderCell className="!text-white !text-base !font-semibold">Earnings</Table.HeaderCell>
                  <Table.HeaderCell className="!text-white !text-base !font-semibold">Actions</Table.HeaderCell>
                </Table.HeaderRow>
              }
            >
              <Table.Row>
                <Table.Cell>
                  <span className="text-body font-body text-default-font">Mar 15, 2024</span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Avatar size="small" image="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80">
                      J
                    </Avatar>
                    <span className="text-body font-body text-default-font">John Smith</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge>{specialties[0] ?? "Specialty"}</Badge>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-default-font">
                    {defaultSessionLength != null ? formatDurationLabel(defaultSessionLength) : "—"}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="success" icon={<FeatherCheck />}>
                    Complete
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant="neutral">Pending</Badge>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-brand-primary">$45.00</span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Button variant="neutral-secondary" size="small" icon={<FeatherPlay />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}} className="px-4 py-2 text-base">
                      Watch
                    </Button>
                    <Button variant="neutral-secondary" size="small" icon={<FeatherFlag />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}} className="px-4 py-2 text-base">
                      Report
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table>
          </div>

          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-2xl font-bold text-default-font">Support &amp; Help</span>
            </div>
            <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-white/30 bg-black/20 px-6 py-6">
              <div className="flex w-full items-center gap-4">
                <IconWithBackground size="large" icon={<FeatherHelpCircle />} square={true} />
                <div className="flex flex-col items-start gap-1 grow">
                  <span className="text-2xl font-bold text-default-font">Need assistance?</span>
                  <span className="text-body font-body text-subtext-color">Get help with your coaching account or report issues</span>
                </div>
              </div>
              <div className="flex w-full flex-wrap items-start gap-4">
                <Button variant="neutral-primary" icon={<FeatherTicket />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}} className="px-4 py-2 text-base">
                  Submit a ticket
                </Button>
                <Button variant="neutral-primary" icon={<FeatherBook />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}} className="px-4 py-2 text-base">
                  Coach Code of Conduct
                </Button>
                <Button variant="neutral-primary" icon={<FeatherHelpCircle />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}} className="px-4 py-2 text-base">
                  FAQs
                </Button>
                <Button variant="neutral-primary" icon={<FeatherFlag />} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}} className="px-4 py-2 text-base">
                  Report a player
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Toasts */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-md px-4 py-3 shadow-lg text-body font-body ${
              t.variant === "success" ? "bg-success-600 text-white" : t.variant === "error" ? "bg-danger-600 text-white" : "bg-neutral-900 text-white"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </DefaultPageLayout>
  );
}