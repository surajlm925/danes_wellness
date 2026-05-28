# 🔧 Danes Wellness — Shop Page Bug Fixes Session Log

This log documents the three targeted UI/UX bug fixes applied to `src/app/shop/page.js` and `src/app/globals.css`.

---

## TASK 1 — FIX THE LAYOUT SHIFT (PIXEL JUMPING)

### Root Cause
The sidebar `<aside>` was using `overflow-y-auto` permanently. When the browser scrollbar appeared (on longer filter lists) or disappeared, it consumed ~8px of layout width, causing the product grid to the right to reflow and jump.

Additionally, a JS-based `onMouseEnter`/`onMouseLeave` hack was toggling `document.body.style.overflow = 'hidden'` to trap scroll inside the sidebar. This caused the entire page body's scrollbar to appear/disappear, producing a global full-page layout jump.

### Fixes Applied

#### `src/app/globals.css`
- Added `scrollbar-gutter: stable` to the `html` element globally. This permanently reserves the scrollbar lane width on the page root, so the content area never reflashes when a scrollbar appears or disappears anywhere.
- Added `.shop-sidebar` and `.concern-scroll` utility classes, both with `scrollbar-gutter: stable`, so their internal scrollbar lane is always pre-reserved even when `overflow:hidden`.

#### `src/app/shop/page.js`
- Added `style={{ scrollbarGutter: 'stable' }}` inline to the top-level page wrapper `<div>` as a direct belt-and-suspenders reinforcement.
- **Removed** the `onMouseEnter`/`onMouseLeave` handlers from `<aside>` that set `document.body.style.overflow`. This was the primary source of the global layout jump.
- **Removed** the corresponding orphaned `useEffect` cleanup that reset `document.body.style.overflow = ''`.

---

## TASK 2 — HOVER-ONLY SCROLLING

### Root Cause
Both the left filter sidebar and the concern checkbox list were `overflow-y-auto`, meaning a scrollbar was always rendered (and consuming layout space) even when no scrolling was needed.

### CSS Classes Changed

| Element | Before | After |
|---|---|---|
| `<aside>` (filter sidebar) | `overflow-y-auto scrollbar-thin` | `overflow-hidden hover:overflow-y-auto shop-sidebar` |
| `.concern-scroll` (concern list) | `overflow-y-auto` | `overflow-hidden hover:overflow-y-auto concern-scroll` |

**Why this works without layout shift:** `scrollbar-gutter: stable` (added in globals.css for `.shop-sidebar` and `.concern-scroll`) pre-reserves the scrollbar lane even when `overflow:hidden`. So when hover triggers `overflow-y-auto`, the scrollbar appears in already-reserved space — zero pixel jump.

#### `src/app/globals.css` — Added
```css
.shop-sidebar,
.concern-scroll {
  scrollbar-gutter: stable;
}

/* Scrollbar thumb invisible until hovered */
.shop-sidebar:not(:hover)::-webkit-scrollbar-thumb,
.concern-scroll:not(:hover)::-webkit-scrollbar-thumb {
  background-color: transparent;
}

html {
  scrollbar-gutter: stable;
}
```

---

## TASK 3 — REDUNDANT UI & CLEANUP

### Changes

#### Removed: Inline Search Bar
- **Location:** `src/app/shop/page.js`, page header section (lines 177–185 in original)
- **What was removed:** A `<div class="relative w-64 hidden md:block">` containing a text `<input>` for search.
- **Why:** The global Navbar already handles search via an animated overlay that routes to `/shop?q=...`. The inline shop search was redundant and cluttered the header. The `searchQuery` state + URL sync `useEffect` are **preserved** — they still power the URL-driven search from Nav.

#### Removed: "Application Type" Filter Block
- **Location:** `src/app/shop/page.js`, sidebar section
- **What was removed:** An entire `<div>` block rendering the "Application type" filter label + chevron icon.
- **Why:** The filter had no data and no toggle logic — it was a pure UI stub with zero functionality.

---

## BUILD VERIFICATION
- `npm run build` — ✅ Passed (86 static pages, 0 errors)
- Dev server hot-reloaded cleanly with no console errors