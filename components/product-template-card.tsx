"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MoveHorizontal, MoveVertical, ZoomIn } from "lucide-react"

interface ProductTemplateCardProps {
  template: {
    id: string
    name: string
    image: string
  }
  logo: string | null
}

export default function ProductTemplateCard({ template, logo }: ProductTemplateCardProps) {
  const [logoPosition, setLogoPosition] = useState({ x: 50, y: 50 }) // percentage values
  const [logoSize, setLogoSize] = useState(30) // percentage of container

  const handleHorizontalPosition = (value: number[]) => {
    setLogoPosition((prev) => ({ ...prev, x: value[0] }))
  }

  const handleVerticalPosition = (value: number[]) => {
    setLogoPosition((prev) => ({ ...prev, y: value[0] }))
  }

  const handleLogoSize = (value: number[]) => {
    setLogoSize(value[0])
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] bg-gray-100">
          {/* Template Image */}
          <Image src={template.image || "/placeholder.svg"} alt={template.name} fill className="object-cover" />

          {/* Logo Overlay */}
          {logo && (
            <div
              className="absolute pointer-events-none"
              style={{
                top: `${logoPosition.y}%`,
                left: `${logoPosition.x}%`,
                transform: `translate(-50%, -50%)`,
                width: `${logoSize}%`,
                height: `${logoSize}%`,
              }}
            >
              <div className="relative w-full h-full">
                <Image src={logo || "/placeholder.svg"} alt="Your logo" fill className="object-contain" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-medium">{template.name}</h3>

          {logo && (
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center text-xs text-gray-500">
                          <MoveHorizontal className="h-3 w-3 mr-1" />
                          <span>Horizontal Position</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Move logo left or right</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span className="text-xs text-gray-500">{logoPosition.x}%</span>
                </div>
                <Slider
                  defaultValue={[logoPosition.x]}
                  min={10}
                  max={90}
                  step={1}
                  onValueChange={handleHorizontalPosition}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center text-xs text-gray-500">
                          <MoveVertical className="h-3 w-3 mr-1" />
                          <span>Vertical Position</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Move logo up or down</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span className="text-xs text-gray-500">{logoPosition.y}%</span>
                </div>
                <Slider
                  defaultValue={[logoPosition.y]}
                  min={10}
                  max={90}
                  step={1}
                  onValueChange={handleVerticalPosition}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center text-xs text-gray-500">
                          <ZoomIn className="h-3 w-3 mr-1" />
                          <span>Logo Size</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Adjust logo size</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span className="text-xs text-gray-500">{logoSize}%</span>
                </div>
                <Slider defaultValue={[logoSize]} min={10} max={60} step={1} onValueChange={handleLogoSize} />
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-4 pt-0">
        <Button variant="outline">Preview</Button>
        <Button>Customize</Button>
      </CardFooter>
    </Card>
  )
}
