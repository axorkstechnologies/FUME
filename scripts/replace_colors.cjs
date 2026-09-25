const fs = require('fs');
const path = require('path');

const walk = (dir, done) => {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach((file) => {
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
          }
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

const replacements = [
  // Backgrounds
  { from: /bg-\[#0B0A09\]/g, to: 'bg-pearl' },
  { from: /bg-\[#090807\]/g, to: 'bg-oyster' }, // Footer
  { from: /bg-\[#1A1816\]/g, to: 'bg-oyster' }, // Other dark bg
  { from: /bg-black/g, to: 'bg-pearl' },

  // Text colors
  { from: /text-\[#F5F2EB\]/g, to: 'text-shadow' },
  { from: /text-\[#D6C7B2\]/g, to: 'text-shadow/80' },
  { from: /text-\[#9E9589\]/g, to: 'text-shadow/60' },
  { from: /text-\[#666666\]/g, to: 'text-shadow/40' },
  { from: /text-\[#D4AF37\]/g, to: 'text-dusty-rose' },
  { from: /text-white/g, to: 'text-shadow' },
  { from: /text-black/g, to: 'text-pearl' },

  // Accent Colors
  { from: /bg-\[#D4AF37\]/g, to: 'bg-dusty-rose' },
  { from: /border-\[#D4AF37\]/g, to: 'border-dusty-rose' },
  { from: /border-white/g, to: 'border-shadow' },
  { from: /border-\[#333333\]/g, to: 'border-shadow/10' },

  // Gradients
  { from: /from-black/g, to: 'from-pearl' },
  { from: /via-black/g, to: 'via-pearl' },
  { from: /to-black/g, to: 'to-pearl' },

  // Logos
  { from: /logo-white\.png/g, to: 'logo-black.png' },
];

walk('d:/FUME/FUME/src', (err, results) => {
  if (err) throw err;
  results.forEach((file) => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    replacements.forEach(({from, to}) => {
      content = content.replace(from, to);
    });

    if (original !== content) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  });
});
