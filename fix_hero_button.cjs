const fs = require('fs');

let c = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');

c = c.replace(
  /hover:bg-pearl active:scale-\[0\.98\] cursor-pointer/g,
  'hover:bg-pearl hover:text-shadow active:scale-[0.98] cursor-pointer'
);

fs.writeFileSync('src/components/HeroSection.tsx', c);
console.log('Fixed HeroSection button hover state');
