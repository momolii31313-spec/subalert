'use client';
import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;
    if (process.env.NODE_ENV !== 'production') return; // Only register in production
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }, []);
  return null;
}
