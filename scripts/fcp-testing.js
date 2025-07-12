// FCP (First Contentful Paint) Testing Script
// This script measures and reports on FCP performance improvements

class FCPTester {
  constructor() {
    this.metrics = {
      fcp: null,
      lcp: null,
      fid: null,
      cls: null,
      fontLoadTime: null,
      cssLoadTime: null,
      systemFontsUsed: false
    };
    this.init();
  }

  init() {
    this.measureFCP();
    this.measureLCP();
    this.measureFID();
    this.measureCLS();
    this.measureFontPerformance();
    this.measureCSSPerformance();
    
    // Report results after page load
    window.addEventListener('load', () => {
      setTimeout(() => this.reportResults(), 1000);
    });
  }

  measureFCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
          this.metrics.fcp = entry.startTime;
          console.log(`🎯 FCP: ${entry.startTime.toFixed(0)}ms`);
        }
      });
    });

    observer.observe({ entryTypes: ['paint'] });
  }

  measureLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
      console.log(`🎯 LCP: ${lastEntry.startTime.toFixed(0)}ms`);
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  measureFID() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        this.metrics.fid = entry.processingStart - entry.startTime;
        console.log(`🎯 FID: ${this.metrics.fid.toFixed(0)}ms`);
      });
    });

    observer.observe({ entryTypes: ['first-input'] });
  }

  measureCLS() {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      this.metrics.cls = clsValue;
    });

    observer.observe({ entryTypes: ['layout-shift'] });
  }

  measureFontPerformance() {
    const startTime = performance.now();
    
    if ('fonts' in document) {
      Promise.all([
        document.fonts.load('1em Montserrat'),
        document.fonts.load('700 1em Montserrat'),
        document.fonts.load('300 1em Montserrat')
      ]).then(() => {
        this.metrics.fontLoadTime = performance.now() - startTime;
        console.log(`📊 Font Load Time: ${this.metrics.fontLoadTime.toFixed(0)}ms`);
      }).catch(() => {
        this.metrics.fontLoadTime = performance.now() - startTime;
        this.metrics.systemFontsUsed = true;
        console.log(`📊 Font Load Failed, using system fonts: ${this.metrics.fontLoadTime.toFixed(0)}ms`);
      });
    }
  }

  measureCSSPerformance() {
    const resources = performance.getEntriesByType('resource');
    const cssResources = resources.filter(r => r.name.includes('.css'));
    
    this.metrics.cssLoadTime = cssResources.reduce((sum, r) => sum + r.duration, 0);
    console.log(`📊 CSS Load Time: ${this.metrics.cssLoadTime.toFixed(0)}ms`);
  }

  reportResults() {
    console.log('📊 FCP Performance Report:');
    console.log('========================');
    console.log(`FCP: ${this.metrics.fcp?.toFixed(0) || 'N/A'}ms`);
    console.log(`LCP: ${this.metrics.lcp?.toFixed(0) || 'N/A'}ms`);
    console.log(`FID: ${this.metrics.fid?.toFixed(0) || 'N/A'}ms`);
    console.log(`CLS: ${this.metrics.cls?.toFixed(3) || 'N/A'}`);
    console.log(`Font Load: ${this.metrics.fontLoadTime?.toFixed(0) || 'N/A'}ms`);
    console.log(`CSS Load: ${this.metrics.cssLoadTime?.toFixed(0) || 'N/A'}ms`);
    console.log(`System Fonts: ${this.metrics.systemFontsUsed ? 'Yes' : 'No'}`);
    
    // Performance recommendations
    this.provideRecommendations();
  }

  provideRecommendations() {
    console.log('\n💡 Performance Recommendations:');
    
    if (this.metrics.fcp > 1800) {
      console.log('⚠️ FCP is slow (>1.8s). Consider:');
      console.log('  - Reducing render-blocking resources');
      console.log('  - Using system fonts for faster rendering');
      console.log('  - Optimizing critical CSS');
    }
    
    if (this.metrics.fontLoadTime > 1000) {
      console.log('⚠️ Font loading is slow. Consider:');
      console.log('  - Using font-display: swap');
      console.log('  - Implementing system font fallbacks');
      console.log('  - Preloading critical fonts only');
    }
    
    if (this.metrics.cssLoadTime > 500) {
      console.log('⚠️ CSS loading is slow. Consider:');
      console.log('  - Inlining critical CSS');
      console.log('  - Loading non-critical CSS asynchronously');
      console.log('  - Minimizing CSS bundle size');
    }
    
    if (this.metrics.fcp <= 1000) {
      console.log('✅ FCP is excellent!');
    } else if (this.metrics.fcp <= 1800) {
      console.log('✅ FCP is good!');
    }
  }

  // Method to compare with previous results
  compareResults(previousMetrics) {
    console.log('\n📈 Performance Comparison:');
    console.log('========================');
    
    Object.keys(this.metrics).forEach(key => {
      if (this.metrics[key] && previousMetrics[key]) {
        const improvement = ((previousMetrics[key] - this.metrics[key]) / previousMetrics[key] * 100);
        console.log(`${key}: ${previousMetrics[key].toFixed(0)}ms → ${this.metrics[key].toFixed(0)}ms (${improvement > 0 ? '+' : ''}${improvement.toFixed(1)}%)`);
      }
    });
  }
}

// Initialize FCP tester
const fcpTester = new FCPTester();

// Export for use in other scripts
window.fcpTester = fcpTester;

// Store results for comparison
window.fcpResults = fcpTester.metrics; 