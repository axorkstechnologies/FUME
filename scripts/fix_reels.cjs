const fs = require('fs');

let file = 'd:/FUME/FUME/src/components/ReelStrip.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/bg-\[#0D0C0A\]/g, 'bg-pearl');
content = content.replace(/from-\[#1A1816\]\/80 via-\[#1A1816\]\/30/g, 'from-shadow/80 via-shadow/30');
content = content.replace(/text-\[#C49A88\]/g, 'text-dusty-rose drop-shadow-md');
content = content.replace(/outline-\[#C49A88\]/g, 'outline-dusty-rose');
content = content.replace(/bg-white\/20/g, 'bg-shadow/20');
content = content.replace(/text-shadow font-sans font-medium/g, 'text-white font-sans font-medium drop-shadow-md');

fs.writeFileSync(file, content, 'utf8');

console.log("Updated ReelStrip");

file = 'd:/FUME/FUME/src/components/ReelViewerModal.tsx';
content = fs.readFileSync(file, 'utf8');
content = content.replace(/bg-\[#0B0A09\]/g, 'bg-pearl');
content = content.replace(/from-\[#1A1816\]/g, 'from-shadow');
content = content.replace(/via-\[#1A1816\]/g, 'via-shadow');
content = content.replace(/text-\[#C49A88\]/g, 'text-dusty-rose');
content = content.replace(/bg-\[#C49A88\]/g, 'bg-dusty-rose');
content = content.replace(/text-white/g, 'text-shadow');
fs.writeFileSync(file, content, 'utf8');
console.log("Updated ReelViewerModal");

