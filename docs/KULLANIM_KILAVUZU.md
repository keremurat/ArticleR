# 📖 ArticleR - Detaylı Kullanım Kılavuzu

## İçindekiler
1. [Hızlı Başlangıç](#1-hızlı-başlangıç)
2. [1 Dakikada İlk Kullanım Checklist](#2-1-dakikada-ilk-kullanım-checklist)
3. [PDF Yükleme](#3-pdf-yükleme)
4. [Çeviri Özellikleri](#4-çeviri-özellikleri)
5. [Arama ve Vurgulama](#5-arama-ve-vurgulama)
6. [Kelime Defteri](#6-kelime-defteri)
7. [Klavye Kısayolları](#7-klavye-kısayolları)
8. [İpuçları ve Püf Noktaları](#8-ipuçları-ve-püf-noktaları)
9. [Sık Sorulan Sorular](#9-sık-sorulan-sorular)

---

## 1. Hızlı Başlangıç

### Uygulama İlk Açıldığında

Uygulamayı açtığınızda karşınıza bir **hoş geldiniz ekranı** çıkacak:

```
┌─────────────────────────────────────┐
│                                     │
│        📚 ArticleR                  │
│    Bilimsel Makale Okuyucu          │
│                                     │
│    [📎 PDF Yükle]                   │
│                                     │
│    Sürükle-bırak veya              │
│    tıklayarak PDF yükleyin          │
│                                     │
└─────────────────────────────────────┘
```

**İki şekilde PDF yükleyebilirsiniz:**
- 📎 "PDF Yükle" butonuna tıklayıp dosya seçin
- PDF dosyasını sürükleyip bu alana bırakın

---

## 2. 1 Dakikada İlk Kullanım Checklist

Kurulumdan hemen sonra bu adımları sırayla tamamlayın:

1. ✅ Uygulamayı açın ve bir PDF yükleyin.
2. ✅ PDF içinde bir kelime seçip çeviri penceresinin açıldığını doğrulayın.
3. ✅ Çeviri penceresinde `⭐ Kaydet` ile kelimeyi deftere ekleyin.
4. ✅ `📖 Kelime Defteri` panelini açıp kaydın göründüğünü doğrulayın.
5. ✅ `Ctrl + F` ile arama kutusunu açıp PDF içinde bir kelime arayın.
6. ✅ (Opsiyonel) Hover çeviriyi açıp bir kelime üzerinde otomatik tooltip’i test edin.

Bu 6 adım başarılıysa temel kullanım akışı doğru çalışıyor demektir.

---

## 3. PDF Yükleme

### Adım Adım PDF Yükleme

#### Yöntem 1: Tıklayarak Yükleme
1. **"PDF Yükle"** butonuna tıklayın
2. Bilgisayarınızdan bir PDF dosyası seçin
3. **Açık/Open** butonuna basın
4. PDF otomatik olarak yüklenecektir

#### Yöntem 2: Sürükle-Bırak (Drag & Drop)
1. PDF dosyanızı masaüstünden veya klasörden seçin
2. Fareyle tutup uygulama ekranına getirin
3. Bırakın - otomatik yüklenecektir

### PDF Yüklendikten Sonra

PDF yüklendiğinde ana okuyucu arayüzü açılır:

```
┌─────────────────────────────────────────────────────────┐
│  🏠  ArticleR    |   👆 Hover  🌍 Türkçe   🔍 📖 🌓     │  ← Üst Menü
├─────────────────────────────────────────────────────────┤
│                                                          │
│              [ PDF İçeriği Burada ]                      │  ← PDF Alanı
│                                                          │
├─────────────────────────────────────────────────────────┤
│  ➖ 100% ➕ 📏        ◀  1/10  ▶                         │  ← Alt Kontroller
└─────────────────────────────────────────────────────────┘
```

---

## 4. Çeviri Özellikleri

ArticleR'da **3 farklı çeviri modu** vardır:

### 🔹 Mod 1: Seçerek Çeviri (Manuel)

En yaygın kullanım şeklidir.

**Nasıl Kullanılır:**
1. PDF'de çevirmek istediğiniz **kelimeyi veya cümleyi seçin** (fare ile sürükleyin)
2. Otomatik olarak **çeviri penceresi** açılır:

```
┌─────────────────────────────┐
│ × [Kapat]                   │
│                             │
│ ORİJİNAL:                   │
│ methodology                 │
│                             │
│ ÇEVİRİ:                     │
│ metodoloji, yöntem          │
│                             │
│ [🔊 Sesli Oku] [⭐ Kaydet]  │
└─────────────────────────────┘
```

3. **Sesli Oku** butonuna basarak telaffuzu dinleyebilirsiniz
4. **Kaydet** butonuna basarak kelime defterine ekleyebilirsiniz

**İpucu:** Uzun metinleri seçmeyin (max 200 karakter)

---

### 🔹 Mod 2: Hover Çeviri (Otomatik)

Okurken kesintisiz çeviri için idealdir.

**Nasıl Aktif Edilir:**
1. Sağ üstteki **"Hover Çeviri"** butonuna tıklayın (👆 ikonu)
2. Buton **mavi renkte** olmalı (aktif durumu)

**Nasıl Kullanılır:**
1. Herhangi bir kelimeye **fare imlecini getirin** (tıklamadan)
2. **400ms** (yarım saniye) bekleyin
3. Otomatik olarak küçük çeviri penceresi açılır
4. Fareyi çekerseniz pencere kapanır

**Ne Zaman Kullanmalı?**
- ✅ Hızlı okuma yaparken
- ✅ Sadece birkaç kelime anlamıyorsanız
- ✅ Kesintisiz okumak istiyorsanız

**Ne Zaman Kapatmalı?**
- ❌ Çok fazla bilmediğiniz kelime varsa (karışık olabilir)
- ❌ Metin kopyalayacaksanız

---

### 🔹 Mod 3: Dil Değiştirme

Çeviri dilini değiştirebilirsiniz.

**Nasıl Değiştirilir:**
1. Üst menüde **dil seçiciyi** bulun (🌍 🇹🇷 Türkçe)
2. Açılır menüden istediğiniz dili seçin:
   - 🇹🇷 Türkçe
   - 🇬🇧 English
   - 🇩🇪 Deutsch
   - 🇫🇷 Français
   - 🇪🇸 Español

**Örnek:** İngilizce → Türkçe çeviri için "Türkçe" seçin

---

### 🔊 Sesli Telaffuz

Her çevrilen kelimeyi sesli olarak dinleyebilirsiniz.

**Nasıl Kullanılır:**
1. Bir kelimeyi çevirin
2. Çeviri penceresinde **"🔊 Sesli Oku"** butonuna tıklayın
3. Tarayıcı kelimeyi sesli okuyacaktır

**Desteklenen Aksanlar:**
- 🇬🇧 İngilizce - İngiliz aksanı
- 🇹🇷 Türkçe - Türk aksanı
- 🇩🇪 Almanca - Alman aksanı
- 🇫🇷 Fransızca - Fransız aksanı
- 🇪🇸 İspanyolca - İspanyol aksanı

**İpucu:** Yeni kelimeler öğrenirken telaffuz çok önemlidir!

---

## 5. Arama ve Vurgulama

### 🔍 PDF İçinde Arama

Makalede belirli kelimeleri hızlıca bulun.

**Nasıl Kullanılır:**

#### Yöntem 1: Klavye Kısayolu
1. `Ctrl + F` tuşlarına basın

#### Yöntem 2: Menüden Açma
1. Sağ üstteki **🔍 Arama** ikonuna tıklayın

**Arama Yapmak:**
1. Açılan arama kutusuna kelimeyi yazın
2. Tüm eşleşmeler **sarı** renkle vurgulanır
3. Büyük/küçük harf duyarlı **değildir** ("Research" = "research")

**Örnek:**
- Arama: `hypothesis`
- Sonuç: PDF'deki tüm "hypothesis", "Hypothesis", "HYPOTHESIS" kelimeleri sarı olur

**Aramayı Kapatmak:**
- `Esc` tuşuna basın
- Veya tekrar 🔍 ikonuna tıklayın

---

### 🖍️ Metin Vurgulama (Highlighting)

Önemli metinleri renkli vurgulayın.

**Nasıl Aktif Edilir:**
1. Üst menüde **🖍️ Highlighter** ikonuna tıklayın
2. Renk paleti açılır - bir renk seçin:
   - 🟡 Sarı
   - 🟢 Yeşil
   - 🔵 Mavi
   - 🩷 Pembe

**Metni Vurgulamak:**
1. Vurgulama modunu aktif edin (yukarıdaki adım)
2. PDF'de vurgulamak istediğiniz metni **seçin**
3. Otomatik olarak seçili renkle vurgulanır
4. Vurgu **kalıcı olarak** kaydedilir

**Vurguyu Silmek:**
1. Vurgulanan metne **fareyle gelin**
2. **"Silmek için tıkla"** yazısı çıkar
3. Vurguya **tıklayın** - silinir

**Vurgulama Modunu Kapatmak:**
1. Tekrar 🖍️ ikonuna tıklayın
2. Artık normal metin seçimi yapabilirsiniz

**İpuçları:**
- 🟡 Sarı: Genel önemli metinler için
- 🟢 Yeşil: Olumlu sonuçlar, bulgular için
- 🔵 Mavi: Metodoloji, yöntemler için
- 🩷 Pembe: Tartışma, yorumlar için

---

## 6. Kelime Defteri

Öğrendiğiniz kelimeleri kaydedin ve takip edin.

### 📝 Kelime Kaydetme

**Yöntem 1: Çeviri Penceresinden**
1. Bir kelimeyi çevirin
2. **"⭐ Kaydet"** butonuna tıklayın
3. Kelime otomatik olarak deftere eklenir
4. Buton **"Kaydedildi"** olur

**Kaydedilen Bilgiler:**
- ✅ Orijinal kelime
- ✅ Çevirisi
- ✅ Hangi sayfada
- ✅ Kayıt tarihi

---

### 📖 Kelime Defterini Açma

1. Sağ üstte **📖 Kelime Defteri** ikonuna tıklayın
2. Sağ taraftan bir panel açılır

**Defteri Kapatmak:**
- Panelin dışına tıklayın
- Veya × butonuna basın

---

### 🔍 Kelime Defterinde Arama

1. Defteri açın
2. Üstteki **arama kutusuna** yazın
3. Hem orijinal hem çeviri içinde arar

**Örnek:**
- Arama: `method`
- Bulur: "methodology", "method", "yöntem" içeren tüm kayıtlar

---

### 📄 Sayfaya Gitme

Her kelime kaydında sayfa numarası gösterilir.

**Nasıl Kullanılır:**
1. Kelime kartında **"Sayfa X"** yazısına tıklayın
2. PDF otomatik olarak o sayfaya gider

**Kullanım Senaryosu:**
> "Bu kelimeyi nerede görmüştüm?" → Kelimeye tıkla → O sayfaya git

---

### 💾 Kelime Defterini Export Etme

Kelimeleri dışa aktarabilirsiniz.

**Nasıl Export Edilir:**
1. Kelime defterini açın
2. Sağ üstte **⬇️ İndir** butonuna tıklayın
3. Format seçin:
   - **📄 CSV olarak indir** → Excel'de açabilirsiniz
   - **🔧 JSON olarak indir** → Programlama için

**CSV Örneği (Excel):**
```
Orijinal,Çeviri,Sayfa,Tarih
methodology,metodoloji,3,01.02.2024
hypothesis,hipotez,5,01.02.2024
```

**Kullanım Alanları:**
- ✅ Excel'de kelime listesi oluşturmak
- ✅ Anki flashcard'larına eklemek
- ✅ Başka uygulamalara aktarmak

---

### 🗑️ Kelime Silme

**Nasıl Silinir:**
1. Kelime defterini açın
2. Silinecek kelime kartına **fareyle gelin**
3. Sağ tarafta **🗑️ çöp kutusu** ikonu belirir
4. İkona **tıklayın** - kelime silinir

---

## 7. Klavye Kısayolları

Hızlı çalışmak için klavye kısayolları:

| Kısayol | İşlev | Detay |
|---------|-------|-------|
| `Ctrl + F` | Arama | PDF içinde kelime ara |
| `Ctrl + Z` | Yakınlaştır | +25% zoom |
| `←` (Sol Ok) | Önceki Sayfa | Bir sayfa geriye git |
| `→` (Sağ Ok) | Sonraki Sayfa | Bir sayfa ileriye git |
| `Esc` | İptal/Kapat | Çeviri, arama pencerelerini kapat |

**İpucu:** Klavye kısayolları alt menüde de gösterilir.

---

## 8. İpuçları ve Püf Noktaları

### 🎯 Verimli Okuma İpuçları

#### 1. Hover Çeviri ile Hızlı Okuma
```
📖 Hover Modu AÇIK + Hızlı Okuma
↓
Bilinmeyen kelime → Fareyi getir → Anında çeviri
↓
Okumaya devam et
```

**Sonuç:** %50 daha hızlı okuma

---

#### 2. Renkli Vurgulama Stratejisi

Akademik makaleler için **renkli sistem**:

- 🟡 **Sarı**: Ana bulgular, önemli sonuçlar
- 🔵 **Mavi**: Metodoloji, yöntemler
- 🟢 **Yeşil**: Destekleyici veriler
- 🩷 **Pembe**: Tartışmalı noktalar, kendi yorumlarınız

**Örnek Kullanım:**
```
Makale Okuması:
- Abstract → 🟡 Ana bulguları vurgula
- Methods → 🔵 Önemli teknikleri vurgula
- Results → 🟢 Verileri vurgula
- Discussion → 🩷 Tartışmalı noktaları vurgula
```

---

#### 3. Kelime Defteri Stratejisi

**Kural:** Her sayfada en fazla 3-5 kelime kaydedin

**Neden?**
- ❌ Çok kelime kaydederseniz → Ezberlemek zor
- ✅ Seçici davranırsanız → Daha iyi öğrenme

**Hangi Kelimeleri Kaydetmeli?**
- ✅ Tekrar eden akademik terimler
- ✅ Makale için kritik kelimeler
- ✅ Günlük hayatta kullanabileceğiniz kelimeler
- ❌ Çok spesifik, bir kez geçen kelimeler

---

#### 4. Arama ile Kavram Takibi

Bir kavramın makalede nasıl kullanıldığını görmek için:

1. `Ctrl+F` ile kavramı arayın
2. Tüm kullanımları **sarı vurgulu** göreceksiniz
3. Sayfalar arası gezerek kavramın **evrimini** takip edin

**Örnek:**
- Arama: `machine learning`
- Sonuç: Makale boyunca bu terimin hangi bağlamlarda kullanıldığını görürsünüz

---

### 🏆 Profesyonel İpuçları

#### İpucu 1: Koyu Mod ile Göz Sağlığı
- Uzun süreli okumada **koyu mod** kullanın
- Özellikle gece okumalarında çok rahattır
- `🌓` ikonundan açabilirsiniz

#### İpucu 2: Zoom ile Odaklanma
- Küçük yazıları okurken **zoom** kullanın
- `Ctrl+Z` veya `➕` butonu ile yakınlaştırın
- Optimal okuma: **125-150%** zoom

#### İpucu 3: Sayfa Girişi ile Hızlı Gezinme
- Alt menüdeki sayfa kutusuna **sayfa numarasını yazın**
- `Enter` tuşuna basın
- Direkt o sayfaya gider

#### İpucu 4: PDF'yi Tam Ekran
- Tarayıcınızda `F11` tuşuna basın
- Dikkat dağıtıcı unsurlar kaybolur
- Sadece PDF odaklı okuma

---

## 9. Sık Sorulan Sorular

### ❓ PDF Yükleme Sorunları

**S: PDF yüklenmiyor, ne yapmalıyım?**

A: Şunları kontrol edin:
1. PDF dosyası **bozuk değil mi**?
2. Dosya boyutu **çok büyük mü**? (>50MB yavaş olabilir)
3. PDF **şifre korumalı mı**? (Şifrelileri desteklemiyoruz)
4. Tarayıcınız **güncel mi**?

**S: Taranmış PDF'lerde metin seçilmiyor?**

A: Taranmış (scanned) PDF'ler görüntüden oluşur. Metin seçimi için OCR gerekir. Şu anda OCR desteklenmemektedir.

**Çözüm:** PDF'inizi OCR uygulaması ile işleyin (Adobe Acrobat, ABBYY FineReader vb.)

---

### ❓ Çeviri Sorunları

**S: Çeviri çalışmıyor?**

A: İki durum olabilir:
1. **İnternet bağlantısı yok** → Çeviri API'si çalışmaz
2. **API limiti doldu** → MyMemory günlük 1000 karakter limiti var

**S: Çeviri yanlış çıkıyor?**

A: MyMemory API bazen hatalı çeviriler yapabilir. Akademik terimler için local sözlüğümüz daha doğrudur.

**İpucu:** Önemli terimleri sözlükten de kontrol edin.

**S: Türkçe dışında çeviri yapabiliyor muyum?**

A: Evet! 5 dil destekliyoruz:
- Türkçe ↔️ İngilizce
- Almanca ↔️ İngilizce
- Fransızca ↔️ İngilizce
- İspanyolca ↔️ İngilizce

---

### ❓ Vurgulama Sorunları

**S: Vurgularım kayboldu?**

A: LocalStorage temizlenmiş olabilir. Şunları kontrol edin:
- Tarayıcı geçmişi sildiniz mi?
- Gizli mod (incognito) kullanıyor musunuz?
- Farklı tarayıcıda mı açtınız?

**Öneri:** Önemli veriler için kelime defterini CSV olarak export edin.

**S: Vurgu yanlış yerde görünüyor?**

A: Zoom seviyesi değiştiğinde pozisyon kayabilir.

**Çözüm:** Vurguyu sildikten sonra tekrar oluşturun.

---

### ❓ Performans Sorunları

**S: Uygulama yavaş çalışıyor?**

A: Şu yöntemleri deneyin:
1. **Büyük PDF** → Zoom'u azaltın (%75-100 kullanın)
2. **Çok fazla vurgu** → Gereksiz vurguları silin
3. **Eski tarayıcı** → Chrome/Firefox son sürüm kullanın
4. **Düşük RAM** → Diğer sekmeleri kapatın

**S: Arama yavaş?**

A: Arama 300ms debounce ile çalışır. Yazmayı bitirdikten sonra yarım saniye bekleyin.

---

### ❓ Veri Güvenliği

**S: PDF'lerim sunucuya gönderiliyor mu?**

A: **Hayır!** Tüm işlemler tarayıcınızda yapılır. Hiçbir veri sunucuya gitmez.

**S: Kelime defterim güvende mi?**

A: Kelime defteri LocalStorage'da tutulur. Sadece sizin bilgisayarınızda saklanır.

**İpucu:** Yedekleme için kelime defterini CSV/JSON olarak export edin.

---

### ❓ Özellik İstekleri

**S: Notlar özelliği var mı?**

A: Şu anda yok. Gelecek sürümlerde eklenecek.

**S: Cloud sync yapabiliyor muyum?**

A: Şu anda yok. Roadmap'te var.

**S: Mobil uygulama var mı?**

A: Hayır, ama web uygulaması mobil uyumludur. Mobil tarayıcıdan kullanabilirsiniz.

---

## 🎓 Örnek Kullanım Senaryoları

### Senaryo 1: İngilizce Makale İncelemesi

**Durum:** Yüksek lisans öğrencisisiniz, İngilizce makale okuyorsunuz.

**Adımlar:**
1. PDF'yi yükleyin
2. **Hover çeviri** modunu açın
3. Makaleyi okurken bilinmeyen kelimelere fareyle gelin
4. Önemli terimleri **kaydedin** (⭐ Kaydet)
5. Ana bulguları **sarı vurgulayın**
6. Makalenin sonunda **kelime defterini CSV olarak export** edin
7. Excel'de kelime listesi oluşturun

**Sonuç:** Hem makaleyi anladınız hem kelime dağarcığınızı geliştirdiniz!

---

### Senaryo 2: Tez Literatür Taraması

**Durum:** 20 makale okumanız gerekiyor.

**Adımlar:**
1. Her makaleyi ArticleR'da açın
2. `Ctrl+F` ile **anahtar kelimeleri** arayın (örn: "machine learning")
3. İlgili bölümleri **mavi ile vurgulayın**
4. Önemli bulguları **sarı ile vurgulayın**
5. Kelime defterini her makale için export edin
6. Tüm kelimeleri birleştirerek **terim sözlüğü** oluşturun

**Sonuç:** Literatür taramanız sistematik ve organize!

---

### Senaryo 3: Sınava Hazırlık

**Durum:** Akademik İngilizce sınavı var, kelime ezberlemek gerekiyor.

**Adımlar:**
1. Ders materyallerini (PDF) ArticleR'da açın
2. **Her kelimeyi kaydedin**
3. Sesli telaffuz ile **🔊 Sesli Oku** yapın
4. Kelime defterini **CSV olarak** export edin
5. Excel'de kelime kartları (flashcards) oluşturun
6. Veya Anki'ye import edin

**Sonuç:** Kelime dağarcığınız gelişti, sınava hazırsınız!

---

## 📞 Destek ve Yardım

### Sorun mu Yaşıyorsunuz?

1. **GitHub Issues**: [github.com/yourusername/articler/issues](https://github.com/yourusername/articler/issues)
2. **E-posta**: support@scholar.com (örnek)

### Özellik İsteği

Yeni bir özellik mi istiyorsunuz?
- GitHub Issues'da **Feature Request** açın
- Detaylı açıklama yapın
- Kullanım senaryosu ekleyin

---

## 🌟 Güncellemeler

Yeni özellikler için [CHANGELOG.md](CHANGELOG.md) dosyasını takip edin.

---

<div align="center">

**Başarılı okumalar dileriz! 📚✨**

[⬆️ Başa Dön](#-articler---detaylı-kullanım-kılavuzu)

</div>
