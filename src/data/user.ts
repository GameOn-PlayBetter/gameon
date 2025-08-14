// src/data/user.ts
"use client";
import { supa } from "@/utils/supabaseClient";

// Top summary block from v_user_dashboard_summary
export async function getDashboardSummary(uid: string) {
  const sb = supa();
  const { data, error } = await sb
    .from("v_user_dashboard_summary")
    .select("*")
    .eq("user_id", uid)
    .single();
  if (error) throw error;
  return data;
}

// Current Goals
export async function getUserGoals(uid: string) {
  const sb = supa();
  const { data, error } = await sb
    .from("user_goals")
    .select("id, title, progress_percent, sort_order, updated_at")
    .eq("user_id", uid)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}

// Skills Progress
export async function getUserSkillsProgress(uid: string) {
  const sb = supa();
  const { data, error } = await sb
    .from("user_skills_progress")
    .select("id, skill_name, initial_level, current_level, improvement_note, coach_notes, sort_order, updated_at")
    .eq("user_id", uid)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}

// Coach Feedback
export async function getCoachFeedback(uid: string, limit = 10) {
  const sb = supa();
  const { data, error } = await sb
    .from("coach_feedback")
    .select("id, coach_id, game, feedback, action_items, created_at")
    .eq("user_id", uid)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

// Badges owned by the user
export async function getUserBadges(uid: string) {
  const sb = supa();
  const { data, error } = await sb
    .from("user_badges")
    .select("badge_id, acquired_at, badges ( slug, name, icon_url )")
    .eq("user_id", uid)
    .order("acquired_at", { ascending: false });
  if (error) throw error;
  return data;
}

// Badge catalog
export async function getBadgeCatalog(limit = 100) {
  const sb = supa();
  const { data, error } = await sb
    .from("badges")
    .select("id, slug, name, icon_url, price_tokens")
    .order("created_at", { ascending: true })
    .limit(limit);
  if (error) throw error;
  return data;
}