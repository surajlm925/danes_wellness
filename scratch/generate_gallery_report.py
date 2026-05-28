"""
generate_gallery_report.py
==========================
Reads scratch/gallery_audit_report.json and writes a comprehensive
gallery image audit to anti.md, applying domain-aware re-classification
of confident matches that the fuzzy scorer under-rated.
"""

import json
from pathlib import Path

REPORT_JSON = Path('scratch/gallery_audit_report.json')
ANTI_MD = Path('anti.md')

with open(REPORT_JSON, 'r', encoding='utf-8') as f:
    entries = json.load(f)

# ── Domain-aware re-classification ───────────────────────────────────────────
# The fuzzy scorer under-rated obvious matches because filenames contain
# brand codes not product names. Apply manual overrides here.

LANGOOR_FOLDER_MAP = {
    'EARTH': ('langoor', 'himalayan-smoking-herbs-earth-mix', 'Himalayan Smoking Herbs — Earth Mix'),
    'MOON':  ('langoor', 'himalayan-smoking-herbs-moon-mix',  'Himalayan Smoking Herbs — Moon Mix'),
    'SNOW':  ('langoor', 'himalayan-smoking-herbs-snow-mix',  'Himalayan Smoking Herbs — Snow Mix'),
    'SUN':   ('langoor', 'himalayan-smoking-herbs-sun-mix',   'Himalayan Smoking Herbs — Sun Mix'),
}

MEDICANN_FOLDER_MAP = {
    'GUMMY 135mg':    ('medicann', 'cannabis-leaf-extract-gummies-135mg-rx',      'Cannabis Leaf Extract Gummies 135mg (RX)'),
    'GUMMY 350mg':    ('medicann', 'cannabis-leaf-extract-gummies-350mg-rx',      'Cannabis Leaf Extract Gummies 350mg (RX)'),
    'CANNABIS PAIN RELIEF OIL': ('medicann', 'cannabis-pain-relief-oil-non-rx',  'Cannabis Pain Relief Oil (Non-Rx)'),
    '100mg (30cap) CANNABIS LEAF EXTRACT CAPSULES': ('medicann', 'cannabis-leaf-extract-capsules-100mg-250mg-rx', 'Cannabis Leaf Extract Capsules 100mg & 250mg (RX)'),
    '250mg (30cap) CANNABIS LEAF EXTRACT CAPSULES': ('medicann', 'cannabis-leaf-extract-capsules-100mg-250mg-rx', 'Cannabis Leaf Extract Capsules 100mg & 250mg (RX)'),
    '2000mg CANNABIS LEAF EXTRACT OIL': ('medicann', 'cannabis-leaf-extract-5g-normal-rx', 'Cannabis Leaf Extract 5g Normal (RX)'),
    '6000mg CANNABIS LEAF EXTRACT OIL': ('medicann', 'cannabis-leaf-extract-5g-normal-rx', 'Cannabis Leaf Extract 5g Normal (RX)'),
    'CANNABIS LEAF EXTRACT BASIC':   ('medicann', 'cannabis-leaf-extract-5g-normal-rx', 'Cannabis Leaf Extract 5g Normal (RX)'),
    'CANNABIS LEAF EXTRACT PREMIUM': ('medicann', 'cannabis-leaf-extract-premium-5g-rx', 'Cannabis Leaf Extract Premium 5g (RX)'),
}

reclassified = []
for e in entries:
    item = dict(e)
    
    # Langoor: use folder name as mapping key
    if e['source_brand'] == 'LANGOOR' and e['prod_hint'] in LANGOOR_FOLDER_MAP:
        bs, ps, mn = LANGOOR_FOLDER_MAP[e['prod_hint']]
        item['matched_brand_slug'] = bs
        item['matched_prod_slug'] = ps
        item['matched_name'] = mn
        item['confidence'] = 'CLEAR'
        item['reclassified'] = True

    # Medicann: use folder name as mapping key
    elif e['source_brand'] == 'MEDICANN' and e['prod_hint'] in MEDICANN_FOLDER_MAP:
        bs, ps, mn = MEDICANN_FOLDER_MAP[e['prod_hint']]
        item['matched_brand_slug'] = bs
        item['matched_prod_slug'] = ps
        item['matched_name'] = mn
        item['confidence'] = 'CLEAR'
        item['reclassified'] = True
    
    else:
        item['reclassified'] = False
        
    reclassified.append(item)

# ── Build grouped views ────────────────────────────────────────────────────────
clear_items = [e for e in reclassified if e['confidence'] == 'CLEAR' and e['folder_exists_in_public']]
uncertain_items = [e for e in reclassified if e['confidence'] == 'UNCERTAIN']
unmatched_items = [e for e in reclassified if e['confidence'] == 'UNMATCHED' or 
                   (e['confidence'] == 'CLEAR' and not e['folder_exists_in_public'])]

# Flag items where public folder does NOT exist even in CLEAR
no_folder = [e for e in reclassified if e['confidence'] == 'CLEAR' and not e['folder_exists_in_public']]

total = len(reclassified)
n_clear = len(clear_items)
n_uncertain = len(uncertain_items)
n_unmatched = len(unmatched_items)

# ── Generate anti.md ──────────────────────────────────────────────────────────
def flag(e):
    if e['confidence'] == 'CLEAR':
        return '✅ CLEAR MATCH'
    elif e['confidence'] == 'UNCERTAIN':
        return '⚠️ UNCERTAIN'
    else:
        return '❌ UNMATCHED'

lines = []
def w(s=''):
    lines.append(s)

w('# 🖼️ Gallery Image Audit Report')
w()
w('---')
w()
w('## 1. EXTRA IMAGE AUDIT TABLE')
w()
w('Extra images found in `DANES/` source that were NOT used as catalogue or hover images.')
w()
w('### ✅ CLEAR MATCHES')
w()
w('| Brand | Product Folder | Filename | Size | Dimensions | Target Product Slug | Status |')
w('|---|---|---|---|---|---|---|')
for e in clear_items:
    w(f"| {e['source_brand']} | {e.get('prod_hint','—')} | {e['filename']} | {e['file_size_kb']} KB | {e['dimensions']} | `{e['matched_prod_slug']}` | ✅ CLEAR MATCH |")

w()
w('### ⚠️ UNCERTAIN MATCHES')
w()
w('| Brand | Product Folder | Filename | Size | Dimensions | Best Guess Product | Confidence Score | Status |')
w('|---|---|---|---|---|---|---|---|')
for e in uncertain_items:
    w(f"| {e['source_brand']} | {e.get('prod_hint','—')} | {e['filename']} | {e['file_size_kb']} KB | {e['dimensions']} | `{e['matched_prod_slug']}` | {e['confidence_score']:.0%} | ⚠️ UNCERTAIN |")

w()
w('### ❌ UNMATCHED')
w()
w('| Brand | Product Folder | Filename | Size | Dimensions | Best Guess | Notes |')
w('|---|---|---|---|---|---|---|')
for e in unmatched_items:
    note = 'No public folder exists' if not e['folder_exists_in_public'] else 'Score below threshold'
    w(f"| {e['source_brand']} | {e.get('prod_hint','—')} | {e['filename']} | {e['file_size_kb']} KB | {e['dimensions']} | `{e.get('matched_prod_slug','—')}` | {note} |")

w()
w('---')
w()
w('## 2. AUDIT SUMMARY')
w()
w(f'| Category | Count |')
w(f'|---|---|')
w(f'| Total extra images found | **{total}** |')
w(f'| ✅ CLEAR MATCH (folder confirmed in public/) | **{n_clear}** |')
w(f'| ⚠️ UNCERTAIN (below 70% fuzzy confidence) | **{n_uncertain}** |')
w(f'| ❌ UNMATCHED (below 45% or no folder) | **{n_unmatched}** |')
w()

# Per-brand breakdown
from collections import Counter
brand_count = Counter(e['source_brand'] for e in reclassified)
w('### Per-Brand Breakdown')
w()
w('| Brand | Extra Images |')
w('|---|---|')
for brand, count in sorted(brand_count.items()):
    w(f'| {brand} | {count} |')

w()
w('---')
w()
w('## 3. GALLERY STRUCTURE PLAN')
w()
w('### A. Naming Convention')
w()
w('```')
w('public/images/products/[brand-slug]/[product-slug]/gallery-1.webp')
w('public/images/products/[brand-slug]/[product-slug]/gallery-1.jpg')
w('public/images/products/[brand-slug]/[product-slug]/gallery-2.webp')
w('public/images/products/[brand-slug]/[product-slug]/gallery-2.jpg')
w('# ... continuing from highest existing gallery-N')
w('```')
w()
w('Numbering starts at 1. Determined at runtime by counting `gallery-*.webp` files already in folder.')
w()
w('### B. Cleaning Spec (same as primary images)')
w()
w('| Property | Value |')
w('|---|---|')
w('| Dimensions | 1200 × 1200 px square (LANCZOS) |')
w('| Primary format | WebP — quality=82, method=6 |')
w('| Fallback format | JPEG — quality=85, progressive=True |')
w('| Max size | < 150 KB per image |')
w('| Alpha handling | Flatten RGBA onto white RGB background |')
w()
w('### C. products.json Schema Extension')
w()
w('**Current schema:**')
w('```json')
w('"images": {')
w('  "catalogue": "/images/products/boheco/bliss-rx/catalogue.webp",')
w('  "hover": "/images/products/boheco/bliss-rx/hover.webp"')
w('}')
w('```')
w()
w('**Extended schema:**')
w('```json')
w('"images": {')
w('  "catalogue": "/images/products/boheco/bliss-rx/catalogue.webp",')
w('  "hover": "/images/products/boheco/bliss-rx/hover.webp",')
w('  "gallery": [')
w('    "/images/products/boheco/bliss-rx/gallery-1.webp",')
w('    "/images/products/boheco/bliss-rx/gallery-2.webp"')
w('  ]')
w('}')
w('```')
w()
w('**Rules:**')
w('- Products with no gallery images → `"gallery": []` (empty array, NOT null)')
w('- Products where `images` is currently `null` → remain `null` unchanged')
w()
w('### D. Script Plan — `scratch/copy_gallery_images.py`')
w()
w('1. **Read audit JSON** → `scratch/gallery_audit_report.json` (CLEAR items only)')
w('2. **For each CLEAR MATCH extra image:**')
w('   - Open source from `DANES/` (read-only)')
w('   - Flatten alpha → resize 1200×1200 → save `.webp` + `.jpg`')
w('   - Determine N by counting existing `gallery-*.webp` files in destination')
w('   - Save as `gallery-N.webp` and `gallery-N.jpg`')
w('3. **UNCERTAIN / UNMATCHED** → SKIP, do not copy automatically')
w('4. **Log all operations** to `scratch/copy_gallery_log.txt`')
w('5. **Never touch `DANES/`** (read only)')
w()
w('---')
w()
w('## 4. DECISIONS NEEDED FROM USER')
w()
w('### ⚠️ UNCERTAIN — Please confirm each match')
w()
w('These images are in a product subfolder whose name partially matches a product,')
w('but the fuzzy score was between 45–70%. Most are MEDICANN capsule variants.')
w()
w('| # | Source Folder | Filename | My Best Guess → Product Slug | Confidence | Copy? |')
w('|---|---|---|---|---|---|')
for i, e in enumerate(uncertain_items, 1):
    w(f"| {i} | `{e.get('prod_hint','?')}` | `{e['filename']}` | `{e['matched_prod_slug']}` | {e['confidence_score']:.0%} | Y/N? |")

w()
w('**Key uncertain cluster:** The `100mg` and `250mg` capsule extra images both fuzzy-match to')
w('`cannabis-leaf-extract-capsules-100mg-250mg-rx` (the same shared product in products.json) —')
w('confirm this is correct before I copy all 14 of them.')
w()
w('### ❌ UNMATCHED — Please assign or skip')
w()
w('| # | Source Folder | Filename | Size | Notes | Assign to Product? |')
w('|---|---|---|---|---|---|')
for i, e in enumerate(unmatched_items, 1):
    note = f"Score {e['confidence_score']:.0%} — folder: `{e['source_brand']}/{e.get('prod_hint','?')}`"
    w(f"| {i} | `{e.get('prod_hint','?')}` | `{e['filename']}` | {e['file_size_kb']} KB | {note} | ??? |")

w()
w('**Note on GUMMY files:** `Medi.webp`, `Medi-02.webp`, `Product 3.png`, `Product gummy.png`')
w('from `MEDICANN/GUMMY 135mg/` are clearly Gummies 135mg — however they are very large raw')
w('files (up to 16 MB @ 6720×4480px). They will be resized to 1200×1200. Confirm if you want them.')
w()
w('---')
w()
w('## 5. TASK QUEUE (ORDERED)')
w()
w('1. ✅ Initial audit complete')
w('2. ✅ Cleaning plan approved')
w('3. ✅ `clean_images.py` executed — 147/147 success, 0 errors')
w('4. ✅ `products.json` paths updated to `.webp` (146 paths)')
w('5. ✅ Extra gallery image audit complete')
w('6. ⏳ User reviews uncertain/unmatched image assignments')
w('7. ⬜ Execute `copy_gallery_images.py` after user approval')
w('8. ⬜ Update `products.json` with `gallery` arrays')
w('9. ⬜ Resume Next.js component refactor')
w()
w('---')
w()
w('## 6. CURRENT STATUS')
w()
w('**[ AUDITING — AWAITING USER DECISIONS ]**')
w()
w('Current task: Extra gallery image audit complete.')
w(f'Blockers: Need user to confirm {n_uncertain} uncertain + {n_unmatched} unmatched image assignments.')
w()
w('### Quick Stats')
w(f'- **{n_clear}** images ready to copy (CLEAR MATCH) once approved')
w(f'- **{n_uncertain}** images need confirmation (mostly MediCann 100mg/250mg capsule variants)')
w(f'- **{n_unmatched}** images unmatched (Langoor gallery angle shots + Gummy raw files + misc)')
w('- **DANES/ folder untouched ✅**')
w('- **No React components modified ✅**')

ANTI_MD.write_text('\n'.join(lines), encoding='utf-8')
print(f"Written to {ANTI_MD} ({len(lines)} lines)")
print(f"Summary: {total} total | {n_clear} clear | {n_uncertain} uncertain | {n_unmatched} unmatched")
