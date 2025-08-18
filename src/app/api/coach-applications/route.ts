// src/app/api/coach-applications/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; // SSR client (cookies-aware)

type PostBody = { brand?: string | null };

export async function POST(req: Request) {
  try {
    const supabase = createClient();

    // 1) Who’s calling?
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();

    if (userErr || !user) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }
    const userId = user.id;

    // 2) Brand slug (keep simple for now; we store the text string)
    const { brand }: PostBody = await req.json().catch(() => ({} as PostBody));
    const brandSlug = (brand ?? "").trim().toLowerCase() || "gameon"; // default if not provided

    // 3) Create pending application (unique per user+brand)
    const { data, error } = await (supabase as any)
      .from("coach_applications")
      .insert({ user_id: userId, brand: brandSlug, status: "pending" } as any)
      .select("*")
      .single();

    // If unique constraint hit, return the existing row instead of 500
    if (error && (error as any).code === "23505") {
      const { data: existing, error: fetchErr } = await supabase
        .from("coach_applications")
        .select("*")
        .eq("user_id", userId)
        .eq("brand", brandSlug)
        .single();
      if (fetchErr) {
        return NextResponse.json({ error: fetchErr.message }, { status: 500 });
      }
      return NextResponse.json({ ok: true, application: existing, note: "Already applied" });
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, application: data });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();
    if (userErr || !user) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    // Return caller’s own applications
    const { data, error } = await supabase
      .from("coach_applications")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ applications: data ?? [] });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}