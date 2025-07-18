#!/usr/bin/env node

/**
 * Image Conversion Script for AVIF Optimization
 * 
 * This script converts existing images to AVIF format for better performance.
 * Requires ImageMagick or similar tools to be installed.
 * 
 * Usage:
 * 1. Install ImageMagick: sudo apt-get install imagemagick
 * 2. Run: node scripts/convert-images.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imagesToConvert = [
  // Logo
  'public/logo.png',
  
  // Professional photo
  'public/Professional Photo.webp',
  
  // Project highlights
  'public/project highlights/1.webp',
  'public/project highlights/2.webp',
  'public/project highlights/3.webp',
  'public/project highlights/4.webp',
  'public/project highlights/5.webp',
  
  // Testimonials
  'public/testimonials/Shashank Saboo.jpg',
  'public/testimonials/Shailendra Jain.jpg',
  'public/testimonials/Samridh Sharma.jpg',
  
  // Background images
  'public/background/paper 2.webp',
  'public/background/paper 3.webp',
  'public/background/background.webp'
];

function convertToAvif(inputPath) {
  const outputPath = inputPath.replace(/\.(png|jpg|jpeg|webp)$/i, '.avif');
  
  try {
    // Check if ImageMagick is available
    execSync('which convert', { stdio: 'ignore' });
    
    console.log(`Converting ${inputPath} to ${outputPath}...`);
    
    // Use ImageMagick to convert to AVIF
    execSync(`convert "${inputPath}" -quality 80 "${outputPath}"`, {
      stdio: 'inherit'
    });
    
    console.log(`✅ Successfully converted ${inputPath}`);
    
    // Get file sizes for comparison
    const originalSize = fs.statSync(inputPath).size;
    const avifSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - avifSize) / originalSize * 100).toFixed(1);
    
    console.log(`📊 Size comparison: ${(originalSize / 1024).toFixed(1)}KB → ${(avifSize / 1024).toFixed(1)}KB (${savings}% smaller)`);
    
  } catch (error) {
    console.error(`❌ Failed to convert ${inputPath}:`, error.message);
  }
}

function main() {
  console.log('🖼️  Starting image conversion to AVIF...\n');
  
  // Check if ImageMagick is available
  try {
    execSync('which convert', { stdio: 'ignore' });
    console.log('✅ ImageMagick found\n');
  } catch (error) {
    console.error('❌ ImageMagick not found. Please install it first:');
    console.error('   Ubuntu/Debian: sudo apt-get install imagemagick');
    console.error('   macOS: brew install imagemagick');
    console.error('   Windows: Download from https://imagemagick.org/\n');
    process.exit(1);
  }
  
  // Convert each image
  imagesToConvert.forEach(imagePath => {
    if (fs.existsSync(imagePath)) {
      convertToAvif(imagePath);
    } else {
      console.warn(`⚠️  File not found: ${imagePath}`);
    }
  });
  
  console.log('\n🎉 Image conversion complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Review the converted AVIF files');
  console.log('2. Test the website to ensure images load correctly');
  console.log('3. Consider adding WebP fallbacks for older browsers');
}

if (require.main === module) {
  main();
}

module.exports = { convertToAvif, imagesToConvert };