// src/main.tsx
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({ once: true, duration: 800, easing: 'ease-in-out' });

// ✅ Ensure root exists before rendering App
const rootEl = document.getElementById('root');
if (!rootEl) {
  console.error("❌ Root element not found. Check your index.html for <div id='root'></div>");
} else {
  createRoot(rootEl).render(<App />);
}
