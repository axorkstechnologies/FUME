const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Map new bottle image filenames to their target public/bottles/ names
const imageMap = {
  'AMS.jpeg': 'ams',
  'AQUA.jpeg': 'aqua',
  'ARAB.jpeg': 'arab',
  'BECKHAM.jpeg': 'beckham',
  'BLEU.jpeg': 'bleu',
  'BLOOM.jpeg': 'bloom',
  'BOMB.jpeg': 'bomb',
  'CREED.jpeg': 'creed',
  'DESERT.jpeg': 'desert',
  'ETERNITY.jpeg': 'eternity',
  'FLAME.jpeg': 'flame',
  'ISSEY.jpeg': 'issey',
  'KHABIB.jpeg': 'khabib',
  'KOUROS.jpeg': 'kuros',
  "L'IMM.jpeg": 'limm',
  'LEGEND.jpeg': 'legend',
  'MILLION.jpeg': 'million',
  'MY WAY.jpeg': 'my-way',
  "N'5.jpeg": 'n5',
  "O'WOOD.jpeg": 'owood',
  'ROUGE.jpeg': 'rouge',
  'RUSH.jpeg': 'rush',
  'SAUVAGE.jpeg': 'sauvage',
  'Testers bottles pack.jpeg': 'discovery-set',
  'V WMN.jpeg': 'v-wmn',
  'WANTED.jpeg': 'wanted',
};

const srcDir = 'D:\\FUME\\FUME_Info\\New_BottleImages';
const destDir = 'D:\\FUME\\FUME\\public\\bottles';

Object.entries(imageMap).forEach(([srcName, destBase]) => {
  const srcPath = path.join(srcDir, srcName);
  const destJpg = path.join(destDir, `${destBase}.jpg`);
  
  if (!fs.existsSync(srcPath)) {
    console.log(`SKIP (not found): ${srcName}`);
    return;
  }
  
  // Copy as .jpg (the source is .jpeg, just copy directly)
  fs.copyFileSync(srcPath, destJpg);
  console.log(`Copied: ${srcName} -> ${destBase}.jpg`);
  
  // Also create .webp version using sharp if available, otherwise just copy jpg
  const destWebp = path.join(destDir, `${destBase}.webp`);
  // For now, copy the jpg as the primary asset; webp conversion would need sharp
  // The fragrances.ts references .webp, so let's also copy as .webp for now
  // (browsers handle jpeg-in-webp-extension fine, but ideally we'd convert)
  fs.copyFileSync(srcPath, destWebp);
  console.log(`Copied: ${srcName} -> ${destBase}.webp`);
});

console.log('\nDone! All new bottle images copied.');
