import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import OptimizedImage from '@/components/ui/optimized-image';
import { useScaleUpSection, scaleUpVariants, scaleUpContainerVariants, layeredTextVariants, layeredContainerVariants } from '@/hooks/use-scale-up-section';

const ProjectCard = ({ title, description, link, thumbnail, video }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const hoverTimeout = useRef(null);
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Add scroll-based floating animation (only if motion is not reduced)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const floatingY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isHovered && !prefersReducedMotion) {
      // Set a timeout to load video after hover (only if motion is not reduced)
      hoverTimeout.current = setTimeout(() => {
        setShouldLoadVideo(true);
        setShowVideo(true);
      }, 300);
    } else {
      clearTimeout(hoverTimeout.current);
      setShowVideo(false);
      setIsVideoReady(false);
      // Don't immediately unload video to prevent flickering
      const unloadTimeout = setTimeout(() => {
        if (!isHovered) {
          setShouldLoadVideo(false);
        }
      }, 1000);
      return () => clearTimeout(unloadTimeout);
    }
    return () => clearTimeout(hoverTimeout.current);
  }, [isHovered, prefersReducedMotion]);

  const handleVideoLoad = () => {
    setIsVideoReady(true);
  };

  const handleVideoError = () => {
    console.warn(`Video failed to load: ${video}`);
    setIsVideoReady(false);
    setShowVideo(false);
  };

  // Cleanup video element when component unmounts
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
        videoRef.current.load();
      }
    };
  }, []);

  // dimensions
  const imgInitialHeight = Math.round(320 * 0.8); // 256
  const imgInitialWidth = Math.round(imgInitialHeight * 1.28); // ≈ 328
  const imgHoverWidth = Math.round(imgInitialHeight * 1.625); // ≈ 416
  const imgHoverHeight = imgInitialHeight;

  const scaleUpRef = useScaleUpSection();

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group block mx-auto w-full max-w-[62.5rem] transition-all ease-in-out duration-500"
    >
      <div
        ref={(node) => {
          cardRef.current = node;
          scaleUpRef.current = node;
        }}
        className={`flex items-start gap-6 bg-white/10 border border-white/20 radius-2xl overflow-hidden pl-6 pr-8 py-6 transition-[filter,backdrop-filter,transform] duration-300 ease-in-out ${isInView ? 'backdrop-blur-0' : 'backdrop-blur-lg'}`}
      >
        <motion.div
          className={`radius-xl overflow-hidden flex-shrink-0 transition-shadow duration-300 relative ${isHovered ? 'shadow-xl' : ''}`}
          style={{
            width: isHovered ? imgHoverWidth : imgInitialWidth,
            height: imgHoverHeight,
            minWidth: imgInitialWidth,
            minHeight: imgInitialHeight,
            transition: prefersReducedMotion ? 'none' : 'width 0.6s ease-in-out, height 0.6s ease-in-out, filter 0.3s, backdrop-filter 0.3s, transform 0.3s'
          }}
          animate={{ scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Thumbnail Image */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: showVideo ? 0 : 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <OptimizedImage
              src={thumbnail}
              alt={title}
              width={imgInitialWidth}
              height={imgInitialHeight}
              className="w-full h-full object-cover bg-black"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.style.backgroundColor = '#000';
              }}
            />
          </motion.div>

          {/* Video with lazy loading and proper cleanup */}
          {shouldLoadVideo && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVideoReady ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <video
                ref={videoRef}
                src={video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                width={imgHoverWidth}
                height={imgHoverHeight}
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
                className="w-full h-full object-cover bg-black"
              />
            </motion.div>
          )}
        </motion.div>
        <div className="flex-1 text-white transition-transform ease-in-out duration-500 group-hover:translate-x-4">
          <h3 className="text-2xl md:text-3xl font-bold font-montserrat">
            {title}
          </h3>
          <p className="mt-2 text-base opacity-70 font-montserrat">
            {description}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm font-bold font-montserrat">
            <span>View case</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default function Projects() {
  // Use the enhanced scale-up variants
  const containerVariants = scaleUpContainerVariants;
  const itemVariants = scaleUpVariants;

  // Intersection Observer for fade-up
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  useEffect(() => {
    const fadeUp = (ref) => {
      if (!ref.current) return;
      const node = ref.current;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            node.classList.add('animate-fade-up');
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(node);
      return () => observer.disconnect();
    };
    fadeUp(headlineRef);
    fadeUp(subtitleRef);
  }, []);

  return (
    <section id="projects" className="w-full flex flex-col justify-center items-center py-[20rem] min-h-screen">
      <h2 
        ref={headlineRef}
        className="quentin-font text-4xl md:text-6xl font-bold text-white text-center mb-5 opacity-100" 
        data-aos="fade-up" 
        data-aos-delay="0"
      >
        I Procrastinate Making Case Studies
      </h2>
      <p 
        ref={subtitleRef}
        className="text-base md:text-xl text-white/80 max-w-2xl text-center font-light mb-16 opacity-100" 
        data-aos="fade-up" 
        data-aos-delay="100"
      >
        ~but when i get to it, I try making 'em right~
      </p>
      <motion.div 
        className="flex flex-col gap-10 w-full"
        variants={layeredContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div data-aos="fade-up" data-aos-delay="200" variants={layeredTextVariants}>
          <ProjectCard
            title="EcoWrap | The Freshness Guardian"
            description="EcoWrap isn't just another food wrap—it's your kitchen's eco‑guardian. Made from 100% biodegradable fibers, it locks in flavor, cuts down waste, and even gives you spoilage alerts via smart indicators. Fresh food, guilt‑free planet. With EcoWrap, sustainability and smart living go hand in hand. It's the smarter, greener way to keep your meals at their best."
            link="https://www.behance.net/gallery/199356901/EcoWrap-Branding"
            thumbnail="/project highlights/1.webp"
            video="/project highlights/1.webm"
          />
        </motion.div>
        <motion.div data-aos="fade-up" data-aos-delay="300" variants={layeredTextVariants}>
          <ProjectCard
            title="Soch | Voices Unheard"
            description="Soch dives deep into teenage turmoil. Neha, a fearless tomboy, and Nitin, wrestling depression, forge an unlikely bond. Written, directed, and edited by me—this school prize‑winning short film flips the script on friendship, resilience, and breaking free. Every frame is a testament to the power of honest storytelling. The film's raw emotion and nuanced characters invite viewers to reflect on their own journeys."
            link="https://www.behance.net/gallery/211353215/Soch-Short-Film"
            thumbnail="/project highlights/2.webp"
            video="/project highlights/2.webm"
          />
        </motion.div>
        <motion.div data-aos="fade-up" data-aos-delay="400" variants={layeredTextVariants}>
          <ProjectCard
            title="Team Mighty | Brand of Champions"
            description="Born in March 2021, Team Mighty stormed India's mobile‑gaming scene. I spearheaded their visual identity—an emblem of strength, unity, and dominance across CODM, BGMI, and Free Fire. Though the clan's journey ended, its legacy roars on. Their story is proof that great design can inspire greatness."
            link="https://www.behance.net/gallery/133855915/Team-Mighty-Branding"
            thumbnail="/project highlights/3.webp"
            video="/project highlights/3.webm"
          />
        </motion.div>
      </motion.div>
      <div className="mt-16 flex justify-center">
        <div className="relative group w-fit h-fit transition-transform duration-300 hover:scale-110">
          {/* gray glow ring - same as Let's work together button */}
          <div
            className="absolute inset-0 rounded-md filter blur-lg animate-glowing"
            style={{
              background:
                'linear-gradient(45deg, #e0e0e0, transparent, #f0f0f0, #ffffff, transparent, #f8f8f8, #e8e8e8, transparent, #f8f8f8, #ffffff, transparent, #f0f0f0, #e0e0e0)',
              backgroundSize: '400% 400%',
              zIndex: 0,
            }}
          />
          {/* mask to keep glow outside */}
          <div className="absolute inset-0 rounded-md bg-background z-10 pointer-events-none" />
          <Button
            asChild
            variant="ghost"
            className="relative z-20 border border-white text-white bg-transparent px-7 py-4 rounded-md text-base font-medium h-13 flex items-center justify-center hover:text-white scale-105 backdrop-blur-sm"
            style={{ color: '#fff', backgroundColor: '#14213d', borderColor: '#fff' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#14213d'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#14213d'; }}
          >
            <a
              href="https://www.behance.net/nevedpaharia"
              target="_blank"
              rel="noopener noreferrer"
            >
              See 'em all
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}