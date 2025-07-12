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
    <picture>
      <source srcSet="/background/background.avif" type="image/avif" />
      <source srcSet="/background/background.webp" type="image/webp" />
      <img
        src="/background/background.jpg"
        alt="Background"
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
    </picture>
  </div>
);

export default BackgroundLayers; 