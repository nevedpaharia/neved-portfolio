import React, { useEffect, useRef, useState } from 'react';
import { useIsDesktop } from '@/hooks/use-mobile';

const CURSOR_COLOR = '#fff';
const PAPER_CURSOR_COLOR = '#14213d'; // Dark blue for paper backgrounds

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const [isOverPaper, setIsOverPaper] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;
    const dotElement = dotRef.current;
    const ringElement = ringRef.current;
    if (!dotElement || !ringElement) return;

    // Track mouse position - start off-screen
    const mouse = { x: window.innerWidth / 2, y: -100 };
    const prevMouse = { x: mouse.x, y: mouse.y };
    
    // Start cursor above the screen
    const dot = { x: mouse.x, y: -100 };
    const ring = { x: mouse.x, y: -100 };
    
    let dotScale = 0;
    let ringScale = 0;
    let dotAngle = 0;
    let ringAngle = 0;
    let hasEntered = false;

    // Lerp factors
    const dotLerp = 0.25;   // Small dot: less lag
    const ringLerp = 0.10;  // Big ring: balanced lag and reactivity

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

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
      dotElement.style.transform = `translate(${dot.x}px, ${dot.y}px) rotate(${dotAngle}deg) scale(${dotTotalScale}, ${1 - dotScale})`;
      ringElement.style.transform = `translate(${ring.x}px, ${ring.y}px) rotate(${ringAngle}deg) scale(${ringTotalScale}, ${1 - ringScale})`;

      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDesktop]);

  // Separate effect for paper background detection - optimized version
  useEffect(() => {
    if (!isDesktop) return;

    let currentMouseX = window.innerWidth / 2;
    let currentMouseY = window.innerHeight / 2;

    const checkPaperBackground = () => {
      // Get the paper background images
      const aboutPaper = document.querySelector('#about img[src*="paper"]') as HTMLImageElement;
      const testimonialsPaper = document.querySelector('#testimonials img[src*="paper"]') as HTMLImageElement;
      
      let overPaper = false;
      
      // Check About section paper - simplified bounds check
      if (aboutPaper) {
        const aboutSection = document.getElementById('about');
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
      }
      
      // Check Testimonials section paper
      if (testimonialsPaper && !overPaper) {
        const testimonialsSection = document.getElementById('testimonials');
        if (testimonialsSection) {
          const sectionRect = testimonialsSection.getBoundingClientRect();
          
          // Quick bounds check first
          if (currentMouseX >= sectionRect.left && currentMouseX <= sectionRect.right &&
              currentMouseY >= sectionRect.top && currentMouseY <= sectionRect.bottom) {
            
            // For now, assume if within bounds, it's over paper
            overPaper = true;
          }
        }
      }
      
      setIsOverPaper(overPaper);
    };

    const handleMouseMove = (e: MouseEvent) => {
      currentMouseX = e.clientX;
      currentMouseY = e.clientY;
      checkPaperBackground();
    };

    const handleScroll = () => {
      // Check paper background on scroll even if mouse isn't moving
      checkPaperBackground();
    };

    // Use requestAnimationFrame for smooth performance
    let rafId: number;
    const throttledScrollHandler = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        handleScroll();
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', throttledScrollHandler);
      cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  if (!isDesktop) {
    return null;
  }

  return (
    <>
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          '--circle-size': '35px',
          position: 'fixed',
          height: 'var(--circle-size)',
          width: 'var(--circle-size)',
          border: `2px solid ${isOverPaper ? PAPER_CURSOR_COLOR : CURSOR_COLOR}`,
          borderRadius: '100%',
          top: 'calc(var(--circle-size) / 2 * -1)',
          left: 'calc(var(--circle-size) / 2 * -1)',
          pointerEvents: 'none',
          zIndex: 999999,
          backgroundColor: isOverPaper ? 'rgba(20,33,61,0.08)' : 'rgba(255,255,255,0.08)',
          boxShadow: isOverPaper ? '0 0 20px rgba(20,33,61,0.12)' : '0 0 20px rgba(255,255,255,0.12)',
          transition: 'none',
        } as React.CSSProperties}
      />
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          '--circle-size': '10px',
          position: 'fixed',
          height: 'var(--circle-size)',
          width: 'var(--circle-size)',
          borderRadius: '100%',
          top: 'calc(var(--circle-size) / 2 * -1)',
          left: 'calc(var(--circle-size) / 2 * -1)',
          pointerEvents: 'none',
          zIndex: 999999,
          backgroundColor: isOverPaper ? PAPER_CURSOR_COLOR : CURSOR_COLOR,
          boxShadow: isOverPaper ? '0 0 8px rgba(20,33,61,0.25)' : '0 0 8px rgba(255,255,255,0.25)',
          border: 'none',
          transition: 'none',
        } as React.CSSProperties}
      />
    </>
  );
};

export default CustomCursor; 