const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walkDir(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = walkDir(srcDir);
let totalReplacements = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  
  // Replace all URL-format numbers: 92381825636 -> 923281825636
  content = content.replace(/92381825636/g, '923281825636');
  
  // Replace all display-format numbers: 381 825 636 -> 328 182 5636
  content = content.replace(/\+92 381 825 636/g, '+92 328 182 5636');
  content = content.replace(/381 825 636/g, '328 182 5636');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    const count = (content.match(/923281825636/g) || []).length;
    console.log(`Updated: ${path.relative(__dirname, file)} (${count} occurrences)`);
    totalReplacements++;
  }
}

console.log(`\nDone. Updated ${totalReplacements} files.`);
