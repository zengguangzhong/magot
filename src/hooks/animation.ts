import { useState, useEffect, RefObject } from 'react';

export function useAnimation(
  visibility: boolean,
  nodeRef: RefObject<HTMLElement>,
  animationEnd?: () => void,
  isTransition?: boolean
) {
  const anim = visibility ? 'enter' : 'leave';
  const [animation, setAnimation] = useState<string | null>(anim);
  useEffect(
    () => {
      const node = nodeRef.current;
      const event = isTransition ? 'transitionend' : 'animationend';
      const handleEvent = (e: AnimationEvent | TransitionEvent) => {
        if (e.target !== node) return;
        if (!visibility && animation) setAnimation(null);
        animationEnd && animationEnd();
      };
      if (node) {
        if (animation !== anim) setAnimation(anim);
        node.addEventListener(event, handleEvent, false);
      }
      return () => {
        node && node.removeEventListener(event, handleEvent);
      };
    },
    [visibility]
  );
  return animation;
}
