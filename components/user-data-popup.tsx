"use client"

import type React from "react"

import { useState } from "react"
import { Gift, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UserDataPopupProps {
  isOpen: boolean
  onSubmit: (data: { name: string; email: string }) => void
  isClosable?: boolean
}

export default function UserDataPopup({ isOpen, onSubmit, isClosable = true }: UserDataPopupProps) {
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onSubmit(formData)
    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto animate-in fade-in-0 zoom-in-95 duration-300">
        <CardHeader className="text-center relative">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Gift className="h-8 w-8 text-white" />
          </div>

          <CardTitle className="text-2xl font-bold">Welcome to EaseGiv!</CardTitle>
          <p className="text-gray-600 text-sm">Get 15% OFF your first order and connect with top suppliers</p>

          {!isClosable && (
            <div className="bg-orange-50 border border-orange-200 rounded-md p-3 mt-4">
              <p className="text-orange-800 text-xs font-medium">
                🎯 Complete this step to access our platform and start customizing
              </p>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="popup-name" className="flex items-center text-sm font-medium">
                <User className="h-4 w-4 mr-2" />
                Full Name *
              </Label>
              <Input
                id="popup-name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="popup-email" className="flex items-center text-sm font-medium">
                <Mail className="h-4 w-4 mr-2" />
                Email Address *
              </Label>
              <Input
                id="popup-email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 text-center">
              <h3 className="font-semibold text-sm mb-2">🎉 What you'll get:</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>✓ 15% OFF your first customization order</li>
                <li>✓ Access to verified suppliers</li>
                <li>✓ Priority customer support</li>
                <li>✓ Exclusive deals and offers</li>
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isSubmitting || !formData.name.trim() || !formData.email.trim()}
              size="lg"
            >
              {isSubmitting ? "Setting Up Your Account..." : "Start Customizing Now"}
            </Button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            By signing up, you agree to receive marketing emails. Unsubscribe anytime.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
