#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

// Check for unused imports and exports
function checkUnusedImports() {
  console.log('🔍 Checking for unused imports...\n');
  
  try {
    // Run ESLint to find unused imports
    const result = execSync('npm run lint', { encoding: 'utf8' });
    const lines = result.split('\n');
    const unusedImports = lines.filter(line => 
      line.includes('unused') || 
      line.includes('defined but never used') ||
      line.includes('imported but never used')
    );
    
    if (unusedImports.length > 0) {
      console.log('❌ Found unused imports/exports:');
      unusedImports.forEach(line => console.log(`   ${line}`));
    } else {
      console.log('✅ No unused imports found');
    }
  } catch (error) {
    console.log('⚠️  Could not check for unused imports (ESLint may not be configured)');
  }
}

// Check for large dependencies
function checkLargeDependencies() {
  console.log('\n📦 Checking for large dependencies...\n');
  
  try {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    console.log('Dependencies to consider for tree-shaking:');
    Object.entries(allDeps).forEach(([name, version]) => {
      console.log(`   ${name}: ${version}`);
    });
  } catch (error) {
    console.log('❌ Could not read package.json');
  }
}

// Check for large files
function checkLargeFiles() {
  console.log('\n📁 Checking for large files...\n');
  
  try {
    const result = execSync('find src -type f -name "*.tsx" -o -name "*.ts" | xargs wc -l | sort -nr | head -10', { encoding: 'utf8' });
    console.log('Largest TypeScript/React files:');
    console.log(result);
  } catch (error) {
    console.log('❌ Could not check file sizes');
  }
}

// Check for performance issues in code
function checkPerformanceIssues() {
  console.log('\n⚡ Checking for common performance issues...\n');
  
  const issues = [];
  
  // Check for missing dependency arrays in useEffect
  try {
    const result = execSync('grep -r "useEffect" src --include="*.tsx" --include="*.ts"', { encoding: 'utf8' });
    const lines = result.split('\n').filter(line => line.trim());
    
    lines.forEach(line => {
      if (line.includes('useEffect') && !line.includes('[]') && !line.includes('[')) {
        issues.push(`Potential missing dependency array: ${line.trim()}`);
      }
    });
  } catch (error) {
    // No useEffect found or grep failed
  }
  
  // Check for inline functions in JSX
  try {
    const result = execSync('grep -r "onClick.*=>" src --include="*.tsx"', { encoding: 'utf8' });
    const lines = result.split('\n').filter(line => line.trim());
    
    if (lines.length > 0) {
      issues.push(`Found ${lines.length} inline functions in JSX (consider using useCallback)`);
    }
  } catch (error) {
    // No inline functions found
  }
  
  if (issues.length > 0) {
    console.log('⚠️  Potential performance issues found:');
    issues.forEach(issue => console.log(`   ${issue}`));
  } else {
    console.log('✅ No obvious performance issues found');
  }
}

// Check bundle size
function checkBundleSize() {
  console.log('\n📊 Checking bundle size...\n');
  
  try {
    // Build the project
    console.log('Building project to analyze bundle size...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Check if build directory exists
    if (existsSync('dist')) {
      const result = execSync('du -sh dist/*', { encoding: 'utf8' });
      console.log('Bundle sizes:');
      console.log(result);
    }
  } catch (error) {
    console.log('❌ Could not build project or check bundle size');
  }
}

// Main function
async function main() {
  console.log('🚀 Starting performance analysis...\n');
  
  checkUnusedImports();
  checkLargeDependencies();
  checkLargeFiles();
  checkPerformanceIssues();
  checkBundleSize();
  
  console.log('\n✅ Performance analysis completed!');
  console.log('\n💡 Recommendations:');
  console.log('   - Run "npm run optimize-images" to compress large images');
  console.log('   - Consider code splitting for large components');
  console.log('   - Use React.memo for expensive components');
  console.log('   - Implement lazy loading for non-critical components');
}

main().catch(console.error); 