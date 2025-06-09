"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Sparkles, Gift, Heart, Zap } from "lucide-react"

const seasonalIdeas = [
  {
    id: 1,
    title: "Diwali Corporate Gifts",
    season: "diwali",
    category: "Festival",
    image: "/seasonal/diwali-gifts.png",
    description: "Premium gift sets with traditional motifs and gold accents",
    products: ["Business Cards", "Gift Boxes", "Mugs", "T-Shirts"],
    colors: ["Gold", "Deep Red", "Royal Blue", "Orange"],
    trending: true,
    discount: "20% OFF",
  },
  {
    id: 2,
    title: "Christmas Holiday Collection",
    season: "christmas",
    category: "Festival",
    image: "/seasonal/christmas-collection.png",
    description: "Festive designs with snowflakes, trees, and holiday cheer",
    products: ["Greeting Cards", "Mugs", "T-Shirts", "Stickers"],
    colors: ["Red", "Green", "Gold", "White"],
    trending: true,
    discount: "15% OFF",
  },
  {
    id: 3,
    title: "New Year Corporate Branding",
    season: "newyear",
    category: "Corporate",
    image: "/seasonal/newyear-corporate.png",
    description: "Fresh start designs for the new year with modern aesthetics",
    products: ["Business Cards", "Letterheads", "Calendars", "Planners"],
    colors: ["Silver", "Black", "Blue", "White"],
    trending: false,
    discount: "10% OFF",
  },
  {
    id: 4,
    title: "Holi Color Festival Merch",
    season: "holi",
    category: "Festival",
    image: "/seasonal/holi-merch.png",
    description: "Vibrant and colorful designs celebrating the festival of colors",
    products: ["T-Shirts", "Caps", "Water Bottles", "Bandanas"],
    colors: ["Pink", "Yellow", "Green", "Blue", "Orange"],
    trending: false,
    discount: "25% OFF",
  },
  {
    id: 5,
    title: "Valentine's Day Romance",
    season: "valentine",
    category: "Personal",
    image: "/seasonal/valentine-romance.png",
    description: "Romantic designs perfect for expressing love and affection",
    products: ["Mugs", "Photo Frames", "T-Shirts", "Greeting Cards"],
    colors: ["Red", "Pink", "White", "Rose Gold"],
    trending: true,
    discount: "30% OFF",
  },
  {
    id: 6,
    title: "Summer Vacation Vibes",
    season: "summer",
    category: "Lifestyle",
    image: "/seasonal/summer-vibes.png",
    description: "Cool and refreshing designs for the summer season",
    products: ["T-Shirts", "Caps", "Water Bottles", "Beach Towels"],
    colors: ["Turquoise", "Coral", "Yellow", "White"],
    trending: false,
    discount: "20% OFF",
  },
  {
    id: 7,
    title: "Monsoon Fresh Collection",
    season: "monsoon",
    category: "Lifestyle",
    image: "/seasonal/monsoon-fresh.png",
    description: "Rain-inspired designs with fresh and clean aesthetics",
    products: ["Umbrellas", "Raincoats", "Mugs", "Stickers"],
    colors: ["Blue", "Green", "Grey", "White"],
    trending: false,
    discount: "15% OFF",
  },
  {
    id: 8,
    title: "Ganesh Chaturthi Celebration",
    season: "ganesh",
    category: "Festival",
    image: "/seasonal/ganesh-celebration.png",
    description: "Traditional designs honoring Lord Ganesha with intricate patterns",
    products: ["Banners", "T-Shirts", "Stickers", "Decorative Items"],
    colors: ["Orange", "Red", "Gold", "Yellow"],
    trending: true,
    discount: "18% OFF",
  },
]

const seasons = [
  { id: "all", name: "All Seasons", icon: Calendar },
  { id: "diwali", name: "Diwali", icon: Sparkles },
  { id: "christmas", name: "Christmas", icon: Gift },
  { id: "valentine", name: "Valentine's", icon: Heart },
  { id: "summer", name: "Summer", icon: Zap },
]

export default function SeasonalIdeas() {
  const [selectedSeason, setSelectedSeason] = useState("all")

  const filteredIdeas =
    selectedSeason === "all" ? seasonalIdeas : seasonalIdeas.filter((idea) => idea.season === selectedSeason)

  const trendingIdeas = seasonalIdeas.filter((idea) => idea.trending)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Seasonal Design Ideas</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get inspired by our seasonal collections and festival-themed designs perfect for any occasion
        </p>
      </div>

      {/* Trending Section */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-orange-500" />
          Trending Now
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingIdeas.map((idea) => (
            <Card key={idea.id} className="hover:shadow-md transition-shadow">
              <div className="relative">
                <Image
                  src={idea.image || "/placeholder.svg"}
                  alt={idea.title}
                  width={300}
                  height={200}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 right-2 bg-orange-500">{idea.discount}</Badge>
              </div>
              <CardContent className="p-3">
                <h4 className="font-semibold text-sm">{idea.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{idea.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Season Filter */}
      <Tabs value={selectedSeason} onValueChange={setSelectedSeason}>
        <TabsList className="grid w-full grid-cols-5">
          {seasons.map((season) => {
            const Icon = season.icon
            return (
              <TabsTrigger key={season.id} value={season.id} className="flex items-center space-x-1">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{season.name}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        <TabsContent value={selectedSeason} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIdeas.map((idea) => (
              <Card key={idea.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={idea.image || "/placeholder.svg"}
                    alt={idea.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary">{idea.category}</Badge>
                  </div>
                  {idea.trending && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-orange-500">Trending</Badge>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2">
                    <Badge className="bg-green-600">{idea.discount}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{idea.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{idea.description}</p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Available Products:</h4>
                      <div className="flex flex-wrap gap-1">
                        {idea.products.map((product) => (
                          <Badge key={product} variant="outline" className="text-xs">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-1">Color Palette:</h4>
                      <div className="flex space-x-1">
                        {idea.colors.map((color) => (
                          <div
                            key={color}
                            className="w-6 h-6 rounded-full border-2 border-gray-200"
                            style={{
                              backgroundColor: color.toLowerCase().replace(" ", ""),
                            }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-4" variant="outline">
                    Use This Design
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Custom Design CTA */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4">Need a Custom Seasonal Design?</h3>
        <p className="text-gray-600 mb-6">
          Our design team can create unique seasonal artwork tailored to your specific needs and brand
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Request Custom Design
          </Button>
          <Button size="lg" variant="outline">
            View All Templates
          </Button>
        </div>
      </div>
    </div>
  )
}
