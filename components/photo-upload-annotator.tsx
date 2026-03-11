"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, X, Loader2, AlertTriangle, CheckCircle } from "lucide-react"

export interface DamageZone {
  id: string
  type: string
  label: string
  severity: "leger" | "modere" | "grave"
  description: string
  position: {
    x: number
    y: number
    width: number
    height: number
  }
}

export interface AnalyzedPhoto {
  id: string
  file: File
  preview: string
  analysis: {
    damageZones: DamageZone[]
    overallCondition: string
    summary: string
    recommendations: string[]
  } | null
  isAnalyzing: boolean
  error?: string
}

interface PhotoUploadAnnotatorProps {
  maxPhotos?: number
  onPhotosChange: (photos: AnalyzedPhoto[]) => void
}

export function PhotoUploadAnnotator({
  maxPhotos = 3,
  onPhotosChange,
}: PhotoUploadAnnotatorProps) {
  const [photos, setPhotos] = useState<AnalyzedPhoto[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const remainingSlots = maxPhotos - photos.length
    const filesToProcess = Array.from(files).slice(0, remainingSlots)

    for (const file of filesToProcess) {
      if (!file.type.startsWith("image/")) continue

      const photoId = `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const preview = URL.createObjectURL(file)

      const newPhoto: AnalyzedPhoto = {
        id: photoId,
        file,
        preview,
        analysis: null,
        isAnalyzing: true,
      }

      setPhotos((prev) => {
        const updated = [...prev, newPhoto]
        onPhotosChange(updated)
        return updated
      })

      // Analyze the photo
      await analyzePhoto(photoId, file)
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const analyzePhoto = async (photoId: string, file: File) => {
    try {
      const formData = new FormData()
      formData.append("image", file)
      formData.append("photoId", photoId)

      const response = await fetch("/api/analyze-photo", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const analysis = await response.json()

      setPhotos((prev) => {
        const updated = prev.map((p) =>
          p.id === photoId
            ? { ...p, analysis, isAnalyzing: false }
            : p
        )
        onPhotosChange(updated)
        return updated
      })
    } catch (error) {
      setPhotos((prev) => {
        const updated = prev.map((p) =>
          p.id === photoId
            ? { ...p, isAnalyzing: false, error: "Erreur d'analyse" }
            : p
        )
        onPhotosChange(updated)
        return updated
      })
    }
  }

  const removePhoto = (photoId: string) => {
    setPhotos((prev) => {
      const photo = prev.find((p) => p.id === photoId)
      if (photo) {
        URL.revokeObjectURL(photo.preview)
      }
      const updated = prev.filter((p) => p.id !== photoId)
      onPhotosChange(updated)
      return updated
    })
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "grave":
        return "border-red-500 bg-red-500/20"
      case "modere":
        return "border-orange-500 bg-orange-500/20"
      case "leger":
        return "border-yellow-500 bg-yellow-500/20"
      default:
        return "border-gray-500 bg-gray-500/20"
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "grave":
        return <Badge variant="destructive">Grave</Badge>
      case "modere":
        return <Badge className="bg-orange-500">Modere</Badge>
      case "leger":
        return <Badge className="bg-yellow-500 text-black">Leger</Badge>
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case "bon":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "moyen":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "mauvais":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "critique":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Camera className="h-5 w-5 text-primary" />
          Photos de votre toiture
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Ajoutez jusqu'a {maxPhotos} photos pour un diagnostic plus precis. L'IA analysera automatiquement les dommages visibles.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload zone */}
        {photos.length < maxPhotos && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-6 transition-colors hover:border-primary/50 hover:bg-muted/50"
          >
            <Upload className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Cliquez ou glissez vos photos ici
            </p>
            <p className="text-xs text-muted-foreground">
              {photos.length}/{maxPhotos} photos - JPG, PNG (max 10MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}

        {/* Photos grid */}
        {photos.length > 0 && (
          <div className="space-y-4">
            {photos.map((photo, index) => (
              <div key={photo.id} className="rounded-lg border border-border bg-muted/30 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">Photo {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePhoto(photo.id)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Image with annotations */}
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={photo.preview}
                    alt={`Photo ${index + 1}`}
                    className="w-full object-cover"
                    style={{ maxHeight: "300px" }}
                  />

                  {/* Overlay for annotations */}
                  {photo.analysis?.damageZones.map((zone) => (
                    <div
                      key={zone.id}
                      className={`absolute border-2 rounded ${getSeverityColor(zone.severity)}`}
                      style={{
                        left: `${zone.position.x - zone.position.width / 2}%`,
                        top: `${zone.position.y - zone.position.height / 2}%`,
                        width: `${zone.position.width}%`,
                        height: `${zone.position.height}%`,
                      }}
                    >
                      {/* Label */}
                      <div
                        className="absolute -top-6 left-0 whitespace-nowrap rounded bg-black/80 px-2 py-0.5 text-xs text-white"
                        style={{ fontSize: "10px" }}
                      >
                        {zone.label}
                      </div>
                    </div>
                  ))}

                  {/* Loading overlay */}
                  {photo.isAnalyzing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="flex items-center gap-2 rounded-lg bg-black/80 px-4 py-2 text-white">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Analyse IA en cours...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Analysis results */}
                {photo.analysis && !photo.isAnalyzing && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      {getConditionIcon(photo.analysis.overallCondition)}
                      <span className="text-sm font-medium">
                        Etat: {photo.analysis.overallCondition}
                      </span>
                      {photo.analysis.damageZones.length > 0 && (
                        <Badge variant="outline">
                          {photo.analysis.damageZones.length} dommage(s) detecte(s)
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {photo.analysis.summary}
                    </p>

                    {/* Damage zones list */}
                    {photo.analysis.damageZones.length > 0 && (
                      <div className="space-y-1">
                        {photo.analysis.damageZones.map((zone) => (
                          <div
                            key={zone.id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <div
                              className={`h-2 w-2 rounded-full ${
                                zone.severity === "grave"
                                  ? "bg-red-500"
                                  : zone.severity === "modere"
                                  ? "bg-orange-500"
                                  : "bg-yellow-500"
                              }`}
                            />
                            <span>{zone.label}</span>
                            {getSeverityBadge(zone.severity)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Error state */}
                {photo.error && (
                  <div className="mt-2 text-sm text-red-500">{photo.error}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Export utility function for generating annotated image for PDF
export async function generateAnnotatedImageDataUrl(
  imageUrl: string,
  damageZones: DamageZone[]
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      
      if (!ctx) {
        reject(new Error("Could not get canvas context"))
        return
      }

      // Draw the original image
      ctx.drawImage(img, 0, 0)

      // Draw damage zones
      damageZones.forEach((zone, index) => {
        const x = (zone.position.x - zone.position.width / 2) / 100 * img.width
        const y = (zone.position.y - zone.position.height / 2) / 100 * img.height
        const width = zone.position.width / 100 * img.width
        const height = zone.position.height / 100 * img.height

        // Set color based on severity
        const color = zone.severity === "grave" ? "#dc2626" :
                     zone.severity === "modere" ? "#f97316" : "#eab308"

        // Draw rectangle
        ctx.strokeStyle = color
        ctx.lineWidth = 3
        ctx.strokeRect(x, y, width, height)

        // Draw semi-transparent fill
        ctx.fillStyle = color + "33" // 20% opacity
        ctx.fillRect(x, y, width, height)

        // Draw label background
        ctx.fillStyle = "#000000dd"
        const labelText = `${index + 1}. ${zone.label}`
        ctx.font = "bold 14px Arial"
        const textWidth = ctx.measureText(labelText).width
        ctx.fillRect(x, y - 22, textWidth + 10, 20)

        // Draw label text
        ctx.fillStyle = "#ffffff"
        ctx.fillText(labelText, x + 5, y - 7)
      })

      resolve(canvas.toDataURL("image/jpeg", 0.9))
    }

    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = imageUrl
  })
}
