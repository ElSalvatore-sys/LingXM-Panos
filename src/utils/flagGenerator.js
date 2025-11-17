/**
 * FlagGenerator - Generate inline SVG flags
 * PARALLEL SAFE: Creates new file only
 */

export class FlagGenerator {
  static getSVG(langCode, width = 30, height = 20) {
    const flags = {
      en: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 30 20">
        <rect fill="#012169" width="30" height="20"/>
        <path d="M0,0 L30,20 M30,0 L0,20" stroke="#fff" stroke-width="3.6"/>
        <path d="M0,0 L30,20 M30,0 L0,20" stroke="#C8102E" stroke-width="2.4"/>
        <path d="M15,0 v20 M0,10 h30" stroke="#fff" stroke-width="6"/>
        <path d="M15,0 v20 M0,10 h30" stroke="#C8102E" stroke-width="3.6"/>
      </svg>`,

      de: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <rect fill="#000" width="30" height="6.67"/>
        <rect fill="#D00" y="6.67" width="30" height="6.67"/>
        <rect fill="#FFCE00" y="13.33" width="30" height="6.67"/>
      </svg>`,

      ar: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <rect fill="#fff" width="30" height="20"/>
        <rect fill="#000" width="30" height="6.67"/>
        <rect fill="#007A3D" y="13.33" width="30" height="6.67"/>
        <rect fill="#CE1126" y="6.67" width="30" height="6.67"/>
      </svg>`,

      fr: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <rect fill="#002395" width="10" height="20"/>
        <rect fill="#fff" x="10" width="10" height="20"/>
        <rect fill="#ED2939" x="20" width="10" height="20"/>
      </svg>`,

      it: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <rect fill="#009246" width="10" height="20"/>
        <rect fill="#fff" x="10" width="10" height="20"/>
        <rect fill="#CE2B37" x="20" width="10" height="20"/>
      </svg>`,

      ru: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <rect fill="#fff" width="30" height="6.67"/>
        <rect fill="#0039A6" y="6.67" width="30" height="6.67"/>
        <rect fill="#D52B1E" y="13.33" width="30" height="6.67"/>
      </svg>`,

      es: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <rect fill="#AA151B" width="30" height="20"/>
        <rect fill="#F1BF00" y="5" width="30" height="10"/>
      </svg>`,

      pl: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <rect fill="#fff" width="30" height="10"/>
        <rect fill="#DC143C" y="10" width="30" height="10"/>
      </svg>`,

      fa: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <rect fill="#239F40" width="30" height="6.67"/>
        <rect fill="#fff" y="6.67" width="30" height="6.67"/>
        <rect fill="#DA0000" y="13.33" width="30" height="6.67"/>
      </svg>`
    };

    return flags[langCode] || flags.en;
  }

  static getDataURL(langCode) {
    const svg = this.getSVG(langCode);
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }
}
