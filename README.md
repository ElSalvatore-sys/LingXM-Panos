# LingXM-Panos

<p align="center">
  <img src="src/assets/logo.png" alt="LingXM Logo" width="120" />
</p>

<p align="center">
  <strong>Language Learning 2.0</strong> — A modern PWA for vocabulary learning with frequency-based word lists.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#project-structure">Structure</a> •
  <a href="#roadmap">Roadmap</a>
</p>

---

## What This Does

LingXM helps you learn vocabulary in **8 languages** using frequency-ranked word lists from real corpora. Start with the most commonly used words and progress to advanced vocabulary. Features a full virtual keyboard for typing in Cyrillic, Greek, and special characters.

## Features

### Core
- **8 Languages**: English, German, French, Spanish, Russian, Greek, Portuguese, Turkish
- **78,000+ Words**: Frequency-ranked vocabulary from real language corpora
- **Virtual Keyboards**: Full Apple-style layouts for Cyrillic, Greek, AZERTY, QWERTZ
- **6 UI Languages**: Interface available in EN, DE, FR, ES, RU, EL
- **PWA**: Installable on mobile/desktop, works offline
- **Difficulty Filtering**: 5 levels based on word frequency (1 = most common)

### Learning Tools
- **Audio Pronunciation**: Web Speech API with 9 language support
- **Word Detail Modal**: Translations, declensions, conjugations, examples
- **Progress Tracking**: Daily streak, learned words, bookmarks with localStorage
- **Bookmarks Page**: Save and manage your favorite words
- **Learned Page**: Track mastered vocabulary
- **Stats Bar**: Live progress display with daily goals

## Quick Start

```bash
# Clone the repository
git clone https://github.com/ElSalvatore-sys/LingXM-Panos.git
cd LingXM-Panos

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:5173
```

### Build for Production

```bash
# Build optimized bundle
npm run build

# Preview production build
npm run preview
```

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 7.2 |
| **Styling** | Tailwind CSS v4 |
| **Components** | shadcn/ui (canary) |
| **Routing** | React Router DOM |
| **PWA** | vite-plugin-pwa + Workbox |

## Project Structure

```
lingxm-panos/
├── public/
│   ├── data/                    # Vocabulary JSON files (8 languages)
│   │   ├── de.json              # German (~9,800 words)
│   │   ├── en.json              # English (~9,800 words)
│   │   ├── fr.json              # French (~9,800 words)
│   │   ├── es.json              # Spanish (~9,800 words)
│   │   ├── ru.json              # Russian (~9,800 words)
│   │   ├── el.json              # Greek (~9,800 words)
│   │   ├── pt.json              # Portuguese (~9,800 words)
│   │   └── tr.json              # Turkish (~9,800 words)
│   └── icons/                   # PWA icons (72x72 → 512x512)
├── src/
│   ├── assets/                  # Images, fonts, static assets
│   │   └── icons/               # Flag sprites, logo
│   ├── components/
│   │   ├── features/            # Feature-specific components
│   │   │   ├── DifficultyFilter.tsx
│   │   │   ├── EmptyState.tsx      # Empty list states
│   │   │   ├── FlagDropdown.tsx
│   │   │   ├── ResultsList.tsx
│   │   │   ├── SearchInput.tsx
│   │   │   ├── SearchTips.tsx
│   │   │   ├── StatsBar.tsx        # Progress stats display
│   │   │   ├── VirtualKeyboard.tsx
│   │   │   └── WordDetailModal.tsx # Word details + actions
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.tsx       # With navigation menu
│   │   │   ├── Footer.tsx
│   │   │   └── Logo.tsx
│   │   └── ui/                  # shadcn/ui components
│   ├── contexts/
│   │   └── AppContext.tsx       # Global state (languages)
│   ├── hooks/
│   │   ├── useProgress.ts       # Progress tracking hook
│   │   ├── useTranslation.ts    # i18n hook
│   │   └── useVocabulary.ts     # Vocabulary data hook
│   ├── lib/
│   │   ├── audioService.ts      # Web Speech API TTS
│   │   ├── keyboards.ts         # Virtual keyboard layouts
│   │   ├── search.ts            # Search/filter functions
│   │   ├── translations.ts      # UI translations (6 languages)
│   │   ├── wordDetails.ts       # Word detail generation
│   │   └── utils.ts             # Utility functions
│   ├── pages/
│   │   ├── LandingPage.tsx      # Home page with language selectors
│   │   ├── SearchPage.tsx       # Main search/learn page
│   │   ├── BookmarksPage.tsx    # Saved words page
│   │   └── LearnedPage.tsx      # Mastered words page
│   └── types/
│       └── index.ts             # TypeScript type definitions
├── scripts/
│   └── convert-excel-to-json.py # Data conversion script
├── vite.config.ts               # Vite + PWA configuration
└── package.json
```

## Key Concepts

### Vocabulary Data Structure

Each word in the JSON files has this structure:

```typescript
interface Word {
  id: number;           // Unique identifier
  word: string;         // The word in target language
  frequency: number;    // Usage frequency (higher = more common)
  rank: number;         // Frequency rank (1 = most common)
  difficulty: 1 | 2 | 3 | 4 | 5;  // Difficulty level
}
```

### Difficulty Levels

| Level | Description | Frequency Rank |
|-------|-------------|----------------|
| 1 | Essential | 1 - 500 |
| 2 | Common | 501 - 2,000 |
| 3 | Intermediate | 2,001 - 5,000 |
| 4 | Advanced | 5,001 - 8,000 |
| 5 | Expert | 8,001+ |

### Virtual Keyboard Layouts

The app includes full keyboard layouts for:
- **QWERTY**: English, Spanish, Portuguese, Turkish
- **QWERTZ**: German
- **AZERTY**: French
- **ЙЦУКЕН**: Russian (Cyrillic)
- **Greek**: Full Greek keyboard

## Common Tasks

### Adding a New Language

1. Create vocabulary JSON in `public/data/{lang}.json`
2. Add language code to `src/types/index.ts`
3. Add keyboard layout in `src/lib/keyboards.ts`
4. Add UI translations in `src/lib/translations.ts`
5. Add flag icon to sprite sheet

### Modifying Search Behavior

Search functions are in `src/lib/search.ts`:

```typescript
// Filter words by difficulty
filterByDifficulty(words, [1, 2, 3])

// Search by word prefix
searchByWord(words, "der")

// Sort by frequency
sortByFrequency(words)
```

## Roadmap

### Phase 1: MVP (Complete - Nov 29, 2025)

- [x] Landing page with language selection
- [x] Search page with real vocabulary data
- [x] Virtual keyboard for all languages
- [x] Internationalization (i18n) for 6 languages
- [x] PWA support with offline capability

### Phase 2: Progress Tracking (Complete - Nov 30, 2025)

- [x] Word detail modal with translations, declensions, conjugations
- [x] Audio pronunciation (Web Speech API)
- [x] User progress tracking with localStorage
- [x] Bookmarks/saved words page
- [x] Learned words page
- [x] Navigation menu and stats bar
- [x] Daily streak and goal tracking

### Phase 3 (Planned)

- [ ] Flashcard mode / quiz games
- [ ] Spaced repetition algorithm (SM-2)
- [ ] User authentication (optional)
- [ ] Dark mode theme
- [ ] Export/import progress data
- [ ] Custom word lists

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

## Author

Built by [ElSalvatore-sys](https://github.com/ElSalvatore-sys)

---

<p align="center">
  <sub>Made with React, TypeScript, and Tailwind CSS</sub>
</p>
