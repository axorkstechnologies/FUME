const fs = require('fs');
const path = require('path');

const dir = 'd:\\FUME\\FUME\\src\\components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  let p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf8');

  // Replace `isLight ? X : X` with `X`
  content = content.replace(/isLight\s*\?\s*('[^']*')\s*:\s*('[^']*')/g, (match, p1, p2) => p1);
  content = content.replace(/isLight\s*\?\s*("[^"]*")\s*:\s*("[^"]*")/g, (match, p1, p2) => p1);
  content = content.replace(/isLight\s*\?\s*(`[^`]*`)\s*:\s*(`[^`]*`)/g, (match, p1, p2) => p1);

  // Replace `isLight ? fragrance.pastelBg : '#F8F4F0'` with `fragrance.pastelBg`
  content = content.replace(/isLight\s*\?\s*(fragrance\.pastelBg)\s*:\s*'#F8F4F0'/g, '$1');

  // Multi-line ternaries starting with `isLight \n ? ... : ...`
  // We can just try to replace `isLight ? 'text-shadow' : 'text-shadow'` 
  // It was already done by the regex if they are on same line. Let's do it regardless of newlines.
  
  fs.writeFileSync(p, content);
});
console.log('isLight script completed');
