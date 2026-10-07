const fs = require('fs');

let content = fs.readFileSync('src/data/fragrances.ts', 'utf8');

// Instead of parsing the massive array, let's just sort the FRAGRANCES array at the end of the file.
// Or we can just do it in the file. Wait, in fragrances.ts:
if (!content.includes('// Sort logic applied')) {
  content += `\n// Sort logic applied
export const SORTED_FRAGRANCES = [...FRAGRANCES].sort((a, b) => {
  if (a.id === 'arab' || a.id === 'desert') {
    if (b.id !== 'arab' && b.id !== 'desert') return -1;
  }
  if (b.id === 'arab' || b.id === 'desert') {
    if (a.id !== 'arab' && a.id !== 'desert') return 1;
  }
  if (a.id === 'discovery-set') return 1;
  if (b.id === 'discovery-set') return -1;
  return 0;
});
`;
  // Now we need to replace exports of FRAGRANCES with SORTED_FRAGRANCES in the rest of the app, 
  // or rename FRAGRANCES to RAW_FRAGRANCES and SORTED_FRAGRANCES to FRAGRANCES.
  
  content = content.replace('export const FRAGRANCES: Fragrance[] = [', 'const RAW_FRAGRANCES: Fragrance[] = [');
  content = content.replace('// Sort logic applied', 'export const FRAGRANCES: Fragrance[] = [...RAW_FRAGRANCES].sort((a, b) => {');
  content = content.replace('export const SORTED_FRAGRANCES = [...FRAGRANCES]', '');
  
  fs.writeFileSync('src/data/fragrances.ts', content, 'utf8');
}
console.log('Reordered');
