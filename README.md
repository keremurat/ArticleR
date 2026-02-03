# ArticleR - Bilimsel Makale Okuyucu

<div align="center">

![ArticleR Logo](https://img.shields.io/badge/ArticleR-Scientific%20Reader-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)

**Akademik PDF'leri okumak, anlamak ve incelemek için gelişmiş bir web uygulaması**

[Özellikler](#-özellikler) • [Kurulum](#-kurulum) • [Kullanım](#-kullanım) • [Teknolojiler](#-teknolojiler)

</div>

---

## 📖 Proje Hakkında

**ArticleR**, akademik makaleleri ve bilimsel dokümanları daha verimli okumak için tasarlanmış modern bir PDF okuyucusudur. Özellikle yabancı dilde yazılmış akademik metinleri anlamanızı kolaylaştırmak amacıyla geliştirilmiştir.

### 🎯 Projenin Amacı

Akademik araştırmacılar, öğrenciler ve bilim insanları için:

- **Dil Bariyerini Kaldırma**: Yabancı dildeki makaleleri anında çevirerek okuma deneyimini iyileştirme
- **Aktif Öğrenme**: Kelimeleri kaydederek kelime dağarcığınızı geliştirme
- **Verimli Çalışma**: PDF'leri vurgulama ve arama yaparak önemli bilgilere hızlıca erişme
- **Organize Çalışma**: Kelime defteri ile öğrendiğiniz terimleri takip etme

### ✨ Temel Problem ve Çözüm

**Problem**: Akademik makaleler genellikle İngilizce veya diğer yabancı dillerde yazılır. Okuyucular:
- Bilinmeyen kelimeleri anlamak için sürekli sözlük aramak zorunda kalır
- Önemli terimleri not almak için başka araçlar kullanır
- PDF'lerde gezinmek ve arama yapmak zahmetlidir
- Öğrenilen kelimeleri takip etmek zordur

**Çözüm**: ArticleR tüm bu işlevleri tek bir arayüzde birleştirir:
- ✅ Anında kelime çevirisi (seçerek veya üzerine gelerek)
- ✅ Akıllı kelime defteri
- ✅ Güçlü arama ve vurgulama
- ✅ Sesli telaffuz desteği
- ✅ Çoklu dil desteği

---

## 🌟 Özellikler

### 1. 📄 Gelişmiş PDF Görüntüleme
- **Yüksek Kaliteli Render**: React-PDF ile kristal netliğinde PDF gösterimi
- **Zoom Kontrolü**: 50% - 300% arası yakınlaştırma/uzaklaştırma
- **Sayfa Navigasyonu**: Klavye kısayolları (← →) ile hızlı gezinme
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu

### 2. 🌍 Çoklu Dil Çeviri Sistemi

#### 🔹 Seçerek Çeviri
- Metni seçin, anında çeviri görün
- 5 farklı dil desteği: Türkçe, İngilizce, Almanca, Fransızca, İspanyolca
- Akademik terimler için özel sözlük

#### 🔹 Hover Çeviri (Yenilikçi!)
- Kelimeye mouse ile üzerine gelin
- 400ms sonra otomatik çeviri görüntülenir
- Okuma akışını bozmadan öğrenme

#### 🔹 Sesli Telaffuz
- Her kelimeyi native aksanla dinleyin
- Web Speech API entegrasyonu
- Öğrenmeyi pekiştirin

### 3. 🔍 Akıllı Arama Sistemi
- **Gerçek Zamanlı Arama**: PDF içeriğinde anında arama
- **Görsel Vurgulama**: Eşleşen metinler sarı renkle vurgulanır
- **Büyük/Küçük Harf Duyarsız**: "research" ve "Research" aynı sonucu verir
- **Klavye Kısayolu**: `Ctrl+F` ile hızlı erişim

### 4. 🎨 Renkli Metin Vurgulama
- **4 Farklı Renk**: Sarı, Yeşil, Mavi, Pembe
- **Kalıcı Vurgular**: LocalStorage'da otomatik kayıt
- **Kolay Silme**: Vurguya tıklayarak kaldırın
- **Sayfa Bazlı**: Her sayfada ayrı vurgular

### 5. 📝 Kelime Defteri
- **Otomatik Kayıt**: Çevrilen kelimeleri bir tıkla kaydedin
- **Detaylı Bilgi**: Orijinal, çeviri, sayfa numarası, tarih
- **Arama**: Kelime defterinde arama yapın
- **Export**: CSV veya JSON formatında indirin
- **Sayfa Referansı**: Kelimeye tıklayarak ilgili sayfaya gidin

### 6. 🌓 Koyu/Açık Mod
- Göz dostu karanlık tema
- Otomatik kayıt
- Gece okumak için ideal

### 7. ⌨️ Klavye Kısayolları
| Kısayol | İşlev |
|---------|-------|
| `Ctrl+F` | Arama kutusunu aç/kapat |
| `Ctrl+Z` | Yakınlaştır |
| `←` | Önceki sayfa |
| `→` | Sonraki sayfa |
| `Esc` | Çeviri/arama penceresini kapat |

---

## 🚀 Kurulum

### Gereksinimler
- **Node.js**: 18.x veya üzeri
- **npm** veya **yarn**

### Adım 1: Projeyi Klonlayın
```bash
git clone https://github.com/yourusername/articler.git
cd articler
```

### Adım 2: Bağımlılıkları Yükleyin
```bash
npm install
# veya
yarn install
```

### Adım 3: Geliştirme Sunucusunu Başlatın
```bash
npm run dev
# veya
yarn dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

### Adım 4: Production Build
```bash
npm run build
npm start
```

---

## 📱 Kullanım

### 1. PDF Yükleme
- Ana sayfada **"PDF Yükle"** butonuna tıklayın
- Bilgisayarınızdan bir PDF dosyası seçin
- PDF otomatik olarak yüklenecektir

### 2. Çeviri Kullanımı

#### Seçerek Çeviri:
1. PDF'de herhangi bir kelime/cümleyi seçin
2. Açılan pencerede çeviriyi görün
3. 🔊 **Sesli Oku** butonuna basarak telaffuzu dinleyin
4. ⭐ **Kaydet** butonuna basarak kelime defterine ekleyin

#### Hover Çeviri:
1. Sağ üstten **"Hover Çeviri"** modunu aktif edin
2. Herhangi bir kelimeye mouse ile gelin
3. 400ms sonra otomatik çeviri gösterilir

### 3. Arama Yapma
1. `Ctrl+F` tuşuna basın veya 🔍 ikonuna tıklayın
2. Aramak istediğiniz kelimeyi yazın
3. Eşleşen tüm metinler sarı renkle vurgulanır

### 4. Metin Vurgulama
1. 🖍️ **Highlighter** ikonuna tıklayın
2. Bir renk seçin (Sarı/Yeşil/Mavi/Pembe)
3. Vurgulamak istediğiniz metni seçin
4. Vurgu otomatik kaydedilir
5. Silmek için vurguya tıklayın

### 5. Kelime Defteri
1. 📖 **Kelime Defteri** ikonuna tıklayın
2. Kaydedilen tüm kelimeleri görün
3. Arama yapın veya export edin (CSV/JSON)
4. Sayfa numarasına tıklayarak ilgili sayfaya gidin

---

## 🛠️ Teknolojiler

### Frontend Framework
- **[Next.js 16.0](https://nextjs.org/)** - React framework with App Router
- **[React 19.2](https://react.dev/)** - UI library
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Type safety

### UI & Styling
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS
- **[Radix UI](https://www.radix-ui.com/)** - Accessible components
- **[Framer Motion](https://www.framer.com/motion/)** - Animations
- **[Lucide React](https://lucide.dev/)** - Icon library

### PDF & Translation
- **[React-PDF](https://github.com/wojtekmaj/react-pdf)** - PDF rendering
- **[PDF.js](https://mozilla.github.io/pdf.js/)** - PDF processing
- **[MyMemory Translation API](https://mymemory.translated.net/)** - Free translation service
- **[Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)** - Text-to-speech

### State Management & Storage
- **React Context API** - Global state
- **LocalStorage** - Persistent data (words, highlights, preferences)

---

## 📂 Proje Yapısı

```
articler/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Ana sayfa
│   └── globals.css         # Global stiller
├── components/
│   ├── scholar/
│   │   ├── pdf-viewer.tsx         # Ana PDF görüntüleyici
│   │   ├── pdf-upload.tsx         # PDF yükleme bileşeni
│   │   ├── translation-tooltip.tsx # Çeviri tooltip'i
│   │   └── word-notebook.tsx      # Kelime defteri
│   └── ui/                 # Radix UI bileşenleri
├── lib/
│   ├── pdf-context.tsx     # PDF state yönetimi
│   ├── translation.ts      # Çeviri servisi
│   └── utils.ts            # Yardımcı fonksiyonlar
├── hooks/
│   ├── use-mobile.ts       # Mobil tespit hook'u
│   └── use-toast.ts        # Toast bildirimleri
├── public/                 # Statik dosyalar
└── package.json            # Dependencies
```

---

## 🎨 Ekran Görüntüleri

### Ana Ekran
```
┌─────────────────────────────────────────────────────────┐
│  🏠 ArticleR              🌍 Türkçe  🔍 📖 🌓            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────┐                            │
│  │                         │                            │
│  │    PDF CONTENT          │                            │
│  │    (Vurgulama ve        │                            │
│  │     arama sonuçları)    │                            │
│  │                         │                            │
│  └─────────────────────────┘                            │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  ➖ 100% ➕ 📏         ◀ 1 / 10 ▶         ← → Ctrl+F    │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Çalışma Mantığı

### 1. Çeviri Akışı
```
Kullanıcı Metni Seçer
    ↓
Dil Algılama (Türkçe/İngilizce/vb.)
    ↓
Local Sözlük Kontrolü
    ↓ (bulunamazsa)
MyMemory API İsteği
    ↓
Çeviri Gösterimi + Sesli Okuma Seçeneği
    ↓ (isteğe bağlı)
Kelime Defterine Kaydet
```

### 2. Vurgulama Akışı
```
Vurgulama Modu Aktif
    ↓
Kullanıcı Metni Seçer
    ↓
PDF Koordinatları Hesaplanır
    ↓
Highlight Objesi Oluşturulur
    ↓
LocalStorage'a Kaydedilir
    ↓
Overlay ile Görselleştirilir
```

### 3. Arama Akışı
```
Kullanıcı Arama Yapar
    ↓
300ms Debounce
    ↓
PDF Text Layer Taraması (TreeWalker)
    ↓
Eşleşen Metinler Bulunur
    ↓
<mark> Elementleri Eklenir
    ↓
Sarı Vurgulama Uygulanır
```

---

## 🧩 Özellik Detayları

### Highlight System
- **Koordinat Sistemi**: PDF sayfasına göre relative pozisyon
- **Renk Seçimi**: 4 farklı renk paleti
- **Kalıcılık**: LocalStorage ile otomatik kayıt
- **Silme**: Hover + tıklama ile kolay silme

### Translation Service
- **API**: MyMemory (ücretsiz, API key gerektirmez)
- **Fallback**: 35+ yaygın akademik terim için local sözlük
- **Dil Algılama**: Regex ile Unicode karakter kontrolü
- **Hata Yönetimi**: API hatalarında orijinal metin gösterimi

### Word Notebook
- **Data Structure**:
  ```typescript
  interface SavedWord {
    id: string
    original: string
    translation: string
    pageNumber: number
    createdAt: Date
  }
  ```
- **Export Formatları**: CSV (Excel uyumlu) ve JSON
- **Arama**: Hem orijinal hem çeviri üzerinde arama

---

## 🔐 Veri Güvenliği & Gizlilik

- ✅ **Hiçbir veri sunucuya gönderilmez**
- ✅ Tüm PDF'ler tarayıcıda işlenir
- ✅ Kelime defteri ve vurgular LocalStorage'da tutulur
- ✅ Çeviri API'si anonim kullanılır
- ✅ Açık kaynak kod - şeffaflık

---

## 🐛 Bilinen Sorunlar & Sınırlamalar

1. **Tarayıcı Desteği**: Modern tarayıcılar gereklidir (Chrome, Firefox, Edge, Safari 14+)
2. **PDF Boyutu**: Çok büyük PDF'ler (>50MB) yavaş yüklenebilir
3. **Çeviri Limiti**: MyMemory API günlük 1000 karakter limiti vardır
4. **Taranmış PDF'ler**: OCR içermeyen taranmış PDF'lerde metin seçimi çalışmaz

---

## 🚧 Gelecek Geliştirmeler (Roadmap)

- [ ] **AI Özet**: PDF'in otomatik özeti (GPT-4 entegrasyonu)
- [ ] **Notlar**: Sayfalara not ekleme özelliği
- [ ] **Cloud Sync**: Kelimeleri ve vurguları bulutta senkronize etme
- [ ] **PDF Export**: Vurgulu PDF'i indirme
- [ ] **OCR Desteği**: Taranmış PDF'lerde metin tanıma
- [ ] **Anki Entegrasyonu**: Kelimeleri Anki'ye export etme
- [ ] **Çoklu PDF**: Aynı anda birden fazla PDF açma
- [ ] **Referans Yönetimi**: Bibliyografya oluşturma

---

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz!

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

## 👨‍💻 Geliştirici

**ArticleR Ekibi**

Sorularınız için: [GitHub Issues](https://github.com/yourusername/articler/issues)

---

## 🙏 Teşekkürler

Bu proje aşağıdaki açık kaynak projeleri kullanmaktadır:
- [React-PDF](https://github.com/wojtekmaj/react-pdf) - PDF rendering
- [MyMemory API](https://mymemory.translated.net/) - Translation service
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Tailwind CSS](https://tailwindcss.com/) - Styling

---

<div align="center">

**Akademik başarınız için geliştirildi 📚✨**

[⭐ Star](https://github.com/yourusername/articler) • [🐛 Report Bug](https://github.com/yourusername/articler/issues) • [✨ Request Feature](https://github.com/yourusername/articler/issues)

</div>
