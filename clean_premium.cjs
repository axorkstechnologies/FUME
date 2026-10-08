const fs = require('fs');
const path = require('path');

const filesToClean = [
  'src/components/FeaturedCollection.tsx',
  'src/components/PerfumesView.tsx',
  'src/components/FlaconDetailModal.tsx',
  'src/index.css'
];

for (const file of filesToClean) {
  const fullPath = path.join(__dirname, file);
  if (!fs.existsSync(fullPath)) continue;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  const original = content;
  
  // Remove rounded classes for architectural square look
  content = content.replace(/rounded-xs|rounded-sm|rounded-md|rounded-lg|rounded-xl|rounded-2xl|rounded-3xl|rounded-full/g, 'rounded-none');
  
  // Remove drop-shadows and box-shadows for a flat, modern aesthetic
  content = content.replace(/shadow-xs|shadow-sm|shadow-md|shadow-lg|shadow-xl|shadow-2xl/g, 'shadow-none');
  content = content.replace(/drop-shadow-sm|drop-shadow-md|drop-shadow-lg/g, '');
  content = content.replace(/hover:shadow-\[[^\]]+\]/g, '');
  
  // If it's the CSS file, strip out glass-panel/glass-card stuff if any exists
  if (file.includes('index.css')) {
    content = content.replace(/\.glass-panel\s*\{[^}]+\}/g, '');
    content = content.replace(/\.glass-card\s*\{[^}]+\}/g, '');
    content = content.replace(/\.glass-card:hover\s*\{[^}]+\}/g, '');
  }

  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Cleaned ${file} for extreme premium feel.`);
  }
}
