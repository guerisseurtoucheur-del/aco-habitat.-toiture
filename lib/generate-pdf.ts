// PDF generation module v2 - safe property access
import jsPDF from "jspdf"
import type { DiagnosticResult } from "./diagnostic-types"

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

async function buildPDF(
  diagnostic: DiagnosticResult,
  capturedImage: string,
  address: string,
  measurements: { type: string; value: number }[]
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
  // ═══════════════════════════════════════

  // Header bar
  doc.setFillColor(24, 24, 27) // zinc-900
  doc.rect(0, 0, pageW, 28, "F")
  addText("ACO-HABITAT", margin, 12, 16, "bold", [255, 255, 255])
  addText("DIAGNOSTIC TOITURE PAR IA", margin, 19, 7, "normal", [160, 160, 170])
  addText("aco-habitat.fr", pageW - margin - 27, 12, 8, "bold", [255, 255, 255])
  addText("19,90 EUR par diagnostic", pageW - margin - 35, 19, 7, "normal", [160, 160, 170])
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
  y += 8

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

  // ── RECOMMANDATIONS ──
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
  addText("Trouvez un couvreur pres de chez vous sur aco-habitat.fr - CGU completes sur aco-habitat.fr/mentions-legales", margin + 4, y + 34, 6, "normal", [120, 80, 20])

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
    doc.text("ACO-HABITAT - Diagnostic Toiture par IA | aco-habitat.fr | aco.habitat@orange.fr", margin, pageH - 7)
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
  measurements: { type: string; value: number }[]
) {
  const doc = await buildPDF(diagnostic, capturedImage, address, measurements)
  const fileName = `diagnostic-toiture-aco-habitat-${new Date().toISOString().slice(0, 10)}.pdf`
  doc.save(fileName)
}

/** Generate the PDF and return as base64 string (for email attachment) */
export async function generateDiagnosticPDFBase64(
  diagnostic: DiagnosticResult,
  capturedImage: string,
  address: string,
  measurements: { type: string; value: number }[]
): Promise<string> {
  const doc = await buildPDF(diagnostic, capturedImage, address, measurements)
  const arrayBuffer = doc.output("arraybuffer")
  const uint8 = new Uint8Array(arrayBuffer)
  let binary = ""
  for (let i = 0; i < uint8.length; i++) {
    binary += String.fromCharCode(uint8[i])
  }
  return btoa(binary)
}
