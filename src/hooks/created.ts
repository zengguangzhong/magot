import { useState, useEffect, RefObject } from 'react';

export function useCreated(ref: RefObject<HTMLElement>) {
  const [created, setCreated] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (node && !created) setCreated(true);
  });
  return created;
}
