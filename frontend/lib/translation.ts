// Translation service with provider switch infrastructure.
// Current default provider: MyMemory (free, no API key required).

const localTranslations: Record<string, Record<string, string>> = {
  tr: {
    "abstract": "özet",
    "introduction": "giriş",
    "method": "yöntem",
    "methods": "yöntemler",
    "results": "sonuçlar",
    "discussion": "tartışma",
    "conclusion": "sonuç",
    "references": "kaynaklar",
    "figure": "şekil",
    "table": "tablo",
    "data": "veri",
    "analysis": "analiz",
    "research": "araştırma",
    "study": "çalışma",
    "experiment": "deney",
    "hypothesis": "hipotez",
    "significant": "önemli",
    "correlation": "korelasyon",
    "variable": "değişken",
    "sample": "örnek",
    "population": "popülasyon",
    "statistical": "istatistiksel",
    "evidence": "kanıt",
    "theory": "teori",
    "model": "model",
    "framework": "çerçeve",
    "approach": "yaklaşım",
    "findings": "bulgular",
    "implications": "çıkarımlar",
    "limitations": "sınırlamalar",
  },
  en: {
    "özet": "abstract",
    "giriş": "introduction",
    "yöntem": "method",
    "sonuç": "conclusion",
    "veri": "data",
    "analiz": "analysis",
    "araştırma": "research",
  },
  de: {
    "abstract": "Zusammenfassung",
    "introduction": "Einleitung",
    "method": "Methode",
    "results": "Ergebnisse",
    "discussion": "Diskussion",
    "conclusion": "Schlussfolgerung",
  },
  fr: {
    "abstract": "résumé",
    "introduction": "introduction",
    "method": "méthode",
    "results": "résultats",
    "discussion": "discussion",
    "conclusion": "conclusion",
  },
  es: {
    "abstract": "resumen",
    "introduction": "introducción",
    "method": "método",
    "results": "resultados",
    "discussion": "discusión",
    "conclusion": "conclusión",
  },
}

// Language code mapping for MyMemory API
const langCodeMap: Record<string, string> = {
  tr: "tr",
  en: "en",
  de: "de",
  fr: "fr",
  es: "es",
}

type TranslationProvider = "mymemory" | "deepl" | "google" | "azure"
type TranslationProviderConfig = TranslationProvider | "auto"

interface TranslationRequest {
  text: string
  targetLang: string
  contextText?: string
}

function normalizeWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s'-]/gu, " ")
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean)
}

interface MyMemoryMatch {
  segment?: string
  translation?: string
  quality?: number | string
}

interface MyMemoryResponse {
  responseStatus?: number
  responseData?: {
    translatedText?: string
  }
  matches?: MyMemoryMatch[]
}

function pickContextAwareTranslation(
  data: MyMemoryResponse,
  selectedText: string,
  contextText?: string
): string | null {
  if (!contextText || !Array.isArray(data?.matches)) {
    return null
  }

  const selectedWord = selectedText.toLowerCase()
  const contextWords = new Set(normalizeWords(contextText).filter((word) => word !== selectedWord))
  if (contextWords.size === 0) {
    return null
  }

  let bestCandidate: string | null = null
  let bestScore = 0

  for (const match of data.matches) {
    const segment = String(match?.segment || "")
    const translation = String(match?.translation || "").trim()
    const qualityRaw = Number(match?.quality || 0)

    if (!segment || !translation) {
      continue
    }

    const segmentWords = normalizeWords(segment)
    if (!segmentWords.includes(selectedWord)) {
      continue
    }

    const overlap = segmentWords.reduce((count, word) => {
      return count + (contextWords.has(word) ? 1 : 0)
    }, 0)

    const qualityScore = Number.isFinite(qualityRaw) ? qualityRaw / 1000 : 0
    const score = overlap * 10 + qualityScore

    if (score > bestScore) {
      bestScore = score
      bestCandidate = translation
    }
  }

  return bestCandidate
}

const warnedProviders = new Set<string>()

function warnProviderOnce(provider: string, message: string) {
  if (!warnedProviders.has(provider)) {
    warnedProviders.add(provider)
    console.warn(message)
  }
}

function normalizeProvider(input: string | undefined): TranslationProviderConfig {
  const value = String(input || "mymemory").toLowerCase().trim()
  if (value === "auto") return "auto"
  if (value === "deepl") return "deepl"
  if (value === "google") return "google"
  if (value === "azure") return "azure"
  return "mymemory"
}

function getProviderChain(): TranslationProvider[] {
  const configured = normalizeProvider(process.env.NEXT_PUBLIC_TRANSLATION_PROVIDER)
  if (configured === "auto") {
    return ["deepl", "google", "azure", "mymemory"]
  }

  if (configured === "mymemory") {
    return ["mymemory"]
  }

  return [configured, "mymemory"]
}

// Detect source language (simple heuristic)
function detectSourceLang(text: string): string {
  const turkishChars = /[çğıöşüÇĞİÖŞÜ]/
  const germanChars = /[äöüßÄÖÜ]/
  const frenchChars = /[àâçéèêëîïôûùüÿœæ]/i
  const spanishChars = /[áéíóúñ¿¡]/i

  if (turkishChars.test(text)) return "tr"
  if (germanChars.test(text)) return "de"
  if (frenchChars.test(text)) return "fr"
  if (spanishChars.test(text)) return "es"
  return "en" // Default to English
}

async function translateWithMyMemory({ text, targetLang, contextText }: TranslationRequest): Promise<string> {
  const trimmedText = text.trim()
  if (!trimmedText) return ""

  const normalizedTargetLang = langCodeMap[targetLang] || "en"
  const isSingleWord = /^[-'\p{L}\p{N}]{2,}$/u.test(trimmedText)

  // Check local dictionary first (for single words)
  const lowerText = trimmedText.toLowerCase()
  const langTranslations = localTranslations[targetLang]
  if (!contextText && langTranslations && langTranslations[lowerText]) {
    return langTranslations[lowerText]
  }

  // Use MyMemory API for translation
  try {
    const sourceLang = detectSourceLang(contextText?.trim() || trimmedText)
    const normalizedSourceLang = langCodeMap[sourceLang] || "en"

    // Don't translate if source and target are the same
    if (normalizedSourceLang === normalizedTargetLang) {
      return trimmedText
    }

    const langPair = `${normalizedSourceLang}|${normalizedTargetLang}`
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmedText)}&langpair=${langPair}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data: MyMemoryResponse = await response.json()

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      if (isSingleWord && contextText) {
        const contextAware = pickContextAwareTranslation(data, trimmedText, contextText)
        if (contextAware) {
          return contextAware
        }
      }

      const translated = data.responseData.translatedText
      // MyMemory returns uppercase for some errors, check for that
      if (translated.toUpperCase() === translated && trimmedText.toUpperCase() !== trimmedText) {
        // Likely an error or untranslated, return original
        return trimmedText
      }
      return translated
    }

    // Fallback: return original text
    return trimmedText
  } catch (error) {
    console.error("Translation error:", error)
    // On error, return original text instead of mock
    return trimmedText
  }
}

async function translateWithDeepL(request: TranslationRequest): Promise<string | null> {
  void request
  warnProviderOnce(
    "deepl",
    "DeepL provider is selected but not configured yet. Falling back to MyMemory."
  )
  return null
}

async function translateWithGoogle(request: TranslationRequest): Promise<string | null> {
  void request
  warnProviderOnce(
    "google",
    "Google provider is selected but not configured yet. Falling back to MyMemory."
  )
  return null
}

async function translateWithAzure(request: TranslationRequest): Promise<string | null> {
  void request
  warnProviderOnce(
    "azure",
    "Azure provider is selected but not configured yet. Falling back to MyMemory."
  )
  return null
}

const providerHandlers: Record<TranslationProvider, (request: TranslationRequest) => Promise<string | null>> = {
  mymemory: translateWithMyMemory,
  deepl: translateWithDeepL,
  google: translateWithGoogle,
  azure: translateWithAzure,
}

export async function translateText(text: string, targetLang: string, contextText?: string): Promise<string> {
  const request: TranslationRequest = { text, targetLang, contextText }

  for (const provider of getProviderChain()) {
    const translated = await providerHandlers[provider](request)
    if (translated && translated.trim()) {
      return translated
    }
  }

  return text.trim()
}

export function getActiveTranslationProvider(): TranslationProviderConfig {
  return normalizeProvider(process.env.NEXT_PUBLIC_TRANSLATION_PROVIDER)
}

export function speakText(text: string, lang: string) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text)

    const langMap: Record<string, string> = {
      tr: "tr-TR",
      en: "en-US",
      de: "de-DE",
      fr: "fr-FR",
      es: "es-ES",
    }

    utterance.lang = langMap[lang] || "en-US"
    utterance.rate = 0.9

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }
}

export const languages = [
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
]
