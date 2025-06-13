import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'focusCoins';

export function useCoins() {
  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? Number(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(coins));
  }, [coins]);

  const addCoins = useCallback((amount: number) => {
    setCoins(c => c + amount);
  }, []);

  const resetCoins = useCallback(() => {
    setCoins(0);
  }, []);

  return { coins, addCoins, resetCoins };
}
