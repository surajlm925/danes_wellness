"""
audit_gallery_images.py
=======================
Walks the DANES/ source folder and finds all images that were NOT used
as catalogue or hover sources in the original mapping. These are "extras"
that could become gallery images on the Product Detail Page (PDP).

Outputs a JSON report to scratch/gallery_audit_report.json
"""

import os
import json
import re
import difflib
from pathlib import Path
from PIL import Image

DANES_DIR = Path('DANES')
MAPPING_REPORT = Path('DANES/mapping_report.json')
OUTPUT_JSON = Path('scratch/gallery_audit_report.json')

VALID_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp'}
SKIP_FILES = {'.ds_store', 'thumbs.db', '.gitkeep'}

# ── Load mapping to know what was already used ────────────────────────────────
with open(MAPPING_REPORT, 'r', encoding='utf-8') as f:
    mapping = json.load(f)

# Build set of already-used source paths (normalized)
used_paths = set()
for m in mapping:
    if m.get('catalogue'):
        used_paths.add(Path(m['catalogue']).resolve())
    if m.get('hover'):
        used_paths.add(Path(m['hover']).resolve())

# Build lookup: brand/product slug -> existing public folder
# for match confirmation
public_products = {}
public_base = Path('public/images/products')
if public_base.exists():
    for brand_dir in public_base.iterdir():
        if brand_dir.is_dir():
            for prod_dir in brand_dir.iterdir():
                if prod_dir.is_dir():
                    key = f"{brand_dir.name}/{prod_dir.name}"
                    public_products[key] = prod_dir

# Load product names from mapping for fuzzy matching
product_records = []
for m in mapping:
    if m.get('catalogue'):  # only successfully mapped products
        product_records.append({
            'brand': m.get('brand', ''),
            'name': m.get('name', ''),
            'slug': m.get('slug', ''),
        })

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def fuzzy_match_product(filename_stem, brand_hint=None):
    """Match a filename stem to a product name. Returns (brand_slug, prod_slug, confidence, method)."""
    clean_stem = re.sub(r'[\(\)\[\]]', ' ', filename_stem)
    clean_stem = re.sub(r'\s+', ' ', clean_stem).strip()
    
    # If brand_hint given, filter to that brand first
    candidates = product_records
    if brand_hint:
        brand_hint_slug = slugify(brand_hint)
        filtered = [p for p in candidates if slugify(p['brand']) == brand_hint_slug]
        if filtered:
            candidates = filtered
    
    best_score = 0
    best_match = None
    
    for prod in candidates:
        name_clean = re.sub(r'[\(\)\[\]]', ' ', prod['name'])
        score = difflib.SequenceMatcher(None, clean_stem.lower(), name_clean.lower()).ratio()
        # Also try matching against slug
        slug_score = difflib.SequenceMatcher(None, slugify(clean_stem), prod['slug']).ratio()
        score = max(score, slug_score)
        if score > best_score:
            best_score = score
            best_match = prod
    
    if best_match and best_score > 0:
        brand_slug = slugify(best_match['brand'])
        # Map known brand redirects
        if best_match['brand'].upper() in ['CANAZO', 'CANNAZO']:
            brand_slug = 'cannazo'
        elif best_match['brand'].upper() == 'DWELLER':
            brand_slug = 'tea'
        
        folder_key = f"{brand_slug}/{best_match['slug']}"
        in_public = folder_key in public_products
        
        if best_score >= 0.70:
            confidence = 'CLEAR'
        elif best_score >= 0.45:
            confidence = 'UNCERTAIN'
        else:
            confidence = 'UNMATCHED'
            
        return brand_slug, best_match['slug'], best_match['name'], best_score, confidence, in_public
    
    return None, None, None, 0, 'UNMATCHED', False

def get_dimensions(path):
    try:
        with Image.open(path) as img:
            return img.size
    except Exception:
        return (0, 0)

# ── Walk DANES/ and collect all images ───────────────────────────────────────
extras = []

def walk_brands():
    for item in sorted(DANES_DIR.iterdir()):
        if not item.is_dir():
            continue
        brand_name = item.name
        if brand_name.upper() in ['BOHECO', 'CANNAZO']:
            # These have flat Catalogue/ and Hover Images/ — extras are OTHER named files
            # But for these brands the structure is just Catalogue + Hover, no extra files
            # (all their content is already their mapped files)
            cat_dir = item / 'Catalogue'
            hover_dir = item / 'Hover Images'
            if not hover_dir.exists():
                hover_dir = item / 'hover'
            
            # Check if there are files DIRECTLY in the brand folder (not in cat/hover)
            for f in item.iterdir():
                if f.is_file() and f.suffix.lower() in VALID_EXTENSIONS:
                    if f.name.lower() not in SKIP_FILES:
                        abs_path = f.resolve()
                        if abs_path not in used_paths:
                            yield brand_name, None, f
                            
        elif brand_name.upper() == 'TEA':
            # TEA has product subdirs each with Catalogue/, Hover/, and loose files
            for prod_dir in sorted(item.iterdir()):
                if not prod_dir.is_dir():
                    continue
                prod_name = prod_dir.name
                # Loose files in the product dir (not in Catalogue/ or Hover/)
                for f in sorted(prod_dir.iterdir()):
                    if f.is_file() and f.suffix.lower() in VALID_EXTENSIONS:
                        if f.name.lower() not in SKIP_FILES:
                            abs_path = f.resolve()
                            if abs_path not in used_paths:
                                yield brand_name, prod_name, f
                                
        elif brand_name.upper() == 'SOMA':
            # SOMA has product subdirs each with Catalogue/, Hover/, and loose extra files
            for prod_dir in sorted(item.iterdir()):
                if not prod_dir.is_dir():
                    continue
                prod_name = prod_dir.name
                for f in sorted(prod_dir.iterdir()):
                    if f.is_file() and f.suffix.lower() in VALID_EXTENSIONS:
                        if f.name.lower() not in SKIP_FILES:
                            abs_path = f.resolve()
                            if abs_path not in used_paths:
                                yield brand_name, prod_name, f
                                
        elif brand_name.upper() in ['HEMPLIFE', 'LANGOOR', 'MEDICANN']:
            # These have product subdirs each with Catalogue/ and Hover/
            for prod_dir in sorted(item.iterdir()):
                if not prod_dir.is_dir():
                    continue
                # Look for files DIRECTLY in prod_dir (not in Catalogue/Hover subdirs)
                for f in sorted(prod_dir.iterdir()):
                    if f.is_file() and f.suffix.lower() in VALID_EXTENSIONS:
                        if f.name.lower() not in SKIP_FILES:
                            abs_path = f.resolve()
                            if abs_path not in used_paths:
                                yield brand_name, prod_dir.name, f

for brand_name, prod_hint, img_path in walk_brands():
    file_size_kb = img_path.stat().st_size / 1024.0
    dims = get_dimensions(img_path)
    
    # Determine brand hint for matching
    brand_match_hint = brand_name
    if brand_name.upper() == 'TEA':
        brand_match_hint = 'Dweller'
    
    # Use prod_hint as primary signal if available
    search_stem = prod_hint if prod_hint else img_path.stem
    
    brand_slug, prod_slug, matched_name, score, confidence, in_public = fuzzy_match_product(
        search_stem, brand_hint=brand_match_hint
    )
    
    extras.append({
        'source_brand': brand_name,
        'prod_hint': prod_hint,
        'filename': img_path.name,
        'full_path': str(img_path),
        'file_size_kb': round(file_size_kb, 1),
        'dimensions': f"{dims[0]}x{dims[1]}",
        'matched_brand_slug': brand_slug,
        'matched_prod_slug': prod_slug,
        'matched_name': matched_name,
        'confidence_score': round(score, 2),
        'confidence': confidence,
        'folder_exists_in_public': in_public,
    })

# Save
with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
    json.dump(extras, f, indent=2, ensure_ascii=False)

total = len(extras)
clear = sum(1 for e in extras if e['confidence'] == 'CLEAR' and e['folder_exists_in_public'])
uncertain = sum(1 for e in extras if e['confidence'] == 'UNCERTAIN' or (e['confidence'] == 'CLEAR' and not e['folder_exists_in_public']))
unmatched = sum(1 for e in extras if e['confidence'] == 'UNMATCHED')

print(f"Extra images found: {total}")
print(f"  CLEAR MATCH:  {clear}")
print(f"  UNCERTAIN:    {uncertain}")
print(f"  UNMATCHED:    {unmatched}")
print(f"Saved to {OUTPUT_JSON}")
