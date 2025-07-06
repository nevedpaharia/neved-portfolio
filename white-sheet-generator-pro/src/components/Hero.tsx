'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X } from 'lucide-react';
import HeroAnimation from './HeroAnimation';

const Hero: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const scrollToSection = (id: string): void => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <section id="home" className="relative">
      {/* Aurora + Gradient Background (untouched) */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(`
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert
            after:content-[''] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)]
            after:[background-size:200%,_100%]
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform
            [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]
          `)}
        />
        <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-10">
          <div className="h-full w-full bg-gradient-to-b from-transparent to-white" />
        </div>
      </div>

      {/* Top Nav */}
      <nav className="absolute inset-x-0 top-0 z-50 px-8 py-8">
        {isMobile ? (
          <>
            {/* Mobile Navigation */}
            <div className="flex justify-between items-center">
              {/* Logo */}
              <button onClick={() => window.location.reload()} className="focus:outline-none">
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  width={120} 
                  height={48} 
                  className="object-contain" 
                  onError={(e) => {
                    console.log('Logo failed to load');
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="text-xl font-bold text-primary">NEVED</div>';
                    }
                  }}
                />
              </button>

              {/* Hamburger Menu */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-foreground hover:opacity-80 transition"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border mt-2 py-4">
                <div className="flex flex-col space-y-4 px-8">
                  <button onClick={() => scrollToSection('about')} className="text-left text-foreground hover:text-primary transition">
                    About Me
                  </button>
                  <button onClick={() => scrollToSection('projects')} className="text-left text-foreground hover:text-primary transition">
                    Projects
                  </button>
                  <button onClick={() => scrollToSection('testimonials')} className="text-left text-foreground hover:text-primary transition">
                    Testimonials
                  </button>
                  <button onClick={() => scrollToSection('contact')} className="text-left text-foreground hover:text-primary transition">
                    Contact
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Desktop Navigation */
          <div className="flex justify-center items-center gap-8 text-foreground text-base">
            <button onClick={() => scrollToSection('about')} className="hover:opacity-80 transition">
              About Me
            </button>
            <button onClick={() => scrollToSection('projects')} className="hover:opacity-80 transition">
              Projects
            </button>

            <button onClick={() => window.location.reload()} className="focus:outline-none">
              <img 
                src="/logo.png" 
                alt="Logo" 
                width={150} 
                height={60} 
                className="object-contain" 
                onError={(e) => {
                  console.log('Logo failed to load');
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="text-2xl font-bold text-primary">NEVED</div>';
                  }
                }}
              />
            </button>

            <button onClick={() => scrollToSection('testimonials')} className="hover:opacity-80 transition">
              Testimonials
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:opacity-80 transition">
              Contact
            </button>
          </div>
        )}
      </nav>

      {/* Hero Body */}
      <div className="relative flex flex-col h-[100vh] items-center justify-center text-foreground text-center px-6 pt-72">
        {/* Hero Animation behind text, slightly overlapping */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 w-full flex justify-center z-0 pointer-events-none select-none">
          <HeroAnimation />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
            I craft purposeful
            <br />
            brand identities and
            <br />
            <span className="relative inline-block">
              effective logos
              {/* Brush underline as external SVG */}
              <img
                src="/brush-underline.svg"
                alt=""
                className="absolute bottom-0 left-0 w-full h-2 pointer-events-none brush-animate"
                onError={(e) => {
                  console.log('Brush underline SVG failed to load');
                  e.currentTarget.style.display = 'none';
                }}
              />
            </span>
          </h1>
          <p className="mt-6 text-sm md:text-base lg:text-lg font-light text-muted-foreground">
            Transform your ideas into reality to get impactful and unforgettable branding solutions
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              onClick={() => scrollToSection('projects')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md text-sm font-medium shadow-md"
            >
              View my work
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('contact')}
              className="bg-transparent border-foreground border text-foreground px-6 py-3 rounded-md text-sm font-medium transition-transform duration-200 hover:scale-105 hover:bg-transparent"
            >
              Let's work together
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
