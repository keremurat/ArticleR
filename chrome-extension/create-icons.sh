#!/bin/bash

# ArticleR Icon Generator
# ImageMagick kullanarak basit placeholder ikonlar oluşturur

echo "🎨 Creating ArticleR extension icons..."

# ImageMagick yüklü mü kontrol et
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick yüklü değil!"
    echo "Yüklemek için: sudo apt-get install imagemagick"
    exit 1
fi

cd public/icons

# 128x128 ana ikon oluştur (mavi gradient arka plan + beyaz A harfi)
convert -size 128x128 \
    gradient:'#3b82f6-#2563eb' \
    -gravity center \
    -pointsize 80 \
    -font DejaVu-Sans-Bold \
    -fill white \
    -annotate +0+0 'A' \
    icon128.png

# 48x48 ikon oluştur
convert icon128.png -resize 48x48 icon48.png

# 16x16 ikon oluştur
convert icon128.png -resize 16x16 icon16.png

echo "✅ Icons created successfully!"
echo "📁 Location: extension/public/icons/"
ls -lh icon*.png

cd ../..

# Build'i yeniden çalıştır
echo ""
echo "🔨 Rebuilding extension with new icons..."
./build.sh
