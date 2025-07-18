import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Toaster } from 'react-hot-toast';
import { Toaster as SonnerToaster } from 'sonner';

import BackgroundLayers from './components/BackgroundLayers';
import SystemFontOptimizer from './components/SystemFontOptimizer';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <SystemFontOptimizer>
          <TooltipProvider>
            <BackgroundLayers />
            <Toaster />
            <SonnerToaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SystemFontOptimizer>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
