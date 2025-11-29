import type { LanguageCode } from '@/types';

export interface KeyboardLayout {
  language: LanguageCode;
  name: string;
  rows: string[][];
  hasShift: boolean;
  shiftRows?: string[][];
}

// Russian Cyrillic keyboard
const russianKeyboard: KeyboardLayout = {
  language: 'ru',
  name: 'Russian',
  hasShift: true,
  rows: [
    ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
    ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
    ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ё'],
  ],
  shiftRows: [
    ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'],
    ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'],
    ['Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', 'Ё'],
  ],
};

// Greek keyboard
const greekKeyboard: KeyboardLayout = {
  language: 'el',
  name: 'Greek',
  hasShift: true,
  rows: [
    ['ς', 'ε', 'ρ', 'τ', 'υ', 'θ', 'ι', 'ο', 'π'],
    ['α', 'σ', 'δ', 'φ', 'γ', 'η', 'ξ', 'κ', 'λ'],
    ['ζ', 'χ', 'ψ', 'ω', 'β', 'ν', 'μ'],
  ],
  shiftRows: [
    ['Σ', 'Ε', 'Ρ', 'Τ', 'Υ', 'Θ', 'Ι', 'Ο', 'Π'],
    ['Α', 'Σ', 'Δ', 'Φ', 'Γ', 'Η', 'Ξ', 'Κ', 'Λ'],
    ['Ζ', 'Χ', 'Ψ', 'Ω', 'Β', 'Ν', 'Μ'],
  ],
};

// German special characters
const germanKeyboard: KeyboardLayout = {
  language: 'de',
  name: 'German',
  hasShift: true,
  rows: [
    ['ä', 'ö', 'ü', 'ß'],
  ],
  shiftRows: [
    ['Ä', 'Ö', 'Ü', 'ẞ'],
  ],
};

// French special characters
const frenchKeyboard: KeyboardLayout = {
  language: 'fr',
  name: 'French',
  hasShift: true,
  rows: [
    ['é', 'è', 'ê', 'ë', 'à', 'â', 'î', 'ï', 'ô', 'û', 'ù', 'ç', 'œ'],
  ],
  shiftRows: [
    ['É', 'È', 'Ê', 'Ë', 'À', 'Â', 'Î', 'Ï', 'Ô', 'Û', 'Ù', 'Ç', 'Œ'],
  ],
};

// Spanish special characters
const spanishKeyboard: KeyboardLayout = {
  language: 'es',
  name: 'Spanish',
  hasShift: true,
  rows: [
    ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'],
  ],
  shiftRows: [
    ['Á', 'É', 'Í', 'Ó', 'Ú', 'Ñ', 'Ü', '¿', '¡'],
  ],
};

// Portuguese special characters
const portugueseKeyboard: KeyboardLayout = {
  language: 'pt',
  name: 'Portuguese',
  hasShift: true,
  rows: [
    ['á', 'â', 'ã', 'à', 'é', 'ê', 'í', 'ó', 'ô', 'õ', 'ú', 'ç'],
  ],
  shiftRows: [
    ['Á', 'Â', 'Ã', 'À', 'É', 'Ê', 'Í', 'Ó', 'Ô', 'Õ', 'Ú', 'Ç'],
  ],
};

// Turkish special characters
const turkishKeyboard: KeyboardLayout = {
  language: 'tr',
  name: 'Turkish',
  hasShift: true,
  rows: [
    ['ğ', 'ı', 'ş', 'ç', 'ö', 'ü'],
  ],
  shiftRows: [
    ['Ğ', 'I', 'Ş', 'Ç', 'Ö', 'Ü'],
  ],
};

// English - no special characters needed
const englishKeyboard: KeyboardLayout = {
  language: 'en',
  name: 'English',
  hasShift: false,
  rows: [],
};

// Italian special characters
const italianKeyboard: KeyboardLayout = {
  language: 'it',
  name: 'Italian',
  hasShift: true,
  rows: [
    ['à', 'è', 'é', 'ì', 'ò', 'ù'],
  ],
  shiftRows: [
    ['À', 'È', 'É', 'Ì', 'Ò', 'Ù'],
  ],
};

// All keyboards map
export const keyboards: Record<LanguageCode, KeyboardLayout> = {
  ru: russianKeyboard,
  el: greekKeyboard,
  de: germanKeyboard,
  fr: frenchKeyboard,
  es: spanishKeyboard,
  pt: portugueseKeyboard,
  tr: turkishKeyboard,
  en: englishKeyboard,
  it: italianKeyboard,
};

/**
 * Get keyboard layout for a language
 */
export function getKeyboard(language: LanguageCode): KeyboardLayout {
  return keyboards[language] || englishKeyboard;
}

/**
 * Check if a language has a virtual keyboard
 */
export function hasVirtualKeyboard(language: LanguageCode): boolean {
  const keyboard = keyboards[language];
  return keyboard && keyboard.rows.length > 0;
}
