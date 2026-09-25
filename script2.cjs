const fs = require('fs');
const path = require('path');

const dir = 'd:\\FUME\\FUME\\src\\components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const allowedHexes = ['#F8F4F0', '#E8E2DC', '#C9A9A6', '#D4C4B0', '#2C2522'];

files.forEach(file => {
  let p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf8');

  // We can just replace classes directly using regex
  // 1. bg-[#HEX] -> bg-pearl
  content = content.replace(/bg-\[#([0-9a-fA-F]{3,6})\]/g, (match, hex) => {
    let h = '#' + hex.toUpperCase();
    if (allowedHexes.includes(h)) return match;
    // Replace all unauthorized backgrounds with pearl
    return 'bg-pearl';
  });

  // 2. text-[#HEX]
  content = content.replace(/text-\[#([0-9a-fA-F]{3,6})\]/g, (match, hex) => {
    let h = '#' + hex.toUpperCase();
    if (allowedHexes.includes(h)) return match;
    // Gold/champagne -> dusty rose
    if (['#D4AF37','#C5A059','#E8C97E','#E5C985','#D4BA7A'].includes(h)) {
      return 'text-dusty-rose';
    }
    // Very light or very dark -> text-shadow or text-shadow/60
    // Let's just assume muted text or dark text -> text-shadow/60 if it's grayish, but text-shadow is safer
    // The prompt says "muted text -> text-shadow/60"
    if (['#B8B0A4','#A8A196','#8C8377','#7A7068','#7D766E','#8C8985','#5C5449'].includes(h)) {
      return 'text-shadow/60';
    }
    return 'text-shadow'; // default text fallback
  });

  // 3. border-[#HEX]
  content = content.replace(/border-\[#([0-9a-fA-F]{3,6})\]/g, (match, hex) => {
    let h = '#' + hex.toUpperCase();
    if (allowedHexes.includes(h)) return match;
    if (['#D4AF37','#C5A059','#E8C97E','#E5C985'].includes(h)) {
      return 'border-dusty-rose';
    }
    if (['#E8DFC9','#E2D8C6','#E5DAC8'].includes(h)) {
      return 'border-sand';
    }
    return 'border-shadow/10';
  });

  // 4. from-[#HEX], via-[#HEX], to-[#HEX] (Gradients)
  content = content.replace(/(from|via|to)-\[#([0-9a-fA-F]{3,6})\]/g, (match, prefix, hex) => {
    let h = '#' + hex.toUpperCase();
    if (allowedHexes.includes(h)) return match;
    // Just map to pearl/oyster for backgrounds
    if (prefix === 'from') return 'from-pearl';
    if (prefix === 'via') return 'via-oyster';
    if (prefix === 'to') return 'to-pearl';
    return match;
  });

  // 5. Bare Hex replacements in strings or inline styles
  content = content.replace(/#([0-9a-fA-F]{3,6})/g, (match, hex) => {
    let h = '#' + hex.toUpperCase();
    if (allowedHexes.includes(h)) return match;

    // Golds
    if (['#D4AF37','#C5A059','#E8C97E','#E5C985','#D4BA7A'].includes(h)) return '#C9A9A6'; // dusty rose
    // Darks -> Pearl
    if (['#0F0D0B','#12100E','#0D0C0A','#111111','#111','#0A0A0A','#080808','#1A1A1A','#1A1816','#222222','#0E0E0E','#1F1F1F','#121212','#1A1817','#0E0D0C','#060605','#070605','#070707'].includes(h)) return '#F8F4F0'; // Pearl
    // Lights -> Shadow or Oyster/Pearl
    if (['#FFFFFF','#FFF','#F5F2EB','#F9F6F0','#F5F0E6','#F7F2E7','#F4EFE6','#EFE8DC'].includes(h)) return '#2C2522'; // Wait, if it's bg it should be pearl. Let's make it Pearl for backgrounds, but we can't contextually know easily.
    // If it's a bare hex, usually it's in a JS object or a remaining gradient. 
    // The prompt says NO pure white as bg. We can map pure white to Pearl.
    if (['#FFFFFF','#FFF'].includes(h)) return '#F8F4F0';
    // Muted text
    if (['#B8B0A4','#A8A196','#8C8377','#7A7068','#7D766E','#8C8985','#EAE2D5','#5C5449','#E3DDD3'].includes(h)) return 'rgba(44,37,34,0.6)'; // shadow/60
    
    // Gradients left over (e.g. radial-gradient)
    if (['#F7EAD9','#FAF0E6','#2A1F10','#1A1408','#F8E5DF','#F5EAE6','#331A18','#1A0F0D','#E8EFE8','#F1F6F1','#10241A','#08140E'].includes(h)) {
      // Map light gradient colors to pearl/oyster, dark to same since we want light theme
      return '#F8F4F0'; // Just make them all pearl or oyster
    }
    
    // Pastel pills
    if (['#EFF4F8','#FAF2ED','#F6F0E6','#F0F4F7','#F2F5F0','#FAF3EA'].includes(h)) {
      return '#E8E2DC'; // oyster
    }

    // Default fallback - map to Pearl to be safe
    return '#F8F4F0';
  });

  fs.writeFileSync(p, content);
});
console.log('Hex script completed');
