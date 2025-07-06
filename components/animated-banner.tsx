"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const bannerSlides = [
  {
    id: 1,
    title: "Design",
    subtitle: "Creative Conceptualization",
    description: "Connect with expert designers and suppliers to bring your custom product ideas to life",
    image: "/images/banner/design-concept.png",
    color: "from-purple-600 to-blue-600",
    products: ["Custom Logos", "Product Design", "Brand Identity", "Creative Concepts"],
    cta: "Start Customizing",
    href: "/customize",
  },
  {
    id: 2,
    title: "Concept",
    subtitle: "Supplier Network",
    description: "Access our vast network of verified suppliers and manufacturers for any custom product need",
    image: "/images/banner/concept-development.png",
    color: "from-green-600 to-teal-600",
    products: ["Verified Suppliers", "Quality Control", "Bulk Orders", "Custom Manufacturing"],
    cta: "Find Suppliers",
    href: "/suppliers",
  },
  {
    id: 3,
    title: "Deliver",
    subtitle: "Seamless Fulfillment",
    description: "End-to-end order management with quality assurance and timely delivery to your customers",
    image: "/images/banner/delivery-excellence.png",
    color: "from-orange-600 to-red-600",
    products: ["Order Management", "Quality Assurance", "Logistics", "Customer Support"],
    cta: "View Orders",
    href: "/orders",
  },
]

export default function AnimatedBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const current = bannerSlides[currentSlide]

  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${current.color} transition-all duration-1000`}>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-yellow-300/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-pink-300/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-green-300/20 rounded-full animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-bold">
                {current.subtitle}
              </Badge>

              <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                {current.title}
                <span className="block text-3xl md:text-4xl font-normal text-white/80 mt-2">Excellence</span>
              </h1>

              <p className="text-xl text-white/90 leading-relaxed max-w-lg">{current.description}</p>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-4">
              {current.products.map((product, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm text-white/90">{product}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button
              asChild
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Link href={current.href}>
                {current.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
              <Image
                src={current.image || "/placeholder.svg"}
                alt={current.title}
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-black px-4 py-2 rounded-full shadow-lg font-bold text-sm animate-bounce">
                ✨ B2B Platform
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -top-6 -left-6 w-full h-full bg-white/20 rounded-2xl transform rotate-3"></div>
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-white/10 rounded-2xl transform -rotate-2"></div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30 rounded-full w-12 h-12"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30 rounded-full w-12 h-12"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{
            width: `${((currentSlide + 1) / bannerSlides.length) * 100}%`,
          }}
        />
      </div>
    </section>
  )
}
