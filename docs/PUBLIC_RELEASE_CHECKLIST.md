# Public Release Checklist

Bu liste, projeyi public kullanıcılar için güvenli ve anlaşılır şekilde yayınlamadan önce uygulanacak minimum adımları içerir.

## 1) Dokümantasyon

- [ ] `README.md` Quick Start adımları güncel
- [ ] `chrome-extension/README.md` ve `chrome-extension/KURULUM.md` kurulum adımları tutarlı
- [ ] Placeholder bilgi kalmadı (`yourusername`, örnek e-posta, eski yol)

## 2) Teknik Doğrulama

- [ ] Frontend: `cd frontend && npm run lint && npm run build`
- [ ] Extension: `cd chrome-extension && node --check src/background.js && node --check src/content.js && node --check src/popup.js && bash build.sh`
- [ ] `chrome-extension/dist` klasörü güncel build içeriyor

## 3) Güvenlik ve Kalite

- [ ] Frontend güvenlik taraması temiz: `cd frontend && npm audit --audit-level=high`
- [ ] CI workflow'ları başarılı (`quality-gate`, `security-audit`)
- [ ] Kritik bilinen bug listesi gözden geçirildi

## 4) Yayın Hazırlığı

- [ ] Sürüm notu (`docs/CHANGELOG.md`) güncellendi
- [ ] Extension paket dosyası (`articler-extension.zip`) test edildi
- [ ] Kurulum adımları temiz bir tarayıcı profilinde test edildi

## 5) Public İletişim

- [ ] Issues/Discussions sekmeleri aktif
- [ ] İlk kullanıcılar için kısa geri bildirim çağrısı eklendi
- [ ] Public kullanım notları (gizlilik, veri saklama) kontrol edildi
- [ ] Issue ve PR template'leri hazır (`.github/ISSUE_TEMPLATE`, `.github/pull_request_template.md`)
