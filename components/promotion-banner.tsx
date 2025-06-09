"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const promotions = [
  {
    id: 1,
    text: "Buy More, Save More! Flat 5% OFF on Orders ₹10,000+ | Code: SAVE5",
  },
  {
    id: 2,
    text: "Free Shipping on Orders Above ₹1,000",
  },
  {
    id: 3,
    text: "New Customers: Get 10% OFF Your First Order | Code: WELCOME10",
  },
]

export default function PromotionBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextPromotion = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % promotions.length)
  }

  const prevPromotion = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + promotions.length) % promotions.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextPromotion()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-black text-white py-3 relative">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 text-white hover:bg-gray-800"
          onClick={prevPromotion}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous promotion</span>
        </Button>

        <div className="text-center text-sm md:text-base font-medium">{promotions[currentIndex].text}</div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 text-white hover:bg-gray-800"
          onClick={nextPromotion}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next promotion</span>
        </Button>
      </div>
    </div>
  )
}
