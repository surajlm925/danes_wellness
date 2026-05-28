import os
import sys
import json
from pathlib import Path
from PIL import Image

# ── Paths ────────────────────────────────────────────────────────────────────
DANES_DIR         = Path('DANES')
PUBLIC_IMAGES_DIR = Path('public/images/products')
LOG_FILE          = Path('scratch/copy_gallery_log.txt')
AUDIT_JSON        = Path('scratch/gallery_audit_report.json')

WEBP_QUALITY      = 82
WEBP_METHOD       = 6
JPEG_QUALITY      = 85
TARGET_SIZE       = (1200, 1200)

# ── Re-classification maps ───────────────────────────────────────────────────
LANGOOR_FOLDER_MAP = {
    'EARTH': ('langoor', 'himalayan-smoking-herbs-earth-mix'),
    'MOON':  ('langoor', 'himalayan-smoking-herbs-moon-mix'),
    'SNOW':  ('langoor', 'himalayan-smoking-herbs-snow-mix'),
    'SUN':   ('langoor', 'himalayan-smoking-herbs-sun-mix'),
}

MEDICANN_FOLDER_MAP = {
    'GUMMY 135mg':    ('medicann', 'cannabis-leaf-extract-gummies-135mg-rx'),
    'GUMMY 350mg':    ('medicann', 'cannabis-leaf-extract-gummies-350mg-rx'),
    'CANNABIS PAIN RELIEF OIL': ('medicann', 'cannabis-pain-relief-oil-non-rx'),
    '100mg (30cap) CANNABIS LEAF EXTRACT CAPSULES': ('medicann', 'cannabis-leaf-extract-capsules-100mg-250mg-rx'),
    '250mg (30cap) CANNABIS LEAF EXTRACT CAPSULES': ('medicann', 'cannabis-leaf-extract-capsules-100mg-250mg-rx'),
    '2000mg CANNABIS LEAF EXTRACT OIL': ('medicann', 'cannabis-leaf-extract-5g-normal-rx'),
    '6000mg CANNABIS LEAF EXTRACT OIL': ('medicann', 'cannabis-leaf-extract-5g-normal-rx'),
    'CANNABIS LEAF EXTRACT BASIC':   ('medicann', 'cannabis-leaf-extract-5g-normal-rx'),
    'CANNABIS LEAF EXTRACT PREMIUM': ('medicann', 'cannabis-leaf-extract-premium-5g-rx'),
}

BRAND_MAP = {
    'LANGOOR': 'langoor',
    'MEDICANN': 'medicann',
    'SOMA': 'soma',
    'TEA': 'tea',
}

# ── Helper functions ─────────────────────────────────────────────────────────
def kb(path: Path) -> float:
    return path.stat().st_size / 1024.0

def open_as_rgb(path: Path) -> Image.Image:
    """Open any image and flatten to clean RGB (handles RGBA/PNG alpha)."""
    img = Image.open(path)
    if img.mode in ('RGBA', 'LA', 'P'):
        background = Image.new('RGB', img.size, (255, 255, 255))
        if img.mode == 'P':
            img = img.convert('RGBA')
        background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
        return background
    return img.convert('RGB')

def verify_image(path: Path) -> bool:
    try:
        if not path.exists() or path.stat().st_size == 0:
            return False
        with Image.open(path) as img:
            img.verify()
        return True
    except Exception:
        return False

# ── Master logic ─────────────────────────────────────────────────────────────
def main():
    log_lines = []
    
    def log(line=''):
        log_lines.append(line)
        # Safe print for Windows console
        safe = line.encode('ascii', 'replace').decode('ascii')
        print(safe)

    log("Building master gallery copy list...")

    with open(AUDIT_JSON, 'r', encoding='utf-8') as f:
        raw_data = json.load(f)

    # 1. Compile assignments
    assignments = []
    for e in raw_data:
        brand = e['source_brand']
        brand_slug = BRAND_MAP.get(brand, brand.lower())
        
        # ── Apply locked corrections and overrides ──
        
        # Langoor mixes
        if brand == 'LANGOOR':
            if '_01_' in e['filename']:
                continue  # Exclude _01_ files (catalogue source)
            # Reclassify Earth/Moon/Snow/Sun to correct mixes
            if e['prod_hint'] in LANGOOR_FOLDER_MAP:
                _, e['matched_prod_slug'] = LANGOOR_FOLDER_MAP[e['prod_hint']]
            assignments.append((e['full_path'], e['matched_prod_slug'], brand_slug))
            continue

        # MEDICANN/PAIN RELIEF OIL 50ml -> cannabis-pain-relief-oil-non-rx
        if brand == 'MEDICANN' and e['prod_hint'] == 'PAIN RELIEF OIL 50ml':
            assignments.append((e['full_path'], 'cannabis-pain-relief-oil-non-rx', brand_slug))
            continue

        # SOMA/EXTRACT CORDYCEPS MILITARIS MUSHROOM -> cordyceps-militaris-extract-30ml
        if brand == 'SOMA' and e['prod_hint'] == 'EXTRACT CORDYCEPS MILITARIS MUSHROOM':
            assignments.append((e['full_path'], 'cordyceps-militaris-extract-30ml', brand_slug))
            continue

        # SOMA/SUPER SHROOM BLEND EXTRACT -> soma-synergy-6-shroom-blend-30ml
        if brand == 'SOMA' and e['prod_hint'] == 'SUPER SHROOM BLEND EXTRACT':
            assignments.append((e['full_path'], 'soma-synergy-6-shroom-blend-30ml', brand_slug))
            continue

        # MEDICANN/VIJAYA VATI CAPSULES -> cannabis-leaf-extract-capsules-100mg-250mg-rx
        if brand == 'MEDICANN' and e['prod_hint'] == 'VIJAYA VATI CAPSULES':
            assignments.append((e['full_path'], 'cannabis-leaf-extract-capsules-100mg-250mg-rx', brand_slug))
            continue

        # SOMA/FULL DRIED SHIITAKE -> shiitake-mushroom-dried-50g
        if brand == 'SOMA' and e['prod_hint'] == 'FULL DRIED SHIITAKE':
            assignments.append((e['full_path'], 'shiitake-mushroom-dried-50g', brand_slug))
            continue

        # TEA/Fruity Roselle -> roselle-with-indian-olive
        if brand == 'TEA' and e['prod_hint'] == 'Fruity Roselle':
            assignments.append((e['full_path'], 'roselle-with-indian-olive', brand_slug))
            continue

        # General folders (applying maps first)
        if brand == 'MEDICANN' and e['prod_hint'] in MEDICANN_FOLDER_MAP:
            _, e['matched_prod_slug'] = MEDICANN_FOLDER_MAP[e['prod_hint']]
        
        # Include all other confirmed ones
        target_slug = e.get('matched_prod_slug')
        if target_slug:
            assignments.append((e['full_path'], target_slug, brand_slug))

    log(f"Total compiled assignments to copy: {len(assignments)}")

    # 2. Track gallery N per folder dynamically
    # Since multiple files might be copied to the same product folder in this run,
    # we need a live counter starting from the existing count on disk, and incrementing.
    live_counters = {}
    
    def get_next_n(p_slug, b_slug):
        key = f"{b_slug}/{p_slug}"
        if key not in live_counters:
            # Count existing gallery-*.webp files in public folder
            target_dir = PUBLIC_IMAGES_DIR / b_slug / p_slug
            if not target_dir.exists():
                live_counters[key] = 1
            else:
                existing_webp = [f for f in target_dir.iterdir() if f.is_file() and f.name.startswith('gallery-') and f.name.endswith('.webp')]
                live_counters[key] = len(existing_webp) + 1
        else:
            live_counters[key] += 1
        return live_counters[key]

    stats = {
        'total': len(assignments),
        'success': 0,
        'missing': 0,
        'errors': 0,
        'webp_sizes': [],
        'jpg_sizes': [],
        'updated_products': set()
    }

    # 3. Process files
    for idx, (src_rel, p_slug, b_slug) in enumerate(assignments, 1):
        src_path = Path(src_rel)
        
        # Resolve full path
        if not src_path.exists():
            log(f"[{b_slug}/{p_slug}] gallery-?")
            log(f"  Source:  {src_rel}")
            log(f"  Status:  ❌ ERROR — file not found")
            log(f"  Action:  Skipped")
            stats['missing'] += 1
            continue

        n = get_next_n(p_slug, b_slug)
        out_dir = PUBLIC_IMAGES_DIR / b_slug / p_slug
        out_dir.mkdir(parents=True, exist_ok=True)
        
        out_webp = out_dir / f"gallery-{n}.webp"
        out_jpg  = out_dir / f"gallery-{n}.jpg"

        orig_size_kb = kb(src_path)

        try:
            # Open and clean
            with Image.open(src_path) as src_img:
                w_orig, h_orig = src_img.size
            
            img = open_as_rgb(src_path)
            img = img.resize(TARGET_SIZE, Image.LANCZOS)
            
            # Save WebP
            img.save(out_webp, format='WEBP', quality=WEBP_QUALITY, method=WEBP_METHOD)
            # Save JPEG
            img.save(out_jpg, format='JPEG', quality=JPEG_QUALITY, optimize=True, progressive=True)

            # Verify
            webp_ok = verify_image(out_webp)
            jpg_ok  = verify_image(out_jpg)

            if not (webp_ok and jpg_ok):
                raise RuntimeError(f"Verification failed — webp_ok={webp_ok}, jpg_ok={jpg_ok}")

            webp_kb = kb(out_webp)
            jpg_kb  = kb(out_jpg)
            stats['webp_sizes'].append(webp_kb)
            stats['jpg_sizes'].append(jpg_kb)
            stats['success'] += 1
            stats['updated_products'].add(f"{b_slug}/{p_slug}")

            log(f"[{b_slug}/{p_slug}] gallery-{n}")
            log(f"  Source:  {src_rel}")
            log(f"  Input:   {w_orig}x{h_orig} | {orig_size_kb:.1f} KB")
            log(f"  Output:  gallery-{n}.webp ({webp_kb:.1f} KB) + gallery-{n}.jpg ({jpg_kb:.1f} KB)")
            log(f"  Status:  ✅ SUCCESS")

        except Exception as e:
            log(f"[{b_slug}/{p_slug}] gallery-{n}")
            log(f"  Source:  {src_rel}")
            log(f"  Status:  ❌ ERROR — {e}")
            log(f"  Action:  Skipped")
            stats['errors'] += 1
        
        log() # blank line

    # 4. Summary Block
    avg_webp = (sum(stats['webp_sizes']) / len(stats['webp_sizes'])) if stats['webp_sizes'] else 0
    avg_jpg  = (sum(stats['jpg_sizes']) / len(stats['jpg_sizes'])) if stats['jpg_sizes'] else 0
    total_gallery_count = sum(live_counters.values()) # total gallery images on disk now
    
    summary = f"""========================================
GALLERY COPY RUN SUMMARY
========================================
Total assignments      : {stats['total']}
Successfully copied    : {stats['success']}
Skipped (missing src)  : {stats['missing']}
Errors                 : {stats['errors']}
Products updated       : {len(stats['updated_products'])}
Total gallery images   : {stats['success']}
Average WebP size      : {avg_webp:.1f} KB
Average JPG size       : {avg_jpg:.1f} KB
========================================
"""
    log(summary)

    # Write log to disk
    with open(LOG_FILE, 'w', encoding='utf-8') as lf:
        lf.write('\n'.join(log_lines))
    print(f"Full execution log saved to {LOG_FILE}")

if __name__ == '__main__':
    main()
