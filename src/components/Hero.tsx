'use client';

import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useScaleUpSection } from '@/hooks/use-scale-up-section';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const isMobile = useIsMobile();
  const scaleUpRef = useScaleUpSection();

  const { scrollYProgress } = useScroll({ offset: ['start end', 'end start'] });
  const floatingY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const fullText = 'Recommended by my Mother';

  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimationStep(1), 300),
      setTimeout(() => setAnimationStep(2), 800),
      setTimeout(() => setAnimationStep(3), 1300),
      setTimeout(() => setAnimationStep(4), 1800),
      setTimeout(() => setAnimationStep(5), 2300),
      setTimeout(() => setAnimationStep(6), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (animationStep >= 6) {
      const delay = setTimeout(() => {
        let i = 0;
        const typer = setInterval(() => {
          if (i < fullText.length) {
            setTypewriterText(fullText.slice(0, i + 1));
            i++;
          } else clearInterval(typer);
        }, 50);
      }, 800);
      return () => clearTimeout(delay);
    }
  }, [animationStep, fullText]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return setIsMenuOpen(false);
    const heading = section.querySelector('.quentin-font');
    const yOffset = -7 * 16;
    const top = (heading || section).getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <section id="home" className="relative text-white bg-transparent py-[14.5rem]">
      {/* Top Nav */}
      <div className="max-w-4xl mx-auto w-full px-4 md:px-6">
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
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-white hover:opacity-80 transition">
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

      {/* Hero Body */}
      <div className="w-full min-h-screen flex items-center justify-start py-20">
        <div
          ref={scaleUpRef}
          className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{ gridTemplateColumns: '1fr 1fr' }}
        >
          {/* ← LEFT column restored to your original wrapper */}
          <div className="space-y-4 w-full text-left h-full self-stretch">
            {/* Startup Daydreamer Greeting */}
            <div
              className={`transition-all duration-700 ${
                animationStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-left gap-2 text-left w-full justify-start">
                <span className="text-2xl">🚀</span>
                <span className="text-sm font-light text-white/90">Hey, Startup Daydreamer</span>
              </div>
            </div>
            <div
              className={`transition-all duration-700 ${
                animationStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight text-left font-montserrat">
                I forge{' '}
                <span className="relative inline-block">
                  magnetic
                  <motion.img
                    src="/brush-underline.svg"
                    alt=""
                    className="absolute left-1/2 -translate-x-1/2 h-2 bottom-[-2px] pointer-events-none origin-left w-[90%]"
                    style={{ y: floatingY }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={animationStep >= 3 ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ duration: 0.7 }}
                    onError={(e) => e.currentTarget.remove()}
                  />
                </span>
                <br />
                brand identities
              </h1>
            </div>

            <div
              className={`transition-all duration-700 ${
                animationStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-lg font-light text-white/80 text-left">~no half‑measures, pure impact.~</p>
            </div>

            <div
              className={`transition-all duration-700 ${
                animationStep >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex gap-3 justify-start items-start">
                <Button
                  onClick={() => scrollToSection('contact')}
                  style={{ backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', position: 'relative', zIndex: 1 }}
                  className="px-4 py-3 text-sm font-medium shadow-lg border border-white text-white bg-[#14213d] rounded-md flex items-center justify-center relative after:content-[''] after:absolute after:-inset-2 after:rounded-md after:blur-lg after:z-[-1] after:bg-[linear-gradient(45deg,_#e0e0e0,_transparent,_#f0f0f0,_#ffffff,_transparent,_#f8f8f8,_#e8e8e8,_transparent,_#f8f8f8,_#ffffff,_transparent,_#f0f0f0,_#e0e0e0)] after:bg-[length:400%_400%] after:animate-glowing"
                >
                  Schedule a Free Consultation
                </Button>
                <Button
                  onClick={() => scrollToSection('projects')}
                  className="bg-white text-[#14213d] px-4 py-3 text-sm font-medium shadow-lg hover:bg-gray-100 hover:text-[#14213d] rounded-md flex items-center justify-center"
                >
                  See My Work
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT column with your three pill placeholders */}
          <div className="relative w-full h-[600px]">
            <div className="absolute left-0 top-1/4 w-52 h-96 bg-gray-300 rounded-[200px]"></div>
            <div className="absolute right-0 top-0 w-32 h-48 bg-gray-300 rounded-[200px]"></div>
            <div className="absolute right-0 bottom-0 w-32 h-48 bg-gray-700 rounded-[200px] flex flex-col items-center justify-center text-white">
              <div className="text-3xl font-bold">100</div>
              <div className="text-sm">Cool Number</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
