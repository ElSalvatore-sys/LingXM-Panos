import type { LanguageCode } from '@/types'

// Map our language codes to BCP-47 language tags for Web Speech API
const languageToVoiceTag: Record<LanguageCode, string> = {
  de: 'de-DE',
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  it: 'it-IT',
  ru: 'ru-RU',
  el: 'el-GR',
  tr: 'tr-TR',
  pt: 'pt-PT',
}

// Cache for available voices
let cachedVoices: SpeechSynthesisVoice[] = []

/**
 * Get available voices, with caching
 */
function getVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (cachedVoices.length > 0) {
      resolve(cachedVoices)
      return
    }

    const voices = speechSynthesis.getVoices()
    if (voices.length > 0) {
      cachedVoices = voices
      resolve(voices)
      return
    }

    // Voices might not be loaded yet, wait for them
    speechSynthesis.onvoiceschanged = () => {
      cachedVoices = speechSynthesis.getVoices()
      resolve(cachedVoices)
    }
  })
}

/**
 * Find the best voice for a given language
 */
async function findVoiceForLanguage(languageCode: LanguageCode): Promise<SpeechSynthesisVoice | null> {
  const voices = await getVoices()
  const langTag = languageToVoiceTag[languageCode]

  // Try to find an exact match first
  let voice = voices.find(v => v.lang === langTag)

  // If no exact match, try partial match (e.g., 'de' matches 'de-AT')
  if (!voice) {
    const langPrefix = langTag.split('-')[0]
    voice = voices.find(v => v.lang.startsWith(langPrefix))
  }

  return voice || null
}

/**
 * Check if TTS is available in the browser
 */
export function isTTSAvailable(): boolean {
  return 'speechSynthesis' in window
}

/**
 * Speak a word or phrase using Web Speech API
 */
export async function speak(
  text: string,
  languageCode: LanguageCode,
  options?: {
    rate?: number    // 0.1 to 10, default 1
    pitch?: number   // 0 to 2, default 1
    volume?: number  // 0 to 1, default 1
  }
): Promise<void> {
  if (!isTTSAvailable()) {
    console.warn('Text-to-speech is not available in this browser')
    return
  }

  // Cancel any ongoing speech
  speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)

  // Set language
  utterance.lang = languageToVoiceTag[languageCode]

  // Try to find a specific voice for better pronunciation
  const voice = await findVoiceForLanguage(languageCode)
  if (voice) {
    utterance.voice = voice
  }

  // Apply options
  utterance.rate = options?.rate ?? 0.9  // Slightly slower for learning
  utterance.pitch = options?.pitch ?? 1
  utterance.volume = options?.volume ?? 1

  return new Promise((resolve, reject) => {
    utterance.onend = () => resolve()
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error)
      reject(new Error(event.error))
    }

    speechSynthesis.speak(utterance)
  })
}

/**
 * Stop any ongoing speech
 */
export function stopSpeaking(): void {
  if (isTTSAvailable()) {
    speechSynthesis.cancel()
  }
}

/**
 * Check if currently speaking
 */
export function isSpeaking(): boolean {
  if (!isTTSAvailable()) return false
  return speechSynthesis.speaking
}

/**
 * Get list of available languages that have voice support
 */
export async function getAvailableLanguages(): Promise<LanguageCode[]> {
  const voices = await getVoices()
  const availableLangs: LanguageCode[] = []

  for (const [langCode, langTag] of Object.entries(languageToVoiceTag)) {
    const langPrefix = langTag.split('-')[0]
    const hasVoice = voices.some(v => v.lang.startsWith(langPrefix))
    if (hasVoice) {
      availableLangs.push(langCode as LanguageCode)
    }
  }

  return availableLangs
}
