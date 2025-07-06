"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { RefreshCw, Star, ShoppingBag, ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ReturningUserSectionProps {
  user: {
    name: string
    email: string
  }
}

// Mock data for returning users
const previousOrders = [
  {
    id: "ORD-001",
    product: "Custom T-Shirts",
    image: "/images/categories/tshirts.jpg",
    quantity: 100,
    date: "Dec 15, 2024",
    status: "Delivered",
    rating: 5,
  },
  {
    id: "ORD-002",
    product: "Business Cards",
    image: "/images/categories/visiting-cards.jpg",
    quantity: 500,
    date: "Nov 28, 2024",
    status: "Delivered",
    rating: 4,
  },
]

const recommendations = [
  {
    id: 1,
    name: "Custom Hoodies",
    image: "/images/categories/polo-tshirts.jpg",
    description: "Perfect for winter corporate events",
    badge: "Trending",
    discount: "20% OFF",
    color: "from-blue-500 to-purple-600",
  },
  {
    id: 2,
    name: "Corporate Mugs",
    image: "/images/categories/photo-gifts.jpg",
    description: "Great for office branding",
    badge: "Popular",
    discount: "15% OFF",
    color: "from-green-500 to-teal-600",
  },
  {
    id: 3,
    name: "Festive Hampers",
    image: "/images/categories/stationery.jpg",
    description: "New Year corporate gifts",
    badge: "Seasonal",
    discount: "25% OFF",
    color: "from-orange-500 to-red-600",
  },
]

export default function ReturningUserSection({ user }: ReturningUserSectionProps) {
  const [activeTab, setActiveTab] = useState<"orders" | "recommendations">("orders")

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-gray-800">Welcome back, {user.name}! 👋</h2>
              <p className="text-sm text-gray-600">Ready for your next customization project?</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-lg">
            <Button
              variant={activeTab === "orders" ? "default" : "ghost"}
              className={`rounded-full px-6 py-2 ${
                activeTab === "orders" ? "bg-blue-600 text-white" : "text-gray-600"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Repeat Orders
            </Button>
            <Button
              variant={activeTab === "recommendations" ? "default" : "ghost"}
              className={`rounded-full px-6 py-2 ${
                activeTab === "recommendations" ? "bg-blue-600 text-white" : "text-gray-600"
              }`}
              onClick={() => setActiveTab("recommendations")}
            >
              <Star className="h-4 w-4 mr-2" />
              Try Something New
            </Button>
          </div>
        </div>

        {/* Previous Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Reorder Your Favorites</h3>
              <p className="text-gray-600">Quick reorder with same specifications or customize further</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {previousOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative">
                    <Image
                      src={order.image || "/placeholder.svg"}
                      alt={order.product}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-green-600 text-white">Previously Ordered</Badge>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                      {[...Array(order.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-lg">{order.product}</h3>
                      <Badge variant="outline" className="text-xs">
                        {order.id}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-medium">{order.quantity} pieces</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Order Date:</span>
                        <span className="font-medium">{order.date}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Status:</span>
                        <Badge className="bg-green-100 text-green-800">{order.status}</Badge>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reorder Same
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Customize Again
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === "recommendations" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Recommended For You</h3>
              <p className="text-gray-600">Based on your previous orders and trending products</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={`bg-gradient-to-r ${item.color} text-white`}>{item.badge}</Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-orange-500 text-white font-bold">{item.discount}</Badge>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                    <div className="flex space-x-2">
                      <Button asChild className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                        <Link href="/customize">
                          Start Customizing
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Need Something Specific?</h3>
            <p className="text-gray-600 mb-6">Browse our full catalog or get personalized recommendations</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/categories">Browse All Categories</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/customize">Start New Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
