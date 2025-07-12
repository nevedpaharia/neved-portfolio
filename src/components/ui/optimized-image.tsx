import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchpriority?: 'high' | 'low' | 'auto';
  sizes?: string;
  srcSet?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  style?: React.CSSProperties;
  draggable?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  fetchpriority = 'auto',
  sizes,
  srcSet,
  onError,
  onLoad,
  style,
  draggable = false,
}) => {
  // Generate AVIF and WebP versions of the image
  const getOptimizedSources = (originalSrc: string) => {
    const baseName = originalSrc.replace(/\.[^/.]+$/, '');
    const extension = originalSrc.split('.').pop()?.toLowerCase();
    
    // If it's already an optimized format, don't create additional sources
    if (extension === 'avif' || extension === 'webp') {
      return [];
    }
    
    const sources = [];
    
    // Add AVIF source if original is not AVIF
    if (extension !== 'avif') {
      sources.push({
        srcSet: `${baseName}.avif`,
        type: 'image/avif',
      });
    }
    
    // Add WebP source if original is not WebP
    if (extension !== 'webp') {
      sources.push({
        srcSet: `${baseName}.webp`,
        type: 'image/webp',
      });
    }
    
    return sources;
  };

  const optimizedSources = getOptimizedSources(src);

  // If we have optimized sources, use picture element
  if (optimizedSources.length > 0) {
    return (
      <picture>
        {optimizedSources.map((source, index) => (
          <source
            key={index}
            srcSet={source.srcSet}
            type={source.type}
            sizes={sizes}
          />
        ))}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          loading={loading}
          fetchpriority={fetchpriority}
          sizes={sizes}
          srcSet={srcSet}
          onError={onError}
          onLoad={onLoad}
          style={style}
          draggable={draggable}
        />
      </picture>
    );
  }

  // Fallback to regular img if no optimized sources
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      fetchpriority={fetchpriority}
      sizes={sizes}
      srcSet={srcSet}
      onError={onError}
      onLoad={onLoad}
      style={style}
      draggable={draggable}
    />
  );
};

export default OptimizedImage;