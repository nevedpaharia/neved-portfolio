import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const SEO: React.FC<SEOProps> = ({
  title = "Neved Paharia ✦ Personal Portfolio ✦ Brand Identity Designer | Logo Design, Brand Strategy, Visual Storytelling",
  description = "Award-winning brand identity designer from India. Specializing in logo design, brand strategy, and visual storytelling for businesses seeking a magnetic, memorable brand presence.",
  keywords = "brand identity designer, logo design, brand strategy, visual storytelling, India designer, creative director, portfolio",
  image = "https://nevedpaharia.com/og-image.jpg",
  url = "https://nevedpaharia.com",
  type = "website",
  author = "Neved Paharia",
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) => {
  const siteName = "Neved Paharia Portfolio";
  const twitterHandle = "@nevedpaharia";

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://nevedpaharia.com/" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:site" content={twitterHandle} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["Person", "WebSite"],
          "name": "Neved Paharia",
          "jobTitle": "Brand Identity Designer",
          "description": description,
          "url": url,
          "image": image,
          "sameAs": [
            "https://www.behance.net/nevedpaharia",
            "https://www.linkedin.com/in/nevedpaharia",
            "https://www.instagram.com/nevedpaharia"
          ],
          "worksFor": {
            "@type": "Organization",
            "name": "Freelance Designer"
          },
          "knowsAbout": ["Brand Identity Design", "Logo Design", "Visual Design", "Graphic Design", "Brand Consultation"],
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO; 