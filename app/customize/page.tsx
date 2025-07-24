"use client"

import { useState } from "react"
import { FileText, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import QuotationGenerator from "@/components/quotation-generator"
import ColorPalette from "@/components/color-palette"
import MultiLogoUpload from "@/components/multi-logo-upload"
import SimpleLogoSelector from "@/components/simple-logo-selector"
import TermsAndConditions from "@/components/terms-and-conditions"
import SampleRequest from "@/components/sample-request"
import GoToTop from "@/components/go-to-top"

export const fetchCache = "force-no-store";

const RealisticTshirt3D = dynamic(
  () => import("@/components/realistic-tshirt-3d"),
  {
    ssr: false,
  }
);

interface LogoItem {
  id: string
  name: string
  url: string
}

interface LogoConfig {
  logoId: string
  size: number
  rotation: number
}

export default function CustomizePage() {
  const [logos, setLogos] = useState<LogoItem[]>([])
  const [productColor, setProductColor] = useState("#ffffff")
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [logoConfigs, setLogoConfigs] = useState<Record<string, LogoConfig>>({})
  const [showQuotation, setShowQuotation] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [activeTab, setActiveTab] = useState("design")

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

  const canProceed = () => {
    return isDesignComplete() && termsAccepted
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
            <p className="text-xl text-gray-600">Bulk orders only - MOQ 100 pieces</p>
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

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Terms accepted</span>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          termsAccepted ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {termsAccepted ? "✓" : "✗"}
                      </div>
                    </div>
                  </div>

                  {canProceed() ? (
                    <div className="space-y-3">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                        <div className="text-2xl mb-2">🎉</div>
                        <p className="text-green-800 font-semibold">Ready to Proceed!</p>
                        <p className="text-green-600 text-sm">Get your quote or request a sample</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                          onClick={() => setShowQuotation(true)}
                          size="sm"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Get Quote
                        </Button>
                        <Button variant="outline" onClick={() => setActiveTab("sample")} size="sm">
                          <Package className="h-4 w-4 mr-1" />
                          Sample
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="text-2xl mb-2">👆</div>
                      <p className="text-blue-800 font-medium">Complete all steps</p>
                      <p className="text-blue-600 text-sm">Design, configure, and accept terms</p>
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
                    <RealisticTshirt3D
                      logos={logos}
                      productColor={productColor}
                      selectedLocations={selectedLocations}
                      logoConfigs={logoConfigs}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Tabs for Design, Terms, and Sample */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="design">Design & Configure</TabsTrigger>
                  <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
                  <TabsTrigger value="sample">Request Sample</TabsTrigger>
                </TabsList>

                <TabsContent value="design" className="mt-6">
                  <SimpleLogoSelector
                    logos={logos}
                    selectedLocations={selectedLocations}
                    logoConfigs={logoConfigs}
                    onLocationChange={handleLocationChange}
                    onLogoConfigChange={handleLogoConfigChange}
                  />
                </TabsContent>

                <TabsContent value="terms" className="mt-6">
                  <TermsAndConditions onAccept={setTermsAccepted} isRequired={true} />
                </TabsContent>

                <TabsContent value="sample" className="mt-6">
                  {isDesignComplete() ? (
                    <SampleRequest
                      productType="tshirt"
                      onRequestSubmit={(data) => {
                        console.log("Sample request:", data)
                        // Handle sample request submission
                      }}
                    />
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Complete Your Design First</h3>
                        <p className="text-gray-600">
                          Upload logos and configure placements before requesting a sample
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
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
