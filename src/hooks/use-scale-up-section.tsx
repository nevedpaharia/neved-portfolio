import { useEffect, useRef } from 'react';
import { useReducedMotion } from './use-reduced-motion';

export function useScaleUpSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion) return;
    
    node.classList.add('scale-up-section-init');
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('scale-up-section');
          node.classList.remove('scale-up-section-init');
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return ref;
}

// Framer Motion variants for scale-up animations
export const scaleUpVariants = (prefersReducedMotion: boolean = false) => ({
  hidden: { 
    opacity: prefersReducedMotion ? 1 : 0, 
    scale: prefersReducedMotion ? 1 : 0.95,
    y: prefersReducedMotion ? 0 : 20 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: prefersReducedMotion ? {} : {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    }
  }
});

export const scaleUpContainerVariants = (prefersReducedMotion: boolean = false) => ({
  hidden: { opacity: prefersReducedMotion ? 1 : 0 },
  visible: {
    opacity: 1,
    transition: prefersReducedMotion ? {} : {
      when: "beforeChildren",
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
});

// Enhanced variants for layered text and button animations
export const layeredTextVariants = (prefersReducedMotion: boolean = false) => ({
  hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: prefersReducedMotion ? {} : {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    }
  }
});

export const layeredContainerVariants = (prefersReducedMotion: boolean = false) => ({
  hidden: { opacity: prefersReducedMotion ? 1 : 0 },
  visible: {
    opacity: 1,
    transition: prefersReducedMotion ? {} : {
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
});

export const buttonGroupVariants = (prefersReducedMotion: boolean = false) => ({
  hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: prefersReducedMotion ? {} : {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    }
  }
}); 