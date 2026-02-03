"use client"

import React from "react"

import { useState, useCallback, useEffect, useRef, useMemo } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { motion } from "framer-motion"
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Search,
  Moon,
  Sun,
  Home,
  Highlighter,
  Languages,
  MousePointer2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { usePDF } from "@/lib/pdf-context"
import { languages } from "@/lib/translation"
import { TranslationTooltip } from "./translation-tooltip"
import { WordNotebook } from "./word-notebook"

import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface HighlightColor {
  name: string
  color: string
  bgClass: string
}

const highlightColors: HighlightColor[] = [
  { name: "Sarı", color: "#fef08a", bgClass: "bg-yellow-200" },
  { name: "Yeşil", color: "#bbf7d0", bgClass: "bg-green-200" },
  { name: "Mavi", color: "#bfdbfe", bgClass: "bg-blue-200" },
  { name: "Pembe", color: "#fbcfe8", bgClass: "bg-pink-200" },
]

export function PDFViewer() {
  const {
    pdfUrl,
    setPdfUrl,
    setPdfFile,
    currentPage,
    setCurrentPage,
    numPages,
    setNumPages,
    scale,
    setScale,
    targetLanguage,
    setTargetLanguage,
    isDarkMode,
    toggleDarkMode,
    searchQuery,
    setSearchQuery,
    savedWords,
  } = usePDF()

  const [isLoading, setIsLoading] = useState(true)
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [isNotebookOpen, setIsNotebookOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [selectedHighlight, setSelectedHighlight] = useState<HighlightColor | null>(null)
  const [isHoverMode, setIsHoverMode] = useState(true) // Hover çeviri modu
  const [hoveredWord, setHoveredWord] = useState<string | null>(null)
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 })
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pageInputRef = useRef<HTMLInputElement>(null)

  // Handle document load success
  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages)
      setIsLoading(false)
    },
    [setNumPages]
  )

  // Handle text selection
  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection()
    const text = selection?.toString().trim()

    if (text && text.length > 0 && text.length < 200) {
      const range = selection?.getRangeAt(0)
      const rect = range?.getBoundingClientRect()

      if (rect) {
        setSelectedText(text)
        setTooltipPosition({
          x: rect.left + rect.width / 2,
          y: rect.bottom,
        })
      }
    }
  }, [])

  // Close tooltip
  const closeTooltip = useCallback(() => {
    setSelectedText(null)
    setHoveredWord(null)
    window.getSelection()?.removeAllRanges()
  }, [])

  // Get word at cursor position
  const getWordAtPoint = useCallback((x: number, y: number): string | null => {
    const element = document.elementFromPoint(x, y)
    if (!element) return null

    // Check if we're over a text layer span
    const textLayer = element.closest(".react-pdf__Page__textContent")
    if (!textLayer) return null

    // Get the text content of the element
    const text = element.textContent?.trim()
    if (!text) return null

    // Try to get the specific word under cursor using range
    if (document.caretRangeFromPoint) {
      const range = document.caretRangeFromPoint(x, y)
      if (range) {
        const textNode = range.startContainer
        if (textNode.nodeType === Node.TEXT_NODE) {
          const fullText = textNode.textContent || ""
          const offset = range.startOffset

          // Find word boundaries
          let start = offset
          let end = offset

          while (start > 0 && /\w/.test(fullText[start - 1])) start--
          while (end < fullText.length && /\w/.test(fullText[end])) end++

          const word = fullText.slice(start, end).trim()
          if (word.length >= 2 && word.length <= 50) {
            return word
          }
        }
      }
    }

    // Fallback: return first word if short text
    const words = text.split(/\s+/)
    if (words.length === 1 && words[0].length >= 2 && words[0].length <= 50) {
      return words[0]
    }

    return null
  }, [])

  // Handle mouse move for hover translation
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isHoverMode || selectedText) return

      // Clear previous timeout
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }

      // Debounce: wait 400ms before showing tooltip
      hoverTimeoutRef.current = setTimeout(() => {
        const word = getWordAtPoint(e.clientX, e.clientY)

        if (word && word !== hoveredWord) {
          setHoveredWord(word)
          setHoverPosition({ x: e.clientX, y: e.clientY + 10 })
        } else if (!word) {
          setHoveredWord(null)
        }
      }, 400)
    },
    [isHoverMode, selectedText, hoveredWord, getWordAtPoint]
  )

  // Clear hover when mouse leaves
  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setHoveredWord(null)
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Z for zoom
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault()
        setScale((s) => Math.min(s + 0.25, 3))
      }
      // Escape to close tooltip
      if (e.key === "Escape") {
        closeTooltip()
        setShowSearch(false)
      }
      // Ctrl+F for search
      if (e.ctrlKey && e.key === "f") {
        e.preventDefault()
        setShowSearch((prev) => !prev)
      }
      // Arrow keys for navigation
      if (e.key === "ArrowLeft" && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
      if (e.key === "ArrowRight" && currentPage < numPages) {
        setCurrentPage(currentPage + 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [closeTooltip, currentPage, numPages, setCurrentPage, setScale])

  // Apply dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Navigation functions
  const goToPreviousPage = () => setCurrentPage(Math.max(1, currentPage - 1))
  const goToNextPage = () => setCurrentPage(Math.min(numPages, currentPage + 1))
  const zoomIn = () => setScale(Math.min(scale + 0.25, 3))
  const zoomOut = () => setScale(Math.max(scale - 0.25, 0.5))
  const fitToWidth = () => setScale(1)

  const handlePageInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = parseInt((e.target as HTMLInputElement).value)
      if (value >= 1 && value <= numPages) {
        setCurrentPage(value)
      }
    }
  }

  const goHome = () => {
    setPdfUrl(null)
    setPdfFile(null)
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen flex-col bg-background">
        {/* Header */}
        <header className="flex items-center justify-between border-b bg-card px-4 py-2">
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={goHome}>
                  <Home className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Ana Sayfa</TooltipContent>
            </Tooltip>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <BookOpen className="size-5 text-secondary" />
              <span>
                Schol<span className="text-secondary">AR</span>
              </span>
            </div>
          </div>

          {/* Language Selector & Hover Mode */}
          <div className="flex items-center gap-4">
            {/* Hover Mode Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isHoverMode ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setIsHoverMode(!isHoverMode)}
                  className="gap-2"
                >
                  <MousePointer2 className="size-4" />
                  <span className="hidden sm:inline">Hover Çeviri</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isHoverMode ? "Hover çeviri açık - kelime üzerine gelin" : "Hover çeviri kapalı"}
              </TooltipContent>
            </Tooltip>

            <div className="h-6 w-px bg-border" />

            <Languages className="size-4 text-muted-foreground" />
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={showSearch ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <Search className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Ara (Ctrl+F)</TooltipContent>
            </Tooltip>

            {/* Highlight Color */}
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={selectedHighlight ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setSelectedHighlight(selectedHighlight ? null : highlightColors[0])}
                  >
                    <Highlighter className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Vurgulama</TooltipContent>
              </Tooltip>
              {selectedHighlight && (
                <div className="flex items-center gap-1 rounded-md border p-1">
                  {highlightColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedHighlight(color)}
                      className={`size-5 rounded-sm ${color.bgClass} ${
                        selectedHighlight.name === color.name ? "ring-2 ring-foreground ring-offset-1" : ""
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Word Notebook */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setIsNotebookOpen(true)} className="relative">
                  <BookOpen className="size-5" />
                  {savedWords.length > 0 && (
                    <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground">
                      {savedWords.length}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Kelime Defteri</TooltipContent>
            </Tooltip>

            {/* Dark Mode Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                  {isDarkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isDarkMode ? "Açık Mod" : "Koyu Mod"}</TooltipContent>
            </Tooltip>
          </div>
        </header>

        {/* Search Bar */}
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b bg-card px-4 py-2"
          >
            <div className="mx-auto flex max-w-md items-center gap-2">
              <Search className="size-4 text-muted-foreground" />
              <Input
                placeholder="PDF içinde ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                autoFocus
              />
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* PDF Viewer */}
          <div
            ref={containerRef}
            className="flex-1 overflow-auto bg-muted/30 p-4"
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex min-h-full items-start justify-center">
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex flex-col items-center gap-4">
                    <Skeleton className="h-[800px] w-[600px] rounded-lg" />
                  </div>
                }
                error={
                  <div className="flex flex-col items-center gap-4 py-12 text-destructive">
                    <p>PDF yüklenirken bir hata oluştu</p>
                    <Button variant="outline" onClick={goHome}>
                      Ana Sayfaya Dön
                    </Button>
                  </div>
                }
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-lg bg-card shadow-xl"
                >
                  <Page
                    pageNumber={currentPage}
                    scale={scale}
                    loading={<Skeleton className="h-[800px] w-[600px]" />}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                </motion.div>
              </Document>
            </div>
          </div>
        </div>

        {/* Bottom Toolbar */}
        <footer className="flex items-center justify-between border-t bg-card px-4 py-2">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" onClick={zoomOut} disabled={scale <= 0.5}>
                  <ZoomOut className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Uzaklaştır</TooltipContent>
            </Tooltip>
            <span className="w-14 text-center text-sm text-muted-foreground">{Math.round(scale * 100)}%</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" onClick={zoomIn} disabled={scale >= 3}>
                  <ZoomIn className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Yakınlaştır (Ctrl+Z)</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" onClick={fitToWidth}>
                  <Maximize2 className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Genişliğe Sığdır</TooltipContent>
            </Tooltip>
          </div>

          {/* Page Navigation */}
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" onClick={goToPreviousPage} disabled={currentPage <= 1}>
                  <ChevronLeft className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Önceki Sayfa</TooltipContent>
            </Tooltip>
            <div className="flex items-center gap-1 text-sm">
              <Input
                ref={pageInputRef}
                type="number"
                min={1}
                max={numPages}
                value={currentPage}
                onChange={(e) => {
                  const val = parseInt(e.target.value)
                  if (!isNaN(val) && val >= 1 && val <= numPages) {
                    setCurrentPage(val)
                  }
                }}
                onKeyDown={handlePageInput}
                className="h-8 w-14 text-center"
              />
              <span className="text-muted-foreground">/ {numPages || "?"}</span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" onClick={goToNextPage} disabled={currentPage >= numPages}>
                  <ChevronRight className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Sonraki Sayfa</TooltipContent>
            </Tooltip>
          </div>

          {/* Keyboard Shortcuts Hint */}
          <div className="hidden text-xs text-muted-foreground md:block">
            <span className="rounded bg-muted px-1.5 py-0.5">←</span>{" "}
            <span className="rounded bg-muted px-1.5 py-0.5">→</span> Sayfa değiştir •{" "}
            <span className="rounded bg-muted px-1.5 py-0.5">Ctrl+F</span> Ara •{" "}
            <span className="rounded bg-muted px-1.5 py-0.5">Esc</span> Kapat
          </div>
        </footer>

        {/* Translation Tooltip - for text selection */}
        {selectedText && (
          <TranslationTooltip selectedText={selectedText} position={tooltipPosition} onClose={closeTooltip} />
        )}

        {/* Hover Translation Tooltip */}
        {hoveredWord && !selectedText && (
          <TranslationTooltip selectedText={hoveredWord} position={hoverPosition} onClose={() => setHoveredWord(null)} />
        )}

        {/* Word Notebook Sheet */}
        <WordNotebook open={isNotebookOpen} onOpenChange={setIsNotebookOpen} />
      </div>
    </TooltipProvider>
  )
}
