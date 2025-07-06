"use client";
import React from "react";
import { Instagram, Mail, ArrowUpRightFromCircle } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    const heroSection = document.getElementById("home");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="pt-12 pb-8 w-full text-black">
      {/* Top Row */}
      <div className="max-w-7xl mx-auto px-6 md:px-24 grid grid-cols-1 md:grid-cols-3 items-start gap-10">
        {/* Left - Need Support */}
        <div className="flex flex-col items-start gap-3">
          <span className="uppercase text-xs tracking-wider font-medium">
            Need Support?
          </span>
          <a
            href="mailto:nevedpaharia@gmail.com"
            className="p-2 bg-black/10 rounded-full hover:bg-[#ccb533] hover:scale-110 transition-all duration-300"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Center - Logo */}
        <div className="flex justify-center">
          <img
            src="/logo.png"
            alt="Neved Logo"
            className="w-28 h-auto object-contain"
          />
        </div>

        {/* Right - Follow Me */}
        <div className="flex flex-col items-end gap-3">
          <span className="uppercase text-xs tracking-wider font-medium">
            Follow Me
          </span>
          <div className="flex gap-3">
            <a
              href="https://instagram.com/nevedpaharia"
              className="p-2 bg-black/10 rounded-full hover:bg-[#ccb533] hover:scale-110 transition-all duration-300"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://behance.net/nevedpaharia"
              className="p-2 bg-black/10 rounded-full hover:bg-[#ccb533] hover:scale-110 transition-all duration-300"
              aria-label="Behance"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/behance.svg" alt="Behance" className="w-5 h-5" loading="lazy" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-black/10 mt-7 mb-6 mx-auto max-w-7xl" />

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto px-6 md:px-24 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Designed By */}
        <p className="text-sm">
          Designed with <span className="text-red-500">❤</span>
        </p>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center space-x-2 text-sm hover:text-[#ccb533] transition-colors duration-200 group"
        >
          <span>Back to top</span>
          <ArrowUpRightFromCircle className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-200" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
