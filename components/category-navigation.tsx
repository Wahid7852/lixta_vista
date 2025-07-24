"use client"
import Link from "next/link"
import { ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const categories = [
  {
    name: "Visiting Cards",
    href: "/category/visiting-cards",
    subcategories: [
      { name: "Standard Cards", href: "/category/visiting-cards/standard" },
      { name: "Premium Cards", href: "/category/visiting-cards/premium" },
      { name: "Luxury Cards", href: "/category/visiting-cards/luxury" },
    ],
  },
  {
    name: "Stationery & Letterheads",
    href: "/category/stationery",
    subcategories: [
      { name: "Letterheads", href: "/category/stationery/letterheads" },
      { name: "Notebooks", href: "/category/stationery/notebooks" },
      { name: "Envelopes", href: "/category/stationery/envelopes" },
    ],
  },
  {
    name: "Stamps and Ink",
    href: "/category/stamps",
    subcategories: [
      { name: "Custom Stamps", href: "/category/stamps/custom" },
      { name: "Ink Pads", href: "/category/stamps/ink-pads" },
      { name: "Self-Inking Stamps", href: "/category/stamps/self-inking" },
    ],
  },
  {
    name: "Signs & Marketing",
    href: "/category/marketing",
    subcategories: [
      { name: "Banners", href: "/category/marketing/banners" },
      { name: "Posters", href: "/category/marketing/posters" },
      { name: "Flyers", href: "/category/marketing/flyers" },
    ],
  },
  {
    name: "Labels & Packaging",
    href: "/category/labels",
    subcategories: [
      { name: "Stickers", href: "/category/labels/stickers" },
      { name: "Labels", href: "/category/labels/custom-labels" },
      { name: "Packaging", href: "/category/labels/packaging" },
    ],
  },
  {
    name: "Clothing & Accessories",
    href: "/category/clothing",
    subcategories: [
      { name: "T-Shirts", href: "/category/clothing/tshirts" },
      { name: "Caps & Hats", href: "/category/clothing/caps" },
      { name: "Bags", href: "/category/clothing/bags" },
    ],
  },
  {
    name: "Gifts & Albums",
    href: "/category/gifts",
    subcategories: [
      { name: "Mugs", href: "/category/gifts/mugs" },
      { name: "Photo Albums", href: "/category/gifts/albums" },
      { name: "Custom Gifts", href: "/category/gifts/custom" },
    ],
  },
]

export function CategoryNavigation() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
          <Menu className="h-4 w-4" />
          <span className="hidden sm:inline">Categories</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="start">
        {categories.map((category) => (
          <div key={category.name} className="p-2">
            <Link href={category.href} className="block px-2 py-1 font-medium text-gray-900 hover:bg-gray-100 rounded">
              {category.name}
            </Link>
            <div className="ml-4 mt-1 space-y-1">
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.name}
                  href={sub.href}
                  className="block px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CategoryNavigation
