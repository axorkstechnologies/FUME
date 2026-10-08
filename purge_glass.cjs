const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'components');

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else if (file.endsWith('.tsx')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walkDir(srcDir);
let changes = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Remove generic glassmorphism/shadows on cards/modals/wrappers
  content = content.replace(/\sbackdrop-blur-(sm|md|lg|xl|2xl|xs)/g, '');
  content = content.replace(/\sshadow-(sm|md|lg|xl|2xl|inner)/g, '');
  content = content.replace(/\sshadow-\[.*?\]/g, '');
  content = content.replace(/\srounded-(xs|sm|md|lg|xl|2xl|3xl)/g, '');
  // Replace bg-pearl/XX with pure bg-pearl for strict solid architecture, except overlays
  if (path.basename(file) === 'CartDrawer.tsx' || path.basename(file).includes('Modal')) {
    // Overlays can have transparency, but no blur.
  } else {
    content = content.replace(/bg-pearl\/\d+/g, 'bg-pearl');
    content = content.replace(/bg-shadow\/\d+/g, 'bg-shadow');
    content = content.replace(/bg-white\/\d+/g, 'bg-white');
  }

  // Clean TestimonialsSection specifically
  if (path.basename(file) === 'TestimonialsSection.tsx') {
    content = content.replace(/bg-shadow\/5\/80/g, 'bg-pearl');
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changes++;
    console.log(`Updated ${path.basename(file)}`);
  }
}
console.log(`Cleaned glass/shadows in ${changes} files.`);
