# 🔧 Danes Wellness — Product Ref ID Display Session Log

This log documents the implementation of the Product Reference ID display and copy-to-clipboard feature on the Product Details page.

---

## TASK 1 — DISPLAY PRODUCT ID

### Location
`src/components/ProductDetailClient.jsx`

### Implementation

Two pure functions added at the top of the file (above `AccordionItem`):

#### `parseProductRef(id)`
A utility that normalises the product ID regardless of source format:
- **Plain numeric string** (current): `"42"` → `{ display: "42", full: "42" }`
- **Shopify GraphQL GID** (future Headless integration): `"gid://shopify/ProductVariant/9876543210"` → `{ display: "9876543210", full: "gid://shopify/ProductVariant/9876543210" }`

The UI always shows only the **numeric portion** (`display`). The clipboard always gets the **full string** (`full`), which will be the complete GID when Shopify integration is live.

#### `<ProductRef id={product.id} />` Component
- Renders a `<button>` styled as an inline ghost label — no visual weight.
- Shows `Ref: <numeric-id>` in `font-mono text-[10px] opacity-40` — unobtrusive below the product title.
- On hover: opacity lifts to 70%, a subtle `Copy` label appears in brand amber (`var(--accent)`).
- On click: copies `ref.full` to clipboard, `Copy` → `✓ Copied` in brand green, auto-resets after 2 seconds.
- Fallback: `document.execCommand('copy')` for non-HTTPS environments.
- `aria-label` for screen readers.

### Placement
Inserted between the **Product Title `<h1>`** and the **Rx Consultation Banner** in the right column of the PDP layout:

```jsx
<h1 className="... mb-2 ...">
  {product.name}
</h1>

{/* Product Reference ID — for WhatsApp Bot lookups */}
<ProductRef id={product.id} />

{/* Consultation Banner for Rx products */}
{isRx && ( ... )}
```

The title's `mb-4` was reduced to `mb-2` to give natural spacing to the new ref row.

---

## TASK 2 — COPY TO CLIPBOARD

Implemented inline within the `ProductRef` component:

| Behaviour | Detail |
|---|---|
| Click target | Entire `Ref: XXXXX` button |
| Clipboard value | `ref.full` — the full original ID string (numeric now, GID when Shopify is live) |
| Success state | `✓ Copied` in brand green `#2d7a4f` (dark: `#8fcea8`) |
| Reset delay | 2000ms via `setTimeout` |
| Fallback | `document.execCommand('copy')` textarea hack for non-secure contexts |
| Accessibility | `title` + `aria-label` attributes |

---

## DESIGN SYSTEM COMPLIANCE

| Token used | Value |
|---|---|
| Text colour | `var(--text)` |
| Opacity | `opacity-40` (resting), `opacity-70` (hover) |
| Confirm colour light | `#2d7a4f` (brand mid-green) |
| Confirm colour dark | `#8fcea8` (pale green on dark bg) |
| Copy label colour | `var(--accent)` — brand amber |
| Font | `font-mono` for the numeric ID (improves readability of long GIDs) |
| Size | `text-[10px]` — same scale as existing micro-labels on the PDP |

---

## FORWARD COMPATIBILITY

When the Headless Shopify integration goes live and `product.id` becomes a GID string like:
```
gid://shopify/ProductVariant/9876543210
```
`parseProductRef` will automatically split it, displaying only `9876543210` in the UI while copying the full GID to the clipboard — **zero code changes needed**.

---

## BUILD VERIFICATION
- `npm run build` — ✅ Passed (86 static pages, 0 errors)