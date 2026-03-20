'use client';
import { useEffect } from 'react';

export function WakeLock() {
  useEffect(() => {
    let wakeLock: WakeLockSentinel | null = null;
    async function requestWakeLock() {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await navigator.wakeLock.request('screen');
        }
      } catch (e) { /* ignore */ }
    }
    requestWakeLock();
    return () => { wakeLock?.release(); };
  }, []);
  return null;
}
