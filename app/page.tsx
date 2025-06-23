"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ShoppingBag, Star, ArrowRight, Zap, Users, Award, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import CategoryNavigation from "@/components/category-navigation"
import PromotionBanner from "@/components/promotion-banner"
import UserDataPopup from "@/components/user-data-popup"
import GoToTop from "@/components/go-to-top"

const featuredProducts = [
  {
    id: 1,
    name: "Custom T-Shirts",
    description: "Premium quality custom printed T-shirts",
    image: "/images/categories/tshirts.jpg",
    price: "Starting ₹299",
    rating: 4.8,
    reviews: 2847,
    badge: "Most Popular",
    color: "from-blue-500 to-purple-600",
  },
  {
    id: 2,
    name: "Business Cards",
    description: "Professional business cards that make an impression",
    image: "/images/categories/visiting-cards.jpg",
    price: "Starting ₹199",
    rating: 4.9,
    reviews: 1923,
    badge: "Best Quality",
    color: "from-green-500 to-teal-600",
  },
  {
    id: 3,
    name: "Custom Mugs",
    description: "Personalized mugs for gifts and promotions",
    image: "/images/categories/photo-gifts.jpg",
    price: "Starting ₹249",
    rating: 4.7,
    reviews: 1456,
    badge: "Great Gift",
    color: "from-orange-500 to-red-600",
  },
  {
    id: 4,
    name: "Polo T-Shirts",
    description: "Corporate polo shirts with custom branding",
    image: "/images/categories/polo-tshirts.jpg",
    price: "Starting ₹399",
    rating: 4.8,
    reviews: 987,
    badge: "Corporate",
    color: "from-purple-500 to-pink-600",
  },
]

const quickServices = [
  {
    icon: "🎨",
    title: "Design Online",
    description: "Use our easy design tools",
    color: "bg-blue-100 text-blue-800",
  },
  {
    icon: "📤",
    title: "Upload Logo",
    description: "Add your existing designs",
    color: "bg-green-100 text-green-800",
  },
  {
    icon: "🚀",
    title: "Quick Delivery",
    description: "Fast turnaround times",
    color: "bg-purple-100 text-purple-800",
  },
  {
    icon: "💎",
    title: "Premium Quality",
    description: "High-quality materials",
    color: "bg-orange-100 text-orange-800",
  },
]

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Startup Founder",
    image: "/images/testimonials/person1.jpg",
    rating: 5,
    text: "Amazing quality and super fast delivery! Our startup t-shirts look incredible.",
    company: "TechStart Solutions",
  },
  {
    name: "Priya Sharma",
    role: "Marketing Manager",
    image: "/images/testimonials/person2.jpg",
    rating: 5,
    text: "The business cards exceeded our expectations. Professional quality at great prices!",
    company: "Digital Marketing Pro",
  },
  {
    name: "Amit Patel",
    role: "Event Organizer",
    image: "/images/testimonials/person3.jpg",
    rating: 5,
    text: "Perfect for our corporate events. The team loved their custom merchandise!",
    company: "EventCraft India",
  },
]

export default function Home() {
  const [showUserPopup, setShowUserPopup] = useState(false)
  const [userInteracted, setUserInteracted] = useState(false)

  // Show popup after 7 seconds of user interaction
  useEffect(() => {
    if (!userInteracted) return

    const timer = setTimeout(() => {
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
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image src="/logo.svg" alt="EaseGiv" width={180} height={40} className="h-10 w-auto" priority />
            </Link>

            {/* Search */}
            <div className="hidden md:flex relative flex-1 max-w-md mx-6">
              <Input
                type="search"
                placeholder="Search for products..."
                className="pr-10 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <Button size="icon" variant="ghost" className="absolute right-0 top-0 h-full rounded-full">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <div className="text-xs text-muted-foreground">Need Help?</div>
                <div className="text-xs font-medium text-blue-600">+91-80-1234-5678</div>
              </div>
              <Link href="/projects" className="hidden md:flex items-center text-sm font-medium hover:text-blue-600">
                <Image src="/icons/projects.svg" alt="" width={20} height={20} className="mr-1" />
                My Projects
              </Link>
              <Link href="/favorites" className="hidden md:flex items-center text-sm font-medium hover:text-blue-600">
                <Image src="/icons/heart.svg" alt="" width={20} height={20} className="mr-1" />
                Favorites
              </Link>
              <Link href="/signin" className="hidden md:flex items-center text-sm font-medium hover:text-blue-600">
                <Image src="/icons/user.svg" alt="" width={20} height={20} className="mr-1" />
                Sign in
              </Link>
              <Link
                href="/cart"
                className="flex items-center text-sm font-medium bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700"
              >
                <ShoppingBag className="h-4 w-4 mr-1" />
                <span className="hidden md:inline">Cart</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search for products..."
              className="pr-10 rounded-full border-gray-300 w-full"
            />
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
        <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300 opacity-20 rounded-full animate-bounce"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-300 opacity-15 rounded-full animate-pulse"></div>
          </div>

          <div className="relative container mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-yellow-400 text-black font-bold px-4 py-2 text-sm">
                    🔥 India's #1 Custom Printing Platform
                  </Badge>
                  <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                    Design. Print.
                    <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                      {" "}
                      Deliver.
                    </span>
                  </h1>
                  <p className="text-xl text-blue-100 leading-relaxed">
                    Create stunning custom products with our easy-to-use design tools. From business cards to t-shirts,
                    we've got you covered!
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    <Link href="/customize">
                      🎨 Start Designing
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 font-bold px-8 py-4 text-lg rounded-full"
                  >
                    <Link href="#products">View Products</Link>
                  </Button>
                </div>

                <div className="flex items-center space-x-8 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">2M+</div>
                    <div className="text-sm text-blue-200">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">50M+</div>
                    <div className="text-sm text-blue-200">Products Printed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">4.9★</div>
                    <div className="text-sm text-blue-200">Customer Rating</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10">
                  <Image
                    src="/images/hero-tshirts.jpg"
                    alt="Custom T-shirts showcase"
                    width={600}
                    height={500}
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl opacity-20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Get your custom products in just a few simple steps</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickServices.map((service, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-white">
                  <CardContent className="pt-6">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${service.color}`}
                    >
                      <span className="text-2xl">{service.icon}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="products" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Our{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Featured Products
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Discover our most popular custom printing solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0"
                >
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={`bg-gradient-to-r ${product.color} text-white font-bold`}>
                        {product.badge}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">{product.price}</span>
                      <Button
                        asChild
                        size="sm"
                        className={`bg-gradient-to-r ${product.color} text-white hover:shadow-lg transition-all`}
                      >
                        <Link href="/customize">Customize</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg px-8 py-4 rounded-full"
              >
                <Link href="/customize">
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Choose EaseGiv?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                We're committed to delivering the best custom printing experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Zap className="h-8 w-8" />,
                  title: "Lightning Fast",
                  description: "Quick turnaround times without compromising quality",
                  color: "from-yellow-400 to-orange-500",
                },
                {
                  icon: <Award className="h-8 w-8" />,
                  title: "Premium Quality",
                  description: "High-quality materials and state-of-the-art printing",
                  color: "from-purple-400 to-pink-500",
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Expert Support",
                  description: "Dedicated customer support team to help you",
                  color: "from-green-400 to-blue-500",
                },
                {
                  icon: <Truck className="h-8 w-8" />,
                  title: "Free Shipping",
                  description: "Free delivery on orders above ₹1,000",
                  color: "from-blue-400 to-purple-500",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 bg-white"
                >
                  <CardContent className="pt-6">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center text-white`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                What Our{" "}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Customers Say
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Join thousands of satisfied customers who trust us with their printing needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white hover:shadow-xl transition-all duration-300 border-0">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                    <div className="flex items-center">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                        <div className="text-xs text-blue-600">{testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-300 opacity-20 rounded-full animate-bounce"></div>
          </div>

          <div className="relative container mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join millions of customers who trust EaseGiv for their custom printing needs. Start designing today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/customize">
                  🚀 Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 font-bold px-8 py-4 text-lg rounded-full"
              >
                <Link href="#contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* User Data Popup */}
        <UserDataPopup isOpen={showUserPopup} onClose={() => setShowUserPopup(false)} onSubmit={handleUserDataSubmit} />

        {/* Go to Top Button */}
        <GoToTop />
      </main>

      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <Image
                  src="/logo.svg"
                  alt="EaseGiv"
                  width={150}
                  height={35}
                  className="h-8 w-auto filter brightness-0 invert"
                />
              </div>
              <p className="text-gray-400 mb-4">
                India's leading custom printing platform. Quality products, fast delivery, and exceptional service.
              </p>
              <div className="flex space-x-4">
                {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                  <Link key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                      <span className="text-sm font-bold">{social[0].toUpperCase()}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">Products</h3>
              <ul className="space-y-3">
                {["Custom T-Shirts", "Business Cards", "Mugs & Gifts", "Stationery", "Signs & Banners"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">Support</h3>
              <ul className="space-y-3">
                {["Help Center", "Contact Us", "Order Status", "Shipping Info", "Returns"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">Contact</h3>
              <div className="space-y-3 text-gray-400">
                <div>📧 hello@easegiv.com</div>
                <div>📞 +91-80-1234-5678</div>
                <div>📍 Bangalore, Karnataka</div>
                <div>🕒 Mon-Sat: 9AM-7PM</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} EaseGiv Pvt. Ltd. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
