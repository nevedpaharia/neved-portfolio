'use client';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import TopProgressBar from './TopProgressBar';

const sections = [
  { name: 'Home', href: '#home' },
  { name: 'About Me', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

const BottomTaskbar = ({ showBar }: { showBar: boolean }) => {
  const isMobile = useIsMobile();
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
        className="grid grid-cols-5 items-center justify-center gap-2 px-6 py-2 radius-2xl border border-black bg-white/60 dark:bg-zinc-800/20 backdrop-blur-md shadow-sm"
        style={{ borderWidth: '0.03125rem' }}
      >
        {sections.map((section, idx) => (
          <a
            key={section.href}
            href={section.href}
            onClick={e => {
              e.preventDefault();
              const id = section.href.replace('#', '');
              const sectionEl = document.getElementById(id);
              if (sectionEl) {
                const heading = sectionEl.querySelector('.quentin-font');
                if (heading) {
                  const yOffset = -7 * 16; // 7rem in px
                  const y = (heading as HTMLElement).getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                } else {
                  const yOffset = -7 * 16;
                  const y = sectionEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
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
