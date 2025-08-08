"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LogoutPage() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    // Sign out of Supabase, then send back to login
    supabase.auth.signOut().finally(() => {
      router.replace("/login");
    });
  }, []);

  return (
    <div className="flex h-screen items-center justify-center text-white">
      Logging out…
    </div>
  );
}