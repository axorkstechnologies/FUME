const fs = require('fs');

// Patch 1: FlaconDetailModal reviews
let flacon = fs.readFileSync('src/components/FlaconDetailModal.tsx', 'utf8');
flacon = flacon.replace(/<div className="flex items-center gap-2 pt\.0\.5">[\s\S]*?<\/div>/, ''); // The regex might fail due to the dot in pt-0.5, wait, the class is pt-0.5.
// Let's just use precise string replacement for the reviews.
flacon = flacon.replace(/<div className="flex items-center gap-2 pt-0\.5">\s*<span className="text-xs text-dusty-rose font-sans tracking-tight">★★★★★<\/span>\s*<span className="text-\[10px\] uppercase tracking-\[0\.2em\] font-sans text-shadow\/80">\s*4\.9 \(140\+ Verified Reviews\)\s*<\/span>\s*<\/div>/, '');

// Patch JSON-LD
flacon = flacon.replace(/,\s*aggregateRating:\s*\{\s*'@type':\s*'AggregateRating',\s*ratingValue:\s*'4\.9',\s*reviewCount:\s*'142'\s*\}/, '');
fs.writeFileSync('src/components/FlaconDetailModal.tsx', flacon);

// Patch 2: ScentQuizModal stat
let quiz = fs.readFileSync('src/components/ScentQuizModal.tsx', 'utf8');
quiz = quiz.replace('98% Profile Alignment • Signature Recommendation', 'YOUR SIGNATURE MATCH');
fs.writeFileSync('src/components/ScentQuizModal.tsx', quiz);

// Patch 3: FragranceDiscovery shadows
let disc = fs.readFileSync('src/components/FragranceDiscovery.tsx', 'utf8');
disc = disc.replace(/hover:shadow-\[0_16px_40px_rgba\(18,17,16,0\.08\)\]/g, '');
disc = disc.replace(/drop-shadow-sm/g, 'drop-shadow-none');
disc = disc.replace(/shadow-xs/g, 'shadow-none');
disc = disc.replace(/rounded-full/g, 'rounded-none');
fs.writeFileSync('src/components/FragranceDiscovery.tsx', disc);

// Patch 4: ReelStrip corners
let reel = fs.readFileSync('src/components/ReelStrip.tsx', 'utf8');
reel = reel.replace(/rounded-b-2xl/g, '');
reel = reel.replace(/rounded-full/g, 'rounded-none');
fs.writeFileSync('src/components/ReelStrip.tsx', reel);

console.log('Patched');
