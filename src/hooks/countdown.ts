import { useState, useEffect } from 'react';

export function useCountdown(initial: number, start: boolean) {
  const [time, setCountdown] = useState(initial);
  useEffect(() => {
    if (time === 0 && !start) {
      setCountdown(initial);
      return;
    }
    let timer = 0;
    if (time > 0 && start) {
      timer = window.setTimeout(() => setCountdown(time - 1), 1000);
    }
    return () => window.clearTimeout(timer);
  });
  return time;
}
