"""
clean_images.py
===============
Danes Wellness — E-Commerce Image Standardization Script

Spec:
  - Input:  any .jpg/.jpeg/.png/.webp inside public/images/products/
  - Output: catalogue.webp + catalogue.jpg  /  hover.webp + hover.jpg
  - Resize: 1200 × 1200 px (LANCZOS)
  - WebP:   quality=82, method=6
  - JPEG:   quality=85, optimize=True, progressive=True
  - Max:    <150 KB each
  - Log:    scratch/clean_images_log.txt

HARD RULES:
  - Never touch DANES/ raw folder
  - Delete original ONLY after both .webp AND .jpg are verified
"""

import os
import sys
import time
from pathlib import Path
from PIL import Image

# ── Configuration ────────────────────────────────────────────────────────────
PUBLIC_IMAGES_DIR = Path('public/images/products')
LOG_FILE          = Path('scratch/clean_images_log.txt')
WEBP_QUALITY      = 82
WEBP_METHOD       = 6
JPEG_QUALITY      = 85
TARGET_SIZE       = (1200, 1200)
VALID_EXTENSIONS  = {'.jpg', '.jpeg', '.png', '.webp'}
BASE_NAMES        = {'catalogue', 'hover'}

# ── Helpers ──────────────────────────────────────────────────────────────────
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
    """Verify file exists, is non-empty, and PIL can open it."""
    try:
        if not path.exists() or path.stat().st_size == 0:
            return False
        with Image.open(path) as img:
            img.verify()
        return True
    except Exception:
        return False

# ── Main ─────────────────────────────────────────────────────────────────────
def main():
    log_lines = []
    stats = {
        'total': 0,
        'success': 0,
        'errors': 0,
        'deleted': 0,
        'webp_sizes': [],
        'jpg_sizes': [],
        'before_bytes': 0,
        'after_bytes': 0,
    }

    def log(line=''):
        log_lines.append(line)
        # Strip emoji for Windows console compatibility; keep them in log file
        safe = line.encode('ascii', 'replace').decode('ascii')
        print(safe)

    if not PUBLIC_IMAGES_DIR.exists():
        print(f"ERROR: {PUBLIC_IMAGES_DIR} does not exist. Aborting.")
        sys.exit(1)

    # Collect all product folders
    product_folders = []
    for brand_dir in sorted(PUBLIC_IMAGES_DIR.iterdir()):
        if not brand_dir.is_dir():
            continue
        for product_dir in sorted(brand_dir.iterdir()):
            if product_dir.is_dir():
                product_folders.append(product_dir)

    log(f"Found {len(product_folders)} product folders to process.\n")

    for product_dir in product_folders:
        rel = product_dir.relative_to(PUBLIC_IMAGES_DIR)  # e.g. boheco/bliss-rx

        # Find candidate files (catalogue.* and hover.*)
        files_in_dir = list(product_dir.iterdir())
        image_files = [
            f for f in files_in_dir
            if f.is_file()
            and f.suffix.lower() in VALID_EXTENSIONS
            and f.stem.lower() in BASE_NAMES
        ]

        if not image_files:
            log(f"[{rel}] SKIPPED - EMPTY (no catalogue/hover image files found)")
            continue

        for src_file in sorted(image_files):
            base_name = src_file.stem.lower()   # 'catalogue' or 'hover'
            out_webp   = product_dir / f"{base_name}.webp"
            out_jpg    = product_dir / f"{base_name}.jpg"

            stats['total'] += 1
            orig_size_kb = kb(src_file)
            stats['before_bytes'] += src_file.stat().st_size

            log(f"[{rel}] {src_file.name}")
            log(f"  Original:  {orig_size_kb:.1f} KB")

            try:
                img = open_as_rgb(src_file)
                img = img.resize(TARGET_SIZE, Image.LANCZOS)

                # ── Save WebP ──────────────────────────────────────────────
                img.save(out_webp, format='WEBP', quality=WEBP_QUALITY, method=WEBP_METHOD)

                # ── Save JPEG ──────────────────────────────────────────────
                img.save(out_jpg, format='JPEG', quality=JPEG_QUALITY,
                         optimize=True, progressive=True)

                # ── Verify both outputs ────────────────────────────────────
                webp_ok = verify_image(out_webp)
                jpg_ok  = verify_image(out_jpg)

                if not (webp_ok and jpg_ok):
                    raise RuntimeError(
                        f"Verification failed — webp_ok={webp_ok}, jpg_ok={jpg_ok}"
                    )

                webp_kb = kb(out_webp)
                jpg_kb  = kb(out_jpg)
                stats['webp_sizes'].append(webp_kb)
                stats['jpg_sizes'].append(jpg_kb)
                stats['after_bytes'] += int(webp_kb * 1024) + int(jpg_kb * 1024)

                log(f"  Output:    1200x1200  |  {base_name}.webp ({webp_kb:.1f} KB) + {base_name}.jpg ({jpg_kb:.1f} KB)")

                # ── Delete original (only if it isn't one we just created) ─
                original_deleted = False
                src_lower = src_file.suffix.lower()
                if src_file != out_webp and src_file != out_jpg:
                    try:
                        src_file.unlink()
                        original_deleted = True
                        stats['deleted'] += 1
                    except Exception as del_err:
                        log(f"  ⚠️  WARNING: Could not delete original: {del_err}")

                status = "✅ SUCCESS"
                del_note = "Original deleted" if original_deleted else "Original is output file (kept)"
                log(f"  Status:    {status}  |  {del_note}")
                stats['success'] += 1

            except Exception as e:
                log(f"  Status: ❌ ERROR — {e}")
                log(f"  Action: Original file preserved")
                stats['errors'] += 1

            log()  # blank line separator

    # ── Summary Block ─────────────────────────────────────────────────────────
    avg_webp = (sum(stats['webp_sizes']) / len(stats['webp_sizes'])) if stats['webp_sizes'] else 0
    avg_jpg  = (sum(stats['jpg_sizes']) / len(stats['jpg_sizes'])) if stats['jpg_sizes'] else 0
    before_mb = stats['before_bytes'] / (1024 * 1024)
    after_mb  = stats['after_bytes'] / (1024 * 1024)
    reduction = ((stats['before_bytes'] - stats['after_bytes']) / stats['before_bytes'] * 100) if stats['before_bytes'] else 0

    summary = f"""
========================================
CLEAN RUN SUMMARY
========================================
Total images processed : {stats['total']}
Success                : {stats['success']}
Errors                 : {stats['errors']}
Original files deleted : {stats['deleted']}
Average WebP size      : {avg_webp:.1f} KB
Average JPG size       : {avg_jpg:.1f} KB
Total size before      : {before_mb:.2f} MB
Total size after       : {after_mb:.2f} MB
Size reduction         : {reduction:.1f}%
========================================
"""
    log(summary)

    # ── Write log to disk ─────────────────────────────────────────────────────
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(LOG_FILE, 'w', encoding='utf-8') as lf:
        lf.write('\n'.join(log_lines))

    print(f"\nLog written to {LOG_FILE}")

if __name__ == '__main__':
    main()
