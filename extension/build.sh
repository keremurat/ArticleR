#!/bin/bash

# ArticleR Chrome Extension Build Script

echo "🔨 Building ArticleR Chrome Extension..."

# Create dist directory
rm -rf dist
mkdir -p dist/icons

# Copy manifest
echo "📋 Copying manifest..."
cp manifest.json dist/

# Copy source files
echo "📦 Copying source files..."
cp src/content.js dist/content.js
cp src/content.css dist/content.css
cp src/background.js dist/background.js
cp src/popup.js dist/popup.js

# Copy HTML and CSS files
cp popup.html dist/popup.html
cp popup.css dist/popup.css

# Copy icons (if they exist)
if [ -d "public/icons" ]; then
  echo "🎨 Copying icons..."
  cp -r public/icons/* dist/icons/
fi

# Create zip file for Chrome Web Store
echo "📦 Creating zip file..."
cd dist
zip -r ../articler-extension.zip .
cd ..

echo "✅ Build complete! Extension files are in the 'dist' folder"
echo "📦 Zip file created: articler-extension.zip"
echo ""
echo "To install the extension:"
echo "1. Open Chrome and go to chrome://extensions/"
echo "2. Enable 'Developer mode' (toggle in top right)"
echo "3. Click 'Load unpacked' and select the 'dist' folder"
