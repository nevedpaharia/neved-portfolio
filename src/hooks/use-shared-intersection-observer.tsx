import { useEffect, useRef, useCallback, useState } from 'react';

interface UseSharedIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

interface UseSharedIntersectionObserverReturn {
  ref: React.RefObject<HTMLElement>;
  isIntersecting: boolean;
}

// Global observer instance
let globalObserver: IntersectionObserver | null = null;
const observerCallbacks = new Map<Element, (isIntersecting: boolean) => void>();

const createGlobalObserver = (options: IntersectionObserverOptions) => {
  if (globalObserver) {
    globalObserver.disconnect();
  }
  
  globalObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const callback = observerCallbacks.get(entry.target);
      if (callback) {
        callback(entry.isIntersecting);
      }
    });
  }, options);
  
  return globalObserver;
};

export const useSharedIntersectionObserver = (
  options: UseSharedIntersectionObserverOptions = {}
): UseSharedIntersectionObserverReturn => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  const defaultOptions: IntersectionObserverOptions = {
    threshold: options.threshold ?? 0.2,
    root: options.root ?? null,
    rootMargin: options.rootMargin ?? '0px',
  };

  const handleIntersection = useCallback((intersecting: boolean) => {
    setIsIntersecting(intersecting);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Create or get global observer
    if (!globalObserver) {
      globalObserver = createGlobalObserver(defaultOptions);
    }

    // Register callback
    observerCallbacks.set(element, handleIntersection);
    
    // Start observing
    globalObserver.observe(element);

    return () => {
      if (globalObserver) {
        globalObserver.unobserve(element);
        observerCallbacks.delete(element);
        
        // Clean up global observer if no more elements
        if (observerCallbacks.size === 0) {
          globalObserver.disconnect();
          globalObserver = null;
        }
      }
    };
  }, [handleIntersection, defaultOptions]);

  return { ref, isIntersecting };
};

// Legacy hook for backward compatibility
export const useFadeInSection = () => {
  const { ref, isIntersecting } = useSharedIntersectionObserver();
  
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    
    node.classList.add('fade-in-section-init');
    
    if (isIntersecting) {
      node.classList.add('fade-in-section');
      node.classList.remove('fade-in-section-init');
    }
  }, [isIntersecting, ref]);

  return ref;
};

export const useScaleUpSection = () => {
  const { ref, isIntersecting } = useSharedIntersectionObserver();
  
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    
    node.classList.add('scale-up-section-init');
    
    if (isIntersecting) {
      node.classList.add('scale-up-section');
      node.classList.remove('scale-up-section-init');
    }
  }, [isIntersecting, ref]);

  return ref;
}; 