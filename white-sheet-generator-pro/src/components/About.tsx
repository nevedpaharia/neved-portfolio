'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useFadeInSection } from '@/hooks/use-fade-in-section';
import { motion } from 'framer-motion';

const About = () => {
  const skills = [
    { name: 'Adobe Photoshop', level: 90 },
    { name: 'Adobe Illustrator', level: 70 },
    { name: 'Brand Identity', level: 90 },
    { name: 'Visual Design', level: 80 }
  ];

  const fadeRef = useFadeInSection();
  const [isVisible, setIsVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);

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

  const paragraph1 = "I'm an 18-year-old self-taught designer from India who started early and never stopped creating. I craft clean, intentional visuals across logos, layouts, and brand identities, always blending precision with personality.";
  const paragraph2 = "Deeply passionate about tech and obsessed with the finer details, I see every project as a chance to push creative boundaries. Whether you're across the street or across the globe — if you value good design, we'll probably get along.";

  return (
    <section id="about" className="pt-16 pb-20 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#031636] rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#ccb533] rounded-full blur-3xl opacity-15"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#031636] rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-1/3 left-20 w-72 h-72 bg-[#ccb533] rounded-full blur-3xl opacity-12"></div>
      </div>

      <div className="max-w-6xl mx-auto px-8 relative z-10" ref={fadeRef}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative group overflow-visible">
              <div className="inline-block group overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-2">
                <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-700 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
                  <img 
                    src="/Professional Photo.jpg" 
                    alt="Professional Photo" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      console.log('Professional photo failed to load, trying webp version');
                      e.currentTarget.src = '/Professional Photo.webp';
                      e.currentTarget.onerror = () => {
                        console.log('Both photo formats failed, hiding image');
                        e.currentTarget.style.display = 'none';
                        // Show a placeholder instead
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary text-lg font-medium">Professional Photo</div>';
                        }
                      };
                    }}
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full opacity-20"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-secondary/20 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="quentin-font text-4xl md:text-5xl font-bold text-primary mb-8">
              About Me
            </h2>

            <div className="prose prose-lg text-gray-600 dark:text-gray-300 mb-8">
              {isVisible && (
                <motion.p className="mb-6">
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
                <motion.p className="mb-6">
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
                        delay: 0.015 * i + 0.3, // Add delay for second paragraph
                      }}
                      style={{ display: "inline-block" }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-primary mb-6">Skills & Expertise</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-gray-500 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-zinc-600 rounded-full h-2 relative overflow-hidden">
                      <motion.div 
                        className="h-2 bg-gradient-to-r from-[#031636] to-[#ccb533] rounded-full absolute top-0 left-0"
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
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
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
