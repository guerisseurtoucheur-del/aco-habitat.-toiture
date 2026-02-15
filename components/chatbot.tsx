"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { MessageSquare, X, Send, Bot, User, ChevronDown, ScanLine } from "lucide-react"

const SUGGESTED_QUESTIONS = [
  "Comment fonctionne le diagnostic IA ?",
  "Ma toiture a 30 ans, dois-je la renover ?",
  "Quels sont les signes d'une fuite ?",
  "Combien coute le diagnostic ?",
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [sessionId] = useState(() => crypto.randomUUID())
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest: ({ id, messages }) => ({
        body: { messages, sessionId, id },
      }),
    }),
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
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "scale-0 opacity-0"
            : "scale-100 bg-primary opacity-100 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25"
        }`}
        aria-label="Ouvrir le chat"
      >
        <MessageSquare size={24} className="text-primary-foreground" />
      </button>

      {/* Notification dot */}
      {!isOpen && messages.length === 0 && (
        <span className="fixed bottom-16 right-5 z-50 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground shadow-md">
          1
        </span>
      )}

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
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15">
              <Bot size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Assistant Toiture</p>
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
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <Bot size={14} className="text-primary" />
                </div>
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-secondary px-3.5 py-2.5">
                  <p className="text-[13px] leading-relaxed text-foreground">
                    Bonjour ! Je suis l{"'"}assistant expert toiture d{"'"}ACO-HABITAT. Posez-moi vos questions sur votre toiture, je suis la pour vous aider.
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
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  message.role === "user"
                    ? "bg-accent/15"
                    : "bg-primary/15"
                }`}
              >
                {message.role === "user" ? (
                  <User size={14} className="text-accent" />
                ) : (
                  <Bot size={14} className="text-primary" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${
                  message.role === "user"
                    ? "rounded-tr-sm bg-primary text-primary-foreground"
                    : "rounded-tl-sm bg-secondary text-foreground"
                }`}
              >
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    const hasDiagnosticTag = part.text.includes("[DIAGNOSTIC]")
                    const cleanText = part.text.replace("[DIAGNOSTIC]", "").trim()
                    return (
                      <div key={index}>
                        <p className="whitespace-pre-wrap text-[13px] leading-relaxed">
                          {cleanText}
                        </p>
                        {hasDiagnosticTag && (
                          <button
                            onClick={() => {
                              setIsOpen(false)
                              const el = document.getElementById("diagnostic")
                              if (el) {
                                el.scrollIntoView({ behavior: "smooth" })
                              }
                            }}
                            className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[12px] font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md"
                          >
                            <ScanLine size={14} />
                            Lancer mon diagnostic toiture
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
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15">
                <Bot size={14} className="text-primary" />
              </div>
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
            ACO-HABITAT - Assistant IA Toiture
          </p>
        </div>
      </div>
    </>
  )
}
