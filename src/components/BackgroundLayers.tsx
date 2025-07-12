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
      alt="Background"
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
      }}
      draggable={false}
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        e.currentTarget.parentElement!.style.backgroundColor = '#14213d';
      }}
    />
  </div>
);

export default BackgroundLayers; 