import { useEffect } from 'react';
import JellyEffect, { Jelly } from '@/lib/jelly';

export function useJellyEffect(ref: React.RefObject<HTMLElement>, options = {}) {
  useEffect(() => {
    if (!ref.current) return;
    // Add the data attribute so JellyEffect picks it up
    ref.current.setAttribute('data-cuberto-jelly', JSON.stringify(options));
    // Create a Jelly instance for this element
    const jelly = new Jelly(ref.current, options);
    return () => {
      jelly.destroy();
    };
  }, [ref, options]);
} 