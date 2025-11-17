/**
 * FlagGenerator - Generates SVG flag data URIs
 */
export class FlagGenerator {
  constructor() {
    this.flags = this._getFlagDatabase();
  }

  /**
   * Get flag database with SVG patterns
   * @private
   */
  _getFlagDatabase() {
    return {
      en: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23012169' width='30' height='20'/><path d='M0,0 L30,20 M30,0 L0,20' stroke='%23FFF' stroke-width='3'/><path d='M0,0 L30,20 M30,0 L0,20' stroke='%23C8102E' stroke-width='2'/><path d='M15,0 V20 M0,10 H30' stroke='%23FFF' stroke-width='5'/><path d='M15,0 V20 M0,10 H30' stroke='%23C8102E' stroke-width='3'/></svg>`,
      de: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23000' width='30' height='7'/><rect fill='%23D00' y='7' width='30' height='6'/><rect fill='%23FFCE00' y='13' width='30' height='7'/></svg>`,
      es: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23C60B1E' width='30' height='20'/><rect fill='%23FFC400' y='5' width='30' height='10'/></svg>`,
      fr: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23002395' width='10' height='20'/><rect fill='%23FFF' x='10' width='10' height='20'/><rect fill='%23ED2939' x='20' width='10' height='20'/></svg>`,
      it: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23009246' width='10' height='20'/><rect fill='%23FFF' x='10' width='10' height='20'/><rect fill='%23CE2B37' x='20' width='10' height='20'/></svg>`,
      pt: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23FF0000' width='30' height='20'/><rect fill='%23006600' width='12' height='20'/></svg>`,
      ru: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23FFF' width='30' height='7'/><rect fill='%230039A6' y='7' width='30' height='6'/><rect fill='%23D52B1E' y='13' width='30' height='7'/></svg>`,
      zh: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23DE2910' width='30' height='20'/></svg>`,
      ja: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23FFF' width='30' height='20'/><circle cx='15' cy='10' r='6' fill='%23BC002D'/></svg>`,
      ko: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23FFF' width='30' height='20'/><circle cx='15' cy='10' r='5' fill='%23C60C30'/></svg>`,
      ar: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23000' width='30' height='7'/><rect fill='%23FFF' y='7' width='30' height='6'/><rect fill='%23007A3D' y='13' width='30' height='7'/></svg>`,
      hi: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23FF9933' width='30' height='7'/><rect fill='%23FFF' y='7' width='30' height='6'/><rect fill='%23138808' y='13' width='30' height='7'/></svg>`,
      nl: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23AE1C28' width='30' height='7'/><rect fill='%23FFF' y='7' width='30' height='6'/><rect fill='%2321468B' y='13' width='30' height='7'/></svg>`,
      pl: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23FFF' width='30' height='10'/><rect fill='%23DC143C' y='10' width='30' height='10'/></svg>`,
      tr: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23E30A17' width='30' height='20'/></svg>`,
      sv: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23006AA7' width='30' height='20'/><rect fill='%23FECC00' x='8' width='3' height='20'/><rect fill='%23FECC00' y='8.5' width='30' height='3'/></svg>`,
      da: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23C60C30' width='30' height='20'/><rect fill='%23FFF' x='8' width='3' height='20'/><rect fill='%23FFF' y='8.5' width='30' height='3'/></svg>`,
      no: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23BA0C2F' width='30' height='20'/><rect fill='%23FFF' x='8' width='4' height='20'/><rect fill='%23FFF' y='8' width='30' height='4'/><rect fill='%2300205B' x='9' width='2' height='20'/><rect fill='%2300205B' y='9' width='30' height='2'/></svg>`,
      fi: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23FFF' width='30' height='20'/><rect fill='%23003580' x='8' width='3' height='20'/><rect fill='%23003580' y='8.5' width='30' height='3'/></svg>`,
      cs: `<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23FFF' width='30' height='10'/><rect fill='%23D7141A' y='10' width='30' height='10'/><path d='M0,0 L15,10 L0,20 Z' fill='%2311457E'/></svg>`
    };
  }

  /**
   * Get flag data URI for a language
   */
  getFlag(languageCode) {
    const svg = this.flags[languageCode];
    if (!svg) {
      return this._getDefaultFlag();
    }
    return `data:image/svg+xml,${svg}`;
  }

  /**
   * Get default/blank flag
   * @private
   */
  _getDefaultFlag() {
    return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='30' height='20'><rect fill='%23CCC' width='30' height='20'/></svg>`;
  }

  /**
   * Check if flag exists
   */
  hasFlag(languageCode) {
    return !!this.flags[languageCode];
  }

  /**
   * Get all available flag codes
   */
  getAvailableFlags() {
    return Object.keys(this.flags);
  }
}
