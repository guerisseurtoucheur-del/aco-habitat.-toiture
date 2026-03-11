// PDF generation module v2.2 - with Georisques, Weather History & Photo Annotations
import jsPDF from "jspdf"
import type { DiagnosticResult } from "./diagnostic-types"
import type { GeorisquesData } from "./georisques"
import { getInondationLabel, getArgilesLabel, getSeismeLabel, getRadonLabel, getRiskColor } from "./georisques"
import type { WeatherHistory, WeatherEvent } from "./weather-history"
import { getEventColor, formatEventForPDF } from "./weather-history"

// Types for analyzed photos
export interface AnnotatedPhoto {
  imageDataUrl: string // Base64 data URL of the annotated image
  damageZones: {
    id: string
    type: string
    label: string
    severity: "leger" | "modere" | "grave"
    description: string
  }[]
  overallCondition: string
  summary: string
}

function safeScore(obj: { score?: number } | undefined | null): number {
  if (!obj) return 0
  return typeof obj.score === "number" ? obj.score : 0
}

function scoreColor(score: number): [number, number, number] {
  if (score >= 75) return [34, 197, 94]   // green
  if (score >= 50) return [245, 158, 11]  // amber
  return [239, 68, 68]                    // red
}

function severityLabel(score: number): string {
  if (score >= 80) return "Excellent"
  if (score >= 60) return "Bon etat"
  if (score >= 40) return "A surveiller"
  if (score >= 20) return "Problemes detectes"
  return "Etat critique"
}

function urgencyLevel(score: number): { label: string; color: [number, number, number]; delay: string } {
  if (score >= 80) return { label: "Aucune urgence", color: [34, 197, 94], delay: "Entretien courant" }
  if (score >= 60) return { label: "Faible urgence", color: [132, 204, 22], delay: "Dans les 2 ans" }
  if (score >= 40) return { label: "Urgence moderee", color: [245, 158, 11], delay: "Dans l'annee" }
  if (score >= 20) return { label: "Urgence elevee", color: [249, 115, 22], delay: "Dans les 3 mois" }
  return { label: "Urgence critique", color: [239, 68, 68], delay: "Immediat" }
}

function estimatePriceRange(type: string, surface: number | null, score: number): { min: number; max: number; label: string } {
  const surf = surface || 100
  if (type.toLowerCase().includes("ardoise")) {
    if (score < 40) return { min: Math.round(surf * 120), max: Math.round(surf * 180), label: "Refection ardoise" }
    if (score < 60) return { min: Math.round(surf * 15), max: Math.round(surf * 30), label: "Reparation partielle" }
    return { min: 200, max: 500, label: "Entretien preventif" }
  }
  if (type.toLowerCase().includes("tuile")) {
    if (score < 40) return { min: Math.round(surf * 80), max: Math.round(surf * 140), label: "Refection tuiles" }
    if (score < 60) return { min: Math.round(surf * 10), max: Math.round(surf * 25), label: "Remplacement tuiles" }
    return { min: 150, max: 400, label: "Nettoyage + traitement" }
  }
  if (type.toLowerCase().includes("zinc") || type.toLowerCase().includes("metal")) {
    if (score < 40) return { min: Math.round(surf * 100), max: Math.round(surf * 160), label: "Refection zinc" }
    if (score < 60) return { min: Math.round(surf * 20), max: Math.round(surf * 40), label: "Reparation joints" }
    return { min: 200, max: 600, label: "Traitement anticorrosion" }
  }
  // Default
  if (score < 40) return { min: Math.round(surf * 90), max: Math.round(surf * 150), label: "Refection complete" }
  if (score < 60) return { min: Math.round(surf * 12), max: Math.round(surf * 30), label: "Reparations" }
  return { min: 150, max: 450, label: "Entretien" }
}

function getMaintenanceCalendar(type: string): { season: string; task: string }[] {
  const calendar = [
    { season: "Printemps (Mars-Avril)", task: "Inspection generale apres l'hiver, nettoyage gouttires" },
    { season: "Ete (Juin-Juillet)", task: "Traitement anti-mousse, verification ventilation" },
    { season: "Automne (Octobre-Nov)", task: "Nettoyage feuilles, verification etancheite avant pluies" },
    { season: "Hiver (Decembre)", task: "Surveillance neige/gel, verification fixations" }
  ]
  return calendar
}

function estimateLifespan(type: string, score: number): { years: number; comment: string } {
  let baseYears = 30
  if (type.toLowerCase().includes("ardoise")) baseYears = 80
  else if (type.toLowerCase().includes("tuile terre")) baseYears = 50
  else if (type.toLowerCase().includes("tuile beton")) baseYears = 30
  else if (type.toLowerCase().includes("zinc")) baseYears = 40
  else if (type.toLowerCase().includes("fibro")) baseYears = 25
  else if (type.toLowerCase().includes("shingle")) baseYears = 20
  
  const remaining = Math.round((score / 100) * baseYears * 0.5)
  
  if (score >= 80) return { years: remaining + 15, comment: "Excellente duree de vie restante" }
  if (score >= 60) return { years: remaining + 8, comment: "Bonne duree de vie avec entretien regulier" }
  if (score >= 40) return { years: remaining + 3, comment: "Travaux necessaires pour prolonger la duree de vie" }
  return { years: remaining, comment: "Refection a envisager rapidement" }
}

async function buildPDF(
  diagnostic: DiagnosticResult,
  capturedImage: string,
  address: string,
  measurements: { type: string; value: number }[],
  clientInfo?: { name?: string; phone?: string; email?: string },
  georisques?: GeorisquesData | null,
  weatherHistory?: WeatherHistory | null,
  annotatedPhotos?: AnnotatedPhoto[] | null
) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const margin = 15
  const contentW = pageW - margin * 2
  let y = margin

  // ── Helper functions ──
  const addText = (text: string, x: number, yPos: number, size: number, style: "normal" | "bold" = "normal", color: [number, number, number] = [30, 30, 30]) => {
    doc.setFontSize(size)
    doc.setFont("helvetica", style)
    doc.setTextColor(...color)
    doc.text(text, x, yPos)
  }

  const drawLine = (yPos: number, color: [number, number, number] = [230, 230, 230]) => {
    doc.setDrawColor(...color)
    doc.setLineWidth(0.3)
    doc.line(margin, yPos, pageW - margin, yPos)
  }

  const drawScoreCircle = (cx: number, cy: number, radius: number, score: number, label: string) => {
    const color = scoreColor(score)
    // Background circle
    doc.setDrawColor(220, 220, 220)
    doc.setLineWidth(1.5)
    doc.circle(cx, cy, radius)
    // Score arc
    doc.setDrawColor(...color)
    doc.setLineWidth(2.5)
    const startAngle = -90
    const endAngle = startAngle + (score / 100) * 360
    // Approximate arc with line segments
    for (let a = startAngle; a < endAngle - 2; a += 3) {
      const a1 = (a * Math.PI) / 180
      const a2 = ((a + 3) * Math.PI) / 180
      doc.line(
        cx + radius * Math.cos(a1), cy + radius * Math.sin(a1),
        cx + radius * Math.cos(a2), cy + radius * Math.sin(a2)
      )
    }
    // Score text
    addText(String(score), cx - (score >= 100 ? 5 : score >= 10 ? 3.5 : 2), cy + 2, 14, "bold", color)
    addText(label, cx - doc.getStringUnitWidth(label) * 3, cy + radius + 6, 7, "normal", [100, 100, 100])
  }

  const checkNewPage = (needed: number) => {
    if (y + needed > pageH - 20) {
      doc.addPage()
      y = margin
      return true
    }
    return false
  }

  // ═══════════════════════════════════════
  // PAGE 1: Header + Image + Scores
  // ══════�����════════════════════════════════

  // Header bar
  doc.setFillColor(24, 24, 27) // zinc-900
  doc.rect(0, 0, pageW, 28, "F")
  addText("ACO-HABITAT", margin, 12, 16, "bold", [255, 255, 255])
  addText("DIAGNOSTIC TOITURE PAR IA", margin, 19, 7, "normal", [160, 160, 170])
  addText("aco-habitat.fr", pageW - margin - 27, 12, 8, "bold", [255, 255, 255])
  addText("59,90 EUR par diagnostic", pageW - margin - 35, 19, 7, "normal", [160, 160, 170])
  y = 36

  // Title
  addText("RAPPORT DE DIAGNOSTIC TOITURE", margin, y, 18, "bold", [24, 24, 27])
  y += 8

  // Address + Date
  const dateStr = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
  addText(address || "Adresse non renseignee", margin, y, 9, "normal", [100, 100, 100])
  addText(`Diagnostic du ${dateStr}`, pageW - margin - 55, y, 9, "normal", [100, 100, 100])
  y += 4
  drawLine(y)
  y += 6

  // Client info block
  if (clientInfo && (clientInfo.name || clientInfo.phone || clientInfo.email)) {
    doc.setFillColor(240, 249, 255)
    doc.roundedRect(margin, y, contentW, 14, 2, 2, "F")
    let clientX = margin + 4
    if (clientInfo.name) {
      addText("Client :", clientX, y + 5, 7, "bold", [50, 50, 50])
      clientX += 14
      addText(clientInfo.name, clientX, y + 5, 7, "normal", [80, 80, 80])
      clientX += doc.getStringUnitWidth(clientInfo.name) * 7 * 0.35 + 8
    }
    if (clientInfo.phone) {
      addText("Tel :", clientX, y + 5, 7, "bold", [50, 50, 50])
      clientX += 9
      addText(clientInfo.phone, clientX, y + 5, 7, "normal", [80, 80, 80])
      clientX += doc.getStringUnitWidth(clientInfo.phone) * 7 * 0.35 + 8
    }
    if (clientInfo.email) {
      addText("Email :", clientX, y + 5, 7, "bold", [50, 50, 50])
      clientX += 13
      addText(clientInfo.email, clientX, y + 5, 7, "normal", [80, 80, 80])
    }
    y += 10
    addText("Coordonnees du demandeur", margin + 4, y, 5, "normal", [150, 150, 150])
    y += 6
  } else {
    y += 2
  }

  // Aerial image
  try {
    const imgW = contentW
    const imgH = 70
    doc.addImage(capturedImage, "JPEG", margin, y, imgW, imgH)
    // Border around image
    doc.setDrawColor(200, 200, 200)
    doc.setLineWidth(0.5)
    doc.rect(margin, y, imgW, imgH)
    y += imgH + 3
    addText("Vue aerienne - Capture satellite IGN / Photo de la toiture", margin, y, 6, "normal", [150, 150, 150])
    y += 8
  } catch {
    y += 5
  }

  // Material + surface info bar
  doc.setFillColor(245, 245, 250)
  doc.roundedRect(margin, y, contentW, 16, 2, 2, "F")
  addText(`Type : ${diagnostic.toitureType}`, margin + 4, y + 6, 8, "bold", [24, 24, 27])
  if (diagnostic.surfaceEstimeeM2) {
    addText(`Surface estimee : ${diagnostic.surfaceEstimeeM2} m2`, margin + 4, y + 12, 7, "normal", [100, 100, 100])
  }
  addText(`Precision : ${diagnostic.surfacePrecision || "moyenne"}`, pageW - margin - 40, y + 6, 7, "normal", [100, 100, 100])
  y += 22

  // User measurements if any
  if (measurements.length > 0) {
    addText("Mesures manuelles :", margin, y, 8, "bold")
    y += 5
    measurements.forEach((m) => {
      const txt = m.type === "area" ? `Surface : ${m.value.toFixed(1)} m2` : `Longueur : ${m.value.toFixed(1)} m`
      addText(`  - ${txt}`, margin, y, 7, "normal", [80, 80, 80])
      y += 4
    })
    y += 4
  }

  // ── SCORE GLOBAL ──
  drawLine(y)
  y += 8
  addText("SCORE GLOBAL", margin, y, 12, "bold")
  y += 4

  // Global score circle
  const globalCx = margin + 25
  const globalCy = y + 18
  drawScoreCircle(globalCx, globalCy, 14, diagnostic.scoreGlobal, severityLabel(diagnostic.scoreGlobal))

  // Sub-scores v2
  const subStartX = margin + 65
  const subGap = 35
  const _vScore = safeScore(diagnostic.vegetal)
  const _sScore = safeScore(diagnostic.structure)
  const _eScore = safeScore(diagnostic.etancheite)
  const _tScore = diagnostic.thermique && typeof diagnostic.thermique.scoreIsolation === "number" ? diagnostic.thermique.scoreIsolation : 0
  drawScoreCircle(subStartX, globalCy, 10, _vScore, "Vegetal")
  drawScoreCircle(subStartX + subGap, globalCy, 10, _sScore, "Structure")
  drawScoreCircle(subStartX + subGap * 2, globalCy, 10, _eScore, "Etancheite")
  if (diagnostic.thermique) {
    drawScoreCircle(subStartX + subGap * 3, globalCy, 10, _tScore, "Thermique")
  }
  y = globalCy + 26

  // Summary
  doc.setFontSize(8)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(60, 60, 60)
  const summaryLines = doc.splitTextToSize(diagnostic.summary, contentW)
  doc.text(summaryLines, margin, y)
  y += summaryLines.length * 4 + 6

  // Material description
  if (diagnostic.toitureDescription) {
    doc.setFillColor(240, 248, 255)
    const descLines = doc.splitTextToSize(diagnostic.toitureDescription, contentW - 8)
    const descH = descLines.length * 4 + 6
    doc.roundedRect(margin, y, contentW, descH, 2, 2, "F")
    doc.setFontSize(7)
    doc.setTextColor(60, 80, 100)
    doc.text(descLines, margin + 4, y + 5)
    y += descH + 6
  }

  // ═══════════════════════════════════════
  // PAGE 2: Detailed analysis
  // ═══════════════════════════════════════
  doc.addPage()
  y = margin

  // Section title helper
  const sectionTitle = (title: string, color: [number, number, number], icon: string) => {
    checkNewPage(30)
    doc.setFillColor(...color)
    doc.roundedRect(margin, y, 4, 10, 1, 1, "F")
    addText(`${icon}  ${title}`, margin + 8, y + 7, 11, "bold", color)
    y += 14
  }

  const sectionContent = (description: string, zones: { label: string; severity: string }[], score: number) => {
    // Description
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(60, 60, 60)
    const lines = doc.splitTextToSize(description, contentW - 25)
    doc.text(lines, margin + 8, y)
    // Score badge
    const sc = scoreColor(score)
    addText(`${score}/100`, pageW - margin - 15, y, 9, "bold", sc)
    y += lines.length * 4 + 3

    // Zones
    if (zones.length > 0) {
      zones.forEach((z) => {
        checkNewPage(6)
        const sevColor: [number, number, number] =
          z.severity === "severe" ? [239, 68, 68] :
          z.severity === "modere" ? [245, 158, 11] : [34, 197, 94]
        doc.setFillColor(...sevColor)
        doc.circle(margin + 10, y - 1, 1.2, "F")
        addText(z.label, margin + 14, y, 7, "normal", [60, 60, 60])
        addText(z.severity.toUpperCase(), pageW - margin - 20, y, 6, "bold", sevColor)
        y += 5
      })
    } else {
      addText("Aucune anomalie detectee.", margin + 8, y, 7, "normal", [34, 197, 94])
      y += 5
    }
    y += 6
  }

  // ── VEGETATION ──
  if (diagnostic.vegetal) {
    sectionTitle("VEGETATION & MOUSSE", [132, 204, 22], "LEAF")
    sectionContent(diagnostic.vegetal.description, diagnostic.vegetal.zones || [], diagnostic.vegetal.score ?? 0)
  }

  // ── STRUCTURE ──
  if (diagnostic.structure) {
    sectionTitle("STRUCTURE & CHARPENTE", [239, 68, 68], "TOOL")
    sectionContent(diagnostic.structure.description, diagnostic.structure.zones || [], diagnostic.structure.score ?? 0)
  }

  // ── ETANCHEITE ──
  if (diagnostic.etancheite) {
    sectionTitle("ETANCHEITE & HUMIDITE", [34, 197, 94], "DROP")
    sectionContent(diagnostic.etancheite.description, diagnostic.etancheite.zones || [], diagnostic.etancheite.score ?? 0)
  }

  // ── THERMIQUE ──
  if (diagnostic.thermique) {
    sectionTitle("PERFORMANCE THERMIQUE", [249, 115, 22], "FIRE")
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(60, 60, 60)
    const thermLines = doc.splitTextToSize(diagnostic.thermique.commentaire, contentW - 25)
    doc.text(thermLines, margin + 8, y)
    addText(`${diagnostic.thermique.scoreIsolation}/100`, pageW - margin - 15, y, 9, "bold", scoreColor(diagnostic.thermique.scoreIsolation))
    y += thermLines.length * 4 + 4

    if (diagnostic.thermique.economieEstimee) {
      doc.setFillColor(255, 247, 237)
      doc.roundedRect(margin, y, contentW, 12, 2, 2, "F")
      addText(
        `Economie estimee apres isolation : ${diagnostic.thermique.economieEstimee} euros/an`,
        margin + 4, y + 7, 8, "bold", [249, 115, 22]
      )
      y += 16
    }

    if (diagnostic.thermique.pertesChaleur?.length > 0) {
      diagnostic.thermique.pertesChaleur.forEach((z) => {
        checkNewPage(6)
        doc.setFillColor(249, 115, 22)
        doc.circle(margin + 10, y - 1, 1.2, "F")
        addText(`${z.label} (intensite: ${z.intensite}%)`, margin + 14, y, 7, "normal", [60, 60, 60])
        y += 5
      })
      y += 4
    }
  }

  // ─�� RECOMMANDATIONS ──
  checkNewPage(40)
  drawLine(y)
  y += 8
  addText("RECOMMANDATIONS", margin, y, 12, "bold", [24, 24, 27])
  y += 8

  diagnostic.recommandations.forEach((r, i) => {
    checkNewPage(10)
    doc.setFillColor(59, 130, 246) // blue
    doc.circle(margin + 4, y - 1, 3, "F")
    addText(String(i + 1), margin + 2.8, y + 0.5, 7, "bold", [255, 255, 255])
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(40, 40, 40)
    const recLines = doc.splitTextToSize(r, contentW - 15)
    doc.text(recLines, margin + 12, y)
    y += recLines.length * 4 + 4
  })

  // ── ESTIMATION BUDGET TRAVAUX ──
  checkNewPage(50)
  y += 4
  drawLine(y)
  y += 8
  addText("ESTIMATION BUDGET TRAVAUX", margin, y, 12, "bold", [24, 24, 27])
  y += 8
  
  const priceEstimate = estimatePriceRange(diagnostic.toitureType, diagnostic.surfaceEstimeeM2, diagnostic.scoreGlobal)
  const urgency = urgencyLevel(diagnostic.scoreGlobal)
  
  // Budget box
  doc.setFillColor(240, 253, 244) // green-50
  doc.roundedRect(margin, y, contentW / 2 - 4, 28, 2, 2, "F")
  doc.setDrawColor(34, 197, 94)
  doc.setLineWidth(0.3)
  doc.roundedRect(margin, y, contentW / 2 - 4, 28, 2, 2, "S")
  addText("BUDGET ESTIME", margin + 4, y + 6, 7, "bold", [34, 197, 94])
  addText(`${priceEstimate.min.toLocaleString('fr-FR')} - ${priceEstimate.max.toLocaleString('fr-FR')} EUR`, margin + 4, y + 14, 12, "bold", [24, 24, 27])
  addText(priceEstimate.label, margin + 4, y + 22, 7, "normal", [100, 100, 100])
  
  // Urgency box
  doc.setFillColor(255, 251, 235) // amber-50
  doc.roundedRect(margin + contentW / 2 + 4, y, contentW / 2 - 4, 28, 2, 2, "F")
  doc.setDrawColor(...urgency.color)
  doc.setLineWidth(0.3)
  doc.roundedRect(margin + contentW / 2 + 4, y, contentW / 2 - 4, 28, 2, 2, "S")
  addText("NIVEAU D'URGENCE", margin + contentW / 2 + 8, y + 6, 7, "bold", urgency.color)
  addText(urgency.label, margin + contentW / 2 + 8, y + 14, 11, "bold", urgency.color)
  addText(`Intervention : ${urgency.delay}`, margin + contentW / 2 + 8, y + 22, 7, "normal", [100, 100, 100])
  
  y += 34
  
  // Price disclaimer
  addText("* Estimations indicatives basees sur les tarifs moyens 2026. Demandez plusieurs devis.", margin, y, 6, "normal", [150, 150, 150])
  y += 8
  
  // ── DUREE DE VIE ESTIMEE ──
  checkNewPage(35)
  const lifespan = estimateLifespan(diagnostic.toitureType, diagnostic.scoreGlobal)
  
  doc.setFillColor(240, 249, 255) // blue-50
  doc.roundedRect(margin, y, contentW, 24, 2, 2, "F")
  addText("DUREE DE VIE ESTIMEE DE VOTRE TOITURE", margin + 4, y + 6, 8, "bold", [30, 64, 175])
  addText(`${lifespan.years} ans`, margin + 4, y + 15, 14, "bold", [24, 24, 27])
  addText(`(${diagnostic.toitureType})`, margin + 35, y + 15, 8, "normal", [100, 100, 100])
  addText(lifespan.comment, margin + 4, y + 21, 7, "normal", [100, 100, 100])
  
  // Progress bar for lifespan
  const lifespanBarW = contentW - 100
  const lifespanProgress = Math.min(100, (lifespan.years / 50) * 100)
  doc.setFillColor(230, 230, 235)
  doc.roundedRect(margin + 90, y + 10, lifespanBarW, 6, 2, 2, "F")
  doc.setFillColor(...scoreColor(diagnostic.scoreGlobal))
  if (lifespanProgress > 3) doc.roundedRect(margin + 90, y + 10, (lifespanProgress / 100) * lifespanBarW, 6, 2, 2, "F")
  
  y += 30
  
  // ── CALENDRIER D'ENTRETIEN ──
  checkNewPage(55)
  drawLine(y)
  y += 8
  addText("CALENDRIER D'ENTRETIEN ANNUEL", margin, y, 12, "bold", [24, 24, 27])
  y += 8
  
  const calendar = getMaintenanceCalendar(diagnostic.toitureType)
  const calWidth = (contentW - 6) / 4
  
  calendar.forEach((item, i) => {
    const xPos = margin + (i * (calWidth + 2))
    const seasonColors: [number, number, number][] = [
      [132, 204, 22],  // spring - green
      [245, 158, 11],  // summer - amber
      [249, 115, 22],  // autumn - orange
      [59, 130, 246]   // winter - blue
    ]
    
    doc.setFillColor(...seasonColors[i])
    doc.roundedRect(xPos, y, calWidth, 6, 1, 1, "F")
    addText(item.season.split(" ")[0], xPos + 2, y + 4, 6, "bold", [255, 255, 255])
    
    doc.setFillColor(250, 250, 252)
    doc.roundedRect(xPos, y + 6, calWidth, 18, 0, 0, "F")
    doc.setFontSize(6)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(60, 60, 60)
    const taskLines = doc.splitTextToSize(item.task, calWidth - 4)
    doc.text(taskLines, xPos + 2, y + 11)
  })
  
  y += 30

  // ── SECTION GEORISQUES ──
  if (georisques && !georisques.erreur) {
    checkNewPage(65)
    drawLine(y)
    y += 8
    addText("RISQUES NATURELS - DONNEES GEORISQUES", margin, y, 12, "bold", [24, 24, 27])
    y += 4
    addText("Source : georisques.gouv.fr - API officielle du gouvernement francais", margin, y, 6, "normal", [150, 150, 150])
    y += 8

    // Inondation
    const inondColor = getRiskColor(georisques.inondation.niveau)
    if (georisques.inondation.present) {
      doc.setFillColor(254, 243, 199) // amber-100
    } else {
      doc.setFillColor(240, 253, 244) // green-50
    }
    doc.roundedRect(margin, y, contentW / 2 - 2, 22, 2, 2, "F")
    doc.setDrawColor(...inondColor)
    doc.setLineWidth(0.4)
    doc.roundedRect(margin, y, contentW / 2 - 2, 22, 2, 2, "S")
    addText("ZONE INONDABLE", margin + 4, y + 6, 7, "bold", inondColor)
    addText(georisques.inondation.present ? "OUI" : "NON", margin + 4, y + 13, 11, "bold", inondColor)
    addText(getInondationLabel(georisques.inondation.niveau), margin + 4, y + 19, 6, "normal", [100, 100, 100])
    if (georisques.inondation.ppr) {
      addText("PPR approuve", margin + 45, y + 13, 6, "normal", [180, 100, 0])
    }

    // Argiles
    const argilesColor = getRiskColor(georisques.argiles.niveau)
    if (georisques.argiles.niveau === "fort") {
      doc.setFillColor(254, 226, 226) // red-100
    } else {
      doc.setFillColor(240, 253, 244) // green-50
    }
    doc.roundedRect(margin + contentW / 2 + 2, y, contentW / 2 - 2, 22, 2, 2, "F")
    doc.setDrawColor(...argilesColor)
    doc.roundedRect(margin + contentW / 2 + 2, y, contentW / 2 - 2, 22, 2, 2, "S")
    addText("RETRAIT-GONFLEMENT ARGILES", margin + contentW / 2 + 6, y + 6, 7, "bold", argilesColor)
    addText(georisques.argiles.present ? getArgilesLabel(georisques.argiles.niveau) : "Non concerne", margin + contentW / 2 + 6, y + 13, 10, "bold", argilesColor)
    addText("Risque pour les fondations", margin + contentW / 2 + 6, y + 19, 6, "normal", [100, 100, 100])
    y += 26

    // Seisme
    const seismeZone = georisques.seisme.zone
    const seismeColor: [number, number, number] = seismeZone && seismeZone >= 3 ? [245, 158, 11] : [34, 197, 94]
    doc.setFillColor(245, 245, 250)
    doc.roundedRect(margin, y, contentW / 2 - 2, 18, 2, 2, "F")
    addText("ZONE SISMIQUE", margin + 4, y + 5, 7, "bold", seismeColor)
    addText(getSeismeLabel(seismeZone), margin + 4, y + 12, 9, "bold", seismeColor)

    // Radon
    const radonNiveau = georisques.radon.niveau
    const radonColor: [number, number, number] = radonNiveau === 3 ? [239, 68, 68] : radonNiveau === 2 ? [245, 158, 11] : [34, 197, 94]
    doc.setFillColor(245, 245, 250)
    doc.roundedRect(margin + contentW / 2 + 2, y, contentW / 2 - 2, 18, 2, 2, "F")
    addText("POTENTIEL RADON", margin + contentW / 2 + 6, y + 5, 7, "bold", radonColor)
    addText(getRadonLabel(radonNiveau), margin + contentW / 2 + 6, y + 12, 9, "bold", radonColor)
    y += 22

    // Catastrophes naturelles
    if (georisques.catnat.count > 0) {
      doc.setFillColor(255, 251, 235)
      doc.roundedRect(margin, y, contentW, 18, 2, 2, "F")
      addText(`CATASTROPHES NATURELLES : ${georisques.catnat.count} arrete(s) CATNAT sur cette commune`, margin + 4, y + 6, 7, "bold", [180, 100, 0])
      if (georisques.catnat.recents.length > 0) {
        addText(`Recents : ${georisques.catnat.recents.slice(0, 3).join(", ")}`, margin + 4, y + 12, 6, "normal", [100, 100, 100])
      }
      y += 22
    }

    // Warning
    addText("Ces informations sont fournies a titre indicatif. Consultez georisques.gouv.fr pour le detail complet.", margin, y, 6, "normal", [150, 150, 150])
    y += 8
  }

  // ═══════════════════════════════════════
  // PAGE 3: Fiche couvreur + legal
  // ═══════════════════════════════════════
  doc.addPage()
  y = margin

  // Reference number
  const refId = `ACO-${Date.now().toString(36).toUpperCase()}`
  
  // "A transmettre" header
  doc.setFillColor(6, 182, 212) // cyan
  doc.roundedRect(margin, y, contentW, 22, 3, 3, "F")
  addText("FICHE SYNTHESE - A TRANSMETTRE A VOTRE COUVREUR", margin + 6, y + 9, 11, "bold", [255, 255, 255])
  addText(`Ref : ${refId}`, margin + 6, y + 17, 7, "normal", [220, 240, 255])
  y += 30

  // Client info box
  doc.setFillColor(245, 245, 250)
  doc.roundedRect(margin, y, contentW, 22, 2, 2, "F")
  addText("INFORMATIONS DU BIEN", margin + 4, y + 6, 8, "bold", [24, 24, 27])
  addText(`Adresse : ${address || "Non renseignee"}`, margin + 4, y + 12, 8, "normal", [60, 60, 60])
  addText(`Date du diagnostic : ${dateStr}`, margin + 4, y + 17, 8, "normal", [60, 60, 60])
  if (diagnostic.surfaceEstimeeM2) {
    addText(`Surface estimee : ${diagnostic.surfaceEstimeeM2} m2 (precision : ${diagnostic.surfacePrecision || "moyenne"})`, margin + contentW / 2, y + 12, 8, "normal", [60, 60, 60])
  }
  addText(`Type de couverture : ${diagnostic.toitureType}`, margin + contentW / 2, y + 17, 8, "normal", [60, 60, 60])
  y += 28

  // Quick score summary
  addText("SCORES DE DIAGNOSTIC", margin, y, 10, "bold", [24, 24, 27])
  y += 7

  const scoreItems = [
    { label: "Score global", score: diagnostic.scoreGlobal },
    ...(diagnostic.vegetal ? [{ label: "Vegetal (mousse, lichen)", score: diagnostic.vegetal.score ?? 0 }] : []),
    ...(diagnostic.structure ? [{ label: "Structure (tuiles, faitage)", score: diagnostic.structure.score ?? 0 }] : []),
    ...(diagnostic.etancheite ? [{ label: "Etancheite (infiltrations)", score: diagnostic.etancheite.score ?? 0 }] : []),
    ...(diagnostic.thermique ? [{ label: "Thermique (isolation)", score: diagnostic.thermique.scoreIsolation ?? 0 }] : []),
  ]

  scoreItems.forEach((item) => {
    const color = scoreColor(item.score)
    const barW = (item.score / 100) * (contentW - 80)
    
    addText(item.label, margin, y + 3, 8, "normal", [60, 60, 60])
    
    // Background bar
    doc.setFillColor(230, 230, 235)
    doc.roundedRect(margin + 70, y, contentW - 80, 5, 1, 1, "F")
    // Score bar
    doc.setFillColor(...color)
    if (barW > 2) doc.roundedRect(margin + 70, y, barW, 5, 1, 1, "F")
    // Score text
    addText(`${item.score}/100`, pageW - margin - 15, y + 3.5, 7, "bold", color)
    y += 9
  })
  y += 6

  // Anomalies summary table
  addText("ANOMALIES DETECTEES", margin, y, 10, "bold", [24, 24, 27])
  y += 7

  const allZones = [
    ...(diagnostic.vegetal?.zones || []).map(z => ({ ...z, cat: "Vegetal" })),
    ...(diagnostic.structure?.zones || []).map(z => ({ ...z, cat: "Structure" })),
    ...(diagnostic.etancheite?.zones || []).map(z => ({ ...z, cat: "Etancheite" })),
  ]

  if (allZones.length > 0) {
    // Table header
    doc.setFillColor(240, 240, 245)
    doc.rect(margin, y, contentW, 6, "F")
    addText("Categorie", margin + 2, y + 4, 7, "bold", [80, 80, 80])
    addText("Anomalie", margin + 35, y + 4, 7, "bold", [80, 80, 80])
    addText("Severite", pageW - margin - 22, y + 4, 7, "bold", [80, 80, 80])
    y += 8

    allZones.forEach((z) => {
      checkNewPage(7)
      const sevColor: [number, number, number] =
        z.severity === "severe" ? [239, 68, 68] :
        z.severity === "modere" ? [245, 158, 11] : [34, 197, 94]
      
      addText(z.cat, margin + 2, y + 3, 7, "normal", [100, 100, 100])
      
      doc.setFontSize(7)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(40, 40, 40)
      const labelLines = doc.splitTextToSize(z.label, 85)
      doc.text(labelLines, margin + 35, y + 3)
      
      doc.setFillColor(...sevColor)
      doc.roundedRect(pageW - margin - 25, y, 22, 5, 1, 1, "F")
      addText(z.severity.toUpperCase(), pageW - margin - 23, y + 3.5, 6, "bold", [255, 255, 255])
      
      y += Math.max(labelLines.length * 4, 7) + 1
    })
  } else {
    addText("Aucune anomalie majeure detectee.", margin, y, 8, "normal", [34, 197, 94])
    y += 6
  }
  y += 6

  // Recommendations summary
  checkNewPage(30)
  addText("TRAVAUX RECOMMANDES (par ordre de priorite)", margin, y, 10, "bold", [24, 24, 27])
  y += 7

  diagnostic.recommandations.forEach((r, i) => {
    checkNewPage(10)
    addText(`${i + 1}.`, margin + 2, y, 8, "bold", [59, 130, 246])
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(40, 40, 40)
    const recLines = doc.splitTextToSize(r, contentW - 12)
    doc.text(recLines, margin + 10, y)
    y += recLines.length * 4 + 3
  })

  // Measurements if any
  if (measurements.length > 0) {
    y += 4
    addText("MESURES MANUELLES EFFECTUEES", margin, y, 10, "bold", [24, 24, 27])
    y += 7
    measurements.forEach((m) => {
      const txt = m.type === "area" ? `Surface mesuree : ${m.value.toFixed(1)} m2` : `Longueur mesuree : ${m.value.toFixed(1)} m`
      addText(`- ${txt}`, margin + 4, y, 8, "normal", [60, 60, 60])
      y += 5
    })
  }

  // Cross-selling charpente
  if (diagnostic.structure && diagnostic.structure.score < 60) {
    checkNewPage(25)
    y += 4
    doc.setFillColor(255, 251, 235)
    doc.roundedRect(margin, y, contentW, 20, 2, 2, "F")
    doc.setDrawColor(245, 158, 11)
    doc.setLineWidth(0.4)
    doc.roundedRect(margin, y, contentW, 20, 2, 2, "S")
    addText("RECOMMANDATION : DIAGNOSTIC CHARPENTE", margin + 4, y + 6, 8, "bold", [180, 100, 0])
    const charpenteText = "Le score structure de votre toiture est bas. Cela peut indiquer un probleme au niveau de la charpente. Completez votre diagnostic avec une analyse charpente par IA sur aco-habitat.fr pour avoir une vision complete."
    doc.setFontSize(7)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(120, 80, 20)
    const charpenteLines = doc.splitTextToSize(charpenteText, contentW - 8)
    doc.text(charpenteLines, margin + 4, y + 12)
    y += 24
  }

  // ═══════════════════════════════════════
  // TRAITEMENT HYDROFUGE SECTION
  // ═══════════════════════════════════════
  if (diagnostic.traitementHydrofuge?.necessaire) {
    checkNewPage(70)
    y += 6
    drawLine(y)
    y += 6
    
    // Header with icon
    const urgenceColor: [number, number, number] = diagnostic.traitementHydrofuge.urgence === "haute" ? [220, 38, 38] :
                        diagnostic.traitementHydrofuge.urgence === "moyenne" ? [249, 115, 22] : [34, 197, 94]
    
    doc.setFillColor(urgenceColor[0], urgenceColor[1], urgenceColor[2])
    doc.roundedRect(margin, y, contentW, 8, 2, 2, "F")
    addText("TRAITEMENT HYDROFUGE RECOMMANDE", margin + 4, y + 5.5, 10, "bold", [255, 255, 255])
    
    const urgenceLabel = diagnostic.traitementHydrofuge.urgence === "haute" ? "URGENT" :
                        diagnostic.traitementHydrofuge.urgence === "moyenne" ? "CONSEILLE" : "PREVENTIF"
    addText(urgenceLabel, margin + contentW - 25, y + 5.5, 8, "bold", [255, 255, 255])
    y += 12
    
    // Info box
    doc.setFillColor(240, 249, 255) // light blue
    doc.roundedRect(margin, y, contentW, 55, 2, 2, "F")
    doc.setDrawColor(59, 130, 246)
    doc.setLineWidth(0.4)
    doc.roundedRect(margin, y, contentW, 55, 2, 2, "S")
    
    // Raisons
    addText("Pourquoi ce traitement est recommande :", margin + 4, y + 7, 8, "bold", [30, 64, 175])
    let reasonY = y + 12
    if (diagnostic.traitementHydrofuge.raisons) {
      diagnostic.traitementHydrofuge.raisons.slice(0, 3).forEach((raison) => {
        addText(`• ${raison}`, margin + 6, reasonY, 7, "normal", [60, 60, 60])
        reasonY += 5
      })
    }
    
    // Benefices
    addText("Benefices du traitement :", margin + contentW / 2 + 4, y + 7, 8, "bold", [34, 197, 94])
    let benefitY = y + 12
    if (diagnostic.traitementHydrofuge.benefices) {
      diagnostic.traitementHydrofuge.benefices.slice(0, 3).forEach((benefice) => {
        addText(`✓ ${benefice}`, margin + contentW / 2 + 6, benefitY, 7, "normal", [34, 120, 60])
        benefitY += 5
      })
    }
    
    // Cout estime
    if (diagnostic.traitementHydrofuge.coutEstime) {
      addText("Cout estime :", margin + 4, y + 40, 8, "bold", [50, 50, 50])
      addText(diagnostic.traitementHydrofuge.coutEstime, margin + 35, y + 40, 9, "bold", [30, 64, 175])
    }
    
    // Process description
    doc.setFontSize(6)
    doc.setFont("helvetica", "italic")
    doc.setTextColor(100, 100, 100)
    doc.text("Le traitement comprend : 1. Nettoyage haute pression  2. Application anti-mousse  3. Hydrofuge incolore", margin + 4, y + 50)
    
    y += 60
  }

  // ═══════════════════════════════════════
  // WEATHER HISTORY SECTION (if available)
  // ═══════════════════════════════════════
  if (weatherHistory && weatherHistory.events && weatherHistory.events.length > 0) {
    checkNewPage(60)
    y += 6
    drawLine(y)
    y += 6
    
    addText("HISTORIQUE METEO - 30 DERNIERS JOURS", margin, y, 11, "bold", [30, 64, 175])
    y += 8
    
    // Summary box
    doc.setFillColor(239, 246, 255) // blue-50
    const summaryLines = doc.splitTextToSize(weatherHistory.summary, contentW - 10)
    const summaryHeight = summaryLines.length * 4 + 8
    doc.roundedRect(margin, y, contentW, summaryHeight, 2, 2, "F")
    doc.setDrawColor(59, 130, 246)
    doc.setLineWidth(0.4)
    doc.roundedRect(margin, y, contentW, summaryHeight, 2, 2, "S")
    
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(30, 64, 175)
    doc.text(summaryLines, margin + 5, y + 6)
    y += summaryHeight + 4
    
    // Weather events table
    const significantEvents = weatherHistory.events.slice(0, 8) // Max 8 events
    if (significantEvents.length > 0) {
      addText("Evenements significatifs detectes :", margin, y, 8, "bold", [50, 50, 50])
      y += 6
      
      significantEvents.forEach((event: WeatherEvent) => {
        checkNewPage(10)
        const eventDate = new Date(event.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })
        const severityColor = event.severity === "extreme" ? [220, 38, 38] as [number, number, number] : 
                             event.severity === "fort" ? [249, 115, 22] as [number, number, number] : 
                             [234, 179, 8] as [number, number, number]
        
        // Severity indicator
        doc.setFillColor(...severityColor)
        doc.circle(margin + 3, y + 2, 2, "F")
        
        addText(eventDate, margin + 8, y + 3, 7, "bold", [80, 80, 80])
        addText(event.description, margin + 30, y + 3, 7, "normal", [60, 60, 60])
        
        const severityLabel = event.severity === "extreme" ? "EXTREME" : event.severity === "fort" ? "FORT" : "Modere"
        addText(`[${severityLabel}]`, margin + contentW - 25, y + 3, 6, "bold", severityColor)
        y += 6
      })
      y += 4
    }
  }

  // ═══════════════════════════════════════
  // ANNOTATED PHOTOS SECTION (if available)
  // ═══════════════════════════════════════
  if (annotatedPhotos && annotatedPhotos.length > 0) {
    // New page for photos
    doc.addPage()
    y = margin
    
    addText("CONSTATS VISUELS - PHOTOS ANALYSEES", margin, y, 12, "bold", [30, 64, 175])
    y += 10
    
    for (let i = 0; i < annotatedPhotos.length; i++) {
      const photo = annotatedPhotos[i]
      
      checkNewPage(100)
      
      addText(`Photo ${i + 1}`, margin, y, 10, "bold", [50, 50, 50])
      
      // Overall condition badge
      const conditionColor = photo.overallCondition === "bon" ? [34, 197, 94] as [number, number, number] :
                            photo.overallCondition === "moyen" ? [245, 158, 11] as [number, number, number] :
                            photo.overallCondition === "mauvais" ? [249, 115, 22] as [number, number, number] :
                            [239, 68, 68] as [number, number, number]
      
      doc.setFillColor(...conditionColor)
      doc.roundedRect(margin + 25, y - 3, 25, 6, 1, 1, "F")
      addText(photo.overallCondition.toUpperCase(), margin + 27, y, 6, "bold", [255, 255, 255])
      y += 6
      
      // Add the annotated image
      try {
        const imgWidth = contentW
        const imgHeight = 70 // Fixed height for consistency
        doc.addImage(photo.imageDataUrl, "JPEG", margin, y, imgWidth, imgHeight)
        y += imgHeight + 4
      } catch (imgError) {
        addText("(Image non disponible)", margin, y + 10, 8, "normal", [150, 150, 150])
        y += 25
      }
      
      // Photo summary
      doc.setFontSize(7)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(60, 60, 60)
      const photoSummaryLines = doc.splitTextToSize(photo.summary, contentW)
      doc.text(photoSummaryLines, margin, y)
      y += photoSummaryLines.length * 3.5 + 4
      
      // Damage zones list
      if (photo.damageZones && photo.damageZones.length > 0) {
        addText("Dommages detectes :", margin, y, 8, "bold", [50, 50, 50])
        y += 5
        
        photo.damageZones.forEach((zone, zoneIndex) => {
          const severityColor = zone.severity === "grave" ? [220, 38, 38] as [number, number, number] :
                               zone.severity === "modere" ? [249, 115, 22] as [number, number, number] :
                               [234, 179, 8] as [number, number, number]
          
          doc.setFillColor(...severityColor)
          doc.circle(margin + 3, y + 1.5, 1.5, "F")
          
          addText(`${zoneIndex + 1}. ${zone.label}`, margin + 7, y + 2, 7, "bold", [60, 60, 60])
          
          const severityLabel = zone.severity === "grave" ? "GRAVE" : zone.severity === "modere" ? "MODERE" : "LEGER"
          addText(`[${severityLabel}]`, margin + 60, y + 2, 6, "normal", severityColor)
          
          if (zone.description) {
            y += 4
            doc.setFontSize(6)
            doc.setFont("helvetica", "italic")
            doc.setTextColor(100, 100, 100)
            doc.text(zone.description, margin + 7, y + 2)
          }
          y += 5
        })
      }
      
      y += 8
    }
  }

  // ── NOS AUTRES DIAGNOSTICS IA ──
  checkNewPage(45)
  y += 6
  drawLine(y)
  y += 6
  
  doc.setFillColor(240, 249, 255) // light blue
  doc.roundedRect(margin, y, contentW, 36, 2, 2, "F")
  doc.setDrawColor(59, 130, 246)
  doc.setLineWidth(0.4)
  doc.roundedRect(margin, y, contentW, 36, 2, 2, "S")
  
  addText("NOS AUTRES DIAGNOSTICS IA", margin + 4, y + 6, 9, "bold", [30, 64, 175])
  
  // Diagnostic Humidite
  doc.setFillColor(6, 182, 212) // cyan
  doc.roundedRect(margin + 4, y + 10, 4, 4, 1, 1, "F")
  addText("Diagnostic Humidite IA", margin + 12, y + 13, 8, "bold", [8, 145, 178])
  addText("Analysez les problemes d'humidite de votre maison", margin + 12, y + 18, 7, "normal", [80, 80, 80])
  addText("humidite.aco-habitat.fr", margin + contentW / 2 + 10, y + 13, 7, "bold", [8, 145, 178])
  
  // Diagnostic Charpente / Bois
  doc.setFillColor(245, 158, 11) // amber
  doc.roundedRect(margin + 4, y + 23, 4, 4, 1, 1, "F")
  addText("Diagnostic Charpente & Bois IA", margin + 12, y + 26, 8, "bold", [180, 100, 0])
  addText("Merule, insectes xylophages, etat de la charpente", margin + 12, y + 31, 7, "normal", [80, 80, 80])
  addText("traitement-bois.fr", margin + contentW / 2 + 10, y + 26, 7, "bold", [180, 100, 0])
  
  y += 42

  // Legal disclaimer
  checkNewPage(35)
  y += 6
  drawLine(y)
  y += 6
  doc.setFillColor(255, 251, 235) // amber-50
  doc.roundedRect(margin, y, contentW, 40, 2, 2, "F")
  doc.setDrawColor(245, 158, 11)
  doc.setLineWidth(0.5)
  doc.roundedRect(margin, y, contentW, 40, 2, 2, "S")
  
  addText("AVERTISSEMENT LEGAL", margin + 4, y + 6, 8, "bold", [180, 100, 0])
  
  doc.setFontSize(6)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(120, 80, 20)
  const legalText = "Ce rapport est un diagnostic automatise base sur l'analyse d'images par intelligence artificielle. Il constitue une aide a la decision et ne remplace en aucun cas une inspection physique par un professionnel qualifie. Les scores et zones detectees sont indicatifs et dependent de la qualite de l'image fournie. Des defauts non visibles en surface (charpente, sous-couverture, isolation interne) ne peuvent pas etre detectes par ce procede. ACO-HABITAT decline toute responsabilite en cas de decisions prises sur la seule base de ce rapport. Avant tout engagement de travaux, faites realiser une inspection physique par un couvreur professionnel."
  const legalLines = doc.splitTextToSize(legalText, contentW - 8)
  doc.text(legalLines, margin + 4, y + 12)

  addText("ACO-HABITAT - Plateforme independante non affiliee a des prestataires de travaux.", margin + 4, y + 28, 6, "bold", [120, 80, 20])
  addText("Trouvez un couvreur pres de chez vous sur diag.aco-habitat.fr - CGU completes sur diag.aco-habitat.fr/mentions-legales", margin + 4, y + 34, 6, "normal", [120, 80, 20])

  // ═══════════════════════════════════════
  // FACTURE / INVOICE SECTION
  // ═══════════════════════════════════════
  doc.addPage()
  y = margin
  
  // Invoice header
  doc.setFillColor(30, 64, 175) // blue-800
  doc.rect(0, 0, pageW, 35, "F")
  
  addText("FACTURE", margin, 15, 18, "bold", [255, 255, 255])
  addText("ACO-HABITAT - Diagnostic Toiture par IA", margin, 25, 9, "normal", [200, 200, 255])
  
  const invoiceNumber = `FA-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
  const invoiceDate = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })
  
  addText(`N° ${invoiceNumber}`, pageW - margin - 50, 15, 8, "bold", [255, 255, 255])
  addText(`Date : ${invoiceDate}`, pageW - margin - 50, 22, 7, "normal", [200, 200, 255])
  
  y = 45
  
  // Company info
  doc.setFillColor(248, 250, 252)
  doc.roundedRect(margin, y, contentW / 2 - 5, 35, 2, 2, "F")
  
  addText("EMETTEUR", margin + 4, y + 6, 7, "bold", [100, 100, 100])
  addText("ACO-HABITAT", margin + 4, y + 13, 9, "bold", [30, 30, 30])
  addText("Expert toiture depuis 2006", margin + 4, y + 19, 7, "normal", [80, 80, 80])
  addText("02 33 31 19 79", margin + 4, y + 25, 7, "normal", [80, 80, 80])
  addText("aco.habitat@orange.fr", margin + 4, y + 31, 7, "normal", [80, 80, 80])
  
  // Client info
  doc.setFillColor(248, 250, 252)
  doc.roundedRect(margin + contentW / 2 + 5, y, contentW / 2 - 5, 35, 2, 2, "F")
  
  addText("CLIENT", margin + contentW / 2 + 9, y + 6, 7, "bold", [100, 100, 100])
  if (clientInfo?.name) {
    addText(clientInfo.name, margin + contentW / 2 + 9, y + 13, 9, "bold", [30, 30, 30])
  }
  if (clientInfo?.email) {
    addText(clientInfo.email, margin + contentW / 2 + 9, y + 19, 7, "normal", [80, 80, 80])
  }
  if (clientInfo?.phone) {
    addText(clientInfo.phone, margin + contentW / 2 + 9, y + 25, 7, "normal", [80, 80, 80])
  }
  addText(address || "Adresse non specifiee", margin + contentW / 2 + 9, y + 31, 6, "normal", [80, 80, 80])
  
  y += 45
  
  // Invoice table header
  doc.setFillColor(30, 64, 175)
  doc.rect(margin, y, contentW, 8, "F")
  
  addText("DESIGNATION", margin + 4, y + 5.5, 7, "bold", [255, 255, 255])
  addText("QTE", margin + contentW - 60, y + 5.5, 7, "bold", [255, 255, 255])
  addText("P.U. HT", margin + contentW - 45, y + 5.5, 7, "bold", [255, 255, 255])
  addText("TOTAL HT", margin + contentW - 22, y + 5.5, 7, "bold", [255, 255, 255])
  
  y += 8
  
  // Invoice line
  doc.setFillColor(255, 255, 255)
  doc.rect(margin, y, contentW, 12, "F")
  doc.setDrawColor(230, 230, 230)
  doc.setLineWidth(0.3)
  doc.rect(margin, y, contentW, 12, "S")
  
  addText("Diagnostic toiture par intelligence artificielle", margin + 4, y + 5, 8, "normal", [30, 30, 30])
  addText("- Analyse satellite/photo de la couverture", margin + 4, y + 10, 6, "normal", [100, 100, 100])
  addText("1", margin + contentW - 58, y + 7, 8, "normal", [30, 30, 30])
  addText("49,92 EUR", margin + contentW - 48, y + 7, 8, "normal", [30, 30, 30])
  addText("49,92 EUR", margin + contentW - 25, y + 7, 8, "normal", [30, 30, 30])
  
  y += 12
  
  // Second line - PDF report
  doc.setFillColor(248, 250, 252)
  doc.rect(margin, y, contentW, 10, "F")
  doc.setDrawColor(230, 230, 230)
  doc.rect(margin, y, contentW, 10, "S")
  
  addText("Rapport PDF detaille avec recommandations", margin + 4, y + 6, 8, "normal", [30, 30, 30])
  addText("1", margin + contentW - 58, y + 6, 8, "normal", [30, 30, 30])
  addText("Inclus", margin + contentW - 45, y + 6, 8, "normal", [100, 100, 100])
  addText("-", margin + contentW - 20, y + 6, 8, "normal", [100, 100, 100])
  
  y += 10
  
  // Third line - Georisques
  doc.setFillColor(255, 255, 255)
  doc.rect(margin, y, contentW, 10, "F")
  doc.setDrawColor(230, 230, 230)
  doc.rect(margin, y, contentW, 10, "S")
  
  addText("Donnees Georisques (risques naturels)", margin + 4, y + 6, 8, "normal", [30, 30, 30])
  addText("1", margin + contentW - 58, y + 6, 8, "normal", [30, 30, 30])
  addText("Inclus", margin + contentW - 45, y + 6, 8, "normal", [100, 100, 100])
  addText("-", margin + contentW - 20, y + 6, 8, "normal", [100, 100, 100])
  
  y += 15
  
  // Totals
  doc.setFillColor(248, 250, 252)
  doc.roundedRect(margin + contentW - 70, y, 70, 35, 2, 2, "F")
  
  addText("Total HT", margin + contentW - 66, y + 8, 8, "normal", [80, 80, 80])
  addText("49,92 EUR", margin + contentW - 25, y + 8, 8, "bold", [30, 30, 30])
  
  addText("TVA 20%", margin + contentW - 66, y + 16, 8, "normal", [80, 80, 80])
  addText("9,98 EUR", margin + contentW - 25, y + 16, 8, "normal", [30, 30, 30])
  
  doc.setFillColor(30, 64, 175)
  doc.roundedRect(margin + contentW - 70, y + 22, 70, 11, 0, 0, "F")
  addText("TOTAL TTC", margin + contentW - 66, y + 29, 8, "bold", [255, 255, 255])
  addText("59,90 EUR", margin + contentW - 25, y + 29, 9, "bold", [255, 255, 255])
  
  y += 45
  
  // Payment info
  doc.setFillColor(240, 253, 244) // green-50
  doc.roundedRect(margin, y, contentW, 20, 2, 2, "F")
  doc.setDrawColor(34, 197, 94)
  doc.setLineWidth(0.4)
  doc.roundedRect(margin, y, contentW, 20, 2, 2, "S")
  
  addText("PAIEMENT EFFECTUE", margin + 4, y + 7, 8, "bold", [22, 163, 74])
  addText("Paiement par carte bancaire via Stripe - Transaction securisee", margin + 4, y + 14, 7, "normal", [34, 120, 60])
  addText(`Date de paiement : ${invoiceDate}`, margin + contentW - 60, y + 14, 7, "normal", [34, 120, 60])
  
  y += 30
  
  // Legal mentions
  addText("Mentions legales", margin, y, 7, "bold", [100, 100, 100])
  y += 5
  doc.setFontSize(6)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(120, 120, 120)
  const invoiceLegal = "ACO-HABITAT - Diagnostic immobilier. TVA non applicable, art. 293 B du CGI (auto-entrepreneur) ou TVA 20% selon statut. En cas de litige, le tribunal competent sera celui du siege social. Delai de retractation : 14 jours a compter de la date d'achat conformement a l'article L221-18 du Code de la consommation. Contact : aco.habitat@orange.fr | 02 33 31 19 79"
  const invoiceLegalLines = doc.splitTextToSize(invoiceLegal, contentW)
  doc.text(invoiceLegalLines, margin, y)

  // ═══════════════════════════════════════
  // Footer on every page
  // ═══════════════════════════════════════
  const totalPages = doc.getNumberOfPages()
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p)
    // Footer bar
    doc.setFillColor(245, 245, 250)
    doc.rect(0, pageH - 14, pageW, 14, "F")
    doc.setFontSize(6)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(120, 120, 130)
    doc.text("ACO-HABITAT - Expert toiture depuis 2006 | 02 33 31 19 79 | aco.habitat@orange.fr | diag.aco-habitat.fr", margin, pageH - 7)
    doc.text(`Page ${p}/${totalPages}`, pageW - margin - 15, pageH - 7)
    doc.text("Ce rapport est un diagnostic automatise base sur l'imagerie. Il ne remplace pas l'expertise d'un professionnel sur site.", margin, pageH - 3)
  }

  return doc
}

/** Generate and download the PDF */
export async function generateDiagnosticPDF(
  diagnostic: DiagnosticResult,
  capturedImage: string,
  address: string,
  measurements: { type: string; value: number }[],
  clientInfo?: { name?: string; phone?: string; email?: string },
  georisques?: GeorisquesData | null,
  weatherHistory?: WeatherHistory | null,
  annotatedPhotos?: AnnotatedPhoto[] | null
) {
  const doc = await buildPDF(diagnostic, capturedImage, address, measurements, clientInfo, georisques, weatherHistory, annotatedPhotos)
  const fileName = `diagnostic-toiture-aco-habitat-${new Date().toISOString().slice(0, 10)}.pdf`
  doc.save(fileName)
}

/** Generate the PDF and return as base64 string (for email attachment) */
export async function generateDiagnosticPDFBase64(
  diagnostic: DiagnosticResult,
  capturedImage: string,
  address: string,
  measurements: { type: string; value: number }[],
  clientInfo?: { name?: string; phone?: string; email?: string },
  georisques?: GeorisquesData | null,
  weatherHistory?: WeatherHistory | null,
  annotatedPhotos?: AnnotatedPhoto[] | null
): Promise<string> {
  const doc = await buildPDF(diagnostic, capturedImage, address, measurements, clientInfo, georisques, weatherHistory, annotatedPhotos)
  const arrayBuffer = doc.output("arraybuffer")
  const uint8 = new Uint8Array(arrayBuffer)
  let binary = ""
  for (let i = 0; i < uint8.length; i++) {
    binary += String.fromCharCode(uint8[i])
  }
  return btoa(binary)
}
