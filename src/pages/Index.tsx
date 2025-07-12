import React from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BottomTaskbar from '@/components/BottomTaskbar';
import CustomCursor from '@/components/CustomCursor';
import BackgroundLayers from '@/components/BackgroundLayers';
import { useIsMobile } from '@/hooks/use-mobile';
import FadeInSection from '@/components/ui/FadeInSection';
import TopProgressBar from '@/components/TopProgressBar';
import { useEffect, useState } from 'react';

const Index = () => {
  const isMobile = useIsMobile();
  const [showBar, setShowBar] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      const hero = document.getElementById('home')?.offsetHeight || 0;
      setShowBar(window.scrollY > hero - 50);
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(percent);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <div id="smooth-scroll-wrapper" className="relative z-10 min-h-screen">
      {!isMobile && <TopProgressBar showBar={showBar} scrollPercent={scrollPercent} />}
      <BackgroundLayers />
      <CustomCursor />
      <Hero />
      <div>
        <About />
      </div>
      <div>
        <Projects />
      </div>
      <div>
        <Testimonials />
      </div>
      <div>
        <Contact />
      </div>
      <Footer />
      {!isMobile && <BottomTaskbar showBar={showBar} />}
    </div>
  );
};

export default Index;
