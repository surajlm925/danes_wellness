const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/products.json');

try {
  const fileData = fs.readFileSync(filePath, 'utf8');
  const products = JSON.parse(fileData);

  const updatedProducts = products.map(product => {
    // Check if slug exists and contains "-rx" but not "-non-rx"
    const slugLower = (product.slug || '').toLowerCase();
    const isRx = slugLower.includes('-rx') && !slugLower.includes('-non-rx');
    
    return {
      ...product,
      isRx: !!isRx
    };
  });

  fs.writeFileSync(filePath, JSON.stringify(updatedProducts, null, 2), 'utf8');
  console.log(`Successfully updated ${updatedProducts.length} products. Products with isRx: true count: ${updatedProducts.filter(p => p.isRx).length}`);
} catch (error) {
  console.error('Error patching products:', error);
  process.exit(1);
}
