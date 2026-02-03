// Translation service using MyMemory API (free, no API key required)
// Falls back to local dictionary for common academic terms

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

export async function translateText(text: string, targetLang: string): Promise<string> {
  const trimmedText = text.trim()
  if (!trimmedText) return ""

  // Check local dictionary first (for single words)
  const lowerText = trimmedText.toLowerCase()
  const langTranslations = localTranslations[targetLang]
  if (langTranslations && langTranslations[lowerText]) {
    return langTranslations[lowerText]
  }

  // Use MyMemory API for translation
  try {
    const sourceLang = detectSourceLang(trimmedText)

    // Don't translate if source and target are the same
    if (sourceLang === targetLang) {
      return trimmedText
    }

    const langPair = `${langCodeMap[sourceLang]}|${langCodeMap[targetLang]}`
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmedText)}&langpair=${langPair}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
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
