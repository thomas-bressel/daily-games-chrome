const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..'); 
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');

// New paths
const nextDir = path.join(distDir, '_next');
const newNextDir = path.join(distDir, 'app_next'); // New name without  '_'
const nextPrefix = './_next/'; // Prefix used into paths genereted by Next

console.log('🔧 Preparing Chrome Extension files...');

// 1. Create dist/ folder if it doesn't exist 
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// --- Move the  _next folder ---
if (fs.existsSync(nextDir)) {
    fs.renameSync(nextDir, newNextDir);
    console.log(`✅ Renamed ${path.basename(nextDir)} to ${path.basename(newNextDir)}`);
} else {
    console.warn(`⚠️  Folder ${path.basename(nextDir)} not found. Skipping rename.`);
}
// ----------------------------------------------------


// Cpy extention important files
const filesToCopy = ['manifest.json', 'background.js'];
const foldersToCopy = ['icons'];

// Copy files (unchanged)
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

// Copy Folders (unchanged)
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
  
  // --- Update paths into  HTML ---
  // Preplace all references from  _next/ to app_next/
  html = html.replace(new RegExp(nextPrefix.replace(/\./g, '\\.'), 'g'), './app_next/'); 
  // ------------------------------------------------------------------

  fs.writeFileSync(htmlFile, html);
  console.log('✅ Updated HTML paths for Chrome Extension');
}

console.log('🎉 Extension preparation complete!');
console.log('📦 Extension ready in:', distDir);