"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const categories = [
  { name: "View All", href: "/" },
  { name: "Visiting Cards", href: "/visiting-cards" },
  { name: "Stationery, Letterheads & Notebooks", href: "/stationery" },
  { name: "Stamps and Ink", href: "/stamps" },
  { name: "Signs, Posters & Marketing Materials", href: "/signs" },
  { name: "Labels, Stickers & Packaging", href: "/labels" },
  { name: "Clothing, Caps & Bags", href: "/clothing" },
  { name: "Mugs, Albums & Gifts", href: "/gifts" },
  { name: "Bulk Orders", href: "/bulk-orders" },
  { name: "Custom Drinkware", href: "/drinkware" },
  { name: "Custom Polo T-shirts", href: "/polo-tshirts" },
  { name: "Umbrellas & Raincoats", href: "/umbrellas" },
]

export default function CategoryNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        {/* Mobile menu button */}
        <div className="flex md:hidden py-3 justify-between items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-900 focus:outline-none">
            <span className="sr-only">Open menu</span>
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <span className="font-medium">Categories</span>
        </div>

        {/* Mobile menu */}
        <div className={cn("md:hidden", isOpen ? "block" : "hidden")}>
          <div className="space-y-1 pb-3 pt-2">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:flex space-x-8 overflow-x-auto py-3 text-sm font-medium">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="whitespace-nowrap text-gray-700 hover:text-gray-900"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
