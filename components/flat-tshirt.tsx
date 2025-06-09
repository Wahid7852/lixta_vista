"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function FlatTShirt({
  color = "#ffffff",
  isHighlighted = false,
  logo = null,
  logoPosition = { x: 50, y: 50 },
  logoSize = 30,
}) {
  const groupRef = useRef<THREE.Group>(null)

  // Create logo texture if logo exists
  const logoTexture = logo ? new THREE.TextureLoader().load(logo) : null

  // Gentle rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime()
      if (isHighlighted) {
        groupRef.current.rotation.y = Math.sin(time * 0.8) * 0.2
        groupRef.current.position.y = Math.sin(time * 1.2) * 0.05
      } else {
        groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.05
      }
    }
  })

  // Create T-shirt shape
  const shape = new THREE.Shape()

  // Body
  shape.moveTo(-0.6, -1.0) // Bottom left
  shape.lineTo(0.6, -1.0) // Bottom right
  shape.lineTo(0.5, 0.5) // Upper right before sleeve

  // Right sleeve
  shape.lineTo(0.8, 0.6) // Right sleeve outer point
  shape.lineTo(0.7, 0.8) // Right sleeve top
  shape.lineTo(0.3, 0.7) // Right sleeve inner point

  // Neck
  shape.lineTo(0.2, 0.8) // Right neck
  shape.bezierCurveTo(0.1, 0.9, -0.1, 0.9, -0.2, 0.8) // Neck curve

  // Left sleeve
  shape.lineTo(-0.3, 0.7) // Left sleeve inner point
  shape.lineTo(-0.7, 0.8) // Left sleeve top
  shape.lineTo(-0.8, 0.6) // Left sleeve outer point
  shape.lineTo(-0.5, 0.5) // Upper left before sleeve

  shape.lineTo(-0.6, -1.0) // Back to bottom left

  // Extrude settings
  const extrudeSettings = {
    steps: 1,
    depth: 0.1,
    bevelEnabled: false,
  }

  return (
    <group ref={groupRef} scale={[1.5, 1.5, 1.5]}>
      {/* T-shirt body */}
      <mesh>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial color={isHighlighted ? "#f0f8ff" : color} roughness={0.7} side={THREE.DoubleSide} />
      </mesh>

      {/* Logo overlay */}
      {logo && logoTexture && (
        <mesh
          position={[
            (logoPosition.x / 50 - 1) * 0.6, // Horizontal positioning
            0.2 + (logoPosition.y / 50 - 1) * 0.6, // Vertical positioning on chest
            0.06, // Just in front of the shirt
          ]}
          rotation={[0, 0, 0]}
          scale={[logoSize / 40, logoSize / 40, 1]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={logoTexture} transparent={true} side={THREE.DoubleSide} alphaTest={0.1} />
        </mesh>
      )}
    </group>
  )
}
