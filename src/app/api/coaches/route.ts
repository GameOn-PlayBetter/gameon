import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// Get brand from query params like ?brand=gameon
export async function GET(req: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const brand = searchParams.get("brand") || "Skillery";

  const formattedBrand = brand[0].toUpperCase() + brand.slice(1);

  const { data, error } = await supabase
    .from("coaches")
    .select("*")
    .ilike("brand", formattedBrand)
    .order("display_name", { ascending: true });

  if (error) {
    console.error("🔥 Supabase error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log("📦 Supabase data returned:", data);
  return NextResponse.json(data || []);
}