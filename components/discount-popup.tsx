"use client"

import type React from "react"

import { useState } from "react"
import { X, Gift, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface DiscountPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function DiscountPopup({ isOpen, onClose }: DiscountPopupProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [discountCode, setDiscountCode] = useState<string | null>(null)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/discount-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      })

      const data = await response.json()

      if (data.success) {
        setDiscountCode(data.discountCode)
        // Store in localStorage for returning user experience
        localStorage.setItem("discountCode", data.discountCode)
        localStorage.setItem("userName", name)
      } else {
        setError(data.error || "Failed to generate discount code")
      }
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    localStorage.setItem("hasSeenDiscountPopup", "true")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md relative animate-in zoom-in-95 duration-300">
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-10" onClick={handleClose}>
          <X className="h-4 w-4" />
        </Button>

        <CardContent className="p-6">
          {!discountCode ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Gift className="h-8 w-8 text-white" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to EaseGiv! 🎉</h2>
                <p className="text-gray-600">
                  Get <span className="font-bold text-blue-600">15% OFF</span> on your first bulk order!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Generating..." : "Get My 15% Discount"}
                </Button>
              </form>

              <p className="text-xs text-gray-500 text-center">* Valid for bulk orders (minimum 25 pieces)</p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Congratulations! 🎊</h2>
                <p className="text-gray-600 mb-4">Your discount code is ready:</p>
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <code className="text-2xl font-bold text-blue-600">{discountCode}</code>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleClose}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Start Shopping
                </Button>
                <p className="text-xs text-gray-500">Code saved to your account. Use it at checkout!</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default DiscountPopup
