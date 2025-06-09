"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Upload, X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import ProductTemplate3D from "@/components/product-template-3d"
import QuotationGenerator from "@/components/quotation-generator"
import PreviousWork from "@/components/previous-work"
import SeasonalIdeas from "@/components/seasonal-ideas"

// Product categories with templates and base prices - only business cards and t-shirts
const productCategories = [
  {
    id: "business-cards",
    name: "Business Cards",
    templates: [
      {
        id: "bc-1",
        name: "Premium Cream",
        image: "/templates/business-card-1.png",
        model: "business-card",
        basePrice: 200,
        color: "#f5f5dc",
      },
      {
        id: "bc-2",
        name: "Executive Black",
        image: "/templates/business-card-2.png",
        model: "business-card",
        basePrice: 250,
        color: "#2c2c2c",
      },
      {
        id: "bc-3",
        name: "Luxury Gold",
        image: "/templates/business-card-3.png",
        model: "business-card",
        basePrice: 300,
        color: "#ffd700",
      },
      {
        id: "bc-4",
        name: "Royal Blue",
        image: "/templates/business-card-4.png",
        model: "business-card",
        basePrice: 350,
        color: "#4169e1",
      },
    ],
  },
  {
    id: "tshirts",
    name: "T-Shirts",
    templates: [
      {
        id: "ts-1",
        name: "Vibrant Red Tee",
        image: "/templates/tshirt-1.png",
        model: "tshirt",
        basePrice: 450,
        color: "#dc2626",
      },
      {
        id: "ts-2",
        name: "Ocean Blue Tee",
        image: "/templates/tshirt-2.png",
        model: "tshirt",
        basePrice: 450,
        color: "#0ea5e9",
      },
      {
        id: "ts-3",
        name: "Forest Green Tee",
        image: "/templates/tshirt-3.png",
        model: "tshirt",
        basePrice: 450,
        color: "#16a34a",
      },
      {
        id: "ts-4",
        name: "Purple Tee",
        image: "/templates/tshirt-4.png",
        model: "tshirt",
        basePrice: 450,
        color: "#9333ea",
      },
    ],
  },
]

export default function CustomizePage() {
  const [logo, setLogo] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<any[]>([])
  const [showQuotation, setShowQuotation] = useState(false)
  const [logoError, setLogoError] = useState<string | null>(null)

  // Load logo from localStorage on component mount
  useEffect(() => {
    try {
      const savedLogo = localStorage.getItem("userLogo")
      if (savedLogo) {
        setLogo(savedLogo)
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [])

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLogoError(null)

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setLogoError("Please upload a valid image file (PNG, JPG, SVG)")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setLogoError("File size must be less than 5MB")
      return
    }

    setIsUploading(true)

    const reader = new FileReader()
    reader.onload = () => {
      try {
        const result = reader.result as string

        // Pre-load the image to check if it loads correctly
        const img = new Image()
        img.onload = () => {
          setLogo(result)
          // Save to localStorage
          localStorage.setItem("userLogo", result)
          console.log("Logo uploaded successfully", img.width, "x", img.height)
          setIsUploading(false)
        }
        img.onerror = () => {
          console.error("Error loading image")
          setLogoError("Error loading image. Please try a different file.")
          setIsUploading(false)
        }
        img.src = result
      } catch (error) {
        console.error("Error processing image:", error)
        setLogoError("Error processing image. Please try again.")
        setIsUploading(false)
      }
    }
    reader.onerror = () => {
      console.error("Error reading file")
      setLogoError("Error reading file. Please try again.")
      setIsUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const removeLogo = () => {
    setLogo(null)
    setLogoError(null)
    try {
      localStorage.removeItem("userLogo")
    } catch (error) {
      console.error("Error removing from localStorage:", error)
    }
  }

  const handleProductSelect = (product: any) => {
    setSelectedProducts((prev) => {
      const existingIndex = prev.findIndex((p) => p.id === product.id)
      if (existingIndex >= 0) {
        // Update existing product
        const updated = [...prev]
        updated[existingIndex] = product
        return updated
      } else {
        // Add new product
        return [...prev, product]
      }
    })
  }

  const removeSelectedProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId))
  }

  const isProductSelected = (productId: string) => {
    return selectedProducts.some((p) => p.id === productId)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Customize Your Products</h1>

      <Tabs defaultValue="customize" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="customize">Customize</TabsTrigger>
          <TabsTrigger value="previous-work">Previous Work</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Ideas</TabsTrigger>
          <TabsTrigger value="quotation">Quotation</TabsTrigger>
        </TabsList>

        <TabsContent value="customize" className="space-y-6">
          <div className="grid md:grid-cols-[300px,1fr] gap-8">
            {/* Logo Upload Section */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Your Logo</h2>

                {!logo ? (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">Upload your logo to see it on products</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, or SVG (max 5MB)</p>
                    </div>

                    {logoError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm">
                        {logoError}
                      </div>
                    )}

                    <div>
                      <input
                        type="file"
                        id="logo-upload"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleLogoUpload}
                      />
                      <Label htmlFor="logo-upload" className="w-full">
                        <Button className="w-full" disabled={isUploading}>
                          {isUploading ? "Uploading..." : "Upload Logo"}
                        </Button>
                      </Label>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative bg-gray-50 p-4 rounded-lg border">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 h-6 w-6 rounded-full"
                        onClick={removeLogo}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove logo</span>
                      </Button>
                      <div className="flex justify-center">
                        <div className="relative h-40 w-40">
                          <Image src={logo || "/placeholder.svg"} alt="Your logo" fill className="object-contain" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-center mb-2">Want to use a different logo?</p>
                      <input
                        type="file"
                        id="logo-upload-new"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleLogoUpload}
                      />
                      <Label htmlFor="logo-upload-new" className="w-full">
                        <Button variant="outline" className="w-full" disabled={isUploading}>
                          {isUploading ? "Uploading..." : "Upload New Logo"}
                        </Button>
                      </Label>
                    </div>
                  </div>
                )}
              </div>

              {/* Selected Products Summary */}
              {selectedProducts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Selected Products ({selectedProducts.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {selectedProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">
                            Qty: {product.quantity} × ₹{product.basePrice + (product.hasLogo ? 50 : 0)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">₹{product.totalPrice}</Badge>
                          <Button size="sm" variant="ghost" onClick={() => removeSelectedProduct(product.id)}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-lg">
                          ₹{selectedProducts.reduce((sum, p) => sum + p.totalPrice, 0)}
                        </span>
                      </div>
                    </div>
                    <Button className="w-full mt-2" onClick={() => setShowQuotation(true)}>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Quotation
                    </Button>
                  </CardContent>
                </Card>
              )}

              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Design Tips</h2>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Use high resolution images for best print quality</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Transparent background (PNG) works best for logos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Simple designs print better on products</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Consider how your logo will look at different sizes</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Product Templates Section */}
            <div>
              <Card>
                <Tabs defaultValue="business-cards">
                  <TabsList className="grid grid-cols-2">
                    {productCategories.map((category) => (
                      <TabsTrigger key={category.id} value={category.id}>
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {productCategories.map((category) => (
                    <TabsContent key={category.id} value={category.id} className="p-4">
                      <h3 className="text-lg font-medium mb-4">
                        {logo ? `${category.name} with Your Logo` : `${category.name} Templates`}
                      </h3>

                      {!logo && (
                        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
                          <p className="text-amber-800 text-sm">
                            Upload your logo to see how it will look on these templates in 3D!
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        {category.templates.map((template) => (
                          <ProductTemplate3D
                            key={template.id}
                            template={template}
                            logo={logo}
                            onProductSelect={handleProductSelect}
                            isSelected={isProductSelected(template.id)}
                          />
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="previous-work">
          <PreviousWork />
        </TabsContent>

        <TabsContent value="seasonal">
          <SeasonalIdeas />
        </TabsContent>

        <TabsContent value="quotation">
          <QuotationGenerator selectedProducts={selectedProducts} logo={logo} />
        </TabsContent>
      </Tabs>

      {/* Quotation Modal */}
      {showQuotation && (
        <QuotationGenerator selectedProducts={selectedProducts} logo={logo} onClose={() => setShowQuotation(false)} />
      )}
    </div>
  )
}
