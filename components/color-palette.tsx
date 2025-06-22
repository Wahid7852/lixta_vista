"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette } from "lucide-react"

interface ColorPaletteProps {
  onColorChange: (color: string) => void
  selectedColor: string
  productType: string
}

const colorPalettes = {
  "business-card": [
    { name: "Classic White", value: "#ffffff" },
    { name: "Cream", value: "#f5f5dc" },
    { name: "Light Gray", value: "#d3d3d3" },
    { name: "Executive Black", value: "#2c2c2c" },
    { name: "Navy Blue", value: "#1e3a8a" },
    { name: "Royal Blue", value: "#4169e1" },
    { name: "Luxury Gold", value: "#ffd700" },
    { name: "Silver", value: "#c0c0c0" },
    { name: "Deep Red", value: "#8b0000" },
    { name: "Forest Green", value: "#228b22" },
    { name: "Purple", value: "#800080" },
    { name: "Burgundy", value: "#800020" },
  ],
  tshirt: [
    { name: "Classic White", value: "#ffffff" },
    { name: "Black", value: "#000000" },
    { name: "Vibrant Red", value: "#dc2626" },
    { name: "Ocean Blue", value: "#0ea5e9" },
    { name: "Forest Green", value: "#16a34a" },
    { name: "Purple", value: "#9333ea" },
    { name: "Orange", value: "#ea580c" },
    { name: "Pink", value: "#ec4899" },
    { name: "Yellow", value: "#eab308" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Gray", value: "#6b7280" },
    { name: "Navy", value: "#1e40af" },
  ],
}

export default function ColorPalette({ onColorChange, selectedColor, productType }: ColorPaletteProps) {
  const currentPalette = colorPalettes[productType as keyof typeof colorPalettes] || colorPalettes["business-card"]

  const handleColorSelect = (color: string) => {
    onColorChange(color)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Palette className="h-5 w-5 mr-2" />
          Standard Colors
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Standard Colors */}
        <div>
          <h4 className="text-sm font-medium mb-3">Available Colors</h4>
          <div className="grid grid-cols-4 gap-2">
            {currentPalette.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorSelect(color.value)}
                className={`relative w-12 h-12 rounded-lg border-2 transition-all hover:scale-105 ${
                  selectedColor === color.value ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {selectedColor === color.value && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full border border-gray-300" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Color Info */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Selected Color</p>
              <p className="text-xs text-gray-500">
                {currentPalette.find((c) => c.value === selectedColor)?.name || "Custom Color"}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded border-2 border-gray-200" style={{ backgroundColor: selectedColor }} />
              <Badge variant="secondary" className="text-xs">
                {selectedColor.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>

        {/* Custom Color Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-blue-800 text-sm font-medium">Need a Custom Color?</p>
          <p className="text-blue-600 text-xs mt-1">
            Mention your preferred color (with hex code or color name) in the remarks section when generating your
            quotation.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
