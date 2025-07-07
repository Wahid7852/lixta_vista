"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const categoryProducts = [
  {
    category: "Festive & Seasonal",
    icon: "🎁",
    color: "from-red-500 to-pink-500",
    products: [
      { name: "Diwali Hampers", image: "/images/categories/stationery.jpg", moq: "50+" },
      { name: "Christmas Gifts", image: "/images/categories/photo-gifts.jpg", moq: "100+" },
      { name: "New Year Planners", image: "/images/categories/visiting-cards.jpg", moq: "200+" },
    ],
  },
  {
    category: "Corporate & Business",
    icon: "💼",
    color: "from-blue-500 to-purple-500",
    products: [
      { name: "Executive Gifts", image: "/images/categories/visiting-cards.jpg", moq: "100+" },
      { name: "Employee Kits", image: "/images/categories/stationery.jpg", moq: "150+" },
      { name: "Client Hampers", image: "/images/categories/photo-gifts.jpg", moq: "50+" },
    ],
  },
  {
    category: "Apparel & Accessories",
    icon: "👕",
    color: "from-green-500 to-teal-500",
    products: [
      { name: "Custom T-Shirts", image: "/images/categories/tshirts.jpg", moq: "100+" },
      { name: "Corporate Uniforms", image: "/images/categories/polo-tshirts.jpg", moq: "200+" },
      { name: "Branded Caps", image: "/images/categories/caps.jpg", moq: "150+" },
    ],
  },
  {
    category: "Tech & Electronics",
    icon: "📱",
    color: "from-orange-500 to-red-500",
    products: [
      { name: "Phone Accessories", image: "/images/categories/photo-gifts.jpg", moq: "200+" },
      { name: "Power Banks", image: "/images/categories/stationery.jpg", moq: "100+" },
      { name: "USB Drives", image: "/images/categories/visiting-cards.jpg", moq: "500+" },
    ],
  },
]

export default function CategoryFloaterBanner() {
  const [currentCategory, setCurrentCategory] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentCategory((prev) => (prev + 1) % categoryProducts.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextCategory = () => {
    setCurrentCategory((prev) => (prev + 1) % categoryProducts.length)
    setIsAutoPlaying(false)
  }

  const prevCategory = () => {
    setCurrentCategory((prev) => (prev - 1 + categoryProducts.length) % categoryProducts.length)
    setIsAutoPlaying(false)
  }

  const current = categoryProducts[currentCategory]

  return (
    <section className="relative bg-gradient-to-br from-gray-900 to-blue-900 text-white py-12 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-300 rounded-full animate-ping"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-8">
          <Badge className="bg-orange-500 text-white px-4 py-2 text-sm font-bold mb-4">
            <Package className="h-4 w-4 mr-2" />
            BULK ORDERS ONLY - MOQ 100+
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Explore Our Product Range</h2>
          <p className="text-blue-100 text-lg">Premium customization across all categories</p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 border-white/30 text-white hover:bg-white/30 rounded-full w-12 h-12"
            onClick={prevCategory}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 border-white/30 text-white hover:bg-white/30 rounded-full w-12 h-12"
            onClick={nextCategory}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Category Content */}
          <div className="mx-12">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center bg-gradient-to-r ${current.color} px-6 py-3 rounded-full mb-4`}>
                <span className="text-2xl mr-3">{current.icon}</span>
                <span className="text-xl font-bold">{current.category}</span>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {current.products.map((product, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 group"
                >
                  <div className="relative mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={150}
                      className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 right-2 bg-orange-500 text-white text-xs">MOQ {product.moq}</Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-white/20 hover:bg-white/30 border-white/30"
                    variant="outline"
                  >
                    <Link href="/customize">Customize Now</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Category Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {categoryProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentCategory(index)
                  setIsAutoPlaying(false)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentCategory ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
