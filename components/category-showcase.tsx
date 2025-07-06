"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
  {
    id: 1,
    name: "Custom Apparel",
    href: "/customize",
    image: "/images/categories/tshirts.jpg",
    description: "T-shirts, hoodies, uniforms & more",
    supplierCount: "500+ Suppliers",
    rating: 4.8,
    badge: "Most Popular",
    color: "from-blue-500 to-purple-600",
  },
  {
    id: 2,
    name: "Corporate Gifts",
    href: "/customize",
    image: "/images/categories/visiting-cards.jpg",
    description: "Executive gifts, hampers & branded items",
    supplierCount: "300+ Suppliers",
    rating: 4.9,
    badge: "Premium Quality",
    color: "from-green-500 to-teal-600",
  },
  {
    id: 3,
    name: "Tech Accessories",
    href: "/customize",
    image: "/images/categories/photo-gifts.jpg",
    description: "Phone cases, power banks & gadgets",
    supplierCount: "400+ Suppliers",
    rating: 4.7,
    badge: "Trending",
    color: "from-orange-500 to-red-600",
  },
  {
    id: 4,
    name: "Home & Living",
    href: "/customize",
    image: "/images/categories/polo-tshirts.jpg",
    description: "Mugs, decor, furniture & textiles",
    supplierCount: "250+ Suppliers",
    rating: 4.8,
    badge: "Best Value",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: 5,
    name: "Festive Collections",
    href: "/customize",
    image: "/images/categories/stationery.jpg",
    description: "Seasonal hampers & festival specials",
    supplierCount: "200+ Suppliers",
    rating: 4.6,
    badge: "Seasonal",
    color: "from-indigo-500 to-blue-600",
  },
  {
    id: 6,
    name: "Health & Wellness",
    href: "/customize",
    image: "/images/categories/signs.jpg",
    description: "Fitness gear, supplements & wellness products",
    supplierCount: "150+ Suppliers",
    rating: 4.7,
    badge: "Growing",
    color: "from-pink-500 to-rose-600",
  },
]

export default function CategoryShowcase() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" })
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Popular{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover thousands of suppliers across our most popular customization categories
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl hidden md:flex rounded-full w-12 h-12"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Scroll left</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl hidden md:flex rounded-full w-12 h-12"
            onClick={scrollRight}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Scroll right</span>
          </Button>

          {/* Products Carousel */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <Link key={category.id} href={category.href} className="flex-shrink-0 w-80">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 bg-white">
                  <div className="relative">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={320}
                      height={240}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className={`bg-gradient-to-r ${category.color} text-white font-bold`}>
                        {category.badge}
                      </Badge>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{category.rating}</span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100 font-medium">
                        Browse Suppliers
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{category.description}</p>

                    <div className="flex items-center justify-between">
                      <span
                        className={`text-lg font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
                      >
                        {category.supplierCount}
                      </span>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <span className="text-xs">Verified</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg px-8 py-4 rounded-full font-bold"
          >
            <Link href="/categories">
              Browse All Categories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
