"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import ProductTemplate3D from "@/components/product-template-3d"

// Product categories with templates
const productCategories = [
  {
    id: "business-cards",
    name: "Business Cards",
    templates: [
      { id: "bc-1", name: "Classic White", image: "/templates/business-card-1.png", model: "business-card" },
      { id: "bc-2", name: "Modern Black", image: "/templates/business-card-2.png", model: "business-card" },
      { id: "bc-3", name: "Creative Blue", image: "/templates/business-card-3.png", model: "business-card" },
      { id: "bc-4", name: "Elegant Gold", image: "/templates/business-card-4.png", model: "business-card" },
    ],
  },
  {
    id: "tshirts",
    name: "T-Shirts",
    templates: [
      { id: "ts-1", name: "Basic Tee", image: "/templates/tshirt-1.png", model: "tshirt" },
      { id: "ts-2", name: "Polo Shirt", image: "/templates/tshirt-2.png", model: "tshirt" },
      { id: "ts-3", name: "V-Neck", image: "/templates/tshirt-3.png", model: "tshirt" },
      { id: "ts-4", name: "Long Sleeve", image: "/templates/tshirt-4.png", model: "tshirt" },
    ],
  },
  {
    id: "mugs",
    name: "Mugs",
    templates: [
      { id: "mg-1", name: "Standard White", image: "/templates/mug-1.png", model: "mug" },
      { id: "mg-2", name: "Colored Handle", image: "/templates/mug-2.png", model: "mug" },
      { id: "mg-3", name: "Travel Mug", image: "/templates/mug-3.png", model: "mug" },
      { id: "mg-4", name: "Magic Mug", image: "/templates/mug-4.png", model: "mug" },
    ],
  },
]

export default function CustomizePage() {
  const [logo, setLogo] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

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

    setIsUploading(true)

    // Create a URL for the uploaded image
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const result = reader.result as string
        setLogo(result)
        // Save to localStorage
        localStorage.setItem("userLogo", result)
      } catch (error) {
        console.error("Error saving to localStorage:", error)
      } finally {
        setIsUploading(false)
      }
    }
    reader.onerror = () => {
      console.error("Error reading file")
      setIsUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const removeLogo = () => {
    setLogo(null)
    // Remove from localStorage
    try {
      localStorage.removeItem("userLogo")
    } catch (error) {
      console.error("Error removing from localStorage:", error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Customize Your Products</h1>

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
              <TabsList className="grid grid-cols-3">
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
                      <ProductTemplate3D key={template.id} template={template} logo={logo} />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}
