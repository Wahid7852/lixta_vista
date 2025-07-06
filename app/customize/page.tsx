"use client"

import { useState } from "react"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import RealisticTShirt3D from "@/components/realistic-tshirt-3d"
import QuotationGenerator from "@/components/quotation-generator"
import ColorPalette from "@/components/color-palette"
import MultiLogoUpload from "@/components/multi-logo-upload"
import SimpleLogoSelector from "@/components/simple-logo-selector"
import GoToTop from "@/components/go-to-top"

interface LogoItem {
  id: string
  name: string
  url: string
}

interface LogoConfig {
  logoId: string
  size: number
}

export default function CustomizePage() {
  const [logos, setLogos] = useState<LogoItem[]>([])
  const [productColor, setProductColor] = useState("#ffffff")
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [logoConfigs, setLogoConfigs] = useState<Record<string, LogoConfig>>({})
  const [showQuotation, setShowQuotation] = useState(false)

  const handleLogoConfigChange = (locationId: string, config: LogoConfig) => {
    setLogoConfigs((prev) => ({
      ...prev,
      [locationId]: config,
    }))
  }

  const handleLocationChange = (locations: string[]) => {
    setSelectedLocations(locations)

    // Remove configs for unselected locations
    const newConfigs = { ...logoConfigs }
    Object.keys(newConfigs).forEach((locationId) => {
      if (!locations.includes(locationId)) {
        delete newConfigs[locationId]
      }
    })
    setLogoConfigs(newConfigs)
  }

  const isDesignComplete = () => {
    return (
      logos.length > 0 &&
      selectedLocations.length > 0 &&
      selectedLocations.every((locationId) => logoConfigs[locationId])
    )
  }

  const tshirtConfig = {
    logos,
    productColor,
    selectedLocations,
    logoConfigs,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Design Your Perfect T-Shirt
            </h1>
            <p className="text-xl text-gray-600">Simple, visual, and powerful - made for everyone</p>
          </div>

          <div className="grid lg:grid-cols-[400px,1fr] gap-8">
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Logo Upload Section */}
              <MultiLogoUpload onLogosChange={setLogos} />

              {/* Color Palette */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">🎨 T-Shirt Color</CardTitle>
                </CardHeader>
                <CardContent>
                  <ColorPalette onColorChange={setProductColor} selectedColor={productColor} productType="tshirt" />
                </CardContent>
              </Card>

              {/* Design Status & Action */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">📋 Your Design</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Logos uploaded</span>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          logos.length > 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {logos.length}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Placements configured</span>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          selectedLocations.length > 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {selectedLocations.length}
                      </div>
                    </div>
                  </div>

                  {isDesignComplete() ? (
                    <div className="space-y-3">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                        <div className="text-2xl mb-2">🎉</div>
                        <p className="text-green-800 font-semibold">Design Complete!</p>
                        <p className="text-green-600 text-sm">Ready to get your quote</p>
                      </div>
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
                        onClick={() => setShowQuotation(true)}
                        size="lg"
                      >
                        <FileText className="h-5 w-5 mr-2" />
                        Get My Quote Now
                      </Button>
                    </div>
                  ) : (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="text-2xl mb-2">👆</div>
                      <p className="text-blue-800 font-medium">Follow the steps below</p>
                      <p className="text-blue-600 text-sm">Upload logos and configure placements</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              {/* 3D Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    👕 Live Preview
                    <span className="ml-2 text-sm font-normal text-gray-500">(Drag to rotate)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-square">
                    <RealisticTShirt3D
                      logos={logos}
                      productColor={productColor}
                      selectedLocations={selectedLocations}
                      logoConfigs={logoConfigs}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Simple Logo Selector */}
              <SimpleLogoSelector
                logos={logos}
                selectedLocations={selectedLocations}
                logoConfigs={logoConfigs}
                onLocationChange={handleLocationChange}
                onLogoConfigChange={handleLogoConfigChange}
              />
            </div>
          </div>

          {/* Quotation Modal */}
          {showQuotation && <QuotationGenerator tshirtConfig={tshirtConfig} onClose={() => setShowQuotation(false)} />}

          {/* Go to Top Button */}
          <GoToTop />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
