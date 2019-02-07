import { useState, useEffect } from 'react';

export function useTimingToggle(
  initial: boolean,
  duration?: number,
  canceled?: boolean
) {
  const [state, setState] = useState(initial);
  useEffect(() => {
    let timer = 0;
    if (!canceled && duration != null && duration > 0) {
      timer = window.setTimeout(() => setState(!state), duration);
    }
    return () => window.clearTimeout(timer);
  }, [duration, canceled]);
  return state;
}
