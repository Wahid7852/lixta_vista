"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Plus, Clock, Star, ShoppingBag, Truck, Gift, TrendingUp } from "lucide-react"

interface ReturningUserSectionProps {
  userName: string
  userEmail: string
}

export default function ReturningUserSection({ userName, userEmail }: ReturningUserSectionProps) {
  const [recentOrders] = useState([
    {
      id: "ORD-2024-001",
      product: "Custom T-Shirts",
      quantity: 500,
      status: "Delivered",
      date: "2024-01-15",
      amount: 12500,
    },
    {
      id: "ORD-2024-002",
      product: "Business Cards",
      quantity: 1000,
      status: "In Production",
      date: "2024-01-20",
      amount: 3500,
    },
  ])

  const [savedDesigns] = useState([
    {
      id: "DES-001",
      name: "Company Logo T-Shirt",
      product: "T-Shirt",
      lastModified: "2024-01-18",
    },
    {
      id: "DES-002",
      name: "Business Card Design",
      product: "Business Card",
      lastModified: "2024-01-16",
    },
  ])

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome back, {userName}! 👋</h2>
          <p className="text-xl text-gray-600">
            Ready to create something amazing again? Here's what's waiting for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                Quick Actions
              </CardTitle>
              <CardDescription>Jump right back into customizing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link href="/customize">
                  <Plus className="h-4 w-4 mr-2" />
                  Start New Project
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/customize?repeat=last">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Repeat Last Order
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/samples">
                  <Gift className="h-4 w-4 mr-2" />
                  Request Samples
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                Recent Orders
              </CardTitle>
              <CardDescription>Track your latest customization projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{order.product}</h4>
                        <Badge
                          variant={order.status === "Delivered" ? "default" : "secondary"}
                          className={order.status === "Delivered" ? "bg-green-100 text-green-800" : ""}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Order ID: {order.id}</p>
                        <p>Quantity: {order.quantity} pieces</p>
                        <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">₹{order.amount.toLocaleString()}</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">
                          <Truck className="h-3 w-3 mr-1" />
                          Track
                        </Button>
                        <Button size="sm" variant="outline">
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Reorder
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Saved Designs & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Saved Designs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-600" />
                Saved Designs
              </CardTitle>
              <CardDescription>Continue working on your saved projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {savedDesigns.map((design) => (
                  <div key={design.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{design.name}</h4>
                      <p className="text-sm text-gray-600">{design.product}</p>
                      <p className="text-xs text-gray-500">
                        Modified: {new Date(design.lastModified).toLocaleDateString()}
                      </p>
                    </div>
                    <Button size="sm">Continue</Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View All Designs
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Personalized Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Recommended for You
              </CardTitle>
              <CardDescription>Based on your previous orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Custom Hoodies</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Perfect for the upcoming season! Similar to your t-shirt orders.
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Starting ₹299/piece</Badge>
                    <Button size="sm">
                      <ShoppingBag className="h-3 w-3 mr-1" />
                      Customize
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Corporate Stationery Set</h4>
                  <p className="text-sm text-gray-600 mb-3">Complete your branding with matching stationery items.</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Bundle deals available</Badge>
                    <Button size="sm">
                      <ShoppingBag className="h-3 w-3 mr-1" />
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Special Offers */}
        <Card className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Gift className="h-5 w-5" />
              Exclusive Offers for You
            </CardTitle>
            <CardDescription className="text-orange-700">
              Special discounts for our valued returning customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Loyalty Discount</h4>
                <p className="text-sm text-gray-600 mb-3">Get 10% off your next order as a returning customer</p>
                <Badge className="bg-orange-100 text-orange-800">Code: WELCOME10</Badge>
              </div>
              <div className="p-4 bg-white rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">Bulk Order Bonus</h4>
                <p className="text-sm text-gray-600 mb-3">Order 1000+ pieces and get free design consultation</p>
                <Badge className="bg-orange-100 text-orange-800">Auto Applied</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
