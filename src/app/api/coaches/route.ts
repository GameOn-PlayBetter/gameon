import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// Get brand from query params like ?brand=gameon
export async function GET(req: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const brand = searchParams.get("brand") || "skillery";

  const { data, error } = await supabase
    .from("coaches")
    .select("*")
.ilike("brand", brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase())
    .order("display_name", { ascending: true });

  if (error) {
    console.error("Supabase error:", error.message);
    return NextResponse.json([], { status: 500 });
  }

  return NextResponse.json(data || []);
}