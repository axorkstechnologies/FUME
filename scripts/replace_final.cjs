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
  // Near-pearl off-whites -> canonical pearl
  [/text-\[#E6DDD0\]/g, 'text-shadow/70'],
  [/text-\[#F9F6F0\]/g, 'text-pearl'],
  [/text-\[#f5f4f0\]/g, 'text-shadow'],
  [/text-\[#EDE8E1\]/g, 'text-shadow/80'],
  [/text-\[#FAF8F5\]/g, 'text-pearl'],
  [/bg-\[#F9F6F0\]/g, 'bg-pearl'],
  [/bg-\[#FAF8F5\]/g, 'bg-pearl'],
  [/bg-\[#F5F1E8\]/g, 'bg-pearl'],
  [/bg-\[#E6DDD0\]/g, 'bg-oyster'],
  [/border-\[#E6DDD0\]/g, 'border-sand'],
  [/border-\[#E3DDD3\]/g, 'border-sand'],
  [/border-\[#E0D5C3\]/g, 'border-sand'],
  [/hover:bg-\[#F9F6F0\]/g, 'hover:bg-pearl'],
  [/hover:bg-\[#FAF8F5\]/g, 'hover:bg-pearl'],
  [/hover:border-\[#C9A9A6\]/g, 'hover:border-dusty-rose'],
  [/border-\[#C9A9A6\]/g, 'border-dusty-rose'],
  [/hover:bg-\[#C9A9A6\]/g, 'hover:bg-dusty-rose'],
  [/bg-\[#C9A9A6\]/g, 'bg-dusty-rose'],
  [/text-\[#C9A9A6\]/g, 'text-dusty-rose'],
  
  // Data file: pastelBg value
  [/'#F9F6F0'/g, "'#F8F4F0'"],
  
  // bg-white in quiz -> bg-pearl
  // Leave bg-white alone as it's acceptable in light theme
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
