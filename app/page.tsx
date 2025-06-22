"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CategoryNavigation from "@/components/category-navigation"
import PromotionBanner from "@/components/promotion-banner"
import HeroSection from "@/components/hero-section"
import CategoryShowcase from "@/components/category-showcase"
import FeaturesSection from "@/components/features-section"
import TestimonialsSection from "@/components/testimonials-section"
import StatsSection from "@/components/stats-section"
import UserDataPopup from "@/components/user-data-popup"
import GoToTop from "@/components/go-to-top"

export default function Home() {
  const [showUserPopup, setShowUserPopup] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)

  // Show popup after 7 seconds of user interaction
  useEffect(() => {
    if (!userInteracted) return

    const timer = setTimeout(() => {
      // Check if user data already exists
      const existingUserData = localStorage.getItem("userData")
      if (!existingUserData) {
        setShowUserPopup(true)
      }
    }, 7000)

    return () => clearTimeout(timer)
  }, [userInteracted])

  // Track user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true)
      }
    }

    document.addEventListener("click", handleUserInteraction)
    document.addEventListener("scroll", handleUserInteraction)
    document.addEventListener("keydown", handleUserInteraction)

    return () => {
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("scroll", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
    }
  }, [userInteracted])

  const handleUserDataSubmit = (data: { name: string; email: string }) => {
    localStorage.setItem("userData", JSON.stringify(data))
    console.log("User data collected:", data)
    // Here you would typically send this data to your backend
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="EaseGiv" width={180} height={40} className="h-10 w-auto" priority />
            </Link>

            {/* Search */}
            <div className="hidden md:flex relative flex-1 max-w-md mx-6">
              <Input type="search" placeholder="Search" className="pr-10 rounded-md border-gray-300" />
              <Button size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <div className="text-xs text-muted-foreground">Help is here</div>
                <div className="text-xs font-medium">+91-80-1234-5678</div>
              </div>
              <Link href="/projects" className="hidden md:flex items-center text-sm font-medium">
                <Image src="/icons/projects.svg" alt="" width={20} height={20} className="mr-1" />
                My Projects
              </Link>
              <Link href="/favorites" className="hidden md:flex items-center text-sm font-medium">
                <Image src="/icons/heart.svg" alt="" width={20} height={20} className="mr-1" />
                My Favorites
              </Link>
              <Link href="/signin" className="hidden md:flex items-center text-sm font-medium">
                <Image src="/icons/user.svg" alt="" width={20} height={20} className="mr-1" />
                Sign in
              </Link>
              <Link href="/cart" className="flex items-center text-sm font-medium">
                <ShoppingBag className="h-5 w-5 mr-1" />
                <span className="hidden md:inline">Cart</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <Input type="search" placeholder="Search" className="pr-10 rounded-md border-gray-300 w-full" />
            <Button size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>

        {/* Category Navigation */}
        <CategoryNavigation />
      </header>

      <main className="flex-1">
        {/* Promotion Banner */}
        <PromotionBanner />

        {/* Hero Section */}
        <HeroSection />

        {/* Customize Your Products CTA */}
        <div className="container mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">See Your Logo on Our Products</h2>
              <p className="text-gray-700 mb-4">
                Upload your logo and instantly see how it looks on our wide range of products. Customize position, size,
                and more! Minimum order quantities apply.
              </p>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/customize">Try It Now</Link>
              </Button>
            </div>
            <div className="w-full md:w-1/3">
              <Image
                src="/images/logo-customization-preview.jpg"
                alt="Logo customization preview"
                width={300}
                height={200}
                className="w-full h-auto rounded-md shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Category Showcase */}
        <CategoryShowcase />

        {/* Features Section */}
        <FeaturesSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Stats Section */}
        <StatsSection />

        {/* User Data Popup */}
        <UserDataPopup isOpen={showUserPopup} onClose={() => setShowUserPopup(false)} onSubmit={handleUserDataSubmit} />

        {/* Go to Top Button */}
        <GoToTop />
      </main>

      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About EaseGiv</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Order Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-4">
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Subscribe to our newsletter</h4>
                <div className="flex">
                  <Input type="email" placeholder="Your email" className="rounded-r-none" />
                  <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} EaseGiv Pvt. Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
