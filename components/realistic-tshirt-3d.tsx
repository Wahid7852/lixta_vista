"use client"

import { useRef, Suspense, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html, Text, Environment, ContactShadows } from "@react-three/drei"
import * as THREE from "three"
import { Loader2 } from "lucide-react"

interface RealisticTShirt3DProps {
  logos: Array<{ id: string; name: string; url: string }>
  productColor: string
  selectedLocations: string[]
  logoConfigs: Record<string, { logoId: string; size: number; rotation: number }>
}

const logoLocations = [
  { id: "front-center", position: { x: 0, y: 0.1, z: 0.51 }, rotation: [0, 0, 0], scale: 0.8 },
  { id: "front-left-chest", position: { x: -0.25, y: 0.35, z: 0.51 }, rotation: [0, 0, 0], scale: 0.4 },
  { id: "front-right-chest", position: { x: 0.25, y: 0.35, z: 0.51 }, rotation: [0, 0, 0], scale: 0.4 },
  { id: "back-center", position: { x: 0, y: 0.1, z: -0.51 }, rotation: [0, Math.PI, 0], scale: 0.8 },
  { id: "left-sleeve", position: { x: -0.75, y: 0.3, z: 0.1 }, rotation: [0, -Math.PI / 3, 0], scale: 0.3 },
  { id: "right-sleeve", position: { x: 0.75, y: 0.3, z: 0.1 }, rotation: [0, Math.PI / 3, 0], scale: 0.3 },
]

function RealisticTShirtModel({ productColor, logos, selectedLocations, logoConfigs }: any) {
  const groupRef = useRef<THREE.Group>(null)

  // Create logo textures
  const logoTextures = useMemo(() => {
    const textures: Record<string, THREE.Texture> = {}
    logos.forEach((logo: any) => {
      if (logo.url) {
        const loader = new THREE.TextureLoader()
        const tex = loader.load(logo.url)
        tex.flipY = false
        tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping
        textures[logo.id] = tex
      }
    })
    return textures
  }, [logos])

  // Create realistic fabric texture
  const fabricTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 1024
    const ctx = canvas.getContext("2d")
    if (ctx) {
      // Base color
      ctx.fillStyle = productColor
      ctx.fillRect(0, 0, 1024, 1024)

      // Fabric weave pattern
      ctx.globalAlpha = 0.1
      for (let x = 0; x < 1024; x += 4) {
        for (let y = 0; y < 1024; y += 4) {
          const brightness = Math.random() * 0.3
          ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`
          ctx.fillRect(x, y, 2, 2)
        }
      }

      // Subtle fabric lines
      ctx.globalAlpha = 0.05
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = 1
      for (let i = 0; i < 1024; i += 8) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, 1024)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(1024, i)
        ctx.stroke()
      }
    }
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(2, 2)
    return texture
  }, [productColor])

  // Enhanced T-shirt shape with more realistic proportions
  const tshirtShape = useMemo(() => {
    const shape = new THREE.Shape()

    // More realistic T-shirt silhouette
    shape.moveTo(-0.9, -1.4) // Bottom left
    shape.lineTo(0.9, -1.4) // Bottom right
    shape.lineTo(0.8, 0.2) // Right side up

    // Right sleeve - more realistic curve
    shape.lineTo(1.2, 0.3) // Sleeve outer
    shape.quadraticCurveTo(1.3, 0.6, 1.1, 0.9) // Sleeve curve
    shape.lineTo(0.5, 0.8) // Sleeve inner

    // Neck area - better curve
    shape.lineTo(0.3, 0.95)
    shape.quadraticCurveTo(0.15, 1.05, 0, 1.0) // Right neck curve
    shape.quadraticCurveTo(-0.15, 1.05, -0.3, 0.95) // Left neck curve

    // Left sleeve - mirror of right
    shape.lineTo(-0.5, 0.8)
    shape.lineTo(-1.1, 0.9)
    shape.quadraticCurveTo(-1.3, 0.6, -1.2, 0.3)
    shape.lineTo(-0.8, 0.2)

    shape.lineTo(-0.9, -1.4) // Back to start

    return shape
  }, [])

  // Gentle animation
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime()
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.15
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.03
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* Main T-shirt body with realistic extrusion */}
      <mesh castShadow receiveShadow>
        <extrudeGeometry
          args={[
            tshirtShape,
            {
              depth: 0.15,
              bevelEnabled: true,
              bevelThickness: 0.03,
              bevelSize: 0.02,
              bevelSegments: 12,
            },
          ]}
        />
        <meshStandardMaterial
          map={fabricTexture}
          side={THREE.DoubleSide}
          roughness={0.85}
          metalness={0.05}
          normalScale={new THREE.Vector2(0.5, 0.5)}
        />
      </mesh>

      {/* Enhanced collar with realistic depth */}
      <mesh position={[0, 1.02, 0.08]} castShadow>
        <ringGeometry args={[0.22, 0.32, 32]} />
        <meshStandardMaterial color={productColor} side={THREE.DoubleSide} roughness={0.9} />
      </mesh>

      {/* Inner collar for depth */}
      <mesh position={[0, 1.02, 0.06]} castShadow>
        <ringGeometry args={[0.2, 0.24, 32]} />
        <meshStandardMaterial color={productColor} side={THREE.DoubleSide} roughness={0.9} />
      </mesh>

      {/* Collar seam detail */}
      <mesh position={[0, 1.02, 0.09]} castShadow>
        <torusGeometry args={[0.27, 0.01, 8, 32]} />
        <meshStandardMaterial color={new THREE.Color(productColor).multiplyScalar(0.8)} roughness={0.9} />
      </mesh>

      {/* Logos with proper positioning and rotation */}
      {selectedLocations.map((locationId) => {
        const location = logoLocations.find((loc) => loc.id === locationId)
        const config = logoConfigs[locationId]
        if (!location || !config) return null

        const selectedLogo = logos.find((logo: any) => logo.id === config.logoId)
        const logoTexture = selectedLogo ? logoTextures[selectedLogo.id] : null

        if (!logoTexture) return null

        const sizeMultiplier = (config.size / 100) * location.scale

        // Convert rotation from degrees to radians for z-axis rotation
        const zRotation = (config.rotation || 0) * (Math.PI / 180)

        // Combine base rotation with z-axis rotation
        const finalRotation: [number, number, number] = [
          location.rotation[0],
          location.rotation[1],
          location.rotation[2] + zRotation,
        ]

        return (
          <mesh
            key={locationId}
            position={[location.position.x, location.position.y, location.position.z]}
            rotation={finalRotation}
            scale={[sizeMultiplier, sizeMultiplier, 1]}
            renderOrder={1}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              map={logoTexture}
              transparent={true}
              alphaTest={0.1}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        )
      })}

      {/* Status indicator with detailed info */}
      {selectedLocations.length > 0 && (
        <group>
          <Text
            position={[0, 1.8, 0]}
            fontSize={0.12}
            color="#3b82f6"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-Bold.ttf"
          >
            {selectedLocations.length} Logo{selectedLocations.length > 1 ? "s" : ""} Applied
          </Text>

          {/* Show different logos indicator */}
          {selectedLocations.length > 1 && (
            <Text
              position={[0, 1.65, 0]}
              fontSize={0.08}
              color="#10b981"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Inter-Regular.ttf"
            >
              {new Set(selectedLocations.map((id) => logoConfigs[id]?.logoId)).size} Different Logo
              {new Set(selectedLocations.map((id) => logoConfigs[id]?.logoId)).size > 1 ? "s" : ""} Used
            </Text>
          )}
        </group>
      )}
    </group>
  )
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
        <p className="text-lg font-medium text-gray-700">Loading T-shirt preview...</p>
        <p className="text-sm text-gray-500 mt-1">Creating your design</p>
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
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }} shadows gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        {/* Professional lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.4} />
        <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={0.6} castShadow />

        {/* Environment for realistic reflections */}
        <Environment preset="studio" />

        {/* Contact shadows for ground effect */}
        <ContactShadows position={[0, -1.8, 0]} opacity={0.3} scale={12} blur={2.5} far={4} />

        <Suspense fallback={<LoadingFallback />}>
          <RealisticTShirtModel
            productColor={productColor}
            logos={logos}
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
            maxPolarAngle={Math.PI / 1.4}
            minPolarAngle={Math.PI / 6}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
