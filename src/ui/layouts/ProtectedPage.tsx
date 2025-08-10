"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type ProtectedPageProps = {
  children: React.ReactNode;
  /** Optional: where to send unauthenticated users (default: /login) */
  redirectTo?: string;
};

export default function ProtectedPage({ children, redirectTo = "/login" }: ProtectedPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("auth.getSession error:", error.message);
        }

        if (!mounted) return;

        if (data?.session) {
          setAuthed(true);
        } else {
          // Pass the intended URL so you can bounce back post-login
          const next = encodeURIComponent(pathname || "/");
          router.replace(`${redirectTo}?next=${next}`);
        }
      } finally {
        if (mounted) setChecking(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [router, pathname, redirectTo, supabase]);

  if (checking) {
    // keep it simple; use your brand loader if you have one
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-subtext-color">
        Checking login…
      </div>
    );
  }

  if (!authed) return null; // we've already redirected

  return <>{children}</>;
}