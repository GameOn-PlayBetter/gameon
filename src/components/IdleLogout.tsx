'use client';
import { useEffect, useRef } from 'react';
import { createClient } from '../lib/supabase/server';

export default function IdleLogout() {
  const timerRef = useRef<number | null>(null);
  const IDLE_MS = 20 * 60 * 1000; // 20 minutes

  useEffect(() => {
    const reset = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);

      const live = !!document.querySelector('[data-live-session="true"]');
      if (live) return;

      timerRef.current = window.setTimeout(async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        window.location.assign('/login');
      }, IDLE_MS) as unknown as number;
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(e => window.addEventListener(e, reset, { passive: true }));
    reset();

    return () => {
      events.forEach(e => window.removeEventListener(e, reset));
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return null;
}