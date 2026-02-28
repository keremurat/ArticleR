# Extension Icons

Bu klasöre extension için gerekli icon dosyalarını ekleyin:

- `icon16.png` - 16x16px (toolbar icon)
- `icon48.png` - 48x48px (extension management page)
- `icon128.png` - 128x128px (Chrome Web Store)

## Icon Oluşturma

Iconları oluşturmak için aşağıdaki araçları kullanabilirsiniz:

1. **Figma/Sketch**: Vektör tasarım
2. **GIMP/Photoshop**: Raster düzenleme
3. **Online araçlar**:
   - https://favicon.io/
   - https://realfavicongenerator.net/
   - https://www.canva.com/

## Icon Tasarım İpuçları

- **Basit ve net**: Küçük boyutlarda da anlaşılır olmalı
- **Tanınabilir**: Uygulamanızın amacını yansıtmalı
- **Tutarlı**: Tüm boyutlarda aynı stil
- **Arka plan**: Şeffaf PNG kullanın
- **Renkler**: Canlı ve dikkat çekici (mavi tonları önerilir)

## Geçici Çözüm

Icon dosyaları oluşturana kadar, extension şu anda varsayılan Chrome icon'unu kullanacaktır.

Hızlıca test etmek için herhangi bir 128x128 PNG dosyasını farklı boyutlarda kopyalayabilirsiniz:

```bash
# Eğer ImageMagick yüklüyse:
convert icon128.png -resize 16x16 icon16.png
convert icon128.png -resize 48x48 icon48.png
```

## Logo Konsepti

ArticleR için önerilen logo konseptleri:
- 📚 Kitap + çeviri sembolü
- 💬 Konuşma balonu + dil sembolleri
- 🔤 Harf A + dünya
- 🎓 Akademik şapka + çeviri oku
