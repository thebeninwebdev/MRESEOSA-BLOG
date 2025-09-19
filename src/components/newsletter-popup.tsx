"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { NewsletterForm } from "./newsletter-form"

interface NewsletterPopupProps {
  intervalMinutes?: number
}

export function NewsletterPopup({ intervalMinutes = 2 }: NewsletterPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenShown, setHasBeenShown] = useState(false)

  useEffect(() => {
    // Check if user has already subscribed or dismissed recently
    const lastDismissed = localStorage.getItem("newsletter-popup-dismissed")
    const hasSubscribed = localStorage.getItem("newsletter-subscribed")

    if (hasSubscribed || (lastDismissed && Date.now() - Number.parseInt(lastDismissed) < 24 * 60 * 60 * 1000)) {
      return
    }

    const showPopup = () => {
      if (!hasBeenShown) {
        setIsVisible(true)
        setHasBeenShown(true)
      }
    }

    // Show popup after specified interval
    const timer = setTimeout(showPopup, intervalMinutes * 60 * 1000)

    // Also show on scroll (after user has scrolled 50% of page)
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent > 50 && !hasBeenShown) {
        showPopup()
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [intervalMinutes, hasBeenShown])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("newsletter-popup-dismissed", Date.now().toString())
  }

  const handleSubscribeSuccess = () => {
    localStorage.setItem("newsletter-subscribed", "true")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-lg shadow-lg max-w-md w-full relative animate-in fade-in-0 zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close popup"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-2">
              Don't Miss Out! 📧
            </h3>
            <p className="text-muted-foreground">
              Join our newsletter to get the latest insights from my web development journey delivered straight to your
              inbox.
            </p>
          </div>

          <div className="newsletter-popup-form">
            <NewsletterForm onSuccess={handleSubscribeSuccess} />
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            You can unsubscribe at any time. No spam, just valuable content.
          </p>
        </div>
      </div>
    </div>
  )
}
