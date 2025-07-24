import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { dbService } from "@/lib/database"

const ADMIN_EMAILS = ["wahidzk0091@gmail.com", "admin@easegiv.com"]

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    // Get user from database to check admin status
    const user = await dbService.getUserByClerkId(userId)

    if (!user || !ADMIN_EMAILS.includes(user.email)) {
      return NextResponse.json({ success: false, error: "Admin access required" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const skip = Number.parseInt(searchParams.get("skip") || "0")

    const result = await dbService.getProducts(limit, skip)

    return NextResponse.json({
      success: true,
      data: result.products,
      total: result.total,
      page: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(result.total / limit),
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    // Get user from database to check admin status
    const user = await dbService.getUserByClerkId(userId)

    if (!user || !ADMIN_EMAILS.includes(user.email)) {
      return NextResponse.json({ success: false, error: "Admin access required" }, { status: 403 })
    }

    const productData = await request.json()

    // Generate productId and SKU
    const productId = `PROD-${Date.now().toString().slice(-6)}`
    const sku = `${productData.category.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`

    const newProduct = {
      productId,
      name: productData.name,
      slug: productData.name.toLowerCase().replace(/\s+/g, "-"),
      description: productData.description,
      category: productData.category,
      subcategory: productData.subcategory,
      sku,
      price: Number.parseFloat(productData.price),
      costPrice: Number.parseFloat(productData.costPrice),
      margin: Number.parseFloat(productData.price) - Number.parseFloat(productData.costPrice),
      stockQuantity: Number.parseInt(productData.stockQuantity),
      minOrderQuantity: Number.parseInt(productData.minOrderQuantity),
      status: "Active" as const,
      supplier: productData.supplier,
      colors: productData.colors || [],
      sizes: productData.sizes || [],
      customizationOptions: productData.customizationOptions || {},
      images: productData.images || [],
      totalOrders: 0,
      totalRevenue: 0,
    }

    const result = await dbService.createProduct(newProduct)

    return NextResponse.json({
      success: true,
      data: result.product,
      message: "Product created successfully",
    })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    // Get user from database to check admin status
    const user = await dbService.getUserByClerkId(userId)

    if (!user || !ADMIN_EMAILS.includes(user.email)) {
      return NextResponse.json({ success: false, error: "Admin access required" }, { status: 403 })
    }

    const { productId, ...updates } = await request.json()

    // Recalculate margin if price or cost price changed
    if (updates.price || updates.costPrice) {
      const product = await dbService.getProductById(productId)
      if (product) {
        const price = updates.price || product.price
        const costPrice = updates.costPrice || product.costPrice
        updates.margin = price - costPrice
      }
    }

    const result = await dbService.updateProduct(productId, updates)

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
    })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    // Get user from database to check admin status
    const user = await dbService.getUserByClerkId(userId)

    if (!user || !ADMIN_EMAILS.includes(user.email)) {
      return NextResponse.json({ success: false, error: "Admin access required" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")

    if (!productId) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 })
    }

    const result = await dbService.deleteProduct(productId)

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 })
  }
}
