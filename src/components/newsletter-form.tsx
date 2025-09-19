"use client"

import type React from "react"
import { useState } from "react"

interface NewsletterFormProps {
  onSuccess?: () => void
}

export function NewsletterForm({ onSuccess }: NewsletterFormProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage("Successfully subscribed! Check your email for confirmation.")
        setEmail("")
        // Call onSuccess callback if provided (for popup)
        onSuccess?.()
      } else {
        setStatus("error")
        setMessage(data.error || "Failed to subscribe. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Network error. Please try again.")
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus("idle")
      setMessage("")
    }, 5000)
  }

  return (
    <div>
      <h4 className="font-semibold text-foreground mb-4">Stay Connected</h4>
      <p className="text-muted-foreground mb-4">Subscribe to our newsletter for the latest updates.</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === "loading"}
            className="flex-1 px-3 py-2 bg-background border border-border rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-2 sm:mt-0 px-4 py-2 bg-primary text-primary-foreground rounded-md sm:rounded-l-none sm:rounded-r-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </div>

        {message && <p className={`text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>{message}</p>}
      </form>
    </div>
  )
}
