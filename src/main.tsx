import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log('🚀 main.tsx starting...');

// Load critical CSS immediately
import './index.css';
console.log('📦 CSS loaded');

// Load non-critical CSS asynchronously
const loadNonCriticalCSS = () => {
  import('./App.css');
  import('aos/dist/aos.css');
};

// Initialize AOS after CSS is loaded
const initAOS = async () => {
  const AOS = (await import('aos')).default;
  AOS.init({ once: true, duration: 800, easing: 'ease-in-out' });
};

// Load non-critical resources after initial render
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      loadNonCriticalCSS();
      initAOS();
    }, 100);
  });
} else {
  setTimeout(() => {
    loadNonCriticalCSS();
    initAOS();
  }, 100);
}

console.log('🔍 Looking for root element...');

// ✅ Ensure root exists before rendering App
const rootEl = document.getElementById('root');
if (!rootEl) {
  console.error("❌ Root element not found. Check your index.html for <div id='root'></div>");
  document.body.innerHTML = '<div style="color: red; font-size: 24px; padding: 20px;">❌ ROOT ELEMENT NOT FOUND</div>';
} else {
  console.log('✅ Root element found, creating React root...');
  try {
    const root = createRoot(rootEl);
    console.log('✅ React root created, rendering App...');
    root.render(<App />);
    console.log('✅ App rendered successfully!');
  } catch (error) {
    console.error('❌ Error rendering App:', error);
    document.body.innerHTML = '<div style="color: red; font-size: 24px; padding: 20px;">❌ REACT RENDERING ERROR: ' + error.message + '</div>';
  }
}
