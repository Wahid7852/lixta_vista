"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  {
    id: 1,
    name: "Visiting Cards",
    href: "/visiting-cards",
    image: "/images/categories/visiting-cards.jpg",
  },
  {
    id: 2,
    name: "Custom Polo T-shirts",
    href: "/polo-tshirts",
    image: "/images/categories/polo-tshirts.jpg",
  },
  {
    id: 3,
    name: "Umbrellas & Rainwear",
    href: "/umbrellas",
    image: "/images/categories/umbrellas.jpg",
  },
  {
    id: 4,
    name: "Custom T-shirts",
    href: "/tshirts",
    image: "/images/categories/tshirts.jpg",
  },
  {
    id: 5,
    name: "Custom Stamps & Ink",
    href: "/stamps",
    image: "/images/categories/stamps.jpg",
  },
  {
    id: 6,
    name: "Photo Gifts",
    href: "/photo-gifts",
    image: "/images/categories/photo-gifts.jpg",
  },
  {
    id: 7,
    name: "Labels, Stickers & Packaging",
    href: "/labels",
    image: "/images/categories/labels.jpg",
  },
  {
    id: 8,
    name: "Custom Stationery",
    href: "/stationery",
    image: "/images/categories/stationery.jpg",
  },
  {
    id: 9,
    name: "Signs, Posters & Marketing Materials",
    href: "/signs",
    image: "/images/categories/signs.jpg",
  },
  {
    id: 10,
    name: "Custom Caps",
    href: "/caps",
    image: "/images/categories/caps.jpg",
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
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Explore all categories</h2>

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
            <Link key={category.id} href={category.href} className="flex-shrink-0 w-36 md:w-48">
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={200}
                  height={200}
                  className="w-full h-auto aspect-square object-cover"
                />
              </div>
              <h3 className="mt-2 text-sm font-medium text-center">{category.name}</h3>
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
