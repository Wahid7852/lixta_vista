"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ShoppingBag, ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const productCategories = [
  {
    name: "Festive & Seasonal",
    icon: "🎁",
    subcategories: [
      {
        name: "Diwali Collection",
        items: ["Diwali Hampers", "Corporate Diwali Gifts", "Diwali Sweets & Dry Fruits", "Diwali Decoratives"],
        href: "/categories/festive/diwali",
      },
      {
        name: "Christmas Collection",
        items: ["Christmas Hampers", "Holiday Gift Sets", "Christmas Decorations", "Festive Treats"],
        href: "/categories/festive/christmas",
      },
      {
        name: "New Year Specials",
        items: ["Corporate Planners", "New Year Hampers", "Calendar Gifts", "Resolution Kits"],
        href: "/categories/festive/newyear",
      },
    ],
  },
  {
    name: "Corporate & Business",
    icon: "💼",
    subcategories: [
      {
        name: "Executive Gifts",
        items: ["Pen Sets", "Diary & Planner Combos", "Premium Gift Sets", "Desk Accessories"],
        href: "/categories/corporate/executive",
      },
      {
        name: "Employee Essentials",
        items: ["Welcome Kits", "Work from Home Sets", "Team Building Gifts", "Recognition Awards"],
        href: "/categories/corporate/employee",
      },
      {
        name: "Client Gifting",
        items: ["Business Hampers", "Corporate Branded Items", "Meeting Gifts", "Thank You Packages"],
        href: "/categories/corporate/client",
      },
    ],
  },
  {
    name: "Apparel & Accessories",
    icon: "👕",
    subcategories: [
      {
        name: "Custom Clothing",
        items: ["T-Shirts & Polos", "Hoodies & Sweatshirts", "Formal Shirts", "Jackets & Outerwear"],
        href: "/categories/apparel/clothing",
      },
      {
        name: "Accessories",
        items: ["Caps & Hats", "Bags & Backpacks", "Scarves & Ties", "Belts & Wallets"],
        href: "/categories/apparel/accessories",
      },
      {
        name: "Uniforms",
        items: ["Corporate Uniforms", "School Uniforms", "Sports Uniforms", "Industrial Wear"],
        href: "/categories/apparel/uniforms",
      },
    ],
  },
  {
    name: "Tech & Electronics",
    icon: "📱",
    subcategories: [
      {
        name: "Mobile Accessories",
        items: ["Phone Cases", "Power Banks", "Wireless Chargers", "Phone Stands"],
        href: "/categories/tech/mobile",
      },
      {
        name: "Computer Accessories",
        items: ["Mouse Pads", "USB Drives", "Laptop Sleeves", "Keyboard Accessories"],
        href: "/categories/tech/computer",
      },
      {
        name: "Smart Gadgets",
        items: ["Smart Watches", "Fitness Trackers", "Smart Home Devices", "IoT Products"],
        href: "/categories/tech/smart",
      },
    ],
  },
]

interface NavbarProps {
  user?: {
    name: string
    email: string
    avatar?: string
    isAdmin?: boolean
  } | null
  onSignOut?: () => void
}

export default function Navbar({ user, onSignOut }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut()
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
      } border-b`}
    >
      <div className="container mx-auto px-4">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo - More Prominent */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="EaseGiv" width={200} height={45} className="h-12 w-auto" priority />
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About Us
            </Link>
            <Link href="/why-us" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Why Us
            </Link>

            {/* Products Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-700 hover:text-blue-600 font-medium">
                  Products
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-80 max-h-96 overflow-y-auto">
                {productCategories.map((category) => (
                  <DropdownMenuSub key={category.name}>
                    <DropdownMenuSubTrigger className="flex items-center py-3 px-4 hover:bg-gray-50">
                      <span className="mr-3 text-lg">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-96 max-h-80 overflow-y-auto">
                      {category.subcategories.map((sub) => (
                        <div key={sub.name} className="p-3 hover:bg-gray-50">
                          <Link href={sub.href} className="block">
                            <div className="font-semibold text-sm text-gray-900 mb-2">{sub.name}</div>
                            <div className="grid grid-cols-2 gap-1">
                              {sub.items.map((item) => (
                                <div key={item} className="text-xs text-gray-600 hover:text-blue-600 py-1">
                                  {item}
                                </div>
                              ))}
                            </div>
                          </Link>
                        </div>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/products"
                    className="w-full text-center font-medium text-blue-600 hover:text-blue-700 py-3"
                  >
                    View All Products →
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right Section - User & Actions */}
          <div className="flex items-center space-x-4">
            {/* Help */}
            <div className="hidden lg:block text-right">
              <div className="text-xs text-muted-foreground">Need Help?</div>
              <div className="text-xs font-medium text-blue-600">+91-80-1234-5678</div>
            </div>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="text-xs text-gray-500">Hello,</div>
                      <div className="text-sm font-medium">{user.name}</div>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Your Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Your Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wishlist">Your Wishlist</Link>
                  </DropdownMenuItem>
                  {user.isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="text-blue-600 font-medium">
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/signin">
                    <div className="text-left">
                      <div className="text-xs text-gray-500">Hello, sign in</div>
                      <div className="text-sm font-medium">Account & Lists</div>
                    </div>
                  </Link>
                </Button>
              </div>
            )}

            {/* Cart */}
            <Button asChild variant="ghost" className="relative">
              <Link href="/cart" className="flex items-center">
                <ShoppingBag className="h-6 w-6" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-orange-500">2</Badge>
                <span className="hidden md:inline ml-2 font-medium">Cart</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Search Bar Below Navigation */}
        <div className="pb-4">
          <div className="relative max-w-4xl mx-auto">
            <Input
              type="search"
              placeholder="Search for products, categories, suppliers... (Bulk Orders Only - MOQ 100+)"
              className="pr-12 h-12 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-center md:text-left"
            />
            <Button
              size="icon"
              className="absolute right-0 top-0 h-12 w-12 rounded-r-lg bg-orange-500 hover:bg-orange-600"
            >
              <Search className="h-5 w-5 text-white" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
