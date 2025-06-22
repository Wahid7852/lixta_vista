"use client"

import { useRef, Suspense, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html, Text } from "@react-three/drei"
import * as THREE from "three"
import { Loader2 } from "lucide-react"

interface RealisticTShirt3DProps {
  logos: Array<{ id: string; name: string; url: string }>
  productColor: string
  selectedLocations: string[]
  logoConfigs: Record<string, { logoId: string; size: number; rotation: number }>
}

const logoLocations = [
  { id: "front-center", position: { x: 0, y: 0.2, z: 0.16 }, rotation: [0, 0, 0], scale: 0.8 },
  { id: "front-left-chest", position: { x: -0.3, y: 0.5, z: 0.16 }, rotation: [0, 0, 0], scale: 0.4 },
  { id: "front-right-chest", position: { x: 0.3, y: 0.5, z: 0.16 }, rotation: [0, 0, 0], scale: 0.4 },
  { id: "back-center", position: { x: 0, y: 0.2, z: -0.16 }, rotation: [0, Math.PI, 0], scale: 0.8 },
  { id: "left-sleeve", position: { x: -0.85, y: 0.4, z: 0.05 }, rotation: [0, -0.3, 0], scale: 0.35 },
  { id: "right-sleeve", position: { x: 0.85, y: 0.4, z: 0.05 }, rotation: [0, 0.3, 0], scale: 0.35 },
]

function SimpleTShirt({ productColor, logos, selectedLocations, logoConfigs }: any) {
  const groupRef = useRef<THREE.Group>(null)

  // Simple logo texture loading
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

  // T-shirt shape
  const tshirtShape = useMemo(() => {
    const shape = new THREE.Shape()

    shape.moveTo(-0.9, -1.3)
    shape.lineTo(0.9, -1.3)
    shape.lineTo(0.8, 0.3)
    shape.lineTo(1.15, 0.35)
    shape.quadraticCurveTo(1.25, 0.6, 1.1, 0.85)
    shape.lineTo(0.45, 0.75)
    shape.lineTo(0.25, 0.9)
    shape.quadraticCurveTo(0.12, 1.0, 0, 0.95)
    shape.quadraticCurveTo(-0.12, 1.0, -0.25, 0.9)
    shape.lineTo(-0.45, 0.75)
    shape.lineTo(-1.1, 0.85)
    shape.quadraticCurveTo(-1.25, 0.6, -1.15, 0.35)
    shape.lineTo(-0.8, 0.3)
    shape.lineTo(-0.9, -1.3)

    return shape
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime()
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={[1.1, 1.1, 1.1]}>
      {/* T-shirt body */}
      <mesh>
        <extrudeGeometry
          args={[
            tshirtShape,
            {
              depth: 0.15,
              bevelEnabled: false,
            },
          ]}
        />
        <meshBasicMaterial color={productColor} side={THREE.DoubleSide} />
      </mesh>

      {/* Collar */}
      <mesh position={[0, 0.97, 0.08]}>
        <ringGeometry args={[0.2, 0.28, 32]} />
        <meshBasicMaterial color={productColor} side={THREE.DoubleSide} />
      </mesh>

      {/* Render logos */}
      {selectedLocations.map((locationId) => {
        const location = logoLocations.find((loc) => loc.id === locationId)
        const config = logoConfigs[locationId]

        if (!location || !config) {
          console.log(`Missing location or config for ${locationId}`)
          return null
        }

        const selectedLogo = logos.find((logo: any) => logo.id === config.logoId)
        if (!selectedLogo) {
          console.log(`Logo not found for config logoId: ${config.logoId}`)
          return null
        }

        const logoTexture = logoTextures[selectedLogo.id]
        if (!logoTexture) {
          console.log(`Texture not loaded for logo: ${selectedLogo.name}`)
          return null
        }

        const sizeMultiplier = (config.size / 100) * location.scale
        const zRotation = (config.rotation || 0) * (Math.PI / 180)

        console.log(`Rendering logo ${selectedLogo.name} at ${locationId}`, {
          position: location.position,
          size: sizeMultiplier,
          rotation: zRotation,
        })

        return (
          <mesh
            key={locationId}
            position={[location.position.x, location.position.y, location.position.z]}
            rotation={[location.rotation[0], location.rotation[1], location.rotation[2] + zRotation]}
            scale={[sizeMultiplier, sizeMultiplier, 1]}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={logoTexture} transparent={true} alphaTest={0.1} side={THREE.DoubleSide} />
          </mesh>
        )
      })}

      {/* Status text */}
      {selectedLocations.length > 0 && (
        <Text position={[0, 1.7, 0]} fontSize={0.1} color="#3b82f6" anchorX="center" anchorY="middle">
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
        <p className="text-sm text-gray-600">Loading T-shirt...</p>
      </div>
    </Html>
  )
}

export default function RealisticTShirt3D({
  logos,
  productColor,
  selectedLocations,
  logoConfigs,
}: RealisticTShirt3DProps) {
  console.log("RealisticTShirt3D props:", {
    logosCount: logos.length,
    selectedLocations,
    logoConfigs,
    productColor,
  })

  return (
    <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }}>
        <color attach="background" args={["#f5f5f5"]} />

        {/* Simple lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />

        <Suspense fallback={<LoadingFallback />}>
          <SimpleTShirt
            productColor={productColor}
            logos={logos}
            selectedLocations={selectedLocations}
            logoConfigs={logoConfigs}
          />

          <OrbitControls
            enablePan={false}
            minDistance={2.2}
            maxDistance={5}
            autoRotate={false}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
