const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.resolve(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      results.push(filePath);
    }
  });
  return results;
};

const replacements = [
  // Gold accent colors -> dusty-rose
  [/#C5A059/g, '#C9A9A6'],      // gold accent -> dusty rose
  [/#F3D079/g, '#C9A9A6'],      // light gold -> dusty rose
  [/#E8C97E/g, '#C9A9A6'],      // champagne light -> dusty rose
  [/#E5C158/g, '#C9A9A6'],      // hover gold -> dusty rose
  [/#B8962E/g, '#C9A9A6'],      // dark gold -> dusty rose
  [/#9E8548/g, '#C9A9A6'],      // muted gold -> dusty rose
  [/#C49A88/g, '#C9A9A6'],      // old dusty rose variant -> canonical dusty rose
  
  // Dark backgrounds -> pearl/oyster
  [/bg-\[#141210\]/g, 'bg-shadow/5'],
  [/bg-\[#0c0c0c\]/g, 'bg-shadow/5'],
  [/bg-\[#141414\]/g, 'bg-pearl'],
  [/bg-\[#0E0D0C\]/g, 'bg-pearl'],
  [/bg-\[#1f1f1f\]/g, 'bg-shadow/5'],
  [/bg-\[#181512\]/g, 'bg-pearl'],
  [/bg-\[#13110F\]/g, 'bg-pearl'],
  [/bg-\[#0A0908\]/g, 'bg-pearl'],
  
  // Text colors
  [/text-\[#1A1816\]/g, 'text-shadow'],
  [/text-\[#FAF8F5\]/g, 'text-pearl'],
  [/text-\[#f5f4f0\]/g, 'text-shadow'],
  [/text-\[#EDE8E1\]/g, 'text-shadow/80'],
  
  // Border colors
  [/border-\[#E6DDD0\]/g, 'border-sand'],
  [/border-\[#E0D5C3\]/g, 'border-sand'],
  [/border-\[#262420\]/g, 'border-shadow/10'],
  [/border-\[#2A2A2A\]/g, 'border-shadow/10'],
  [/border-\[#1f1f1f\]/g, 'border-shadow/10'],
  [/border-\[#C5A059\]/g, 'border-dusty-rose'],
  [/border-\[#C49A88\]/g, 'border-dusty-rose'],
  
  // Accent color classes
  [/text-\[#C5A059\]/g, 'text-dusty-rose'],
  [/text-\[#C49A88\]/g, 'text-dusty-rose'],
  [/bg-\[#C5A059\]/g, 'bg-dusty-rose'],
  [/bg-\[#C49A88\]/g, 'bg-dusty-rose'],
  [/bg-\[#F5F1E8\]/g, 'bg-pearl'],
  [/bg-\[#FAF8F5\]/g, 'bg-pearl'],
  
  // focus colors
  [/focus:border-\[#C5A059\]/g, 'focus:border-dusty-rose'],
  [/outline-\[#C49A88\]/g, 'outline-dusty-rose'],
  [/outline-\[#C5A059\]/g, 'outline-dusty-rose'],
  
  // hover colors
  [/hover:bg-\[#C5A059\]/g, 'hover:bg-dusty-rose'],
  [/hover:border-\[#C5A059\]/g, 'hover:border-dusty-rose'],
  [/hover:bg-\[#FAF8F5\]/g, 'hover:bg-pearl'],
  
  // Inline style rgba references to gold -> dusty rose
  [/rgba\(212, 175, 55/g, 'rgba(201, 169, 166'],
  [/rgba\(196, 154, 136/g, 'rgba(201, 169, 166'],
  [/rgba\(197, 160, 89/g, 'rgba(201, 169, 166'],
  [/rgba\(180, 110, 50/g, 'rgba(201, 169, 166'],
  
  // Dark inline rgba backgrounds
  [/rgba\(10, 10, 10, 0\.85\)/g, 'rgba(248, 244, 240, 0.6)'],
  [/rgba\(26, 24, 22, 0\.6\)/g, 'rgba(248, 244, 240, 0.3)'],
  [/rgba\(0, 0, 0, 0\.85\)/g, 'rgba(44, 37, 34, 0.08)'],
  [/rgba\(0, 0, 0, 0\.6\)/g, 'rgba(44, 37, 34, 0.05)'],
  [/rgba\(0, 0, 0, 0\.7\)/g, 'rgba(44, 37, 34, 0.06)'],
  [/rgba\(0, 0, 0, 0\.9\)/g, 'rgba(44, 37, 34, 0.08)'],
  [/rgba\(0, 0, 0, 0\.3\)/g, 'rgba(44, 37, 34, 0.05)'],
  [/rgba\(0, 0, 0, 0\.65\)/g, 'rgba(44, 37, 34, 0.06)'],
  
  // Logo references
  [/logo-white\.png/g, 'logo-black.png'],
];

const files = walk('d:/FUME/FUME/src');
let totalUpdated = 0;

files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  
  replacements.forEach(([from, to]) => {
    content = content.replace(from, to);
  });

  if (original !== content) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${path.basename(file)}`);
    totalUpdated++;
  }
});

console.log(`\nTotal files updated: ${totalUpdated}`);
