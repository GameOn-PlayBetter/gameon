'use client';
import { useEffect, type PropsWithChildren } from 'react';

export default function LiveSessionGuard({ children }: PropsWithChildren) {
  useEffect(() => {
    console.debug("✅ LiveSessionGuard active: pausing idle logout");
    document.body.setAttribute('data-live-session', 'true');
    return () => {
      console.debug("⏹️ LiveSessionGuard removed: resuming idle logout");
      document.body.removeAttribute('data-live-session');
    };
  }, []);
  return <>{children}</>;
}