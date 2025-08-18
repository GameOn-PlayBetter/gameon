'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { supa } from '@/utils/supabaseClient'; // same helper you already use

// Expanded brand map; unknown slugs will be prettified by prettyBrand()
const BRAND_NAMES: Record<string, string> = {
  skillery: 'Skillery',
  gameon: 'GameOn',
  growon: 'GrowOn',
  fixon: 'FixOn',
  jamon: 'JamOn',
  fiton: 'FitOn',
  styleon: 'StyleOn',
  learnon: 'LearnOn',
  buildon: 'BuildOn',
  coachon: 'CoachOn',
};

function prettyBrand(slug: string): string {
  if (!slug) return '';
  // Title-case words split by hyphens/underscores, then apply the `On` camel-case tweak
  const titled = slug
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
  // For single-word brands that end with 'on', ensure trailing 'On'
  if (/^[A-Za-z]+on$/i.test(slug)) {
    const base = slug.slice(0, -2);
    return base.charAt(0).toUpperCase() + base.slice(1).toLowerCase() + 'On';
  }
  return titled;
}

export default function BrandSignupPage() {
  const { brand } = useParams() as { brand?: string };
  const brandSlug = (brand ?? 'gameon').toLowerCase();
  const brandName = BRAND_NAMES[brandSlug] ?? prettyBrand(brandSlug);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [msg, setMsg] = useState<string>('');
  const [wantsCoach, setWantsCoach] = useState(false);

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setMsg('');
    try {
      const sb = supa();
      const redirect = `${window.location.origin}/${brandSlug}`;
      const { error } = await sb.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirect },
      });
      if (error) throw error;

      // If they indicated interest in coaching, create a pending application for this brand
      if (wantsCoach) {
        try {
          await fetch('/api/coach-applications', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ brand: brandSlug }),
          });
        } catch (_) {
          // non-blocking: ignore errors creating the application
        }
      }

      setStatus('sent');
      setMsg('Check your email for a login link.');
    } catch (err: any) {
      setStatus('error');
      setMsg(err?.message ?? 'Could not send magic link.');
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-black text-white">
      <form onSubmit={sendMagicLink} className="w-full max-w-md rounded-xl border-0 bg-zinc-900 p-6 space-y-4 outline-none ring-0 focus:outline-none focus:ring-0 shadow-[0_0_24px_4px_#e879f9]">
        <h1 className="text-2xl font-semibold">
          {brandName ? `${brandName} Sign Up` : 'Sign Up'}
        </h1>
        <label className="block">
          <span className="text-sm text-zinc-300">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-700 bg-zinc-800 text-white placeholder-zinc-400 px-3 py-2"
            placeholder="you@example.com"
          />
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={wantsCoach}
            onChange={(e) => setWantsCoach(e.target.checked)}
            className="h-4 w-4 rounded border"
          />
          <span className="text-sm text-white">I want to apply as a coach</span>
        </label>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full rounded-md px-4 py-2 border border-brand-primary bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send Magic Link'}
        </button>
        {msg && (
          <p className={status === 'error' ? 'text-red-600 text-sm' : 'text-green-700 text-sm'}>
            {msg}
          </p>
        )}
        <p className="text-xs text-zinc-300">
          We’ll email you a secure sign-in link. You’ll be a member by default. If you checked the box above, we’ll also create a pending coach application for this brand.
        </p>
      </form>
    </main>
  );
}