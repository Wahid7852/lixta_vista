"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DiscountPopup from "@/components/discount-popup"
import GoToTop from "@/components/go-to-top"

export default function HomePage() {
  const { isSignedIn, user, isLoaded } = useUser()
  const [showDiscountPopup, setShowDiscountPopup] = useState(false)
  const [discountCode, setDiscountCode] = useState<string | null>(null)
  const [isReturningUser, setIsReturningUser] = useState(false)

  useEffect(() => {
    if (!isLoaded) return

    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem("hasSeenDiscountPopup")
    const storedDiscountCode = localStorage.getItem("discountCode")

    if (storedDiscountCode) {
      setDiscountCode(storedDiscountCode)
      setIsReturningUser(true)
    } else if (!hasSeenPopup && !isSignedIn) {
      // Show popup after 2 seconds for new users
      const timer = setTimeout(() => {
        setShowDiscountPopup(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isLoaded, isSignedIn])

  const handleDiscountSuccess = (code: string) => {
    setDiscountCode(code)
    setShowDiscountPopup(false)
    setIsReturningUser(true)
    localStorage.setItem("discountCode", code)
    localStorage.setItem("hasSeenDiscountPopup", "true")
  }

  const handleClosePopup = () => {
    setShowDiscountPopup(false)
    localStorage.setItem("hasSeenDiscountPopup", "true")
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Premium B2B Customization Solutions</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Connect with verified suppliers across India for all your bulk customization needs. Minimum 25 pieces per
              order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Customizing
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                View Products
              </button>
            </div>
            {discountCode && (
              <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm mb-2">Your discount code:</p>
                <code className="text-2xl font-bold">{discountCode}</code>
                <p className="text-sm mt-2">Use at checkout for 15% off!</p>
              </div>
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Product Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { name: "Business Cards", icon: "💼" },
                { name: "T-Shirts & Apparel", icon: "👕" },
                { name: "Mugs & Drinkware", icon: "☕" },
                { name: "Stationery", icon: "📝" },
                { name: "Marketing Materials", icon: "📢" },
                { name: "Custom Gifts", icon: "🎁" },
                { name: "Labels & Stickers", icon: "🏷️" },
                { name: "Promotional Items", icon: "🎯" },
              ].map((category) => (
                <div
                  key={category.name}
                  className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose EaseGiv?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏭</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Suppliers</h3>
                <p className="text-gray-600">Connect with trusted suppliers across India for quality products</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Bulk Orders Only</h3>
                <p className="text-gray-600">Minimum 25 pieces per order for better pricing and efficiency</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Custom Design</h3>
                <p className="text-gray-600">Free design consultation and customization support</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <GoToTop />

      {/* Discount Popup */}
      <DiscountPopup isOpen={showDiscountPopup} onClose={handleClosePopup} />
    </div>
  )
}
