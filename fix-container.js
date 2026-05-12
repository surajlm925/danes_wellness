const fs = require('fs');
const path = require('path');
const dirs = ['./src/sections', './src/components'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(file => {
    if (!file.endsWith('.jsx')) return;
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('className="container"')) {
      content = content.replace(/className="container"/g, 'className="container-danes"');
      fs.writeFileSync(filePath, content);
      console.log('Updated', filePath);
    }
  });
});
