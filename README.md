# Neved Paharia Portfolio

Award-winning brand identity designer's portfolio website built with React, TypeScript, and modern web technologies.

## 🚀 Performance Optimizations

This portfolio has been optimized for optimal Core Web Vitals performance, focusing on both LCP and FCP improvements:

### FCP (First Contentful Paint) Optimizations

#### 1. **Render-Blocking Resource Reduction**
- Moved non-critical CSS to load asynchronously
- Optimized Google Fonts loading with `onload` callback
- Made performance monitoring scripts load with `async`
- Implemented system font fallbacks for faster initial rendering

#### 2. **CSS Loading Strategy**
- Critical CSS inlined in HTML head
- Non-critical CSS (AOS animations) loaded after initial render
- CSS loading performance monitoring and optimization
- Font loading optimization with `font-display: swap`

#### 3. **System Font Optimization**
- Automatic fallback to system fonts when custom fonts load slowly
- System font stack for immediate text rendering
- Performance-based font switching (custom vs system fonts)
- Font loading time monitoring and optimization

#### 4. **JavaScript Loading Optimization**
- Main bundle loaded with `defer`
- Performance scripts loaded with `async`
- AOS library loaded dynamically after initial render
- Non-critical dependencies loaded asynchronously

### LCP (Largest Contentful Paint) Optimizations

### Implemented Optimizations

#### 1. **Critical Asset Preloading**
- Preloaded background image (`background.webp`) with `fetchpriority="high"`
- Preloaded logo image (`logo.png`) for immediate visibility
- Preloaded critical font (`Quentin.woff2`) to prevent layout shifts

#### 2. **Image Loading Strategy**
- Background image: `loading="eager"` with `fetchPriority="high"`
- Logo images: Optimized loading with proper dimensions
- Brush underline: Preloaded for smooth animations

#### 3. **Critical CSS Inline**
- Above-the-fold styles embedded in HTML head
- Hero section layout styles to prevent layout shifts
- Background placeholder to maintain visual consistency

#### 4. **Font Loading Optimization**
- `font-display: swap` for better perceived performance
- Font preloading with fallback handling
- FOUC (Flash of Unstyled Content) prevention

#### 5. **Performance Monitoring**
- Real-time LCP, FID, and CLS monitoring
- Resource loading time tracking
- Performance recommendations and alerts

### Performance Targets

- **FCP**: < 1.8 seconds (Good)
- **LCP**: < 2.5 seconds (Good)
- **FID**: < 100 milliseconds (Good)
- **CLS**: < 0.1 (Good)

### Key Assets

| Asset | Size | Format | Loading Strategy |
|-------|------|--------|------------------|
| Background | 507KB | WebP | Eager + Preload |
| Logo | 48KB | PNG | Eager + Preload |
| Quentin Font | 155KB | WOFF2 | Preload + Swap |

### Monitoring

The site includes comprehensive performance monitoring scripts that:
- Track FCP, LCP, FID, and CLS in real-time
- Monitor CSS and font loading performance
- Provide optimization recommendations
- Alert on performance issues
- Compare performance metrics
- Test system font vs custom font performance

### Future Optimizations

1. **Responsive Images**: Implement multiple sizes for different screen densities
2. **AVIF Format**: Use modern image format with WebP fallback
3. **Progressive Loading**: Implement LQIP (Low Quality Image Placeholders)
4. **Image Compression**: Further optimize background image size
5. **CDN Integration**: Use content delivery network for global performance

## 🛠️ Technical Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Performance**: Custom LCP optimization scripts

## 📊 Performance Monitoring

The site includes built-in performance monitoring:

```javascript
// Access performance data
window.performanceMonitor.monitorLCP();
window.performanceMonitor.monitorFID();
window.performanceMonitor.monitorCLS();

// Get optimization recommendations
window.imageOptimizer.generateOptimizationSuggestions();
```

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## 📈 Performance Metrics

Monitor your site's performance using:
- Chrome DevTools Performance tab
- Lighthouse audits
- Web Vitals extension
- Built-in performance monitoring scripts

## 🔧 Customization

The performance optimizations can be customized in:
- `index.html` - Preload directives and critical CSS
- `src/components/BackgroundLayers.tsx` - Background image loading
- `src/components/Hero.tsx` - Hero section optimizations
- `scripts/` - Performance monitoring and optimization scripts
