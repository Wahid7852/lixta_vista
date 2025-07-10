"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Heart, Star } from "lucide-react"

const portfolioItems = [
  {
    id: 1,
    title: "Tech Startup Business Cards",
    category: "business-cards",
    image: "/portfolio/business-card-tech.png",
    client: "TechFlow Solutions",
    year: "2024",
    description: "Modern minimalist design with holographic foil finish",
    rating: 5,
    likes: 234,
    tags: ["Modern", "Tech", "Minimalist", "Foil"],
  },
  {
    id: 2,
    title: "Restaurant Brand Identity",
    category: "tshirts",
    image: "/portfolio/tshirt-restaurant.jpg",
    client: "Spice Garden",
    year: "2024",
    description: "Vibrant food-themed t-shirts for restaurant staff",
    rating: 5,
    likes: 189,
    tags: ["Restaurant", "Colorful", "Brand Identity"],
  },
  {
    id: 3,
    title: "Corporate Event Mugs",
    category: "mugs",
    image: "/portfolio/mug-corporate.jpg",
    client: "Global Finance Corp",
    year: "2024",
    description: "Premium ceramic mugs for corporate gifting",
    rating: 4,
    likes: 156,
    tags: ["Corporate", "Premium", "Gifting"],
  },
  {
    id: 4,
    title: "Creative Agency Cards",
    category: "business-cards",
    image: "/portfolio/business-card-creative.jpg",
    client: "Pixel Perfect Agency",
    year: "2023",
    description: "Artistic design with spot UV and embossing",
    rating: 5,
    likes: 298,
    tags: ["Creative", "Artistic", "UV Coating", "Embossed"],
  },
  {
    id: 5,
    title: "Sports Team Merchandise",
    category: "tshirts",
    image: "/portfolio/tshirt-sports.jpg",
    client: "Thunder Bolts FC",
    year: "2024",
    description: "Athletic wear with moisture-wicking fabric",
    rating: 5,
    likes: 445,
    tags: ["Sports", "Athletic", "Team Merchandise"],
  },
  {
    id: 6,
    title: "Coffee Shop Branding",
    category: "mugs",
    image: "/portfolio/mug-coffee.jpg",
    client: "Bean There Café",
    year: "2024",
    description: "Rustic design with heat-sensitive color change",
    rating: 4,
    likes: 267,
    tags: ["Coffee", "Rustic", "Heat Sensitive", "Café"],
  },
  {
    id: 7,
    title: "Law Firm Professional Cards",
    category: "business-cards",
    image: "/portfolio/business-card-law.jpg",
    client: "Sterling & Associates",
    year: "2023",
    description: "Elegant design with gold foil and letterpress",
    rating: 5,
    likes: 178,
    tags: ["Professional", "Elegant", "Gold Foil", "Letterpress"],
  },
  {
    id: 8,
    title: "Music Festival Merch",
    category: "tshirts",
    image: "/portfolio/tshirt-music.jpg",
    client: "Harmony Music Festival",
    year: "2024",
    description: "Vibrant festival merchandise with glow-in-dark print",
    rating: 5,
    likes: 523,
    tags: ["Music", "Festival", "Glow in Dark", "Vibrant"],
  },
]

const categories = [
  { id: "all", name: "All Work", count: portfolioItems.length },
  {
    id: "business-cards",
    name: "Business Cards",
    count: portfolioItems.filter((item) => item.category === "business-cards").length,
  },
  { id: "tshirts", name: "T-Shirts", count: portfolioItems.filter((item) => item.category === "tshirts").length },
  { id: "mugs", name: "Mugs", count: portfolioItems.filter((item) => item.category === "mugs").length },
]

export default function PreviousWork() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [likedItems, setLikedItems] = useState<number[]>([])

  const filteredItems =
    selectedCategory === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === selectedCategory)

  const toggleLike = (itemId: number) => {
    setLikedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Our Previous Work</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our portfolio of successful projects and get inspired for your next design
        </p>
      </div>

      {/* Category Filter */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-4">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name} ({category.count})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => toggleLike(item.id)}>
                        <Heart
                          className={`h-4 w-4 mr-1 ${likedItems.includes(item.id) ? "fill-red-500 text-red-500" : ""}`}
                        />
                        {item.likes + (likedItems.includes(item.id) ? 1 : 0)}
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <div className="flex items-center">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{item.client}</span>
                    <span>{item.year}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4">Ready to Create Something Amazing?</h3>
        <p className="text-gray-600 mb-6">
          Let's work together to bring your vision to life with our premium partners
        </p>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
          Start Your Project
        </Button>
      </div>
    </div>
  )
}
