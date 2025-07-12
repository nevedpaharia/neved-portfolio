import React, { useState, useEffect } from 'react';

const BackgroundLayers: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Preload the background image
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = '/background/background.webp';
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Background placeholder to prevent layout shift */}
      <div 
        className="background-placeholder"
        style={{
          opacity: imageLoaded ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
      
      {/* Single Background Image */}
      <img
        src="/background/background.webp"
        alt="Neved Paharia Portfolio Website Background Texture"
        width={1920}
        height={1080}
        loading="eager"
        fetchpriority="high"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
        draggable={false}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

export default BackgroundLayers; 