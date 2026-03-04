// Content Script - Web sayfalarında çalışır ve kelime hover olaylarını yakalar

let tooltipElement = null;
let currentHoveredWord = null;
let hoverTimeout = null;
let isTooltipVisible = false;
let pageActivationAsked = false;
let pageActivationApproved = false;
let pageActivationPromptElement = null;
let settings = {
  enabled: true,
  targetLanguage: 'tr',
  hoverDelay: 500, // ms
  autoSpeak: false
};

function shouldSkipActivationPrompt(urlString) {
  try {
    const url = new URL(urlString);
    const hostname = url.hostname.toLowerCase();
    const pathname = url.pathname.toLowerCase();

    const isSearchEngine =
      hostname.includes('google.') ||
      hostname.includes('bing.com') ||
      hostname.includes('duckduckgo.com') ||
      hostname.includes('yandex.') ||
      hostname.includes('search.yahoo.com');

    if (!isSearchEngine) {
      return false;
    }

    if (hostname.includes('google.') && pathname === '/search') {
      return true;
    }

    if (hostname.includes('bing.com') && pathname === '/search') {
      return true;
    }

    if (hostname.includes('duckduckgo.com') && pathname === '/') {
      return true;
    }

    if (hostname.includes('yandex.') && pathname.includes('/search')) {
      return true;
    }

    if (hostname.includes('search.yahoo.com')) {
      return true;
    }
  } catch (_) {}

  return false;
}

function askPageActivation() {
  if (pageActivationAsked) {
    return pageActivationApproved;
  }

  pageActivationAsked = true;

  try {
    createPageActivationPrompt();
  } catch (error) {
    pageActivationApproved = true;
  }

  return pageActivationApproved;
}

function removePageActivationPrompt() {
  if (!pageActivationPromptElement) {
    return;
  }

  pageActivationPromptElement.remove();
  pageActivationPromptElement = null;
}

function createPageActivationPrompt() {
  if (pageActivationPromptElement || !document.body) {
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.id = 'articler-page-activation';
  wrapper.className = 'articler-page-activation';
  wrapper.innerHTML = `
    <div class="articler-page-activation-backdrop" data-action="skip"></div>
    <div class="articler-page-activation-dialog" role="dialog" aria-modal="true" aria-labelledby="articler-page-activation-title">
      <h3 id="articler-page-activation-title">ArticleR bu sitede aktif edilsin mi?</h3>
      <p>Aktifleştirirseniz bu sitede kelime üzerine geldiğinizde anında çeviri gösterilir.</p>
      <div class="articler-page-activation-actions">
        <button class="articler-page-btn articler-page-btn-secondary" type="button" data-action="skip">Hayır, Şimdilik Pasif</button>
        <button class="articler-page-btn articler-page-btn-primary" type="button" data-action="activate">Evet, Aktif Et</button>
      </div>
      <div class="articler-page-activation-footer">
        <a class="articler-page-activation-brand-link" href="https://eistatistik.com/" target="_blank" rel="noopener noreferrer" title="eistatistik.com">
          <picture>
            <source media="(prefers-color-scheme: dark)" srcset="${chrome.runtime.getURL('public/branding/logobeyaz-reduce.png')}">
            <img src="${chrome.runtime.getURL('public/branding/logosiyah_reduce.png')}" alt="Firma logosu">
          </picture>
        </a>
        <span>tarafından geliştirildi</span>
      </div>
    </div>
  `;

  const activateBtn = wrapper.querySelector('[data-action="activate"]');
  const skipTargets = wrapper.querySelectorAll('[data-action="skip"]');
  let cleanupObserver = null;

  const onKeydown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      decide(false);
    }
  };

  const decide = (approved) => {
    pageActivationApproved = approved;
    document.removeEventListener('keydown', onKeydown, true);
    cleanupObserver?.disconnect();
    removePageActivationPrompt();
  };

  activateBtn?.addEventListener('click', () => decide(true));
  skipTargets.forEach((element) => {
    element.addEventListener('click', () => decide(false));
  });

  document.addEventListener('keydown', onKeydown, true);

  cleanupObserver = new MutationObserver(() => {
    if (!document.body.contains(wrapper)) {
      document.removeEventListener('keydown', onKeydown, true);
      cleanupObserver.disconnect();
    }
  });

  cleanupObserver.observe(document.body, { childList: true, subtree: true });

  document.body.appendChild(wrapper);
  pageActivationPromptElement = wrapper;

  requestAnimationFrame(() => {
    wrapper.classList.add('visible');
    activateBtn?.focus({ preventScroll: true });
  });
}

function initializePageActivationPrompt(promptNow = true) {
  if (!settings.enabled) {
    pageActivationAsked = true;
    pageActivationApproved = false;
    return;
  }

  if (shouldSkipActivationPrompt(window.location.href)) {
    pageActivationAsked = true;
    pageActivationApproved = false;
    return;
  }

  pageActivationAsked = false;
  pageActivationApproved = false;

  if (!promptNow) {
    return;
  }

  setTimeout(() => {
    if (!pageActivationAsked) {
      askPageActivation();
    }
  }, 250);
}

// Ayarları yükle
chrome.storage.sync.get(['settings'], (result) => {
  if (result.settings) {
    settings = { ...settings, ...result.settings };
  }

  initializePageActivationPrompt(true);
});

// Ayar değişikliklerini dinle
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.settings) {
    const previousSettings = { ...settings };
    settings = { ...settings, ...changes.settings.newValue };

    if (!settings.enabled) {
      pageActivationAsked = true;
      pageActivationApproved = false;
      hideTooltip();
      return;
    }

    if (!previousSettings.enabled && settings.enabled) {
      pageActivationAsked = true;
      pageActivationApproved = true;
      return;
    }

    if (!pageActivationAsked) {
      initializePageActivationPrompt(false);
    }
  }
});

// Kelime seçimi için yardımcı fonksiyon
function extractSentenceFromText(text, start, end) {
  if (!text) return null;

  let left = Math.max(0, start);
  let right = Math.min(text.length, Math.max(start, end));

  while (left > 0 && !/[.!?;\n]/.test(text[left - 1])) {
    left--;
  }

  while (right < text.length && !/[.!?;\n]/.test(text[right])) {
    right++;
  }

  const sentence = text.slice(left, right).replace(/\s+/g, ' ').trim();
  return sentence.length >= 3 ? sentence : null;
}

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
  if (word.length < 2 || !/^[\p{L}\p{M}'-]+$/u.test(word)) {
    return null;
  }

  // Seçim aralığını oluştur
  const wordRange = document.createRange();
  wordRange.setStart(textNode, start);
  wordRange.setEnd(textNode, end);

  return {
    word: word,
    contextText: extractSentenceFromText(text, start, end),
    range: wordRange,
    rect: wordRange.getBoundingClientRect()
  };
}

function shouldIgnoreHoverTarget(target) {
  if (!target || typeof target.closest !== 'function') {
    return false;
  }

  if (target.closest('#articler-tooltip')) {
    return true;
  }

  if (target.closest('input, textarea, [contenteditable], [role="textbox"]')) {
    return true;
  }

  if (target.closest('code, pre, kbd, samp')) {
    return true;
  }

  if (target.closest('script, style, noscript')) {
    return true;
  }

  return false;
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
  translateWord(wordData.word, wordData.contextText);
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
async function translateWord(word, contextText) {
  try {
    const response = await chrome.runtime.sendMessage({
      type: 'TRANSLATE',
      text: word,
      targetLang: settings.targetLanguage,
      contextText: contextText || null
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

  if (pageActivationPromptElement) {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
    return;
  }

  if (shouldIgnoreHoverTarget(e.target)) {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
    return;
  }

  // Önceki timeout'u temizle
  if (hoverTimeout) {
    clearTimeout(hoverTimeout);
  }

  // Yeni timeout başlat
  hoverTimeout = setTimeout(() => {
    const wordData = getWordAtPoint(e.clientX, e.clientY);

    if (wordData && !pageActivationAsked) {
      if (!askPageActivation()) {
        return;
      }
    }

    if (wordData && !pageActivationApproved) {
      return;
    }

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
  try {
    if (isTooltipVisible && e.target && typeof e.target.closest === 'function' && !e.target.closest('#articler-tooltip')) {
      hideTooltip();
    }
  } catch (err) {
    // Hata durumunda tooltip'i kapat
    if (isTooltipVisible) {
      hideTooltip();
    }
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
