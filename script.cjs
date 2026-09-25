const fs = require('fs');
const path = require('path');

const files = [
  'FlaconDetailModal.tsx',
  'CartDrawer.tsx',
  'SearchModal.tsx',
  'BrandMarquee.tsx',
  'BrandStatement.tsx',
  'EditorialBrand.tsx',
  'FeaturedCollection.tsx',
  'FragranceDiscovery.tsx',
  'CampaignBanner.tsx',
  'TestimonialsSection.tsx',
  'FlaconBottle.tsx',
  'ScentQuizModal.tsx'
];

const dir = 'd:\\FUME\\FUME\\src\\components';

files.forEach(file => {
  let p = path.join(dir, file);
  if (!fs.existsSync(p)) { console.log('Missing:', file); return; }
  let content = fs.readFileSync(p, 'utf8');

  // Replace ternaries. Match 'isLight ? A : B'. We use a simple regex and multiple passes if needed.
  // This matches `isLight ? 'foo' : 'bar'` and `isLight ? "foo" : "bar"`
  content = content.replace(/isLight\s*\?\s*('[^']*')\s*:\s*('[^']*')/g, '$1');
  content = content.replace(/isLight\s*\?\s*("[^"]*")\s*:\s*("[^"]*")/g, '$1');
  content = content.replace(/isLight\s*\?\s*(`[^`]*`)\s*:\s*(`[^`]*`)/g, '$1');

  // After replacing ternaries, we might have `${'something'}` which we can leave or clean up, but react/tailwind is fine with it.

  // Hex colors to tailwind tokens:
  // Dark backgrounds
  content = content.replace(/bg-\[#(141414|1a1a1a|0a0a0a|000000|141210|111|222)\]/gi, 'bg-pearl');
  content = content.replace(/bg-black(\/[0-9]+)?/gi, 'bg-shadow$1');
  content = content.replace(/bg-white(\/[0-9]+)?/gi, 'bg-pearl$1');

  // Gold accents to dusty rose
  content = content.replace(/text-\[#(D4AF37|C5A059|E8C97E|B8860B|DAA520)\]/gi, 'text-dusty-rose');
  content = content.replace(/bg-\[#(D4AF37|C5A059|E8C97E|B8860B|DAA520)\]/gi, 'bg-dusty-rose');
  content = content.replace(/border-\[#(D4AF37|C5A059|E8C97E|B8860B|DAA520)\]/gi, 'border-dusty-rose');

  // Text color mapping
  content = content.replace(/text-\[#(F5F2EB|F9F6F0|FFFFFF|F8F4F0|E8E2DC)\]/gi, 'text-shadow');
  content = content.replace(/text-white(\/[0-9]+)?/gi, 'text-shadow$1');
  
  // Muted text
  content = content.replace(/text-\[#(9E9589|666666|888888)\]/gi, 'text-shadow/60');
  
  // rgba gold/amber
  content = content.replace(/rgba\(\s*212\s*,\s*175\s*,\s*55\s*,\s*([0-9.]+)\s*\)/g, 'rgba(201,169,166,$1)');
  content = content.replace(/rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*([0-9.]+)\s*\)/g, 'rgba(44,37,34,$1)');

  // logo
  content = content.replace(/logo-white\.png/g, 'logo-black.png');

  // Fix borders
  content = content.replace(/border-white(\/[0-9]+)?/gi, 'border-shadow$1');

  // Inline styles hex colors replacement where tailwind can't be used (like inline style objects)
  // #141414 -> #F8F4F0
  content = content.replace(/#141414/g, '#F8F4F0');
  content = content.replace(/#141210/g, '#F8F4F0');
  content = content.replace(/#D4AF37/gi, '#C9A9A6');
  content = content.replace(/#C5A059/gi, '#C9A9A6');
  content = content.replace(/#F5F2EB/gi, '#2C2522');
  content = content.replace(/#F9F6F0/gi, '#2C2522');
  content = content.replace(/#9E9589/gi, 'rgba(44,37,34,0.6)');
  
  // Specifically requested in instructions:
  // "Any light text on dark -> text-shadow"
  // "NO pure black, NO pure white as background, NO gold/amber"

  fs.writeFileSync(p, content);
});
console.log('Script completed');
