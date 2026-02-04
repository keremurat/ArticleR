// Popup Script - Extension popup UI logic

let savedWords = [];
let settings = {};

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
  await loadSettings();
  await loadSavedWords();
  initializeEventListeners();
  updateStats();
});

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
    renderSavedWords();
  }
}

// Render saved words list
function renderSavedWords(filterText = '') {
  const container = document.getElementById('savedWordsList');
  const filteredWords = savedWords.filter(word =>
    word.original.toLowerCase().includes(filterText.toLowerCase()) ||
    word.translation.toLowerCase().includes(filterText.toLowerCase())
  );

  if (filteredWords.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
        <p class="empty-title">${filterText ? 'Kelime bulunamadı' : 'Henüz kelime yok'}</p>
        <span class="empty-desc">${filterText ? 'Farklı arama deneyin' : 'Çeviri yaptığınızda kaydedin'}</span>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredWords.map(word => `
    <div class="word-card" data-id="${word.id}">
      <div class="word-content">
        <div class="word-original">${word.original}</div>
        <div class="word-translation">${word.translation}</div>
        <div class="word-meta">
          <span class="word-date">${formatDate(word.timestamp)}</span>
          ${word.url ? `<a href="${word.url}" class="word-url" target="_blank">Kaynağı Görüntüle</a>` : ''}
        </div>
      </div>
      <div class="word-actions">
        <button class="icon-btn speak-btn" data-word="${word.original}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        </button>
        <button class="icon-btn delete-btn" data-id="${word.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  `).join('');

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
}

// Initialize event listeners
function initializeEventListeners() {
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
    renderSavedWords(e.target.value);
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
