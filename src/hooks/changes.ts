import { useState, useEffect } from 'react';

type S<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export function useChanges<T>(
  value: T,
  internally?: boolean,
  equal?: (a: T, b: T) => boolean
) {
  const [changes, setChanges] = useState(value);
  useEffect(() => {
    if (!equal) equal = (a: T, b: T) => a === b;
    if (!internally && !equal(value, changes)) {
      setChanges(value);
    }
  });
  return [changes, setChanges] as S<T>;
}
