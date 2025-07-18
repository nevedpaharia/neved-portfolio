
"use client";
import React from "react";
import { motion } from 'framer-motion';
import { Instagram, Mail, ArrowUpRightFromCircle, Heart } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { useScaleUpSection } from '@/hooks/use-scale-up-section';

const Footer = () => {
  const scaleUpRef = useScaleUpSection();
  
  const scrollToTop = () => {
    const heroSection = document.getElementById("home");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <footer className="relative z-10 pt-6 md:pt-8 pb-8 w-full text-white">
        {/* Top Row */}
        <div 
          className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-3 items-center gap-4 md:gap-6" 
          ref={scaleUpRef}
        >
          {/* Left - Need Support */}
          <div className="flex flex-col items-start gap-2 md:gap-3 justify-self-start">
            <span className="uppercase text-xs tracking-wider font-medium text-white">
              Need Support?
            </span>
            <a
              href="mailto:nevedpaharia@gmail.com"
              className="p-2 bg-white/20 radius-full hover:bg-[#ccb533] hover:scale-110 transition-all duration-300"
              aria-label="Email"
            >
              <Mail className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </a>
          </div>

          {/* Center - Logo */}
          <div className="flex justify-center justify-self-center">
            <img
              src="/logo.png"
              alt="Neved Paharia Portfolio Logo" 
              className="w-20 md:w-28 h-auto object-contain"
              loading="lazy"
              width={112}
              height={44}
            />
          </div>

          {/* Right - Follow Me */}
          <div className="flex flex-col items-end gap-2 md:gap-3 justify-self-end">
            <span className="uppercase text-xs tracking-wider font-medium text-white">
              Follow Me
            </span>
            <div className="flex gap-2 md:gap-3">
              <a
                href="https://instagram.com/nevedpaharia"
                className="p-2 bg-white/20 radius-full hover:bg-[#ccb533] hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </a>
              <a
                href="https://behance.net/nevedpaharia"
                className="p-2 bg-white/20 radius-full hover:bg-[#ccb533] hover:scale-110 transition-all duration-300"
                aria-label="Behance"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className="w-4 h-4 md:w-5 md:h-5 fill-white" aria-hidden="true">
                  <path d="M 16.240234 4.75 A 1.250125 1.250125 0 1 0 16.240234 7.25 L 20.759766 7.25 A 1.250125 1.250125 0 1 0 20.759766 4.75 L 16.240234 4.75 z M 6.875 4.9902344 L 1.2460938 5.0039062 A 1.250125 1.250125 0 0 0 -0.001953125 6.2539062 L -0.001953125 18.759766 A 1.250125 1.250125 0 0 0 1.2480469 20.009766 L 7.3789062 20.009766 C 9.9224486 20.009766 12.005859 17.915373 12.005859 15.373047 C 12.005859 13.835911 11.193759 12.529405 10.029297 11.683594 C 10.610162 10.971431 11.007813 10.100513 11.007812 9.1191406 C 11.007812 6.855287 9.1465792 4.9902344 6.8789062 4.9902344 A 1.250125 1.250125 0 0 0 6.875 4.9902344 z M 6.8789062 7.4902344 C 7.7912333 7.4902344 8.5078125 8.2089942 8.5078125 9.1191406 C 8.5078125 10.016606 7.8037065 10.719378 6.9101562 10.738281 L 2.4980469 10.748047 L 2.4980469 7.5 L 6.8789062 7.4902344 z M 18.498047 7.9765625 C 15.390307 7.9765625 12.986328 10.75678 12.986328 14 C 12.986328 17.233205 15.390307 20.009766 18.498047 20.009766 C 20.146688 20.009766 21.632849 19.206986 22.623047 17.988281 A 1.2503375 1.2503375 0 1 0 20.681641 16.412109 C 20.111838 17.113405 19.345406 17.509766 18.498047 17.509766 C 17.257951 17.509766 16.148382 16.598578 15.705078 15.25 L 22.761719 15.25 A 1.250125 1.250125 0 0 0 24.011719 14 C 24.011719 10.75678 21.605787 7.9765625 18.498047 7.9765625 z M 18.498047 10.476562 C 19.740536 10.476562 20.851474 11.390344 21.292969 12.75 L 15.705078 12.75 C 16.146573 11.390344 17.255558 10.476562 18.498047 10.476562 z M 7.3789062 13.236328 C 8.5633641 13.236328 9.5058594 14.181373 9.5058594 15.373047 C 9.5058594 16.564721 8.5633641 17.509766 7.3789062 17.509766 L 2.4980469 17.509766 L 2.4980469 13.248047 L 6.6992188 13.238281 A 1.250125 1.250125 0 0 0 6.8789062 13.25 C 6.9009542 13.25 6.9194363 13.238631 6.9414062 13.238281 L 7.3789062 13.236328 z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-8 mb-8 mx-auto max-w-7xl" />

        {/* Bottom Row - vertically centered */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center gap-3 md:gap-4">
            {/* Designed By - Bottom Left */}
            <p className="text-xs md:text-sm flex items-center gap-1 text-white">
              Designed with <Heart className="w-3 h-3 text-red-500 fill-current" />
            </p>

            {/* Back to Top - Bottom Right */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-xs md:text-sm text-white hover:text-[#ccb533] transition-colors duration-200 group"
            >
              <span className="text-white">Back to top</span>
              <ArrowUpRightFromCircle className="w-3 h-3 md:w-4 md:h-4 group-hover:-translate-y-1 transition-transform duration-200" />
            </button>
          </div>
      </footer>
      {/* Black gradient underneath the footer, above the background */}
      <div
        className="pointer-events-none select-none"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '22.5rem',
          zIndex: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0))',
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default Footer;
