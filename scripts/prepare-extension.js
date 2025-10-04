const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const publicDir = path.join(__dirname, '..', 'public');

console.log('🔧 Preparing Chrome Extension files...');

// 1. Create dist/ folder if it doesn't exist 
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Cpy extention important files
const filesToCopy = ['manifest.json', 'background.js'];
const foldersToCopy = ['icons'];

// Copy files
filesToCopy.forEach(file => {
  const src = path.join(publicDir, file);
  const dest = path.join(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✅ Copied ${file}`);
  } else {
    console.warn(`⚠️  File ${file} not found`);
  }
});

// Copy Folders
foldersToCopy.forEach(folder => {
  const src = path.join(publicDir, folder);
  const dest = path.join(distDir, folder);
  if (fs.existsSync(src)) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.cpSync(src, dest, { recursive: true });
    console.log(`✅ Copied ${folder}/`);
  } else {
    console.warn(`⚠️  Folder ${folder} not found`);
  }
});

// Update paths into index.html 
const htmlFile = path.join(distDir, 'index.html');
if (fs.existsSync(htmlFile)) {
  let html = fs.readFileSync(htmlFile, 'utf8');
  
  // Fix paths for the extention
  html = html.replace(/href="\//g, 'href="./');
  html = html.replace(/src="\//g, 'src="./');
  
  fs.writeFileSync(htmlFile, html);
  console.log('✅ Updated HTML paths for Chrome Extension');
}

console.log('🎉 Extension preparation complete!');
console.log('📦 Extension ready in:', distDir);
