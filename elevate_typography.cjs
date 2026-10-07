const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Typography weight boost
      content = content.replace(/font-light/g, 'font-normal');
      content = content.replace(/text-shadow\/40/g, 'text-shadow/70');
      content = content.replace(/text-shadow\/45/g, 'text-shadow/70');
      content = content.replace(/text-shadow\/50/g, 'text-shadow/80');
      content = content.replace(/text-shadow\/60/g, 'text-shadow/80');
      
      // Also elevate spacing on buttons: 'py-3' to 'py-4' in add to bag buttons
      content = content.replace(/py-3 bg-dusty-rose/g, 'py-4 bg-dusty-rose');
      
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

processDir('src/components');
console.log('Typography elevated');
