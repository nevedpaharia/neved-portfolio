// LCP (Largest Contentful Paint) Optimization Script
// This script monitors and reports on Core Web Vitals performance

// Monitor LCP
function monitorLCP() {
  let lcpValue = 0;
  let lcpEntry = null;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    
    // Update LCP value and entry
    lcpValue = lastEntry.startTime;
    lcpEntry = lastEntry;
    
    // Log LCP information
    console.log('LCP:', lcpValue, 'ms');
    console.log('LCP Element:', lcpEntry.element);
    console.log('LCP URL:', lcpEntry.url);
    
    // Report to analytics if needed
    if (typeof gtag !== 'undefined') {
      gtag('event', 'LCP', {
        value: Math.round(lcpValue),
        event_category: 'Web Vitals',
        event_label: lcpEntry.url || 'background-image'
      });
    }
  });

  observer.observe({ entryTypes: ['largest-contentful-paint'] });
  
  // Report final LCP after 5 seconds
  setTimeout(() => {
    observer.disconnect();
    console.log('Final LCP:', lcpValue, 'ms');
    
    // Provide optimization suggestions
    if (lcpValue > 2500) {
      console.warn('⚠️ LCP is above recommended threshold (2.5s). Consider:');
      console.warn('  - Optimizing background image size');
      console.warn('  - Using WebP format with fallbacks');
      console.warn('  - Implementing image lazy loading for non-critical images');
    } else if (lcpValue > 4000) {
      console.error('❌ LCP is poor (>4s). Immediate optimization needed!');
    } else {
      console.log('✅ LCP is good!');
    }
  }, 5000);
}

// Monitor FID (First Input Delay)
function monitorFID() {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      console.log('FID:', entry.processingStart - entry.startTime, 'ms');
      
      if (typeof gtag !== 'undefined') {
        gtag('event', 'FID', {
          value: Math.round(entry.processingStart - entry.startTime),
          event_category: 'Web Vitals'
        });
      }
    });
  });

  observer.observe({ entryTypes: ['first-input'] });
}

// Monitor CLS (Cumulative Layout Shift)
function monitorCLS() {
  let clsValue = 0;
  let clsEntries = [];

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        clsEntries.push(entry);
      }
    });
    
    console.log('CLS:', clsValue);
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'CLS', {
        value: Math.round(clsValue * 1000) / 1000,
        event_category: 'Web Vitals'
      });
    }
  });

  observer.observe({ entryTypes: ['layout-shift'] });
}

// Monitor resource loading times
function monitorResourceTiming() {
  const resources = performance.getEntriesByType('resource');
  const criticalResources = resources.filter(resource => 
    resource.name.includes('background.webp') || 
    resource.name.includes('logo.png') ||
    resource.name.includes('Quentin.woff2')
  );
  
  criticalResources.forEach(resource => {
    console.log(`Resource: ${resource.name}`);
    console.log(`  Duration: ${resource.duration}ms`);
    console.log(`  Transfer Size: ${resource.transferSize} bytes`);
    
    if (resource.duration > 1000) {
      console.warn(`⚠️ Slow resource: ${resource.name} (${resource.duration}ms)`);
    }
  });
}

// Initialize monitoring when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    monitorLCP();
    monitorFID();
    monitorCLS();
    
    // Monitor resources after page load
    window.addEventListener('load', () => {
      setTimeout(monitorResourceTiming, 1000);
    });
  });
} else {
  monitorLCP();
  monitorFID();
  monitorCLS();
  
  window.addEventListener('load', () => {
    setTimeout(monitorResourceTiming, 1000);
  });
}

// Export for use in other scripts
window.performanceMonitor = {
  monitorLCP,
  monitorFID,
  monitorCLS,
  monitorResourceTiming
}; 