// Content Script - Web sayfalarında çalışır ve kelime hover olaylarını yakalar

let tooltipElement = null;
let currentHoveredWord = null;
let hoverTimeout = null;
let isTooltipVisible = false;
let settings = {
  enabled: true,
  targetLanguage: 'tr',
  hoverDelay: 500, // ms
  autoSpeak: false
};

// Ayarları yükle
chrome.storage.sync.get(['settings'], (result) => {
  if (result.settings) {
    settings = { ...settings, ...result.settings };
  }
});

// Ayar değişikliklerini dinle
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.settings) {
    settings = { ...settings, ...changes.settings.newValue };
  }
});

// Kelime seçimi için yardımcı fonksiyon
function getWordAtPoint(x, y) {
  const range = document.caretRangeFromPoint(x, y);
  if (!range) return null;

  const textNode = range.startContainer;
  if (textNode.nodeType !== Node.TEXT_NODE) return null;

  const text = textNode.textContent;
  let start = range.startOffset;
  let end = range.startOffset;

  // Kelimenin başlangıcını bul
  while (start > 0 && /\w/.test(text[start - 1])) {
    start--;
  }

  // Kelimenin sonunu bul
  while (end < text.length && /\w/.test(text[end])) {
    end++;
  }

  const word = text.slice(start, end).trim();

  // En az 2 karakter ve sadece harf içeren kelimeler
  if (word.length < 2 || !/^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/.test(word)) {
    return null;
  }

  // Seçim aralığını oluştur
  const wordRange = document.createRange();
  wordRange.setStart(textNode, start);
  wordRange.setEnd(textNode, end);

  return {
    word: word,
    range: wordRange,
    rect: wordRange.getBoundingClientRect()
  };
}

// Tooltip oluştur
function createTooltip() {
  const tooltip = document.createElement('div');
  tooltip.id = 'articler-tooltip';
  tooltip.className = 'articler-tooltip';
  tooltip.innerHTML = `
    <div class="articler-tooltip-content">
      <button class="articler-close-btn" id="articler-close">×</button>
      <div class="articler-original">
        <span class="articler-label">Orijinal</span>
        <div class="articler-original-text"></div>
      </div>
      <div class="articler-translation">
        <span class="articler-label">Çeviri</span>
        <div class="articler-translation-text">
          <div class="articler-loader">Çevriliyor...</div>
        </div>
      </div>
      <div class="articler-actions">
        <button class="articler-btn articler-speak-btn" id="articler-speak">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          Sesli Oku
        </button>
        <button class="articler-btn articler-save-btn" id="articler-save">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          Kaydet
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(tooltip);

  // Event listeners
  tooltip.querySelector('#articler-close').addEventListener('click', hideTooltip);
  tooltip.querySelector('#articler-speak').addEventListener('click', speakWord);
  tooltip.querySelector('#articler-save').addEventListener('click', saveWord);

  return tooltip;
}

// Tooltip'i göster
function showTooltip(wordData) {
  if (!tooltipElement) {
    tooltipElement = createTooltip();
  }

  isTooltipVisible = true;
  currentHoveredWord = wordData;

  // Tooltip içeriğini güncelle
  tooltipElement.querySelector('.articler-original-text').textContent = wordData.word;
  tooltipElement.querySelector('.articler-translation-text').innerHTML = '<div class="articler-loader">Çevriliyor...</div>';

  // Pozisyonu hesapla
  const rect = wordData.rect;
  const tooltipWidth = 300;
  const tooltipHeight = 200;

  let left = rect.left + window.scrollX + (rect.width / 2) - (tooltipWidth / 2);
  let top = rect.bottom + window.scrollY + 10;

  // Ekran sınırlarını kontrol et
  if (left + tooltipWidth > window.innerWidth) {
    left = window.innerWidth - tooltipWidth - 10;
  }
  if (left < 10) {
    left = 10;
  }

  if (top + tooltipHeight > window.innerHeight + window.scrollY) {
    top = rect.top + window.scrollY - tooltipHeight - 10;
  }

  tooltipElement.style.left = `${left}px`;
  tooltipElement.style.top = `${top}px`;
  tooltipElement.classList.add('visible');

  // Çeviriyi al
  translateWord(wordData.word);
}

// Tooltip'i gizle
function hideTooltip() {
  if (tooltipElement) {
    tooltipElement.classList.remove('visible');
    isTooltipVisible = false;
    currentHoveredWord = null;
  }
}

// Kelimeyi çevir
async function translateWord(word) {
  try {
    const response = await chrome.runtime.sendMessage({
      type: 'TRANSLATE',
      text: word,
      targetLang: settings.targetLanguage
    });

    if (response.success && tooltipElement && isTooltipVisible) {
      tooltipElement.querySelector('.articler-translation-text').textContent = response.translation;

      if (settings.autoSpeak) {
        speakWord();
      }
    } else {
      tooltipElement.querySelector('.articler-translation-text').textContent = 'Çeviri yapılamadı';
    }
  } catch (error) {
    console.error('Translation error:', error);
    if (tooltipElement && isTooltipVisible) {
      tooltipElement.querySelector('.articler-translation-text').textContent = 'Çeviri hatası';
    }
  }
}

// Kelimeyi seslendir
function speakWord() {
  if (!currentHoveredWord) return;

  chrome.runtime.sendMessage({
    type: 'SPEAK',
    text: currentHoveredWord.word,
    lang: 'en-US'
  });
}

// Kelimeyi kaydet
function saveWord() {
  if (!currentHoveredWord) return;

  const translation = tooltipElement.querySelector('.articler-translation-text').textContent;

  if (translation && translation !== 'Çevriliyor...' && translation !== 'Çeviri yapılamadı') {
    chrome.runtime.sendMessage({
      type: 'SAVE_WORD',
      word: {
        original: currentHoveredWord.word,
        translation: translation,
        url: window.location.href,
        timestamp: Date.now()
      }
    });

    const saveBtn = tooltipElement.querySelector('#articler-save');
    saveBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
      Kaydedildi
    `;
    saveBtn.disabled = true;
  }
}

// Mouse olaylarını dinle
document.addEventListener('mousemove', (e) => {
  if (!settings.enabled) return;

  // Tooltip üzerindeyse işlem yapma
  if (e.target && e.target.closest && e.target.closest('#articler-tooltip')) {
    return;
  }

  // Önceki timeout'u temizle
  if (hoverTimeout) {
    clearTimeout(hoverTimeout);
  }

  // Yeni timeout başlat
  hoverTimeout = setTimeout(() => {
    const wordData = getWordAtPoint(e.clientX, e.clientY);

    if (wordData && (!currentHoveredWord || currentHoveredWord.word !== wordData.word)) {
      showTooltip(wordData);
    } else if (!wordData && isTooltipVisible) {
      // Tooltip dışına çıkıldığında kısa bir süre bekle
      setTimeout(() => {
        if (!tooltipElement?.matches(':hover')) {
          hideTooltip();
        }
      }, 300);
    }
  }, settings.hoverDelay);
});

// Tooltip dışına tıklandığında kapat
document.addEventListener('click', (e) => {
  if (isTooltipVisible && e.target && e.target.closest && !e.target.closest('#articler-tooltip')) {
    hideTooltip();
  }
});

// Scroll olduğunda tooltip'i gizle
let scrollTimeout;
document.addEventListener('scroll', () => {
  if (isTooltipVisible) {
    tooltipElement.style.opacity = '0.3';
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (tooltipElement) {
        tooltipElement.style.opacity = '1';
      }
    }, 150);
  }
}, true);

// Klavye kısayolları
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isTooltipVisible) {
    hideTooltip();
  }
});

console.log('ArticleR extension content script loaded');
