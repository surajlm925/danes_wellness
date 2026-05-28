import { test, expect } from '@playwright/test';

test.describe('Danes Wellness E2E Test Suite', () => {
  
  test('1. Homepage loads and shows key sections', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/Danes/i);
    
    // Verify header/nav is present
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    await expect(nav.locator('text=DANES')).toBeVisible();
    
    // Verify hero heading
    const heroHeading = page.locator('h1.hero-h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('Your Body Already');
    
    // Verify shop by concern grid is visible
    const concernsSection = page.locator('#concerns');
    await expect(concernsSection).toBeVisible();
    
    // Verify testimonials section is visible
    const testimonialsSection = page.locator('section').filter({ hasText: /Arjun, Bengaluru/ });
    await expect(testimonialsSection).toBeVisible();
  });

  test('2. Shop page loads and concern filters work', async ({ page }) => {
    await page.goto('/shop');
    
    // Verify title
    const title = page.locator('h1');
    await expect(title).toContainText('ALL PRODUCTS');
    
    // Count all products initially
    const initialProductCards = page.locator('main .grid > div');
    const initialCount = await initialProductCards.count();
    console.log(`Initial product count on page: ${initialCount}`);
    expect(initialCount).toBeGreaterThan(0);
    
    // Click on 'Sleep' concern filter
    const sleepFilter = page.locator('aside label').filter({ hasText: /^Sleep$/ });
    await expect(sleepFilter).toBeVisible();
    await sleepFilter.click();
    
    // Verify products list is updated/filtered
    await page.waitForTimeout(1000); // Wait for transition
    const filteredCount = await page.locator('main .grid > div').count();
    console.log(`Filtered (Sleep) product count: ${filteredCount}`);
    expect(filteredCount).toBeLessThan(initialCount);
    
    // Clear filters
    const resetBtn = page.locator('button:has-text("Reset Filters")');
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();
    
    await page.waitForTimeout(500);
    const resetCount = await page.locator('main .grid > div').count();
    expect(resetCount).toBe(initialCount);
  });

  test('3. Product details, variant selection, and cart flow', async ({ page }) => {
    // Navigate to a specific product: Sleep (RX)
    await page.goto('/shop/sleep-rx');
    
    // Verify product heading
    const heading = page.locator('h1');
    await expect(heading).toContainText('Sleep (RX)');
    
    // Verify price
    const price = page.locator('text=₹1499');
    await expect(price).toBeVisible();
    
    // Select size '30 ml'
    const size30Btn = page.locator('button:has-text("30 ML")');
    await expect(size30Btn).toBeVisible();
    await size30Btn.click();
    
    // Click Add to Cart
    const addToCartBtn = page.locator('button:has-text("ADD TO CART")');
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();
    
    // Cart drawer should open
    const cartDrawer = page.locator('text=Your Cart');
    await expect(cartDrawer).toBeVisible();
    
    // Verify item in cart
    const cartItem = page.locator('h3:has-text("SLEEP (RX)")');
    await expect(cartItem).toBeVisible();
    
    // Verify subtotal
    const subtotalText = page.locator('span:has-text("Subtotal")');
    await expect(subtotalText).toBeVisible();
    
    // Increase quantity inside the cart drawer
    const plusBtn = page.locator('button:has-text("+")').first();
    await plusBtn.click();
    
    // Wait for update and verify quantity is exactly 2 inside the cart drawer (scoped selector)
    await page.waitForTimeout(500);
    const drawer = page.locator('div').filter({ has: page.locator('h2:has-text("Your Cart")') });
    const quantityText = drawer.locator('span').filter({ hasText: /^2$/ });
    await expect(quantityText).toBeVisible();
    
    // Proceed to checkout
    const checkoutLink = page.locator('a:has-text("Proceed to Checkout")');
    await expect(checkoutLink).toBeVisible();
    await checkoutLink.click();
    
    // URL should end with /checkout
    await expect(page).toHaveURL(/\/checkout/);
    
    // Verify checkout page text is readable
    const checkoutTitle = page.locator('h1');
    await expect(checkoutTitle).toContainText('Checkout');
  });
});
