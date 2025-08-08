// src/app/login/page.tsx
"use client";


import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const nextPath = (search?.get?.("next") ?? "/admin") as string; // ✅ null-safe

  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setErr(error.message);
      return;
    }

    router.replace(nextPath);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-default-background px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 rounded-md border border-neutral-700 p-6 bg-neutral-800"
      >
        <h1 className="text-xl font-semibold text-white">Log in</h1>

        <div className="space-y-1">
          <label className="block text-sm text-neutral-200">Email</label>
          <input
            type="email"
            className="w-full rounded-md border border-neutral-600 bg-neutral-900 px-3 py-2 text-white outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm text-neutral-200">Password</label>
          <input
            type="password"
            className="w-full rounded-md border border-neutral-600 bg-neutral-900 px-3 py-2 text-white outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {err && <p className="text-sm text-red-400">{err}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-brand-500 px-4 py-2 font-semibold text-black disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}