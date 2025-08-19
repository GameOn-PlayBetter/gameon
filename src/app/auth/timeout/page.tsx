'use client';
import React, { Suspense } from 'react';
import { useSearchParams, useParams } from 'next/navigation';

function Card({ title, children }: any) {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="w-full max-w-md rounded-xl border-0 bg-zinc-900 text-white p-6 space-y-4 shadow-[0_0_24px_4px_#e879f9]">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {children}
      </div>
    </main>
  );
}

export default function TimeoutPage() {
  return (
    <Suspense fallback={null}>
      <TimeoutInner />
    </Suspense>
  );
}

function TimeoutInner() {
  const searchParams = useSearchParams();
  const params = useParams();
  const scope = (searchParams?.get('scope') || 'user').toLowerCase(); // 'admin' | 'user'
  const queryBrand = searchParams?.get('brand');
  const pathBrand = params?.brand;
  const brandRaw =
    queryBrand ?? (Array.isArray(pathBrand) ? pathBrand[0] : (pathBrand as string | undefined)) ?? 'gameon';
  const brand = brandRaw.toLowerCase();

  const href = scope === 'admin' ? '/login?next=/admin' : `/login?brandName=${brand}`;
  const btn = scope === 'admin' ? 'Go to Admin Login' : 'Go to Login';

  return (
    <Card title="Session Timed Out">
      <p className="text-sm text-zinc-200">You were signed out due to inactivity.</p>
      <button
        onClick={() => {
          const dest = scope === 'admin' ? '/login?next=/admin' : `/login?brandName=${brand}`;
          try {
            window.location.assign(dest);
          } catch {
            window.location.href = dest;
          }
        }}
        className="mt-2 inline-flex w-full justify-center rounded-md px-4 py-2 border border-brand-primary bg-brand-600 text-white hover:bg-brand-700"
      >
        {btn}
      </button>
      <p className="text-xs text-zinc-300">For security, sessions end after inactivity.</p>
    </Card>
  );
}