"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface SavedWord {
  id: string
  original: string
  translation: string
  pageNumber: number
  createdAt: Date
}

interface PDFContextType {
  pdfFile: File | null
  setPdfFile: (file: File | null) => void
  pdfUrl: string | null
  setPdfUrl: (url: string | null) => void
  currentPage: number
  setCurrentPage: (page: number) => void
  numPages: number
  setNumPages: (pages: number) => void
  scale: number
  setScale: (scale: number) => void
  targetLanguage: string
  setTargetLanguage: (lang: string) => void
  savedWords: SavedWord[]
  addWord: (word: Omit<SavedWord, "id" | "createdAt">) => void
  removeWord: (id: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  isDarkMode: boolean
  toggleDarkMode: () => void
  recentPdfs: { name: string; url: string; lastOpened: Date }[]
  addRecentPdf: (name: string, url: string) => void
}

const PDFContext = createContext<PDFContextType | null>(null)

export function PDFProvider({ children }: { children: ReactNode }) {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [numPages, setNumPages] = useState(0)
  const [scale, setScale] = useState(1.0)
  const [targetLanguage, setTargetLanguage] = useState("tr")
  const [savedWords, setSavedWords] = useState<SavedWord[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("scholar-saved-words")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("scholar-dark-mode")
      return saved === "true"
    }
    return false
  })
  const [recentPdfs, setRecentPdfs] = useState<{ name: string; url: string; lastOpened: Date }[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("scholar-recent-pdfs")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const addWord = useCallback((word: Omit<SavedWord, "id" | "createdAt">) => {
    const newWord: SavedWord = {
      ...word,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }
    setSavedWords((prev) => {
      const updated = [...prev, newWord]
      localStorage.setItem("scholar-saved-words", JSON.stringify(updated))
      return updated
    })
  }, [])

  const removeWord = useCallback((id: string) => {
    setSavedWords((prev) => {
      const updated = prev.filter((w) => w.id !== id)
      localStorage.setItem("scholar-saved-words", JSON.stringify(updated))
      return updated
    })
  }, [])

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const newValue = !prev
      localStorage.setItem("scholar-dark-mode", String(newValue))
      if (newValue) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      return newValue
    })
  }, [])

  const addRecentPdf = useCallback((name: string, url: string) => {
    setRecentPdfs((prev) => {
      const filtered = prev.filter((p) => p.name !== name)
      const updated = [{ name, url, lastOpened: new Date() }, ...filtered].slice(0, 5)
      localStorage.setItem("scholar-recent-pdfs", JSON.stringify(updated))
      return updated
    })
  }, [])

  return (
    <PDFContext.Provider
      value={{
        pdfFile,
        setPdfFile,
        pdfUrl,
        setPdfUrl,
        currentPage,
        setCurrentPage,
        numPages,
        setNumPages,
        scale,
        setScale,
        targetLanguage,
        setTargetLanguage,
        savedWords,
        addWord,
        removeWord,
        searchQuery,
        setSearchQuery,
        isDarkMode,
        toggleDarkMode,
        recentPdfs,
        addRecentPdf,
      }}
    >
      {children}
    </PDFContext.Provider>
  )
}

export function usePDF() {
  const context = useContext(PDFContext)
  if (!context) {
    throw new Error("usePDF must be used within a PDFProvider")
  }
  return context
}
