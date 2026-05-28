# Danes Wellness (danes-next) Developer Handoff Documentation

This document serves as a comprehensive guide to the current state of the Danes Wellness Next.js e-commerce frontend. It is specifically designed to provide context for AI assistants or human developers picking up the project.

## 1. Project Architecture & Stack
- **Framework:** Next.js (App Router `src/app`)
- **Styling:** Tailwind CSS / CSS Modules
- **Animation:** Framer Motion (used in components like `ProductCard.jsx`)
- **State Management:** React Context (`src/context/CartContext.jsx`)

## 2. Recent Data Migration & Image Reorganization
Historically, product images were stored in a messy, unstructured folder (`DANES/`) with inconsistent, human-readable file names (e.g., `BLISS MINT 10ml.jpeg`). The frontend relied on a static mapping file (`src/lib/imageMap.js`) and dummy mock data (`src/lib/mockdata.js`).

**We have completely overhauled this structure:**

### Data Source (The Single Source of Truth)
The master product catalog is maintained in `DANES/Product Sheet final.xlsx` (and its exported CSV). It contains comprehensive product metadata: Brands, Names, Categories, Prices, Descriptions, Ingredients, and Usage Instructions.

### Image Mapping & Standardization
A Python automation script (`scratch/map_images.py` & `scratch/reorganize_images.py`) was run to perform fuzzy string matching between the Excel sheet and the raw images. 
- **50 core products** were successfully mapped.
- The raw images were automatically copied and strictly formatted into the Next.js `public` directory.

**New Image Path Convention:**
```
public/images/products/[brand-slug]/[product-slug]/catalogue.ext
public/images/products/[brand-slug]/[product-slug]/hover.ext
```
*(e.g., `public/images/products/boheco/bloom-roll-on-non-rx/catalogue.jpeg`)*

### The New Data Payload (`src/lib/products.json`)
The scripts combined the rich Excel data and the new structured image paths into a single production-ready JSON file at `src/lib/products.json`.

**Schema of a Product Object:**
```json
{
  "id": "13",
  "brand": "BOHECO",
  "name": "Bloom Roll-On (Non-Rx)",
  "slug": "bloom-roll-on-non-rx",
  "category": "Women's Health / Menstrual Pain",
  "price": "349",
  "tagline": "Ease every month. Naturally.",
  "shortDescription": "Ayurvedic roll-on for menstrual cramp and pain relief.",
  "longDescription": "BLOOM by BOHECO is a proprietary Ayurvedic roll-on...",
  "benefits": "Relieves menstrual cramps | Reduces lower back...",
  "howToUse": "Roll onto the lower abdomen...",
  "keyIngredients": "Vijaya (Cannabis Sativa) Leaf Extract...",
  "images": {
    "catalogue": "/images/products/boheco/bloom-roll-on-non-rx/catalogue.jpeg",
    "hover": "/images/products/boheco/bloom-roll-on-non-rx/hover.jpeg"
  }
}
```

---

## 3. Immediate Technical Debt & Refactoring Requirements

The Next.js frontend has **not yet been updated** to consume the new `products.json` file. It is still wired to the old `mockdata.js`.

**The immediate task for the next developer/LLM is to refactor the UI components to use the new data source.**

### Refactoring Checklist:

#### A. Component: `src/components/ProductCard.jsx`
- **Remove dependency:** Drop the import `getImageByHandle` from `src/lib/imageMap`.
- **Image Source:** Instead of using `getImageByHandle`, read directly from `product.images.catalogue`.
- **Hover Effect:** Add logic to render `product.images.hover` on card hover. (Note: The `group-hover` Tailwind class is already present on the card container).
- **Graceful Fallbacks:** Not every product in the JSON has images mapped. Ensure fallback UI (e.g., placeholder or brand text) handles cases where `product.images` is null or `product.images.catalogue` is missing.

#### B. Component: `src/components/ProductDetailClient.jsx`
- **Update Import:** Change `import { products } from '@/lib/mockdata'` to `import products from '@/lib/products.json'`.
- **Data Binding:** The new JSON structure contains significantly richer text (e.g., `tagline`, `benefits`, `keyIngredients`). Ensure these fields are dynamically rendered in the UI where applicable, rather than relying on hardcoded sections.

#### C. Pages: `src/app/shop/page.js` & `src/app/shop/[handle]/page.js`
- **Update Import:** Point to `src/lib/products.json`.
- **URL Routing:** The dynamic routing currently relies on `[handle]`. The new data structure uses `slug`. Ensure the route params logic matches `product.slug` instead of `product.handle`.

#### D. Clean Up (Post-Verification)
- Once the storefront successfully renders using `src/lib/products.json`, the following files represent obsolete technical debt and should be deleted:
  - `src/lib/mockdata.js`
  - `src/lib/imageMap.js`
  - Any raw, unorganized product images lingering directly in `public/images/` (ensure they are backed up if necessary, but the app should exclusively use `public/images/products/...`).

## 4. Automation Scripts
The scripts used to achieve this migration are preserved in the `scratch/` directory.
- `scratch/map_images.py`: Responsible for reading the CSV and fuzzy matching file names.
- `scratch/reorganize_images.py`: Responsible for copying/renaming the images to the `public` folder and building the JSON payload.
These scripts can be reused or modified if the Excel sheet is updated or new product images are added to the raw `DANES` folder in the future.
