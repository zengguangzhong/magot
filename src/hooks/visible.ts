import { useState, useEffect } from 'react';

export function useTimingToggle(
  initial: boolean,
  duration?: number,
  canceled?: boolean
) {
  const [visible, setVisible] = useState(initial);
  useEffect(() => {
    let timer = 0;
    if (visible && !canceled && duration != null && duration > 0) {
      timer = window.setTimeout(() => setVisible(!visible), duration);
    }
    return () => window.clearTimeout(timer);
  });
  return visible;
}
