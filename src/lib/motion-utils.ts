import { useEffect, useRef } from 'react';

/**
 * Hook to ensure motion components have proper positioning for scroll calculations
 */
export const useMotionPositioning = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      const element = ref.current;
      const computedStyle = getComputedStyle(element);
      
      // Ensure the element has a non-static position
      if (computedStyle.position === 'static') {
        element.style.position = 'relative';
      }
    }
  }, []);

  return ref;
};

/**
 * Utility function to ensure an element has proper positioning
 */
export const ensurePositioning = (element: HTMLElement) => {
  const computedStyle = getComputedStyle(element);
  if (computedStyle.position === 'static') {
    element.style.position = 'relative';
  }
};

/**
 * Utility function to get proper scroll offset for an element
 */
export const getScrollOffset = (element: HTMLElement, offset: number = 0) => {
  ensurePositioning(element);
  const rect = element.getBoundingClientRect();
  return rect.top + window.pageYOffset + offset;
};