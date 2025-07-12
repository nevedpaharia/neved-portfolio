import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import BackgroundLayers from './components/BackgroundLayers';
import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.04, // Reduced from 0.08 for smoother, less intense scrolling
      touchMultiplier: 0.75, // Reduced from 1.5 for less sensitive touch scrolling
      wheelMultiplier: 0.75, // Reduced from 0.8 for much less sensitive mouse wheel scrolling
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <HelmetProvider>
      <TooltipProvider>
        <BackgroundLayers />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  );
};

export default App;
