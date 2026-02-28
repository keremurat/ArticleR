"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, Star, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePDF } from "@/lib/pdf-context"
import { translateText, speakText } from "@/lib/translation"

interface TranslationTooltipProps {
  selectedText: string
  position: { x: number; y: number }
  onClose: () => void
}

export function TranslationTooltip({ selectedText, position, onClose }: TranslationTooltipProps) {
  const { targetLanguage, addWord, currentPage } = usePDF()
  const [translation, setTranslation] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    let mounted = true

    async function fetchTranslation() {
      setIsLoading(true)
      try {
        const result = await translateText(selectedText, targetLanguage)
        if (mounted) {
          setTranslation(result)
        }
      } catch {
        if (mounted) {
          setTranslation("Çeviri yapılamadı")
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    fetchTranslation()

    return () => {
      mounted = false
    }
  }, [selectedText, targetLanguage])

  const handleSpeak = useCallback(() => {
    speakText(selectedText, "en")
  }, [selectedText])

  const handleSave = useCallback(() => {
    if (translation && !isSaved) {
      addWord({
        original: selectedText,
        translation: translation,
        pageNumber: currentPage,
      })
      setIsSaved(true)
    }
  }, [selectedText, translation, currentPage, addWord, isSaved])

  // Calculate tooltip position to keep it in viewport
  const tooltipStyle = {
    left: Math.min(Math.max(position.x - 150, 10), window.innerWidth - 320),
    top: position.y + 10,
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed z-50 w-72 rounded-xl border bg-card p-4 shadow-xl"
        style={tooltipStyle}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Kapat"
        >
          <X className="size-4" />
        </button>

        {/* Original text */}
        <div className="mb-3 pr-6">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Orijinal</p>
          <p className="mt-1 font-semibold text-foreground">{selectedText}</p>
        </div>

        {/* Translation */}
        <div className="mb-4 rounded-lg bg-muted/50 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Çeviri</p>
          {isLoading ? (
            <div className="mt-2 flex items-center gap-2 text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              <span className="text-sm">Çevriliyor...</span>
            </div>
          ) : (
            <p className="mt-1 text-secondary">{translation}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSpeak} className="flex-1 bg-transparent">
            <Volume2 className="mr-1.5 size-4" />
            Sesli Oku
          </Button>
          <Button
            variant={isSaved ? "secondary" : "default"}
            size="sm"
            onClick={handleSave}
            disabled={isLoading || isSaved}
            className="flex-1"
          >
            <Star className={`mr-1.5 size-4 ${isSaved ? "fill-current" : ""}`} />
            {isSaved ? "Kaydedildi" : "Kaydet"}
          </Button>
        </div>

        {/* Arrow */}
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-b-card"
          style={{ filter: "drop-shadow(0 -1px 1px rgb(0 0 0 / 0.1))" }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
