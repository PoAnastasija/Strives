import { useState, useRef } from 'react';

export const useTimer = (
  initialMinutes = 45,
  onMinuteChange?: (delta: number) => void,
  onComplete?: () => void
) => {
  const [minutes, setMinutes] = useState<number>(initialMinutes);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const minutesRef = useRef<number>(initialMinutes);
  const secondsRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  //fix le pb de timer à 1min, pouvoir augmenter mais pas diminuer
  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
    minutesRef.current = minutes;
    secondsRef.current = seconds;
    timerRef.current = setInterval(() => {
      if (secondsRef.current > 0) {
        secondsRef.current -= 1;
        setSeconds(secondsRef.current);
      } else {
        if (minutesRef.current > 0) {
          minutesRef.current -= 1;
          setMinutes(minutesRef.current);
          secondsRef.current = 59;
          setSeconds(59);
          onMinuteChange?.(1);
        } else {
          clearInterval(timerRef.current!);
          setIsRunning(false);
          onComplete?.();
          minutesRef.current = initialMinutes;
          secondsRef.current = 0;
          setMinutes(initialMinutes);
          setSeconds(0);
        }
      }
    }, 1000);
  };

  const pause = () => {
    clearInterval(timerRef.current!);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(timerRef.current!);
    minutesRef.current = initialMinutes;
    secondsRef.current = 0;
    setMinutes(initialMinutes);
    setSeconds(0);
    setIsRunning(false);
  };

  const incrementMinutes = () => {
    const next = Math.min(minutesRef.current + 1, 60);
    minutesRef.current = next;
    setMinutes(next);
  };

  const decrementMinutes = () => {
    if (minutesRef.current > 1) {
      const next = minutesRef.current - 1;
      minutesRef.current = next;
      setMinutes(next);
    }
  };

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
