'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const isMobile = useIsMobile();

  const fullText = 'Recommended by my Mother';

  useEffect(() => {
    const timer = setTimeout(() => setAnimationStep(1), 300);
    const timer2 = setTimeout(() => setAnimationStep(2), 800);
    const timer3 = setTimeout(() => setAnimationStep(3), 1300);
    const timer4 = setTimeout(() => setAnimationStep(4), 1800);
    const timer5 = setTimeout(() => setAnimationStep(5), 2300);
    const timer6 = setTimeout(() => setAnimationStep(6), 2800);

    return () => {
      clearTimeout(timer);
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
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <section id="home" className="relative text-white">
      {/* Top Nav */}
      <nav className="absolute inset-x-0 top-0 z-50 px-8 py-8 text-white">
        {isMobile ? (
          <>
            <div className="flex justify-between items-center">
              <button onClick={() => scrollToSection('home')} className="focus:outline-none">
                <img
                  src="/logo.png"
                  alt="Logo"
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
                  {['about','projects','testimonials','contact'].map((sec) => (
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
            {['about','projects'].map(sec => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className="hover:opacity-80 transition text-white"
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </button>
            ))}
            <button onClick={() => scrollToSection('home')} className="focus:outline-none">
              <img
                src="/logo.png"
                alt="Logo"
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
            {['testimonials','contact'].map(sec => (
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
      <div className="relative flex flex-col h-[100vh] items-center justify-center text-white text-center px-4 pt-24">
        <div className="relative z-10 max-w-4xl">
          <div className={`flex justify-center items-center gap-2 text-white text-sm md:text-base font-light mb-1 transition-all duration-700 ${
            animationStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <span className="text-lg">🚀</span>
            <span>Hey, Startup Daydreamer</span>
          </div>

          <h1 className={`text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight transition-all duration-700 ${
            animationStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            I procrastinate making
            <br />
            case studies
          </h1>

          <div className="mt-6">
            <p className={`text-base md:text-lg lg:text-xl font-light text-white transition-all duration-700 ${
              animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              ~but when I get to it, I try <span className="relative inline-block">
                making 'em right
                <img
                  src="/brush-underline.svg"
                  alt=""
                  className={`absolute bottom-0 left-0 w-full h-2 pointer-events-none transition-all duration-1000 origin-left ${
                    animationStep >= 4 ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </span>~
            </p>
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 transition-all duration-700 ${
            animationStep >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Button
              onClick={() => scrollToSection('projects')}
              className="bg-white text-[#14213d] px-6 py-3 rounded-[114px] text-sm font-medium shadow-md h-11 hover:bg-gray-200 hover:text-[#14213d]"
            >
              See My Work
            </Button>

            <div className="relative group w-fit h-fit transition-transform duration-300 hover:scale-105">
              <div className="absolute inset-0 rounded-[114px] bg-white opacity-30 blur-xl z-0 transition-transform duration-[1600ms] group-hover:scale-110 animate-glow-pulse" />
              <Button
                variant="ghost"
                onClick={() => scrollToSection('contact')}
                className="relative z-10 border border-white text-white bg-transparent px-6 py-3 rounded-[114px] text-sm font-medium h-11 flex items-center justify-center hover:bg-white/10 hover:text-white"
              >
                Let's work together
              </Button>
            </div>
          </div>

          <div className="flex justify-center items-center gap-1 text-xs text-white/70 mt-16 opacity-70">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-white/70 transition-all duration-300 ${
                    animationStep >= 6 ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: animationStep >= 6 ? `${i * 100}ms` : '0ms' 
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <span className={`ml-1 text-left text-white/70 transition-all duration-500 ${animationStep >= 6 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}> 
              {typewriterText}
              {animationStep >= 6 && typewriterText.length > 0 && typewriterText.length < fullText.length && (
                <span className="animate-pulse">|</span>
              )}
            </span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-slow-bounce z-20">
          <span className="text-sm font-light text-white drop-shadow-sm">Scroll</span>
          <ChevronDown size={20} className="text-white drop-shadow-sm" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
