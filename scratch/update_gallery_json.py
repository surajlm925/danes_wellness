import json
from pathlib import Path

PRODUCTS_JSON_PATH = Path('src/lib/products.json')
PUBLIC_PRODUCTS_DIR = Path('public/images/products')

def main():
    if not PRODUCTS_JSON_PATH.exists():
        print(f"Error: {PRODUCTS_JSON_PATH} does not exist.")
        return

    with open(PRODUCTS_JSON_PATH, 'r', encoding='utf-8') as f:
        products = json.load(f)

    updated_count = 0
    empty_count = 0
    skipped_count = 0

    for product in products:
        # 1. If images is null, leave it null and skip
        if product.get('images') is None:
            skipped_count += 1
            continue

        brand_slug = product.get('brand', '').lower()
        # Handle custom redirects or exceptions if any:
        # we know boheco -> boheco, medicann -> medicann, soma -> soma, canazo -> cannazo, dweller -> tea
        # Let's map it explicitly to be safe
        brand_folder_map = {
            'boheco': 'boheco',
            'medicann': 'medicann',
            'soma': 'soma',
            'canazo': 'cannazo',
            'dweller': 'tea'
        }
        mapped_brand = brand_folder_map.get(brand_slug, brand_slug)
        product_slug = product.get('slug', '')

        product_dir = PUBLIC_PRODUCTS_DIR / mapped_brand / product_slug
        gallery_paths = []

        if product_dir.exists() and product_dir.is_dir():
            # Find all gallery-*.webp files
            webp_files = [
                f for f in product_dir.iterdir()
                if f.is_file() and f.name.startswith('gallery-') and f.name.endswith('.webp')
            ]
            
            # Helper to extract N for numerical sorting
            def get_n(f):
                try:
                    return int(f.stem.split('-')[1])
                except Exception:
                    return 9999

            webp_files.sort(key=get_n)
            
            # Construct relative browser paths
            for f in webp_files:
                rel_path = f"/images/products/{mapped_brand}/{product_slug}/{f.name}"
                gallery_paths.append(rel_path)

        # Update the product object
        product['images']['gallery'] = gallery_paths
        
        if gallery_paths:
            updated_count += 1
        else:
            empty_count += 1

    # Save changes
    with open(PRODUCTS_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)

    print(f"Products Updated: {updated_count} (with gallery images)")
    print(f"Empty Galleries : {empty_count} (gallery: [])")
    print(f"Skipped (Null)  : {skipped_count}")

if __name__ == '__main__':
    main()
