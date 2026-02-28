# ArticleR - Akıllı Çeviri Asistanı Chrome Eklentisi

Web sayfalarında kelimelerin üzerine gelerek anında çeviri yapın. Akademik makaleler ve günlük okuma için ideal.

## 🌟 Özellikler

### 📖 Evrensel Çeviri
- **Herhangi bir web sayfasında çalışır**: PDF'ler, blog yazıları, haber siteleri, sosyal medya ve daha fazlası
- **Fare ile hover**: Kelimenin üzerine mouse'u getirin, otomatik çeviri görsün
- **Anında çeviri**: MyMemory API ile hızlı ve doğru çeviriler
- **12+ dil desteği**: Türkçe, İngilizce, İspanyolca, Fransızca, Almanca ve daha fazlası

### 🎯 Akıllı Özellikler
- **Özelleştirilebilir gecikme**: Hover süresini ayarlayın (100ms - 2000ms)
- **Sesli okuma**: Kelimelerin doğru telaffuzunu öğrenin
- **Kelime defteri**: Öğrendiğiniz kelimeleri kaydedin
- **İstatistikler**: Öğrenme ilerlemenizi takip edin
- **Günlük seri**: Düzenli öğrenmeyi teşvik eden gamification

### 💾 Veri Yönetimi
- **Yerel depolama**: Tüm verileriniz güvenli şekilde tarayıcınızda saklanır
- **Dışa aktarma**: Kelimelerinizi JSON formatında indirin
- **Arama**: Kayıtlı kelimeler arasında hızlıca arayın
- **URL takibi**: Her kelimenin öğrenildiği sayfayı hatırlayın

### ⌨️ Klavye Kısayolları
- `Alt+Shift+T`: Eklentiyi aktif/pasif yap
- `Escape`: Açık tooltip'i kapat

## 📦 Kurulum

### Geliştirici Modunda Kurulum

1. **Repository'yi klonlayın**:
   ```bash
   git clone https://github.com/yourusername/articler.git
   cd articler/extension
   ```

2. **Extension'ı derleyin**:
   ```bash
   chmod +x build.sh
   ./build.sh
   ```

3. **Chrome'a yükleyin**:
   - Chrome'u açın ve `chrome://extensions/` adresine gidin
   - Sağ üstteki "Geliştirici modu" (Developer mode) toggle'ını aktif edin
   - "Paketlenmemiş uzantı yükle" (Load unpacked) butonuna tıklayın
   - `extension/dist` klasörünü seçin

4. **Kullanmaya başlayın**! 🎉

### Chrome Web Store'dan Kurulum (Yakında)

Extension henüz Chrome Web Store'da yayınlanmadı. Yayınlandığında buradan bağlantı paylaşılacak.

## 🎨 Kullanım

### Temel Kullanım

1. **Herhangi bir web sayfasını açın**
2. **Kelimenin üzerine mouse'u getirin** ve birkaç saniye bekleyin
3. **Çeviri otomatik görecek** görünür
4. İsterseniz:
   - 🔊 Sesli okuma yapın
   - ⭐ Kelimeyi kaydedin

### Ayarları Özelleştirme

Extension ikonuna tıklayarak ayarları açın:

- **Eklentiyi Aktif Et**: Extension'ı açıp kapayın
- **Hedef Dil**: Çeviri dilini seçin
- **Hover Gecikmesi**: Tooltip'in görünme süresini ayarlayın
- **Otomatik Sesli Okuma**: Her çeviride otomatik okuma yapın

### Kelime Defteri

Kaydettiğiniz kelimelere popup'tan erişin:

- **Kaydedilenler** sekmesinde tüm kelimelerinizi görün
- Arama yapın
- Sesli okuma yapın
- İstemediğiniz kelimeleri silin

### İstatistikler

**İstatistikler** sekmesinde:
- Toplam öğrenilen kelime sayısı
- Bugün öğrenilen kelimeler
- Günlük öğrenme seriniz
- Kelimelerinizi JSON formatında dışa aktarın

## 🔧 Yapılandırma

### Çeviri API'si

Varsayılan olarak MyMemory Translation API kullanılır (günlük 10,000 karakter ücretsiz limit).

Kendi API'nizi kullanmak için `src/background.js` dosyasındaki `handleTranslation` fonksiyonunu düzenleyin:

```javascript
async function handleTranslation(text, targetLang = 'tr') {
  // Kendi API'nizi buraya ekleyin
  const response = await fetch(`YOUR_API_ENDPOINT`);
  // ...
}
```

Desteklenen alternatif API'ler:
- LibreTranslate (self-hosted)
- Google Cloud Translation API
- DeepL API
- Microsoft Translator

### Desteklenen Diller

Manifest'te tanımlı diller:
- 🇹🇷 Türkçe (tr)
- 🇬🇧 English (en)
- 🇪🇸 Español (es)
- 🇫🇷 Français (fr)
- 🇩🇪 Deutsch (de)
- 🇮🇹 Italiano (it)
- 🇵🇹 Português (pt)
- 🇷🇺 Русский (ru)
- 🇸🇦 العربية (ar)
- 🇨🇳 中文 (zh)
- 🇯🇵 日本語 (ja)
- 🇰🇷 한국어 (ko)

## 🛠️ Geliştirme

### Proje Yapısı

```
extension/
├── manifest.json           # Extension manifest
├── popup.html             # Popup UI HTML
├── popup.css              # Popup UI styles
├── build.sh               # Build script
├── src/
│   ├── background.js      # Background service worker
│   ├── content.js         # Content script (injected)
│   ├── content.css        # Content script styles
│   └── popup.js           # Popup UI logic
├── public/
│   └── icons/            # Extension icons
└── dist/                 # Built extension (generated)
```

### Build Komutları

```bash
# Extension'ı derle
./build.sh

# Değişiklikleri test et
# Chrome'da chrome://extensions/ sayfasını aç
# Extension kartında "Yenile" butonuna tıkla
```

### Debugging

**Content Script hataları**:
- Web sayfasında sağ tık → İncele → Console
- "Content Script" filtresi

**Background Script hataları**:
- `chrome://extensions/` → Extension kartı → "service worker" linki

**Popup hataları**:
- Popup'ta sağ tık → İncele

## 🌐 API Limitlerinde

MyMemory Free API kullanıyorsanız:
- Günlük 10,000 karakter limiti
- Rate limiting olabilir
- Ticari kullanım için ücretli plan gerekli

Daha fazla kullanım için:
1. MyMemory hesabı oluşturun (günlük 50,000 karakter)
2. API key alın
3. `background.js`'de API key'i ekleyin

## 📝 Lisans

MIT License - Detaylar için LICENSE dosyasına bakın.

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz!

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 🐛 Sorun Bildirme

Bir sorun mu buldunuz? GitHub Issues'da bildirin:
https://github.com/yourusername/articler/issues

## 📧 İletişim

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Teşekkürler

- [MyMemory Translation API](https://mymemory.translated.net/)
- Chrome Extension Documentation
- Tüm katkıda bulunanlar

---

⭐ Beğendiyseniz yıldız vermeyi unutmayın!
