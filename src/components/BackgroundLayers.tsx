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
        alt=""
        className="w-full h-full object-cover object-center"
        style={{
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
        width={1920}
        height={1080}
      />
    </div>
  );
};

export default BackgroundLayers; 