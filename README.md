# LingXM Panos

Modern language learning Progressive Web App with advanced word interaction features.

## ✨ Features

- 📚 Learn 9 languages simultaneously
- 🖱️ Advanced word interaction (hover tooltips + double-click modal)
- 🎯 Smart filtering (frequency + sentence length)
- 💾 Save words for review
- 🔊 Audio pronunciation (coming soon)
- 📱 PWA - works offline
- 🚀 Zero dependencies - pure vanilla JS

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/ElSalvatore-sys/LingXM-Panos.git
cd LingXM-Panos

# Start development server
npm run dev

# Open browser
open http://localhost:8000
```

## 📁 Project Structure

```
LingXM-Panos/
├── public/          # Static assets & data
├── src/             # Application source
│   ├── components/  # UI components
│   ├── utils/       # Utility functions
│   └── styles/      # CSS files
└── index.html       # Entry point
```

## 🎯 Roadmap

- ✅ Initial project structure
- ✅ Language selector UI
- ✅ Word modal with auto-dismiss
- ✅ Hover tooltips
- ⬜ Connect real vocabulary data
- ⬜ Audio playback
- ⬜ User progress tracking
- ⬜ Capacitor iOS wrapper

## 📝 Data Structure

Vocabulary files follow this schema:

```json
{
  "id": "universal_a1_001_de",
  "word": "ich",
  "category": "pronouns",
  "frequency_rank": 1,
  "level": "a1",
  "translations": { ... },
  "explanation": { ... },
  "examples": { ... }
}
```

## 🔗 Related Projects

- [LingXM-Personal](https://github.com/ElSalvatore-sys/LingXM-Personal) - Vocabulary data source

## 📄 License

MIT License - See LICENSE file for details
