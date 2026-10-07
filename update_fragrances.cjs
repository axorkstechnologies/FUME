const fs = require('fs');

let content = fs.readFileSync('src/data/fragrances.ts', 'utf8');

// 1. Remove all 'origin: ...' lines
content = content.replace(/\s*origin:\s*'.*?',/g, '');

// 2. Add productType based on ID
// ARAB and DESERT are 'signature', discovery-set is 'set', everything else is 'impression'
content = content.replace(/id:\s*'([^']+)',/g, (match, id) => {
  let type = 'impression';
  if (id === 'arab' || id === 'desert') {
    type = 'signature';
  } else if (id === 'discovery-set') {
    type = 'set';
  }
  return `${match}\n    productType: '${type}',`;
});

// We need to re-order so ARAB and DESERT are first, and discovery-set is last.
// This requires parsing the array. It's easier to do this in the app code or by a quick regex trick.
// Let's just write the changes back first.
fs.writeFileSync('src/data/fragrances.ts', content, 'utf8');
console.log('Done updating fragrances.ts');
