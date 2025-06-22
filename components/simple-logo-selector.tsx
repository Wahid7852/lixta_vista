"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Check, RotateCw } from "lucide-react"

interface LogoItem {
  id: string
  name: string
  url: string
}

interface LogoConfig {
  logoId: string
  size: number
  rotation: number // z-axis rotation in degrees
}

interface SimpleLogoSelectorProps {
  logos: LogoItem[]
  selectedLocations: string[]
  logoConfigs: Record<string, LogoConfig>
  onLocationChange: (locations: string[]) => void
  onLogoConfigChange: (locationId: string, config: LogoConfig) => void
}

const logoLocations = [
  {
    id: "front-center",
    label: "Front Center",
    description: "Main logo position",
    icon: "🎯",
    popular: true,
  },
  {
    id: "front-left-chest",
    label: "Left Chest",
    description: "Small logo on left chest",
    icon: "📍",
    popular: true,
  },
  {
    id: "front-right-chest",
    label: "Right Chest",
    description: "Small logo on right chest",
    icon: "📍",
    popular: false,
  },
  {
    id: "back-center",
    label: "Back Center",
    description: "Large logo on back",
    icon: "🔄",
    popular: true,
  },
  {
    id: "left-sleeve",
    label: "Left Sleeve",
    description: "Logo on left sleeve",
    icon: "💪",
    popular: false,
  },
  {
    id: "right-sleeve",
    label: "Right Sleeve",
    description: "Logo on right sleeve",
    icon: "💪",
    popular: false,
  },
]

export default function SimpleLogoSelector({
  logos,
  selectedLocations,
  logoConfigs,
  onLocationChange,
  onLogoConfigChange,
}: SimpleLogoSelectorProps) {
  const [activeStep, setActiveStep] = useState<"locations" | "logos" | "sizes">("locations")

  const handleLocationToggle = (locationId: string) => {
    const newLocations = selectedLocations.includes(locationId)
      ? selectedLocations.filter((id) => id !== locationId)
      : [...selectedLocations, locationId]

    onLocationChange(newLocations)

    // Only create default config if adding location and no config exists
    if (!selectedLocations.includes(locationId) && logos.length > 0 && !logoConfigs[locationId]) {
      onLogoConfigChange(locationId, {
        logoId: logos[0].id,
        size: locationId.includes("chest") || locationId.includes("sleeve") ? 20 : 35,
        rotation: 0,
      })
    }
  }

  const handleLogoChange = (locationId: string, logoId: string) => {
    const currentConfig = logoConfigs[locationId] || {
      logoId: logos[0]?.id || "",
      size: locationId.includes("chest") || locationId.includes("sleeve") ? 20 : 35,
      rotation: 0,
    }
    onLogoConfigChange(locationId, {
      ...currentConfig,
      logoId,
    })
  }

  const handleSizeChange = (locationId: string, size: number) => {
    const currentConfig = logoConfigs[locationId] || {
      logoId: logos[0]?.id || "",
      size: 30,
      rotation: 0,
    }
    onLogoConfigChange(locationId, {
      ...currentConfig,
      size,
    })
  }

  const handleRotationChange = (locationId: string, rotation: number) => {
    const currentConfig = logoConfigs[locationId] || {
      logoId: logos[0]?.id || "",
      size: 30,
      rotation: 0,
    }
    onLogoConfigChange(locationId, {
      ...currentConfig,
      rotation,
    })
  }

  const getStepStatus = (step: string) => {
    switch (step) {
      case "locations":
        return selectedLocations.length > 0 ? "complete" : "active"
      case "logos":
        return selectedLocations.length > 0 && selectedLocations.every((id) => logoConfigs[id]?.logoId)
          ? "complete"
          : selectedLocations.length > 0
            ? "active"
            : "pending"
      case "sizes":
        return selectedLocations.length > 0 && selectedLocations.every((id) => logoConfigs[id]?.size)
          ? "complete"
          : selectedLocations.length > 0 && selectedLocations.every((id) => logoConfigs[id]?.logoId)
            ? "active"
            : "pending"
      default:
        return "pending"
    }
  }

  if (logos.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">📤</div>
          <h3 className="text-lg font-semibold mb-2">Upload Your Logos First</h3>
          <p className="text-gray-600">Add your logos using the upload section on the left to get started</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[
          { key: "locations", label: "1. Pick Spots", icon: "📍" },
          { key: "logos", label: "2. Choose Logos", icon: "🎨" },
          { key: "sizes", label: "3. Adjust & Rotate", icon: "📏" },
        ].map((step, index) => {
          const status = getStepStatus(step.key)
          return (
            <div key={step.key} className="flex items-center">
              <div
                className={`flex items-center space-x-2 px-4 py-2 rounded-full cursor-pointer transition-all ${
                  status === "complete"
                    ? "bg-green-100 text-green-800"
                    : status === "active"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-500"
                }`}
                onClick={() => setActiveStep(step.key as any)}
              >
                <span className="text-lg">{status === "complete" ? "✅" : step.icon}</span>
                <span className="font-medium text-sm">{step.label}</span>
              </div>
              {index < 2 && (
                <div className={`w-8 h-0.5 mx-2 ${status === "complete" ? "bg-green-300" : "bg-gray-300"}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* Step 1: Location Selection */}
      {activeStep === "locations" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center">📍 Where do you want your logos?</CardTitle>
            <p className="text-gray-600">Click on the spots where you want to place your logos</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {logoLocations.map((location) => {
                const isSelected = selectedLocations.includes(location.id)
                return (
                  <div
                    key={location.id}
                    onClick={() => handleLocationToggle(location.id)}
                    className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                      isSelected ? "border-blue-500 bg-blue-50 shadow-lg" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {location.popular && (
                      <Badge className="absolute -top-2 -right-2 bg-orange-500 text-xs">Popular</Badge>
                    )}

                    {isSelected && (
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}

                    <div className="text-center">
                      <div className="text-4xl mb-3">{location.icon}</div>
                      <h3 className="font-semibold text-sm mb-1">{location.label}</h3>
                      <p className="text-xs text-gray-600">{location.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {selectedLocations.length > 0 && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">
                  ✅ Great! You selected {selectedLocations.length} spot{selectedLocations.length > 1 ? "s" : ""}
                </p>
                <Button className="mt-2" onClick={() => setActiveStep("logos")}>
                  Next: Choose Your Logos →
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 2: Logo Assignment */}
      {activeStep === "logos" && selectedLocations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center">🎨 Which logo goes where?</CardTitle>
            <p className="text-gray-600">Pick a different logo for each spot (or use the same one)</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedLocations.map((locationId) => {
              const location = logoLocations.find((l) => l.id === locationId)
              const config = logoConfigs[locationId]

              return (
                <div key={locationId} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3 flex items-center">
                    {location?.icon} {location?.label}
                    <Badge variant="outline" className="ml-2 text-xs">
                      {location?.description}
                    </Badge>
                    {config?.logoId && (
                      <Badge className="ml-2 bg-green-100 text-green-800 text-xs">
                        {logos.find((l) => l.id === config.logoId)?.name}
                      </Badge>
                    )}
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {logos.map((logo) => {
                      const isSelected = config?.logoId === logo.id
                      return (
                        <div
                          key={logo.id}
                          onClick={() => handleLogoChange(locationId, logo.id)}
                          className={`relative p-3 border-2 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                            isSelected
                              ? "border-blue-500 bg-blue-50 shadow-lg"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}

                          <div className="aspect-square bg-gray-50 rounded mb-2 relative">
                            <Image
                              src={logo.url || "/placeholder.svg"}
                              alt={logo.name}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                          <p className="text-xs font-medium text-center truncate">{logo.name}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {selectedLocations.every((id) => logoConfigs[id]?.logoId) && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">✅ Perfect! All spots have logos assigned</p>
                <div className="text-green-600 text-sm mt-2">
                  {selectedLocations.map((locationId) => {
                    const location = logoLocations.find((l) => l.id === locationId)
                    const config = logoConfigs[locationId]
                    const selectedLogo = logos.find((l) => l.id === config?.logoId)
                    return (
                      <div key={locationId} className="flex items-center justify-between py-1">
                        <span>
                          {location?.icon} {location?.label}:
                        </span>
                        <span className="font-medium">{selectedLogo?.name}</span>
                      </div>
                    )
                  })}
                </div>
                <Button className="mt-3" onClick={() => setActiveStep("sizes")}>
                  Next: Adjust Sizes & Rotation →
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Size & Rotation Adjustment */}
      {activeStep === "sizes" && selectedLocations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center">📏 Perfect Your Logo Placement</CardTitle>
            <p className="text-gray-600">Adjust size and rotation for each logo</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedLocations.map((locationId) => {
              const location = logoLocations.find((l) => l.id === locationId)
              const config = logoConfigs[locationId]
              const selectedLogo = logos.find((l) => l.id === config?.logoId)

              return (
                <div key={locationId} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-50 rounded relative">
                        {selectedLogo && (
                          <Image
                            src={selectedLogo.url || "/placeholder.svg"}
                            alt={selectedLogo.name}
                            fill
                            className="object-contain p-1"
                            style={{
                              transform: `rotate(${config?.rotation || 0}deg)`,
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold flex items-center">
                          {location?.icon} {location?.label}
                        </h3>
                        <p className="text-sm text-gray-600">{selectedLogo?.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-lg font-bold mb-1">
                        {config?.size || 30}%
                      </Badge>
                      <div className="text-xs text-gray-500 flex items-center">
                        <RotateCw className="w-3 h-3 mr-1" />
                        {config?.rotation || 0}°
                      </div>
                    </div>
                  </div>

                  {/* Size Control */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Size</span>
                        <span>{config?.size || 30}%</span>
                      </div>
                      <Slider
                        value={[config?.size || 30]}
                        onValueChange={(value) => handleSizeChange(locationId, value[0])}
                        min={10}
                        max={60}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Small (10%)</span>
                        <span>Large (60%)</span>
                      </div>
                    </div>

                    {/* Rotation Control */}
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span className="flex items-center">
                          <RotateCw className="w-4 h-4 mr-1" />
                          Rotation
                        </span>
                        <span>{config?.rotation || 0}°</span>
                      </div>
                      <Slider
                        value={[config?.rotation || 0]}
                        onValueChange={(value) => handleRotationChange(locationId, value[0])}
                        min={-180}
                        max={180}
                        step={15}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>-180°</span>
                        <span>0°</span>
                        <span>180°</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">🎉 Your T-shirt design is complete!</p>
              <p className="text-green-600 text-sm mt-1">
                You can now generate a quotation or continue tweaking the settings
              </p>
              <div className="mt-3 space-y-1 text-xs text-green-700">
                {selectedLocations.map((locationId) => {
                  const location = logoLocations.find((l) => l.id === locationId)
                  const config = logoConfigs[locationId]
                  const selectedLogo = logos.find((l) => l.id === config?.logoId)
                  return (
                    <div key={locationId} className="flex justify-between">
                      <span>
                        {location?.icon} {location?.label}:
                      </span>
                      <span>
                        {selectedLogo?.name} ({config?.size}%, {config?.rotation}°)
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      {selectedLocations.length > 0 && (
        <div className="flex justify-center space-x-3">
          <Button variant="outline" onClick={() => setActiveStep("locations")} className="flex items-center">
            📍 Change Spots
          </Button>
          <Button variant="outline" onClick={() => setActiveStep("logos")} className="flex items-center">
            🎨 Change Logos
          </Button>
          <Button variant="outline" onClick={() => setActiveStep("sizes")} className="flex items-center">
            📏 Adjust & Rotate
          </Button>
        </div>
      )}
    </div>
  )
}
