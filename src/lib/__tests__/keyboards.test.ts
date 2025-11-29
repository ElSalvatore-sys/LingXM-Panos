import { describe, it, expect } from 'vitest'
import { getKeyboard } from '../keyboards'
import type { LanguageCode } from '@/types'

describe('getKeyboard', () => {
  it('returns English keyboard for en', () => {
    const keyboard = getKeyboard('en')
    expect(keyboard.language).toBe('en')
    expect(keyboard.name).toBe('English')
    expect(keyboard.rows).toHaveLength(3)
    // Check QWERTY layout
    expect(keyboard.rows[0][0]).toBe('q')
    expect(keyboard.rows[0][1]).toBe('w')
  })

  it('returns German keyboard for de with umlauts', () => {
    const keyboard = getKeyboard('de')
    expect(keyboard.language).toBe('de')
    expect(keyboard.name).toBe('Deutsch')
    // Check QWERTZ layout (z instead of y)
    expect(keyboard.rows[0][5]).toBe('z')
    // Check umlauts are present
    const allChars = keyboard.rows.flat().join('')
    expect(allChars).toContain('ü')
    expect(allChars).toContain('ö')
    expect(allChars).toContain('ä')
    expect(allChars).toContain('ß')
  })

  it('returns French keyboard for fr with AZERTY layout', () => {
    const keyboard = getKeyboard('fr')
    expect(keyboard.language).toBe('fr')
    // Check AZERTY layout
    expect(keyboard.rows[0][0]).toBe('a')
    expect(keyboard.rows[0][1]).toBe('z')
    // Check French special characters exist
    expect(keyboard.specialRow).toBeDefined()
    expect(keyboard.specialRow?.join('')).toContain('é')
    expect(keyboard.specialRow?.join('')).toContain('ç')
  })

  it('returns Spanish keyboard for es with ñ', () => {
    const keyboard = getKeyboard('es')
    expect(keyboard.language).toBe('es')
    const allChars = keyboard.rows.flat().join('')
    expect(allChars).toContain('ñ')
    // Check special characters
    expect(keyboard.specialRow).toBeDefined()
    expect(keyboard.specialRow?.join('')).toContain('¿')
    expect(keyboard.specialRow?.join('')).toContain('¡')
  })

  it('returns Russian keyboard with Cyrillic layout', () => {
    const keyboard = getKeyboard('ru')
    expect(keyboard.language).toBe('ru')
    expect(keyboard.name).toBe('Русский')
    // Check ЙЦУКЕН layout
    expect(keyboard.rows[0][0]).toBe('й')
    expect(keyboard.rows[0][1]).toBe('ц')
    expect(keyboard.rows[0][2]).toBe('у')
  })

  it('returns Greek keyboard for el', () => {
    const keyboard = getKeyboard('el')
    expect(keyboard.language).toBe('el')
    expect(keyboard.name).toBe('Ελληνικά')
    // Check Greek characters
    const allChars = keyboard.rows.flat().join('')
    expect(allChars).toContain('α')
    expect(allChars).toContain('β')
    expect(allChars).toContain('γ')
  })

  it('returns Turkish keyboard for tr', () => {
    const keyboard = getKeyboard('tr')
    expect(keyboard.language).toBe('tr')
    // Check Turkish special characters
    const allChars = keyboard.rows.flat().join('')
    expect(allChars).toContain('ğ')
    expect(allChars).toContain('ş')
    expect(allChars).toContain('ı')
  })

  it('returns Portuguese keyboard for pt', () => {
    const keyboard = getKeyboard('pt')
    expect(keyboard.language).toBe('pt')
    const allChars = keyboard.rows.flat().join('')
    expect(allChars).toContain('ç')
    // Check special characters
    expect(keyboard.specialRow).toBeDefined()
    expect(keyboard.specialRow?.join('')).toContain('ã')
  })

  it('has matching shift rows for all keyboards', () => {
    const languages: LanguageCode[] = ['en', 'de', 'fr', 'es', 'ru', 'el', 'pt', 'tr']

    for (const lang of languages) {
      const keyboard = getKeyboard(lang)
      expect(keyboard.rows.length).toBe(keyboard.shiftRows.length)

      for (let i = 0; i < keyboard.rows.length; i++) {
        expect(keyboard.rows[i].length).toBe(keyboard.shiftRows[i].length)
      }
    }
  })

  it('defaults to English for unknown language', () => {
    // @ts-expect-error - testing invalid language
    const keyboard = getKeyboard('xx')
    expect(keyboard.language).toBe('en')
  })
})
