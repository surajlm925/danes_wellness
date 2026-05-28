import os
import json
import math
from PIL import Image

PUBLIC_IMAGES_DIR = 'public/images/products'

def audit():
    audit_results = []
    
    # We want to walk through the folder structure
    # public/images/products/[brand-slug]/[product-slug]
    if not os.path.exists(PUBLIC_IMAGES_DIR):
        print(f"Error: {PUBLIC_IMAGES_DIR} does not exist.")
        return
        
    brands = sorted([d for d in os.listdir(PUBLIC_IMAGES_DIR) if os.path.isdir(os.path.join(PUBLIC_IMAGES_DIR, d))])
    
    total_products_both = 0
    total_products_cat_only = 0
    total_products_hover_only = 0
    total_products_neither = 0
    
    format_counts = {}
    total_file_size_bytes = 0
    total_images_count = 0
    
    for brand_slug in brands:
        brand_dir = os.path.join(PUBLIC_IMAGES_DIR, brand_slug)
        products = sorted([d for d in os.listdir(brand_dir) if os.path.isdir(os.path.join(brand_dir, d))])
        
        for product_slug in products:
            product_dir = os.path.join(brand_dir, product_slug)
            files = os.listdir(product_dir)
            
            # Check for catalogue.* and hover.* files
            cat_files = [f for f in files if f.startswith('catalogue.')]
            hover_files = [f for f in files if f.startswith('hover.')]
            
            has_catalogue = len(cat_files) > 0
            has_hover = len(hover_files) > 0
            
            if has_catalogue and has_hover:
                total_products_both += 1
            elif has_catalogue:
                total_products_cat_only += 1
            elif has_hover:
                total_products_hover_only += 1
            else:
                total_products_neither += 1
                
            # If empty folder
            if not files:
                audit_results.append({
                    'brand_slug': brand_slug,
                    'product_slug': product_slug,
                    'file': 'N/A',
                    'format': 'N/A',
                    'dimensions': 'N/A',
                    'file_size': 0,
                    'aspect_ratio': 'N/A',
                    'issues': ['⚠️ EMPTY FOLDER']
                })
                continue
                
            # Check for generic issues
            folder_issues = []
            if has_catalogue and not has_hover:
                folder_issues.append('⚠️ NO HOVER')
            if has_hover and not has_catalogue:
                folder_issues.append('⚠️ NO CATALOGUE')
                
            # Process actual files in the folder
            for f in sorted(files):
                file_path = os.path.join(product_dir, f)
                file_size_bytes = os.path.getsize(file_path)
                file_size_kb = file_size_bytes / 1024.0
                
                ext = os.path.splitext(f)[1].lower()
                
                # Image inspection
                img_format = 'Unknown'
                width, height = 0, 0
                aspect_ratio_str = 'N/A'
                image_issues = list(folder_issues)
                
                # Format check
                valid_formats = ['.jpg', '.jpeg', '.png', '.webp']
                if ext not in valid_formats:
                    image_issues.append('❌ WRONG FORMAT')
                    
                try:
                    with Image.open(file_path) as img:
                        img_format = img.format
                        width, height = img.size
                        aspect_ratio = width / height
                        aspect_ratio_str = f"{aspect_ratio:.2f}"
                        
                        # Check size
                        if width < 400 or height < 400:
                            image_issues.append('❌ TINY')
                            
                        # Check aspect ratio
                        # We standardly expect 1:1 (1.0) or ~4:5 (0.8)
                        # Let's say +/- 0.05 tolerance around 1.0 or 0.8
                        is_square = abs(aspect_ratio - 1.0) <= 0.05
                        is_portrait_4_5 = abs(aspect_ratio - 0.8) <= 0.05
                        if not (is_square or is_portrait_4_5):
                            image_issues.append('⚠️ NOT SQUARE / NOT PORTRAIT')
                except Exception as e:
                    image_issues.append(f'❌ CORRUPT/UNREADABLE ({str(e)})')
                    
                # Check large file size
                if file_size_kb > 500:
                    image_issues.append('⚠️ LARGE FILE')
                    
                # Format Breakdown tracking
                if img_format != 'Unknown':
                    format_counts[img_format] = format_counts.get(img_format, 0) + 1
                    
                total_file_size_bytes += file_size_bytes
                total_images_count += 1
                
                audit_results.append({
                    'brand_slug': brand_slug,
                    'product_slug': product_slug,
                    'file': f,
                    'format': img_format,
                    'dimensions': f"{width}x{height}" if width else "N/A",
                    'file_size': f"{file_size_kb:.1f}",
                    'aspect_ratio': aspect_ratio_str,
                    'issues': image_issues
                })
                
    # Calculate summary metrics
    avg_size_kb = (total_file_size_bytes / 1024.0 / total_images_count) if total_images_count > 0 else 0
    
    summary = {
        'total_products_both': total_products_both,
        'total_products_cat_only': total_products_cat_only,
        'total_products_hover_only': total_products_hover_only,
        'total_products_neither': total_products_neither,
        'format_counts': format_counts,
        'avg_size_kb': f"{avg_size_kb:.1f}",
        'total_images_count': total_images_count
    }
    
    # Save reports
    with open('scratch/audit_report.json', 'w') as out_f:
        json.dump({'summary': summary, 'results': audit_results}, out_f, indent=2)
        
    print(f"Audit completed. Processed {total_images_count} images.")

if __name__ == '__main__':
    audit()
