const fs = require('fs');

let c = fs.readFileSync('src/App.tsx', 'utf8');

c = c.replace(/import { TestimonialsSection } from '\.\/components\/TestimonialsSection';\r?\n/g, '');
c = c.replace(/\{\/\* 4\.5 TESTIMONIALS \*\/\}\r?\n\s*<TestimonialsSection \/>\r?\n/g, '');
c = c.replace(/\s*<TestimonialsSection \/>/g, '');

fs.writeFileSync('src/App.tsx', c);
console.log('Removed TestimonialsSection from App.tsx');
