"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, X, Loader2, AlertTriangle, CheckCircle, MapPin, User, Phone, Mail, Home } from "lucide-react"

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

export interface ClientInfo {
  nom: string
  prenom: string
  telephone: string
  email: string
  adresse: string
  codePostal: string
  ville: string
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
  onClientInfoChange?: (clientInfo: ClientInfo) => void
  showClientForm?: boolean
}

export function PhotoUploadAnnotator({
  maxPhotos = 3,
  onPhotosChange,
  onClientInfoChange,
  showClientForm = true,
}: PhotoUploadAnnotatorProps) {
  const [photos, setPhotos] = useState<AnalyzedPhoto[]>([])
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    adresse: "",
    codePostal: "",
    ville: "",
  })
  const [showForm, setShowForm] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const handleClientInfoChange = (field: keyof ClientInfo, value: string) => {
    const updated = { ...clientInfo, [field]: value }
    setClientInfo(updated)
    onClientInfoChange?.(updated)
  }
  
  const isClientInfoComplete = () => {
    return clientInfo.nom && clientInfo.telephone && clientInfo.adresse && clientInfo.codePostal && clientInfo.ville
  }

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
        
        {/* Formulaire coordonnees client */}
        {showClientForm && (
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="flex w-full items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">Vos coordonnees</span>
                {isClientInfoComplete() && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </div>
              <span className="text-xs text-primary">{showForm ? "Masquer" : "Remplir"}</span>
            </button>
            
            {!showForm && !isClientInfoComplete() && (
              <p className="mt-2 text-xs text-muted-foreground">
                Renseignez vos coordonnees pour recevoir le diagnostic complet par email
              </p>
            )}
            
            {showForm && (
              <div className="mt-4 space-y-4">
                {/* Nom et Prenom */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="nom" className="text-sm font-medium text-foreground">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="nom"
                        type="text"
                        placeholder="Votre nom"
                        value={clientInfo.nom}
                        onChange={(e) => handleClientInfoChange("nom", e.target.value)}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 pl-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="prenom" className="text-sm font-medium text-foreground">Prenom</label>
                    <input
                      id="prenom"
                      type="text"
                      placeholder="Votre prenom"
                      value={clientInfo.prenom}
                      onChange={(e) => handleClientInfoChange("prenom", e.target.value)}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                
                {/* Telephone et Email */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="telephone" className="text-sm font-medium text-foreground">
                      Telephone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="telephone"
                        type="tel"
                        placeholder="06 12 34 56 78"
                        value={clientInfo.telephone}
                        onChange={(e) => handleClientInfoChange("telephone", e.target.value)}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 pl-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="email"
                        type="email"
                        placeholder="email@exemple.fr"
                        value={clientInfo.email}
                        onChange={(e) => handleClientInfoChange("email", e.target.value)}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 pl-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Adresse */}
                <div className="space-y-2">
                  <label htmlFor="adresse" className="text-sm font-medium text-foreground">
                    Adresse <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="adresse"
                      type="text"
                      placeholder="12 rue de la Toiture"
                      value={clientInfo.adresse}
                      onChange={(e) => handleClientInfoChange("adresse", e.target.value)}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 pl-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                
                {/* Code postal et Ville */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="codePostal" className="text-sm font-medium text-foreground">
                      Code postal <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="codePostal"
                        type="text"
                        placeholder="75001"
                        maxLength={5}
                        value={clientInfo.codePostal}
                        onChange={(e) => handleClientInfoChange("codePostal", e.target.value)}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 pl-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="ville" className="text-sm font-medium text-foreground">
                      Ville <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="ville"
                      type="text"
                      placeholder="Paris"
                      value={clientInfo.ville}
                      onChange={(e) => handleClientInfoChange("ville", e.target.value)}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                
                {isClientInfoComplete() && (
                  <div className="flex items-center gap-2 rounded-lg bg-green-500/10 p-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    Coordonnees completes - Vous recevrez le diagnostic par email
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
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

      // Draw damage zones with RED ARROWS and LABELS (like professional diagnosis)
      damageZones.forEach((zone, index) => {
        // Target point (center of damage zone)
        const targetX = zone.position.x / 100 * img.width
        const targetY = zone.position.y / 100 * img.height
        
        // Calculate label position (outside the zone, alternating positions)
        const isLeftSide = index % 2 === 0
        const labelOffsetX = isLeftSide ? -180 : 80
        const labelOffsetY = (index % 3 - 1) * 60
        
        const labelX = Math.max(20, Math.min(img.width - 250, targetX + labelOffsetX))
        const labelY = Math.max(50, Math.min(img.height - 80, targetY + labelOffsetY))
        
        // Arrow start point (from label)
        const arrowStartX = isLeftSide ? labelX + 230 : labelX
        const arrowStartY = labelY + 15
        
        // DRAW RED ARROW
        const color = "#dc2626" // Always red for visibility
        
        ctx.strokeStyle = color
        ctx.fillStyle = color
        ctx.lineWidth = 4
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        
        // Draw arrow line with shadow
        ctx.shadowColor = "rgba(0,0,0,0.5)"
        ctx.shadowBlur = 4
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2
        
        ctx.beginPath()
        ctx.moveTo(arrowStartX, arrowStartY)
        ctx.lineTo(targetX, targetY)
        ctx.stroke()
        
        // Draw arrowhead
        const angle = Math.atan2(targetY - arrowStartY, targetX - arrowStartX)
        const arrowHeadLength = 20
        ctx.beginPath()
        ctx.moveTo(targetX, targetY)
        ctx.lineTo(
          targetX - arrowHeadLength * Math.cos(angle - Math.PI / 6),
          targetY - arrowHeadLength * Math.sin(angle - Math.PI / 6)
        )
        ctx.lineTo(
          targetX - arrowHeadLength * Math.cos(angle + Math.PI / 6),
          targetY - arrowHeadLength * Math.sin(angle + Math.PI / 6)
        )
        ctx.closePath()
        ctx.fill()
        
        // Reset shadow for text
        ctx.shadowBlur = 0
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
        
        // DRAW LABEL with red background
        const labelText = zone.label.toUpperCase()
        ctx.font = "bold 16px Arial"
        const textMetrics = ctx.measureText(labelText)
        const textWidth = textMetrics.width
        const padding = 10
        const labelHeight = 32
        const labelWidth = textWidth + padding * 2
        
        // Label background (red)
        ctx.fillStyle = color
        ctx.beginPath()
        if (ctx.roundRect) {
          ctx.roundRect(labelX, labelY, labelWidth, labelHeight, 4)
        } else {
          ctx.rect(labelX, labelY, labelWidth, labelHeight)
        }
        ctx.fill()
        
        // White border
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 2
        ctx.stroke()
        
        // Label text (white, bold)
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 15px Arial"
        ctx.fillText(labelText, labelX + padding, labelY + 22)
        
        // Small circle at target point
        ctx.beginPath()
        ctx.arc(targetX, targetY, 8, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 3
        ctx.stroke()
      })

      resolve(canvas.toDataURL("image/jpeg", 0.9))
    }

    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = imageUrl
  })
}
