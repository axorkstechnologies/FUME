const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace raw numbers
      content = content.replace(/923132970468/g, '92381825636');
      content = content.replace(/\+92 313 297 0468/g, '+92 381 825 636');
      content = content.replace(/\+923132970468/g, '+92381825636');
      
      // Remove tel links entirely in ContactView
      if (fullPath.includes('ContactView.tsx')) {
        content = content.replace(/<a[^>]*href="tel:[^>]*>[\s\S]*?<\/a>/g, '');
      }
      
      // Same for CareView
      if (fullPath.includes('CareView.tsx')) {
        content = content.replace(/<a[^>]*href="tel:[^>]*>[\s\S]*?<\/a>/g, '');
      }

      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

processDir('.');
console.log('Numbers updated');
