"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Eye, Heart, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OurCreationsProps {
  darkMode?: boolean
}

const creations = [
  {
    id: 1,
    title: "Tech Startup T-Shirt Collection",
    client: "InnovateTech Solutions",
    category: "Corporate",
    image: "/portfolio/tshirt-restaurant.jpg",
    description: "Custom branded t-shirts for 500+ employees with modern design",
    quantity: "500 pieces",
    rating: 4.9,
    views: 1250,
    likes: 89,
    tags: ["T-Shirts", "Corporate", "Tech"],
    color: "from-blue-500 to-purple-500",
  },
  {
    id: 2,
    title: "Premium Coffee Mug Series",
    client: "Brew Masters Cafe",
    category: "Hospitality",
    image: "/portfolio/mug-corporate.jpg",
    description: "Elegant ceramic mugs with custom logo for cafe chain",
    quantity: "1000 pieces",
    rating: 4.8,
    views: 980,
    likes: 67,
    tags: ["Mugs", "Hospitality", "Ceramic"],
    color: "from-orange-500 to-red-500",
  },
  {
    id: 3,
    title: "Executive Business Card Design",
    client: "Legal Associates LLP",
    category: "Professional",
    image: "/portfolio/business-card-creative.jpg",
    description: "Premium business cards with gold foiling and embossed logo",
    quantity: "2000 pieces",
    rating: 5.0,
    views: 1500,
    likes: 120,
    tags: ["Business Cards", "Premium", "Legal"],
    color: "from-green-500 to-teal-500",
  },
  {
    id: 4,
    title: "Sports Team Merchandise",
    client: "City Champions FC",
    category: "Sports",
    image: "/portfolio/tshirt-sports.jpg",
    description: "Complete merchandise set for football team including jerseys",
    quantity: "300 pieces",
    rating: 4.7,
    views: 850,
    likes: 95,
    tags: ["Sports", "Jerseys", "Team"],
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: 5,
    title: "Festival Gift Hampers",
    client: "Corporate Gifting Co.",
    category: "Festive",
    image: "/portfolio/mug-coffee.jpg",
    description: "Diwali gift hampers with custom packaging and branding",
    quantity: "800 pieces",
    rating: 4.9,
    views: 1100,
    likes: 78,
    tags: ["Hampers", "Festive", "Diwali"],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 6,
    title: "Music Band Promotional Items",
    client: "Rhythm Rebels Band",
    category: "Entertainment",
    image: "/portfolio/tshirt-music.jpg",
    description: "Concert merchandise including t-shirts, caps, and stickers",
    quantity: "400 pieces",
    rating: 4.6,
    views: 720,
    likes: 56,
    tags: ["Music", "Concert", "Merchandise"],
    color: "from-indigo-500 to-purple-500",
  },
]

const categories = ["All", "Corporate", "Hospitality", "Professional", "Sports", "Festive", "Entertainment"]

export default function OurCreations({ darkMode = false }: OurCreationsProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("recent")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filteredCreations = creations.filter(
    (creation) => selectedCategory === "All" || creation.category === selectedCategory,
  )

  const sortedCreations = [...filteredCreations].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "popular":
        return b.views - a.views
      case "recent":
      default:
        return b.id - a.id
    }
  })

  const totalPages = Math.ceil(sortedCreations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedCreations = sortedCreations.slice(startIndex, startIndex + itemsPerPage)

  return (
    <section className={`py-20 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            className={`${darkMode ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-800"} px-4 py-2 text-sm font-bold mb-4`}
          >
            Portfolio Showcase
          </Badge>
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? "text-white" : ""}`}>
            Our{" "}
            <span
              className={`bg-gradient-to-r ${darkMode ? "from-purple-400 to-pink-400" : "from-purple-600 to-pink-600"} bg-clip-text text-transparent`}
            >
              Creations
            </span>
          </h2>
          <p className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-600"} max-w-3xl mx-auto`}>
            Explore our portfolio of successful B2B customization projects delivered to satisfied clients across India
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedCategory(category)
                  setCurrentPage(1)
                }}
                className={`${
                  selectedCategory === category
                    ? darkMode
                      ? "bg-purple-600 text-white"
                      : "bg-purple-600 text-white"
                    : darkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-4">
            <Filter className={`h-4 w-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className={`w-40 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={darkMode ? "bg-gray-700 border-gray-600" : ""}>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Creations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedCreations.map((creation) => (
            <Card
              key={creation.id}
              className={`${darkMode ? "bg-gray-900 border-gray-700" : "bg-white"} overflow-hidden hover:shadow-2xl transition-all duration-300 group`}
            >
              <div className="relative">
                <Image
                  src={creation.image || "/placeholder.svg"}
                  alt={creation.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
                    <Button size="sm" className="bg-white text-black hover:bg-gray-100">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Category Badge */}
                <Badge className={`absolute top-3 left-3 bg-gradient-to-r ${creation.color} text-white`}>
                  {creation.category}
                </Badge>

                {/* Rating */}
                <div
                  className={`absolute top-3 right-3 ${darkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1`}
                >
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className={`text-xs font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {creation.rating}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className={`text-lg font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {creation.title}
                </h3>
                <p className={`text-sm ${darkMode ? "text-purple-400" : "text-purple-600"} font-medium mb-2`}>
                  {creation.client}
                </p>
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"} mb-4 line-clamp-2`}>
                  {creation.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {creation.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`text-sm font-medium ${darkMode ? "text-green-400" : "text-green-600"}`}>
                    {creation.quantity}
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {creation.views}
                    </span>
                    <span className="flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      {creation.likes}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Button className={`w-full bg-gradient-to-r ${creation.color} hover:opacity-90 text-white`}>
                  Get Similar Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={darkMode ? "border-gray-600 text-gray-300" : ""}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 ${
                    currentPage === page
                      ? darkMode
                        ? "bg-purple-600"
                        : "bg-purple-600"
                      : darkMode
                        ? "border-gray-600 text-gray-300"
                        : ""
                  }`}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={darkMode ? "border-gray-600 text-gray-300" : ""}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div
            className={`${darkMode ? "bg-gradient-to-r from-purple-600 to-pink-600" : "bg-gradient-to-r from-purple-600 to-pink-600"} rounded-2xl p-8 md:p-12 text-white`}
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Create Something Amazing?</h3>
            <p className="text-xl mb-8 opacity-90">
              Join our portfolio of successful projects and get your custom bulk order started today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8">
                Start Your Project
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 font-bold px-8 bg-transparent"
              >
                View All Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
