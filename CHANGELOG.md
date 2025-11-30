# Changelog

All notable changes to LingXM-Panos will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-11-30

### Added - Phase 2: Progress Tracking & Audio

#### Audio Pronunciation
- Web Speech API integration for text-to-speech
- Speaker buttons on search results and word detail modal
- Support for all 9 target languages with BCP-47 voice matching
- `src/lib/audioService.ts` - centralized audio service

#### Progress Tracking
- `useProgress` hook with localStorage persistence
- Track learned words and bookmarks per language
- Daily learning streak with automatic reset
- Daily goal tracking with progress bar
- Stats bar showing streak, learned count, bookmarks, daily progress

#### Bookmarks Page
- View all bookmarked/saved words
- Pronunciation button for each word
- Toggle learned status
- Remove from bookmarks
- Empty state with call-to-action

#### Learned Page
- View all mastered words
- Pronunciation button for each word
- Toggle bookmark status
- Remove from learned
- Empty state with call-to-action

#### Navigation
- Header navigation menu (Search, Bookmarks, Learned)
- StatsBar items are clickable links to respective pages
- New routes: `/bookmarks`, `/learned`, `/search`

#### UI Components
- `EmptyState` - reusable component for empty lists
- `StatsBar` - progress display with icons and animations

#### Translations
- 15+ new translation keys for navigation, pages, actions
- All 6 UI languages updated (EN, DE, FR, ES, RU, EL)

### Changed
- Word Detail Modal now receives bookmark/learned state from parent
- Header component accepts `showNavigation` prop
- Routes reorganized for clarity

### Technical
- 34 Vitest tests passing
- Build output: 396KB JS, 50KB CSS (gzipped: 137KB)
- PWA with 39 precached entries

---

## [1.0.0] - 2025-11-29

### Added - Phase 1: MVP Release

#### Core Features
- 8 target languages: English, German, French, Spanish, Russian, Greek, Portuguese, Turkish
- 78,000+ vocabulary words with frequency-based difficulty (1-5 scale)
- Real-time search across ~9,800 words per language
- Word Detail Modal with translations, declensions, conjugations

#### Virtual Keyboard
- Full keyboard layouts for all languages
- QWERTY (EN), QWERTZ (DE), AZERTY (FR), Cyrillic (RU), Greek (EL)
- Special characters and diacritics support
- Apple-style design with proper key sizing

#### Internationalization (i18n)
- UI available in 6 languages: EN, DE, FR, ES, RU, EL
- `useTranslation` hook for easy access
- Site language switcher in header

#### Progressive Web App (PWA)
- Installable on desktop and mobile
- Offline capability with service worker
- App icons and splash screens
- Install prompt for supported browsers

#### UI Components
- Landing page with world map background
- Search page with filters and results
- Header (white/blue variants)
- Footer (minimal/full variants)
- Language selector with flags
- Difficulty filter dots
- Results list with highlighting
- Search tips sidebar

### Technical Stack
- React 19 + TypeScript
- Vite 7.2 build tool
- Tailwind CSS v4
- shadcn/ui components
- Vitest for testing
- vite-plugin-pwa for PWA support

---

## [Unreleased]

### Planned for Phase 3
- Flashcard mode / quiz games
- Spaced repetition algorithm (SM-2)
- User authentication (optional)
- Dark mode theme
- Export/import progress data
- Custom word lists
