const fs = require('fs');

let c = fs.readFileSync('src/components/CartDrawer.tsx', 'utf8');

c = c.replace(
  /className="px-3 py-2 text-shadow\/60 hover:text-shadow transition-colors"/g,
  'className="w-10 h-10 flex items-center justify-center text-shadow/60 hover:text-shadow transition-colors" aria-label="Adjust quantity"'
);

c = c.replace(
  /<span className="px-2 text-\[10px\] font-sans text-shadow">/g,
  '<span className="w-6 text-center text-[10px] font-sans text-shadow">'
);

fs.writeFileSync('src/components/CartDrawer.tsx', c);
console.log('Updated CartDrawer.tsx touch targets');
