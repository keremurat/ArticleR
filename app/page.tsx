"use client"

import dynamic from "next/dynamic"
import { PDFProvider, usePDF } from "@/lib/pdf-context"
import { PDFUpload } from "@/components/scholar/pdf-upload"

const PDFViewer = dynamic(
  () => import("@/components/scholar/pdf-viewer").then((mod) => mod.PDFViewer),
  { ssr: false }
)

function ScholARApp() {
  const { pdfUrl } = usePDF()

  return pdfUrl ? <PDFViewer /> : <PDFUpload />
}

export default function Home() {
  return (
    <PDFProvider>
      <ScholARApp />
    </PDFProvider>
  )
}
