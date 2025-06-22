"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Mail, X, Package, Plus, Minus } from "lucide-react"

interface QuotationGeneratorProps {
  tshirtConfig: {
    logos: Array<{ id: string; name: string; url: string }>
    productColor: string
    selectedLocations: string[]
    logoConfigs: Record<string, { logoId: string; size: number; rotation: number }>
  }
  onClose?: () => void
}

const logoLocationLabels = {
  "front-center": "Front Center",
  "front-left-chest": "Front Left Chest",
  "front-right-chest": "Front Right Chest",
  "back-center": "Back Center",
  "left-sleeve": "Left Sleeve",
  "right-sleeve": "Right Sleeve",
}

export default function QuotationGenerator({ tshirtConfig, onClose }: QuotationGeneratorProps) {
  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
  })

  const [quantity, setQuantity] = useState(100)
  const [specialInstructions, setSpecialInstructions] = useState("")

  const generateQuotation = () => {
    const quotationData = {
      quotationNumber: `EG-QT-${Date.now()}`,
      date: new Date().toLocaleDateString("en-IN"),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN"),
      customerDetails,
      tshirtConfig: {
        ...tshirtConfig,
        quantity,
        logoDetails: tshirtConfig.selectedLocations.map((locationId) => {
          const config = tshirtConfig.logoConfigs[locationId]
          const logo = tshirtConfig.logos.find((l) => l.id === config?.logoId)
          return {
            location: logoLocationLabels[locationId as keyof typeof logoLocationLabels],
            logoName: logo?.name || "Unknown Logo",
            size: config?.size || 30,
            rotation: config?.rotation || 0,
          }
        }),
      },
      specialInstructions,
    }

    const quotationWindow = window.open("", "_blank")
    if (quotationWindow) {
      quotationWindow.document.write(generateQuotationHTML(quotationData))
      quotationWindow.document.close()
    }
  }

  const isFormValid = () => {
    return (
      customerDetails.firstName.trim() &&
      customerDetails.email.trim() &&
      customerDetails.phone.trim() &&
      tshirtConfig.logos.length > 0 &&
      tshirtConfig.selectedLocations.length > 0 &&
      quantity >= 100
    )
  }

  return (
    <div className={onClose ? "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" : ""}>
      <Card className={onClose ? "max-w-4xl w-full max-h-[90vh] overflow-y-auto" : "w-full"}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Generate T-Shirt Quotation</CardTitle>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* T-Shirt Configuration Summary */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800">Your T-Shirt Design</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-4">
                <div
                  className="w-8 h-8 rounded border-2 border-gray-300"
                  style={{ backgroundColor: tshirtConfig.productColor }}
                />
                <span className="font-medium">Color: {tshirtConfig.productColor}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant="secondary">
                  ✓ {tshirtConfig.logos.length} Logo{tshirtConfig.logos.length > 1 ? "s" : ""}
                </Badge>
                <Badge variant="secondary">
                  ✓ {tshirtConfig.selectedLocations.length} Placement
                  {tshirtConfig.selectedLocations.length > 1 ? "s" : ""}
                </Badge>
                <Badge variant="secondary">
                  ✓ {new Set(tshirtConfig.selectedLocations.map((id) => tshirtConfig.logoConfigs[id]?.logoId)).size}{" "}
                  Different Logo
                  {new Set(tshirtConfig.selectedLocations.map((id) => tshirtConfig.logoConfigs[id]?.logoId)).size > 1
                    ? "s"
                    : ""}{" "}
                  Used
                </Badge>
              </div>

              {tshirtConfig.selectedLocations.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Logo Configuration:</p>
                  <div className="space-y-1">
                    {tshirtConfig.selectedLocations.map((locationId) => {
                      const config = tshirtConfig.logoConfigs[locationId]
                      const logo = tshirtConfig.logos.find((l) => l.id === config?.logoId)
                      return (
                        <div key={locationId} className="text-xs bg-white p-2 rounded">
                          <strong>{logoLocationLabels[locationId as keyof typeof logoLocationLabels]}:</strong>{" "}
                          {logo?.name} ({config?.size}% size, {config?.rotation}° rotation)
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Customer Details & Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customer Details</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={customerDetails.firstName}
                    onChange={(e) => setCustomerDetails((prev) => ({ ...prev, firstName: e.target.value }))}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerDetails.email}
                    onChange={(e) => setCustomerDetails((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={customerDetails.company}
                    onChange={(e) => setCustomerDetails((prev) => ({ ...prev, company: e.target.value }))}
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails((prev) => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter complete address"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Order Details</h3>

              {/* Quantity */}
              <div className="space-y-3">
                <div>
                  <Label className="flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    Quantity (MOQ: 100 pieces) *
                  </Label>
                  <div className="flex items-center space-x-3 mt-2">
                    <Button size="sm" variant="outline" onClick={() => setQuantity(Math.max(100, quantity - 50))}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <div className="flex-1">
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(100, Number.parseInt(e.target.value) || 100))}
                        min="100"
                        step="50"
                        className="text-center"
                      />
                    </div>
                    <Button size="sm" variant="outline" onClick={() => setQuantity(quantity + 50)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Minimum order: 100 pieces</p>
                </div>

                <div>
                  <Label htmlFor="specialInstructions">Special Instructions</Label>
                  <Textarea
                    id="specialInstructions"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Any special requirements, custom colors (with hex codes), delivery instructions, etc."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" disabled={!isFormValid()}>
              <Mail className="h-4 w-4 mr-2" />
              Email Quote
            </Button>
            <Button onClick={generateQuotation} disabled={!isFormValid()}>
              <FileText className="h-4 w-4 mr-2" />
              Generate Quotation
            </Button>
          </div>

          {!isFormValid() && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <p className="text-amber-800 text-sm font-medium">Complete your T-shirt design first:</p>
              <ul className="text-amber-700 text-xs mt-2 space-y-1">
                {tshirtConfig.logos.length === 0 && <li>• Upload your logos</li>}
                {tshirtConfig.selectedLocations.length === 0 && <li>• Select logo placement locations</li>}
                {!customerDetails.firstName.trim() && <li>• Enter your first name</li>}
                {!customerDetails.email.trim() && <li>• Enter your email</li>}
                {!customerDetails.phone.trim() && <li>• Enter your phone number</li>}
                {quantity < 100 && <li>• Set quantity (minimum 100 pieces)</li>}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function generateQuotationHTML(data: any) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>T-Shirt Quotation ${data.quotationNumber}</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                max-width: 900px;
                margin: 0 auto;
                padding: 20px;
                line-height: 1.6;
                color: #333;
            }
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 3px solid #2563eb;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 28px;
                font-weight: bold;
                color: #2563eb;
                letter-spacing: -0.5px;
            }
            .tagline {
                font-size: 12px;
                color: #666;
                margin-top: 2px;
            }
            .quote-details {
                text-align: right;
            }
            .quote-number {
                font-size: 18px;
                font-weight: bold;
                color: #2563eb;
            }
            .customer-info {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 40px;
                margin-bottom: 30px;
            }
            .info-section h3 {
                margin-bottom: 10px;
                color: #2563eb;
                border-bottom: 1px solid #e5e7eb;
                padding-bottom: 5px;
                font-size: 16px;
            }
            .product-section {
                background-color: #f8fafc;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 30px;
            }
            .color-swatch {
                display: inline-block;
                width: 20px;
                height: 20px;
                border-radius: 4px;
                border: 2px solid #ddd;
                margin-right: 10px;
                vertical-align: middle;
            }
            .logo-config {
                background: white;
                padding: 10px;
                border-radius: 4px;
                margin: 5px 0;
                border-left: 3px solid #2563eb;
            }
            .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                text-align: center;
                color: #666;
                font-size: 14px;
            }
            .print-button {
                background-color: #2563eb;
                color: white;
                padding: 12px 24px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                margin-bottom: 20px;
                font-size: 16px;
                font-weight: 500;
            }
            @media print {
                .print-button {
                    display: none;
                }
                body {
                    margin: 0;
                    padding: 15px;
                }
            }
        </style>
    </head>
    <body>
        <button class="print-button" onclick="window.print()">🖨️ Print Quotation</button>
        
        <div class="header">
            <div>
                <div class="logo">EaseGiv</div>
                <div class="tagline">Premium T-Shirt Printing Solutions</div>
            </div>
            <div class="quote-details">
                <div class="quote-number">Quotation ${data.quotationNumber}</div>
                <div>Date: ${data.date}</div>
                <div>Valid Until: ${data.validUntil}</div>
            </div>
        </div>

        <div class="customer-info">
            <div class="info-section">
                <h3>Customer Details:</h3>
                <div><strong>${data.customerDetails.firstName}</strong></div>
                ${data.customerDetails.company ? `<div>${data.customerDetails.company}</div>` : ""}
                <div>${data.customerDetails.email}</div>
                <div>${data.customerDetails.phone}</div>
                ${data.customerDetails.address ? `<div>${data.customerDetails.address}</div>` : ""}
            </div>
            <div class="info-section">
                <h3>From:</h3>
                <div><strong>EaseGiv Pvt. Ltd.</strong></div>
                <div>123 Innovation Street</div>
                <div>Tech Park, Bangalore 560001</div>
                <div>Karnataka, India</div>
                <div>GSTIN: 29XXXXX1234X1ZX</div>
                <div>📧 hello@easegiv.com</div>
                <div>📞 +91-80-1234-5678</div>
            </div>
        </div>

        <div class="product-section">
            <h3 style="margin-top: 0; color: #2563eb;">Custom T-Shirt Specifications:</h3>
            
            <div style="margin-bottom: 15px;">
                <strong>Product:</strong> Custom Printed T-Shirt
            </div>
            
            <div style="margin-bottom: 15px;">
                <strong>Quantity:</strong> ${data.tshirtConfig.quantity} pieces (MOQ: 100)
            </div>
            
            <div style="margin-bottom: 15px;">
                <strong>T-Shirt Color:</strong> 
                <span class="color-swatch" style="background-color: ${data.tshirtConfig.productColor};"></span>
                ${data.tshirtConfig.productColor}
            </div>
            
            <div style="margin-bottom: 15px;">
                <strong>Total Logos:</strong> ${data.tshirtConfig.logos.length}
            </div>
            
            ${
              data.tshirtConfig.logoDetails && data.tshirtConfig.logoDetails.length > 0
                ? `
            <div style="margin-bottom: 15px;">
                <strong>Logo Configuration:</strong>
                ${data.tshirtConfig.logoDetails
                  .map(
                    (detail: any) => `
                    <div class="logo-config">
                        <strong>${detail.location}:</strong> ${detail.logoName} (${detail.size}% size, ${detail.rotation}° rotation)
                    </div>
                `,
                  )
                  .join("")}
            </div>
            `
                : ""
            }
            
            ${
              data.specialInstructions
                ? `
            <div style="margin-bottom: 15px;">
                <strong>Special Instructions:</strong>
                <div style="background: white; padding: 10px; border-radius: 4px; margin-top: 5px;">
                    ${data.specialInstructions}
                </div>
            </div>
            `
                : ""
            }
        </div>

        <div class="footer">
            <p><strong>Thank you for choosing EaseGiv!</strong></p>
            <p>This quotation is valid for 30 days from the date of issue.</p>
            <p>Minimum Order Quantity (MOQ): 100 pieces</p>
            <p>For any queries or to proceed with the order: hello@easegiv.com | +91-80-1234-5678</p>
            <p style="margin-top: 15px; font-size: 12px; color: #999;">
                Terms & Conditions apply. Final pricing will be provided based on specifications and quantities.
            </p>
        </div>
    </body>
    </html>
  `
}
