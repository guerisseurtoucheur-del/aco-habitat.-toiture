"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { X, Send, User, FileText } from "lucide-react"

function ExpertAvatar({ className }: { className?: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden rounded-full ring-2 ring-primary/20 ${className ?? ""}`}>
      <Image
        src="/images/fondateur-aco-habitat.png"
        alt="Expert ACO-HABITAT"
        fill
        sizes="40px"
        className="object-cover"
      />
    </div>
  )
}

const SUGGESTED_QUESTIONS = [
  "J'ai des petits trous dans mes poutres, c'est grave ?",
  "Comment reconnaitre la merule ?",
  "Quelle difference entre capricorne et vrillette ?",
  "Comment se passe un traitement de charpente ?",
]

const chatTransport = new DefaultChatTransport({
  api: "/api/chat",
})

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: chatTransport,
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = (text: string) => {
    if (!text.trim() || isLoading) return
    sendMessage({ text: text.trim() })
    setInput("")
  }

  return (
    <>
      {/* Speech bubble with question - visible sur mobile ET desktop */}
      {!isOpen && (
        <div 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-16 right-3 z-50 max-w-[180px] cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-500 block sm:bottom-20 sm:right-5 sm:max-w-[200px]"
        >
          <div className="rounded-xl bg-card border border-border px-3 py-2 shadow-lg hover:shadow-xl transition-shadow">
            <p className="text-xs font-medium text-foreground">Un doute sur votre charpente ?</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Expert bois, je vous aide !</p>
          </div>
          {/* Triangle pointer */}
          <div className="absolute -bottom-2 right-6 h-0 w-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-card drop-shadow-sm" />
          <div className="absolute -bottom-[9px] right-6 h-0 w-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-border -z-10" />
        </div>
      )}

      {/* Floating button - plus petit sur mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed z-50 flex items-center justify-center overflow-hidden rounded-full shadow-lg ring-2 ring-primary transition-all duration-300 ${
          isOpen
            ? "scale-0 opacity-0"
            : "scale-100 opacity-100 hover:shadow-xl hover:shadow-primary/25"
        } bottom-3 right-3 h-12 w-12 sm:bottom-5 sm:right-5 sm:h-14 sm:w-14`}
        aria-label="Ouvrir le chat"
      >
        <Image
          src="/images/fondateur-aco-habitat.png"
          alt="Discuter avec l'expert ACO-HABITAT"
          fill
          sizes="56px"
          className="object-cover"
        />
        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-card bg-emerald-500 sm:h-4 sm:w-4" />
      </button>



      {/* Chat window */}
      <div
        className={`fixed z-50 flex flex-col overflow-hidden border border-border bg-card shadow-2xl shadow-black/40 transition-all duration-300 ${
          isOpen
            ? "scale-100 opacity-100"
            : "pointer-events-none h-0 scale-95 opacity-0"
        } bottom-0 right-0 h-[100dvh] w-full rounded-none sm:bottom-5 sm:right-5 sm:h-[520px] sm:w-[370px] sm:rounded-2xl`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-3">
          <div className="flex items-center gap-3">
            <ExpertAvatar className="h-9 w-9" />
            <div>
              <p className="text-sm font-semibold text-foreground">Votre expert ACO-HABITAT</p>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-[11px] text-muted-foreground">En ligne</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Fermer le chat"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {/* Welcome message */}
          {messages.length === 0 && (
            <div className="space-y-4">
              <div className="flex gap-2.5">
                <ExpertAvatar className="h-7 w-7" />
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-secondary px-3.5 py-2.5">
                  <p className="text-[13px] leading-relaxed text-foreground">
                    Bonjour ! Je suis l{"'"}expert traitement du bois d{"'"}ACO-HABITAT, specialiste depuis 2006. Insectes xylophages, merule, champignons, charpente... decrivez-moi ce que vous observez, je vous aide a y voir clair et a obtenir un diagnostic gratuit.
                  </p>
                </div>
              </div>

              {/* Suggested questions */}
              <div className="space-y-2 pl-9">
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Questions frequentes
                </p>
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="block w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-left text-[12px] text-foreground transition-all hover:border-primary/30 hover:bg-primary/5"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-3 flex gap-2.5 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {message.role === "user" ? (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15">
                  <User size={14} className="text-accent" />
                </div>
              ) : (
                <ExpertAvatar className="h-7 w-7" />
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${
                  message.role === "user"
                    ? "rounded-tr-sm bg-primary text-primary-foreground"
                    : "rounded-tl-sm bg-secondary text-foreground"
                }`}
              >
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    const hasDevisTag = part.text.includes("[DEVIS]")
                    const cleanText = part.text.replace("[DEVIS]", "").trim()
                    return (
                      <div key={index}>
                        <p className="whitespace-pre-wrap text-[13px] leading-relaxed">
                          {cleanText}
                        </p>
                        {hasDevisTag && (
                          <button
                            onClick={() => {
                              setIsOpen(false)
                              const el = document.getElementById("devis")
                              if (el) {
                                el.scrollIntoView({ behavior: "smooth" })
                              }
                            }}
                            className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[12px] font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md"
                          >
                            <FileText size={14} />
                            Mon diagnostic gratuit
                          </button>
                        )}
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === "user" && (
            <div className="mb-3 flex gap-2.5">
              <ExpertAvatar className="h-7 w-7" />
              <div className="rounded-2xl rounded-tl-sm bg-secondary px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border bg-secondary/30 px-3 py-3">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend(input)
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              disabled={isLoading}
              className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-30"
              aria-label="Envoyer"
            >
              <Send size={16} />
            </button>
          </form>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">
            ACO-HABITAT - Expert traitement du bois depuis 2006
          </p>
        </div>
      </div>
    </>
  )
}
