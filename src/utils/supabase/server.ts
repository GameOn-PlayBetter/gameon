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
            // strip out maxAge and expires if they exist, making cookies session-only
            const rest: any = { ...options };
            delete rest.maxAge;
            delete rest.expires;
            cookieStore.set(name, value, rest);
          }
        },
      },
    }
  );
}