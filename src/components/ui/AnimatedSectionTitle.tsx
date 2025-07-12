import React, { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

interface AnimatedSectionTitleProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
}

const AnimatedSectionTitle: React.FC<AnimatedSectionTitleProps> = ({
  children,
  className = '',
  delay = 0,
  color = '#fff',
  fontFamily = 'Quentin, serif',
  fontSize = '2.5rem',
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0% 0% 0%)',
        transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
      });
    }
  }, [inView, controls, delay]);

  return (
    <motion.h2
      ref={ref}
      initial={{
        opacity: 0,
        y: 40,
        clipPath: 'inset(100% 0% 0% 0%)',
      }}
      animate={controls}
      className={`font-bold tracking-tight ${className}`}
      style={{
        color,
        fontFamily,
        fontSize,
        textShadow: '0 2px 16px rgba(0,0,0,0.25)',
        overflow: 'hidden',
        lineHeight: 1.1,
      }}
    >
      {children}
    </motion.h2>
  );
};

export default AnimatedSectionTitle; 