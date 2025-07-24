"use client"

import { useState } from "react"
import { CreditCard, Receipt, Percent, Tag, Calculator, FileText, Download, Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const mockUser = {
  name: "Rajesh Kumar",
  email: "rajesh@company.com",
  isAdmin: false,
}

interface BillingItem {
  id: string
  product: string
  quantity: number
  unitPrice: number
  total: number
}

interface CouponCode {
  code: string
  discount: number
  type: "percentage" | "fixed"
  minOrder: number
  maxDiscount?: number
  isActive: boolean
}

const mockCoupons: CouponCode[] = [
  { code: "BULK100", discount: 10, type: "percentage", minOrder: 10000, maxDiscount: 2000, isActive: true },
  { code: "FIRST500", discount: 500, type: "fixed", minOrder: 5000, isActive: true },
  { code: "PREMIUM15", discount: 15, type: "percentage", minOrder: 15000, maxDiscount: 3000, isActive: true },
]

export default function BillingPage() {
  const [billingItems, setBillingItems] = useState<BillingItem[]>([
    { id: "1", product: "Custom T-Shirts", quantity: 100, unitPrice: 150, total: 15000 },
    { id: "2", product: "Business Cards", quantity: 500, unitPrice: 5, total: 2500 },
  ])

  const [customerDetails, setCustomerDetails] = useState({
    name: "Rajesh Kumar",
    email: "rajesh@company.com",
    phone: "+91-9876543210",
    company: "Kumar Enterprises",
    gstin: "29ABCDE1234F1Z5",
    address: "123 Business Street, Bangalore, Karnataka 560001",
  })

  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<CouponCode | null>(null)
  const [gstEnabled, setGstEnabled] = useState(true)
  const [notes, setNotes] = useState("")

  const subtotal = billingItems.reduce((sum, item) => sum + item.total, 0)
  const gstRate = 18
  const gstAmount = gstEnabled ? (subtotal * gstRate) / 100 : 0

  let discountAmount = 0
  if (appliedCoupon) {
    if (appliedCoupon.type === "percentage") {
      discountAmount = (subtotal * appliedCoupon.discount) / 100
      if (appliedCoupon.maxDiscount) {
        discountAmount = Math.min(discountAmount, appliedCoupon.maxDiscount)
      }
    } else {
      discountAmount = appliedCoupon.discount
    }
  }

  const totalAmount = subtotal + gstAmount - discountAmount

  const addBillingItem = () => {
    const newItem: BillingItem = {
      id: Date.now().toString(),
      product: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    }
    setBillingItems([...billingItems, newItem])
  }

  const updateBillingItem = (id: string, field: keyof BillingItem, value: string | number) => {
    setBillingItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }
          if (field === "quantity" || field === "unitPrice") {
            updated.total = updated.quantity * updated.unitPrice
          }
          return updated
        }
        return item
      }),
    )
  }

  const removeBillingItem = (id: string) => {
    setBillingItems((items) => items.filter((item) => item.id !== id))
  }

  const applyCoupon = () => {
    const coupon = mockCoupons.find((c) => c.code === couponCode && c.isActive)
    if (coupon) {
      if (subtotal >= coupon.minOrder) {
        setAppliedCoupon(coupon)
      } else {
        alert(`Minimum order amount of ₹${coupon.minOrder} required for this coupon`)
      }
    } else {
      alert("Invalid or expired coupon code")
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
  }

  const generateInvoice = () => {
    const invoiceData = {
      invoiceNumber: `INV-${Date.now()}`,
      date: new Date().toLocaleDateString("en-IN"),
      customerDetails,
      billingItems,
      subtotal,
      gstAmount,
      discountAmount,
      totalAmount,
      appliedCoupon,
      notes,
    }

    const invoiceWindow = window.open("", "_blank")
    if (invoiceWindow) {
      invoiceWindow.document.write(generateInvoiceHTML(invoiceData))
      invoiceWindow.document.close()
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={mockUser} />

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Invoice</h1>
            <p className="text-gray-600">Create and manage invoices with GST, discounts, and coupon codes</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Billing Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Details */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Receipt className="h-5 w-5 mr-2" />
                    Customer Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customerName">Customer Name</Label>
                      <Input
                        id="customerName"
                        value={customerDetails.name}
                        onChange={(e) => setCustomerDetails((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerEmail">Email</Label>
                      <Input
                        id="customerEmail"
                        type="email"
                        value={customerDetails.email}
                        onChange={(e) => setCustomerDetails((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerPhone">Phone</Label>
                      <Input
                        id="customerPhone"
                        value={customerDetails.phone}
                        onChange={(e) => setCustomerDetails((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerCompany">Company</Label>
                      <Input
                        id="customerCompany"
                        value={customerDetails.company}
                        onChange={(e) => setCustomerDetails((prev) => ({ ...prev, company: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerGstin">GSTIN</Label>
                      <Input
                        id="customerGstin"
                        value={customerDetails.gstin}
                        onChange={(e) => setCustomerDetails((prev) => ({ ...prev, gstin: e.target.value }))}
                        placeholder="29ABCDE1234F1Z5"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="customerAddress">Address</Label>
                    <Textarea
                      id="customerAddress"
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails((prev) => ({ ...prev, address: e.target.value }))}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Billing Items */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calculator className="h-5 w-5 mr-2" />
                      Billing Items
                    </div>
                    <Button onClick={addBillingItem} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product/Service</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit Price (₹)</TableHead>
                        <TableHead>Total (₹)</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {billingItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Input
                              value={item.product}
                              onChange={(e) => updateBillingItem(item.id, "product", e.target.value)}
                              placeholder="Enter product name"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateBillingItem(item.id, "quantity", Number.parseInt(e.target.value) || 0)
                              }
                              min="1"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) =>
                                updateBillingItem(item.id, "unitPrice", Number.parseFloat(e.target.value) || 0)
                              }
                              min="0"
                              step="0.01"
                            />
                          </TableCell>
                          <TableCell className="font-medium">₹{item.total.toLocaleString("en-IN")}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => removeBillingItem(item.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Coupon Codes */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Tag className="h-5 w-5 mr-2" />
                    Coupon Codes & Discounts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    />
                    <Button onClick={applyCoupon} disabled={!couponCode}>
                      Apply
                    </Button>
                  </div>

                  {appliedCoupon && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-green-800">Coupon Applied: {appliedCoupon.code}</p>
                          <p className="text-sm text-green-600">
                            {appliedCoupon.type === "percentage"
                              ? `${appliedCoupon.discount}% discount`
                              : `₹${appliedCoupon.discount} off`}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" onClick={removeCoupon}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium mb-2">Available Coupons:</h4>
                    <div className="space-y-2">
                      {mockCoupons.map((coupon) => (
                        <div key={coupon.code} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <Badge variant="outline" className="mb-1">
                                {coupon.code}
                              </Badge>
                              <p className="text-sm text-blue-600">
                                {coupon.type === "percentage" ? `${coupon.discount}% off` : `₹${coupon.discount} off`}
                                {coupon.maxDiscount && ` (max ₹${coupon.maxDiscount})`}
                              </p>
                              <p className="text-xs text-gray-500">
                                Min order: ₹{coupon.minOrder.toLocaleString("en-IN")}
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setCouponCode(coupon.code)
                                applyCoupon()
                              }}
                              disabled={subtotal < coupon.minOrder}
                            >
                              Apply
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Notes */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Additional Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Add any special instructions, terms, or notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Invoice Summary */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Invoice Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({appliedCoupon.code}):</span>
                        <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span>GST ({gstRate}%):</span>
                        <Switch checked={gstEnabled} onCheckedChange={setGstEnabled} />
                      </div>
                      <span>₹{gstAmount.toLocaleString("en-IN")}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount:</span>
                      <span>₹{totalAmount.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button onClick={generateInvoice} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Invoice
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      Save as Draft
                    </Button>
                  </div>

                  {gstEnabled && customerDetails.gstin && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-800 font-medium">GST Invoice</p>
                      <p className="text-xs text-blue-600">
                        This will be a valid GST invoice with GSTIN: {customerDetails.gstin}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Terms */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Percent className="h-5 w-5 mr-2" />
                    Payment Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span>Bank Transfer / UPI</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Terms:</span>
                    <span>Net 30 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Late Fee:</span>
                    <span>2% per month</span>
                  </div>
                  <Separator />
                  <p className="text-xs text-gray-600">
                    Payment is due within 30 days of invoice date. Late payments may incur additional charges.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function generateInvoiceHTML(data: any) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice ${data.invoiceNumber}</title>
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
            }
            .invoice-details {
                text-align: right;
            }
            .invoice-number {
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
            }
            .items-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 30px;
            }
            .items-table th,
            .items-table td {
                border: 1px solid #e5e7eb;
                padding: 12px;
                text-align: left;
            }
            .items-table th {
                background-color: #f8fafc;
                font-weight: bold;
            }
            .summary {
                margin-left: auto;
                width: 300px;
            }
            .summary-row {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
            }
            .total-row {
                border-top: 2px solid #2563eb;
                font-weight: bold;
                font-size: 18px;
                color: #2563eb;
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
        <button class="print-button" onclick="window.print()">🖨️ Print Invoice</button>
        
        <div class="header">
            <div>
                <div class="logo">EaseGiv</div>
                <div>Premium B2B Customization Solutions</div>
            </div>
            <div class="invoice-details">
                <div class="invoice-number">Invoice ${data.invoiceNumber}</div>
                <div>Date: ${data.date}</div>
                <div>Due Date: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN")}</div>
            </div>
        </div>

        <div class="customer-info">
            <div class="info-section">
                <h3>Bill To:</h3>
                <div><strong>${data.customerDetails.name}</strong></div>
                ${data.customerDetails.company ? `<div>${data.customerDetails.company}</div>` : ""}
                <div>${data.customerDetails.email}</div>
                <div>${data.customerDetails.phone}</div>
                ${data.customerDetails.gstin ? `<div>GSTIN: ${data.customerDetails.gstin}</div>` : ""}
                ${data.customerDetails.address ? `<div>${data.customerDetails.address}</div>` : ""}
            </div>
            <div class="info-section">
                <h3>From:</h3>
                <div><strong>EaseGiv Pvt. Ltd.</strong></div>
                <div>123 Innovation Street</div>
                <div>Tech Park, Bangalore 560001</div>
                <div>Karnataka, India</div>
                <div>GSTIN: 29XXXXX1234X1ZX</div>
                <div>📧 billing@easegiv.com</div>
                <div>📞 +91-80-1234-5678</div>
            </div>
        </div>

        <table class="items-table">
            <thead>
                <tr>
                    <th>Product/Service</th>
                    <th>Quantity</th>
                    <th>Unit Price (₹)</th>
                    <th>Total (₹)</th>
                </tr>
            </thead>
            <tbody>
                ${data.billingItems
                  .map(
                    (item) => `
                    <tr>
                        <td>${item.product}</td>
                        <td>${item.quantity}</td>
                        <td>₹${item.unitPrice.toLocaleString("en-IN")}</td>
                        <td>₹${item.total.toLocaleString("en-IN")}</td>
                    </tr>
                `,
                  )
                  .join("")}
            </tbody>
        </table>

        <div class="summary">
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>₹${data.subtotal.toLocaleString("en-IN")}</span>
            </div>
            ${
              data.discountAmount > 0
                ? `
                <div class="summary-row" style="color: #059669;">
                    <span>Discount (${data.appliedCoupon?.code}):</span>
                    <span>-₹${data.discountAmount.toLocaleString("en-IN")}</span>
                </div>
            `
                : ""
            }
            ${
              data.gstAmount > 0
                ? `
                <div class="summary-row">
                    <span>GST (18%):</span>
                    <span>₹${data.gstAmount.toLocaleString("en-IN")}</span>
                </div>
            `
                : ""
            }
            <div class="summary-row total-row">
                <span>Total Amount:</span>
                <span>₹${data.totalAmount.toLocaleString("en-IN")}</span>
            </div>
        </div>

        ${
          data.notes
            ? `
            <div style="margin-top: 30px;">
                <h3 style="color: #2563eb;">Additional Notes:</h3>
                <div style="background: #f8fafc; padding: 15px; border-radius: 6px;">
                    ${data.notes}
                </div>
            </div>
        `
            : ""
        }

        <div class="footer">
            <p><strong>Payment Terms:</strong> Net 30 days | <strong>Late Fee:</strong> 2% per month</p>
            <p>Payment Methods: Bank Transfer, UPI, NEFT/RTGS</p>
            <p style="margin-top: 15px; font-size: 12px; color: #999;">
                This is a computer-generated invoice. For queries: billing@easegiv.com | +91-80-1234-5678
            </p>
        </div>
    </body>
    </html>
  `
}
