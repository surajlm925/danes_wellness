const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/lib/products.json'), 'utf8'));

const rxByName = products.filter(p => p.name.includes('(RX)') || p.name.includes('(Rx)'));
console.log('RX by name in product list (%d):', rxByName.length);
rxByName.forEach(p => console.log(`- ${p.slug} (${p.name})`));

const hasRxText = products.filter(p => {
  const text = JSON.stringify(p).toLowerCase();
  return text.includes('prescription') || text.includes('physician') || text.includes('doctor');
});
console.log('\nProducts containing prescription/physician/doctor in text (%d):', hasRxText.length);
hasRxText.slice(0, 10).forEach(p => console.log(`- ${p.slug}`));

// Check if any product has any other key than the ones we found earlier
const allKeys = new Set();
products.forEach(p => Object.keys(p).forEach(k => allKeys.add(k)));
console.log('\nAll unique keys in products.json:', [...allKeys]);
