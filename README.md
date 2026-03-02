# ArticleR - Academic Reading & Translation Suite

<div align="center">

![ArticleR](https://img.shields.io/badge/ArticleR-Academic%20Suite-6366f1?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=for-the-badge&logo=google-chrome)

**A complete suite for academic reading with instant translation, smart highlighting, and word tracking**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 About

**ArticleR** is a comprehensive academic reading solution consisting of two powerful tools:

1. **🌐 Web Application** - Feature-rich PDF reader with translation and annotation
2. **🔌 Chrome Extension** - Lightweight hover translation for any website

Both tools share the same mission: **Break language barriers in academic research and accelerate learning.**

---

## 🎯 Problem & Solution

### The Problem

Academic researchers and students face constant challenges:
- 📚 Papers are often in foreign languages (English, etc.)
- 🔍 Constant dictionary lookups disrupt reading flow
- 📝 Difficult to track and review learned terminology
- ⏰ Time-consuming to annotate and organize findings

### Our Solution

ArticleR provides:
- ✅ **Instant Translation** - Hover or select words for immediate translation
- ✅ **Smart Word Notebook** - Track, review, and export learned vocabulary
- ✅ **PDF Annotations** - 4-color highlighting with search
- ✅ **Audio Pronunciation** - Learn correct pronunciation with TTS
- ✅ **Cross-Platform** - Web app for PDFs, extension for everything else

---

## 🚀 Quick Start

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/keremurat/ArticleR.git
cd ArticleR
```

### 🌐 Web Application

```bash
cd frontend
npm install
npm run dev
# Open http://localhost:3000
```

### 🔌 Chrome Extension

1. Navigate to `chrome-extension/dist/`
2. Open Chrome → `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" → Select `chrome-extension/dist/` folder

**Done!** 🎉 Start translating on any website.

### ⚡ 1-Minute First Use

1. Start the web app with `npm run dev` in `frontend/`.
2. Open a sample PDF and hover a word to see translation.
3. Click ⭐ on a translated word to save it to Word Notebook.
4. Open Word Notebook and verify search/export works.
5. (Optional) Load the extension and test hover translation on any website.

---

## 🌟 Features

### Web Application Features

| Feature | Description |
|---------|-------------|
| 📄 **PDF Viewing** | High-quality rendering, zoom (50%-300%), keyboard navigation |
| 🌍 **Translation** | Instant word/sentence translation in 5+ languages |
| 🖍️ **Highlighting** | 4-color highlighting system with persistence |
| 🔍 **Search** | Real-time PDF content search with visual highlights |
| 📝 **Word Notebook** | Save, search, and export learned vocabulary (CSV/JSON) |
| 🎨 **Dark Mode** | Eye-friendly dark theme |
| ⌨️ **Keyboard Shortcuts** | `Ctrl+F`, `←/→`, `Ctrl+Z`, etc. |

### Chrome Extension Features

| Feature | Description |
|---------|-------------|
| 🖱️ **Hover Translation** | Instant translation on mouse hover (any website) |
| 💾 **Word Storage** | Save and review translated words |
| 📊 **Statistics** | Track daily progress and learning streaks |
| 🌍 **12+ Languages** | Turkish, English, Spanish, French, German, etc. |
| 🔊 **Text-to-Speech** | Native pronunciation for all words |
| 🌓 **Dark Mode** | Modern glassmorphism design with dark theme |
| ⚙️ **Customizable** | Adjust hover delay, auto-speak, target language |

---

## 📂 Project Structure

```
ArticleR/
│
├── frontend/                    # Next.js Web Application
│   ├── app/                    # Next.js App Router
│   ├── components/             # React components
│   │   ├── scholar/           # PDF-specific components
│   │   └── ui/                # Reusable UI components (Radix UI)
│   ├── lib/                   # Utilities, context, services
│   ├── hooks/                 # Custom React hooks
│   ├── public/                # Static assets
│   ├── styles/                # Global styles
│   └── package.json           # Frontend dependencies
│
├── chrome-extension/           # Chrome Extension
│   ├── src/                   # Source files
│   │   ├── background.js     # Service worker
│   │   ├── content.js        # Content script
│   │   └── popup.js          # Popup logic
│   ├── dist/                  # Built extension (ready to load)
│   ├── public/icons/          # Extension icons
│   ├── popup.html             # Popup interface
│   ├── popup.css              # Modern styles (glassmorphism)
│   └── manifest.json          # Extension manifest (v3)
│
├── docs/                       # Documentation
│   ├── KULLANIM_KILAVUZU.md   # Turkish user guide
│   ├── SMOKE_TEST_CHECKLIST.md # Release smoke test checklist
│   └── CHANGELOG.md           # Version history
│
├── README.md                   # This file
├── LICENSE                     # MIT License
└── .gitignore                 # Git ignore rules
```

---

## 🛠️ Tech Stack

### Frontend (Web App)

- **Framework:** [Next.js 16.0](https://nextjs.org/) with App Router
- **UI Library:** [React 19.2](https://react.dev/)
- **Language:** [TypeScript 5.0](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Components:** [Radix UI](https://www.radix-ui.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **PDF Rendering:** [React-PDF](https://github.com/wojtekmaj/react-pdf)
- **Translation API:** [MyMemory](https://mymemory.translated.net/)

### Chrome Extension

- **Language:** Vanilla JavaScript (ES6+)
- **Manifest:** Chrome Extension Manifest V3
- **Design:** Glassmorphism with CSS3
- **Storage:** Chrome Storage API
- **TTS:** Web Speech API

---

## 📖 Documentation

- **[Frontend Documentation](./frontend/README.md)** - Web app setup and features
- **[Extension Documentation](./chrome-extension/README.md)** - Extension installation and usage
- **[User Guide (Turkish)](./docs/KULLANIM_KILAVUZU.md)** - Detailed usage instructions
- **[Smoke Test Checklist](./docs/SMOKE_TEST_CHECKLIST.md)** - Pre-release validation steps
- **[Public Release Checklist](./docs/PUBLIC_RELEASE_CHECKLIST.md)** - Minimum readiness checks before public launch
- **[Changelog](./docs/CHANGELOG.md)** - Version history
- **[Quality Gate Workflow](./.github/workflows/quality-gate.yml)** - CI lint/build checks
- **[Security Audit Workflow](./.github/workflows/security-audit.yml)** - Weekly high-severity audit + JSON artifact report
- **[Dependabot Config](./.github/dependabot.yml)** - Automated dependency update PRs
- **[Web Vitals Reporter](./frontend/components/web-vitals-reporter.tsx)** - Runtime vitals telemetry + threshold exceed events + 24h aggregated alert signal

---

## 🎨 Screenshots

### Web Application
- PDF viewer with translation tooltip
- Word notebook with export options
- Search with visual highlighting
- Dark mode interface

### Chrome Extension
- Modern glassmorphism popup
- Hover translation on any website
- Statistics dashboard
- Dark theme toggle

---

## 🚧 Roadmap

### Planned Features

- [ ] **AI Summarization** - Auto-summarize PDFs with GPT-4
- [ ] **Cloud Sync** - Sync words and highlights across devices
- [ ] **OCR Support** - Text recognition for scanned PDFs
- [ ] **Anki Integration** - Export words to Anki flashcards
- [ ] **Multi-PDF** - Open multiple PDFs in tabs
- [ ] **Collaboration** - Share annotations with teams
- [ ] **Mobile App** - iOS/Android native apps

---

## 🤝 Contributing

We welcome contributions!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Frontend
cd frontend
npm install
npm run dev

# Extension
cd chrome-extension
# Edit files in src/, then copy to dist/
./build.sh
```

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

This project uses the following open-source libraries:

- [React-PDF](https://github.com/wojtekmaj/react-pdf) - PDF rendering
- [MyMemory API](https://mymemory.translated.net/) - Translation service
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework

---

## 📧 Contact

For questions, suggestions, or bug reports:

- **GitHub Issues:** Use the **Issues** tab in this repository
- **Discussions:** Use the **Discussions** tab in this repository

---

<div align="center">

**Built with ❤️ for academics worldwide**

⭐ Star this repo • 🐛 Report Bug (Issues) • ✨ Request Feature (Issues)

</div>
