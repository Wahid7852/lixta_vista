"use client"

import { useState, useRef, Suspense, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html, Text } from "@react-three/drei"
import * as THREE from "three"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Plus, Minus, Package } from "lucide-react"

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
  productColor: string
  onProductSelect?: (product: any) => void
  isSelected?: boolean
}

const placementOptions = {
  "business-card": [
    { value: "front-center", label: "Front Center" },
    { value: "front-top-left", label: "Front Top Left" },
    { value: "front-top-right", label: "Front Top Right" },
    { value: "front-bottom-left", label: "Front Bottom Left" },
    { value: "front-bottom-right", label: "Front Bottom Right" },
    { value: "back-center", label: "Back Center" },
    { value: "back-top-left", label: "Back Top Left" },
    { value: "back-top-right", label: "Back Top Right" },
  ],
  tshirt: [
    { value: "front-center", label: "Front Center" },
    { value: "front-top-left", label: "Front Top Left" },
    { value: "front-top-right", label: "Front Top Right" },
    { value: "left-sleeve", label: "Left Sleeve" },
    { value: "right-sleeve", label: "Right Sleeve" },
    { value: "back-center", label: "Back Center" },
    { value: "back-top", label: "Back Top" },
    { value: "back-bottom", label: "Back Bottom" },
  ],
}

// Position mappings for different placements
const getLogoPosition = (placement: string, productType: string) => {
  const positions = {
    "front-center": { x: 0, y: 0, z: 0, side: "front" },
    "front-top-left": { x: -0.5, y: 0.5, z: 0, side: "front" },
    "front-top-right": { x: 0.5, y: 0.5, z: 0, side: "front" },
    "front-bottom-left": { x: -0.5, y: -0.5, z: 0, side: "front" },
    "front-bottom-right": { x: 0.5, y: -0.5, z: 0, side: "front" },
    "back-center": { x: 0, y: 0, z: 0, side: "back" },
    "back-top-left": { x: -0.5, y: 0.5, z: 0, side: "back" },
    "back-top-right": { x: 0.5, y: 0.5, z: 0, side: "back" },
    "back-bottom-left": { x: -0.5, y: -0.5, z: 0, side: "back" },
    "back-bottom-right": { x: 0.5, y: -0.5, z: 0, side: "back" },
  } as const;
  const positionsTshirt = {
    "front-center": { x: 0, y: 0.2, z: 0.05, side: "front" },
    "front-top-left": { x: -0.4, y: 0.4, z: 0.05, side: "front" },
    "front-top-right": { x: 0.4, y: 0.4, z: 0.05, side: "front" },
    "left-sleeve": { x: -0.6, y: 0.1, z: 0.05, side: "front" },
    "right-sleeve": { x: 0.6, y: 0.1, z: 0.05, side: "front" },
    "back-center": { x: 0, y: -0.2, z: 0.05, side: "back" },
    "back-top": { x: 0, y: -0.1, z: 0.05, side: "back" },
    "back-bottom": { x: 0, y: -0.3, z: 0.05, side: "back" },
  } as const;

  const positionKey = `${productType}-${placement}` as keyof typeof positions;

  return (
    positions[positionKey] || {
      x: 0,
      y: 0,
      z: 0.08,
      side: "front",
    }
  );
}

// Business Card with proper front/back rendering
function BusinessCard({ template, logo, logoPlacement, logoSize, productColor, isHighlighted, currentView }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  const logoPosition = getLogoPosition(logoPlacement, "business-card")

  // Create card texture
  const cardTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 1024
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.fillStyle = productColor
      ctx.fillRect(0, 0, 1024, 1024)

      // Add texture pattern
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * 1024
        const y = Math.random() * 1024
        ctx.fillRect(x, y, 2, 2)
      }

      // Fancy corner patterns
      ctx.strokeStyle = productColor === "#2c2c2c" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)"
      ctx.lineWidth = 3

      // Corners
      ctx.beginPath()
      ctx.moveTo(50, 50)
      ctx.lineTo(150, 50)
      ctx.moveTo(50, 50)
      ctx.lineTo(50, 150)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(974, 974)
      ctx.lineTo(874, 974)
      ctx.moveTo(974, 974)
      ctx.lineTo(974, 874)
      ctx.stroke()

      if (productColor === "#ffd700") {
        ctx.fillStyle = "#ffed4e"
        ctx.fillRect(0, 0, 1024, 15)
        ctx.fillRect(0, 1009, 1024, 15)
      }
    }
    return new THREE.CanvasTexture(canvas)
  }, [productColor])

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

  // Create logo texture
  const logoTexture = useMemo(() => {
    if (logo) {
      const loader = new THREE.TextureLoader()
      const tex = loader.load(logo)
      tex.flipY = false
      return tex
    }
    return null
  }, [logo])

  // Determine if logo should be visible based on current view and placement
  const shouldShowLogo = () => {
    if (!logo || !logoTexture) return false
    return true
  }

  return (
    <group position={[0, 0, 0]}>
      {/* Main card body */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[3.5, 0.1, 2]} />
        <meshBasicMaterial map={cardTexture} />
      </mesh>

      {/* Logo - only render if it should be visible */}
      {shouldShowLogo() && (
        <mesh position={[logoPosition.x, logoPosition.y, logoPosition.z]} renderOrder={1}>
          <planeGeometry args={[logoSize / 23, logoSize / 23]} />
          <meshBasicMaterial
            map={logoTexture}
            transparent={true}
            alphaTest={0.1}
            depthTest={false}
            depthWrite={false}
          />
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

// T-Shirt with proper front/back rendering
function TShirt({ template, logo, logoPlacement, logoSize, productColor, isHighlighted, currentView }: any) {
  const groupRef = useRef<THREE.Group>(null)

  const logoPosition = getLogoPosition(logoPlacement, "tshirt")

  const fabricTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.fillStyle = productColor
      ctx.fillRect(0, 0, 256, 256)

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
  }, [productColor])

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

  const tshirtShape = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-0.7, -1.2)
    shape.lineTo(0.7, -1.2)
    shape.lineTo(0.6, 0.4)
    shape.lineTo(1.0, 0.5)
    shape.lineTo(0.9, 0.7)
    shape.lineTo(0.4, 0.6)
    shape.lineTo(0.2, 0.9)
    shape.quadraticCurveTo(0, 0.95, -0.2, 0.9)
    shape.lineTo(-0.4, 0.6)
    shape.lineTo(-0.9, 0.7)
    shape.lineTo(-1.0, 0.5)
    shape.lineTo(-0.6, 0.4)
    shape.lineTo(-0.7, -1.2)
    return shape
  }, [])

  // Create logo texture
  const logoTexture = useMemo(() => {
    if (logo) {
      const loader = new THREE.TextureLoader()
      const tex = loader.load(logo)
      tex.flipY = false
      return tex
    }
    return null
  }, [logo])

  // Determine if logo should be visible based on current view and placement
  const shouldShowLogo = () => {
    if (!logo || !logoTexture) return false
    return true
  }

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
        <meshBasicMaterial color={productColor} side={THREE.DoubleSide} />
      </mesh>

      {/* Logo - only render if it should be visible */}
      {shouldShowLogo() && (
        <mesh
          position={[logoPosition.x, logoPosition.y, logoPosition.z]}
          scale={[logoSize / 35, logoSize / 35, 1]}
          renderOrder={1}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={logoTexture}
            transparent={true}
            alphaTest={0.1}
            depthTest={false}
            depthWrite={false}
          />
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

export default function ProductTemplate3D({
  template,
  logo,
  productColor,
  onProductSelect,
  isSelected,
}: ProductTemplate3DProps) {
  const [logoPlacement, setLogoPlacement] = useState("front-center")
  const [logoSize, setLogoSize] = useState(30)
  const [quantity, setQuantity] = useState(100) // Minimum 100
  const [currentView, setCurrentView] = useState("front")

  const handleProductSelect = () => {
    if (onProductSelect) {
      onProductSelect({
        ...template,
        quantity,
        logoPlacement,
        logoSize,
        productColor,
        hasLogo: !!logo,
        moq: quantity,
      })
    }
  }

  const currentPlacements =
    placementOptions[template.model as keyof typeof placementOptions] || placementOptions["business-card"]

  const renderModel = () => {
    const props = {
      template,
      logo,
      logoPlacement,
      logoSize,
      productColor,
      isHighlighted: isSelected,
      currentView,
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

          {logo && (
            <div className="absolute top-2 left-2 z-10">
              <Badge className="bg-green-600">Logo Applied</Badge>
            </div>
          )}

          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <color attach="background" args={[template.model === "tshirt" ? "#aaaaaa" : "#f0f0f0"]} />
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

          {/* MOQ Display */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">MOQ: {quantity} pieces</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" onClick={() => setQuantity(Math.max(100, quantity - 50))}>
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-16 text-center text-sm">{quantity}</span>
              <Button size="sm" variant="outline" onClick={() => setQuantity(quantity + 50)}>
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {logo && (
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <p className="text-green-800 text-sm font-medium">✓ Logo Applied Successfully</p>
                <p className="text-green-600 text-xs">Customize placement and size below</p>
              </div>

              {/* Logo Placement */}
              <div className="space-y-2">
                <label className="text-xs text-gray-500 font-medium">Logo Placement</label>
                <Select value={logoPlacement} onValueChange={setLogoPlacement}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currentPlacements.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Logo Size */}
              <div className="space-y-2">
                <label className="text-xs text-gray-500 font-medium">Logo Size</label>
                <Select value={logoSize.toString()} onValueChange={(value) => setLogoSize(Number.parseInt(value))}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">Small (20%)</SelectItem>
                    <SelectItem value="30">Medium (30%)</SelectItem>
                    <SelectItem value="40">Large (40%)</SelectItem>
                    <SelectItem value="50">Extra Large (50%)</SelectItem>
                  </SelectContent>
                </Select>
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
