"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { Upload, Satellite, Loader2, AlertTriangle, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function DiagnosticForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      setError("Veuillez selectionner une image valide.");
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("L'image ne doit pas depasser 10 Mo.");
      return;
    }
    setFile(selectedFile);
    setError(null);
    setReport(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(selectedFile);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) handleFile(droppedFile);
    },
    [handleFile]
  );

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/diagnostic", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de l'analyse.");
      }

      setReport(data.report);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setReport(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Upload area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-xl transition-all cursor-pointer",
          dragOver
            ? "border-primary bg-primary/5"
            : preview
              ? "border-border bg-card"
              : "border-border hover:border-primary/50 hover:bg-secondary/50"
        )}
      >
        {preview ? (
          <div className="relative">
            <div className="relative aspect-video rounded-lg overflow-hidden m-4">
              <Image
                src={preview}
                alt="Apercu de la photo de toiture"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <button
              onClick={resetForm}
              className="absolute top-6 right-6 bg-foreground/80 text-background rounded-full p-1.5 hover:bg-foreground transition-colors"
              aria-label="Supprimer l'image"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="px-4 pb-4">
              <p className="text-sm text-muted-foreground truncate">
                {file?.name} ({((file?.size || 0) / 1024 / 1024).toFixed(1)} Mo)
              </p>
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center py-16 px-6 cursor-pointer">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="h-7 w-7 text-primary" />
            </div>
            <p className="text-base font-semibold text-foreground mb-1">
              Deposez votre photo ici
            </p>
            <p className="text-sm text-muted-foreground">
              ou cliquez pour parcourir vos fichiers
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              JPG, PNG ou WebP - 10 Mo maximum
            </p>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const selected = e.target.files?.[0];
                if (selected) handleFile(selected);
              }}
            />
          </label>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg p-4">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={!file || loading}
        className={cn(
          "w-full flex items-center justify-center gap-3 py-4 rounded-xl text-base font-semibold transition-all",
          file && !loading
            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        )}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Analyse en cours...
          </>
        ) : (
          <>
            <Satellite className="h-5 w-5" />
            Lancer l&apos;analyse IA
          </>
        )}
      </button>

      {/* Report */}
      {report && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-secondary">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Rapport d&apos;expertise IA
            </h3>
          </div>
          <div className="p-6">
            <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
              {report}
            </div>
            <div className="mt-6 flex items-start gap-3 bg-primary/5 border border-primary/10 rounded-lg p-4">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Ce rapport est genere par intelligence artificielle a titre
                indicatif. Pour un diagnostic complet, contactez-nous pour une
                inspection sur site.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
