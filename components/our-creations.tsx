"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Eye, Heart, Award, Users, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const creations = [
  {
    id: 1,
    title: "Tech Startup Complete Branding",
    category: "corporate",
    client: "InnovateTech Solutions",
    image: "/portfolio/business-card-tech.png",
    description: "Complete corporate identity package including business cards, letterheads, and branded merchandise",
    products: ["Business Cards", "Letterheads", "T-Shirts", "Mugs"],
    quantity: "2,500 pieces",
    rating: 5,
    likes: 234,
    completedDate: "Dec 2024",
    tags: ["Corporate", "Tech", "Complete Package"],
    featured: true,
  },
  {
    id: 2,
    title: "Restaurant Chain Uniforms",
    category: "apparel",
    client: "Spice Garden Restaurants",
    image: "/portfolio/tshirt-restaurant.jpg",
    description: "Custom uniforms for 15 restaurant locations with consistent branding",
    products: ["Chef Uniforms", "Server T-Shirts", "Caps", "Aprons"],
    quantity: "1,200 pieces",
    rating: 5,
    likes: 189,
    completedDate: "Nov 2024",
    tags: ["Restaurant", "Uniforms", "Multi-location"],
    featured: true,
  },
  {
    id: 3,
    title: "Corporate Event Merchandise",
    category: "events",
    client: "Global Finance Summit",
    image: "/portfolio/mug-corporate.jpg",
    description: "Premium event merchandise for international finance conference",
    products: ["Premium Mugs", "Notebooks", "Pen Sets", "Bags"],
    quantity: "5,000 pieces",
    rating: 5,
    likes: 298,
    completedDate: "Oct 2024",
    tags: ["Events", "Premium", "International"],
    featured: false,
  },
  {
    id: 4,
    title: "Sports Team Complete Kit",
    category: "sports",
    client: "Thunder Bolts FC",
    image: "/portfolio/tshirt-sports.jpg",
    description: "Complete sports merchandise including jerseys, training wear, and fan merchandise",
    products: ["Jerseys", "Training Shirts", "Caps", "Water Bottles"],
    quantity: "800 pieces",
    rating: 5,
    likes: 445,
    completedDate: "Sep 2024",
    tags: ["Sports", "Team Kit", "Fan Merchandise"],
    featured: true,
  },
  {
    id: 5,
    title: "Educational Institution Branding",
    category: "education",
    client: "Bright Future Academy",
    image: "/portfolio/business-card-creative.jpg",
    description: "Complete branding solution for educational institution including stationery and uniforms",
    products: ["Stationery", "Student Uniforms", "ID Cards", "Certificates"],
    quantity: "3,200 pieces",
    rating: 4,
    likes: 167,
    completedDate: "Aug 2024",
    tags: ["Education", "Institution", "Complete Branding"],
    featured: false,
  },
  {
    id: 6,
    title: "Healthcare Center Essentials",
    category: "healthcare",
    client: "MediCare Plus",
    image: "/portfolio/mug-coffee.jpg",
    description: "Professional healthcare merchandise including uniforms and patient care items",
    products: ["Medical Uniforms", "ID Badges", "Patient Kits", "Branded Items"],
    quantity: "1,500 pieces",
    rating: 5,
    likes: 203,
    completedDate: "Jul 2024",
    tags: ["Healthcare", "Professional", "Patient Care"],
    featured: false,
  },
]

const categories = [
  { id: "all", name: "All Projects", count: creations.length },
  { id: "featured", name: "Featured", count: creations.filter((c) => c.featured).length },
  { id: "corporate", name: "Corporate", count: creations.filter((c) => c.category === "corporate").length },
  { id: "apparel", name: "Apparel", count: creations.filter((c) => c.category === "apparel").length },
  { id: "events", name: "Events", count: creations.filter((c) => c.category === "events").length },
]

export default function OurCreations() {
  const [selectedCategory, setSelectedCategory] = useState("featured")
  const [likedItems, setLikedItems] = useState<number[]>([])

  const filteredCreations =
    selectedCategory === "all"
      ? creations
      : selectedCategory === "featured"
        ? creations.filter((c) => c.featured)
        : creations.filter((c) => c.category === selectedCategory)

  const toggleLike = (itemId: number) => {
    setLikedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm font-bold mb-4">
            <Award className="h-4 w-4 mr-2" />
            Our Creations
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Real Projects,{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Real Results
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we've helped businesses across industries create stunning custom products that drive success
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: <Users className="h-6 w-6" />, number: "500+", label: "Happy Clients" },
            { icon: <Award className="h-6 w-6" />, number: "2,000+", label: "Projects Completed" },
            { icon: <Star className="h-6 w-6" />, number: "4.9", label: "Average Rating" },
            { icon: <Calendar className="h-6 w-6" />, number: "3", label: "Years Experience" },
          ].map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg">
              <div className="text-blue-600 mb-2 flex justify-center">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Category Filter */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-white">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                {category.name} ({category.count})
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCreations.map((creation) => (
                <Card
                  key={creation.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 group bg-white border-0"
                >
                  <div className="relative">
                    <Image
                      src={creation.image || "/placeholder.svg"}
                      alt={creation.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                        <Button size="sm" variant="secondary" className="bg-white/90">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/90"
                          onClick={() => toggleLike(creation.id)}
                        >
                          <Heart
                            className={`h-4 w-4 mr-1 ${likedItems.includes(creation.id) ? "fill-red-500 text-red-500" : ""}`}
                          />
                          {creation.likes + (likedItems.includes(creation.id) ? 1 : 0)}
                        </Button>
                      </div>
                    </div>

                    {/* Featured Badge */}
                    {creation.featured && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        Featured
                      </Badge>
                    )}

                    {/* Rating */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                      {[...Array(creation.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-lg leading-tight">{creation.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {creation.completedDate}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{creation.client}</p>
                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">{creation.description}</p>

                    {/* Products */}
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-500 mb-2">Products Delivered:</p>
                      <div className="flex flex-wrap gap-1">
                        {creation.products.map((product) => (
                          <Badge key={product} variant="secondary" className="text-xs">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-gray-600">Total Quantity:</span>
                      <span className="font-bold text-blue-600">{creation.quantity}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {creation.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Get Similar Quote
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Ready to Create Your Success Story?</h3>
            <p className="text-gray-600 mb-8 text-lg">
              Join hundreds of satisfied clients who trust us with their custom product needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4"
              >
                Start Your Project
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 bg-transparent">
                Request Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
