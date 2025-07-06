"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedBanner from "@/components/animated-banner"
import HowItWorks from "@/components/how-it-works"
import WhyChooseUs from "@/components/why-choose-us"
import PromotionBanner from "@/components/promotion-banner"
import CategoryShowcase from "@/components/category-showcase"
import TestimonialsSection from "@/components/testimonials-section"
import UserDataPopup from "@/components/user-data-popup"
import ReturningUserSection from "@/components/returning-user-section"
import GoToTop from "@/components/go-to-top"

interface User {
  name: string
  email: string
  avatar?: string
  isAdmin?: boolean
  isReturning: boolean
  registrationDate: string
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [showUserPopup, setShowUserPopup] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)

  // Check for existing user data on component mount
  useEffect(() => {
    const userData = localStorage.getItem("easegiv_user")
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser({
          ...parsedUser,
          isReturning: true,
        })
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("easegiv_user")
      }
    }
  }, [])

  // Show popup for new users after interaction
  useEffect(() => {
    if (!userInteracted || user) return

    const timer = setTimeout(() => {
      const existingUserData = localStorage.getItem("easegiv_user")
      if (!existingUserData) {
        setShowUserPopup(true)
      }
    }, 3000) // Show popup after 3 seconds of interaction

    return () => clearTimeout(timer)
  }, [userInteracted, user])

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
    const newUser: User = {
      name: data.name,
      email: data.email,
      isReturning: false,
      registrationDate: new Date().toISOString(),
    }

    localStorage.setItem("easegiv_user", JSON.stringify(newUser))
    setUser(newUser)
    setShowUserPopup(false)
  }

  const handleSignOut = () => {
    localStorage.removeItem("easegiv_user")
    setUser(null)
  }

  const isNewUser = user && !user.isReturning
  const isReturningUser = user && user.isReturning

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <Navbar user={user} onSignOut={handleSignOut} />

      <main className="flex-1">
        {/* Promotion Banner */}
        <PromotionBanner />

        {/* Conditional Content Based on User Type */}
        {isReturningUser ? (
          <>
            {/* Returning User Personalized Section */}
            <ReturningUserSection user={user} />

            {/* Reduced content for returning users */}
            <CategoryShowcase />
            <TestimonialsSection />
          </>
        ) : (
          <>
            {/* New User Welcome (if just registered) */}
            {isNewUser && (
              <section className="py-8 bg-gradient-to-r from-green-50 to-blue-50">
                <div className="container mx-auto px-4 text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to EaseGiv, {user.name}! 🎉</h2>
                  <p className="text-gray-600">
                    Your account is ready! Start exploring our platform and connect with verified suppliers.
                  </p>
                </div>
              </section>
            )}

            {/* Full content for new/anonymous users */}
            <AnimatedBanner />
            <HowItWorks />
            <CategoryShowcase />
            <WhyChooseUs />
            <TestimonialsSection />
          </>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-300 opacity-20 rounded-full animate-bounce"></div>
          </div>

          <div className="relative container mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold mb-6">
              {isReturningUser ? "Ready for Your Next Project?" : "Ready to Start Customizing?"}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {isReturningUser
                ? "Continue where you left off or explore new customization possibilities"
                : "Join thousands of businesses who use EaseGiv to connect with verified suppliers and create custom products"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                🚀 Start Customizing
              </button>
              <button className="border-white text-white hover:bg-white hover:text-blue-600 border-2 font-bold px-8 py-4 text-lg rounded-full transition-all">
                📋 Browse Suppliers
              </button>
            </div>
          </div>
        </section>

        {/* User Data Popup - Unclosable for new users */}
        <UserDataPopup
          isOpen={showUserPopup}
          onSubmit={handleUserDataSubmit}
          isClosable={false} // Make it unclosable for new users
        />

        {/* Go to Top Button */}
        <GoToTop />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
