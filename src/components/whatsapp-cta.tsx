"use client"

import { useState } from "react"
import { MessageCircle, Minimize2 } from "lucide-react"

export default function WhatsAppCTA() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  const whatsappUrl = "https://wa.me/2349155276978"

  const handleClick = () => {
    window.open(whatsappUrl, "_blank")
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded ? (
        // Expanded state
        <div className="bg-green-500 text-white rounded-2xl shadow-2xl p-4 max-w-xs animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              <span className="font-semibold text-sm">Chat with me</span>
            </div>
            <button
              onClick={toggleExpanded}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Minimize"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm mb-4 text-white/90">Have a question or want to collaborate? Let's chat on WhatsApp!</p>
          <button
            onClick={handleClick}
            className="w-full bg-white text-green-500 font-semibold py-2 px-4 rounded-lg hover:bg-green-50 transition-colors text-sm"
          >
            Start Conversation
          </button>
        </div>
      ) : (
        // Minimized state
        <button
          onClick={handleClick}
          onContextMenu={(e) => {
            e.preventDefault()
            setIsExpanded(true)
          }}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 group"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            1
          </div>
        </button>
      )}
    </div>
  )
}
