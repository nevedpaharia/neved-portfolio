import React, { useState, useEffect } from 'react';

interface SystemFontOptimizerProps {
  children: React.ReactNode;
}

const SystemFontOptimizer: React.FC<SystemFontOptimizerProps> = ({ children }) => {
  const [useSystemFonts, setUseSystemFonts] = useState(false);
  const [fontLoadTime, setFontLoadTime] = useState<number | null>(null);

  useEffect(() => {
    // Check if custom fonts are taking too long to load
    const startTime = performance.now();
    
    if ('fonts' in document) {
      Promise.all([
        document.fonts.load('1em Montserrat'),
        document.fonts.load('700 1em Montserrat'),
        document.fonts.load('300 1em Montserrat')
      ]).then(() => {
        const loadTime = performance.now() - startTime;
        setFontLoadTime(loadTime);
        
        // Switch to system fonts if custom fonts take too long
        if (loadTime > 1000) {
          console.warn(`⚠️ Custom fonts took ${loadTime.toFixed(0)}ms to load. Switching to system fonts for better FCP.`);
          setUseSystemFonts(true);
        }
      }).catch(() => {
        console.warn('⚠️ Custom fonts failed to load. Using system fonts.');
        setUseSystemFonts(true);
      });
    } else {
      // Fallback for browsers without Font Loading API
      setTimeout(() => {
        setUseSystemFonts(true);
      }, 500);
    }
  }, []);

  // Add system font class to body when needed
  useEffect(() => {
    if (useSystemFonts) {
      document.body.classList.add('system-fonts-enabled');
      document.documentElement.classList.add('system-fonts-enabled');
    } else {
      document.body.classList.remove('system-fonts-enabled');
      document.documentElement.classList.remove('system-fonts-enabled');
    }
  }, [useSystemFonts]);

  return (
    <div className={useSystemFonts ? 'system-fonts' : ''}>
      {children}
      {/* Removed dev font load overlay */}
    </div>
  );
};

export default SystemFontOptimizer; 