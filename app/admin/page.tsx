"use client"

import { useState } from "react"
import { Lock, Search, Download, Phone, Mail, MapPin, BarChart3, Users, ArrowLeft, Eye, KeyRound, ShieldCheck, FileText } from "lucide-react"
import Link from "next/link"
import jsPDF from "jspdf"

interface DiagnosticRecord {
  id: number
  client_name: string
  client_phone: string
  email: string
  address: string
  score_global: number
  score_structure: number
  score_vegetal: number
  score_etancheite: number
  score_thermique: number
  toiture_type: string
  stripe_session_id: string
  created_at: string
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 70 ? "text-green-400 bg-green-400/10 border-green-400/20"
    : score >= 50 ? "text-amber-400 bg-amber-400/10 border-amber-400/20"
    : "text-red-400 bg-red-400/10 border-red-400/20"
  return (
    <span className={`inline-flex items-center justify-center rounded-lg border px-2 py-0.5 text-xs font-bold ${color}`}>
      {score}/100
    </span>
  )
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
  })
}

function generateAdminPDF(d: DiagnosticRecord) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
  const pageW = 210
  const margin = 15
  const contentW = pageW - margin * 2
  let y = margin

  // Header
  doc.setFillColor(10, 10, 10)
  doc.rect(0, 0, pageW, 42, "F")
  doc.setFillColor(6, 182, 212)
  doc.rect(0, 40, pageW, 2, "F")
  doc.setFont("helvetica", "bold")
  doc.setFontSize(18)
  doc.setTextColor(255, 255, 255)
  doc.text("ACO-HABITAT", margin, 18)
  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(150, 150, 150)
  doc.text("Diagnostic Toiture - Rapport complet", margin, 26)
  doc.setFontSize(8)
  doc.text(`Diagnostic #${d.id} - ${formatDate(d.created_at)}`, margin, 34)
  y = 52

  // Client info box
  doc.setFillColor(240, 249, 255)
  doc.roundedRect(margin, y, contentW, 32, 3, 3, "F")
  doc.setDrawColor(6, 182, 212)
  doc.setLineWidth(0.3)
  doc.roundedRect(margin, y, contentW, 32, 3, 3, "S")
  doc.setFont("helvetica", "bold")
  doc.setFontSize(10)
  doc.setTextColor(6, 182, 212)
  doc.text("COORDONNEES CLIENT", margin + 5, y + 7)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.setTextColor(50, 50, 50)
  doc.text(`Nom : ${d.client_name || "Non renseigne"}`, margin + 5, y + 14)
  doc.text(`Telephone : ${d.client_phone || "Non renseigne"}`, margin + 5, y + 20)
  doc.text(`Email : ${d.email || "Non renseigne"}`, margin + 5, y + 26)
  doc.text(`Adresse : ${d.address || "Non renseigne"}`, margin + contentW / 2, y + 14)
  if (d.toiture_type) {
    doc.text(`Type toiture : ${d.toiture_type}`, margin + contentW / 2, y + 20)
  }
  y += 40

  // Score global
  const scoreColor = (s: number): [number, number, number] =>
    s >= 70 ? [34, 197, 94] : s >= 50 ? [245, 158, 11] : [239, 68, 68]
  const [r, g, b] = scoreColor(d.score_global)

  doc.setFillColor(20, 20, 20)
  doc.roundedRect(margin, y, contentW, 35, 3, 3, "F")
  doc.setFont("helvetica", "bold")
  doc.setFontSize(11)
  doc.setTextColor(150, 150, 150)
  doc.text("SCORE GLOBAL", margin + 5, y + 9)
  doc.setFontSize(32)
  doc.setTextColor(r, g, b)
  doc.text(`${d.score_global || 0}`, margin + 5, y + 28)
  doc.setFontSize(14)
  doc.setTextColor(100, 100, 100)
  doc.text("/100", margin + 5 + doc.getStringUnitWidth(`${d.score_global || 0}`) * 32 * 0.35 + 2, y + 28)

  // Etat general
  const etat = d.score_global >= 70 ? "Bon etat general" : d.score_global >= 50 ? "Etat moyen - Surveillance conseillee" : "Etat preoccupant - Intervention recommandee"
  doc.setFontSize(10)
  doc.setTextColor(r, g, b)
  doc.text(etat, margin + contentW / 2, y + 20)
  y += 43

  // Sub-scores
  const scores = [
    { label: "Structure", score: d.score_structure },
    { label: "Vegetation", score: d.score_vegetal },
    { label: "Etancheite", score: d.score_etancheite },
    { label: "Thermique", score: d.score_thermique },
  ]

  const boxW = (contentW - 9) / 4
  scores.forEach((s, i) => {
    const bx = margin + i * (boxW + 3)
    const [sr, sg, sb] = scoreColor(s.score || 0)
    doc.setFillColor(30, 30, 30)
    doc.roundedRect(bx, y, boxW, 25, 2, 2, "F")
    doc.setFont("helvetica", "normal")
    doc.setFontSize(7)
    doc.setTextColor(150, 150, 150)
    doc.text(s.label.toUpperCase(), bx + boxW / 2, y + 7, { align: "center" })
    doc.setFont("helvetica", "bold")
    doc.setFontSize(18)
    doc.setTextColor(sr, sg, sb)
    doc.text(`${s.score || 0}`, bx + boxW / 2, y + 20, { align: "center" })
  })
  y += 33

  // Recommendations
  doc.setFont("helvetica", "bold")
  doc.setFontSize(11)
  doc.setTextColor(255, 255, 255)
  doc.setFillColor(20, 20, 20)
  doc.roundedRect(margin, y, contentW, 10, 3, 3, "F")
  doc.text("RECOMMANDATIONS", margin + 5, y + 7)
  y += 14

  const recos: string[] = []
  if ((d.score_structure || 0) < 60) recos.push("Inspection structurelle recommandee - Verifier la charpente et les elements porteurs.")
  if ((d.score_vegetal || 0) < 60) recos.push("Nettoyage vegetation necessaire - Elimination des mousses, lichens et debris vegetaux.")
  if ((d.score_etancheite || 0) < 60) recos.push("Verification etancheite requise - Controle des joints, gouttiers et points de fuite.")
  if ((d.score_thermique || 0) < 60) recos.push("Amelioration isolation recommandee - Bilan energetique et renforcement de l'isolation.")
  if (recos.length === 0) recos.push("Toiture en bon etat general. Un entretien preventif annuel est recommande.")

  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.setTextColor(80, 80, 80)
  recos.forEach((rec) => {
    doc.setFillColor(6, 182, 212)
    doc.circle(margin + 3, y - 1, 1.2, "F")
    const lines = doc.splitTextToSize(rec, contentW - 12)
    doc.text(lines, margin + 8, y)
    y += lines.length * 5 + 3
  })
  y += 5

  // Paiement
  if (d.stripe_session_id) {
    doc.setFillColor(245, 245, 245)
    doc.roundedRect(margin, y, contentW, 10, 2, 2, "F")
    doc.setFontSize(7)
    doc.setTextColor(150, 150, 150)
    doc.text(`Ref. paiement : ${d.stripe_session_id}`, margin + 3, y + 6)
    y += 14
  }

  // Footer
  doc.setFillColor(10, 10, 10)
  doc.rect(0, 282, pageW, 15, "F")
  doc.setFontSize(7)
  doc.setTextColor(100, 100, 100)
  doc.text("ACO-HABITAT - Diagnostic Toiture | aco.habitat@orange.fr | 02 33 31 19 79", pageW / 2, 290, { align: "center" })

  const fileName = `diagnostic-${d.id}-${d.client_name || "client"}-${new Date(d.created_at).toISOString().slice(0, 10)}.pdf`
  doc.save(fileName.replace(/\s+/g, "-").toLowerCase())
}

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [diagnostics, setDiagnostics] = useState<DiagnosticRecord[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDiag, setSelectedDiag] = useState<DiagnosticRecord | null>(null)
  const [recoveryMode, setRecoveryMode] = useState<"off" | "question" | "success">("off")
  const [securityAnswer, setSecurityAnswer] = useState("")
  const [recoveryLoading, setRecoveryLoading] = useState(false)
  const [recoveryError, setRecoveryError] = useState("")
  const [recoveredPassword, setRecoveredPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showRecoveredPassword, setShowRecoveredPassword] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/diagnostics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Erreur")
        return
      }
      setDiagnostics(data.diagnostics)
      setTotalCount(data.totalCount)
      setAuthenticated(true)
    } catch {
      setError("Erreur de connexion")
    } finally {
      setLoading(false)
    }
  }

  async function handleRecoverPassword() {
    setRecoveryLoading(true)
    setRecoveryError("")
    try {
      const res = await fetch("/api/admin/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: securityAnswer }),
      })
      const data = await res.json()
      if (!res.ok) {
        setRecoveryError(data.error || "Reponse incorrecte.")
        return
      }
      setRecoveredPassword(data.password)
      setRecoveryMode("success")
    } catch {
      setRecoveryError("Erreur de connexion.")
    } finally {
      setRecoveryLoading(false)
    }
  }

  function exportCSV() {
    const headers = ["Date", "Nom", "Telephone", "Email", "Adresse", "Score Global", "Structure", "Vegetal", "Etancheite", "Thermique"]
    const rows = filteredDiags.map(d => [
      formatDate(d.created_at), d.client_name, d.client_phone, d.email, d.address,
      d.score_global, d.score_structure, d.score_vegetal, d.score_etancheite, d.score_thermique,
    ])
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n")
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `diagnostics-aco-habitat-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const filteredDiags = diagnostics.filter(d => {
    const term = searchTerm.toLowerCase()
    return d.client_name?.toLowerCase().includes(term)
      || d.email?.toLowerCase().includes(term)
      || d.client_phone?.includes(term)
      || d.address?.toLowerCase().includes(term)
  })

  // Login screen
  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card">
              {recoveryMode === "off" ? <Lock size={24} className="text-primary" /> : <KeyRound size={24} className="text-primary" />}
            </div>
            <h1 className="text-xl font-bold text-foreground">
              {recoveryMode === "off" ? "Administration" : "Recuperation"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">ACO-HABITAT - Tableau de bord</p>
          </div>

          {/* Normal login */}
          {recoveryMode === "off" && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <label className="mb-2 block text-xs font-medium text-muted-foreground">
                Mot de passe administrateur
              </label>
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Entrez le mot de passe"
                  className="h-11 w-full rounded-xl border border-border bg-secondary/50 px-4 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="m2 2 20 20"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/></svg>
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {error && (
                <p className="mb-3 text-xs font-medium text-destructive">{error}</p>
              )}
              <button
                onClick={handleLogin}
                disabled={loading || !password}
                className="h-11 w-full rounded-xl bg-primary text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
              <button
                onClick={() => { setRecoveryMode("question"); setError("") }}
                className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Mot de passe oublie ?
              </button>
            </div>
          )}

          {/* Recovery: Security question */}
          {recoveryMode === "question" && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="mb-4 text-sm text-muted-foreground">
                Repondez a la question secrete pour recuperer votre mot de passe.
              </p>
              <label className="mb-2 block text-xs font-medium text-foreground">
                Quel est le nom de votre premier animal de compagnie ?
              </label>
              <input
                type="text"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRecoverPassword()}
                placeholder="Votre reponse..."
                className="mb-4 h-11 w-full rounded-xl border border-border bg-secondary/50 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                autoFocus
              />
              {recoveryError && (
                <p className="mb-3 text-xs font-medium text-destructive">{recoveryError}</p>
              )}
              <button
                onClick={handleRecoverPassword}
                disabled={recoveryLoading || !securityAnswer}
                className="h-11 w-full rounded-xl bg-primary text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
              >
                {recoveryLoading ? "Verification..." : "Verifier ma reponse"}
              </button>
              <button
                onClick={() => { setRecoveryMode("off"); setRecoveryError(""); setSecurityAnswer("") }}
                className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Retour a la connexion
              </button>
            </div>
          )}

          {/* Recovery success: show password */}
          {recoveryMode === "success" && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-5 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
                  <ShieldCheck size={24} className="text-green-400" />
                </div>
              </div>
              <p className="mb-2 text-center text-sm font-semibold text-foreground">
                Identite verifiee
              </p>
              <p className="mb-4 text-center text-sm text-muted-foreground">
                Voici votre mot de passe administrateur :
              </p>
              <div className="relative mb-5 rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">
                <p className="font-mono text-lg font-bold text-primary select-all">
                  {showRecoveredPassword ? recoveredPassword : "*".repeat(recoveredPassword.length)}
                </p>
                <button
                  type="button"
                  onClick={() => setShowRecoveredPassword(!showRecoveredPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showRecoveredPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="m2 2 20 20"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/></svg>
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              <button
                onClick={() => {
                  setPassword(recoveredPassword)
                  setRecoveryMode("off")
                  setSecurityAnswer("")
                  setRecoveredPassword("")
                  setShowRecoveredPassword(false)
                }}
                className="h-11 w-full rounded-xl bg-primary text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90"
              >
                Se connecter maintenant
              </button>
            </div>
          )}

          <Link href="/" className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft size={14} />
            Retour au site
          </Link>
        </div>
      </div>
    )
  }

  // Detail modal
  if (selectedDiag) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="mx-auto max-w-2xl">
          <button
            onClick={() => setSelectedDiag(null)}
            className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Retour a la liste
          </button>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Diagnostic #{selectedDiag.id}</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => generateAdminPDF(selectedDiag)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary/20"
                >
                  <FileText size={14} />
                  Telecharger PDF
                </button>
                <span className="text-xs text-muted-foreground">{formatDate(selectedDiag.created_at)}</span>
              </div>
            </div>
            
            {/* Client info */}
            <div className="mb-6 rounded-xl border border-border bg-secondary/30 p-4">
              <h3 className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Coordonnees client</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">{selectedDiag.client_name || "Non renseigne"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-primary" />
                  <a href={`tel:${selectedDiag.client_phone}`} className="text-sm text-primary hover:underline">
                    {selectedDiag.client_phone || "Non renseigne"}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-primary" />
                  <a href={`mailto:${selectedDiag.email}`} className="text-sm text-primary hover:underline">
                    {selectedDiag.email || "Non renseigne"}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 text-primary" />
                  <span className="text-sm text-foreground">{selectedDiag.address || "Non renseigne"}</span>
                </div>
              </div>
            </div>

            {/* Scores */}
            <div className="mb-6">
              <h3 className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Scores du diagnostic</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                    { label: "Global", score: selectedDiag.score_global },
                    { label: "Structure", score: selectedDiag.score_structure },
                    { label: "Vegetal", score: selectedDiag.score_vegetal },
                    { label: "Etancheite", score: selectedDiag.score_etancheite },
                    { label: "Thermique", score: selectedDiag.score_thermique },
                ].map(({ label, score }) => (
                  <div key={label} className="rounded-xl border border-border bg-secondary/30 p-3 text-center">
                    <p className="text-[10px] font-medium text-muted-foreground">{label}</p>
                    <p className={`mt-1 text-xl font-bold ${
                      score >= 70 ? "text-green-400" : score >= 50 ? "text-amber-400" : "text-red-400"
                    }`}>
                      {score}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stripe */}
            {selectedDiag.stripe_session_id && (
              <div className="rounded-xl border border-border bg-secondary/30 p-4">
                <h3 className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Paiement</h3>
                <p className="break-all text-xs font-mono text-muted-foreground">
                  Session : {selectedDiag.stripe_session_id}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Dashboard
  const avgScore = diagnostics.length > 0
    ? Math.round(diagnostics.reduce((a, d) => a + (d.score_global || 0), 0) / diagnostics.length)
    : 0

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Tableau de bord</h1>
            <p className="text-sm text-muted-foreground">ACO-HABITAT - Suivi des diagnostics</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition-all hover:bg-secondary"
            >
              <Download size={14} />
              Exporter CSV
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
            >
              <ArrowLeft size={14} />
              Site
            </Link>
          </div>
        </div>

        {/* Stats cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Diagnostics total", value: totalCount.toString(), icon: BarChart3, color: "text-primary" },
            { label: "Clients uniques", value: diagnostics.length.toString(), icon: Users, color: "text-accent" },
            { label: "Score moyen", value: `${avgScore}/100`, icon: BarChart3, color: avgScore >= 70 ? "text-green-400" : avgScore >= 50 ? "text-amber-400" : "text-red-400" },
            { label: "Ce mois", value: diagnostics.filter(d => new Date(d.created_at).getMonth() === new Date().getMonth()).length.toString(), icon: BarChart3, color: "text-primary" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-4">
              <div className="mb-2 flex items-center gap-2">
                <Icon size={16} className={color} />
                <span className="text-[11px] text-muted-foreground">{label}</span>
              </div>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2">
          <Search size={16} className="text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par nom, email, telephone ou adresse..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {searchTerm && (
            <span className="text-xs text-muted-foreground">{filteredDiags.length} resultat(s)</span>
          )}
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Client</th>
                  <th className="hidden px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">Telephone</th>
                  <th className="hidden px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground lg:table-cell">Adresse</th>
                  <th className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Score</th>
                  <th className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDiags.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-sm text-muted-foreground">
                      {searchTerm ? "Aucun resultat pour cette recherche" : "Aucun diagnostic pour le moment"}
                    </td>
                  </tr>
                ) : (
                  filteredDiags.map((d) => (
                    <tr key={d.id} className="border-b border-border/50 transition-colors hover:bg-secondary/30">
                      <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(d.created_at)}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-foreground">{d.client_name || "Anonyme"}</p>
                        <p className="text-xs text-muted-foreground">{d.email || "-"}</p>
                      </td>
                      <td className="hidden px-4 py-3 md:table-cell">
                        {d.client_phone ? (
                          <a href={`tel:${d.client_phone}`} className="text-xs text-primary hover:underline">{d.client_phone}</a>
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="hidden max-w-[200px] truncate px-4 py-3 text-xs text-muted-foreground lg:table-cell">
                        {d.address || "-"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <ScoreBadge score={d.score_global} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setSelectedDiag(d)}
                            className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                          >
                            <Eye size={12} />
                            Voir
                          </button>
                          <button
                            onClick={() => generateAdminPDF(d)}
                            className="inline-flex items-center gap-1 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-[11px] font-medium text-primary transition-all hover:bg-primary/20"
                            title="Telecharger le PDF"
                          >
                            <FileText size={12} />
                            PDF
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
