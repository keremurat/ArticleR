const guideModal = document.getElementById('guideModal');
const guideTrigger = document.getElementById('guideTrigger');
const guideBackdrop = document.getElementById('guideBackdrop');
const guideCloseBtn = document.getElementById('guideCloseBtn');

function openGuideModal() {
  guideModal.classList.add('open');
  guideModal.setAttribute('aria-hidden', 'false');
}

function closeGuideModal() {
  guideModal.classList.remove('open');
  guideModal.setAttribute('aria-hidden', 'true');
}

guideTrigger.addEventListener('click', openGuideModal);
guideBackdrop.addEventListener('click', closeGuideModal);
guideCloseBtn.addEventListener('click', closeGuideModal);

// Aktif Et butonu
document.getElementById('activateBtn').addEventListener('click', async () => {
  try {
    console.log('Activating extension...');

    // Extension'ı aktif et
    await chrome.storage.sync.set({
      settings: {
        enabled: true,
        targetLanguage: 'tr',
        hoverDelay: 500,
        autoSpeak: false
      },
      onboardingCompleted: true
    });

    console.log('Settings saved successfully');

    // Başarı animasyonu göster
    const activationSection = document.querySelector('.activation-section');
    activationSection.style.background = '#ecfdf5';
    activationSection.style.borderColor = '#34d399';
    activationSection.innerHTML = `
      <div style="text-align: center; padding: 8px 4px;">
        <h2 style="color: #047857; margin-bottom: 8px;">Aktif Edildi ✓</h2>
        <p style="color: #065f46;">Hazır. Sekme kapatılıyor...</p>
      </div>
    `;

    // 1 saniye bekle, sonra sekmeyi kapat
    setTimeout(() => {
      console.log('Closing tab...');
      window.close();
    }, 1000);

  } catch (error) {
    console.error('Activation error:', error);
    alert('Ayarlar kaydedildi ancak sayfa kapatılamadı. Manuel olarak kapatabilirsiniz.');
  }
});

// Daha Sonra butonu
document.getElementById('skipBtn').addEventListener('click', async () => {
  try {
    console.log('Skipping activation...');

    // Eklenti pasif olarak işaretle
    await chrome.storage.sync.set({
      settings: {
        enabled: false,
        targetLanguage: 'tr',
        hoverDelay: 500,
        autoSpeak: false
      },
      onboardingCompleted: true
    });

    console.log('Settings saved, closing tab...');

    // Hemen sekmeyi kapat
    window.close();

  } catch (error) {
    console.error('Skip error:', error);
    // Hata olsa bile sekmeyi kapat
    window.close();
  }
});

// Klavye kısayolları
document.addEventListener('keydown', (e) => {
  if (guideModal.classList.contains('open') && e.key === 'Escape') {
    e.preventDefault();
    closeGuideModal();
    return;
  }

  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('activateBtn').click();
  } else if (e.key === 'Escape') {
    e.preventDefault();
    document.getElementById('skipBtn').click();
  }
});

// Sayfa yüklendiğinde focus
window.addEventListener('load', () => {
  console.log('Welcome page loaded');
});
