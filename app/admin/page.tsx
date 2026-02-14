"use client"

import { useState } from "react"
import { Lock, Search, Download, Phone, Mail, MapPin, BarChart3, Users, ArrowLeft, Eye, KeyRound, ShieldCheck } from "lucide-react"
import Link from "next/link"

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

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [diagnostics, setDiagnostics] = useState<DiagnosticRecord[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDiag, setSelectedDiag] = useState<DiagnosticRecord | null>(null)
  const [recoveryMode, setRecoveryMode] = useState<"off" | "email" | "code" | "success">("off")
  const [recoveryEmail, setRecoveryEmail] = useState("")
  const [recoveryCode, setRecoveryCode] = useState("")
  const [recoveryLoading, setRecoveryLoading] = useState(false)
  const [recoveryError, setRecoveryError] = useState("")
  const [recoveredPassword, setRecoveredPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

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
        body: JSON.stringify({ email: recoveryEmail }),
      })
      const data = await res.json()
      if (!res.ok) {
        setRecoveryError(data.error || "Erreur lors de l'envoi.")
        return
      }
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
                onClick={() => { setRecoveryMode("email"); setError("") }}
                className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Mot de passe oublie ?
              </button>
            </div>
          )}

          {/* Recovery: Enter email */}
          {recoveryMode === "email" && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="mb-4 text-sm text-muted-foreground">
                Entrez l{"'"}adresse email associee au compte admin pour recuperer votre mot de passe.
              </p>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">
                Adresse email admin
              </label>
              <input
                type="email"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRecoverPassword()}
                placeholder="votre@email.fr"
                className="mb-4 h-11 w-full rounded-xl border border-border bg-secondary/50 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                autoFocus
              />
              {recoveryError && (
                <p className="mb-3 text-xs font-medium text-destructive">{recoveryError}</p>
              )}
              <button
                onClick={handleRecoverPassword}
                disabled={recoveryLoading || !recoveryEmail}
                className="h-11 w-full rounded-xl bg-primary text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
              >
                {recoveryLoading ? "Verification..." : "Recuperer mon mot de passe"}
              </button>
              <button
                onClick={() => { setRecoveryMode("off"); setRecoveryError("") }}
                className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Retour a la connexion
              </button>
            </div>
          )}

          {/* Step 2: Email sent confirmation */}
          {recoveryMode === "success" && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-5 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
                  <Mail size={24} className="text-green-400" />
                </div>
              </div>
              <p className="mb-2 text-center text-sm font-semibold text-foreground">
                Email envoye
              </p>
              <p className="mb-5 text-center text-sm text-muted-foreground">
                Si cette adresse correspond au compte admin, un email contenant votre mot de passe a ete envoye. Verifiez votre boite de reception et vos spams.
              </p>
              <button
                onClick={() => {
                  setRecoveryMode("off")
                  setRecoveryEmail("")
                }}
                className="h-11 w-full rounded-xl bg-primary text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90"
              >
                Retour a la connexion
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
              <span className="text-xs text-muted-foreground">{formatDate(selectedDiag.created_at)}</span>
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
                        <button
                          onClick={() => setSelectedDiag(d)}
                          className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                        >
                          <Eye size={12} />
                          Voir
                        </button>
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
