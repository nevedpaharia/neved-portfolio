import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const CURSOR_COLOR = '#fff';
const PAPER_CURSOR_COLOR = '#14213d'; // Dark blue for paper backgrounds

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isOverPaper, setIsOverPaper] = useState(false);
  
  // Refs for cleanup
  const animationIdRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: -100 });
  const prevMouseRef = useRef({ x: window.innerWidth / 2, y: -100 });

  useEffect(() => {
    if (isMobile) return;
    
    const dotElement = dotRef.current;
    const ringElement = ringRef.current;
    if (!dotElement || !ringElement) return;

    // Track mouse position - start off-screen
    const mouse = mouseRef.current;
    const prevMouse = prevMouseRef.current;
    
    // Start cursor above the screen
    const dot = { x: mouse.x, y: -100 };
    const ring = { x: mouse.x, y: -100 };
    
    let dotScale = 0;
    let ringScale = 0;
    let dotAngle = 0;
    let ringAngle = 0;
    let hasEntered = false;

    // Lerp factors
    const dotLerp = 0.12;   // Small dot: more fluid
    const ringLerp = 0.06;  // Big ring: more fluid

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    function animate() {
      // Check if mouse has entered the screen
      if (!hasEntered && mouse.y >= 0) {
        hasEntered = true;
        // Snap to current mouse position when entering
        dot.x = mouse.x;
        dot.y = mouse.y;
        ring.x = mouse.x;
        ring.y = mouse.y;
      }
      
      if (hasEntered) {
        // Normal cursor following after entrance
        dot.x += (mouse.x - dot.x) * dotLerp;
        dot.y += (mouse.y - dot.y) * dotLerp;
        ring.x += (mouse.x - ring.x) * ringLerp;
        ring.y += (mouse.y - ring.y) * ringLerp;
      }

      // SQUISH/JELLY EFFECTS
      const deltaMouseX = mouse.x - prevMouse.x;
      const deltaMouseY = mouse.y - prevMouse.y;
      prevMouse.x = mouse.x;
      prevMouse.y = mouse.y;
      const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, 150);
      
      // Dot squish
      const dotScaleValue = (mouseVelocity / 150) * 0.5;
      dotScale += (dotScaleValue - dotScale) * dotLerp;
      const dotTotalScale = 1 + dotScale;
      
      // Ring squish
      const ringScaleValue = (mouseVelocity / 80) * 0.7; // More reactive squish
      ringScale += (ringScaleValue - ringScale) * ringLerp;
      const ringTotalScale = 1 + ringScale;
      
      // Rotation
      const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
      if (mouseVelocity > 20) {
        dotAngle = angle;
        ringAngle = angle;
      }

      // Apply transforms
      dotElement.style.transform = `translate(${dot.x / 16}rem, ${dot.y / 16}rem) rotate(${dotAngle}deg) scale(${dotTotalScale}, ${1 - dotScale})`;
      ringElement.style.transform = `translate(${ring.x / 16}rem, ${ring.y / 16}rem) rotate(${ringAngle}deg) scale(${ringTotalScale}, ${1 - ringScale})`;

      // Continue animation loop
      animationIdRef.current = requestAnimationFrame(animate);
    }

    // Start animation
    animationIdRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
    };
  }, [isMobile]);

  // Separate effect for paper background detection - optimized version
  useEffect(() => {
    if (isMobile) return;

    // Cache DOM elements to avoid repeated queries
    const aboutSection = document.getElementById('about');
    const testimonialsSection = document.getElementById('testimonials');
    
    // Only query once at the start
    const aboutPaper = aboutSection?.querySelector('img[src*="paper"]') as HTMLImageElement;
    const testimonialsPaper = testimonialsSection?.querySelector('img[src*="paper"]') as HTMLImageElement;

    const checkPaperBackground = () => {
      const currentMouseX = mouseRef.current.x;
      const currentMouseY = mouseRef.current.y;
      
      let overPaper = false;
      
      // Check About section paper - simplified bounds check
      if (aboutSection) {
        const sectionRect = aboutSection.getBoundingClientRect();
        
        // Quick bounds check first
        if (currentMouseX >= sectionRect.left && currentMouseX <= sectionRect.right &&
            currentMouseY >= sectionRect.top && currentMouseY <= sectionRect.bottom) {
          
          // For now, assume if within bounds, it's over paper
          // This is much faster and still provides good UX
          overPaper = true;
        }
      }
      
      // Check Testimonials section paper
      if (testimonialsSection && !overPaper) {
        const sectionRect = testimonialsSection.getBoundingClientRect();
        
        // Quick bounds check first
        if (currentMouseX >= sectionRect.left && currentMouseX <= sectionRect.right &&
            currentMouseY >= sectionRect.top && currentMouseY <= sectionRect.bottom) {
          
          // For now, assume if within bounds, it's over paper
          overPaper = true;
        }
      }
      
      setIsOverPaper(overPaper);
    };

    const handleScroll = () => {
      // Check paper background on scroll even if mouse isn't moving
      checkPaperBackground();
    };

    // Use requestAnimationFrame for smooth performance
    const throttledScrollHandler = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(() => {
        handleScroll();
      });
    };

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          '--circle-size': '2.1875rem',
          position: 'fixed',
          height: 'var(--circle-size)',
          width: 'var(--circle-size)',
          border: `0.125rem solid ${isOverPaper ? PAPER_CURSOR_COLOR : CURSOR_COLOR}`,
          borderRadius: '100%',
          top: 'calc(var(--circle-size) / 2 * -1)',
          left: 'calc(var(--circle-size) / 2 * -1)',
          pointerEvents: 'none',
          zIndex: 999999,
          backgroundColor: isOverPaper ? 'rgba(20,33,61,0.08)' : 'rgba(255,255,255,0.08)',
          boxShadow: isOverPaper ? '0 0 1.25rem rgba(20,33,61,0.12)' : '0 0 1.25rem rgba(255,255,255,0.12)',
          transition: 'none',
        } as React.CSSProperties}
      />
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          '--circle-size': '0.625rem',
          position: 'fixed',
          height: 'var(--circle-size)',
          width: 'var(--circle-size)',
          borderRadius: '100%',
          top: 'calc(var(--circle-size) / 2 * -1)',
          left: 'calc(var(--circle-size) / 2 * -1)',
          pointerEvents: 'none',
          zIndex: 999999,
          backgroundColor: isOverPaper ? PAPER_CURSOR_COLOR : CURSOR_COLOR,
          boxShadow: isOverPaper ? '0 0 0.5rem rgba(20,33,61,0.25)' : '0 0 0.5rem rgba(255,255,255,0.25)',
          border: 'none',
          transition: 'none',
        } as React.CSSProperties}
      />
    </>
  );
};

export default CustomCursor; 