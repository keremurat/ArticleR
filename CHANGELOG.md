# Changelog

Bu dokümanda ScholAR projesindeki tüm önemli değişiklikler kayıt altına alınmaktadır.

Format [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) standardını takip eder.

---

## [0.2.0] - 2024-02-03

### ✨ Eklenen Özellikler

#### 🔍 PDF İçinde Arama
- PDF içeriğinde gerçek zamanlı arama özelliği eklendi
- Arama sonuçları sarı renkle vurgulanıyor
- Büyük/küçük harf duyarsız arama
- 300ms debounce ile performans optimizasyonu
- Klavye kısayolu: `Ctrl+F`

#### 🎨 Metin Vurgulama (Highlighting)
- 4 farklı renk ile metin vurgulama özelliği eklendi
  - Sarı (#fef08a)
  - Yeşil (#bbf7d0)
  - Mavi (#bfdbfe)
  - Pembe (#fbcfe8)
- Vurgular LocalStorage'da kalıcı olarak saklanıyor
- Vurgulara tıklayarak silme özelliği
- Her sayfa için ayrı vurgulama desteği
- Vurgulama modu toggle butonu ile aktif/pasif yapılabiliyor

### 🔧 İyileştirmeler
- PDF koordinat sisteminde relative pozisyon hesaplaması eklendi
- Highlight'lar için overlay sistemi geliştirildi
- Context API'de yeni state management yapısı (highlights)
- LocalStorage entegrasyonu ile veri kalıcılığı

### 📝 Dokümantasyon
- Detaylı README.md oluşturuldu
- Türkçe kullanım kılavuzu (KULLANIM_KILAVUZU.md) eklendi
- CHANGELOG.md başlatıldı

---

## [0.1.0] - 2024-02-02

### ✨ Eklenen Özellikler

#### 📄 PDF Görüntüleme
- React-PDF ile PDF render sistemi
- Zoom kontrolü (50% - 300%)
- Sayfa navigasyonu
- Responsive tasarım

#### 🌍 Çeviri Sistemi
- **Seçerek Çeviri**: Metin seçerek anında çeviri
- **Hover Çeviri**: Mouse ile kelimeye gelerek otomatik çeviri (400ms debounce)
- 5 dil desteği:
  - 🇹🇷 Türkçe
  - 🇬🇧 İngilizce
  - 🇩🇪 Almanca
  - 🇫🇷 Fransızca
  - 🇪🇸 İspanyolca
- MyMemory API entegrasyonu
- 35+ akademik terim için local sözlük
- Akıllı dil algılama (regex tabanlı)

#### 🔊 Sesli Telaffuz
- Web Speech API entegrasyonu
- Her dil için native aksan desteği
- Çeviri penceresinden tek tıkla sesli okuma

#### 📝 Kelime Defteri
- Çevrilen kelimeleri kaydetme
- Sayfa numarası ile referans
- Arama özelliği (orijinal ve çeviri)
- Export fonksiyonları:
  - CSV (Excel uyumlu)
  - JSON
- Kelime kartlarından ilgili sayfaya gitme
- LocalStorage ile veri kalıcılığı

#### 🌓 Görünüm Özellikleri
- Koyu/Açık mod toggle
- Smooth animasyonlar (Framer Motion)
- Radix UI ile erişilebilir bileşenler
- Tailwind CSS 4.0 ile modern tasarım

#### ⌨️ Klavye Kısayolları
- `Ctrl+Z` - Yakınlaştır
- `←` - Önceki sayfa
- `→` - Sonraki sayfa
- `Esc` - Çeviri/arama pencerelerini kapat

#### 📱 Kullanıcı Deneyimi
- PDF yükleme (dosya seçimi veya drag-drop)
- Loading skeletons
- Toast bildirimleri
- Responsive header ve footer
- Tooltip'ler ile rehberlik

### 🛠️ Teknik Altyapı
- **Framework**: Next.js 16.0 (App Router)
- **UI Library**: React 19.2
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.0
- **Components**: Radix UI
- **Animations**: Framer Motion
- **PDF**: React-PDF + PDF.js
- **State**: React Context API
- **Storage**: LocalStorage

### 🏗️ Proje Yapısı
```
schol-ar-scientific-reader/
├── app/                    # Next.js App Router
├── components/
│   ├── scholar/           # Ana özellik bileşenleri
│   └── ui/                # Radix UI bileşenleri
├── lib/                   # Utility ve context
└── hooks/                 # Custom React hooks
```

---

## Gelecek Sürümler (Roadmap)

### [0.3.0] - Planlanan
- [ ] AI Özet özelliği (GPT-4 entegrasyonu)
- [ ] Sayfalara not ekleme
- [ ] PDF üzerine çizim yapma
- [ ] Bookmark sistemi

### [0.4.0] - Planlanan
- [ ] Cloud sync (Firebase)
- [ ] Kullanıcı hesapları
- [ ] Çoklu cihaz senkronizasyonu
- [ ] Vurgulu PDF export

### [0.5.0] - Planlanan
- [ ] OCR desteği (taranmış PDF'ler için)
- [ ] Anki entegrasyonu
- [ ] Çoklu PDF (tabs)
- [ ] Referans yönetimi

---

## Kategori Açıklamaları

- **✨ Added (Eklenen)**: Yeni özellikler
- **🔧 Changed (Değiştirilen)**: Mevcut işlevlerde değişiklikler
- **🗑️ Deprecated (Kullanımdan Kaldırılan)**: Gelecekte kaldırılacak özellikler
- **🚫 Removed (Kaldırılan)**: Kaldırılan özellikler
- **🐛 Fixed (Düzeltilen)**: Bug düzeltmeleri
- **🔒 Security (Güvenlik)**: Güvenlik iyileştirmeleri
- **📝 Documentation (Dokümantasyon)**: Dokümantasyon güncellemeleri

---

## Versiyonlama

Bu proje [Semantic Versioning](https://semver.org/) kullanmaktadır:

- **MAJOR** (Ana): Geriye uyumsuz API değişiklikleri
- **MINOR** (Minör): Geriye uyumlu yeni özellikler
- **PATCH** (Yama): Geriye uyumlu bug düzeltmeleri

**Örnek:** `0.2.0`
- `0` - Ana versiyon (beta)
- `2` - 2 yeni özellik seti eklendi
- `0` - Bug düzeltme sayısı

---

## Katkıda Bulunanlar

- [@panda](https://github.com/panda) - Proje sahibi ve geliştirici

Katkıda bulunmak ister misiniz? [CONTRIBUTING.md](CONTRIBUTING.md) dosyasına göz atın!

---

<div align="center">

**ScholAR** - Akademik başarınız için geliştirildi 📚✨

[Ana Sayfa](README.md) • [Kullanım Kılavuzu](KULLANIM_KILAVUZU.md) • [GitHub](https://github.com/yourusername/schol-ar-scientific-reader)

</div>
