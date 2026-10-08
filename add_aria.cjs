const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'components');

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else if (file.endsWith('.tsx')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walkDir(srcDir);
let changes = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Header.tsx menu button
  content = content.replace(
    /<button\s*\n\s*onClick=\{\(\) => setMobileMenuOpen/g,
    '<button aria-label="Toggle mobile menu"\n              onClick={() => setMobileMenuOpen'
  );

  // Close buttons with X icon
  content = content.replace(
    /<button\s+onClick=\{onClose\}\s+className="([^"]*)"\s*>\s*<X /g,
    '<button aria-label="Close" onClick={onClose} className="$1">\n          <X '
  );
  content = content.replace(
    /<button\s+onClick=\{\(\) => onClose\(\)\}\s+className="([^"]*)"\s*>\s*<X /g,
    '<button aria-label="Close" onClick={() => onClose()} className="$1">\n          <X '
  );
  content = content.replace(
    /<button\s+onClick=\{onClose\}\s+className="([^"]*)"\s*>\s*\{?.*<X /g,
    '<button aria-label="Close" onClick={onClose} className="$1">\n          <X '
  );

  // Wait, let's just do a regex replace for any <button... containing <X or <Search or <ShoppingBag inside it if it lacks aria-label
  // A bit risky. Better to do it via a more robust script or manual replacements.

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changes++;
    console.log(`Updated ${path.basename(file)}`);
  }
}
console.log(`Made aria-label changes in ${changes} files.`);
