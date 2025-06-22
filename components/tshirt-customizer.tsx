"use client"

import { useRef, Suspense, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html, Text } from "@react-three/drei"
import * as THREE from "three"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface LogoConfig {
  logoId: string
  size: number
}

interface TShirtCustomizerProps {
  logos: Array<{ id: string; name: string; url: string }>
  productColor: string
  selectedLocations: string[]
  logoConfigs: Record<string, LogoConfig>
  onLocationChange: (locations: string[]) => void
  onLogoConfigChange: (locationId: string, config: LogoConfig) => void
}

const logoLocations = [
  { id: "front-center", label: "Front Center", position: { x: 0, y: 0.2, z: 0.12 }, side: "front" },
  { id: "front-left-chest", label: "Front Left Chest", position: { x: -0.25, y: 0.4, z: 0.12 }, side: "front" },
  { id: "front-right-chest", label: "Front Right Chest", position: { x: 0.25, y: 0.4, z: 0.12 }, side: "front" },
  { id: "back-center", label: "Back Center", position: { x: 0, y: 0.2, z: -0.12 }, side: "back" },
  { id: "left-sleeve", label: "Left Sleeve", position: { x: -0.7, y: 0.5, z: 0.08 }, side: "front" },
  { id: "right-sleeve", label: "Right Sleeve", position: { x: 0.7, y: 0.5, z: 0.08 }, side: "front" },
]

// Realistic T-Shirt 3D Component
function RealisticTShirt({ logos, productColor, selectedLocations, logoConfigs }: any) {
  const groupRef = useRef<THREE.Group>(null)

  const fabricTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext("2d")
    if (ctx) {
      // Base color
      ctx.fillStyle = productColor
      ctx.fillRect(0, 0, 512, 512)

      // Fabric texture
      for (let x = 0; x < 512; x += 2) {
        for (let y = 0; y < 512; y += 2) {
          const brightness = Math.random() * 0.08
          ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`
          ctx.fillRect(x, y, 1, 1)
        }
      }

      // Subtle fabric weave pattern
      ctx.strokeStyle = `rgba(0, 0, 0, 0.02)`
      ctx.lineWidth = 0.5
      for (let i = 0; i < 512; i += 8) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, 512)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(512, i)
        ctx.stroke()
      }
    }
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(2, 2)
    return texture
  }, [productColor])

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime()
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.1
    }
  })

  // Enhanced T-shirt shape
  const tshirtShape = useMemo(() => {
    const shape = new THREE.Shape()

    // More realistic T-shirt silhouette
    shape.moveTo(-0.8, -1.3) // Bottom left
    shape.lineTo(0.8, -1.3) // Bottom right
    shape.lineTo(0.7, 0.3) // Right side up

    // Right sleeve
    shape.lineTo(1.1, 0.4) // Sleeve outer
    shape.lineTo(1.0, 0.8) // Sleeve top
    shape.lineTo(0.4, 0.7) // Sleeve inner

    // Neck area - more realistic curve
    shape.lineTo(0.25, 0.85)
    shape.bezierCurveTo(0.15, 0.95, -0.15, 0.95, -0.25, 0.85)

    // Left sleeve
    shape.lineTo(-0.4, 0.7)
    shape.lineTo(-1.0, 0.8)
    shape.lineTo(-1.1, 0.4)
    shape.lineTo(-0.7, 0.3)

    shape.lineTo(-0.8, -1.3) // Back to start

    return shape
  }, [])

  // Create logo textures
  const logoTextures = useMemo(() => {
    const textures: Record<string, THREE.Texture> = {}
    logos.forEach((logo: any) => {
      if (logo.url) {
        const loader = new THREE.TextureLoader()
        const tex = loader.load(logo.url)
        tex.flipY = false
        textures[logo.id] = tex
      }
    })
    return textures
  }, [logos])

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* Main T-shirt body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <extrudeGeometry
          args={[
            tshirtShape,
            {
              depth: 0.12,
              bevelEnabled: true,
              bevelThickness: 0.02,
              bevelSize: 0.01,
              bevelSegments: 8,
            },
          ]}
        />
        <meshStandardMaterial map={fabricTexture} side={THREE.DoubleSide} roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Enhanced collar */}
      <mesh position={[0, 0.88, 0.06]} castShadow>
        <ringGeometry args={[0.18, 0.25, 32]} />
        <meshStandardMaterial color={productColor} side={THREE.DoubleSide} roughness={0.9} />
      </mesh>

      {/* Collar inner */}
      <mesh position={[0, 0.88, 0.05]} castShadow>
        <ringGeometry args={[0.16, 0.19, 32]} />
        <meshStandardMaterial color={productColor} side={THREE.DoubleSide} roughness={0.9} />
      </mesh>

      {/* Logos based on selected locations */}
      {selectedLocations.map((locationId) => {
        const location = logoLocations.find((loc) => loc.id === locationId)
        const config = logoConfigs[locationId]
        if (!location || !config) return null

        const selectedLogo = logos.find((logo: any) => logo.id === config.logoId)
        const logoTexture = selectedLogo ? logoTextures[selectedLogo.id] : null

        if (!logoTexture) return null

        // Adjust position for back logos - flip X coordinate and use negative Z
        const position =
          location.side === "back"
            ? { x: -location.position.x, y: location.position.y, z: location.position.z }
            : location.position

        return (
          <mesh
            key={locationId}
            position={[position.x, position.y, position.z]}
            scale={[config.size / 100, config.size / 100, 1]}
            rotation={location.side === "back" ? [0, Math.PI, 0] : [0, 0, 0]}
            renderOrder={1}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={logoTexture} transparent={true} alphaTest={0.1} side={THREE.DoubleSide} />
          </mesh>
        )
      })}

      {/* Selection indicators */}
      {selectedLocations.length > 0 && (
        <Text position={[0, 1.8, 0]} fontSize={0.15} color="#3b82f6" anchorX="center" anchorY="middle">
          {selectedLocations.length} Logo{selectedLocations.length > 1 ? "s" : ""} Applied
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
        <p className="text-sm text-gray-600">Loading T-shirt preview...</p>
      </div>
    </Html>
  )
}

export default function TShirtCustomizer({
  logos,
  productColor,
  selectedLocations,
  logoConfigs,
  onLocationChange,
  onLogoConfigChange,
}: TShirtCustomizerProps) {
  const handleLocationToggle = (locationId: string) => {
    const newLocations = selectedLocations.includes(locationId)
      ? selectedLocations.filter((id) => id !== locationId)
      : [...selectedLocations, locationId]

    onLocationChange(newLocations)

    // If adding a location and no config exists, create default config
    if (!selectedLocations.includes(locationId) && logos.length > 0) {
      onLogoConfigChange(locationId, {
        logoId: logos[0].id,
        size: 30,
      })
    }
  }

  const handleLogoChange = (locationId: string, logoId: string) => {
    const currentConfig = logoConfigs[locationId] || { logoId: logos[0]?.id || "", size: 30 }
    onLogoConfigChange(locationId, {
      ...currentConfig,
      logoId,
    })
  }

  const handleSizeChange = (locationId: string, size: number) => {
    const currentConfig = logoConfigs[locationId] || { logoId: logos[0]?.id || "", size: 30 }
    onLogoConfigChange(locationId, {
      ...currentConfig,
      size,
    })
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* 3D Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">T-Shirt Preview</CardTitle>
          <p className="text-sm text-gray-600">Rotate to see front and back</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200">
            <Canvas camera={{ position: [0, 0, 4], fov: 50 }} shadows>
              <color attach="background" args={["#f8fafc"]} />

              {/* Enhanced lighting */}
              <ambientLight intensity={0.6} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <pointLight position={[-10, -10, -5]} intensity={0.3} />

              <Suspense fallback={<LoadingFallback />}>
                <RealisticTShirt
                  logos={logos}
                  productColor={productColor}
                  selectedLocations={selectedLocations}
                  logoConfigs={logoConfigs}
                />
                <OrbitControls
                  enablePan={false}
                  minDistance={2.5}
                  maxDistance={6}
                  autoRotate={false}
                  enableDamping={true}
                  dampingFactor={0.05}
                  maxPolarAngle={Math.PI / 1.8}
                  minPolarAngle={Math.PI / 4}
                />
              </Suspense>
            </Canvas>
          </div>
        </CardContent>
      </Card>

      {/* Logo Placement Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Logo Placement & Customization</CardTitle>
          <p className="text-sm text-gray-600">Choose locations and customize each logo</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {logos.length === 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <p className="text-amber-800 text-sm">Upload your logos first to see placement options</p>
            </div>
          )}

          <div className="space-y-4">
            {logoLocations.map((location) => {
              const isSelected = selectedLocations.includes(location.id)
              const config = logoConfigs[location.id]

              return (
                <div key={location.id} className="border rounded-lg p-4 space-y-3">
                  {/* Location Selection */}
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={location.id}
                      checked={isSelected}
                      onCheckedChange={() => handleLocationToggle(location.id)}
                      disabled={logos.length === 0}
                    />
                    <Label
                      htmlFor={location.id}
                      className={`text-sm font-medium ${logos.length === 0 ? "text-gray-400" : "text-gray-700 cursor-pointer"}`}
                    >
                      {location.label}
                    </Label>
                  </div>

                  {/* Logo Configuration */}
                  {isSelected && logos.length > 0 && (
                    <div className="ml-6 space-y-3 bg-gray-50 p-3 rounded">
                      {/* Logo Selection */}
                      <div className="space-y-2">
                        <Label className="text-xs text-gray-600">Select Logo</Label>
                        <Select
                          value={config?.logoId || logos[0]?.id}
                          onValueChange={(value) => handleLogoChange(location.id, value)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {logos.map((logo) => (
                              <SelectItem key={logo.id} value={logo.id}>
                                {logo.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Size Control */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs text-gray-600">Logo Size</Label>
                          <span className="text-xs text-gray-500">{config?.size || 30}%</span>
                        </div>
                        <Slider
                          value={[config?.size || 30]}
                          onValueChange={(value) => handleSizeChange(location.id, value[0])}
                          min={10}
                          max={60}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {selectedLocations.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-4">
              <p className="text-green-800 text-sm font-medium">
                ✓ {selectedLocations.length} logo placement{selectedLocations.length > 1 ? "s" : ""} configured
              </p>
              <div className="text-green-600 text-xs mt-2 space-y-1">
                {selectedLocations.map((locationId) => {
                  const location = logoLocations.find((loc) => loc.id === locationId)
                  const config = logoConfigs[locationId]
                  const selectedLogo = logos.find((logo) => logo.id === config?.logoId)

                  return (
                    <div key={locationId}>
                      • {location?.label}: {selectedLogo?.name} ({config?.size || 30}% size)
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {selectedLocations.length === 0 && logos.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-blue-800 text-sm">Select at least one placement location for your logos</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
