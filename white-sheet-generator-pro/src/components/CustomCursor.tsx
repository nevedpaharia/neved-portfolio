import React, { useEffect, useRef } from 'react';
import { useIsDesktop } from '@/hooks/use-mobile';

const OXFORD = '#031636';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!isDesktop) return;
    const dotElement = dotRef.current;
    const ringElement = ringRef.current;
    if (!dotElement || !ringElement) return;

    // Track mouse position
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const prevMouse = { x: mouse.x, y: mouse.y };
    const dot = { x: mouse.x, y: mouse.y };
    const ring = { x: mouse.x, y: mouse.y };
    let dotScale = 0;
    let ringScale = 0;
    let dotAngle = 0;
    let ringAngle = 0;

    // Lerp factors
    const dotLerp = 0.25;   // Small dot: less lag
    const ringLerp = 0.10;  // Big ring: balanced lag and reactivity

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    function animate() {
      // DOT
      dot.x += (mouse.x - dot.x) * dotLerp;
      dot.y += (mouse.y - dot.y) * dotLerp;
      // RING
      ring.x += (mouse.x - ring.x) * ringLerp;
      ring.y += (mouse.y - ring.y) * ringLerp;

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
          border: `2px solid ${OXFORD}`,
          borderRadius: '100%',
          top: 'calc(var(--circle-size) / 2 * -1)',
          left: 'calc(var(--circle-size) / 2 * -1)',
          pointerEvents: 'none',
          zIndex: 999999,
          backgroundColor: 'rgba(3, 22, 54, 0.04)',
          boxShadow: '0 0 20px rgba(3, 22, 54, 0.075)',
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
          backgroundColor: OXFORD,
          boxShadow: '0 0 8px rgba(3, 22, 54, 0.25)',
          border: 'none',
          transition: 'none',
        } as React.CSSProperties}
      />
    </>
  );
};

export default CustomCursor; 