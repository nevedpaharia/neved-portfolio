import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Linkedin, Instagram, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useFadeInSection } from '@/hooks/use-fade-in-section';

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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

  return (
    <section id="contact" className="py-20 relative z-10" style={{ marginTop: 0 }}>
      <div className="max-w-6xl mx-auto px-8 relative z-10" data-aos="fade-up" ref={fadeRef}>
        {/* Background blur balls */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute bottom-10 left-24 w-80 h-80 bg-[#ccb533] rounded-full blur-3xl opacity-15"></div>
          <div className="absolute bottom-24 right-32 w-80 h-80 bg-[#ccb533] rounded-full blur-3xl opacity-12"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-[#031636] rounded-full blur-3xl opacity-15"></div>
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#031636] rounded-full blur-3xl opacity-12"></div>
          <div className="absolute top-44 left-0 w-72 h-72 bg-[#031636] rounded-full blur-3xl opacity-25"></div>
        </div>

        <div className="text-center mb-16 relative">
          <h2 className="quentin-font text-4xl md:text-5xl font-bold text-[#031636] mb-6">
            Let's make it a reality!
          </h2>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-[#ccb533] rounded-full blur-3xl opacity-20"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto relative z-10">
            Ready to start your project? Fill out the form below and let's create something amazing together!
          </p>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#031636] mb-2">
                  Your Name *
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-black bg-white/50 backdrop-blur-sm"
                  placeholder="Name"
                />
              </div>

              <div>
                <label htmlFor="organizationName" className="block text-sm font-medium text-[#031636] mb-2">
                  Your Organization's Name *
                </label>
                <Input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  autoComplete="organization"
                  value={formData.organizationName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-black bg-white/50 backdrop-blur-sm"
                  placeholder="Your Organization's Name"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#031636] mb-2">
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
                  className="w-full px-4 py-3 rounded-xl border border-black bg-white/50 backdrop-blur-sm"
                  placeholder="Your Email"
                />
              </div>

              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-[#031636] mb-2">
                  Your Contact *
                </label>
                <Input
                  type="tel"
                  id="contact"
                  name="contact"
                  autoComplete="tel"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-black bg-white/50 backdrop-blur-sm"
                  placeholder="Your Contact"
                />
              </div>
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-[#031636] mb-2">
                Website / Social Media Link *
              </label>
              <Input
                type="url"
                id="website"
                name="website"
                autoComplete="url"
                value={formData.website}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-black bg-white/50 backdrop-blur-sm"
                placeholder="Your Website"
              />
            </div>

            <div>
              <span className="block text-sm font-medium text-[#031636] mb-4">
                What services are you interested in?
              </span>
              <div className="grid grid-cols-2 gap-4">
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
                      <label htmlFor={safeId} className="text-sm text-[#031636]">
                        {service}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Budget Field */}
            <div>
              <span id="budget-label" className="block text-sm font-medium text-[#031636] mb-2">
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
                <SelectTrigger className="w-full px-4 py-3 rounded-xl border border-black bg-white/50 backdrop-blur-sm">
                  <SelectValue placeholder="Select your budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6-10 Thousand">₹ 6–10 Thousand</SelectItem>
                  <SelectItem value="10-15 Thousand">₹ 10–15 Thousand</SelectItem>
                  <SelectItem value="15-20 Thousand">₹ 15–20 Thousand</SelectItem>
                  <SelectItem value="20+ Thousand">₹ 20+ Thousand</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Hear About Us Field */}
            <div>
              <span id="hear-about-label" className="block text-sm font-medium text-[#031636] mb-2">
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
                <SelectTrigger className="w-full px-4 py-3 rounded-xl border border-black bg-white/50 backdrop-blur-sm">
                  <SelectValue placeholder="Select how you heard about us" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="social-media">Social Media</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="google-search">Google Search</SelectItem>
                  <SelectItem value="behance">Behance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#031636] mb-2">
                Additional Message
              </label>
              <Textarea
                id="message"
                name="message"
                autoComplete="off"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-black bg-white/50 backdrop-blur-sm resize-none"
                placeholder="Tell me about your project and how I can help..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#031636] hover:bg-[#031636]/90 text-white py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Let's Connect!
            </Button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-center text-gray-600 mb-6">Or connect with me on social media</p>
            <div className="flex justify-center space-x-6">
              <a href="https://www.instagram.com/nevedpaharia/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/30 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 border border-white/20">
                <Instagram className="w-6 h-6 transition-all duration-300 ease-in-out" />
              </a>
              <a href="https://www.behance.net/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/30 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 border border-white/20">
                <img src="/behance.svg" alt="Behance" className="w-6 h-6" style={{ filter: 'none' }} />
              </a>
              <a href="https://www.facebook.com/nevedpaharia/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/30 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 border border-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 20 20" stroke="#031636" strokeWidth="1.5" className="w-6 h-6" style={{ display: 'block', margin: '0 auto' }}>
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
