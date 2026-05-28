import csv
import os
import json
import re
import difflib

# Configuration
CSV_PATH = 'DANES/Product Sheet final.csv'
DANES_DIR = 'DANES'
MAPPING_REPORT_PATH = 'DANES/mapping_report.json'

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def get_files_in_dir(path):
    if not os.path.exists(path):
        return []
    return [f for f in os.listdir(path) if os.path.isfile(os.path.join(path, f)) and f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]

def fuzzy_match(query, choices):
    if not choices:
        return None, 0
    # First try exact match or substring
    for c in choices:
        if query.lower() in c.lower() or c.lower() in query.lower():
            return c, 1.0
    
    # Then fuzzy
    matches = difflib.get_close_matches(query.lower(), [c.lower() for c in choices], n=1, cutoff=0.3)
    if matches:
        match_lower = matches[0]
        # find original case
        original = next(c for c in choices if c.lower() == match_lower)
        # calculate similarity
        similarity = difflib.SequenceMatcher(None, query.lower(), match_lower).ratio()
        return original, similarity
    return None, 0

def main():
    products = []
    
    with open(CSV_PATH, 'r', encoding='utf-16le') as f:
        # Skip the first title row
        next(f)
        # Read the rest using DictReader (which will use the next row as headers)
        reader = csv.DictReader(f)
        for row in reader:
            if not row.get('Brand') or not row.get('Product Name') or row.get('Brand').strip() == '':
                continue
            products.append(row)
            
    mapping_results = []
    
    for prod in products:
        brand = prod['Brand'].strip()
        name = prod['Product Name'].strip()
        slug = slugify(name)
        brand_folder = brand
        if brand.upper() in ['CANAZO', 'CANNAZO']:
            brand_folder = 'CANNAZO'
        elif brand.upper() == 'DWELLER':
            brand_folder = 'TEA'
        brand_dir = os.path.join(DANES_DIR, brand_folder)
        
        result = {
            'id': prod.get('\ufeffID', prod.get('ID', '')),
            'brand': brand,
            'name': name,
            'slug': slug,
            'status': 'success',
            'catalogue': None,
            'hover': None,
            'confidence': 1.0
        }
        
        if not os.path.exists(brand_dir):
            result['status'] = 'brand_dir_missing'
            mapping_results.append(result)
            continue
            
        if brand_folder in ['BOHECO', 'CANNAZO']:
            # Search in Catalogue and hover directly
            cat_dir = os.path.join(brand_dir, 'Catalogue')
            hover_dir = os.path.join(brand_dir, 'hover')
            if not os.path.exists(hover_dir):
                hover_dir = os.path.join(brand_dir, 'Hover Images')
            
            cat_files = get_files_in_dir(cat_dir)
            hover_files = get_files_in_dir(hover_dir)
            
            # Simple clean name for matching
            search_name = re.sub(r'\(.*?\)', '', name).strip()
            
            cat_match, cat_conf = fuzzy_match(search_name, cat_files)
            hover_match, hover_conf = fuzzy_match(search_name, hover_files)
            
            if cat_match:
                result['catalogue'] = os.path.join(cat_dir, cat_match).replace('\\', '/')
            if hover_match:
                result['hover'] = os.path.join(hover_dir, hover_match).replace('\\', '/')
                
            result['confidence'] = min(cat_conf, hover_conf) if hover_match else cat_conf
            if not cat_match:
                result['status'] = 'no_image_found'
                result['confidence'] = 0.0
                
        else:
            # Look for product subfolder
            subdirs = [d for d in os.listdir(brand_dir) if os.path.isdir(os.path.join(brand_dir, d))]
            search_name = re.sub(r'\(.*?\)', '', name).strip()
            dir_match, dir_conf = fuzzy_match(search_name, subdirs)
            
            if dir_match:
                prod_dir = os.path.join(brand_dir, dir_match)
                # Find Catalogue and Hover inside prod_dir
                cat_dirs = [d for d in os.listdir(prod_dir) if d.lower() == 'catalogue']
                hover_dirs = [d for d in os.listdir(prod_dir) if d.lower() in ['hover', 'hover images']]
                
                if cat_dirs:
                    cat_files = get_files_in_dir(os.path.join(prod_dir, cat_dirs[0]))
                    if cat_files:
                        result['catalogue'] = os.path.join(prod_dir, cat_dirs[0], cat_files[0]).replace('\\', '/')
                
                if hover_dirs:
                    hover_files = get_files_in_dir(os.path.join(prod_dir, hover_dirs[0]))
                    if hover_files:
                        result['hover'] = os.path.join(prod_dir, hover_dirs[0], hover_files[0]).replace('\\', '/')
                        
                result['confidence'] = dir_conf
            else:
                result['status'] = 'no_product_folder'
                result['confidence'] = 0.0
                
        mapping_results.append(result)
        
    with open(MAPPING_REPORT_PATH, 'w', encoding='utf-8') as f:
        json.dump(mapping_results, f, indent=2)
        
    print(f"Mapped {len(mapping_results)} products. Report saved to {MAPPING_REPORT_PATH}")
    
    # Stats
    successful = len([r for r in mapping_results if r['catalogue'] is not None])
    print(f"Products with catalogue images: {successful} / {len(products)}")

if __name__ == '__main__':
    main()
