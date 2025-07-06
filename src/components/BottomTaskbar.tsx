'use client';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const sections = [
  { name: 'Home', href: '#home' },
  { name: 'About Me', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

const BottomTaskbar = () => {
  const [showBar, setShowBar] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      const hero = document.getElementById('home')?.offsetHeight || 0;
      setShowBar(window.scrollY > hero - 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500',
        showBar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      )}
    >
      <div
        className="grid grid-cols-5 items-center justify-center gap-2 px-6 py-2 rounded-2xl border border-black bg-white/60 dark:bg-zinc-800/20 backdrop-blur-md shadow-md"
        style={{ borderWidth: '0.5px' }}
      >
        {sections.map((section, idx) => (
          <a
            key={section.href}
            href={section.href}
            onClick={e => {
              e.preventDefault();
              const id = section.href.replace('#', '');
              const el = document.getElementById(id);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-sm text-gray-800 dark:text-gray-200 font-medium hover:text-black dark:hover:text-white transition text-center"
            style={{ gridColumn: idx + 1 }}
          >
            {section.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default BottomTaskbar;
