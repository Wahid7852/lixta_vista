"use client"

import type React from "react"

import { useState } from "react"
import { Package, CreditCard, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

interface SampleRequestProps {
  productType: string
  onRequestSubmit?: (data: any) => void
}

const samplePricing = {
  "business-card": { price: 500, timeline: "3-4 days" },
  tshirt: { price: 800, timeline: "4-5 days" },
  mug: { price: 600, timeline: "3-4 days" },
  stationery: { price: 400, timeline: "2-3 days" },
  caps: { price: 700, timeline: "4-5 days" },
  bags: { price: 900, timeline: "5-6 days" },
  default: { price: 750, timeline: "4-5 days" },
}

export default function SampleRequest({ productType, onRequestSubmit }: SampleRequestProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    designRequirements: "",
    urgentDelivery: false,
    agreedToTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const pricing = samplePricing[productType as keyof typeof samplePricing] || samplePricing.default

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.agreedToTerms) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const sampleData = {
      ...formData,
      productType,
      pricing,
      requestId: `SAMPLE-${Date.now()}`,
      requestDate: new Date().toISOString(),
    }

    if (onRequestSubmit) {
      onRequestSubmit(sampleData)
    }

    setSubmitted(true)
    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = () => {
    return formData.name.trim() && formData.email.trim() && formData.phone.trim() && formData.agreedToTerms
  }

  if (submitted) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Sample Request Submitted!</h3>
          <p className="text-gray-600 mb-4">
            We'll process your sample request and contact you within 24 hours with payment details.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-800">
              <strong>Expected Timeline:</strong> {pricing.timeline} after payment confirmation
            </p>
          </div>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            Request Another Sample
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Package className="h-5 w-5 mr-2" />
          Request Paid Sample
        </CardTitle>
        <p className="text-sm text-gray-600">Get a physical sample before placing your bulk order</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Pricing Info */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800">Sample Details</h4>
            <Badge className="bg-blue-600">₹{pricing.price}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-blue-600" />
              <span>Price: ₹{pricing.price}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-green-600" />
              <span>Timeline: {pricing.timeline}</span>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-600">
            <p>• Sample cost will be adjusted in final order (if order ≥ MOQ)</p>
            <p>• Includes up to 2 design revisions</p>
            <p>• Shipping charges applicable</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sample-name">Full Name *</Label>
              <Input
                id="sample-name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sample-email">Email Address *</Label>
              <Input
                id="sample-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sample-phone">Phone Number *</Label>
              <Input
                id="sample-phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sample-company">Company Name</Label>
              <Input
                id="sample-company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="Enter company name (optional)"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="sample-address">Shipping Address *</Label>
            <Textarea
              id="sample-address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Enter complete shipping address with pincode"
              rows={3}
              required
            />
          </div>

          {/* Design Requirements */}
          <div className="space-y-2">
            <Label htmlFor="sample-design">Design Requirements</Label>
            <Textarea
              id="sample-design"
              value={formData.designRequirements}
              onChange={(e) => handleInputChange("designRequirements", e.target.value)}
              placeholder="Describe your design requirements, colors, text, logos, etc."
              rows={4}
            />
          </div>

          {/* Urgent Delivery */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="urgent-delivery"
              checked={formData.urgentDelivery}
              onCheckedChange={(checked) => handleInputChange("urgentDelivery", checked as boolean)}
            />
            <Label htmlFor="urgent-delivery" className="text-sm">
              Urgent delivery required (+₹200 express charges)
            </Label>
          </div>

          {/* Terms Agreement */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="sample-terms"
                checked={formData.agreedToTerms}
                onCheckedChange={(checked) => handleInputChange("agreedToTerms", checked as boolean)}
                required
              />
              <label htmlFor="sample-terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                I agree to the sample terms and understand that:
                <ul className="mt-2 space-y-1 text-xs">
                  <li>• Sample payment is required before production</li>
                  <li>• Sample cost will be adjusted in bulk order (if placed)</li>
                  <li>• Delivery timeline starts after payment confirmation</li>
                  <li>• Design changes after approval may incur additional charges</li>
                </ul>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={isSubmitting || !isFormValid()}
            size="lg"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing Request...
              </>
            ) : (
              <>
                <Package className="h-4 w-4 mr-2" />
                Request Sample (₹{pricing.price})
              </>
            )}
          </Button>
        </form>

        {/* Additional Info */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800 text-sm">Sample Policy</h4>
              <ul className="text-amber-700 text-xs mt-2 space-y-1">
                <li>• Payment required before sample production begins</li>
                <li>• Sample represents final product quality and specifications</li>
                <li>• Bulk order pricing may vary based on final specifications</li>
                <li>• Sample shipping charges are separate and will be communicated</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
