import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ProjectCard = ({ title, description, link, thumbnail, video }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const hoverTimeout = useRef(null);

  useEffect(() => {
    if (isHovered) {
      hoverTimeout.current = setTimeout(() => setShowVideo(true), 100); // Reduced delay to 100ms
    } else {
      clearTimeout(hoverTimeout.current);
      setShowVideo(false);
    }
    return () => clearTimeout(hoverTimeout.current);
  }, [isHovered]);

  // dimensions
  const imgInitialHeight = Math.round(320 * 0.8); // 256
  const imgInitialWidth = Math.round(imgInitialHeight * 1.28); // ≈ 328
  const imgHoverWidth = Math.round(imgInitialHeight * 1.625); // ≈ 416
  const imgHoverHeight = imgInitialHeight;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group block mx-auto w-full max-w-[1000px] transition-all ease-in-out duration-500"
    >
      <div className="flex items-start gap-6 bg-white/10 border border-white/20 backdrop-blur-lg rounded-[30px] overflow-hidden pl-6 pr-8 py-6 transition-all ease-in-out duration-500">
        <motion.div
          className={`rounded-[20px] overflow-hidden flex-shrink-0 transition-shadow duration-300 ${isHovered ? 'shadow-2xl' : ''}`}
          initial={{ width: imgInitialWidth, height: imgInitialHeight }}
          animate={{ width: isHovered ? imgHoverWidth : imgInitialWidth, height: imgInitialHeight }}
          transition={{ duration: 0.21, ease: "easeInOut" }}
        >
          {!showVideo && (
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover bg-black"
            />
          )}
          {showVideo && (
            <video
              src={video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover bg-black"
            />
          )}
        </motion.div>
        <div className="flex-1 text-white transition-transform ease-in-out duration-500 group-hover:translate-x-4">
          <h3 className="text-2xl md:text-3xl font-semibold font-montserrat">
            {title}
          </h3>
          <p className="mt-2 text-base opacity-70 font-montserrat">
            {description}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm font-semibold font-montserrat">
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
  return (
    <section className="w-full flex flex-col items-center py-[256px] md:py-[256px]">
      <h2 className="quentin-font text-4xl md:text-6xl font-bold text-white text-center mb-5" data-aos="fade-up" data-aos-delay="0">
        I color outside the lines (on purpose)
      </h2>
      <p className="text-base md:text-xl text-white/80 max-w-2xl text-center font-light mb-[84px]" data-aos="fade-up" data-aos-delay="120">
        ~but hey, that's how cool projects get born~
      </p>
      <div className="flex flex-col gap-10 w-full">
        <div data-aos="fade-up" data-aos-delay="240">
          <ProjectCard
            title="EcoWrap | Branding"
            description="At Eco Wrap, we are dedicated to transforming food preservation with our eco-friendly wraps. Crafted from biodegradable materials. Eco Wrap extends food freshness while reducing your carbon footprint. Advanced technology alerts you to spoilage, ensuring safety and convenience. Join us in creating a greener planet with Eco Wrap - where sustainability meets sophistication."
            link="https://www.behance.net/gallery/199356901/EcoWrap-Branding"
            thumbnail="/project highlights/1.webp"
            video="/project highlights/1.webm"
          />
        </div>
        <div data-aos="fade-up" data-aos-delay="360">
          <ProjectCard
            title="Soch | A Short Film"
            description="Written by me, Soch is on the day-to-day problems faced by school-going adolescents. The story centers around Neha, a Spirited 'tomboy' like character portrayed by Hrishita, and Nitin, played by Runal Singh, who battles depression and the weight of societal expectations. Through their journey, the short film offers a fresh perspective on friendship, resilience."
            link="https://www.behance.net/gallery/211353215/Soch-Short-Film"
            thumbnail="/project highlights/2.webp"
            video="/project highlights/2.webm"
          />
        </div>
        <div data-aos="fade-up" data-aos-delay="480">
          <ProjectCard
            title="Team Mighty | Branding"
            description="Team Mighty is a rising esports gaming clan based in India, founded in March 2021 by Smridh Sharma (Mighty Sam), Aayush Shah (Mighty Blade), and Mighty Hornet. The name 'Mighty' symbolizes immense strength, unity, and dominance—qualities the team brings to mobile games like CODM, BGMI, Free Fire, and more."
            link="https://www.behance.net/gallery/133855915/Team-Mighty-Branding"
            thumbnail="/project highlights/3.webp"
            video="/project highlights/3.webm"
          />
        </div>
      </div>
      <div className="mt-20 md:mt-20 flex justify-center">
        <div className="relative group w-fit h-fit transition-transform duration-300 hover:scale-105">
          <div className="absolute inset-0 rounded-full bg-white opacity-30 blur-xl z-0 transition-transform duration-[1600ms] group-hover:scale-110 animate-glow-pulse" />
          <Button
            asChild
            variant="ghost"
            className="relative z-10 border border-white text-white bg-transparent px-7 py-4 rounded-full text-base font-medium h-13 flex items-center justify-center hover:bg-white/10 hover:text-white scale-120"
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