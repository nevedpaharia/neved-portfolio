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
    <section id="home" className="relative text-white">
      {/* Top Nav */}
      <nav className="absolute inset-x-0 top-0 z-50 px-8 py-8 text-white">
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

      {/* Hero Body */}
      <div className="relative flex flex-col items-center justify-center text-white text-center px-4 pt-[10vh] min-h-[100vh]">
        <motion.div
          className="relative z-10 max-w-4xl w-full"
          variants={scaleUpContainerVariants}
          initial="hidden"
          animate="visible"
          ref={scaleUpRef}
        >
          {/* Startup Daydreamer */}
          <motion.div
            className="flex justify-center items-center gap-2 text-white font-light mx-auto text-center"
            style={{ fontSize: '0.9rem', marginBottom: '-0.25rem' }}
            variants={layeredTextVariants}
          >
            <span className="text-lg">🚀</span>
            <span>Hey, Startup Daydreamer</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mx-auto"
            style={{ lineHeight: 1.35, marginBottom: '-0.25rem' }}
            variants={layeredTextVariants}
          >
            I forge <span className="relative inline-block align-baseline">
              <span className="relative inline-block">
                <span className="z-10 relative">magnetic</span>
                <motion.img
                  src="/brush-underline.svg"
                  alt=""
                  className="absolute left-0 right-0 w-full h-2 bottom-[-2px] pointer-events-none origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 1.2,
                    ease: [0.42, 0, 0.58, 1],
                    delay: 0.8,
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </span>
            </span> brand<br />
            identities
          </motion.h1>

          {/* Subtitle */}
          <motion.div className="mx-auto" variants={layeredTextVariants}>
            <p className="font-light text-white max-w-4xl mx-auto" style={{ fontSize: '1rem', marginBottom: '2.5rem' }}>
              ~no half‑measures, pure impact.~
            </p>
          </motion.div>

          {/* Button Group */}
          <motion.div
            className="flex flex-col sm:flex-row gap-[1.5rem] justify-center items-center"
            style={{ marginTop: '2rem' }}
            variants={buttonGroupVariants}
          >
            <Button
              onClick={() => scrollToSection('projects')}
              className="bg-white text-[#14213d] px-6 py-3 radius-full text-sm font-medium shadow-lg h-11 hover:bg-gray-200 hover:text-[#14213d]"
            >
              See My Work
            </Button>
            {/* ── Gray Glow Wrapper ── */}
            <div className="relative group w-fit h-fit transition-transform duration-300">
              {/* gray glow ring */}
              <div
                className="absolute inset-0 rounded-md filter blur-lg animate-glowing"
                style={{
                  background:
                    'linear-gradient(45deg, #e0e0e0, transparent, #f0f0f0, #ffffff, transparent, #f8f8f8, #e8e8e8, transparent, #f8f8f8, #ffffff, transparent, #f0f0f0, #e0e0e0)',
                  backgroundSize: '400% 400%',
                  zIndex: 0,
                }}
              />
              {/* mask to keep glow outside */}
              <div className="absolute inset-0 rounded-md bg-background z-10 pointer-events-none" />
              <Button
                variant="ghost"
                onClick={() => scrollToSection('contact')}
                className="relative z-20 border border-white text-white bg-transparent px-6 py-3 rounded-md text-sm font-medium h-11 flex items-center justify-center hover:text-white backdrop-blur-sm active:scale-95 transition-transform duration-100"
                style={{ color: '#fff', backgroundColor: '#14213d', borderColor: '#fff' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#14213d'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#14213d'; }}
              >
                Book a Free Call
              </Button>
            </div>
          </motion.div>

          {/* Social Proof (stars/recommended) - below button group */}
          <motion.div
            className="flex justify-center items-center gap-1 text-xs text-white/70 opacity-70"
            style={{ marginTop: '3rem' }}
            variants={layeredTextVariants}
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-white/70 transition-all duration-300 ${
                    animationStep >= 6 ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    transitionDelay: animationStep >= 6 ? `${i * 100}ms` : '0ms',
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <span
              className={`ml-1 text-left text-white/70 transition-all duration-500 ${
                animationStep >= 6 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              }`}
            >
              {typewriterText}
              {animationStep >= 6 && typewriterText.length > 0 && typewriterText.length < fullText.length && (
                <span className="animate-pulse">|</span>
              )}
            </span>
          </motion.div>
        </motion.div>
        {/* Scroll Arrow - restore to absolute bottom center */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-slow-bounce z-20"
          variants={layeredTextVariants}
        >
          <span className="text-sm font-light text-white drop-shadow-sm">Scroll</span>
          <ChevronDown size={20} className="text-white drop-shadow-sm" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
