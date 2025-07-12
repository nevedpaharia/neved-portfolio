import React from 'react';

const BackgroundLayers: React.FC = () => (
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
    {/* Single Background Image */}
    <img
      src="/background/background.webp"
      alt="Neved Paharia Portfolio Website Background Texture"
      loading="lazy"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        zIndex: 1,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
      draggable={false}
    />
  </div>
);

export default BackgroundLayers; 