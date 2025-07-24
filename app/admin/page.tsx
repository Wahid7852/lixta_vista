"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, Users, TrendingUp, Gift, Plus, Edit, Trash2, Eye, BarChart3, Sparkles } from "lucide-react"

interface Product {
  _id: string
  name: string
  category: string
  subcategory: string
  description: string
  price: number
  costPrice: number
  margin: number
  images: string[]
  templates: string[]
  customizationOptions: {
    colors: string[]
    sizes: string[]
    materials: string[]
  }
  minOrderQuantity: number
  status: "active" | "inactive"
  createdAt: string
  updatedAt: string
}

interface DiscountLead {
  _id: string
  name: string
  email: string
  discountCode: string
  discountPercentage: number
  isUsed: boolean
  createdAt: string
  usedAt?: string
}

interface Analytics {
  totalProducts: number
  totalDiscountLeads: number
  totalUsers: number
  recentActivity: {
    type: "product_created" | "discount_claimed" | "user_registered"
    description: string
    timestamp: string
  }[]
}

export default function AdminPage() {
  const { user, isLoaded } = useUser()
  const [products, setProducts] = useState<Product[]>([])
  const [discountLeads, setDiscountLeads] = useState<DiscountLead[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Check if user is admin
  const isAdmin = user?.emailAddresses[0]?.emailAddress === "wahidzk0091@gmail.com"

  useEffect(() => {
    if (isLoaded && !isAdmin) {
      redirect("/")
    }
  }, [isLoaded, isAdmin])

  useEffect(() => {
    if (isAdmin) {
      fetchData()
    }
  }, [isAdmin])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [productsRes, leadsRes, analyticsRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/discount-leads"),
        fetch("/api/admin/analytics"),
      ])

      if (productsRes.ok) {
        const productsData = await productsRes.json()
        setProducts(productsData.products || [])
      }

      if (leadsRes.ok) {
        const leadsData = await leadsRes.json()
        setDiscountLeads(leadsData.leads || [])
      }

      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json()
        setAnalytics(analyticsData)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const createMockupProducts = async () => {
    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "create_mockup" }),
      })

      if (response.ok) {
        const data = await response.json()
        alert(`Successfully created ${data.products?.length || 0} mockup products!`)
        fetchData() // Refresh data
      } else {
        alert("Failed to create mockup products")
      }
    } catch (error) {
      console.error("Error creating mockup products:", error)
      alert("Error creating mockup products")
    }
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.firstName || "Admin"}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={createMockupProducts} className="bg-green-600 hover:bg-green-700">
                <Sparkles className="h-4 w-4 mr-2" />
                Create Mockup Products
              </Button>
              <Badge variant="destructive">Admin</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="leads">Discount Leads</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics?.totalProducts || 0}</div>
                  <p className="text-xs text-muted-foreground">Active products in catalog</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Discount Leads</CardTitle>
                  <Gift className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics?.totalDiscountLeads || 0}</div>
                  <p className="text-xs text-muted-foreground">Generated discount codes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics?.totalUsers || 0}</div>
                  <p className="text-xs text-muted-foreground">Registered users</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.recentActivity?.slice(0, 5).map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  )) || <p className="text-gray-500 text-center py-4">No recent activity</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Products Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Margin</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>${product.margin}</TableCell>
                        <TableCell>
                          <Badge variant={product.status === "active" ? "default" : "secondary"}>
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Discount Leads Tab */}
          <TabsContent value="leads" className="space-y-6">
            <h2 className="text-2xl font-bold">Discount Leads</h2>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Discount Code</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {discountLeads.map((lead) => (
                      <TableRow key={lead._id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">{lead.discountCode}</code>
                        </TableCell>
                        <TableCell>{lead.discountPercentage}%</TableCell>
                        <TableCell>
                          <Badge variant={lead.isUsed ? "secondary" : "default"}>
                            {lead.isUsed ? "Used" : "Active"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Reports</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Product Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Product analytics coming soon...</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Conversion Rates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Conversion tracking coming soon...</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
