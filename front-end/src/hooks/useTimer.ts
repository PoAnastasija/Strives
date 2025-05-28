import { useState, useRef } from 'react';

export const useTimer = (initialMinutes = 45) => {
  const [minutes, setMinutes] = useState<number>(initialMinutes);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setSeconds((s) => {
          if (minutes === 0 && s === 0) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            return 0;
          }
          if (s === 0) {
            setMinutes((m) => Math.max(m - 1, 0));
            return 59;
          }
          return s - 1;
        });
      }, 1000);
    }
  };

  const pause = () => {
    clearInterval(timerRef.current!);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(timerRef.current!);
    setMinutes(initialMinutes);
    setSeconds(0);
    setIsRunning(false);
  };

  const incrementMinutes = () => setMinutes((m) => Math.min(m + 1, 60));
  const decrementMinutes = () => setMinutes((m) => Math.max(m - 1, 1));

  return {
    minutes,
    seconds,
    isRunning,
    start,
    pause,
    reset,
    incrementMinutes,
    decrementMinutes,
  };
};
