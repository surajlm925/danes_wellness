const fs = require('fs');
const path = require('path');
const dir = './src/sections';
fs.readdirSync(dir).forEach(file => {
  if (!file.endsWith('.jsx')) return;
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  if (!content.includes('import React')) {
    content = content.replace(/'use client'/, "'use client'\nimport React from 'react';");
    fs.writeFileSync(path.join(dir, file), content);
  }
});
