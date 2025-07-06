
// File: src/components/Projects.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const projects = [
  {
    title: "EcoWrap | Branding",
    imageUrl: "/project highlights/1.jpg",
    gifUrl: "/project highlights/1.gif",
    link: "https://www.behance.net/gallery/199356901/EcoWrap-Branding",
  },
  {
    title: "Soch | A Short Film",
    imageUrl: "/project highlights/2.jpg",
    gifUrl: "/project highlights/2.gif",
    link: "https://www.behance.net/gallery/211353215/Soch-Short-Film",
  },
  {
    title: "Team Mighty | Branding",
    imageUrl: "/project highlights/3.jpg",
    gifUrl: "/project highlights/3.gif",
    link: "https://www.behance.net/gallery/133855915/Team-Mighty-Branding",
  },
  {
    title: "Neved Paharia | Self Branding",
    imageUrl: "/project highlights/4.jpg",
    gifUrl: "/project highlights/4.gif",
    link: "https://www.behance.net/gallery/138422647/Neved-Paharia-Self-Branding",
  },
  {
    title: "SR Associates | Branding",
    imageUrl: "/project highlights/5.jpg",
    gifUrl: "/project highlights/5.gif",
    link: "https://www.behance.net/gallery/133517599/SR-Associates-Branding",
  },
];

const Projects: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState<boolean[]>([false, false, false, false, false]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // trigger staggered reveal
          projects.forEach((_, idx) => {
            setTimeout(() => {
              setVisible(v => {
                const nv = [...v];
                nv[idx] = true;
                return nv;
              });
            }, 25 + idx * 100);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-20 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-8" ref={containerRef}>
        <div className="text-center mb-16">
          <h2 className="quentin-font text-4xl md:text-5xl font-bold text-primary mb-6">
            My Project Highlights
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work in brand identity and visual storytelling
          </p>
        </div>

        <div className={isMobile ? "flex flex-col gap-6" : "grid grid-cols-6 gap-8"}>
          {projects.map((proj, idx) => {
            // grid placement for desktop
            const placement = !isMobile ? (idx === 0
              ? 'col-start-1 col-span-2'
              : idx === 1
              ? 'col-start-3 col-span-2'
              : idx === 2
              ? 'col-start-5 col-span-2'
              : idx === 3
              ? 'col-start-2 col-span-2'
              : 'col-start-4 col-span-2') : '';

            return (
              <a
                key={proj.link}
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  ${placement} cursor-default group block
                  transform transition-all duration-700 ease-out
                  ${visible[idx]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                  }
                  ${isMobile ? 'w-full' : ''}
                `}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="overflow-hidden rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg">
                  <div className={`w-full overflow-hidden ${isMobile ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                    {hoveredIndex === idx ? (
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={proj.imageUrl}
                        preload="none"
                        onError={(e) => {
                          console.log(`Video failed to load for project ${idx}, falling back to image`);
                          const img = document.createElement('img');
                          img.src = proj.imageUrl;
                          img.className = 'w-full h-full object-cover transition-transform duration-500';
                          img.alt = proj.title;
                          img.onerror = () => {
                            console.log(`Image also failed for project ${idx}`);
                            img.style.display = 'none';
                            const parent = img.parentElement;
                            if (parent) {
                              parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary text-sm font-medium">${proj.title}</div>`;
                            }
                          };
                          e.currentTarget.parentElement?.appendChild(img);
                          e.currentTarget.style.display = 'none';
                        }}
                      >
                        <source src={proj.gifUrl.replace('.gif', '.webm')} type="video/webm" />
                        <source src={proj.gifUrl} type="image/gif" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover transition-transform duration-500"
                        onError={(e) => {
                          console.log(`Image failed to load for project ${idx}: ${proj.imageUrl}`);
                          // Try webp version first
                          if (proj.imageUrl.includes('.jpg')) {
                            e.currentTarget.src = proj.imageUrl.replace('.jpg', '.webp');
                            e.currentTarget.onerror = () => {
                              console.log(`Webp also failed for project ${idx}`);
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary text-sm font-medium text-center p-4">${proj.title}</div>`;
                              }
                            };
                          } else {
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary text-sm font-medium text-center p-4">${proj.title}</div>`;
                            }
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
                <h3 className="mt-3 text-center text-base font-normal text-muted-foreground group-hover:text-primary transition-colors duration-200">
                  {proj.title}
                </h3>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
