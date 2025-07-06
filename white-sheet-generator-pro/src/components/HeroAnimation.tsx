
'use client';

import React, { useEffect, useRef } from 'react';

const HeroAnimation: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Start the rocket launch animation
    const rocket = svg.querySelector('.rocket');
    const flames = svg.querySelectorAll('.flame');
    
    if (rocket) {
      // Add launch animation class after a brief delay
      setTimeout(() => {
        rocket.classList.add('animate-launch');
      }, 500);
    }

    // Animate the flames with staggered delays
    flames.forEach((flame, index) => {
      const element = flame as SVGElement;
      element.style.animationDelay = `${0.5 + index * 0.1}s`;
      element.classList.add('animate-flame');
    });
  }, []);

  return (
    <div className="relative w-full h-32 mb-8 flex justify-center items-center overflow-hidden">
      <svg
        ref={svgRef}
        width="300"
        height="120"
        viewBox="0 0 300 120"
        className="opacity-90"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient for the flames */}
          <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.9" />
            <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.3" />
          </linearGradient>
          
          {/* Filter for subtle glow */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Rocket body - simple stroke design, centered and fully visible */}
        <g className="rocket" transform="translate(150, 60)">
          {/* Rocket body */}
          <path
            d="M0,-25 L-8,-10 L-8,10 L8,10 L8,-10 Z"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Rocket nose cone */}
          <path
            d="M0,-25 L-8,-25 L0,-35 L8,-25"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Rocket fins */}
          <path
            d="M-8,5 L-15,15 L-8,10"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8,5 L15,15 L8,10"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Window/porthole */}
          <circle
            cx="0"
            cy="-5"
            r="4"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
        </g>

        {/* Animated flames - positioned below the rocket */}
        <g transform="translate(150, 60)">
          {/* Main flame */}
          <path
            className="flame"
            d="M-6,10 Q-3,20 0,25 Q3,20 6,10"
            fill="url(#flameGradient)"
            opacity="0"
          />
          
          {/* Side flames */}
          <path
            className="flame"
            d="M-4,12 Q-2,18 0,22 Q1,18 3,12"
            fill="hsl(var(--secondary))"
            opacity="0"
          />
          
          {/* Small flame particles */}
          <circle className="flame" cx="-2" cy="22" r="1" fill="hsl(var(--secondary))" opacity="0" />
          <circle className="flame" cx="2" cy="24" r="1.5" fill="hsl(var(--secondary))" opacity="0" />
          <circle className="flame" cx="0" cy="28" r="1" fill="hsl(var(--secondary))" opacity="0" />
        </g>
      </svg>
    </div>
  );
};

export default HeroAnimation;
