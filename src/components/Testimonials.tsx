import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useFadeInSection } from '@/hooks/use-fade-in-section';
import { useScaleUpSection } from '@/hooks/use-scale-up-section';
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
  const scaleUpRef = useScaleUpSection();

  // Add scroll-based floating animation for testimonial images
  const { scrollYProgress } = useScroll({
    target: fadeRef,
    offset: ["start end", "end start"]
  });
  
  const floatingY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  // Add scroll-based reveal animation for the entire section
  const { scrollYProgress: sectionScrollYProgress } = useScroll({
    target: fadeRef,
    offset: ["start end", "center center"]
  });
  
  const sectionScale = useTransform(sectionScrollYProgress, [0, 1], [0.98, 1]);
  const sectionOpacity = useTransform(sectionScrollYProgress, [0, 1], [0.8, 1]);

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

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [inViewArr, setInViewArr] = useState([]);
  const cardRefs = useRef([]);

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
    window.addEventListener("resize", handleResize, { passive: true });
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
    const gap = calculateGap(containerWidth) * 0.7;
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
        boxShadow: "0 4px 32px 0 rgba(0,0,0,0.18)",
        transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        transformStyle: 'preserve-3d',
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.85,
        pointerEvents: "auto",
        filter: "blur(0.125rem)",
        transform: `translateX(-${gap * 0.6}px) translateY(-${maxStickUp * 1.5}px) scale(0.96) rotateY(10deg)`,
        boxShadow: "-8px 8px 24px rgba(0,0,0,0.10)",
        transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        transformStyle: 'preserve-3d',
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.85,
        pointerEvents: "auto",
        filter: "blur(0.125rem)",
        transform: `translateX(${gap * 0.6}px) translateY(-${maxStickUp * 1.5}px) scale(0.96) rotateY(-10deg)`,
        boxShadow: "8px 8px 24px rgba(0,0,0,0.10)",
        transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        transformStyle: 'preserve-3d',
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      filter: "none",
      transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
      transformStyle: 'preserve-3d',
    };
  }

  // Use the enhanced scale-up variants


  // Framer Motion variants for quote
  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, testimonials.length);
    const observer = new window.IntersectionObserver((entries) => {
      setInViewArr((prev) => {
        const newArr = [...prev];
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) newArr[idx] = true;
        });
        return newArr;
      });
    }, { threshold: 0.2 });
    cardRefs.current.forEach(ref => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, [testimonials.length]);

  return (
    <section
      id="testimonials"
      className="py-[28rem] relative overflow-hidden flex items-center min-h-screen"
    >
      <img
        src="/background/paper 3.webp"
        alt="Torn Paper Background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none select-none"
        draggable={false}
        aria-hidden="true"
        width={1920}
        height={1080}
      />
      <div
        className="max-w-6xl mx-auto px-4 md:px-8 pb-4 md:pb-8 relative z-10"
        data-aos="fade-up"
        ref={fadeRef}
      >
        <div className="text-center mb-6 md:mb-10">
          <h2 
            className="quentin-font text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-5" 
            data-aos="fade-up" 
            data-aos-delay="0"
          >
            The best thing about Design
          </h2>
          <p 
            className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-[5.25rem]" 
            data-aos="fade-up" 
            data-aos-delay="90"
          >
            ~is, it's all about the people~
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto" ref={scaleUpRef}>
          <div 
            data-aos="fade-up" 
            data-aos-delay="210" 
            className={isMobile ? "flex flex-col gap-6 items-center" : "grid grid-cols-[auto_2fr] gap-24 items-start h-96 mx-auto"}
          >
            {/* Carousel Column */}
            <div
              className={isMobile 
                ? "relative w-[160px] h-[210px] perspective-1000" 
                : "relative w-[240px] md:w-[300px] h-full perspective-1000 pl-6"
              }
              ref={imageContainerRef}
              style={{ 
                perspective: '900px',
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.src}
                  className="absolute left-0 top-0 w-full aspect-[3/4] overflow-hidden"
                  style={{ ...getImageStyle(index), transformStyle: 'preserve-3d' }}
                >
                  <div
                    ref={el => cardRefs.current[index] = el}
                    className={`group relative w-full h-full radius-lg md:radius-xl bg-white/10 border border-white/20 shadow-lg transition-[filter,backdrop-filter,transform] duration-300 ease-in-out flex flex-col overflow-hidden ${inViewArr[index] ? 'backdrop-blur-0' : 'backdrop-blur-sm'}`}
                  >
                    <picture>
                      <source type="image/webp" srcSet={[
                        encodeURI(testimonial.src.replace('.jpg', '-400w.webp')) + ' 400w',
                        encodeURI(testimonial.src.replace('.jpg', '-800w.webp')) + ' 800w',
                        encodeURI(testimonial.src.replace('.jpg', '-1200w.webp')) + ' 1200w',
                      ].join(', ')} sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px" />
                      <img 
                        src={testimonial.src} 
                        alt={`Testimonial from ${testimonial.name}, ${testimonial.designation} - Brand Identity Client`} 
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        width={400}
                        height={533}
                        onError={(e) => {
                          console.log(`Testimonial image failed to load: ${testimonial.src}`);
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            const initials = testimonial.name.split(' ').map(n => n[0]).join('');
                            const fallbackHTML = '<div class="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex flex-col items-center justify-center text-primary">' +
                              '<div class="text-xl md:text-2xl font-bold mb-2">' + initials + '</div>' +
                              '<div class="text-xs md:text-sm text-center px-4">' + testimonial.name + '</div>' +
                              '</div>';
                            parent.innerHTML = fallbackHTML;
                          }
                        }}
                      />
                    </picture>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Text Column */}
            <div className={isMobile 
              ? "relative flex flex-col justify-center text-center px-2 min-h-[280px]" 
              : "relative flex flex-col justify-center h-full w-[120%] text-left pb-20 pr-12"
            }>
              {/* Fixed Name and Role Section */}
              <div 
                className={isMobile 
                  ? "mb-3" 
                  : "absolute top-1/2 transform -translate-y-1/2"
                } 
                style={!isMobile ? { top: 'calc(50% - 135px)' } : {}}
              >
                <h3
                  className="font-bold mb-1 text-primary"
                  style={{ fontSize: isMobile ? '1.25rem' : '1.75rem' }}
                >
                  {activeTestimonial.name}
                </h3>
                <p
                  className="mb-2 text-muted-foreground"
                  style={{ fontSize: isMobile ? '0.875rem' : '1rem', marginTop: '-4px' }}
                >
                  {activeTestimonial.designation}
                </p>
              </div>
              
              {/* Fixed Message Start Position */}
              <div 
                className={isMobile ? "mb-4" : "absolute"} 
                style={!isMobile ? { top: 'calc(50% - 100px)' } : {}}
              >
                <div>
                  <p
                    className="leading-relaxed text-foreground"
                    style={{ fontSize: isMobile ? '0.95rem' : '1.25rem' }}
                  >
                    {activeTestimonial.quote}
                  </p>
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <div 
                className={isMobile 
                  ? "flex gap-3 justify-center" 
                  : "flex gap-6 absolute left-0"
                } 
                style={!isMobile ? { bottom: '28px' } : {}}
              >
                <button
                  className={`${isMobile ? 'w-9 h-9' : 'w-11 h-11'} radius-full flex items-center justify-center cursor-pointer transition-all duration-300 border-none bg-primary hover:bg-secondary`}
                  onClick={handlePrev}
                  onMouseEnter={() => setHoverPrev(true)}
                  onMouseLeave={() => setHoverPrev(false)}
                  aria-label="Previous testimonial"
                >
                  <FaArrowLeft size={isMobile ? 20 : 28} className="text-primary-foreground" />
                </button>
                <button
                  className={`${isMobile ? 'w-9 h-9' : 'w-11 h-11'} radius-full flex items-center justify-center cursor-pointer transition-all duration-300 border-none bg-primary hover:bg-secondary`}
                  onClick={handleNext}
                  onMouseEnter={() => setHoverNext(true)}
                  onMouseLeave={() => setHoverNext(false)}
                  aria-label="Next testimonial"
                >
                  <FaArrowRight size={isMobile ? 20 : 28} className="text-primary-foreground" />
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
