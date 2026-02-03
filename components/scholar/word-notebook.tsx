"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Download, Trash2, BookOpen, FileJson, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePDF } from "@/lib/pdf-context"

interface WordNotebookProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WordNotebook({ open, onOpenChange }: WordNotebookProps) {
  const { savedWords, removeWord, setCurrentPage } = usePDF()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredWords = useMemo(() => {
    if (!searchTerm) return savedWords
    const lower = searchTerm.toLowerCase()
    return savedWords.filter(
      (word) => word.original.toLowerCase().includes(lower) || word.translation.toLowerCase().includes(lower)
    )
  }, [savedWords, searchTerm])

  const exportAsCSV = () => {
    const headers = "Orijinal,Çeviri,Sayfa,Tarih\n"
    const rows = savedWords
      .map((word) => `"${word.original}","${word.translation}",${word.pageNumber},"${new Date(word.createdAt).toLocaleDateString("tr-TR")}"`)
      .join("\n")
    
    const csv = headers + rows
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "kelime-defteri.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportAsJSON = () => {
    const json = JSON.stringify(savedWords, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "kelime-defteri.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <BookOpen className="size-5 text-secondary" />
            Kelime Defterim
          </SheetTitle>
          <SheetDescription>Kaydettiğiniz kelimeler ve çevirileri</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 flex-1 overflow-hidden">
          {/* Search and Export */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Kelime ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" disabled={savedWords.length === 0}>
                  <Download className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={exportAsCSV}>
                  <FileText className="mr-2 size-4" />
                  CSV olarak indir
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportAsJSON}>
                  <FileJson className="mr-2 size-4" />
                  JSON olarak indir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Word count */}
          <p className="text-sm text-muted-foreground">
            {filteredWords.length} kelime {searchTerm && `("${searchTerm}" için)`}
          </p>

          {/* Words List */}
          <div className="flex-1 overflow-y-auto -mx-6 px-6">
            <AnimatePresence mode="popLayout">
              {filteredWords.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <BookOpen className="size-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">
                    {searchTerm ? "Arama sonucu bulunamadı" : "Henüz kayıtlı kelime yok"}
                  </p>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    {!searchTerm && "PDF'deki kelimeleri çevirin ve kaydedin"}
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-2 pb-4">
                  {filteredWords.map((word, index) => (
                    <motion.div
                      key={word.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative rounded-lg border bg-card p-3 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{word.original}</p>
                          <p className="text-sm text-secondary truncate">{word.translation}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => removeWord(word.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                      <button
                        onClick={() => setCurrentPage(word.pageNumber)}
                        className="mt-2 text-xs text-muted-foreground hover:text-secondary transition-colors"
                      >
                        Sayfa {word.pageNumber}
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
