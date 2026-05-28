import json
import os
import shutil
import csv
import re

MAPPING_PATH = 'DANES/mapping_report.json'
CSV_PATH = 'DANES/Product Sheet final.csv'
PUBLIC_IMAGES_DIR = 'public/images/products'
OUTPUT_JSON_PATH = 'src/lib/products.json'

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def main():
    with open(MAPPING_PATH, 'r', encoding='utf-8') as f:
        mapping = json.load(f)
        
    # Map slug to image paths
    image_map = {}
    for m in mapping:
        if m.get('catalogue') and m.get('confidence', 0) >= 0.4:
            image_map[m['slug']] = m
            
    products_data = []
    
    # Read CSV
    with open(CSV_PATH, 'r', encoding='utf-16le') as f:
        next(f) # skip title row
        reader = csv.DictReader(f)
        for row in reader:
            brand = row.get('Brand', '').strip()
            name = row.get('Product Name', '').strip()
            if not brand or not name:
                continue
                
            slug = slugify(name)
            
            # Only include products that have images mapped successfully
            if slug not in image_map:
                continue
                
            m = image_map[slug]
            
            brand_folder = brand
            if brand.upper() in ['CANAZO', 'CANNAZO']:
                brand_folder = 'CANNAZO'
            elif brand.upper() == 'DWELLER':
                brand_folder = 'TEA'
            brand_slug = slugify(brand_folder)
            prod_dir = os.path.join(PUBLIC_IMAGES_DIR, brand_slug, slug)
            os.makedirs(prod_dir, exist_ok=True)
            
            # Get extensions
            cat_src = m['catalogue']
            cat_ext = os.path.splitext(cat_src)[1].lower()
            cat_dest_rel = f'/images/products/{brand_slug}/{slug}/catalogue{cat_ext}'
            cat_dest_abs = os.path.join(prod_dir, f'catalogue{cat_ext}')
            
            shutil.copy2(cat_src, cat_dest_abs)
            
            hover_dest_rel = None
            if m.get('hover'):
                hover_src = m['hover']
                hover_ext = os.path.splitext(hover_src)[1].lower()
                hover_dest_rel = f'/images/products/{brand_slug}/{slug}/hover{hover_ext}'
                hover_dest_abs = os.path.join(prod_dir, f'hover{hover_ext}')
                shutil.copy2(hover_src, hover_dest_abs)
                
            # Add to products array
            prod_item = {
                'id': row.get('S.No.', ''),
                'brand': brand,
                'name': name,
                'slug': slug,
                'category': row.get('Category', ''),
                'price': row.get('MRP (?)', row.get('MRP', '')).strip(),
                'tagline': row.get('Tagline', ''),
                'shortDescription': row.get('Short Description', ''),
                'longDescription': row.get('Long Description', ''),
                'benefits': row.get('Benefits', ''),
                'howToUse': row.get('How to Use', ''),
                'keyIngredients': row.get('Key Ingredients', ''),
                'images': {
                    'catalogue': cat_dest_rel,
                    'hover': hover_dest_rel
                }
            }
            products_data.append(prod_item)
            
    with open(OUTPUT_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(products_data, f, indent=2)
        
    print(f"Successfully processed and copied images for {len(products_data)} products.")
    print(f"JSON data saved to {OUTPUT_JSON_PATH}")

if __name__ == '__main__':
    main()
