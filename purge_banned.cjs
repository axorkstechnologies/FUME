const fs = require('fs');
const path = require('path');

// === PURGE MAP: file → list of {find, replace} ===
const replacements = {
  'src/components/BrandMarquee.tsx': [
    { find: "'GRASSE & PARIS'", replace: "'KARACHI · EST. 2024'" },
    { find: "'14+ HRS LONGEVITY'", replace: "'ALL-DAY PRESENCE'" },
    { find: "'BOTANICAL DISTILLATES'", replace: "'ARTISAN CRAFTED'" },
  ],
  'src/components/BrandStatement.tsx': [
    { find: 'True luxury does not clamor for attention. It commands through quiet presence and enduring depth.', replace: 'True refinement does not clamor for attention. It commands through quiet presence and enduring depth.' },
  ],
  'src/components/CareView.tsx': [
    { find: /European haute parfumerie standards/g, replace: 'artisan parfumerie standards' },
    { find: /Formulated with Grasse distillates[^']*/g, replace: 'Formulated with premium ingredients for lasting presence' },
  ],
  'src/components/CartDrawer.tsx': [
    { find: '{/* Luxury Pakistani Trust Strip */}', replace: '{/* Pakistani Trust Strip */}' },
    { find: /14\+ HOUR PERSISTENCE GUARANTEE/g, replace: 'ALL-DAY PERSISTENCE GUARANTEE' },
  ],
  'src/components/ContactView.tsx': [
    { find: /Private olfactory styling, bespoke monogr[^.]*/g, replace: 'Private olfactory styling, bespoke monogram engraving, and custom atelier consultations' },
    { find: /14 Rue de Castiglione[^<]*/g, replace: '' },
    { find: /\{\/\* Grasse Laboratory \*\/\}/g, replace: '' },
    { find: /GRASSE LABORATORY/g, replace: 'STUDIO' },
    { find: /8 Boulevard Fragonard[^<]*/g, replace: '32/A Society Office, PECHS Block 2, Kashmir Road, Karachi' },
    { find: /Grasse Private Consultation/g, replace: 'Private Consultation' },
    { find: /olfactory concierge in Grasse/g, replace: 'olfactory concierge' },
    { find: /Paris Atelier Appointment/g, replace: 'Studio Appointment' },
  ],
  'src/components/CustomScentAtelier.tsx': [
    { find: /Formulated at our Creation Lab in Grasse, France, and b/g, replace: 'B' },
  ],
  'src/components/EditorialBrand.tsx': [
    { find: 'ATELIER GRASSE', replace: 'ATELIER FUME' },
    { find: '14+ HRS', replace: 'ALL-DAY' },
  ],
  'src/components/FeaturedCollection.tsx': [
    { find: /formulated with pure botanical distillates and housed/g, replace: 'crafted with premium ingredients and housed' },
  ],
  'src/components/FilmPlayer.tsx': [
    { find: 'Subtle Hairline Luxury Gold Border', replace: 'Subtle Hairline Border' },
  ],
  'src/components/FlaconBottle.tsx': [
    { find: "fragrance.olfactoryFamily || 'Luxury'", replace: "fragrance.olfactoryFamily || 'Premium'" },
    { find: 'luxury product look', replace: 'premium product look' },
  ],
  'src/components/FlaconDetailModal.tsx': [
    { find: '5 x 5 ML LUXURY TESTERS', replace: '5 x 5 ML TESTERS' },
    { find: '14+ HRS PERSISTENCE', replace: 'ALL-DAY PERSISTENCE' },
    { find: /Grasse distillates bottled in architectural flint glass/g, replace: 'Premium ingredients bottled in architectural flint glass' },
  ],
  'src/components/PerfumesView.tsx': [
    { find: /Explore all signature FUME flacons, formulated in Grasse since 2024 for exceptional longevity/g, replace: 'Explore all FUME flacons, crafted since 2024 for exceptional presence and quality' },
  ],
  'src/components/ReelStrip.tsx': [
    { find: /luxury fragrances - handcrafted in Grasse, Pakistan-priced/g, replace: 'fragrances — handcrafted in Pakistan with premium ingredients' },
  ],
  'src/components/ScentQuizModal.tsx': [
    { find: 'Shared botanical distillates and mineral woods', replace: 'Shared accords and mineral woods' },
    { find: '14+ Hrs Persistence', replace: 'All-Day Presence' },
  ],
  'src/components/SEOSchema.tsx': [
    { find: /Luxury Eau de Parfum/g, replace: 'Eau de Parfum' },
    { find: /Formulated with Grasse distillates for 14\+ hours longevity/g, replace: 'Crafted with premium ingredients for lasting presence' },
    { find: /Our fragrances are formulated as true Eau de Parfum with high concentration \(22-28%\), ensuring 14\+ hours of longevity on skin and fabrics\./g, replace: 'Our fragrances are formulated as true Eau de Parfum with high concentration (22-28%), ensuring all-day presence on skin and fabrics.' },
    { find: /Our distillates are sourced and formulated at our Creation Lab in Grasse, France, and carefully bottled in Pakistan to ensure accessible luxury pricing without compromising quality\./g, replace: 'Our ingredients are carefully sourced and formulated, then bottled in Pakistan to ensure accessible pricing without compromising quality.' },
  ],
  'src/components/StoryModal.tsx': [
    { find: /At 24, as a young mother holding my child, I set out with a singular conviction: to create an independent luxury fragrance house right here in Pakistan\. Hand-testing botanical oil concentrations, perfecting all-day 14-hour sillage, and packaging every scent in heavy flint glass at honest prices\./g, replace: 'At 24, I set out with a singular conviction: to create an independent fragrance house right here in Pakistan. Hand-testing oil concentrations, perfecting all-day presence, and packaging every scent in heavy flint glass at honest prices.' },
    { find: /To make authentic, long-lasting luxury fragrances accessible to everyone in Pakistan through honest craftsmanship and direct pricing\./g, replace: 'To make authentic, long-lasting fragrances accessible to everyone in Pakistan through honest craftsmanship and direct pricing.' },
  ],
  'src/components/TestimonialsSection.tsx': [
    { find: 'pure luxury', replace: 'pure refinement' },
    { find: "14+ Hours", replace: "All-Day" },
  ],
  'src/data/films.ts': [
    { find: 'ARAB LUXURY FLACON AESTHETIC', replace: 'ARAB FLACON AESTHETIC' },
    { find: 'Pure luxury on the vanity', replace: 'Pure refinement on the vanity' },
    { find: 'PURE LUXURY IN A BOTTLE', replace: 'PURE REFINEMENT IN A BOTTLE' },
    { find: 'absolutely unmatched luxury', replace: 'absolutely unmatched quality' },
  ],
  'src/data/fragrances.ts': [
    { find: 'Grasse Tuberose', replace: 'Tuberose Absolute' },
  ],
};

for (const [file, rules] of Object.entries(replacements)) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    for (const rule of rules) {
      if (rule.find instanceof RegExp) {
        content = content.replace(rule.find, rule.replace);
      } else {
        // Simple string replace (all occurrences)
        while (content.includes(rule.find)) {
          content = content.replace(rule.find, rule.replace);
        }
      }
    }
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✓ ${file}`);
  } catch (e) {
    console.error(`✗ ${file}: ${e.message}`);
  }
}

// index.html - massive rewrite of meta tags
try {
  let html = fs.readFileSync('index.html', 'utf8');
  html = html.replace(/FUME FRAGRANCES \| Luxury Eau de Parfum \| Grasse & Karachi/g, 'FUME FRAGRANCES | Eau de Parfum | Karachi, Pakistan');
  html = html.replace(/Discover FUME Fragrances: A top-tier luxury fragrance house blending Grasse distillates with Pakistani craftsmanship\. Explore long-lasting luxury Eau de Parfum, custom scent ateliers, and bespoke flacons\. Est\. 2024\./g, 'Discover FUME Fragrances: An independent Pakistani fragrance house crafting premium Eau de Parfum since 2024. Explore signature and impression scents, custom atelier services, and bespoke flacons.');
  html = html.replace(/Fume, Fume Fragrances, Fume perfume, Fume scent, luxury eau de parfum Pakistan, Grasse perfume, long lasting perfume, custom fragrance, bespoke scents, artisan perfumery, signature scent/g, 'Fume, Fume Fragrances, Fume perfume, Fume scent, premium eau de parfum Pakistan, long lasting perfume, custom fragrance, bespoke scents, artisan perfumery, signature scent, Pakistani perfume brand');
  html = html.replace(/FUME FRAGRANCES \| Luxury Eau de Parfum \| Grasse & Karachi/g, 'FUME FRAGRANCES | Eau de Parfum | Karachi, Pakistan');
  html = html.replace(/A top-tier luxury fragrance house blending Grasse distillates with Pakistani craftsmanship\. Explore long-lasting luxury Eau de Parfum, custom scent ateliers, and bespoke flacons\./g, 'An independent Pakistani fragrance house crafting premium Eau de Parfum since 2024. Signature and impression scents, custom atelier services, and bespoke flacons.');
  html = html.replace(/FUME FRAGRANCES \| Luxury Perfume House/g, 'FUME FRAGRANCES | Premium Perfume House');
  html = html.replace(/A top-tier luxury fragrance house blending Grasse distillates with Pakistani craftsmanship\./g, 'An independent Pakistani fragrance house crafting premium Eau de Parfum since 2024.');
  html = html.replace(/Cinematic luxury Eau de Parfum bottles crafted in Grasse and Karachi/g, 'Cinematic Eau de Parfum bottles crafted in Karachi, Pakistan');
  html = html.replace(/An international luxury fragrance house bridging Grasse distillation with Pakistani artistry\. We create ultra-premium, long-lasting Eau de Parfum and offer bespoke custom scent atelier services\./g, 'An independent Pakistani fragrance house crafting premium, long-lasting Eau de Parfum and offering bespoke custom scent atelier services. Est. 2024.');
  html = html.replace(/Grasse Laboratory & Custom Scent Atelier for bespoke olfactory creation\./g, 'Custom Scent Atelier for bespoke olfactory creation.');
  html = html.replace(/"streetAddress": "8 Boulevard Fragonard"/g, '"streetAddress": "32/A Society Office, PECHS Block 2, Kashmir Road"');
  html = html.replace(/"addressLocality": "Grasse"/g, '"addressLocality": "Karachi"');
  // Also fix any remaining luxury/Grasse in index.html
  html = html.replace(/luxury/gi, 'premium');
  html = html.replace(/Grasse/g, 'Karachi');
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('✓ index.html');
} catch (e) {
  console.error(`✗ index.html: ${e.message}`);
}

// Also fix App.tsx description containing Grasse/14+
try {
  let app = fs.readFileSync('src/App.tsx', 'utf8');
  app = app.replace(/Formulated with Grasse distillates, 14\+ hour persistence/g, 'Crafted with premium ingredients, all-day presence');
  app = app.replace(/luxury/gi, 'premium');
  app = app.replace(/Grasse/g, 'Karachi');
  fs.writeFileSync('src/App.tsx', app, 'utf8');
  console.log('✓ src/App.tsx');
} catch (e) {
  console.error(`✗ src/App.tsx: ${e.message}`);
}

console.log('\n=== PURGE COMPLETE ===');
