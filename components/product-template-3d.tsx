"use client"

import { useState, useRef, Suspense, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html, Text } from "@react-three/drei"
import * as THREE from "three"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Minus } from "lucide-react"

interface ProductTemplate3DProps {
  template: {
    id: string
    name: string
    image: string
    model: string
    basePrice: number
    color?: string
  }
  logo: string | null
  onProductSelect?: (product: any) => void
  isSelected?: boolean
}

// Fancy Business Card with proper texture and colors
function BusinessCard({ texture, logo, logoPosition, logoSize, isHighlighted, color = "#ffffff" }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Create logo texture if logo exists
  const logoTexture = useMemo(() => {
    if (logo) {
      const loader = new THREE.TextureLoader()
      const tex = loader.load(logo)
      tex.flipY = false
      return tex
    }
    return null
  }, [logo])

  // Create fancy card texture with proper colors
  const cardTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 1024
    const ctx = canvas.getContext("2d")
    if (ctx) {
      // Base color from template
      ctx.fillStyle = color
      ctx.fillRect(0, 0, 1024, 1024)

      // Add texture pattern
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * 1024
        const y = Math.random() * 1024
        ctx.fillRect(x, y, 2, 2)
      }

      // Fancy corner patterns
      ctx.strokeStyle = color === "#2c2c2c" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)"
      ctx.lineWidth = 3

      // Top left corner
      ctx.beginPath()
      ctx.moveTo(50, 50)
      ctx.lineTo(150, 50)
      ctx.moveTo(50, 50)
      ctx.lineTo(50, 150)
      ctx.stroke()

      // Bottom right corner
      ctx.beginPath()
      ctx.moveTo(974, 974)
      ctx.lineTo(874, 974)
      ctx.moveTo(974, 974)
      ctx.lineTo(974, 874)
      ctx.stroke()

      // Gold accent for luxury cards
      if (color === "#ffd700") {
        ctx.fillStyle = "#ffed4e"
        ctx.fillRect(0, 0, 1024, 15)
        ctx.fillRect(0, 1009, 1024, 15)
      }
    }
    return new THREE.CanvasTexture(canvas)
  }, [color])

  // Simple rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      if (isHighlighted) {
        meshRef.current.rotation.y = Math.sin(time * 1.5) * 0.2
      } else {
        meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.05
      }
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Main card body */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[3.5, 0.1, 2]} />
        <meshBasicMaterial map={cardTexture} />
      </mesh>

      {/* Logo */}
      {logo && logoTexture && (
        <mesh position={[(logoPosition.x / 50 - 1) * 1.5, 0.055, (logoPosition.y / 50 - 1) * 0.8]}>
          <planeGeometry args={[logoSize / 23, logoSize / 23]} />
          <meshBasicMaterial map={logoTexture} transparent={true} alphaTest={0.1} />
        </mesh>
      )}

      {isHighlighted && (
        <Text position={[0, 1.5, 0]} fontSize={0.25} color="#3b82f6" anchorX="center" anchorY="middle">
          SELECTED
        </Text>
      )}
    </group>
  )
}

// Colorful T-Shirt with texture
function TShirt({ texture, logo, logoPosition, logoSize, isHighlighted, color = "#dc2626" }: any) {
  const groupRef = useRef<THREE.Group>(null)

  // Create logo texture if logo exists
  const logoTexture = useMemo(() => {
    if (logo) {
      const loader = new THREE.TextureLoader()
      const tex = loader.load(logo)
      tex.flipY = false
      return tex
    }
    return null
  }, [logo])

  // Simple fabric texture with color
  const fabricTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext("2d")
    if (ctx) {
      // Base color
      ctx.fillStyle = color
      ctx.fillRect(0, 0, 256, 256)

      // Fabric texture
      for (let x = 0; x < 256; x += 4) {
        for (let y = 0; y < 256; y += 4) {
          const brightness = Math.random() * 0.1
          ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`
          ctx.fillRect(x, y, 2, 2)
        }
      }
    }
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 4)
    return texture
  }, [color])

  // Simple rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime()
      if (isHighlighted) {
        groupRef.current.rotation.y = Math.sin(time * 0.8) * 0.15
      } else {
        groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.03
      }
    }
  })

  // T-shirt shape
  const tshirtShape = useMemo(() => {
    const shape = new THREE.Shape()

    // T-shirt outline
    shape.moveTo(-0.7, -1.2) // Bottom left
    shape.lineTo(0.7, -1.2) // Bottom right
    shape.lineTo(0.6, 0.4) // Right side up to armpit

    // Right sleeve
    shape.lineTo(1.0, 0.5) // Right sleeve outer
    shape.lineTo(0.9, 0.7) // Right sleeve top
    shape.lineTo(0.4, 0.6) // Right sleeve inner

    // Neck
    shape.lineTo(0.2, 0.9) // Right neck
    shape.quadraticCurveTo(0, 0.95, -0.2, 0.9) // Neck curve

    // Left sleeve
    shape.lineTo(-0.4, 0.6) // Left sleeve inner
    shape.lineTo(-0.9, 0.7) // Left sleeve top
    shape.lineTo(-1.0, 0.5) // Left sleeve outer
    shape.lineTo(-0.6, 0.4) // Left side down to armpit

    shape.lineTo(-0.7, -1.2) // Back to start

    return shape
  }, [])

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[1.3, 1.3, 1.3]}>
      {/* Main T-shirt body */}
      <mesh position={[0, 0, 0]}>
        <extrudeGeometry
          args={[
            tshirtShape,
            {
              depth: 0.1,
              bevelEnabled: false,
            },
          ]}
        />
        <meshBasicMaterial map={fabricTexture} side={THREE.DoubleSide} />
      </mesh>

      {/* Collar */}
      <mesh position={[0, 0.85, 0.05]}>
        <ringGeometry args={[0.16, 0.22, 32]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>

      {/* Logo */}
      {logo && logoTexture && (
        <mesh
          position={[(logoPosition.x / 50 - 1) * 0.45, 0.2 + (logoPosition.y / 50 - 1) * 0.6, 0.06]}
          rotation={[0, 0, 0]}
          scale={[logoSize / 35, logoSize / 35, 1]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={logoTexture} transparent={true} alphaTest={0.1} />
        </mesh>
      )}

      {isHighlighted && (
        <Text position={[0, 1.8, 0]} fontSize={0.2} color="#3b82f6" anchorX="center" anchorY="middle">
          SELECTED
        </Text>
      )}
    </group>
  )
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2" />
        <p className="text-sm text-gray-600">Loading preview...</p>
      </div>
    </Html>
  )
}

export default function ProductTemplate3D({ template, logo, onProductSelect, isSelected }: ProductTemplate3DProps) {
  const [logoPosition, setLogoPosition] = useState({ x: 50, y: 50 })
  const [logoSize, setLogoSize] = useState(30)
  const [quantity, setQuantity] = useState(1)

  const handleHorizontalPosition = (value: number[]) => {
    if (value && value.length > 0) {
      setLogoPosition((prev) => ({ ...prev, x: value[0] }))
    }
  }

  const handleVerticalPosition = (value: number[]) => {
    if (value && value.length > 0) {
      setLogoPosition((prev) => ({ ...prev, y: value[0] }))
    }
  }

  const handleLogoSize = (value: number[]) => {
    if (value && value.length > 0) {
      setLogoSize(value[0])
    }
  }

  const handleProductSelect = () => {
    if (onProductSelect) {
      onProductSelect({
        ...template,
        quantity,
        logoPosition,
        logoSize,
        hasLogo: !!logo,
        totalPrice: (template.basePrice + (logo ? 50 : 0)) * quantity,
      })
    }
  }

  const renderModel = () => {
    const props = {
      texture: template.image,
      logo,
      logoPosition,
      logoSize,
      isHighlighted: isSelected,
      color: template.color,
    }

    try {
      switch (template.model) {
        case "business-card":
          return <BusinessCard {...props} />
        case "tshirt":
          return <TShirt {...props} />
        default:
          return <BusinessCard {...props} />
      }
    } catch (error) {
      console.error("Error rendering 3D model:", error)
      return <LoadingFallback />
    }
  }

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 ${isSelected ? "ring-2 ring-blue-500 shadow-lg" : ""}`}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] bg-gray-300">
          {isSelected && (
            <div className="absolute top-2 right-2 z-10">
              <Badge className="bg-blue-500">Selected</Badge>
            </div>
          )}

          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            {/* Background color based on product type */}
            <color attach="background" args={[template.model === "tshirt" ? "#aaaaaa" : "#f0f0f0"]} />

            {/* Simple ambient light - no shadows */}
            <ambientLight intensity={1.0} />

            <Suspense fallback={<LoadingFallback />}>
              {renderModel()}
              <OrbitControls
                enablePan={false}
                minDistance={3}
                maxDistance={10}
                autoRotate={false}
                enableDamping={true}
                dampingFactor={0.05}
              />
            </Suspense>
          </Canvas>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">{template.name}</h3>
            <div className="flex items-center space-x-2">
              <Checkbox checked={isSelected} onCheckedChange={handleProductSelect} id={`select-${template.id}`} />
              <label htmlFor={`select-${template.id}`} className="text-sm text-gray-600">
                Select
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-blue-600">₹{template.basePrice}</span>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button size="sm" variant="outline" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {logo && (
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Horizontal Position</span>
                  <span className="text-xs text-gray-500">{logoPosition.x}%</span>
                </div>
                <Slider value={[logoPosition.x]} min={10} max={90} step={1} onValueChange={handleHorizontalPosition} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Vertical Position</span>
                  <span className="text-xs text-gray-500">{logoPosition.y}%</span>
                </div>
                <Slider value={[logoPosition.y]} min={10} max={90} step={1} onValueChange={handleVerticalPosition} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Logo Size</span>
                  <span className="text-xs text-gray-500">{logoSize}%</span>
                </div>
                <Slider value={[logoSize]} min={10} max={60} step={1} onValueChange={handleLogoSize} />
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-4 pt-0">
        <Button variant="outline">Preview</Button>
        <div className="flex gap-2">
          <Button onClick={handleProductSelect} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add to Quote
          </Button>
          <Button>Customize</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
