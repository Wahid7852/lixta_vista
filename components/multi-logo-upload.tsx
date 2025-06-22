"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Upload, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LogoItem {
  id: string
  name: string
  url: string
}

interface MultiLogoUploadProps {
  onLogosChange: (logos: LogoItem[]) => void
}

export default function MultiLogoUpload({ onLogosChange }: MultiLogoUploadProps) {
  const [logos, setLogos] = useState<LogoItem[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Load logos from localStorage on component mount
  useEffect(() => {
    try {
      const savedLogos = localStorage.getItem("userLogos")
      if (savedLogos) {
        const parsedLogos = JSON.parse(savedLogos)
        setLogos(parsedLogos)
        onLogosChange(parsedLogos)
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [onLogosChange])

  // Save logos to localStorage whenever logos change
  useEffect(() => {
    try {
      localStorage.setItem("userLogos", JSON.stringify(logos))
      onLogosChange(logos)
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }, [logos, onLogosChange])

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadError(null)

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload a valid image file (PNG, JPG, SVG)")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size must be less than 5MB")
      return
    }

    setIsUploading(true)

    const reader = new FileReader()
    reader.onload = () => {
      try {
        const result = reader.result as string

        const img = new window.Image()
        img.onload = () => {
          const newLogo: LogoItem = {
            id: `logo-${Date.now()}`,
            name: file.name.split(".")[0] || `Logo ${logos.length + 1}`,
            url: result,
          }

          setLogos((prev) => [...prev, newLogo])
          setIsUploading(false)
        }
        img.onerror = () => {
          setUploadError("Error loading image. Please try a different file.")
          setIsUploading(false)
        }
        img.src = result
      } catch (error) {
        setUploadError("Error processing image. Please try again.")
        setIsUploading(false)
      }
    }
    reader.onerror = () => {
      setUploadError("Error reading file. Please try again.")
      setIsUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const removeLogo = (logoId: string) => {
    setLogos((prev) => prev.filter((logo) => logo.id !== logoId))
  }

  const updateLogoName = (logoId: string, newName: string) => {
    setLogos((prev) => prev.map((logo) => (logo.id === logoId ? { ...logo, name: newName } : logo)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Logos</CardTitle>
        <p className="text-sm text-gray-600">Upload multiple logos to use on different placements</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Section */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Add a logo</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, or SVG (max 5MB)</p>
          </div>

          {uploadError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm">
              {uploadError}
            </div>
          )}

          <div>
            <input type="file" id="logo-upload" accept="image/*" className="sr-only" onChange={handleLogoUpload} />
            <Button
              className="w-full"
              disabled={isUploading}
              onClick={() => document.getElementById("logo-upload")?.click()}
            >
              <Plus className="h-4 w-4 mr-2" />
              {isUploading ? "Uploading..." : "Add Logo"}
            </Button>
          </div>
        </div>

        {/* Logos List */}
        {logos.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium text-sm">Uploaded Logos ({logos.length})</h3>
            {logos.map((logo) => (
              <div key={logo.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                {/* Logo Preview */}
                <div className="relative w-12 h-12 bg-gray-50 rounded border flex-shrink-0">
                  <Image src={logo.url || "/placeholder.svg"} alt={logo.name} fill className="object-contain rounded" />
                </div>

                {/* Logo Details */}
                <div className="flex-1">
                  <input
                    type="text"
                    value={logo.name}
                    onChange={(e) => updateLogoName(logo.id, e.target.value)}
                    className="font-medium text-sm bg-transparent border-none outline-none w-full"
                    placeholder="Logo name"
                  />
                  <p className="text-xs text-gray-500">Ready to use</p>
                </div>

                <Button size="sm" variant="ghost" onClick={() => removeLogo(logo.id)}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {logos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Upload className="mx-auto h-12 w-12 text-gray-300 mb-2" />
            <p className="text-sm">No logos uploaded yet</p>
            <p className="text-xs">Upload your first logo to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
