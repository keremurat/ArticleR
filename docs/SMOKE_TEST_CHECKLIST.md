# Smoke Test Checklist

Bu kontrol listesi, yayın öncesi hızlı sağlık doğrulaması için hazırlanmıştır.

## 1) Frontend (Web App)

- [ ] `cd frontend && npm install` komutu başarılı
- [ ] `npm run lint` komutu errorsız tamamlanıyor
- [ ] `npm run build` komutu başarılı
- [ ] Uygulama açılıyor (`npm run dev`)
- [ ] PDF yükleme çalışıyor (geçerli PDF ile)
- [ ] Geçersiz dosya yüklemede doğru hata mesajı görünüyor
- [ ] Kelime çeviri tooltip'i açılıyor
- [ ] Kelime kaydetme deftere ekliyor
- [ ] Sayfa gezintisi ve zoom kontrolleri çalışıyor

## 2) Chrome Extension

- [ ] `cd chrome-extension && bash build.sh` başarılı
- [ ] `dist/` klasörü oluşuyor
- [ ] `articler-extension.zip` oluşuyor
- [ ] Script syntax kontrolü geçiyor
  - [ ] `node --check src/background.js`
  - [ ] `node --check src/content.js`
  - [ ] `node --check src/popup.js`
- [ ] Extension `chrome://extensions` üzerinden yükleniyor
- [ ] Hover ile kelime algılama çalışıyor
- [ ] Çeviri sonucu tooltip'te görünüyor
- [ ] Kelime kaydetme popup listesine düşüyor
- [ ] TTS (Sesli oku) aksiyonu çalışıyor

## 3) Data & Persistency

- [ ] Frontend localStorage verileri bozulmadan okunuyor
- [ ] Extension storage verileri (`chrome.storage`) düzgün yazılıyor
- [ ] Kaydedilmiş kelimeler silinebiliyor
- [ ] Export işlemi JSON dosyası üretiyor

## 4) Release Gate

Yayın için minimum koşullar:

- [ ] Frontend: lint + build başarılı
- [ ] Frontend: `npm audit --audit-level=high` temiz
- [ ] Extension: syntax + build başarılı
- [ ] Smoke checklist kritik maddeleri tamamlandı
- [ ] Bilinen kritik bug yok
