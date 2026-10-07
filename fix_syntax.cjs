const fs = require('fs');

const files = [
  'src/components/FeaturedCollection.tsx',
  'src/components/FragranceDiscovery.tsx',
  'src/components/PerfumesView.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  // It has `</motion.div>\n            ))` or similar. 
  // We need to change `))` to `);})` where appropriate.
  content = content.replace(/<\/motion.div>\s*\)\)/g, '</motion.div>\n            );})}');
  // Or more safely:
  content = content.replace(/<\/motion\.div>\s*\)\)/, '</motion.div>\n            );\n          })}');
  fs.writeFileSync(file, content, 'utf8');
}
console.log('Fixed syntax');
