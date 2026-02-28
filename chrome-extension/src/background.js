// Background Service Worker - Chrome Extension arka plan işlemleri

// Varsayılan ayarlar
const DEFAULT_SETTINGS = {
  enabled: true,
  targetLanguage: 'tr',
  hoverDelay: 500,
  autoSpeak: false,
  debugMode: false,
  translationService: 'mymemory' // free API
};

const SUPPORTED_LANGUAGES = new Set([
  'tr', 'en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ar', 'zh', 'ja', 'ko'
]);

function normalizeLanguageCode(lang) {
  const code = String(lang || 'tr').toLowerCase().split('-')[0];
  return SUPPORTED_LANGUAGES.has(code) ? code : 'tr';
}

function detectSourceLanguage(text) {
  if (!text) return 'en';

  if (/[ğüşöçıİĞÜŞÖÇ]/.test(text)) return 'tr';
  if (/[äöüßÄÖÜ]/.test(text)) return 'de';
  if (/[àâçéèêëîïôûùüÿœæ]/i.test(text)) return 'fr';
  if (/[áéíóúñ¿¡]/i.test(text)) return 'es';
  if (/[àèéìíîòóù]/i.test(text)) return 'it';
  if (/[ãõâêôç]/i.test(text)) return 'pt';
  if (/[\u0400-\u04FF]/.test(text)) return 'ru';
  if (/[\u0600-\u06FF]/.test(text)) return 'ar';
  if (/[\u3040-\u30FF]/.test(text)) return 'ja';
  if (/[\uAC00-\uD7AF]/.test(text)) return 'ko';
  if (/[\u4E00-\u9FFF]/.test(text)) return 'zh';

  return 'en';
}

// Extension yüklendiğinde
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    // İlk kurulumda - Hoş geldiniz sayfasını aç
    chrome.tabs.create({ url: chrome.runtime.getURL('welcome.html') });
  } else if (details.reason === 'update') {
    // Güncelleme bildirimi (opsiyonel)
    console.log('ArticleR güncellendi!');
  }

  // Ayarları kontrol et, yoksa varsayılanları yükle
  const result = await chrome.storage.sync.get(['settings', 'onboardingCompleted']);
  if (!result.settings) {
    await chrome.storage.sync.set({
      settings: DEFAULT_SETTINGS,
      onboardingCompleted: false
    });
  }
});

// Mesajları dinle
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'TRANSLATE') {
    handleTranslation(request.text, request.targetLang)
      .then(result => sendResponse({
        success: true,
        translation: result.translation,
        debug: result.debug
      }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Async response için gerekli
  }

  if (request.type === 'SPEAK') {
    handleTextToSpeech(request.text, request.lang);
    sendResponse({ success: true });
    return true;
  }

  if (request.type === 'SAVE_WORD') {
    handleSaveWord(request.word)
      .then(() => sendResponse({ success: true }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }

  if (request.type === 'GET_SAVED_WORDS') {
    getSavedWords()
      .then(words => sendResponse({ success: true, words }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }

  if (request.type === 'DELETE_WORD') {
    deleteWord(request.wordId)
      .then(() => sendResponse({ success: true }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }
});

// Çeviri fonksiyonu - MyMemory Free API kullanımı
async function handleTranslation(text, targetLang = 'tr') {
  const safeText = String(text || '').trim();
  if (!safeText) {
    return {
      translation: '',
      debug: {
        sourceLang: 'en',
        targetLang: normalizeLanguageCode(targetLang),
        langPair: null,
        usedFallback: false,
        skipped: true
      }
    };
  }

  const normalizedTargetLang = normalizeLanguageCode(targetLang);
  const sourceLang = detectSourceLanguage(safeText);
  const langPair = `${sourceLang}|${normalizedTargetLang}`;

  if (sourceLang === normalizedTargetLang) {
    return {
      translation: safeText,
      debug: {
        sourceLang,
        targetLang: normalizedTargetLang,
        langPair,
        usedFallback: false,
        skipped: true
      }
    };
  }

  try {
    // MyMemory Translation API (günlük 10000 karakter limiti, ücretsiz)
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(safeText)}&langpair=${langPair}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return {
        translation: data.responseData.translatedText,
        debug: {
          sourceLang,
          targetLang: normalizedTargetLang,
          langPair,
          usedFallback: false,
          skipped: false
        }
      };
    }

    // Alternatif olarak LibreTranslate API deneyebilir (kendi sunucunuz olması gerekir)
    // veya Google Translate unofficial API
    throw new Error('Translation service unavailable');
  } catch (error) {
    console.error('Translation error:', error);

    // Fallback: Basit bir sözlük API'si
    try {
      if (sourceLang === 'en') {
        const dictUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(safeText)}`;
        const dictResponse = await fetch(dictUrl);
        const dictData = await dictResponse.json();

        if (dictData[0]?.meanings[0]?.definitions[0]?.definition) {
          return {
            translation: dictData[0].meanings[0].definitions[0].definition,
            debug: {
              sourceLang,
              targetLang: normalizedTargetLang,
              langPair,
              usedFallback: true,
              skipped: false
            }
          };
        }
      }
    } catch (dictError) {
      console.error('Dictionary API error:', dictError);
    }

    return {
      translation: safeText,
      debug: {
        sourceLang,
        targetLang: normalizedTargetLang,
        langPair,
        usedFallback: true,
        skipped: false
      }
    };
  }
}

// Text-to-Speech fonksiyonu
function handleTextToSpeech(text, lang = 'en-US') {
  // Chrome TTS API kullan
  chrome.tts.speak(text, {
    lang: lang,
    rate: 0.9,
    pitch: 1.0,
    volume: 1.0
  });
}

// Kelime kaydetme
async function handleSaveWord(word) {
  try {
    const result = await chrome.storage.local.get(['savedWords']);
    const savedWords = result.savedWords || [];

    // Aynı kelime varsa güncelle, yoksa ekle
    const existingIndex = savedWords.findIndex(w => w.original === word.original);

    if (existingIndex >= 0) {
      savedWords[existingIndex] = { ...savedWords[existingIndex], ...word };
    } else {
      savedWords.push({ ...word, id: Date.now().toString() });
    }

    await chrome.storage.local.set({ savedWords });
    return true;
  } catch (error) {
    console.error('Error saving word:', error);
    throw error;
  }
}

// Kaydedilmiş kelimeleri getir
async function getSavedWords() {
  try {
    const result = await chrome.storage.local.get(['savedWords']);
    return result.savedWords || [];
  } catch (error) {
    console.error('Error getting saved words:', error);
    throw error;
  }
}

// Kelime silme
async function deleteWord(wordId) {
  try {
    const result = await chrome.storage.local.get(['savedWords']);
    const savedWords = result.savedWords || [];

    const filteredWords = savedWords.filter(w => w.id !== wordId);
    await chrome.storage.local.set({ savedWords: filteredWords });
    return true;
  } catch (error) {
    console.error('Error deleting word:', error);
    throw error;
  }
}

// Keyboard shortcuts - TODO: Manifest'e commands eklenecek
// chrome.commands.onCommand.addListener((command) => {
//   if (command === 'toggle-extension') {
//     chrome.storage.sync.get(['settings'], (result) => {
//       const settings = result.settings || DEFAULT_SETTINGS;
//       settings.enabled = !settings.enabled;
//       chrome.storage.sync.set({ settings });
//
//       // Notification göster
//       chrome.notifications.create({
//         type: 'basic',
//         iconUrl: 'icons/icon48.png',
//         title: 'ArticleR',
//         message: settings.enabled ? 'Eklenti aktif' : 'Eklenti pasif'
//       });
//     });
//   }
// });

console.log('ArticleR background service worker started');
