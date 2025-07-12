#!/usr/bin/env node

import { execSync } from 'child_process';
import { readdir, stat } from 'fs/promises';
import path from 'path';

const PUBLIC_DIR = 'public';
const MAX_SIZE_KB = 300;

// Check if ImageMagick is installed
function checkImageMagick() {
  try {
    execSync('convert --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Convert image to WebP with compression
async function convertToWebP(inputPath, outputPath, quality = 80) {
  try {
    const command = `convert "${inputPath}" -quality ${quality} -define webp:lossless=false "${outputPath}"`;
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ Converted: ${inputPath} -> ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to convert ${inputPath}:`, error.message);
    return false;
  }
}

// Get file size in KB
async function getFileSize(filePath) {
  const stats = await stat(filePath);
  return Math.round(stats.size / 1024);
}

// Process directory recursively
async function processDirectory(dirPath) {
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        const isImage = ['.jpg', '.jpeg', '.png'].includes(ext);
        
        if (isImage) {
          const sizeKB = await getFileSize(fullPath);
          
          if (sizeKB > MAX_SIZE_KB) {
            console.log(`📁 Processing large image: ${fullPath} (${sizeKB}KB)`);
            
            const baseName = path.basename(entry.name, ext);
            const webpPath = path.join(path.dirname(fullPath), `${baseName}.webp`);
            
            // Convert to WebP
            const success = await convertToWebP(fullPath, webpPath);
            
            if (success) {
              const newSizeKB = await getFileSize(webpPath);
              const savings = Math.round(((sizeKB - newSizeKB) / sizeKB) * 100);
              console.log(`📊 Size reduction: ${sizeKB}KB -> ${newSizeKB}KB (${savings}% smaller)`);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error.message);
  }
}

// Main function
async function main() {
  console.log('🚀 Starting image optimization...\n');
  
  if (!checkImageMagick()) {
    console.error('❌ ImageMagick is not installed. Please install it first:');
    console.error('   Ubuntu/Debian: sudo apt-get install imagemagick');
    console.error('   macOS: brew install imagemagick');
    console.error('   Windows: Download from https://imagemagick.org/');
    process.exit(1);
  }
  
  try {
    await processDirectory(PUBLIC_DIR);
    console.log('\n✅ Image optimization completed!');
  } catch (error) {
    console.error('❌ Optimization failed:', error.message);
    process.exit(1);
  }
}

main();