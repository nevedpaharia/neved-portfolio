'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  useScaleUpSection,
  scaleUpVariants,
  scaleUpContainerVariants,
  layeredTextVariants,
  layeredContainerVariants,
  buttonGroupVariants,
} from '@/hooks/use-scale-up-section';
import { Menu, X, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const isMobile = useIsMobile();
  const scaleUpRef = useScaleUpSection();

  // Add scroll-based floating animation for the brush underline
  const { scrollYProgress } = useScroll({
    offset: ['start end', 'end start'],
  });
  const floatingY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  const fullText = 'Recommended by my Mother';

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStep(1), 300);
    const timer2 = setTimeout(() => setAnimationStep(2), 800);
    const timer3 = setTimeout(() => setAnimationStep(3), 1300);
    const timer4 = setTimeout(() => setAnimationStep(4), 1800);
    const timer5 = setTimeout(() => setAnimationStep(5), 2300);
    const timer6 = setTimeout(() => setAnimationStep(6), 2800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, []);

  useEffect(() => {
    if (animationStep >= 6) {
      const delay = setTimeout(() => {
        let i = 0;
        const typewriterTimer = setInterval(() => {
          if (i < fullText.length) {
            setTypewriterText(fullText.slice(0, i + 1));
            i++;
          } else {
            clearInterval(typewriterTimer);
          }
        }, 50);
      }, 800);
      return () => clearTimeout(delay);
    }
  }, [animationStep, fullText]);

  const scrollToSection = (id: string): void => {
    const section = document.getElementById(id);
    if (section) {
      // Find the primary heading (quentin-font) inside the section
      const heading = section.querySelector('.quentin-font');
      if (heading) {
        const yOffset = -7 * 16; // 7rem in px
        const y = (heading as HTMLElement).getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        // fallback: scroll to section top with offset
        const yOffset = -7 * 16;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <section id="home" className="relative text-white bg-transparent">
      {/* Top Nav */}
      <div className="max-w-4xl mx-auto w-full">
        <nav className="px-16 py-4 text-white" style={{ marginTop: 0 }}>
          {isMobile ? (
            <>
              <div className="flex justify-between items-center">
                <button onClick={() => scrollToSection('home')} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <img
                    src="/logo.png"
                    alt="Neved Paharia Portfolio Logo"
                    width={86}
                    height={34}
                    className="object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML =
                        '<div class="text-lg font-bold text-primary">NEVED</div>';
                    }}
                  />
                </button>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-white hover:opacity-80 transition"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
              {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border mt-2 py-4">
                  <div className="flex flex-col space-y-4 px-8">
                    {['about', 'projects', 'testimonials', 'contact'].map((sec) => (
                      <button
                        key={sec}
                        onClick={() => scrollToSection(sec)}
                        className="text-left text-white hover:text-white/80 transition"
                      >
                        {sec.charAt(0).toUpperCase() + sec.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-center items-center gap-8 text-white text-base">
              {['about', 'projects'].map((sec) => (
                <button
                  key={sec}
                  onClick={() => scrollToSection(sec)}
                  className="hover:opacity-80 transition text-white"
                >
                  {sec.charAt(0).toUpperCase() + sec.slice(1)}
                </button>
              ))}
              <button onClick={() => scrollToSection('home')} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <img
                  src="/logo.png"
                  alt="Neved Paharia Portfolio Logo"
                  width={108}
                  height={43}
                  className="object-contain mx-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML =
                      '<div class="text-xl font-bold text-primary">NEVED</div>';
                  }}
                />
              </button>
              {['testimonials', 'contact'].map((sec) => (
                <button
                  key={sec}
                  onClick={() => scrollToSection(sec)}
                  className="hover:opacity-80 transition text-white"
                >
                  {sec.charAt(0).toUpperCase() + sec.slice(1)}
                </button>
              ))}
            </div>
          )}
        </nav>
      </div>

      {/* Hero Body - True Two Column Layout with Debug Borders */}
      <div className="w-full max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-stretch justify-between gap-12 min-h-[80vh]">
        {/* LEFT COLUMN */}
        <div className="flex-1 flex flex-col justify-center items-start text-left gap-6 border-2 border-red-500">
          {/* Startup Daydreamer - now at the top */}
          <div className="flex items-center gap-2 font-light" style={{ fontSize: '0.9rem' }}>
            <span className="text-lg">🚀</span>
            <span>Hey, Startup Daydreamer</span>
          </div>
          {/* Headline - constrained width */}
          <h1 className="font-sans font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight w-full max-w-[500px] break-words" style={{ lineHeight: 1.35, fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
            I forge <span className="relative inline-block align-baseline">magnetic
              <img
                src="/brush-underline.svg"
                alt=""
                className="absolute left-0 right-0 w-full h-2 bottom-[-2px] pointer-events-none origin-left"
                style={{ transform: 'scaleX(1)' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </span> brand<br />identities
          </h1>
          {/* Subtitle - now directly below headline */}
          <div className="w-full max-w-[500px]">
            <p className="font-light text-white mt-2" style={{ fontSize: '1rem' }}>
              ~no half‑measures, pure impact.~
            </p>
          </div>
          {/* Button Group */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[500px]">
            <Button
              onClick={() => scrollToSection('projects')}
              className="bg-white text-[#14213d] px-6 radius-full text-sm font-medium shadow-lg h-11 hover:bg-gray-200 hover:text-[#14213d] w-auto"
              style={{ minWidth: 'unset' }}
            >
              See My Work
            </Button>
            <div className="relative group w-fit h-fit transition-transform duration-300">
              <div
                className="absolute inset-0 rounded-md filter blur-lg animate-glowing"
                style={{
                  background:
                    'linear-gradient(45deg, #e0e0e0, transparent, #f0f0f0, #ffffff, transparent, #f8f8f8, #e8e8e8, transparent, #f8f8f8, #ffffff, transparent, #f0f0f0, #e0e0e0)',
                  backgroundSize: '400% 400%',
                  zIndex: 0,
                }}
              />
              <div className="absolute inset-0 rounded-md bg-background z-10 pointer-events-none" />
              <Button
                variant="ghost"
                onClick={() => scrollToSection('contact')}
                className="relative z-20 border border-white text-white bg-transparent px-6 rounded-md text-sm font-medium h-11 flex items-center justify-center hover:text-white backdrop-blur-sm active:scale-95 transition-transform duration-100 w-auto"
                style={{ color: '#fff', backgroundColor: '#14213d', borderColor: '#fff', minWidth: 'unset' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#14213d'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#14213d'; }}
              >
                Book a Free Call
              </Button>
            </div>
          </div>
          {/* Social Proof */}
          <div className="flex items-center gap-1 text-xs text-white/70 opacity-70 mt-2 w-full max-w-[500px]">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-white/70 transition-all duration-300 opacity-100`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="ml-1 text-left text-white/70 transition-all duration-500 opacity-100 translate-x-0">
              Recommended by my Mother
            </span>
          </div>
        </div>
        {/* RIGHT COLUMN */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 max-w-xs mx-auto min-h-[350px] border-2 border-blue-500">
          <div className="flex flex-row items-end justify-center gap-2 w-full mt-8 mb-4">
            <div className="w-24 h-40 bg-gray-200 rounded-[40%]" />
            <div className="w-16 h-24 bg-gray-200 rounded-[40%]" />
            <div className="w-12 h-12 bg-gray-200 rounded-[40%]" />
          </div>
          {/* Cool Number Stat Pill */}
          <div className="bg-gray-500 rounded-full px-8 py-6 flex flex-col items-center justify-center shadow-lg mt-2">
            <span className="text-2xl font-bold">100</span>
            <span className="text-base font-light">Cool Number</span>
          </div>
        </div>
      </div>
      {/* Badges Row Below Hero */}
      <div className="flex flex-wrap justify-center gap-4 mt-16 w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2 px-6 py-2 rounded-full border border-gray-300 bg-white/70 text-gray-700 text-base font-medium shadow-sm">
            <span>✓</span> Positive Result
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
