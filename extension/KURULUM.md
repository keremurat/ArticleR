# ArticleR Chrome Extension - Kurulum Rehberi

Bu rehber, ArticleR Chrome eklentisini bilgisayarınıza kurmanız için adım adım talimatlar içerir.

## 📋 Gereksinimler

- Google Chrome veya Chromium tabanlı tarayıcı (Edge, Brave, Opera, vb.)
- Linux/Mac/Windows işletim sistemi

## 🚀 Kurulum Adımları

### 1. Extension Dosyalarını Hazırlayın

Terminalde şu komutları çalıştırın:

```bash
# Extension klasörüne gidin
cd /home/panda/schol-ar-scientific-reader/extension

# Build script'ini çalıştırın
./build.sh
```

Build işlemi tamamlandığında `dist` klasörü oluşturulacaktır.

### 2. Chrome'u Açın

Google Chrome tarayıcınızı açın.

### 3. Extensions Sayfasına Gidin

Adres çubuğuna şunu yazın:
```
chrome://extensions/
```

Veya:
- Menü (⋮) → **Diğer araçlar** → **Uzantılar**

### 4. Geliştirici Modunu Aktif Edin

Sayfanın sağ üst köşesindeki **"Geliştirici modu"** (Developer mode) toggle'ını açın.

### 5. Extension'ı Yükleyin

- **"Paketlenmemiş uzantı yükle"** (Load unpacked) butonuna tıklayın
- Açılan dosya seçicisinde şu klasöre gidin:
  ```
  /home/panda/schol-ar-scientific-reader/extension/dist
  ```
- **"Klasörü seç"** butonuna tıklayın

### 6. Extension Aktif! 🎉

Artık ArticleR extension'ı yüklendi! Tarayıcı toolbar'ında ArticleR ikonu göreceksiniz.

## ✅ Kurulumu Test Edin

1. **Herhangi bir web sitesini açın** (örn: Wikipedia, Medium, bir blog)
2. **İngilizce bir kelimenin üzerine** mouse'unuzu getirin
3. **Birkaç saniye bekleyin**
4. Çeviri tooltip'i görünmelidir! 🎊

Test için önerilen siteler:
- https://en.wikipedia.org/wiki/Artificial_intelligence
- https://www.bbc.com/news
- https://medium.com/

## ⚙️ İlk Ayarlar

Extension ikonuna tıklayarak ayarları özelleştirin:

1. **Hedef Dil**: Türkçe (varsayılan) veya başka bir dil seçin
2. **Hover Gecikmesi**: Tooltip'in görünme süresini ayarlayın
3. **Otomatik Sesli Okuma**: İsterseniz aktif edin

## 🔧 Sorun Giderme

### Extension yüklenmiyor

**Hata: "Manifest dosyası bulunamadı"**
- `dist` klasörünün seçildiğinden emin olun, `extension` klasörünü değil
- Build script'inin başarıyla çalıştığından emin olun

**Hata: "Manifest version not supported"**
- Chrome'unuzun güncel olduğundan emin olun (minimum Chrome 88+)

### Tooltip görünmüyor

1. **Extension aktif mi kontrol edin**:
   - Extension ikonuna tıklayın
   - "Eklentiyi Aktif Et" toggle'ının açık olduğundan emin olun

2. **Sayfayı yenileyin** (F5)
   - Extension yükledikten sonra açık olan sayfaları yenilemeniz gerekir

3. **Console'da hata var mı kontrol edin**:
   - Sayfa üzerinde sağ tık → **İncele** → **Console** sekmesi
   - Kırmızı hatalar varsa not alın

4. **Extension console'unu kontrol edin**:
   - `chrome://extensions/` sayfasına gidin
   - ArticleR kartında **"service worker"** linkine tıklayın
   - Console'da hatalar varsa not alın

### Çeviri çalışmıyor

1. **İnternet bağlantınızı kontrol edin**
   - Extension çeviri için online API kullanır

2. **API limitleri**:
   - MyMemory API günlük 10,000 karakter limiti vardır
   - Limit aşıldıysa yarın tekrar deneyin veya kendi API key'inizi ekleyin

3. **Desteklenen diller**:
   - Kaynak dil İngilizce olmalı
   - Hedef dil popup'ta seçilen dil olmalı

## 🔄 Extension'ı Güncelleme

Extension'da değişiklik yaptığınızda veya yeni versiyon geldiğinde:

1. Terminalde build script'ini tekrar çalıştırın:
   ```bash
   cd /home/panda/schol-ar-scientific-reader/extension
   ./build.sh
   ```

2. `chrome://extensions/` sayfasında ArticleR kartındaki **yenile** (🔄) butonuna tıklayın

3. Açık sayfaları yenileyin (F5)

## 🗑️ Extension'ı Kaldırma

Extension'ı kaldırmak için:

1. `chrome://extensions/` sayfasına gidin
2. ArticleR kartında **"Kaldır"** butonuna tıklayın
3. Onaylayın

**Not**: Kaydedilen kelimeleriniz kaldırılacaktır. Önce dışa aktarmak isterseniz:
- Extension ikonuna tıklayın
- **İstatistikler** sekmesine gidin
- **"Kelimeleri Dışa Aktar"** butonuna tıklayın

## 📱 Diğer Chromium Tarayıcıları

### Microsoft Edge

1. `edge://extensions/` adresine gidin
2. Yukarıdaki adımları takip edin

### Brave Browser

1. `brave://extensions/` adresine gidin
2. Yukarıdaki adımları takip edin

### Opera

1. `opera://extensions/` adresine gidin
2. Yukarıdaki adımları takip edin

## 📞 Destek

Sorun yaşıyorsanız:

1. **Dokümantasyonu okuyun**: README.md
2. **GitHub Issues**: [Sorun bildirin](https://github.com/yourusername/articler/issues)
3. **Email**: your.email@example.com

## 🎓 İpuçları

- **Klavye kısayolu**: `Alt+Shift+T` ile extension'ı hızlıca açıp kapatın
- **Kelime kaydetme**: Öğrenmek istediğiniz kelimeleri kaydedin
- **Günlük hedef**: Her gün birkaç yeni kelime öğrenin
- **Dil değiştirme**: Farklı diller deneyerek çok dilli öğrenin

---

Kolay gelsin! 🚀
