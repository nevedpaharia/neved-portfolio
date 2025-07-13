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
  // Simple implementation that just uses regular img tags
  // We can enhance this later when we have actual AVIF/WebP files
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