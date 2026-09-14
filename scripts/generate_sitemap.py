import re

content = open('src/data/fragrances.ts', 'r', encoding='utf-8').read()
ids = re.findall(r"id:\s*'([a-z0-9-]+)'", content)

base_url = 'https://fume-six.vercel.app'
current_date = '2026-09-14'

static_pages = [
    ('/', '1.0', 'daily'),
    ('/#perfumes', '0.9', 'daily'),
    ('/#collections', '0.8', 'weekly'),
    ('/#story', '0.7', 'monthly'),
    ('/#contact', '0.7', 'monthly'),
    ('/#care', '0.7', 'weekly')
]

lines = ['<?xml version=\"1.0\" encoding=\"UTF-8\"?>', '<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">']

for loc, priority, changefreq in static_pages:
    lines.append('  <url>')
    lines.append(f'    <loc>{base_url}{loc}</loc>')
    lines.append(f'    <lastmod>{current_date}</lastmod>')
    lines.append(f'    <changefreq>{changefreq}</changefreq>')
    lines.append(f'    <priority>{priority}</priority>')
    lines.append('  </url>')

for pid in ids:
    lines.append('  <url>')
    lines.append(f'    <loc>{base_url}/#fragrance-{pid}</loc>')
    lines.append(f'    <lastmod>{current_date}</lastmod>')
    lines.append('    <changefreq>weekly</changefreq>')
    lines.append('    <priority>0.85</priority>')
    lines.append('  </url>')

lines.append('</urlset>')

open('public/sitemap.xml', 'w', encoding='utf-8').write('\n'.join(lines))
print(f'Generated public/sitemap.xml with {len(static_pages) + len(ids)} URLs')
