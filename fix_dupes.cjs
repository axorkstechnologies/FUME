const fs = require('fs');
let c = fs.readFileSync('src/data/fragrances.ts', 'utf8');
c = c.replace(/productType:\s*'([^']+)',\s*productType:\s*'([^']+)',/g, "productType: '$1',");
fs.writeFileSync('src/data/fragrances.ts', c);
console.log('Fixed duplicate keys');
