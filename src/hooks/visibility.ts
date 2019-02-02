import { useState, useEffect } from 'react';

type S = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

export function useVisibility(visible: boolean, internally?: boolean) {
  const [visibility, setVisibility] = useState(false);
  useEffect(() => {
    if (!internally && visible !== visibility) {
      setVisibility(visible);
    }
  });
  return [visibility, setVisibility] as S;
}
