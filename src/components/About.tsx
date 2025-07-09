'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useFadeInSection } from '@/hooks/use-fade-in-section';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

const About = () => {
  const skills = [
    { name: 'Adobe Photoshop', level: 90 },
    { name: 'Adobe Illustrator', level: 70 },
    { name: 'Brand Identity', level: 90 },
    { name: 'Visual Design', level: 80 }
  ];

  const fadeRef = useFadeInSection();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Check if the section is visible after AOS animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a small delay to ensure AOS animation completes
          setTimeout(() => {
            setIsVisible(true);
          }, 50);
          // Start skills animation after a short delay
          setTimeout(() => {
            setSkillsVisible(true);
          }, 100);
        }
      },
      { threshold: 0.3 }
    );

    if (fadeRef.current) {
      observer.observe(fadeRef.current);
    }

    return () => {
      if (fadeRef.current) {
        observer.unobserve(fadeRef.current);
      }
    };
  }, [fadeRef]);

  const handleImageError = () => {
    console.log('Professional photo failed to load, trying fallback');
    setImageError(true);
  };

  const paragraph1 = "I'm an 18-year-old self-taught designer from India who started early and never stopped creating. I craft clean, intentional visuals across logos, layouts, and brand identities, always blending precision with personality.";
  const paragraph2 = "Deeply passionate about tech and obsessed with the finer details, I see every project as a chance to push creative boundaries. Whether you're across the street or across the globe — if you value good design, we'll probably get along.";

  const ProfileImage = ({ className }: { className: string }) => (
    <div className={className}>
      <img 
        src="/Professional Photo.webp" 
        alt="Professional Photo" 
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );

  return (
    <section id="about" className="relative overflow-hidden py-56 md:py-[320px]">
      <img
        src="/background/paper 2.png"
        alt="Torn Paper Background"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
        draggable={false}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10" ref={fadeRef}>
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          {!isMobile && (
            <div className="order-2 lg:order-1">
              <div className="relative group overflow-visible">
                <div className="inline-block group overflow-hidden rounded-lg md:rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-2">
                  <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-700 rounded-lg md:rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
                    <ProfileImage className="w-full h-full" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-12 h-12 md:w-16 md:h-16 bg-primary/20 rounded-full opacity-20"></div>
                  <div className="absolute -top-2 -left-2 md:-top-4 md:-left-4 w-8 h-8 md:w-12 md:h-12 bg-secondary/20 rounded-full opacity-20"></div>
                </div>
              </div>
            </div>
          )}

            <div className={`${isMobile ? 'order-1' : 'order-1 lg:order-2'} relative`}>
            {isMobile && (
              <div className="float-right ml-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg">
                  <ProfileImage className="w-full h-full" />
                </div>
              </div>
            )}

            <h2 className="quentin-font text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-3 md:mb-6">
              About Me
            </h2>

            <div className="prose prose-base md:prose-lg text-gray-600 dark:text-gray-300 mb-4 md:mb-6">
              {isVisible && (
                <motion.p className="mb-3 md:mb-4 text-sm md:text-base">
                  {paragraph1.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{
                        filter: "blur(10px)",
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.15,
                        ease: "easeInOut",
                        delay: 0.015 * i,
                      }}
                      style={{ display: "inline-block" }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              )}
              {isVisible && (
                <motion.p className="mb-3 md:mb-4 text-sm md:text-base">
                  {paragraph2.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{
                        filter: "blur(10px)",
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.15,
                        ease: "easeInOut",
                        delay: 0.015 * i + 0.3,
                      }}
                      style={{ display: "inline-block" }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              )}
            </div>

            <div className="mb-4 md:mb-6 clear-both">
              <h3 className="text-base md:text-xl font-semibold text-primary mb-3 md:mb-4">Skills & Expertise</h3>
              <div className="space-y-2 md:space-y-3">
                {skills.map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium text-xs md:text-sm">{skill.name}</span>
                      <span className="text-gray-500 text-xs">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-zinc-600 rounded-full h-1 md:h-1.5 relative overflow-hidden">
                      <motion.div 
                        className="h-1 md:h-1.5 bg-gradient-to-r from-[#031636] to-[#ccb533] rounded-full absolute top-0 left-0"
                        initial={{ width: "0%" }}
                        animate={{ width: skillsVisible ? `${skill.level}%` : "0%" }}
                        transition={{
                          duration: 1.0,
                          ease: "easeInOut",
                          delay: 0.1 * index,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="/Neved Paharia CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 md:px-6 md:py-2 text-xs md:text-sm rounded-full transition-all duration-300 hover:scale-105">
                Download CV
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
