import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// Get brand from query params like ?brand=gameon
export async function GET(req: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const brandParam = searchParams.get("brand") || "skillery";

  const brandQuery = `%${brandParam.toLowerCase()}%`; // allow partial and case-insensitive match

  const { data, error } = await supabase
    .from("coaches")
    .select("*")
    .ilike("brand", brandQuery)
    .order("display_name", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}