
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Linkedin, Instagram, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

// Declare Tawk_API for TypeScript
declare global {
  interface Window {
    Tawk_API?: {
      showWidget: () => void;
      hideWidget: () => void;
      maximize: () => void;
      minimize: () => void;
    };
    loadTawkTo?: () => void;
  }
}
import { useFadeInSection } from '@/hooks/use-fade-in-section';
import { useScaleUpSection, layeredTextVariants, layeredContainerVariants } from '@/hooks/use-scale-up-section';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    organizationName: '',
    email: '',
    contact: '',
    website: '',
    services: [] as string[],
    budget: '',
    hearAbout: '',
    message: ''
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });
    setFormData({ 
      name: '', 
      organizationName: '', 
      email: '', 
      contact: '', 
      website: '', 
      services: [], 
      budget: '', 
      hearAbout: '', 
      message: '' 
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = e.target.name === 'organization' ? 'organizationName' : 
                     e.target.name === 'tel' ? 'contact' : 
                     e.target.name === 'url' ? 'website' : 
                     e.target.name;
    setFormData({
      ...formData,
      [fieldName]: e.target.value
    });
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        services: [...formData.services, service]
      });
    } else {
      setFormData({
        ...formData,
        services: formData.services.filter(s => s !== service)
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const fadeRef = useFadeInSection();
  const scaleUpRef = useScaleUpSection();

  return (
    <section id="contact" className="relative z-10 pt-[16rem] pb-8 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10" data-aos="fade-up" ref={fadeRef}>

        <motion.div 
          className="text-center mb-6 md:mb-10 relative"
          variants={layeredContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="quentin-font text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5"
            variants={layeredTextVariants}
          >
          I wear a lot of watches
          </motion.h2>
          <motion.p 
            className="text-base md:text-xl text-white max-w-2xl mx-auto relative z-10"
            variants={layeredTextVariants}
          >
          ~but that's just a hobby, here's how we can engage~
          </motion.p>
        </motion.div>

        <div className="bg-white/20 backdrop-blur-md radius-2xl md:radius-3xl p-4 md:p-6 lg:p-8 border border-white/20 shadow-xl" ref={scaleUpRef}>
          {/* Modern, Light, Relaxed Contact Section Header */}
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <p className="text-base md:text-lg font-montserrat text-white/60 text-center">
              Pick your style: now or later...
            </p>
            <div className="grid grid-cols-2 gap-3 md:gap-6 w-full mb-8">
              <button
                type="button"
                onClick={() => {
                  // Load Tawk.to if not already loaded
                  if (typeof window.loadTawkTo === 'function') {
                    window.loadTawkTo();
                  }
                  
                  // Wait a bit for Tawk.to to load, then show widget
                  setTimeout(() => {
                    if (window.Tawk_API) {
                      if (!isChatOpen) {
                        if (typeof window.Tawk_API.showWidget === 'function') {
                          window.Tawk_API.showWidget();
                        }
                        if (typeof window.Tawk_API.maximize === 'function') {
                          window.Tawk_API.maximize();
                        }
                        setIsChatOpen(true);
                      } else {
                        if (typeof window.Tawk_API.minimize === 'function') {
                          window.Tawk_API.minimize();
                        }
                        if (typeof window.Tawk_API.hideWidget === 'function') {
                          window.Tawk_API.hideWidget();
                        }
                        setIsChatOpen(false);
                      }
                    }
                  }, 1000);
                }}
                className="h-10 rounded-md text-base md:text-sm font-normal font-montserrat text-white bg-[#0D1B2A] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0D1B2A] focus:ring-offset-2 hover:scale-105 w-full"
                style={{ boxShadow: '0 2px 8px 0 rgba(13,27,42,0.08)' }}
              >
                {isChatOpen ? '❌ Close Live Chat' : '💬 Start a Live Chat'}
              </button>
              <button
                type="button"
                className="h-10 rounded-md text-base md:text-sm font-normal font-montserrat text-white bg-[#0D1B2A] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0D1B2A] focus:ring-offset-2 hover:scale-105 w-full"
                style={{ boxShadow: '0 2px 8px 0 rgba(13,27,42,0.08)' }}
                onClick={() => window.open('https://calendly.com/nevedpaharia/30min', '_blank')}
              >
                📅 Schedule a Meeting
              </button>
            </div>
          </div>

          {/* Details Prompt */}
          <div className="mb-6 md:mb-8">
            <p className="text-base md:text-lg font-montserrat italic text-white/50 text-center">
              Or if you're the type who likes to give <span className="italic">all</span> the details…
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-6" autoComplete="on">
            <div className="grid md:grid-cols-2 gap-3 md:gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Your Name *
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="given-name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base radius-lg md:radius-xl border border-black bg-white/50 backdrop-blur-sm"
                  placeholder="Name"
                />
              </div>

              <div>
                <label htmlFor="organizationName" className="block text-sm font-medium text-white mb-2">
                  Your Organization's Name *
                </label>
                <Input
                  type="text"
                  id="organizationName"
                  name="organization"
                  autoComplete="organization"
                  value={formData.organizationName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base radius-lg md:radius-xl border border-black bg-white/50 backdrop-blur-sm"
                  placeholder="Your Organization's Name"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3 md:gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Your Email *
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base radius-lg md:radius-xl border border-black bg-white/50 backdrop-blur-sm"
                  placeholder="Your Email"
                />
              </div>

              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-white mb-2">
                  Your Contact *
                </label>
                <Input
                  type="tel"
                  id="contact"
                  name="tel"
                  autoComplete="tel"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base radius-lg md:radius-xl border border-black bg-white/50 backdrop-blur-sm"
                  placeholder="Your Contact"
                />
              </div>
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-white mb-2">
                Website / Social Media Link
              </label>
              <Input
                type="url"
                id="website"
                name="url"
                autoComplete="url"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base radius-lg md:radius-xl border border-black bg-white/50 backdrop-blur-sm"
                placeholder="Your Website (optional)"
              />
            </div>

            <div>
              <span className="block text-sm font-medium text-white mb-3 md:mb-4">
                What services are you interested in?
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {[
                  'Logo design',
                  'Brand identity development',
                  'Packaging design',
                  'Brand consultation'
                ].map((service) => {
                  const safeId = `service-${service.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                  return (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={safeId}
                        name="services"
                        value={service}
                        checked={formData.services.includes(service)}
                        onCheckedChange={(checked) => handleServiceChange(service, !!checked)}
                      />
                      <label htmlFor={safeId} className="text-sm text-white">
                        {service}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Budget Field */}
            <div>
              <span id="budget-label" className="block text-sm font-medium text-white mb-2">
                How much are you looking to invest on this project? *
              </span>
              {/* Hidden real select for autofill */}
              <select
                id="budget-select"
                name="budget"
                value={formData.budget}
                onChange={(e) => handleSelectChange('budget', e.target.value)}
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
              >
                <option value=""></option>
                <option value="6-10 Thousand">₹ 6–10 Thousand</option>
                <option value="10-15 Thousand">₹ 10–15 Thousand</option>
                <option value="15-20 Thousand">₹ 15–20 Thousand</option>
                <option value="20+ Thousand">₹ 20+ Thousand</option>
              </select>
              <Select aria-labelledby="budget-label" onValueChange={(value) => handleSelectChange('budget', value)}>
                <SelectTrigger className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base radius-lg md:radius-xl border border-black bg-white/50 backdrop-blur-sm text-black placeholder:text-gray-500">
                  <SelectValue placeholder="Select your budget" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <SelectItem value="6-10 Thousand" className="text-black hover:bg-gray-100 focus:bg-gray-100">₹ 6–10 Thousand</SelectItem>
                  <SelectItem value="10-15 Thousand" className="text-black hover:bg-gray-100 focus:bg-gray-100">₹ 10–15 Thousand</SelectItem>
                  <SelectItem value="15-20 Thousand" className="text-black hover:bg-gray-100 focus:bg-gray-100">₹ 15–20 Thousand</SelectItem>
                  <SelectItem value="20+ Thousand" className="text-black hover:bg-gray-100 focus:bg-gray-100">₹ 20+ Thousand</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Hear About Us Field */}
            <div>
              <span id="hear-about-label" className="block text-sm font-medium text-white mb-2">
                And lastly, how did you hear about us? *
              </span>
              {/* Hidden real select for autofill */}
              <select
                id="hear-about-select"
                name="hearAbout"
                value={formData.hearAbout}
                onChange={(e) => handleSelectChange('hearAbout', e.target.value)}
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
              >
                <option value=""></option>
                <option value="social-media">Social Media</option>
                <option value="referral">Referral</option>
                <option value="google-search">Google Search</option>
                <option value="behance">Behance</option>
                <option value="other">Other</option>
              </select>
              <Select aria-labelledby="hear-about-label" onValueChange={(value) => handleSelectChange('hearAbout', value)}>
                <SelectTrigger className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base radius-lg md:radius-xl border border-black bg-white/50 backdrop-blur-sm text-black placeholder:text-gray-500">
                  <SelectValue placeholder="Select how you heard about us" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <SelectItem value="social-media" className="text-black hover:bg-gray-100 focus:bg-gray-100">Social Media</SelectItem>
                  <SelectItem value="referral" className="text-black hover:bg-gray-100 focus:bg-gray-100">Referral</SelectItem>
                  <SelectItem value="google-search" className="text-black hover:bg-gray-100 focus:bg-gray-100">Google Search</SelectItem>
                  <SelectItem value="behance" className="text-black hover:bg-gray-100 focus:bg-gray-100">Behance</SelectItem>
                  <SelectItem value="other" className="text-black hover:bg-gray-100 focus:bg-gray-100">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                Additional Message
              </label>
              <Textarea
                id="message"
                name="message"
                autoComplete="off"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base radius-lg md:radius-xl border border-black bg-white/50 backdrop-blur-sm resize-none"
                placeholder="Tell me about your project and how I can help..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#031636] hover:bg-[#031636]/90 text-white py-3 md:py-4 text-sm md:text-base radius-lg md:radius-xl transition-all duration-300 hover:scale-[1.02] shadow-md"
            >
              Let's Connect!
            </Button>
          </form>

          <div className="mt-4 md:mt-12 pt-4 md:pt-8 border-t border-white/20">
            <p className="text-center text-white mb-4 md:mb-6 text-sm md:text-base">Or connect with me on social media</p>
            <div className="flex justify-center space-x-4 md:space-x-6">
              <a href="https://www.instagram.com/nevedpaharia/" target="_blank" rel="noopener noreferrer" className="p-2 md:p-3 bg-white/30 backdrop-blur-sm radius-full shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300 border border-white/20">
                <Instagram className="w-5 h-5 md:w-6 md:h-6 transition-all duration-300 ease-in-out" />
              </a>
              <a href="https://www.behance.net/nevedpaharia" target="_blank" rel="noopener noreferrer" className="p-2 md:p-3 bg-white/30 backdrop-blur-sm radius-full shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300 border border-white/20">
                <img src="/behance.svg" alt="Behance" className="w-5 h-5 md:w-6 md:h-6" style={{ filter: 'none' }} loading="lazy" />
              </a>
              <a href="https://www.facebook.com/nevedpaharia/" target="_blank" rel="noopener noreferrer" className="p-2 md:p-3 bg-white/30 backdrop-blur-sm radius-full shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300 border border-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 20 20" stroke="#031636" strokeWidth="1.5" className="w-5 h-5 md:w-6 md:h-6" style={{ display: 'block', margin: '0 auto' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 3.5h-2A3.5 3.5 0 0 0 10 7v2H8.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5H10v7.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V12h1.5a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5H13V7a1 1 0 0 1 1-1h1.5a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
