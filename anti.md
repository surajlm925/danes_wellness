# ⚡ Danes Wellness — Performance Optimizations Log

This log documents the console warning cleanups and performance optimizations implemented for Next.js and Framer Motion.

---

## TASK 1 — FRAMER MOTION SYNTAX UPDATE

### Issue
Deprecated Framer Motion wrapping syntax (`motion(Component)`) was triggering deprecation warnings in the browser console.

### Location
- [Footer.jsx](file:///d:/Work%20Code/Projects/danes%20wellness/danes%20website/website/danes-next/src/components/Footer.jsx#L6)

### Changes
Modified the custom component wrapping syntax to use `motion.create()`:
```diff
-const MotionLink = motion(Link);
+const MotionLink = motion.create(Link);
```

---

## TASK 2 — NEXT.JS IMAGE SIZES PROP

### Issue
`<Image />` components with the `fill` property lacked explicit `sizes` parameters, causing Next.js performance warnings about layout shifts and image scaling.

### Locations & Changes

1. **Concern Icon Grid**
   - File: [PillarGrid.jsx](file:///d:/Work%20Code/Projects/danes%20wellness/danes%20website/website/danes-next/src/sections/PillarGrid.jsx#L245)
   - Added standard responsive sizing configuration for icons:
     ```diff
     -<Image src={`/assets/icons-img/${p.icon}`} alt={p.name} fill style={{objectFit: 'contain'}} />
     +<Image src={`/assets/icons-img/${p.icon}`} alt={p.name} fill style={{objectFit: 'contain'}} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
     ```

2. **Tailored Product Cards**
   - File: [Products.jsx](file:///d:/Work%20Code/Projects/danes%20wellness/danes%20website/website/danes-next/src/sections/Products.jsx#L28)
   - Updated sizes profile to adapt to mobile grids:
     ```diff
     -            sizes="(max-width: 640px) 100vw, 20vw"
     +            sizes="(max-width: 768px) 100vw, 50vw"
     ```

3. **Shop Promotional Banner**
   - File: [page.js](file:///d:/Work%20Code/Projects/danes%20wellness/danes%20website/website/danes-next/src/app/shop/page.js#L266)
   - Added a standard responsive size helper:
     ```diff
     -<Image src="/images/products/cannazo/vijaya-ambrosia-rx/catalogue.webp" alt="CBD Oil" fill style={{ objectFit: 'cover' }} />
     +<Image src="/images/products/cannazo/vijaya-ambrosia-rx/catalogue.webp" alt="CBD Oil" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
     ```

---

## TASK 3 — SMOOTH SCROLL ROUTER FIX

### Issue
Next.js App Router transition handling warnings caused by direct stylesheet definitions of smooth scroll behavior.

### Location
- [layout.js](file:///d:/Work%20Code/Projects/danes%20wellness/danes%20website/website/danes-next/src/app/layout.js#L21)

### Changes
Added the `data-scroll-behavior="smooth"` attribute to the root `<html>` tag to hook into App Router native transition triggers:
```diff
-    <html lang="en" suppressHydrationWarning>
+    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
```

---

## BUILD VERIFICATION
- `npm run build` — ✅ Passed (87 static pages compiled successfully, 0 errors).