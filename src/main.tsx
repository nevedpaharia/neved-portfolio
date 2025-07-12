// src/main.tsx
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Load critical CSS immediately
import './index.css';

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

// ✅ Ensure root exists before rendering App
const rootEl = document.getElementById('root');
if (!rootEl) {
  console.error("❌ Root element not found. Check your index.html for <div id='root'></div>");
} else {
  createRoot(rootEl).render(<App />);
}
