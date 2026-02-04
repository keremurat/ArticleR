# Chrome Web Store'da Yayınlama Rehberi

## 📋 Gerekli Şeyler

### 1. Chrome Web Store Developer Hesabı
- URL: https://chrome.google.com/webstore/devconsole
- Maliyet: $5 (tek seferlik)
- Google hesabı gerekli

### 2. Gerekli Görseller

#### İkonlar (✅ Hazır)
- ✅ 16x16 px
- ✅ 48x48 px
- ✅ 128x128 px

#### Promosyon Görselleri (Hazırlanacak)

**Küçük Promosyon Tarayıcı** (Zorunlu):
- Boyut: 440x280 px
- Format: PNG veya JPEG
- Kullanım: Store listesinde görünür

**Büyük Promosyon Tarayıcı** (Önerilen):
- Boyut: 920x680 px
- Format: PNG veya JPEG
- Kullanım: Öne çıkan eklentilerde

**Ekran Görüntüleri** (En az 1, maks 5):
- Boyut: 1280x800 px veya 640x400 px
- Format: PNG veya JPEG
- Kullanım: Extension'ın nasıl çalıştığını gösterir

**Marquee Promosyon** (Opsiyonel):
- Boyut: 1400x560 px
- Format: PNG veya JPEG
- Kullanım: Chrome Web Store anasayfasında öne çıkarılırsa

### 3. Zorunlu Dokümantasyon

#### Gizlilik Politikası
Extension veri topluyorsa (bizimki kullanıcı kelimelerini local storage'da saklıyor):

**Gerekli Bilgiler:**
- Hangi verilerin toplandığı
- Verilerin nasıl kullanıldığı
- Verilerin paylaşılıp paylaşılmadığı
- Kullanıcı veri kontrolü

**Örnek Metin (aşağıda)** → Web sitenizde yayınlayın veya GitHub Pages kullanın

## 🚀 Yayınlama Adımları

### Adım 1: Extension Paketini Hazırla

```bash
cd /home/panda/schol-ar-scientific-reader/extension
./build.sh
```

Oluşturulan `articler-extension.zip` dosyası kullanılacak.

### Adım 2: Developer Dashboard'a Giriş

1. https://chrome.google.com/webstore/devconsole adresine gidin
2. Google hesabınızla giriş yapın
3. $5 kayıt ücretini ödeyin (ilk kez için)

### Adım 3: Yeni Extension Oluştur

1. **"New Item"** butonuna tıklayın
2. `articler-extension.zip` dosyasını yükleyin
3. Formu doldurun:

**Store Listing:**
- **Extension Adı**: ArticleR - Akıllı Çeviri Asistanı
- **Kısa Açıklama** (132 karakter max):
  ```
  Web sayfalarında kelimelerin üzerine gelerek anında çeviri. Akademik okuma ve dil öğrenme için ideal araç.
  ```
- **Uzun Açıklama**:
  ```
  ArticleR, web'de okuduğunuz her şeyi dil öğrenme fırsatına dönüştürür.

  🌟 TEMEL ÖZELLİKLER

  📖 Evrensel Çeviri
  • Herhangi bir web sayfasında çalışır
  • Kelimenin üzerine gelince anında çeviri
  • 12+ dil desteği (TR, EN, ES, FR, DE ve daha fazlası)

  🎯 Akıllı Öğrenme
  • Kelime defteri - öğrendiğiniz kelimeleri kaydedin
  • Sesli okuma - doğru telaffuzu öğrenin
  • İstatistikler - ilerlemenizi takip edin
  • Günlük seri - düzenli öğrenmeyi teşvik eder

  ⚙️ Özelleştirilebilir
  • Hover gecikmesi ayarı
  • Tercih ettiğiniz dili seçin
  • Otomatik sesli okuma
  • Koyu tema desteği

  💾 Gizlilik Odaklı
  • Tüm verileriniz yerel olarak saklanır
  • Üçüncü taraflarla veri paylaşımı yok
  • İnternet sadece çeviri için kullanılır

  🎓 KULLANIM ALANLARI

  • Akademik makale okuma
  • Yabancı dil öğrenme
  • Haber siteleri ve bloglar
  • İngilizce dokümantasyon
  • Sosyal medya

  📱 NASIL KULLANILIR

  1. Extension'ı yükleyin
  2. Herhangi bir web sayfasını açın
  3. Kelimenin üzerine mouse'u getirin
  4. Çeviri otomatik görünür!

  Kolay, hızlı ve etkili dil öğrenme deneyimi.
  ```

- **Kategori**: Productivity (Üretkenlik)
- **Dil**: Turkish (ve İngilizce varsa ekleyin)

**Privacy Practices:**
- Veri toplama: YES (local storage'da kelimeler)
- Gizlilik politikası URL'i: (kendi web siteniz veya GitHub Pages)

**Görseller:**
- Small tile: 440x280
- Screenshots: En az 1 ekran görüntüsü

### Adım 4: Gizlilik Politikası Oluştur

GitHub Pages kullanarak:

```bash
# Repo'da privacy-policy.html oluşturun
# GitHub Settings > Pages > Enable
# URL: https://yourusername.github.io/articler/privacy-policy.html
```

Veya kendi web sitenizde yayınlayın.

### Adım 5: Review ve Yayınla

1. Tüm bilgileri kontrol edin
2. **"Submit for Review"** butonuna tıklayın
3. İnceleme süreci: **Genellikle 1-3 gün**
4. Onaylanırsa otomatik yayınlanır!

## ⚠️ Önemli Notlar

### Reddedilme Sebepleri

- Eksik veya hatalı gizlilik politikası
- Yetersiz açıklama/görseller
- Manifest hataları
- İzinler gerekçelendirilmemiş
- Marka ihlali (telif hakkı)

### Store Politikaları

- Spam yapmayın
- Kullanıcıyı yanıltmayın
- Gereksiz izinler istemeyin
- Kötü amaçlı kod yok
- Reklam politikalarına uyun

## 📊 Yayın Sonrası

### İstatistikler
- Kullanıcı sayısı
- İndirme oranı
- Değerlendirmeler
- Çökme raporları

### Güncelleme
Yeni versiyon yayınlamak için:
1. Version numarasını artırın (manifest.json)
2. Build edin
3. Yeni zip'i yükleyin
4. "Submit for Review"

### Kullanıcı Desteği
- Kullanıcı yorumlarına cevap verin
- Bug raporlarını takip edin
- Özellik isteklerini değerlendirin

## 🎨 Görsel Önerileri

### Küçük Tile (440x280)
- Extension ikonunu ortada gösterin
- Kısa slogan ekleyin: "Anlık Kelime Çevirisi"
- Mavi gradient arkaplan

### Ekran Görüntüleri
1. Bir web sayfasında tooltip çalışırken
2. Popup ayarlar ekranı
3. Kayıtlı kelimeler listesi
4. İstatistikler sayfası

### Büyük Tile (920x680)
- Özellik listesi
- Desteklenen diller
- "Hemen Deneyin" call-to-action

## 📞 Destek

Chrome Web Store desteği:
- https://support.google.com/chrome_webstore/

Developer forumu:
- https://groups.google.com/a/chromium.org/g/chromium-extensions

---

**Son kontrol listesi:**
- [ ] Zip dosyası hazır
- [ ] Tüm görseller hazır
- [ ] Gizlilik politikası online
- [ ] Açıklama metinleri yazıldı
- [ ] Test edildi ve çalışıyor
- [ ] Developer hesabı aktif
- [ ] $5 ücret ödendi

Başarılar! 🚀
