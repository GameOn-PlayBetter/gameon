// src/utils/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // ✅ new @supabase/ssr cookie API
        getAll: () => cookieStore.getAll(),
        setAll: (all) => {
          for (const { name, value, ...options } of all) {
            cookieStore.set(name, value, options as any);
          }
        },
      },
    }
  );
}