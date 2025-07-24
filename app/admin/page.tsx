"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  Download,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Shield,
  AlertCircle,
  Plus,
  Package,
  Edit,
  Eye,
  DollarSign,
  ShoppingCart,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { redirect } from "next/navigation"

interface DiscountLead {
  _id: string
  name: string
  email: string
  phone: string
  discountCode: string
  discountPercentage: number
  isUsed: boolean
  createdAt: string
  expiresAt: string
}

interface Product {
  _id: string
  productId: string
  name: string
  description: string
  category: string
  subcategory: string
  sku: string
  price: number
  costPrice: number
  margin: number
  stockQuantity: number
  minOrderQuantity: number
  status: string
  supplier: string
  colors: string[]
  sizes: string[]
  images: string[]
  totalOrders: number
  totalRevenue: number
  createdAt: string
}

interface Analytics {
  totalLeads: number
  usedCodes: number
  unusedCodes: number
  recentLeads: DiscountLead[]
  leadsThisMonth: number
  conversionRate: string
  totalProducts: number
  totalRevenue: number
  totalOrders: number
}

const ADMIN_EMAILS = ["wahidzk0091@gmail.com", "admin@easegiv.com"]

export default function AdminPage() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [leads, setLeads] = useState<DiscountLead[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [showProductDialog, setShowProductDialog] = useState(false)
  const { toast } = useToast()

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    subcategory: "",
    price: "",
    costPrice: "",
    stockQuantity: "",
    minOrderQuantity: "100",
    supplier: "",
    colors: "",
    sizes: "",
  })

  const isAdmin =
    isSignedIn && user?.emailAddresses?.[0]?.emailAddress && ADMIN_EMAILS.includes(user.emailAddresses[0].emailAddress)

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect("/sign-in")
    }

    if (isLoaded && isSignedIn && !isAdmin) {
      redirect("/")
    }

    if (isLoaded && isSignedIn && isAdmin) {
      fetchData()
    }
  }, [isLoaded, isSignedIn, isAdmin])

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch discount leads
      const leadsResponse = await fetch("/api/discount-leads")
      const leadsData = await leadsResponse.json()

      if (leadsData.success) {
        setLeads(leadsData.leads)
      }

      // Fetch products
      const productsResponse = await fetch("/api/admin/products")
      const productsData = await productsResponse.json()

      if (productsData.success) {
        setProducts(productsData.data)
      }

      // Fetch analytics
      const analyticsResponse = await fetch("/api/admin/analytics")
      const analyticsData = await analyticsResponse.json()

      if (analyticsResponse.ok) {
        setAnalytics(analyticsData)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        title: "Error",
        description: "Failed to fetch admin data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const createProduct = async () => {
    try {
      const productData = {
        ...newProduct,
        price: Number.parseFloat(newProduct.price),
        costPrice: Number.parseFloat(newProduct.costPrice),
        stockQuantity: Number.parseInt(newProduct.stockQuantity),
        minOrderQuantity: Number.parseInt(newProduct.minOrderQuantity),
        colors: newProduct.colors
          .split(",")
          .map((c) => c.trim())
          .filter((c) => c),
        sizes: newProduct.sizes
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
        images: [`/templates/${newProduct.category.toLowerCase()}-1.png`], // Default image
      }

      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })

      const data = await response.json()

      if (data.success) {
        setProducts([data.data, ...products])
        setShowProductDialog(false)
        setNewProduct({
          name: "",
          description: "",
          category: "",
          subcategory: "",
          price: "",
          costPrice: "",
          stockQuantity: "",
          minOrderQuantity: "100",
          supplier: "",
          colors: "",
          sizes: "",
        })
        toast({
          title: "Success",
          description: "Product created successfully",
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create product",
        variant: "destructive",
      })
    }
  }

  const deleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/admin/products?productId=${productId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        setProducts(products.filter((p) => p.productId !== productId))
        toast({
          title: "Success",
          description: "Product deleted successfully",
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      })
    }
  }

  const deleteLead = async (id: string) => {
    try {
      const response = await fetch(`/api/discount-leads?id=${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        setLeads(leads.filter((lead) => lead._id !== id))
        toast({
          title: "Success",
          description: "Lead deleted successfully",
        })
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete lead",
        variant: "destructive",
      })
    }
  }

  const exportToCSV = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Discount Code", "Created At", "Used"],
      ...leads.map((lead) => [
        lead.name,
        lead.email,
        lead.phone,
        lead.discountCode,
        new Date(lead.createdAt).toLocaleDateString(),
        lead.isUsed ? "Yes" : "No",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `discount-leads-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const createMockupProducts = async () => {
    const mockupProducts = [
      {
        name: "Premium Business Cards",
        description: "High-quality business cards with premium finish and custom design options",
        category: "Business Cards & Stationery",
        subcategory: "Business Cards",
        price: 25.99,
        costPrice: 15.99,
        stockQuantity: 1000,
        minOrderQuantity: 100,
        supplier: "PrintCorp Ltd",
        colors: ["White", "Cream", "Black"],
        sizes: ["Standard", "Mini"],
      },
      {
        name: "Custom T-Shirts",
        description: "100% cotton custom printed t-shirts with logo placement options",
        category: "Apparel & Clothing",
        subcategory: "T-Shirts",
        price: 18.99,
        costPrice: 12.99,
        stockQuantity: 500,
        minOrderQuantity: 100,
        supplier: "TextilePro",
        colors: ["White", "Black", "Navy", "Red", "Gray"],
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        name: "Promotional Mugs",
        description: "Ceramic mugs perfect for promotional campaigns with custom branding",
        category: "Promotional Products",
        subcategory: "Mugs & Drinkware",
        price: 12.99,
        costPrice: 8.99,
        stockQuantity: 750,
        minOrderQuantity: 100,
        supplier: "CeramicWorks",
        colors: ["White", "Black", "Blue", "Red"],
        sizes: ["11oz", "15oz"],
      },
      {
        name: "Corporate Polo Shirts",
        description: "Professional polo shirts ideal for corporate uniforms and events",
        category: "Apparel & Clothing",
        subcategory: "Polo Shirts",
        price: 24.99,
        costPrice: 16.99,
        stockQuantity: 300,
        minOrderQuantity: 100,
        supplier: "TextilePro",
        colors: ["White", "Navy", "Black", "Gray", "Royal Blue"],
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        name: "Custom Hoodies",
        description: "Comfortable hoodies with custom printing and embroidery options",
        category: "Apparel & Clothing",
        subcategory: "Hoodies",
        price: 35.99,
        costPrice: 24.99,
        stockQuantity: 200,
        minOrderQuantity: 100,
        supplier: "TextilePro",
        colors: ["Black", "Gray", "Navy", "Maroon", "Forest Green"],
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
    ]

    for (const product of mockupProducts) {
      try {
        const response = await fetch("/api/admin/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...product,
            images: [`/templates/${product.subcategory.toLowerCase().replace(/\s+/g, "-")}-1.png`],
          }),
        })

        const data = await response.json()
        if (data.success) {
          setProducts((prev) => [data.data, ...prev])
        }
      } catch (error) {
        console.error("Error creating mockup product:", error)
      }
    }

    toast({
      title: "Success",
      description: "Mockup products created successfully",
    })
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <CardTitle>Admin Access Required</CardTitle>
            <CardDescription>Please sign in to access the admin panel</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-600" />
            <CardTitle>Unauthorized Access</CardTitle>
            <CardDescription>
              You don't have permission to access this page.
              <br />
              <span className="text-sm text-gray-500 mt-2 block">
                Current email: {user?.emailAddresses?.[0]?.emailAddress}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 mb-4">Admin access is restricted to authorized emails only.</p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <a href="/">Go Home</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.firstName}! Manage your business operations.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={createMockupProducts} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Create Mockup Products
            </Button>
            <Button onClick={exportToCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalProducts}</div>
                <p className="text-xs text-muted-foreground">Active products</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${analytics.totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">From all orders</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalOrders}</div>
                <p className="text-xs text-muted-foreground">Completed orders</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Discount Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalLeads}</div>
                <p className="text-xs text-muted-foreground">{analytics.conversionRate}% conversion</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="leads">Discount Leads</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Products ({products.length})</CardTitle>
                  <CardDescription>Manage your product catalog</CardDescription>
                </div>
                <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                      <DialogDescription>Create a new product for your catalog</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          placeholder="Enter product name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={newProduct.category}
                          onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Business Cards & Stationery">Business Cards & Stationery</SelectItem>
                            <SelectItem value="Apparel & Clothing">Apparel & Clothing</SelectItem>
                            <SelectItem value="Promotional Products">Promotional Products</SelectItem>
                            <SelectItem value="Marketing Materials">Marketing Materials</SelectItem>
                            <SelectItem value="Photo Gifts">Photo Gifts</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subcategory">Subcategory</Label>
                        <Input
                          id="subcategory"
                          value={newProduct.subcategory}
                          onChange={(e) => setNewProduct({ ...newProduct, subcategory: e.target.value })}
                          placeholder="Enter subcategory"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="supplier">Supplier</Label>
                        <Input
                          id="supplier"
                          value={newProduct.supplier}
                          onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })}
                          placeholder="Enter supplier name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="costPrice">Cost Price ($)</Label>
                        <Input
                          id="costPrice"
                          type="number"
                          step="0.01"
                          value={newProduct.costPrice}
                          onChange={(e) => setNewProduct({ ...newProduct, costPrice: e.target.value })}
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stockQuantity">Stock Quantity</Label>
                        <Input
                          id="stockQuantity"
                          type="number"
                          value={newProduct.stockQuantity}
                          onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="minOrderQuantity">MOQ</Label>
                        <Input
                          id="minOrderQuantity"
                          type="number"
                          value={newProduct.minOrderQuantity}
                          onChange={(e) => setNewProduct({ ...newProduct, minOrderQuantity: e.target.value })}
                          placeholder="100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="colors">Colors (comma-separated)</Label>
                        <Input
                          id="colors"
                          value={newProduct.colors}
                          onChange={(e) => setNewProduct({ ...newProduct, colors: e.target.value })}
                          placeholder="White, Black, Blue"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sizes">Sizes (comma-separated)</Label>
                        <Input
                          id="sizes"
                          value={newProduct.sizes}
                          onChange={(e) => setNewProduct({ ...newProduct, sizes: e.target.value })}
                          placeholder="S, M, L, XL"
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                          placeholder="Enter product description"
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowProductDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={createProduct}>Create Product</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>MOQ</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product._id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.sku}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="text-sm">{product.category}</div>
                              <div className="text-xs text-gray-500">{product.subcategory}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">${product.price}</div>
                              <div className="text-xs text-gray-500">Cost: ${product.costPrice}</div>
                            </div>
                          </TableCell>
                          <TableCell>{product.stockQuantity}</TableCell>
                          <TableCell>{product.minOrderQuantity}</TableCell>
                          <TableCell>
                            <Badge variant={product.status === "Active" ? "default" : "secondary"}>
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteProduct(product.productId)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Discount Leads ({leads.length})</CardTitle>
                <CardDescription>Manage discount codes generated through the website popup</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500">No discount leads found</p>
                    </div>
                  ) : (
                    leads.map((lead) => (
                      <div key={lead._id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="font-semibold">{lead.name}</h3>
                            <Badge variant={lead.isUsed ? "default" : "secondary"}>
                              {lead.isUsed ? "Used" : "Unused"}
                            </Badge>
                            <Badge variant="outline" className="font-mono">
                              {lead.discountCode}
                            </Badge>
                            <Badge variant="outline">{lead.discountPercentage}% OFF</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {lead.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {lead.phone}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteLead(lead._id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest discount code generations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics?.recentLeads.slice(0, 5).map((lead) => (
                      <div key={lead._id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          <p className="text-sm text-gray-600">{lead.email}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="font-mono text-xs">
                            {lead.discountCode}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{new Date(lead.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Products</span>
                      <span className="font-bold">{analytics?.totalProducts}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total Revenue</span>
                      <span className="font-bold text-green-600">${analytics?.totalRevenue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total Orders</span>
                      <span className="font-bold">{analytics?.totalOrders}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Lead Conversion</span>
                      <span className="font-bold text-blue-600">{analytics?.conversionRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
