"use client"

import Link from "next/link"
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Search, ShoppingCart } from "lucide-react"
import { Input } from "@/components/ui/input"
import CategoryNavigation from "./category-navigation"

export function Navbar() {
  const { isSignedIn, user } = useUser()
  const isAdmin = user?.emailAddresses[0]?.emailAddress === "wahidzk0091@gmail.com"

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-50 px-4 py-2 text-sm text-center">
        <span className="font-medium text-red-600">🔥 BULK ORDERS ONLY</span> - Minimum 25 pieces per order
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Categories + Logo */}
          <div className="flex items-center space-x-4">
            <CategoryNavigation />
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-gray-900">EaseGiv</span>
            </Link>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search for products, categories..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right: Auth + Cart + Admin */}
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <UserButton afterSignOutUrl="/" />
                {isAdmin && (
                  <Link href="/admin">
                    <Button variant="destructive" size="sm">
                      Admin Panel
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">Sign Up</Button>
                </SignUpButton>
              </div>
            )}

            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="border-t py-2">
          <nav className="flex items-center space-x-8 text-sm">
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About Us
            </Link>
            <Link href="/why-us" className="text-gray-600 hover:text-gray-900">
              Why Us
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-gray-900">
              Products
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
