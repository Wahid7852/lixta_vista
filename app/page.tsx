"use client"

import { useUser } from "@clerk/nextjs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import CategoryFloaterBanner from "@/components/category-floater-banner"
import OurCreations from "@/components/our-creations"
import DemoWalkthrough from "@/components/demo-walkthrough"
import HowItWorks from "@/components/how-it-works"
import WhyChooseUs from "@/components/why-choose-us"
import TestimonialsSection from "@/components/testimonials-section"
import StatsSection from "@/components/stats-section"
import FaqSection from "@/components/faq-section"
import DiscountPopup from "@/components/discount-popup"
import ReturningUserSection from "@/components/returning-user-section"
import GoToTop from "@/components/go-to-top"

export default function HomePage() {
  const { isSignedIn, user } = useUser()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Show discount popup for non-signed-in users */}
      {!isSignedIn && <DiscountPopup />}

      {/* Category Floater Banner */}
      <CategoryFloaterBanner />

      {/* Hero Section */}
      <HeroSection />

      {/* Returning User Section - Only for signed-in users */}
      {isSignedIn && <ReturningUserSection />}

      {/* Our Creations Section */}
      <OurCreations />

      {/* Demo Walkthrough */}
      <DemoWalkthrough />

      {/* How It Works */}
      <HowItWorks />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FaqSection />

      <Footer />

      {/* Go to Top Button */}
      <GoToTop />
    </div>
  )
}
