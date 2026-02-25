'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { ScanLine } from 'lucide-react'

import { startCheckoutSession, checkPaymentStatus } from '../app/actions/stripe'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout({
  productId,
  onComplete,
}: {
  productId: string
  onComplete?: (sessionId: string) => void
}) {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [paymentDone, setPaymentDone] = useState(false)
  const [diagnosticLaunched, setDiagnosticLaunched] = useState(false)
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fetchClientSecret = useCallback(async () => {
    const { clientSecret, sessionId: sid } = await startCheckoutSession(productId)
    setSessionId(sid)
    return clientSecret as string
  }, [productId])

  // Poll payment status every 2 seconds once we have a session ID
  useEffect(() => {
    if (!sessionId || paymentDone) return

    pollingRef.current = setInterval(async () => {
      try {
        const { status, paymentStatus } = await checkPaymentStatus(sessionId)
        console.log("[v0] Polling payment status:", status, paymentStatus)
        if (status === "complete" && paymentStatus === "paid") {
          setPaymentDone(true)
          if (pollingRef.current) clearInterval(pollingRef.current)
        }
      } catch (e) {
        console.log("[v0] Polling error:", e)
      }
    }, 2000)

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current)
    }
  }, [sessionId, paymentDone])

  // Auto-launch diagnostic when payment is detected
  useEffect(() => {
    if (paymentDone && !diagnosticLaunched && onComplete) {
      console.log("[v0] Payment confirmed via polling, launching diagnostic")
      setDiagnosticLaunched(true)
      onComplete(sessionId || "completed")
    }
  }, [paymentDone, diagnosticLaunched, onComplete, sessionId])

  const handleManualLaunch = () => {
    if (onComplete && !diagnosticLaunched) {
      console.log("[v0] Manual launch triggered")
      setDiagnosticLaunched(true)
      onComplete(sessionId || "completed")
    }
  }

  // Show launch button if payment is done but diagnostic hasn't launched
  if (paymentDone && !diagnosticLaunched) {
    return (
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
          <ScanLine size={24} className="text-green-400" />
        </div>
        <p className="text-sm font-semibold text-foreground">Paiement confirme</p>
        <button
          onClick={handleManualLaunch}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
        >
          <ScanLine size={16} />
          Lancer le diagnostic
        </button>
      </div>
    )
  }

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          fetchClientSecret,
          onComplete: () => {
            console.log("[v0] Stripe onComplete callback fired")
            setPaymentDone(true)
          },
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>

      {/* Fallback button if Stripe shows completion but onComplete didn't fire */}
      {paymentDone && (
        <div className="mt-4 text-center">
          <button
            onClick={handleManualLaunch}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            <ScanLine size={16} />
            Lancer mon diagnostic
          </button>
        </div>
      )}
    </div>
  )
}
