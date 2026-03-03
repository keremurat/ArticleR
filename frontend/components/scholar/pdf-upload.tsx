"use client"

import React from "react"

import { useCallback, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { usePDF } from "@/lib/pdf-context"

export function PDFUpload() {
  const { setPdfFile, setPdfUrl } = usePDF()
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = useCallback(
    (file: File) => {
      setError(null)

      if (file.type !== "application/pdf") {
        setError("Lütfen sadece PDF dosyası yükleyin")
        return
      }

      if (file.size > 50 * 1024 * 1024) {
        setError("Dosya boyutu 50MB'dan küçük olmalıdır")
        return
      }

      const url = URL.createObjectURL(file)
      setPdfFile(file)
      setPdfUrl(url)
    },
    [setPdfFile, setPdfUrl]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) {
        handleFile(file)
      }
    },
    [handleFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFile(file)
      }
    },
    [handleFile]
  )

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        {/* Logo and Title */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 flex items-center justify-center gap-3"
          >
            <div className="flex size-14 items-center justify-center rounded-xl bg-primary shadow-lg">
              <svg
                className="size-8 text-primary-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Article<span className="text-secondary">R</span>
            </h1>
          </motion.div>
          <p className="text-lg text-muted-foreground">Bilimsel Makale Okuyucu</p>
        </div>

        {/* Upload Area */}
        <Card
          className={`relative cursor-pointer border-2 border-dashed p-12 transition-all duration-300 ${
            isDragging
              ? "border-secondary bg-secondary/10"
              : "border-border hover:border-secondary/50 hover:bg-muted/50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileSelect}
            className="absolute inset-0 cursor-pointer opacity-0"
            aria-label="PDF dosyası seç"
          />

          <motion.div
            className="flex flex-col items-center gap-4"
            animate={{ scale: isDragging ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className={`flex size-20 items-center justify-center rounded-full transition-colors ${
                isDragging ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
              }`}
              animate={{ y: isDragging ? -10 : 0 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              <Upload className="size-10" />
            </motion.div>

            <div className="text-center">
              <p className="text-lg font-medium text-foreground">
                {isDragging ? "Dosyayı bırakın" : "PDF dosyanızı sürükleyip bırakın"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">veya tıklayarak seçin</p>
            </div>

            <Button variant="secondary" size="lg" className="mt-2">
              <Upload className="mr-2 size-4" />
              PDF Yükle
            </Button>

            <p className="text-xs text-muted-foreground">Desteklenen format: PDF (max 50MB)</p>
          </motion.div>
        </Card>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
            >
              <X className="size-4" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-4 text-lg text-muted-foreground">
          <a
            href="https://eistatistik.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="eistatistik.com"
            className="inline-flex items-center"
          >
            <img
              src="/branding/logosiyah_reduce.png"
              alt="Firma logosu"
              className="h-8 w-auto max-w-48 object-contain dark:hidden"
            />
            <img
              src="/branding/logobeyaz-reduce.png"
              alt="Firma logosu"
              className="hidden h-8 w-auto max-w-48 object-contain dark:block"
            />
          </a>
          <span className="font-sans font-semibold tracking-tight">tarafından geliştirildi</span>
        </div>
      </motion.div>
    </div>
  )
}
