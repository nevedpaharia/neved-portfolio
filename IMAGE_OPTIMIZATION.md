# Image Optimization Implementation

This document outlines the image optimization changes made to the Neved Paharia portfolio website.

## Overview

All major branding images (hero, projects, testimonials, and about section) have been converted to use the `<picture>` element with progressive enhancement:

1. **AVIF** (highest priority) - Best compression, modern browsers
2. **WebP** (fallback) - Good compression, wider browser support  
3. **JPEG/PNG** (final fallback) - Universal support

## Changes Made

### 1. Hero Component (`src/components/Hero.tsx`)
- **Logo images**: Converted to `<picture>` elements with WebP → PNG fallbacks
- **Brush underline**: Kept as regular `<img>` since it's an SVG
- **Dimensions**: Added explicit `width` and `height` attributes

### 2. Projects Component (`src/components/Projects.tsx`)
- **Project thumbnails**: Converted to `<picture>` elements with AVIF → WebP → JPEG fallbacks
- **Dimensions**: Added explicit dimensions based on hover states
- **Loading**: Maintained `loading="lazy"` for non-hero images

### 3. Testimonials Component (`src/components/Testimonials.tsx`)
- **Testimonial photos**: Converted to `<picture>` elements with AVIF → WebP → JPEG fallbacks
- **Dimensions**: Added responsive dimensions (mobile: 160x210, desktop: 300x400)
- **Loading**: Maintained `loading="lazy"` for non-hero images
- **Background**: Updated background image to use `<picture>` element

### 4. About Component (`src/components/About.tsx`)
- **Professional photo**: Converted to `<picture>` element with AVIF → WebP → JPEG fallbacks
- **Dimensions**: Added explicit dimensions (400x500)
- **Loading**: Maintained `loading="lazy"` for non-hero images
- **Background**: Updated background image to use `<picture>` element

## Image Conversion Script

A conversion script has been created at `scripts/convert-images.js` to help generate AVIF versions of existing images.

### Usage:
```bash
# Install ImageMagick first
sudo apt-get install imagemagick  # Ubuntu/Debian
brew install imagemagick          # macOS

# Run the conversion script
node scripts/convert-images.js
```

### Images to Convert:
- Logo: `public/logo.png`
- Professional photo: `public/Professional Photo.webp`
- Project highlights: `public/project highlights/*.webp`
- Testimonials: `public/testimonials/*.jpg`
- Background images: `public/background/*.webp`

## Performance Benefits

1. **Smaller file sizes**: AVIF typically provides 30-50% better compression than WebP
2. **Faster loading**: Reduced bandwidth usage and faster page loads
3. **Better Core Web Vitals**: Improved LCP (Largest Contentful Paint) scores
4. **Progressive enhancement**: Graceful degradation for older browsers

## Browser Support

- **AVIF**: Chrome 85+, Firefox 93+, Safari 16.1+
- **WebP**: Chrome 23+, Firefox 65+, Safari 14+
- **JPEG/PNG**: Universal support

## Implementation Notes

1. **Error handling**: Maintained existing error handling for image loading failures
2. **Accessibility**: Preserved all `alt` attributes and accessibility features
3. **Responsive design**: Dimensions are responsive and maintain aspect ratios
4. **Lazy loading**: Non-hero images continue to use `loading="lazy"`

## Next Steps

1. **Generate AVIF files**: Run the conversion script when ImageMagick is available
2. **Test thoroughly**: Verify images load correctly across different browsers
3. **Monitor performance**: Use tools like Lighthouse to measure improvements
4. **Consider CDN**: For production, consider using a CDN with automatic format selection

## File Structure

```
public/
├── logo.png → logo.avif (to be created)
├── Professional Photo.webp → Professional Photo.avif (to be created)
├── project highlights/
│   ├── 1.webp → 1.avif (to be created)
│   ├── 2.webp → 2.avif (to be created)
│   └── ...
├── testimonials/
│   ├── Shashank Saboo.jpg → Shashank Saboo.avif (to be created)
│   └── ...
└── background/
    ├── paper 2.webp → paper 2.avif (to be created)
    └── ...
```

## Testing

To test the implementation:

1. **Modern browsers**: Should load AVIF images
2. **Older browsers**: Should fall back to WebP or JPEG/PNG
3. **Network throttling**: Test with slow connections to see performance benefits
4. **Lighthouse**: Run performance audits to measure improvements

## Maintenance

- Keep the conversion script updated when new images are added
- Monitor browser support for AVIF and adjust priorities if needed
- Consider automated image optimization in the build process