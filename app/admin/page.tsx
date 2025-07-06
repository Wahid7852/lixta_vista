"use client"

import { useState } from "react"
import { Users, ShoppingBag, DollarSign, Package, Star, BarChart3, PieChart, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Mock admin user
const adminUser = {
  name: "Admin User",
  email: "admin@easegiv.com",
  isAdmin: true,
}

const stats = [
  {
    title: "Total Revenue",
    value: "₹12,45,678",
    change: "+12.5%",
    icon: <DollarSign className="h-6 w-6" />,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Active Orders",
    value: "1,234",
    change: "+8.2%",
    icon: <ShoppingBag className="h-6 w-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Total Customers",
    value: "8,567",
    change: "+15.3%",
    icon: <Users className="h-6 w-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Products Delivered",
    value: "45,123",
    change: "+23.1%",
    icon: <Package className="h-6 w-6" />,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Rajesh Kumar",
    product: "Custom T-Shirts",
    quantity: 100,
    amount: "₹15,000",
    status: "In Production",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Priya Sharma",
    product: "Business Cards",
    quantity: 500,
    amount: "₹2,500",
    status: "Delivered",
    date: "2024-01-14",
  },
  {
    id: "ORD-003",
    customer: "Tech Solutions Ltd",
    product: "Corporate Hampers",
    quantity: 50,
    amount: "₹25,000",
    status: "Pending",
    date: "2024-01-13",
  },
]

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={adminUser} />

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your EaseGiv platform</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm ${stat.color} font-medium`}>{stat.change} from last month</p>
                    </div>
                    <div className={`${stat.bgColor} ${stat.color} p-3 rounded-full`}>{stat.icon}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Recent Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{order.customer}</p>
                            <p className="text-sm text-gray-600">
                              {order.product} × {order.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{order.amount}</p>
                            <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 mr-2" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Customers
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Package className="h-4 w-4 mr-2" />
                      Add New Product
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Reports
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Star className="h-4 w-4 mr-2" />
                      Customer Reviews
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Order Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Order Management System</h3>
                    <p className="text-gray-600">Comprehensive order tracking and management tools coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Customers Tab */}
            <TabsContent value="customers">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Customer Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Customer Database</h3>
                    <p className="text-gray-600">Customer relationship management tools coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Product Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Product Catalog</h3>
                    <p className="text-gray-600">Product management and inventory tools coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Analytics & Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <PieChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Business Analytics</h3>
                    <p className="text-gray-600">Advanced analytics and reporting dashboard coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
