"use client"

import type React from "react"

import { useState } from "react"
import { Package, CreditCard, Truck, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface SampleRequestProps {
  productType: string
  onRequestSubmit: (data: any) => void
  darkMode?: boolean
}

const samplePricing = {
  tshirt: { price: 1500, timeline: "3-5 days", description: "Custom printed t-shirt with your design" },
  mug: { price: 800, timeline: "2-3 days", description: "Ceramic mug with custom printing" },
  "business-card": { price: 500, timeline: "2-4 days", description: "Premium business cards (50 pieces)" },
  cap: { price: 1200, timeline: "3-4 days", description: "Custom embroidered cap" },
  bag: { price: 2000, timeline: "4-6 days", description: "Custom printed/embroidered bag" },
}

const shippingOptions = [
  { id: "standard", name: "Standard Shipping", price: 99, timeline: "3-5 days" },
  { id: "express", name: "Express Shipping", price: 299, timeline: "1-2 days" },
  { id: "overnight", name: "Overnight Delivery", price: 599, timeline: "Next day" },
]

export default function SampleRequest({ productType, onRequestSubmit, darkMode = false }: SampleRequestProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    pincode: "",
    designNotes: "",
    shippingOption: "standard",
    agreedToTerms: false,
  })

  const [selectedSample, setSelectedSample] = useState(productType)
  const sampleInfo = samplePricing[selectedSample as keyof typeof samplePricing] || samplePricing.tshirt
  const selectedShipping = shippingOptions.find((option) => option.id === formData.shippingOption) || shippingOptions[0]
  const totalCost = sampleInfo.price + selectedShipping.price

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.agreedToTerms) {
      alert("Please agree to the terms and conditions")
      return
    }

    const requestData = {
      ...formData,
      productType: selectedSample,
      sampleCost: sampleInfo.price,
      shippingCost: selectedShipping.price,
      totalCost,
      timeline: sampleInfo.timeline,
    }

    onRequestSubmit(requestData)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.address.trim() &&
      formData.city.trim() &&
      formData.pincode.trim() &&
      formData.agreedToTerms
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Sample Request Form */}
      <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-xl`}>
        <CardHeader>
          <CardTitle className={`text-2xl flex items-center ${darkMode ? "text-white" : "text-gray-900"}`}>
            <Package className="h-6 w-6 mr-3" />
            Request Paid Sample
          </CardTitle>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Get a physical sample before placing your bulk order
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Selection */}
            <div>
              <Label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Sample Product Type
              </Label>
              <Select value={selectedSample} onValueChange={setSelectedSample}>
                <SelectTrigger className={`mt-2 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={darkMode ? "bg-gray-700 border-gray-600" : ""}>
                  <SelectItem value="tshirt">Custom T-Shirt</SelectItem>
                  <SelectItem value="mug">Custom Mug</SelectItem>
                  <SelectItem value="business-card">Business Cards</SelectItem>
                  <SelectItem value="cap">Custom Cap</SelectItem>
                  <SelectItem value="bag">Custom Bag</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Full Name *
                </Label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className={`mt-2 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                />
              </div>
              <div>
                <Label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Email Address *
                </Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  required
                  className={`mt-2 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Phone Number *
                </Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  required
                  className={`mt-2 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                />
              </div>
              <div>
                <Label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Company Name
                </Label>
                <Input
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Enter company name"
                  className={`mt-2 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <Label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Shipping Address *
              </Label>
              <Textarea
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter complete shipping address"
                rows={3}
                required
                className={`mt-2 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>City *</Label>
                <Input
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Enter city"
                  required
                  className={`mt-2 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                />
              </div>
              <div>
                <Label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  PIN Code *
                </Label>
                <Input
                  value={formData.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                  placeholder="Enter PIN code"
                  required
                  className={`mt-2 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                />
              </div>
            </div>

            {/* Design Notes */}
            <div>
              <Label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Design Notes & Requirements
              </Label>
              <Textarea
                value={formData.designNotes}
                onChange={(e) => handleInputChange("designNotes", e.target.value)}
                placeholder="Describe your design requirements, colors, text, logo placement, etc."
                rows={4}
                className={`mt-2 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
              />
            </div>

            {/* Shipping Options */}
            <div>
              <Label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Shipping Option
              </Label>
              <div className="mt-2 space-y-3">
                {shippingOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.shippingOption === option.id
                        ? darkMode
                          ? "border-blue-500 bg-blue-900/20"
                          : "border-blue-500 bg-blue-50"
                        : darkMode
                          ? "border-gray-600 hover:border-gray-500"
                          : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleInputChange("shippingOption", option.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            formData.shippingOption === option.id
                              ? "border-blue-500 bg-blue-500"
                              : darkMode
                                ? "border-gray-500"
                                : "border-gray-300"
                          }`}
                        >
                          {formData.shippingOption === option.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <div>
                          <h4 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{option.name}</h4>
                          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                            Delivery in {option.timeline}
                          </p>
                        </div>
                      </div>
                      <div className={`text-right ${darkMode ? "text-white" : "text-gray-900"}`}>
                        <div className="font-bold">₹{option.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={formData.agreedToTerms}
                onCheckedChange={(checked) => handleInputChange("agreedToTerms", checked as boolean)}
                className="mt-1"
              />
              <Label
                htmlFor="terms"
                className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed`}
              >
                I agree to the{" "}
                <a href="#terms" className={`${darkMode ? "text-blue-400" : "text-blue-600"} hover:underline`}>
                  Terms & Conditions
                </a>{" "}
                and understand that sample cost will be adjusted in my bulk order if I proceed.
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full py-3 text-lg font-bold ${
                isFormValid()
                  ? "bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white`}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Pay ₹{totalCost} & Request Sample
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <div className="space-y-6">
        {/* Sample Details */}
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-xl`}>
          <CardHeader>
            <CardTitle className={`text-xl ${darkMode ? "text-white" : "text-gray-900"}`}>Sample Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Product Type</span>
              <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                {selectedSample.charAt(0).toUpperCase() + selectedSample.slice(1).replace("-", " ")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Sample Cost</span>
              <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>₹{sampleInfo.price}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Shipping</span>
              <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                ₹{selectedShipping.price}
              </span>
            </div>
            <div className={`border-t ${darkMode ? "border-gray-600" : "border-gray-200"} pt-4`}>
              <div className="flex items-center justify-between">
                <span className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Total Cost</span>
                <span className={`font-bold text-xl ${darkMode ? "text-green-400" : "text-green-600"}`}>
                  ₹{totalCost}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-xl`}>
          <CardHeader>
            <CardTitle className={`text-xl flex items-center ${darkMode ? "text-white" : "text-gray-900"}`}>
              <Clock className="h-5 w-5 mr-2" />
              Expected Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <h4 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>Sample Production</h4>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{sampleInfo.timeline}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-blue-500" />
              <div>
                <h4 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>Shipping & Delivery</h4>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{selectedShipping.timeline}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card
          className={`${darkMode ? "bg-orange-900/50 border-orange-700" : "bg-orange-50 border-orange-200"} border`}
        >
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle
                className={`h-5 w-5 ${darkMode ? "text-orange-400" : "text-orange-600"} mt-0.5 flex-shrink-0`}
              />
              <div>
                <h4 className={`font-bold ${darkMode ? "text-orange-300" : "text-orange-800"} mb-2`}>
                  Important Notes
                </h4>
                <ul className={`text-sm ${darkMode ? "text-orange-200" : "text-orange-700"} space-y-1`}>
                  <li>• Sample cost will be adjusted in your bulk order</li>
                  <li>• Minimum bulk order quantity: 100 pieces</li>
                  <li>• Sample approval required before bulk production</li>
                  <li>• Color variations may occur in bulk production</li>
                  <li>• Design modifications possible after sample review</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card
          className={`${darkMode ? "bg-gradient-to-r from-green-600 to-blue-600" : "bg-gradient-to-r from-green-600 to-blue-600"} text-white`}
        >
          <CardContent className="p-6">
            <h4 className="font-bold text-lg mb-4">Why Request a Sample?</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Verify quality before bulk order</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Test design and color accuracy</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Make adjustments if needed</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Cost adjusted in final order</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
