const fs = require('fs');

function fix(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\? YOUR SCENT/g, '• YOUR SCENT');
  content = content.replace(/PAGES & DOSSIERS \? SINCE/g, 'PAGES & DOSSIERS • SINCE');
  content = content.replace(/GRASSE \? PARIS \? LONDON/g, 'GRASSE • PARIS • LONDON');
  content = content.replace(/Ac 2024/g, '© 2024');
  fs.writeFileSync(file, content, 'utf8');
}

fix('d:/FUME/FUME/src/components/HeroSection.tsx');
fix('d:/FUME/FUME/src/components/Header.tsx');
fix('d:/FUME/FUME/src/components/Footer.tsx');

console.log("Fixed encodings");
