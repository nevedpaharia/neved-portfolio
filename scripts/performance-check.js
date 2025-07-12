#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const BUILD_DIR = 'dist';

function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2); // KB
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeBuild() {
  console.log('🔍 Analyzing build performance...\n');

  if (!fs.existsSync(BUILD_DIR)) {
    console.log('❌ Build directory not found. Run "npm run build" first.');
    return;
  }

  const files = [];
  const totalSize = { js: 0, css: 0, assets: 0, total: 0 };

  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else {
        const size = stat.size;
        const ext = path.extname(item);
        
        if (ext === '.js') {
          totalSize.js += size;
        } else if (ext === '.css') {
          totalSize.css += size;
        } else {
          totalSize.assets += size;
        }
        
        totalSize.total += size;
        
        files.push({
          name: item,
          path: fullPath.replace(BUILD_DIR, ''),
          size: size,
          sizeFormatted: formatBytes(size)
        });
      }
    });
  }

  scanDirectory(BUILD_DIR);

  // Sort files by size
  files.sort((a, b) => b.size - a.size);

  console.log('📊 Build Analysis Results:\n');
  
  console.log('📁 Total Build Size:', formatBytes(totalSize.total));
  console.log('📄 JavaScript:', formatBytes(totalSize.js));
  console.log('🎨 CSS:', formatBytes(totalSize.css));
  console.log('🖼️  Assets:', formatBytes(totalSize.assets));
  
  console.log('\n📋 Largest Files:');
  files.slice(0, 10).forEach((file, index) => {
    console.log(`${index + 1}. ${file.path} - ${file.sizeFormatted}`);
  });

  // Performance recommendations
  console.log('\n💡 Performance Recommendations:');
  
  if (totalSize.js > 500 * 1024) { // 500KB
    console.log('⚠️  JavaScript bundle is large. Consider code splitting.');
  }
  
  if (totalSize.css > 100 * 1024) { // 100KB
    console.log('⚠️  CSS bundle is large. Consider purging unused styles.');
  }
  
  if (totalSize.assets > 2 * 1024 * 1024) { // 2MB
    console.log('⚠️  Assets are large. Consider optimizing images.');
  }

  // Check for gzip compression
  try {
    const gzipFiles = files.filter(f => f.name.endsWith('.gz'));
    if (gzipFiles.length > 0) {
      console.log('✅ Gzip compression detected');
    } else {
      console.log('⚠️  Gzip compression not found. Consider enabling it.');
    }
  } catch (error) {
    console.log('⚠️  Could not check compression status');
  }

  console.log('\n🎯 Target Metrics:');
  console.log('- Total size: < 2MB');
  console.log('- JavaScript: < 500KB');
  console.log('- CSS: < 100KB');
  console.log('- First Contentful Paint: < 1.5s');
  console.log('- Largest Contentful Paint: < 2.5s');
}

// Run analysis
analyzeBuild(); 