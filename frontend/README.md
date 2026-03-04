# ArticleR - Web Application

Modern PDF reader for academic papers with translation, highlighting, and search features.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🛠️ Tech Stack

- **Framework:** Next.js 16.0
- **UI Library:** React 19.2
- **Language:** TypeScript 5.0
- **Styling:** Tailwind CSS 4.0
- **PDF Rendering:** React-PDF
- **Translation:** MyMemory API
- **Components:** Radix UI

## 📦 Project Structure

```
frontend/
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── scholar/         # PDF viewer components
│   └── ui/              # Reusable UI components
├── lib/                 # Utilities & context
├── hooks/               # Custom React hooks
├── public/              # Static assets
└── styles/              # Global styles
```

## 🌟 Features

- **PDF Viewing:** High-quality PDF rendering with zoom & navigation
- **Translation:** Instant word translation (hover or select)
- **Highlighting:** 4-color text highlighting system
- **Search:** Real-time PDF content search
- **Word Notebook:** Save and export learned words
- **Dark Mode:** Eye-friendly dark theme
- **Responsive:** Works on desktop and mobile

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔧 Configuration

- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS & Tailwind configuration
- `components.json` - Shadcn UI configuration

### Translation Provider (Ready Infrastructure)

Translation layer is now provider-based and can be switched with one env variable:

```bash
NEXT_PUBLIC_TRANSLATION_PROVIDER=mymemory
```

Supported values:

- `mymemory` (default, active)
- `auto` (tries premium providers, then falls back to MyMemory)
- `deepl`
- `google`
- `azure`

Note: DeepL / Google / Azure handlers are scaffolded for future migration and currently fall back to MyMemory until provider integration is completed.

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details

## 🔗 Related

- [Chrome Extension](../chrome-extension/) - Browser extension version
- [Documentation](../docs/) - Full documentation
