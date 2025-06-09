"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Mail, X } from "lucide-react"

interface QuotationGeneratorProps {
  selectedProducts: any[]
  logo: string | null
  onClose?: () => void
}

export default function QuotationGenerator({ selectedProducts, logo, onClose }: QuotationGeneratorProps) {
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
  })

  const [additionalSpecs, setAdditionalSpecs] = useState({
    paperType: "",
    finishType: "",
    deliveryDate: "",
    specialInstructions: "",
  })

  const calculateItemTotal = (product: any) => {
    const basePrice = product.basePrice * product.quantity
    const logoPrice = product.hasLogo ? 50 * product.quantity : 0
    const subtotal = basePrice + logoPrice
    const gst = Math.round(subtotal * 0.18)
    return {
      subtotal,
      gst,
      total: subtotal + gst,
    }
  }

  const calculateGrandTotal = () => {
    let grandSubtotal = 0
    let grandGst = 0

    selectedProducts.forEach((product) => {
      const itemTotal = calculateItemTotal(product)
      grandSubtotal += itemTotal.subtotal
      grandGst += itemTotal.gst
    })

    return {
      subtotal: grandSubtotal,
      gst: grandGst,
      total: grandSubtotal + grandGst,
    }
  }

  const generateQuotation = () => {
    const totals = calculateGrandTotal()
    const quotationData = {
      quotationNumber: `LN-QT-${Date.now()}`,
      date: new Date().toLocaleDateString("en-IN"),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN"),
      customerDetails,
      products: selectedProducts.map((product) => ({
        ...product,
        calculations: calculateItemTotal(product),
      })),
      additionalSpecs,
      totals,
      hasLogo: !!logo,
    }

    const quotationWindow = window.open("", "_blank")
    if (quotationWindow) {
      quotationWindow.document.write(generateQuotationHTML(quotationData))
      quotationWindow.document.close()
    }
  }

  const totals = calculateGrandTotal()

  return (
    <div className={onClose ? "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" : ""}>
      <Card className={onClose ? "max-w-4xl w-full max-h-[90vh] overflow-y-auto" : "w-full"}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Generate Quotation</CardTitle>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Customer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customer Details</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name"
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

            {/* Additional Specifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Specifications</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="paperType">Paper Type</Label>
                  <Select onValueChange={(value) => setAdditionalSpecs((prev) => ({ ...prev, paperType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select paper type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (300 GSM)</SelectItem>
                      <SelectItem value="premium">Premium (350 GSM)</SelectItem>
                      <SelectItem value="luxury">Luxury (400 GSM)</SelectItem>
                      <SelectItem value="eco">Eco-Friendly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="finishType">Finish Type</Label>
                  <Select onValueChange={(value) => setAdditionalSpecs((prev) => ({ ...prev, finishType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select finish type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="matte">Matte Finish</SelectItem>
                      <SelectItem value="glossy">Glossy Finish</SelectItem>
                      <SelectItem value="satin">Satin Finish</SelectItem>
                      <SelectItem value="uv">UV Coating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="deliveryDate">Required Delivery Date</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={additionalSpecs.deliveryDate}
                    onChange={(e) => setAdditionalSpecs((prev) => ({ ...prev, deliveryDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="specialInstructions">Special Instructions</Label>
                  <Textarea
                    id="specialInstructions"
                    value={additionalSpecs.specialInstructions}
                    onChange={(e) => setAdditionalSpecs((prev) => ({ ...prev, specialInstructions: e.target.value }))}
                    placeholder="Any special requirements or instructions"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Product Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product Summary</h3>
            <div className="space-y-4">
              {selectedProducts.map((product) => {
                const itemTotal = calculateItemTotal(product)
                return (
                  <Card key={product.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.model.replace("-", " ").toUpperCase()}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline">Qty: {product.quantity}</Badge>
                          {product.hasLogo && <Badge variant="secondary">With Logo</Badge>}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="space-y-1 text-sm">
                          <div>
                            Base: ₹{product.basePrice} × {product.quantity} = ₹{product.basePrice * product.quantity}
                          </div>
                          {product.hasLogo && (
                            <div>
                              Logo: ₹50 × {product.quantity} = ₹{50 * product.quantity}
                            </div>
                          )}
                          <div>Subtotal: ₹{itemTotal.subtotal}</div>
                          <div>GST (18%): ₹{itemTotal.gst}</div>
                          <div className="font-semibold border-t pt-1">Total: ₹{itemTotal.total}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          <Separator />

          {/* Grand Total */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold">Grand Total:</span>
              <div className="text-right">
                <div className="text-sm text-gray-600">Subtotal: ₹{totals.subtotal}</div>
                <div className="text-sm text-gray-600">Total GST: ₹{totals.gst}</div>
                <div className="font-bold text-xl text-blue-600">₹{totals.total}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Email Quote
            </Button>
            <Button onClick={generateQuotation}>
              <FileText className="h-4 w-4 mr-2" />
              Generate Quotation
            </Button>
          </div>
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
        <title>Quotation ${data.quotationNumber}</title>
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
            .products-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 30px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            .products-table th,
            .products-table td {
                padding: 12px;
                text-align: left;
                border-bottom: 1px solid #e5e7eb;
            }
            .products-table th {
                background-color: #f8fafc;
                font-weight: 600;
                color: #2563eb;
                font-size: 14px;
            }
            .text-right {
                text-align: right;
            }
            .totals {
                margin-left: auto;
                width: 400px;
            }
            .totals table {
                width: 100%;
                border-collapse: collapse;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            .totals td {
                padding: 12px 15px;
                border-bottom: 1px solid #e5e7eb;
            }
            .totals .total-row {
                font-weight: bold;
                font-size: 18px;
                background-color: #2563eb;
                color: white;
            }
            .specs-section {
                background-color: #f8fafc;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 30px;
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
                <div class="logo">LixtaNetworks</div>
                <div class="tagline">Premium Printing Solutions</div>
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
                <div><strong>${data.customerDetails.name}</strong></div>
                ${data.customerDetails.company ? `<div>${data.customerDetails.company}</div>` : ""}
                <div>${data.customerDetails.email}</div>
                <div>${data.customerDetails.phone}</div>
                ${data.customerDetails.address ? `<div>${data.customerDetails.address}</div>` : ""}
            </div>
            <div class="info-section">
                <h3>From:</h3>
                <div><strong>LixtaNetworks Pvt. Ltd.</strong></div>
                <div>123 Innovation Street</div>
                <div>Tech Park, Bangalore 560001</div>
                <div>Karnataka, India</div>
                <div>GSTIN: 29XXXXX1234X1ZX</div>
                <div>📧 hello@lixtanetworks.com</div>
                <div>📞 +91-80-1234-5678</div>
            </div>
        </div>

        ${
          data.additionalSpecs.paperType ||
          data.additionalSpecs.finishType ||
          data.additionalSpecs.deliveryDate ||
          data.additionalSpecs.specialInstructions
            ? `
        <div class="specs-section">
            <h3 style="margin-top: 0; color: #2563eb;">Additional Specifications:</h3>
            ${data.additionalSpecs.paperType ? `<div><strong>Paper Type:</strong> ${data.additionalSpecs.paperType}</div>` : ""}
            ${data.additionalSpecs.finishType ? `<div><strong>Finish Type:</strong> ${data.additionalSpecs.finishType}</div>` : ""}
            ${data.additionalSpecs.deliveryDate ? `<div><strong>Required Delivery:</strong> ${new Date(data.additionalSpecs.deliveryDate).toLocaleDateString("en-IN")}</div>` : ""}
            ${data.additionalSpecs.specialInstructions ? `<div><strong>Special Instructions:</strong> ${data.additionalSpecs.specialInstructions}</div>` : ""}
        </div>
        `
            : ""
        }

        <table class="products-table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th class="text-right">Qty</th>
                    <th class="text-right">Unit Price</th>
                    <th class="text-right">Subtotal</th>
                    <th class="text-right">GST (18%)</th>
                    <th class="text-right">Total</th>
                </tr>
            </thead>
            <tbody>
                ${data.products
                  .map(
                    (product: any) => `
                    <tr>
                        <td>
                            <div><strong>${product.name}</strong></div>
                            <div style="font-size: 12px; color: #666;">${product.model.replace("-", " ").toUpperCase()}</div>
                            ${product.hasLogo ? '<div style="font-size: 12px; color: #2563eb;">+ Logo Customization</div>' : ""}
                        </td>
                        <td class="text-right">${product.quantity}</td>
                        <td class="text-right">₹${product.basePrice + (product.hasLogo ? 50 : 0)}</td>
                        <td class="text-right">₹${product.calculations.subtotal}</td>
                        <td class="text-right">₹${product.calculations.gst}</td>
                        <td class="text-right">₹${product.calculations.total}</td>
                    </tr>
                `,
                  )
                  .join("")}
            </tbody>
        </table>

        <div class="totals">
            <table>
                <tr>
                    <td>Subtotal:</td>
                    <td class="text-right">₹${data.totals.subtotal}</td>
                </tr>
                <tr>
                    <td>Total GST (18%):</td>
                    <td class="text-right">₹${data.totals.gst}</td>
                </tr>
                <tr class="total-row">
                    <td>Grand Total:</td>
                    <td class="text-right">₹${data.totals.total}</td>
                </tr>
            </table>
        </div>

        <div class="footer">
            <p><strong>Thank you for considering LixtaNetworks!</strong></p>
            <p>This quotation is valid for 30 days from the date of issue.</p>
            <p>For any queries or to proceed with the order: hello@lixtanetworks.com | +91-80-1234-5678</p>
            <p style="margin-top: 15px; font-size: 12px; color: #999;">
                Terms & Conditions apply. Final pricing may vary based on specific requirements.
            </p>
        </div>
    </body>
    </html>
  `
}
