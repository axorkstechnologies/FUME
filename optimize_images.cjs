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

  // Find <img ... /> tags and inject loading="lazy" decoding="async" if not present
  // Need to be careful not to touch HeroSection which should be eager.
  if (path.basename(file) === 'HeroSection.tsx' || path.basename(file) === 'StoryView.tsx') {
    continue;
  }

  content = content.replace(/<img\s+([^>]*?)(\/?>)/g, (match, attrs, close) => {
    if (attrs.includes('loading=')) return match;
    return `<img ${attrs} loading="lazy" decoding="async" ${close}`;
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changes++;
    console.log(`Updated ${path.basename(file)}`);
  }
}
console.log(`Made image changes in ${changes} files.`);
