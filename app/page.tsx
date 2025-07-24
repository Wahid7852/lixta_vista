"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import CategoryFloaterBanner from "@/components/category-floater-banner"
import OurCreations from "@/components/our-creations"
import DemoWalkthrough from "@/components/demo-walkthrough"
import HowItWorks from "@/components/how-it-works"
import FeaturesSection from "@/components/features-section"
import TestimonialsSection from "@/components/testimonials-section"
import StatsSection from "@/components/stats-section"
import AboutUsSection from "@/components/about-us-section"
import ContactSection from "@/components/contact-section"
import FaqSection from "@/components/faq-section"
import ReturningUserSection from "@/components/returning-user-section"
import DiscountPopup from "@/components/discount-popup"
import GoToTop from "@/components/go-to-top"

export default function HomePage() {
  const { isSignedIn, user } = useUser()
  const [isPopupOpen, setIsPopupOpen] = useState(true)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Category Floater Banner */}
      <CategoryFloaterBanner />

      {/* Hero Section */}
      <HeroSection />

      {/* Returning User Section - Only show for signed-in users */}
      {isSignedIn && user && (
        <ReturningUserSection
          userName={user.firstName || user.emailAddresses[0]?.emailAddress || "User"}
          userEmail={user.emailAddresses[0]?.emailAddress || ""}
        />
      )}

      {/* Our Creations Section */}
      <OurCreations />

      {/* Demo Walkthrough */}
      <DemoWalkthrough />

      {/* How It Works */}
      <HowItWorks />

      {/* Features Section */}
      <FeaturesSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* About Us Section */}
      <AboutUsSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* Contact Section */}
      <ContactSection />

      <Footer />

      {!isSignedIn && (
        <DiscountPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      )}

      {/* Go to Top Button */}
      <GoToTop />
    </div>
  )
}
