import React from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BottomTaskbar from '@/components/BottomTaskbar';
import CustomCursor from '@/components/CustomCursor';

const Index = () => {
  return (
    <div id="smooth-scroll-wrapper" className="relative min-h-screen">
      <CustomCursor />
      <Hero />
      <About />
      <div className="relative">
        <Projects />
        <Testimonials />
      </div>
      <Contact />
      <Footer />
      <BottomTaskbar />
    </div>
  );
};

export default Index;
