// CSS Loading Optimization Script
// This script helps reduce render-blocking resources and improve FCP

class CSSOptimizer {
  constructor() {
    this.criticalCSSLoaded = false;
    this.nonCriticalCSSLoaded = false;
    this.init();
  }

  init() {
    // Monitor CSS loading performance
    this.monitorCSSLoading();
    
    // Optimize font loading
    this.optimizeFontLoading();
    
    // Load non-critical CSS asynchronously
    this.loadNonCriticalCSS();
  }

  monitorCSSLoading() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'resource' && entry.name.includes('.css')) {
          console.log(`📊 CSS Load: ${entry.name} - ${entry.duration.toFixed(0)}ms`);
          
          if (entry.duration > 500) {
            console.warn(`⚠️ Slow CSS load: ${entry.name} (${entry.duration.toFixed(0)}ms)`);
          }
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  optimizeFontLoading() {
    // Preload critical fonts
    const criticalFonts = [
      { family: 'Montserrat', weight: '400' },
      { family: 'Montserrat', weight: '700' },
      { family: 'Montserrat', weight: '300' }
    ];

    if ('fonts' in document) {
      criticalFonts.forEach(font => {
        document.fonts.load(`${font.weight} 1em ${font.family}`).catch(() => {
          console.warn(`⚠️ Failed to load font: ${font.weight} ${font.family}`);
        });
      });
    }

    // Monitor font loading performance
    const fontObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          const fontLoadTime = performance.now() - performance.timing.navigationStart;
          console.log(`📊 Font impact on LCP: ${fontLoadTime.toFixed(0)}ms`);
        }
      });
    });

    fontObserver.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  loadNonCriticalCSS() {
    // Load non-critical CSS after initial render
    const loadNonCritical = () => {
      // Load AOS CSS asynchronously
      const aosLink = document.createElement('link');
      aosLink.rel = 'stylesheet';
      aosLink.href = '/node_modules/aos/dist/aos.css';
      aosLink.media = 'print';
      aosLink.onload = () => {
        aosLink.media = 'all';
        this.nonCriticalCSSLoaded = true;
        console.log('✅ Non-critical CSS loaded');
      };
      document.head.appendChild(aosLink);
    };

    // Load after initial render
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(loadNonCritical, 100);
      });
    } else {
      setTimeout(loadNonCritical, 100);
    }
  }

  // Method to check if system fonts should be used
  shouldUseSystemFonts() {
    const fontLoadTime = performance.now() - performance.timing.navigationStart;
    return fontLoadTime > 1000; // Use system fonts if font loading takes > 1s
  }

  // Method to get CSS performance metrics
  getCSSMetrics() {
    const resources = performance.getEntriesByType('resource');
    const cssResources = resources.filter(r => r.name.includes('.css'));
    
    return {
      totalCSSFiles: cssResources.length,
      totalLoadTime: cssResources.reduce((sum, r) => sum + r.duration, 0),
      averageLoadTime: cssResources.length > 0 ? cssResources.reduce((sum, r) => sum + r.duration, 0) / cssResources.length : 0,
      slowestCSS: cssResources.reduce((slowest, r) => r.duration > slowest.duration ? r : slowest, { duration: 0 })
    };
  }
}

// Initialize CSS optimizer
const cssOptimizer = new CSSOptimizer();

// Export for use in other scripts
window.cssOptimizer = cssOptimizer;

// Performance monitoring
if (process.env.NODE_ENV === 'development') {
  setTimeout(() => {
    const metrics = cssOptimizer.getCSSMetrics();
    console.log('📊 CSS Performance Metrics:', metrics);
    
    if (metrics.averageLoadTime > 200) {
      console.warn('⚠️ CSS loading is slow. Consider optimizing.');
    }
  }, 2000);
} 