"use client"

import { useState } from "react"
import { FileText, ChevronDown, ChevronUp, Shield, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface TermsAndConditionsProps {
  onAccept?: (accepted: boolean) => void
  isRequired?: boolean
}

const termsData = [
  {
    id: "bulk-orders",
    title: "Bulk Orders & MOQ",
    icon: <Shield className="h-5 w-5" />,
    content: [
      "Minimum Order Quantity (MOQ) is 100 pieces for all products",
      "Bulk pricing applies to orders above 500 pieces",
      "Custom pricing available for orders above 1000 pieces",
      "MOQ may vary for specific products or customizations",
    ],
  },
  {
    id: "customization",
    title: "Customization Guidelines",
    icon: <FileText className="h-5 w-5" />,
    content: [
      "All designs must be provided in high-resolution format (300 DPI minimum)",
      "Copyright and trademark compliance is customer's responsibility",
      "Design approval required before production begins",
      "Changes after approval may incur additional charges",
      "Color variations may occur due to printing processes",
    ],
  },
  {
    id: "production",
    title: "Production & Delivery",
    icon: <AlertTriangle className="h-5 w-5" />,
    content: [
      "Standard production time: 7-14 business days",
      "Rush orders available with additional charges",
      "Delivery timeline depends on location and quantity",
      "Quality check performed before dispatch",
      "Defective products will be replaced at no cost",
    ],
  },
  {
    id: "payment",
    title: "Payment Terms",
    icon: <Shield className="h-5 w-5" />,
    content: [
      "50% advance payment required to start production",
      "Balance payment before dispatch",
      "Payment methods: Bank transfer, UPI, Credit/Debit cards",
      "GST applicable as per government regulations",
      "Refunds processed within 7-10 business days",
    ],
  },
  {
    id: "samples",
    title: "Sample Policy",
    icon: <FileText className="h-5 w-5" />,
    content: [
      "Paid samples available for ₹500-2000 depending on product",
      "Sample cost adjusted in final order (if order placed)",
      "Sample production time: 3-5 business days",
      "Maximum 2 design revisions included in sample cost",
      "Sample shipping charges applicable",
    ],
  },
]

export default function TermsAndConditions({ onAccept, isRequired = false }: TermsAndConditionsProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [accepted, setAccepted] = useState(false)

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const handleAcceptChange = (checked: boolean) => {
    setAccepted(checked)
    if (onAccept) {
      onAccept(checked)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <FileText className="h-5 w-5 mr-2" />
          Terms & Conditions
          {isRequired && (
            <Badge variant="destructive" className="ml-2 text-xs">
              Required
            </Badge>
          )}
        </CardTitle>
        <p className="text-sm text-gray-600">
          Please review our terms and conditions before proceeding with your order
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Important Notice */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-orange-800 text-sm">Important Notice</h4>
              <p className="text-orange-700 text-xs mt-1">
                By placing an order, you agree to our terms and conditions. Please read carefully.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-3">
          {termsData.map((section) => {
            const isExpanded = expandedSections.includes(section.id)

            return (
              <div key={section.id} className="border rounded-lg">
                <Button
                  variant="ghost"
                  className="w-full justify-between p-4 h-auto"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-600">{section.icon}</div>
                    <span className="font-medium text-left">{section.title}</span>
                  </div>
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>

                {isExpanded && (
                  <div className="px-4 pb-4">
                    <ul className="space-y-2">
                      {section.content.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Acceptance Checkbox */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Checkbox id="accept-terms" checked={accepted} onCheckedChange={handleAcceptChange} className="mt-1" />
            <label htmlFor="accept-terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
              I have read and agree to the <span className="font-semibold text-blue-600">Terms & Conditions</span>,{" "}
              <span className="font-semibold text-blue-600">Privacy Policy</span>, and{" "}
              <span className="font-semibold text-blue-600">Refund Policy</span>. I understand that this is for bulk
              orders only with minimum order quantities.
            </label>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Last updated: January 2025</p>
          <p>• For questions, contact: legal@easegiv.com</p>
          <p>• These terms are subject to change without prior notice</p>
        </div>
      </CardContent>
    </Card>
  )
}
