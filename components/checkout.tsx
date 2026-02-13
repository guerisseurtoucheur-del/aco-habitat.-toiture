'use client'

import { useCallback } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { startCheckoutSession } from '../app/actions/stripe'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout({
  productId,
  onComplete,
}: {
  productId: string
  onComplete?: (sessionId: string) => void
}) {
  const fetchClientSecret = useCallback(async () => {
    try {
      console.log("[v0] Starting checkout for product:", productId)
      const { clientSecret, sessionId } = await startCheckoutSession(productId)
      console.log("[v0] Got clientSecret:", !!clientSecret, "sessionId:", sessionId)
      // Store sessionId so we can verify payment later
      if (typeof window !== 'undefined') {
        window.__stripeSessionId = sessionId
      }
      return clientSecret as string
    } catch (error) {
      console.error("[v0] Checkout error:", error)
      throw error
    }
  }, [productId])

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          fetchClientSecret,
          onComplete: () => {
            const sessionId = typeof window !== 'undefined' ? window.__stripeSessionId : null
            if (onComplete) {
              onComplete(sessionId || "completed")
            }
          },
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

// Extend Window type for session tracking
declare global {
  interface Window {
    __stripeSessionId?: string | null
  }
}
