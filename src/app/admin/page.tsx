// src/app/admin/page.tsx
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import AdminPanel from "./ui/AdminPanel";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // ✅ new API shape expected by your installed @supabase/ssr types
        getAll: () => cookieStore.getAll(),
        setAll: (all) => {
          for (const { name, value, ...options } of all) {
            cookieStore.set(name, value, options as any);
          }
        },
      },
    }
  );

  // 1) Make sure user is signed in
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/admin");

  // 2) Look up role in profiles table
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || profile?.role !== "admin") {
    redirect("/");
  }

  // 3) Render admin UI
  return <AdminPanel />;
}