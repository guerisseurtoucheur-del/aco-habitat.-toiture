import jsPDF from "jspdf"
import type { DiagnosticResult } from "./diagnostic-types"

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

export async function generateDiagnosticPDF(
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
  addText("EXPERT COUVERTURE & CHARPENTE", margin, 19, 7, "normal", [160, 160, 170])
  addText("02 33 31 19 79", pageW - margin - 35, 12, 8, "bold", [255, 255, 255])
  addText("aco-habitat.fr", pageW - margin - 30, 19, 7, "normal", [160, 160, 170])
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

  // Sub-scores
  const subStartX = margin + 65
  const subGap = 35
  drawScoreCircle(subStartX, globalCy, 10, diagnostic.vegetal.score, "Vegetal")
  drawScoreCircle(subStartX + subGap, globalCy, 10, diagnostic.structure.score, "Structure")
  drawScoreCircle(subStartX + subGap * 2, globalCy, 10, diagnostic.etancheite.score, "Etancheite")
  if (diagnostic.thermique) {
    drawScoreCircle(subStartX + subGap * 3, globalCy, 10, diagnostic.thermique.scoreIsolation, "Thermique")
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
  sectionTitle("VEGETATION & MOUSSE", [132, 204, 22], "LEAF")
  sectionContent(diagnostic.vegetal.description, diagnostic.vegetal.zones, diagnostic.vegetal.score)

  // ── STRUCTURE ──
  sectionTitle("STRUCTURE & CHARPENTE", [239, 68, 68], "TOOL")
  sectionContent(diagnostic.structure.description, diagnostic.structure.zones, diagnostic.structure.score)

  // ── ETANCHEITE ──
  sectionTitle("ETANCHEITE & HUMIDITE", [34, 197, 94], "DROP")
  sectionContent(diagnostic.etancheite.description, diagnostic.etancheite.zones, diagnostic.etancheite.score)

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
    doc.text("ACO-HABITAT - Expert Couverture & Charpente | 02 33 31 19 79 | contact@aco-habitat.fr", margin, pageH - 7)
    doc.text(`Page ${p}/${totalPages}`, pageW - margin - 15, pageH - 7)
    doc.text("Ce rapport est un diagnostic automatise base sur l'imagerie. Il ne remplace pas l'expertise d'un professionnel sur site.", margin, pageH - 3)
  }

  // Save
  const fileName = `diagnostic-toiture-aco-habitat-${new Date().toISOString().slice(0, 10)}.pdf`
  doc.save(fileName)
}
