"use client"

import { useState, useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Html } from "@react-three/drei"
import * as THREE from "three"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Loader2, FileText } from "lucide-react"

interface ProductTemplate3DProps {
  template: {
    id: string
    name: string
    image: string
    model: string
  }
  logo: string | null
}

// Business Card Model - enhanced with rounded corners and better proportions
function BusinessCard({ texture, logo, logoPosition, logoSize }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const logoRef = useRef<THREE.Mesh>(null)

  // Create texture from image URL
  const cardTexture = new THREE.TextureLoader().load(texture)

  // Create logo texture if logo exists
  const logoTexture = logo ? new THREE.TextureLoader().load(logo) : null

  // Subtle rotation animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(Date.now() * 0.0008) * 0.15
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.0006) * 0.05
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Business card with rounded edges effect */}
      <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[3.5, 0.08, 2]} />
        <meshStandardMaterial map={cardTexture} color="#ffffff" roughness={0.1} metalness={0.1} />
      </mesh>

      {/* Card border highlight */}
      <mesh position={[0, 0.041, 0]}>
        <boxGeometry args={[3.52, 0.001, 2.02]} />
        <meshBasicMaterial color="#e0e0e0" transparent opacity={0.5} />
      </mesh>

      {/* Logo overlay */}
      {logo && logoTexture && (
        <mesh
          ref={logoRef}
          position={[(logoPosition.x / 50 - 1) * 1.5, 0.045, (logoPosition.y / 50 - 1) * 0.8]}
          rotation={[0, 0, 0]}
        >
          <planeGeometry args={[logoSize / 30, logoSize / 30]} />
          <meshBasicMaterial map={logoTexture} transparent={true} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  )
}

// T-Shirt Model - more realistic with better proportions and depth
function TShirt({ texture, logo, logoPosition, logoSize }: any) {
  const meshRef = useRef<THREE.Group>(null)

  // Create texture from image URL
  const shirtTexture = new THREE.TextureLoader().load(texture)

  // Create logo texture if logo exists
  const logoTexture = logo ? new THREE.TextureLoader().load(logo) : null

  // Gentle rotation animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(Date.now() * 0.0005) * 0.1
    }
  })

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* T-shirt body - main torso with slight curve */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[2.2, 2.8, 0.15]} />
        <meshStandardMaterial map={shirtTexture} color="#ffffff" roughness={0.8} />
      </mesh>

      {/* Chest area - slightly raised */}
      <mesh position={[0, 0.3, 0.02]}>
        <boxGeometry args={[1.8, 1.2, 0.12]} />
        <meshStandardMaterial map={shirtTexture} color="#ffffff" roughness={0.8} />
      </mesh>

      {/* Left sleeve */}
      <mesh position={[1.6, 0.6, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[1, 1.4, 0.15]} />
        <meshStandardMaterial map={shirtTexture} color="#ffffff" roughness={0.8} />
      </mesh>

      {/* Right sleeve */}
      <mesh position={[-1.6, 0.6, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[1, 1.4, 0.15]} />
        <meshStandardMaterial map={shirtTexture} color="#ffffff" roughness={0.8} />
      </mesh>

      {/* Collar/neckline */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.8, 0.4, 0.15]} />
        <meshStandardMaterial map={shirtTexture} color="#ffffff" roughness={0.8} />
      </mesh>

      {/* Shoulder seams */}
      <mesh position={[1.1, 1, 0.08]}>
        <boxGeometry args={[0.1, 0.8, 0.05]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      <mesh position={[-1.1, 1, 0.08]}>
        <boxGeometry args={[0.1, 0.8, 0.05]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>

      {/* Logo overlay on chest area */}
      {logo && logoTexture && (
        <mesh
          position={[(logoPosition.x / 50 - 1) * 0.8, 0.4 + (logoPosition.y / 50 - 1) * 0.8, 0.09]}
          rotation={[0, 0, 0]}
          scale={[logoSize / 50, logoSize / 50, 1]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={logoTexture} transparent={true} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  )
}

// Mug Model - refined with better handle and proportions
function Mug({ texture, logo, logoPosition, logoSize }: any) {
  const meshRef = useRef<THREE.Group>(null)

  // Create texture from image URL
  const mugTexture = new THREE.TextureLoader().load(texture)

  // Create logo texture if logo exists
  const logoTexture = logo ? new THREE.TextureLoader().load(logo) : null

  // Smooth rotation animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003
    }
  })

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Mug body - slightly tapered for realism */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.75, 0.85, 2.4, 32]} />
        <meshStandardMaterial map={mugTexture} color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Mug bottom - thicker base */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.15, 32]} />
        <meshStandardMaterial map={mugTexture} color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Inner rim */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.72, 0.75, 0.1, 32]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.1} />
      </mesh>

      {/* Mug handle - more realistic shape */}
      <mesh position={[1, 0.2, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.35, 0.08, 8, 16, Math.PI]} />
        <meshStandardMaterial map={mugTexture} color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Handle connection points */}
      <mesh position={[0.85, 0.6, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial map={mugTexture} color="#ffffff" />
      </mesh>
      <mesh position={[0.85, -0.2, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial map={mugTexture} color="#ffffff" />
      </mesh>

      {/* Logo overlay - positioned on the front of the mug */}
      {logo && logoTexture && (
        <mesh
          position={[0, (logoPosition.y / 50 - 0.5) * 1.5, 0.76]}
          rotation={[0, 0, 0]}
          scale={[logoSize / 50, logoSize / 50, 1]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={logoTexture} transparent={true} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  )
}

// Loading fallback
function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="mt-2 text-sm text-gray-500">Loading 3D preview...</p>
      </div>
    </Html>
  )
}

export default function ProductTemplate3D({ template, logo }: ProductTemplate3DProps) {
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

  const generateInvoice = () => {
    // Calculate price based on product type and customization
    const basePrice = template.model === "business-card" ? 200 : template.model === "tshirt" ? 550 : 350
    const logoCustomization = logo ? 50 : 0
    const subtotal = basePrice + logoCustomization
    const tax = Math.round(subtotal * 0.18) // 18% GST
    const total = subtotal + tax

    const invoiceData = {
      invoiceNumber: `LN-${Date.now()}`,
      date: new Date().toLocaleDateString("en-IN"),
      customerName: "Customer Name",
      customerEmail: "customer@example.com",
      items: [
        {
          description: `${template.name} - ${template.model.replace("-", " ").toUpperCase()}`,
          quantity: 1,
          unitPrice: basePrice,
          total: basePrice,
        },
        ...(logo
          ? [
              {
                description: "Logo Customization",
                quantity: 1,
                unitPrice: logoCustomization,
                total: logoCustomization,
              },
            ]
          : []),
      ],
      subtotal,
      tax,
      total,
    }

    // Open invoice in new window
    const invoiceWindow = window.open("", "_blank")
    if (invoiceWindow) {
      invoiceWindow.document.write(generateInvoiceHTML(invoiceData))
      invoiceWindow.document.close()
    }
  }

  // Determine which 3D model to render based on template.model
  const renderModel = () => {
    const props = {
      texture: template.image,
      logo,
      logoPosition,
      logoSize,
    }

    switch (template.model) {
      case "business-card":
        return <BusinessCard {...props} />
      case "tshirt":
        return <TShirt {...props} />
      case "mug":
        return <Mug {...props} />
      default:
        return <BusinessCard {...props} /> // Default to business card
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100">
          {/* 3D Canvas */}
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <spotLight position={[-10, 10, 5]} angle={0.15} penumbra={1} intensity={0.5} />
            <pointLight position={[0, -10, 5]} intensity={0.3} />

            <Suspense fallback={<LoadingFallback />}>
              {renderModel()}
              <Environment preset="studio" />
              <OrbitControls
                enablePan={false}
                minDistance={3}
                maxDistance={10}
                autoRotate={false}
                autoRotateSpeed={1}
                enableDamping={true}
                dampingFactor={0.05}
              />
            </Suspense>
          </Canvas>
        </div>

        <div className="p-4">
          <h3 className="font-medium">{template.name}</h3>

          {logo && (
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <span>Horizontal Position</span>
                  </div>
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
                  <div className="flex items-center text-xs text-gray-500">
                    <span>Vertical Position</span>
                  </div>
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
                  <div className="flex items-center text-xs text-gray-500">
                    <span>Logo Size</span>
                  </div>
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
        <div className="flex gap-2">
          <Button onClick={generateInvoice} variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-1" />
            Invoice
          </Button>
          <Button>Customize</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

// Function to generate invoice HTML
function generateInvoiceHTML(data: any) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice ${data.invoiceNumber}</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                line-height: 1.6;
                color: #333;
            }
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 3px solid #2563eb;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 28px;
                font-weight: bold;
                color: #2563eb;
                letter-spacing: -0.5px;
            }
            .tagline {
                font-size: 12px;
                color: #666;
                margin-top: 2px;
            }
            .invoice-details {
                text-align: right;
            }
            .invoice-number {
                font-size: 18px;
                font-weight: bold;
                color: #2563eb;
            }
            .billing-info {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 40px;
                margin-bottom: 30px;
            }
            .billing-section h3 {
                margin-bottom: 10px;
                color: #2563eb;
                border-bottom: 1px solid #e5e7eb;
                padding-bottom: 5px;
                font-size: 16px;
            }
            .items-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 30px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            .items-table th,
            .items-table td {
                padding: 15px 12px;
                text-align: left;
                border-bottom: 1px solid #e5e7eb;
            }
            .items-table th {
                background-color: #f8fafc;
                font-weight: 600;
                color: #2563eb;
                font-size: 14px;
            }
            .items-table .text-right {
                text-align: right;
            }
            .totals {
                margin-left: auto;
                width: 300px;
            }
            .totals table {
                width: 100%;
                border-collapse: collapse;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            .totals td {
                padding: 12px 15px;
                border-bottom: 1px solid #e5e7eb;
            }
            .totals .total-row {
                font-weight: bold;
                font-size: 18px;
                background-color: #2563eb;
                color: white;
            }
            .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                text-align: center;
                color: #666;
                font-size: 14px;
            }
            .print-button {
                background-color: #2563eb;
                color: white;
                padding: 12px 24px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                margin-bottom: 20px;
                font-size: 16px;
                font-weight: 500;
                transition: background-color 0.2s;
            }
            .print-button:hover {
                background-color: #1d4ed8;
            }
            @media print {
                .print-button {
                    display: none;
                }
                body {
                    margin: 0;
                    padding: 15px;
                }
            }
        </style>
    </head>
    <body>
        <button class="print-button" onclick="window.print()">🖨️ Print Invoice</button>
        
        <div class="header">
            <div>
                <div class="logo">LixtaNetworks</div>
                <div class="tagline">Premium Printing Solutions</div>
            </div>
            <div class="invoice-details">
                <div class="invoice-number">Invoice ${data.invoiceNumber}</div>
                <div>Date: ${data.date}</div>
            </div>
        </div>

        <div class="billing-info">
            <div class="billing-section">
                <h3>Bill To:</h3>
                <div><strong>${data.customerName}</strong></div>
                <div>${data.customerEmail}</div>
                <div>Customer Address</div>
                <div>City, State, PIN</div>
            </div>
            <div class="billing-section">
                <h3>From:</h3>
                <div><strong>LixtaNetworks Pvt. Ltd.</strong></div>
                <div>123 Innovation Street</div>
                <div>Tech Park, Bangalore 560001</div>
                <div>Karnataka, India</div>
                <div>GSTIN: 29XXXXX1234X1ZX</div>
                <div>📧 hello@lixtanetworks.com</div>
                <div>📞 +91-80-1234-5678</div>
            </div>
        </div>

        <table class="items-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th class="text-right">Qty</th>
                    <th class="text-right">Unit Price</th>
                    <th class="text-right">Total</th>
                </tr>
            </thead>
            <tbody>
                ${data.items
                  .map(
                    (item: any) => `
                    <tr>
                        <td>${item.description}</td>
                        <td class="text-right">${item.quantity}</td>
                        <td class="text-right">₹${item.unitPrice}</td>
                        <td class="text-right">₹${item.total}</td>
                    </tr>
                `,
                  )
                  .join("")}
            </tbody>
        </table>

        <div class="totals">
            <table>
                <tr>
                    <td>Subtotal:</td>
                    <td class="text-right">₹${data.subtotal}</td>
                </tr>
                <tr>
                    <td>GST (18%):</td>
                    <td class="text-right">₹${data.tax}</td>
                </tr>
                <tr class="total-row">
                    <td>Total Amount:</td>
                    <td class="text-right">₹${data.total}</td>
                </tr>
            </table>
        </div>

        <div class="footer">
            <p><strong>Thank you for choosing LixtaNetworks!</strong></p>
            <p>For support and queries: support@lixtanetworks.com | +91-80-1234-5678</p>
            <p>Visit us: www.lixtanetworks.com</p>
            <p style="margin-top: 15px; font-size: 12px; color: #999;">
                This is a computer-generated invoice and does not require a signature.
            </p>
        </div>
    </body>
    </html>
  `
}
