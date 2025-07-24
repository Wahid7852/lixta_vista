"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Gift, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function DiscountPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [discountCode, setDiscountCode] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const { isSignedIn, user } = useUser()
  const { toast } = useToast()

  useEffect(() => {
    // Only show popup for non-signed-in users
    if (!isSignedIn) {
      const hasSeenPopup = localStorage.getItem("hasSeenDiscountPopup")
      const hasDiscountCode = localStorage.getItem("userDiscountCode")

      if (!hasSeenPopup && !hasDiscountCode) {
        const timer = setTimeout(() => {
          setIsOpen(true)
        }, 3000) // Show after 3 seconds

        return () => clearTimeout(timer)
      }
    }
  }, [isSignedIn])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/discount-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setDiscountCode(data.discountCode)
        setShowSuccess(true)

        // Store in localStorage to prevent showing again
        localStorage.setItem("hasSeenDiscountPopup", "true")
        localStorage.setItem("userDiscountCode", data.discountCode)
        localStorage.setItem(
          "userDiscountData",
          JSON.stringify({
            name: formData.name,
            email: formData.email,
            discountCode: data.discountCode,
            discountPercentage: 15,
          }),
        )

        toast({
          title: "Success!",
          description: `Your discount code ${data.discountCode} has been generated!`,
        })
      } else {
        throw new Error(data.error || "Failed to generate discount code")
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate discount code",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem("hasSeenDiscountPopup", "true")
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(discountCode)
    toast({
      title: "Copied!",
      description: "Discount code copied to clipboard",
    })
  }

  if (!isOpen || isSignedIn) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0">
        <CardHeader className="relative text-center pb-6">
          <div className="absolute top-4 right-4">
            <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8 rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Gift className="h-8 w-8 text-white" />
            </div>
          </div>

          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {showSuccess ? "Your Discount Code!" : "Get 15% OFF"}
          </CardTitle>

          <CardDescription className="text-base">
            {showSuccess
              ? "Save this code for your next bulk order"
              : "Enter your details to unlock exclusive bulk order discounts"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {showSuccess ? (
            <div className="text-center space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-dashed border-green-300">
                <div className="text-3xl font-bold text-green-600 mb-2">{discountCode}</div>
                <div className="text-sm text-gray-600 mb-4">15% OFF on orders above ₹5000</div>
                <Button onClick={copyToClipboard} className="w-full">
                  Copy Code
                </Button>
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <p>✅ Valid for 30 days</p>
                <p>✅ Minimum order quantity: 100 pieces</p>
                <p>✅ Applicable on all products</p>
              </div>

              <Button onClick={() => setIsOpen(false)} variant="outline" className="w-full">
                Start Shopping
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 h-12"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Code...
                  </>
                ) : (
                  "Get My 15% Discount Code"
                )}
              </Button>

              <div className="text-xs text-center text-gray-500">
                By submitting, you agree to receive promotional emails and SMS updates about bulk orders and special
                offers.
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
