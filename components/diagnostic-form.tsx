"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, Loader2, RotateCcw, CheckCircle2, AlertTriangle } from "lucide-react"

export function DiagnosticForm() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [rapport, setRapport] = useState<string | null>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((f: File) => {
    setFile(f)
    setRapport(null)
    setStatus("idle")
    setErrorMessage(null)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(f)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const f = e.dataTransfer.files[0]
      if (f && f.type.startsWith("image/")) handleFile(f)
    },
    [handleFile]
  )

  const handleAnalyze = async () => {
    if (!file) return
    setStatus("loading")
    setRapport(null)
    setErrorMessage(null)

    try {
      const base64 = await fileToBase64(file)

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: base64,
          mimeType: file.type,
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur serveur lors de l'analyse")
      }

      const data = await response.json()
      setRapport(data.text)
      setStatus("done")
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "Erreur inconnue")
      setStatus("error")
    }
  }

  const handleReset = () => {
    setFile(null)
    setPreview(null)
    setRapport(null)
    setStatus("idle")
    setErrorMessage(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div className="bg-card rounded-3xl p-8 border border-border shadow-2xl">
      {/* Upload zone */}
      <div className="mb-8">
        <label
          className="relative flex flex-col items-center justify-center w-full min-h-48 border-2 border-dashed border-border rounded-2xl cursor-pointer hover:bg-muted/50 transition-all group overflow-hidden"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {preview ? (
            <div className="relative w-full">
              <img
                src={preview}
                alt="Apercu de la photo de toiture importee"
                className="w-full h-56 object-cover rounded-xl"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  handleReset()
                }}
                className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-foreground p-2 rounded-full hover:bg-background transition-colors"
                aria-label="Supprimer la photo"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 px-4">
              <Upload className="w-10 h-10 mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
              <p className="text-sm text-muted-foreground text-center">
                <span className="font-semibold text-foreground">
                  Cliquez pour choisir
                </span>{" "}
                ou glissez une photo satellite
              </p>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handleFile(f)
            }}
          />
        </label>
      </div>

      {/* Analyze button */}
      <button
        type="button"
        onClick={handleAnalyze}
        disabled={!file || status === "loading"}
        className="w-full bg-primary hover:bg-accent text-primary-foreground font-bold py-5 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            CONNEXION SATELLITE...
          </>
        ) : status === "done" ? (
          <>
            <CheckCircle2 className="h-5 w-5" />
            ANALYSE TERMINEE - RELANCER
          </>
        ) : (
          "LANCER L'ANALYSE PAR SATELLITE"
        )}
      </button>

      {/* Error display */}
      {status === "error" && errorMessage && (
        <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{errorMessage}</p>
        </div>
      )}

      {/* Report */}
      {rapport && (
        <div className="mt-8 p-6 bg-background/50 rounded-2xl border border-border">
          <h3 className="text-primary font-bold mb-4 flex items-center gap-2">
            <span className="relative flex h-3 w-3" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
            {"RAPPORT D'EXPERTISE IA"}
          </h3>
          <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
            {rapport}
          </div>
        </div>
      )}
    </div>
  )
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(",")[1])
    }
    reader.onerror = reject
  })
}
