// Background Service Worker - Chrome Extension arka plan işlemleri

// Varsayılan ayarlar
const DEFAULT_SETTINGS = {
  enabled: true,
  targetLanguage: 'tr',
  hoverDelay: 500,
  autoSpeak: false,
  translationService: 'mymemory' // free API
};

// Extension yüklendiğinde
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // İlk kurulumda varsayılan ayarları kaydet
    chrome.storage.sync.set({ settings: DEFAULT_SETTINGS });

    // Hoş geldiniz sayfasını aç
    chrome.tabs.create({ url: 'popup.html' });
  }
});

// Mesajları dinle
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'TRANSLATE') {
    handleTranslation(request.text, request.targetLang)
      .then(translation => sendResponse({ success: true, translation }))
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
  try {
    // MyMemory Translation API (günlük 10000 karakter limiti, ücretsiz)
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData) {
      return data.responseData.translatedText;
    }

    // Alternatif olarak LibreTranslate API deneyebilir (kendi sunucunuz olması gerekir)
    // veya Google Translate unofficial API
    throw new Error('Translation service unavailable');
  } catch (error) {
    console.error('Translation error:', error);

    // Fallback: Basit bir sözlük API'si
    try {
      const dictUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(text)}`;
      const dictResponse = await fetch(dictUrl);
      const dictData = await dictResponse.json();

      if (dictData[0]?.meanings[0]?.definitions[0]?.definition) {
        return dictData[0].meanings[0].definitions[0].definition;
      }
    } catch (dictError) {
      console.error('Dictionary API error:', dictError);
    }

    throw error;
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

// Keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-extension') {
    chrome.storage.sync.get(['settings'], (result) => {
      const settings = result.settings || DEFAULT_SETTINGS;
      settings.enabled = !settings.enabled;
      chrome.storage.sync.set({ settings });

      // Notification göster
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'ArticleR',
        message: settings.enabled ? 'Eklenti aktif' : 'Eklenti pasif'
      });
    });
  }
});

console.log('ArticleR background service worker started');
