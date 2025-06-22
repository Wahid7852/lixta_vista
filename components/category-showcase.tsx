"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  {
    id: 1,
    name: "Custom T-Shirts",
    href: "/customize",
    image: "/images/categories/tshirts.jpg",
    description: "Premium quality custom printed T-shirts",
  },
  {
    id: 2,
    name: "Logo Design",
    href: "/customize",
    image: "/images/categories/logo-design.jpg",
    description: "Professional logo design services",
  },
  {
    id: 3,
    name: "Bulk Orders",
    href: "/customize",
    image: "/images/categories/bulk-orders.jpg",
    description: "Special pricing for large quantities",
  },
  {
    id: 4,
    name: "Corporate Branding",
    href: "/customize",
    image: "/images/categories/corporate.jpg",
    description: "Complete corporate branding solutions",
  },
]

export default function CategoryShowcase() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Our Services</h2>

      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md hidden md:flex"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Scroll left</span>
        </Button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <Link key={category.id} href={category.href} className="flex-shrink-0 w-64">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={256}
                  height={192}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md hidden md:flex"
          onClick={scrollRight}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Scroll right</span>
        </Button>
      </div>
    </div>
  )
}
