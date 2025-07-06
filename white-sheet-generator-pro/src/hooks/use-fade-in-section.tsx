import { useEffect, useRef } from 'react';

export function useFadeInSection() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.classList.add('fade-in-section-init');
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('fade-in-section');
          node.classList.remove('fade-in-section-init');
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
} 