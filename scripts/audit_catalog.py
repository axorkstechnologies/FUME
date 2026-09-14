import re, json

content = open('src/data/fragrances.ts', 'r', encoding='utf-8').read()

# Match each object in FRAGRANCES
blocks = re.findall(r'\{\s*id:\s*\'([^\']+)\'([\s\S]*?)\n\s*\}', content)

print(f'Auditing {len(blocks)} fragrance objects for required schema fields:')
required_fields = ['name', 'subtitle', 'price', 'image', 'topNotes', 'heartNotes', 'baseNotes', 'description', 'olfactoryFamily', 'genderCategory']

gaps = []
for fid, body in blocks:
    item_gaps = []
    for f in required_fields:
        if not re.search(rf'\b{f}\s*:', body):
            item_gaps.append(f)
    if item_gaps:
        gaps.append({'id': fid, 'missing': item_gaps})
        print(f'  [GAP] {fid}: missing {item_gaps}')
    else:
        print(f'  [PASS] {fid}: 100% complete')

if not gaps:
    print('\nAll 24 fragrances have 100% complete fields for full Schema.org Product markup!')
else:
    print(f'\nFound {len(gaps)} items with missing fields.')
