"""
update_products_json.py
=======================
Updates src/lib/products.json to use .webp paths for all image references.
"""

import json
import re

PRODUCTS_JSON_PATH = 'src/lib/products.json'

def update_paths(path_str):
    if not path_str:
        return path_str
    # Replace any image extension with .webp
    return re.sub(r'\.(jpeg|jpg|png)$', '.webp', path_str)

with open(PRODUCTS_JSON_PATH, 'r', encoding='utf-8') as f:
    products = json.load(f)

updated = 0
for product in products:
    images = product.get('images')
    if not images:
        continue
    if images.get('catalogue'):
        new_cat = update_paths(images['catalogue'])
        if new_cat != images['catalogue']:
            images['catalogue'] = new_cat
            updated += 1
    if images.get('hover'):
        new_hover = update_paths(images['hover'])
        if new_hover != images['hover']:
            images['hover'] = new_hover
            updated += 1

with open(PRODUCTS_JSON_PATH, 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print(f"Updated {updated} image paths to .webp in {PRODUCTS_JSON_PATH}")
print(f"Total products: {len(products)}")

# Print proof — show images block of first product
for p in products:
    if p.get('images') and p['images'].get('catalogue'):
        print(f"\nProof — product: {p['name']}")
        print(f"  catalogue: {p['images']['catalogue']}")
        print(f"  hover:     {p['images']['hover']}")
        break
