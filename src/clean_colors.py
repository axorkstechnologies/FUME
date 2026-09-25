import os
import re

files = [
    r"d:\FUME\FUME\src\components\StoryView.tsx",
    r"d:\FUME\FUME\src\components\CareView.tsx",
    r"d:\FUME\FUME\src\components\ContactView.tsx",
    r"d:\FUME\FUME\src\components\ContactModal.tsx",
    r"d:\FUME\FUME\src\components\StoryModal.tsx",
    r"d:\FUME\FUME\src\components\AccountModal.tsx",
    r"d:\FUME\FUME\src\components\CollectionsView.tsx",
    r"d:\FUME\FUME\src\components\PerfumesView.tsx"
]

def replace_classes(content):
    # Regex rules
    
    # 1. Backgrounds
    content = re.sub(r'bg-\[#(F7F3EB|111111|F5F0E6|F6F0E6|F0F4F7|FAF2ED)\]', 'bg-pearl', content)
    
    # 2. Text colors
    content = re.sub(r'text-\[#(5C5449|6B6357|7D766E|8c8985|8C8377|B8B0A4|7A7068|EAE2D5)\]', 'text-shadow/60', content)
    
    # 3. Borders
    content = re.sub(r'border-\[#(E8DFC9|1A1816|222222|E2D8C6|FAF5EE)\]', 'border-shadow/10', content)
    
    # Also handle pastelTag: '#FAF2ED'
    content = re.sub(r"'#(FAF2ED|F6F0E6|F0F4F7)'", "'#F8F4F0'", content) # Use PEARL
    
    # Any other leftover # colors that aren't the palette.
    # #F8F4F0, #E8E2DC, #C9A9A6, #D4C4B0, #2C2522
    
    return content

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    content = replace_classes(content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
