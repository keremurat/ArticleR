// Popup Script - Extension popup UI logic

let savedWords = [];
let settings = {};
let currentTheme = 'light';
let currentSearchQuery = '';
let currentWordsPage = 1;
let searchDebounceTimeout = null;
let wordsPageSize = 20;

const DEFAULT_WORDS_PAGE_SIZE = 20;
const SUPPORTED_PAGE_SIZES = new Set([20, 50, 100]);
const WORDS_PAGE_SIZE_STORAGE_KEY = 'popupWordsPageSize';
const SEARCH_DEBOUNCE_MS = 200;

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
  await loadTheme();
  await loadSettings();
  await loadPopupPreferences();
  await loadSavedWords();
  initializeEventListeners();
  updateStats();
});

async function loadPopupPreferences() {
  const result = await chrome.storage.local.get([WORDS_PAGE_SIZE_STORAGE_KEY]);
  const parsedSize = Number(result[WORDS_PAGE_SIZE_STORAGE_KEY]);

  if (SUPPORTED_PAGE_SIZES.has(parsedSize)) {
    wordsPageSize = parsedSize;
  } else {
    wordsPageSize = DEFAULT_WORDS_PAGE_SIZE;
  }

  const pageSizeSelect = document.getElementById('pageSizeSelect');
  if (pageSizeSelect) {
    pageSizeSelect.value = String(wordsPageSize);
  }
}

async function savePopupPreferences() {
  await chrome.storage.local.set({ [WORDS_PAGE_SIZE_STORAGE_KEY]: wordsPageSize });
}

// Load and apply theme
async function loadTheme() {
  const result = await chrome.storage.local.get(['theme']);
  currentTheme = result.theme || 'light';
  applyTheme(currentTheme);
}

// Apply theme to document
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');

  if (theme === 'dark') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
}

// Toggle theme
async function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(currentTheme);
  await chrome.storage.local.set({ theme: currentTheme });
}

// Load settings from storage
async function loadSettings() {
  const result = await chrome.storage.sync.get(['settings']);
  settings = result.settings || {
    enabled: true,
    targetLanguage: 'tr',
    hoverDelay: 500,
    autoSpeak: false
  };

  // Update UI
  document.getElementById('enabledToggle').checked = settings.enabled;
  document.getElementById('targetLanguage').value = settings.targetLanguage;
  document.getElementById('hoverDelay').value = settings.hoverDelay;
  document.getElementById('hoverDelayValue').textContent = settings.hoverDelay + 'ms';
  document.getElementById('autoSpeakToggle').checked = settings.autoSpeak;
}

// Save settings to storage
async function saveSettings() {
  await chrome.storage.sync.set({ settings });
}

// Load saved words
async function loadSavedWords() {
  const response = await chrome.runtime.sendMessage({ type: 'GET_SAVED_WORDS' });
  if (response.success) {
    savedWords = response.words;
    renderSavedWords(currentSearchQuery);
  }
}

// Render saved words list
function getFilteredWords(filterText) {
  const normalizedFilter = String(filterText || '').toLowerCase();

  return savedWords.filter(word =>
    String(word.original || '').toLowerCase().includes(normalizedFilter) ||
    String(word.translation || '').toLowerCase().includes(normalizedFilter)
  );
}

function updatePaginationControls(totalItems, totalPages) {
  const paginationContainer = document.getElementById('wordsPagination');
  const prevButton = document.getElementById('prevPageBtn');
  const nextButton = document.getElementById('nextPageBtn');
  const info = document.getElementById('paginationInfo');

  if (totalItems <= wordsPageSize) {
    paginationContainer.hidden = true;
    return;
  }

  paginationContainer.hidden = false;
  info.textContent = `${currentWordsPage} / ${totalPages}`;
  prevButton.disabled = currentWordsPage <= 1;
  nextButton.disabled = currentWordsPage >= totalPages;
}

function renderSavedWords(filterText = currentSearchQuery) {
  const container = document.getElementById('savedWordsList');
  currentSearchQuery = String(filterText || '');

  const filteredWords = getFilteredWords(currentSearchQuery);
  const totalPages = Math.max(1, Math.ceil(filteredWords.length / wordsPageSize));
  currentWordsPage = Math.min(currentWordsPage, totalPages);
  currentWordsPage = Math.max(1, currentWordsPage);

  const startIndex = (currentWordsPage - 1) * wordsPageSize;
  const pagedWords = filteredWords.slice(startIndex, startIndex + wordsPageSize);

  if (filteredWords.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';

    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('width', '48');
    icon.setAttribute('height', '48');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('fill', 'none');
    icon.setAttribute('stroke', 'currentColor');
    icon.setAttribute('stroke-width', '1.5');
    icon.setAttribute('opacity', '0.3');

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20');
    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('d', 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z');
    icon.append(path1, path2);

    const title = document.createElement('p');
    title.className = 'empty-title';
    title.textContent = filterText ? 'Kelime bulunamadı' : 'Henüz kelime yok';

    const desc = document.createElement('span');
    desc.className = 'empty-desc';
    desc.textContent = filterText ? 'Farklı arama deneyin' : 'Çeviri yaptığınızda kaydedin';

    emptyState.append(icon, title, desc);
    container.replaceChildren(emptyState);
    updatePaginationControls(0, 1);
    return;
  }

  const listFragment = document.createDocumentFragment();

  pagedWords.forEach((word) => {
    const wordCard = document.createElement('div');
    wordCard.className = 'word-card';
    wordCard.dataset.id = String(word.id || '');

    const wordContent = document.createElement('div');
    wordContent.className = 'word-content';

    const original = document.createElement('div');
    original.className = 'word-original';
    original.textContent = String(word.original || '');

    const translation = document.createElement('div');
    translation.className = 'word-translation';
    translation.textContent = String(word.translation || '');

    const meta = document.createElement('div');
    meta.className = 'word-meta';

    const date = document.createElement('span');
    date.className = 'word-date';
    date.textContent = formatDate(word.timestamp);

    meta.appendChild(date);

    if (word.url) {
      try {
        const parsedUrl = new URL(word.url);
        if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
          const sourceLink = document.createElement('a');
          sourceLink.href = parsedUrl.toString();
          sourceLink.className = 'word-url';
          sourceLink.target = '_blank';
          sourceLink.rel = 'noopener noreferrer';
          sourceLink.textContent = 'Kaynağı Görüntüle';
          meta.appendChild(sourceLink);
        }
      } catch (_) {}
    }

    wordContent.append(original, translation, meta);

    const actions = document.createElement('div');
    actions.className = 'word-actions';

    const speakBtn = document.createElement('button');
    speakBtn.className = 'icon-btn speak-btn';
    speakBtn.dataset.word = String(word.original || '');
    speakBtn.type = 'button';
    speakBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      </svg>
    `;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'icon-btn delete-btn';
    deleteBtn.dataset.id = String(word.id || '');
    deleteBtn.type = 'button';
    deleteBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    `;

    actions.append(speakBtn, deleteBtn);
    wordCard.append(wordContent, actions);
    listFragment.appendChild(wordCard);
  });

  container.replaceChildren(listFragment);

  // Add event listeners to buttons
  container.querySelectorAll('.speak-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const word = e.currentTarget.dataset.word;
      chrome.runtime.sendMessage({ type: 'SPEAK', text: word, lang: 'en-US' });
    });
  });

  container.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.currentTarget.dataset.id;
      const response = await chrome.runtime.sendMessage({ type: 'DELETE_WORD', wordId: id });
      if (response.success) {
        await loadSavedWords();
        updateStats();
      }
    });
  });

  updatePaginationControls(filteredWords.length, totalPages);
}

// Initialize event listeners
function initializeEventListeners() {
  // Theme Toggle
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);

  // Settings
  document.getElementById('enabledToggle').addEventListener('change', (e) => {
    settings.enabled = e.target.checked;
    saveSettings();
  });

  document.getElementById('targetLanguage').addEventListener('change', (e) => {
    settings.targetLanguage = e.target.value;
    saveSettings();
  });

  document.getElementById('hoverDelay').addEventListener('input', (e) => {
    settings.hoverDelay = parseInt(e.target.value);
    document.getElementById('hoverDelayValue').textContent = settings.hoverDelay + 'ms';
  });

  document.getElementById('hoverDelay').addEventListener('change', () => {
    saveSettings();
  });

  document.getElementById('autoSpeakToggle').addEventListener('change', (e) => {
    settings.autoSpeak = e.target.checked;
    saveSettings();
  });

  // Search
  document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value;
    if (searchDebounceTimeout) {
      clearTimeout(searchDebounceTimeout);
    }

    searchDebounceTimeout = setTimeout(() => {
      currentWordsPage = 1;
      renderSavedWords(query);
    }, SEARCH_DEBOUNCE_MS);
  });

  document.getElementById('prevPageBtn').addEventListener('click', () => {
    if (currentWordsPage > 1) {
      currentWordsPage -= 1;
      renderSavedWords(currentSearchQuery);
    }
  });

  document.getElementById('nextPageBtn').addEventListener('click', () => {
    const totalPages = Math.max(1, Math.ceil(getFilteredWords(currentSearchQuery).length / wordsPageSize));
    if (currentWordsPage < totalPages) {
      currentWordsPage += 1;
      renderSavedWords(currentSearchQuery);
    }
  });

  document.getElementById('pageSizeSelect').addEventListener('change', async (e) => {
    const selected = Number(e.target.value);
    if (!SUPPORTED_PAGE_SIZES.has(selected)) {
      return;
    }

    wordsPageSize = selected;
    await savePopupPreferences();
    currentWordsPage = 1;
    renderSavedWords(currentSearchQuery);
  });

  // Navigation Tabs
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tabName = e.currentTarget.dataset.tab;
      switchTab(tabName);
    });
  });

  // Export
  document.getElementById('exportBtn').addEventListener('click', exportWords);
}

// Switch tabs
function switchTab(tabName) {
  // Remove active from all tabs
  document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

  // Add active to selected tab
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  document.getElementById(`${tabName}Tab`).classList.add('active');

  if (tabName === 'stats') {
    updateStats();
  }
}

// Update statistics
function updateStats() {
  const today = new Date().setHours(0, 0, 0, 0);
  const todayWords = savedWords.filter(word => new Date(word.timestamp).setHours(0, 0, 0, 0) === today);

  document.getElementById('totalWords').textContent = savedWords.length;
  document.getElementById('todayWords').textContent = todayWords.length;

  // Calculate streak
  const streak = calculateStreak();
  document.getElementById('streakValue').textContent = streak;
}

// Calculate learning streak
function calculateStreak() {
  if (savedWords.length === 0) return 0;

  const sortedWords = savedWords
    .map(w => new Date(w.timestamp).setHours(0, 0, 0, 0))
    .sort((a, b) => b - a);

  const uniqueDays = [...new Set(sortedWords)];
  let streak = 0;
  let currentDate = new Date().setHours(0, 0, 0, 0);

  for (const day of uniqueDays) {
    if (day === currentDate || day === currentDate - 86400000) {
      streak++;
      currentDate = day - 86400000;
    } else {
      break;
    }
  }

  return streak;
}

// Export words to JSON
function exportWords() {
  const dataStr = JSON.stringify(savedWords, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `articler-words-${new Date().toISOString().split('T')[0]}.json`;
  link.click();

  URL.revokeObjectURL(url);
}

// Format date
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Bugün';
  if (diffDays === 1) return 'Dün';
  if (diffDays < 7) return `${diffDays} gün önce`;

  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}
