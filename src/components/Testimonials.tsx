
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useFadeInSection } from '@/hooks/use-fade-in-section';
import { useIsMobile } from '@/hooks/use-mobile';

const Testimonials = () => {
  const isMobile = useIsMobile();
  const testimonials = [
    {
      quote: "Neved designed our logo, business cards, and templates brilliantly. He was proactive, creative, and delivered on time with great dedication. We highly recommend him for professional, high-quality branding work.",
      name: "Shashank Saboo",
      designation: "Founder, Nilachal Navnirman",
      src: "/testimonials/Shashank Saboo.jpg"
    },
    {
      quote: "Neved has been fantastic; both he and the process that led us to the end product were simple to grasp. A real joy and a huge win for our company.",
      name: "Shailendra Jain",
      designation: "Founder, S. R. Associates",
      src: "/testimonials/Shailendra Jain.jpg"
    },
    {
      quote: "Working with Neved has been a great experience. His skills and professionalism are tough to match. His work for our business has gotten a lot of positive feedback. Just amazing work!",
      name: "Samridh Sharma",
      designation: "Founder, Team Mighty",
      src: "/testimonials/Samridh Sharma.jpg"
    },
  ];

  const fadeRef = useFadeInSection();

  // Circular Testimonials Component Logic
  function calculateGap(width: number) {
    const minWidth = 1024;
    const maxWidth = 1456;
    const minGap = 100;
    const maxGap = 140;
    if (width <= minWidth) return minGap;
    if (width >= maxWidth)
      return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
    return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
  }

  // Color & font config
  const colorName = "#031636";
  const colorDesignation = "#6b7280";
  const colorTestimony = "#4b5563";
  const colorArrowBg = "#031636";
  const colorArrowFg = "#ffffff";
  const colorArrowHoverBg = "#ccb533";
  const fontSizeName = "1.75rem";
  const fontSizeDesignation = "1rem";
  const fontSizeQuote = "1.25rem";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials]
  );

  // Responsive gap calculation
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    autoplayIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    }, 5000);
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [testimonialsLength]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  // Compute transforms for each image (always show 3: left, center, right)
  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth) * 0.7; // moderate pop
    const maxStickUp = gap * 0.18;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        filter: "none",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        boxShadow: "0 10px 40px rgba(0,0,0,0.16)",
        transition: "all 0.7s cubic-bezier(.4,2,.3,1)",
        transformStyle: 'preserve-3d',
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.85,
        pointerEvents: "auto",
        filter: "blur(0.4px)",
        transform: `translateX(-${gap * 0.6}px) translateY(-${maxStickUp * 1.5}px) scale(0.96) rotateY(10deg)`,
        boxShadow: "-8px 8px 24px rgba(0,0,0,0.10)",
        transition: "all 0.7s cubic-bezier(.4,2,.3,1)",
        transformStyle: 'preserve-3d',
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.85,
        pointerEvents: "auto",
        filter: "blur(0.4px)",
        transform: `translateX(${gap * 0.6}px) translateY(-${maxStickUp * 1.5}px) scale(0.96) rotateY(-10deg)`,
        boxShadow: "8px 8px 24px rgba(0,0,0,0.10)",
        transition: "all 0.7s cubic-bezier(.4,2,.3,1)",
        transformStyle: 'preserve-3d',
      };
    }
    // Hide all other images
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      filter: "none",
      transition: "all 0.7s cubic-bezier(.4,2,.3,1)",
      transformStyle: 'preserve-3d',
    };
  }

  // Framer Motion variants for quote
  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section
      id="testimonials"
      className="py-20 pb-24 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-[#ccb533] rounded-full blur-3xl opacity-15"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#031636] rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/3 left-20 w-48 h-48 bg-[#ccb533] rounded-full blur-3xl opacity-12"></div>
        {/* <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#031636] rounded-full blur-3xl opacity-18"></div> */}
        <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-[#031636] rounded-full blur-3xl opacity-15"></div>
      </div>
      <div
        className="max-w-6xl mx-auto px-8 pb-16 relative z-10"
        data-aos="fade-up"
        ref={fadeRef}
      >
        <div className="text-center mb-16">
          <h2 className="quentin-font text-4xl md:text-5xl font-bold text-primary mb-6">
            Hear from Them
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            What my Teachers and clients say about me
          </p>
        </div>

        <div className="w-full max-w-4xl p-8 mx-auto">
          <div className={isMobile ? "flex flex-col gap-8 items-center" : "grid grid-cols-[auto_1fr] gap-24 items-center h-96"}>
            {/* Carousel Column */}
            <div
              className={isMobile 
                ? "relative w-[200px] h-[260px] perspective-1000" 
                : "relative w-[240px] md:w-[300px] h-full perspective-1000 ml-10"
              }
              ref={imageContainerRef}
              style={{ perspective: '900px' }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.src}
                  className="absolute left-0 top-0 w-full aspect-[3/4] overflow-hidden"
                  style={{ ...getImageStyle(index), transformStyle: 'preserve-3d' }}
                >
                  <div className="group relative w-full h-full rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg transition-all duration-300 ease-in-out flex flex-col overflow-hidden">
                    <img 
                      src={testimonial.src} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        console.log(`Testimonial image failed to load: ${testimonial.src}`);
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex flex-col items-center justify-center text-primary">
                            <div class="text-2xl font-bold mb-2">${testimonial.name.split(' ').map(n => n[0]).join('')}</div>
                            <div class="text-sm text-center px-4">${testimonial.name}</div>
                          </div>`;
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Text Column */}
            <div className={isMobile 
              ? "relative flex flex-col justify-center text-center px-4 min-h-[300px]" 
              : "relative flex flex-col justify-center h-full w-full text-left pb-20"
            }>
              {/* Fixed Name and Role Section */}
              <div 
                className={isMobile 
                  ? "mb-4" 
                  : "absolute top-1/2 transform -translate-y-1/2"
                } 
                style={!isMobile ? { top: 'calc(50% - 135px)' } : {}}
              >
                <h3
                  className="font-bold mb-1 text-primary"
                  style={{ fontSize: '1.75rem' }}
                >
                  {activeTestimonial.name}
                </h3>
                <p
                  className="mb-2 text-muted-foreground"
                  style={{ fontSize: '1rem', marginTop: '-8px' }}
                >
                  {activeTestimonial.designation}
                </p>
              </div>
              
              {/* Fixed Message Start Position */}
              <div 
                className={isMobile ? "mb-6" : "absolute"} 
                style={!isMobile ? { top: 'calc(50% - 100px)' } : {}}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    variants={quoteVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <motion.p
                      className="leading-relaxed text-foreground"
                      style={{ fontSize: '1.25rem' }}
                    >
                      {activeTestimonial.quote.split(" ").map((word, i) => (
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
                            duration: 0.22,
                            ease: "easeInOut",
                            delay: 0.025 * i,
                          }}
                          style={{ display: "inline-block" }}
                        >
                          {word}&nbsp;
                        </motion.span>
                      ))}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div 
                className={isMobile 
                  ? "flex gap-4 justify-center" 
                  : "flex gap-6 absolute left-0"
                } 
                style={!isMobile ? { bottom: '28px' } : {}}
              >
                <button
                  className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border-none bg-primary hover:bg-secondary"
                  onClick={handlePrev}
                  onMouseEnter={() => setHoverPrev(true)}
                  onMouseLeave={() => setHoverPrev(false)}
                  aria-label="Previous testimonial"
                >
                  <FaArrowLeft size={28} className="text-primary-foreground" />
                </button>
                <button
                  className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border-none bg-primary hover:bg-secondary"
                  onClick={handleNext}
                  onMouseEnter={() => setHoverNext(true)}
                  onMouseLeave={() => setHoverNext(false)}
                  aria-label="Next testimonial"
                >
                  <FaArrowRight size={28} className="text-primary-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
