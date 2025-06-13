import { useState, useEffect, useCallback } from 'react';

export type DayStat = { date: string; minutes: number };
const STORAGE_KEY = 'focusStats';

export function useStats() {
  const [stats, setStats] = useState<DayStat[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  const addOrUpdateToday = useCallback((delta: number) => {
    const today = new Date().toISOString().slice(0, 10);
    setStats((prev) => {
      const idx = prev.findIndex((s) => s.date === today);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { date: today, minutes: updated[idx].minutes + delta };
        return updated;
      }
      return [...prev, { date: today, minutes: delta }];
    });
  }, []);

  return { stats, addOrUpdateToday };
}
