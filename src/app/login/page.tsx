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
      <main className="min-h-[70vh] flex items-center justify-center p-6 bg-black">
        <div className="w-full max-w-md rounded-xl border-0 bg-zinc-900 text-white p-6 space-y-4 shadow-[0_0_24px_4px_#e879f9]">
          <h1 className="text-2xl font-semibold">Log in</h1>

          <form onSubmit={onSubmit} className="space-y-3">
            <label className="block text-sm text-black">
              <span className="mb-1 block text-zinc-200">Email</span>
              <input
                type="email"
                className="w-full rounded-md border border-neutral-600 bg-neutral-900 px-3 py-2 text-white text-black outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </label>

            <label className="block text-sm text-black">
              <span className="mb-1 block text-zinc-200">Password</span>
              <input
                type="password"
                className="w-full rounded-md border border-neutral-600 bg-neutral-900 px-3 py-2 text-white text-black outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </label>

            {err && <p className="text-sm text-red-400">{err}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-brand-600 hover:bg-brand-700 px-4 py-2 font-semibold text-white disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="text-xs text-zinc-300">For security, sessions end after inactivity.</p>
        </div>
      </main>
  );
}