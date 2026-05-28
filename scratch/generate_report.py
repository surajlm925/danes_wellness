import json
import os

AUDIT_REPORT_PATH = 'scratch/audit_report.json'
ANTI_MD_PATH = 'anti.md'

def generate_report():
    with open(AUDIT_REPORT_PATH, 'r') as f:
        data = json.load(f)
        
    summary = data['summary']
    results = data['results']
    
    table_rows = []
    for r in results:
        issues_str = ", ".join(r['issues']) if r['issues'] else "✅ None"
        brand_slug = r['brand_slug']
        product_slug = r['product_slug']
        filename = r['file']
        fmt = r['format']
        dims = r['dimensions']
        sz = r['file_size']
        ar = r['aspect_ratio']
        table_rows.append(f"| {brand_slug} | {product_slug} | {filename} | {fmt} | {dims} | {sz} KB | {ar} | {issues_str} |")
        
    table_content = "\n".join(table_rows)
    
    # Analyze outliers
    outliers = []
    for r in results:
        if r['dimensions'] == "2048x2048":
            outliers.append(f"`public/images/products/{r['brand_slug']}/{r['product_slug']}/{r['file']}` (2048x2048, {r['file_size']} KB)")
            
    outliers_str = "\n".join([f"- {o}" for o in outliers[:10]])
    if len(outliers) > 10:
        outliers_str += f"\n- ... and {len(outliers) - 10} more large 2048x2048 images."
    else:
        outliers_str = outliers_str or "- None"
        
    format_counts_str = ", ".join([f"{k}: {v}" for k, v in summary['format_counts'].items()])
    
    report = f"""# 🖼️ Image Audit & Clean Report

Overwrite of `anti.md` with complete image audit details and proposed cleaning plan.

---

## PHASE 1 — FULL IMAGE AUDIT (Report Only)

| Brand Slug | Product Slug | File | Format | Dimensions (WxH) | File Size (KB) | Aspect Ratio | Issues |
|---|---|---|---|---|---|---|---|
{table_content}

### SUMMARY
- **Total products with both images ✅**: {summary['total_products_both']}
- **Total products with catalogue only**: {summary['total_products_cat_only']}
- **Total products with hover only**: {summary['total_products_hover_only']}  
- **Total products with neither**: {summary['total_products_neither']}
- **Format breakdown**: {format_counts_str}
- **Average file size**: {summary['avg_size_kb']} KB
- **Dimension & Size Outliers**:
{outliers_str}

---

## PHASE 2 — CLEANING PLAN (Plan Only)

### A. Standardization Target (Industry Standard for E-Commerce)
Recommend the exact output spec we should normalize ALL images to:
- **Target dimensions**: 800×1000px portrait 4:5 — standard for Shopify/product cards.
- **Target format**: WebP (`.webp`) strongly preferred for Next.js performance.
- **Target max file size after compression**: <150KB for catalogue, <120KB for hover.
- **Naming convention**: `catalogue.webp` and `hover.webp`.

### B. Operations Required
List every operation the cleaning script will need to perform:
- **RESIZE**: All 100 images must be resized from their native high resolution (1024px or 2048px square) to fit the target e-commerce card dimensions.
- **CONVERT**: All files must be converted from JPEG internally to modern WebP format (`.webp`).
- **COMPRESS**: Apply standard lossy compression (quality target: 80-85%) to bring sizes down from an average of ~665KB to under 150KB.
- **PAD vs CROP**: Since our original images are all 1:1 square aspect ratio (1.00) and the target is 4:5 portrait (0.80), center cropping would cut off essential product details/labels. We **RECOMMEND PAD** with a clean white (`#FFFFFF`) background. Specifically, the original square image should be scaled to 800x800px and pasted onto the center of a solid white 800x1000px canvas.
- **SKIP**: No images can be skipped since none are currently in `.webp` format, none have a 4:5 aspect ratio, and all are currently oversized.

### C. Script Plan
Describe exactly what the Python script (`scratch/clean_images.py`) will do, step by step.
1. **Walk Directory**: Traverse all subfolders under `public/images/products/`.
2. **Read & Check**: Locate `catalogue.*` and `hover.*` images.
3. **Resize & Pad**:
   - Open using PIL.
   - Resize the image to 800x800px using high-quality lanczos sampling.
   - Create a blank white `RGB` canvas of 800x1000px.
   - Paste the 800x800px product image centered at `(0, 100)` onto the canvas.
4. **Save & Clean**:
   - Save the image to the same folder as `catalogue.webp` or `hover.webp` with `quality=85` and optimized flag.
   - Verify the newly created `.webp` file exists and is readable.
   - Safely remove the original file (e.g. `catalogue.jpeg`, `hover.png`) to avoid duplicates in the same directory.
5. **Logging**: Log every operation, including original paths, new dimensions, compression ratios, and any errors to `scratch/clean_images_log.txt`.
6. **No Touch Original**: Never read from or write to the original raw `DANES/` folder.

---

## TASK QUEUE (ORDERED)
1. ✅ Initial audit complete
2. ⏳ User reviews audit table and cleaning plan
3. ⬜ Execute `scratch/clean_images.py` after user approval
4. ⬜ Verify cleaned images visually / spot check in browser
5. ⬜ Resume Next.js component refactor (code tasks)

### CURRENT STATUS
[ AUDITING ]
Current task: Image audit and cleaning plan
Blockers: Awaiting user approval before any image file is modified
"""
    
    with open(ANTI_MD_PATH, 'w', encoding='utf-8') as out_f:
        out_f.write(report)
        
    print(f"Successfully generated report at {ANTI_MD_PATH}")

if __name__ == '__main__':
    generate_report()
