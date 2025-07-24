"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Search,
  ShoppingCart,
  Menu,
  Package,
  Shirt,
  FileText,
  Gift,
  Briefcase,
  Shield,
  Phone,
  Mail,
} from "lucide-react"
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"

const categories = [
  {
    name: "Business Cards & Stationery",
    icon: <Briefcase className="h-4 w-4" />,
    subcategories: ["Business Cards", "Letterheads", "Envelopes", "Notepads", "Folders", "Stamps"],
  },
  {
    name: "Apparel & Clothing",
    icon: <Shirt className="h-4 w-4" />,
    subcategories: ["T-Shirts", "Polo Shirts", "Hoodies", "Caps & Hats", "Uniforms", "Aprons"],
  },
  {
    name: "Promotional Products",
    icon: <Gift className="h-4 w-4" />,
    subcategories: ["Mugs & Drinkware", "Bags & Totes", "Tech Accessories", "Desk Items", "Keychains", "USB Drives"],
  },
  {
    name: "Marketing Materials",
    icon: <FileText className="h-4 w-4" />,
    subcategories: ["Brochures", "Flyers", "Posters", "Banners", "Signs", "Labels"],
  },
  {
    name: "Photo Gifts",
    icon: <Package className="h-4 w-4" />,
    subcategories: ["Photo Books", "Canvas Prints", "Photo Mugs", "Calendars", "Photo Frames", "Magnets"],
  },
]

const ADMIN_EMAILS = ["wahidzk0091@gmail.com", "admin@easegiv.com"]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState(0)
  const { isSignedIn, user } = useUser()
  const pathname = usePathname()

  const isAdmin =
    isSignedIn && user?.emailAddresses?.[0]?.emailAddress && ADMIN_EMAILS.includes(user.emailAddresses[0].emailAddress)

  useEffect(() => {
    // Check cart items from localStorage
    const cart = localStorage.getItem("cart")
    if (cart) {
      const cartData = JSON.parse(cart)
      setCartItems(cartData.length || 0)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-3 w-3" />
              <span>+91-80-1234-5678</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-3 w-3" />
              <span>support@easegiv.com</span>
            </div>
          </div>
          <span className="font-medium">🎉 Bulk Orders Only - MOQ 100 pieces | Free Design Consultation</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EG</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EaseGiv
            </span>
          </Link>

          {/* Categories Dropdown - Desktop */}
          <div className="hidden lg:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                  <Menu className="h-4 w-4" />
                  <span>All Categories</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="start">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.name} className="p-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="w-full p-3 flex items-center justify-between hover:bg-gray-50">
                        <div className="flex items-center space-x-2">
                          {category.icon}
                          <span>{category.name}</span>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" className="w-48">
                        {category.subcategories.map((sub) => (
                          <DropdownMenuItem key={sub} asChild>
                            <Link href={`/products/${sub.toLowerCase().replace(/\s+/g, "-")}`} className="w-full">
                              {sub}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Navigation Menu - Desktop */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    About Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
                    {categories.slice(0, 4).map((category) => (
                      <div key={category.name} className="space-y-2">
                        <h4 className="text-sm font-medium leading-none flex items-center space-x-2">
                          {category.icon}
                          <span>{category.name}</span>
                        </h4>
                        <div className="grid gap-1">
                          {category.subcategories.slice(0, 3).map((sub) => (
                            <Link
                              key={sub}
                              href={`/products/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/why-us" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Why Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/customize" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium transition-colors hover:from-blue-700 hover:to-purple-700">
                    Start Customizing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search - Desktop */}
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input type="search" placeholder="Search products..." className="pl-10 w-64" />
            </div>

            {/* Cart */}
            <Button variant="outline" size="sm" className="relative bg-transparent" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-4 w-4" />
                {cartItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItems}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Admin Panel Button - Only for Admin */}
            {isAdmin && (
              <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/admin" className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin Panel</span>
                </Link>
              </Button>
            )}

            {/* User Authentication */}
            {isSignedIn ? (
              <div className="flex items-center space-x-3">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                    },
                  }}
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900 flex items-center space-x-2">
                    <span>
                      {user?.firstName} {user?.lastName}
                    </span>
                    {isAdmin && (
                      <Badge variant="destructive" className="text-xs">
                        Admin
                      </Badge>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">{user?.emailAddresses[0]?.emailAddress}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Search - Mobile */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input type="search" placeholder="Search products..." className="pl-10" />
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-2">
                    <Link
                      href="/about"
                      className="block px-3 py-2 rounded-md hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      About Us
                    </Link>
                    <Link
                      href="/why-us"
                      className="block px-3 py-2 rounded-md hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      Why Us
                    </Link>
                    <Link
                      href="/customize"
                      className="block px-3 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      Start Customizing
                    </Link>
                  </div>

                  {/* Categories */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">Categories</h3>
                    {categories.map((category) => (
                      <div key={category.name} className="space-y-1">
                        <div className="flex items-center space-x-2 px-3 py-2 font-medium">
                          {category.icon}
                          <span>{category.name}</span>
                        </div>
                        <div className="pl-6 space-y-1">
                          {category.subcategories.map((sub) => (
                            <Link
                              key={sub}
                              href={`/products/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                              className="block px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                              onClick={() => setIsOpen(false)}
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Admin Panel - Mobile */}
                  {isAdmin && (
                    <div className="pt-4 border-t">
                      <Link
                        href="/admin"
                        className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-md"
                        onClick={() => setIsOpen(false)}
                      >
                        <Shield className="h-4 w-4" />
                        <span>Admin Panel</span>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar - Below Navigation */}
        <div className="pb-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input type="search" placeholder="Search products..." className="pl-10 w-full" />
          </div>
        </div>
      </div>
    </header>
  )
}
