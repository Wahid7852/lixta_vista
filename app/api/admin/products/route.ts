import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { dbService } from "@/lib/database"

const ADMIN_EMAILS = ["wahidzk0091@gmail.com", "admin@easegiv.com"]

async function checkAdminAccess() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  const { clerkClient } = await import("@clerk/nextjs/server")

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const userEmail = user.emailAddresses[0]?.emailAddress

  if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
    throw new Error("Admin access required")
  }

  return user
}

export async function GET() {
  try {
    await checkAdminAccess()
    const products = await dbService.getProducts()
    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error fetching products:", error)
    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      if (error.message === "Admin access required") {
        return NextResponse.json({ error: "Admin access required" }, { status: 403 })
      }
    }
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await checkAdminAccess()

    const body = await request.json()
    const { action } = body

    if (action === "create_mockup") {
      const products = await dbService.createMockupProducts()
      return NextResponse.json({
        success: true,
        message: `Created ${products.length} mockup products`,
        products,
      })
    }

    // Regular product creation
    const {
      name,
      category,
      subcategory,
      description,
      price,
      costPrice,
      images,
      templates,
      customizationOptions,
      minOrderQuantity,
      status,
    } = body

    if (!name || !category || !price || !costPrice) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const margin = price - costPrice

    const product = await dbService.createProduct({
      name,
      category,
      subcategory: subcategory || "",
      description: description || "",
      price: Number.parseFloat(price),
      costPrice: Number.parseFloat(costPrice),
      margin,
      images: images || [],
      templates: templates || [],
      customizationOptions: customizationOptions || {
        colors: [],
        sizes: [],
        materials: [],
      },
      minOrderQuantity: Number.parseInt(minOrderQuantity) || 25,
      status: status || "active",
    })

    return NextResponse.json({ success: true, product })
  } catch (error) {
    console.error("Error creating product:", error)
    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      if (error.message === "Admin access required") {
        return NextResponse.json({ error: "Admin access required" }, { status: 403 })
      }
    }
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await checkAdminAccess()

    const body = await request.json()
    const { productId, ...updates } = body

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    // Calculate margin if price or costPrice is being updated
    if (updates.price !== undefined || updates.costPrice !== undefined) {
      const product = await dbService.getProductById(productId)
      if (product) {
        const price = updates.price !== undefined ? Number.parseFloat(updates.price) : product.price
        const costPrice = updates.costPrice !== undefined ? Number.parseFloat(updates.costPrice) : product.costPrice
        updates.margin = price - costPrice

        if (updates.price !== undefined) {
          updates.price = Number.parseFloat(updates.price)
        }
        if (updates.costPrice !== undefined) {
          updates.costPrice = Number.parseFloat(updates.costPrice)
        }
      }
    }

    const updatedProduct = await dbService.updateProduct(productId, updates)

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, product: updatedProduct })
  } catch (error) {
    console.error("Error updating product:", error)
    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      if (error.message === "Admin access required") {
        return NextResponse.json({ error: "Admin access required" }, { status: 403 })
      }
    }
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await checkAdminAccess()

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("id")

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    const deleted = await dbService.deleteProduct(productId)

    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      if (error.message === "Admin access required") {
        return NextResponse.json({ error: "Admin access required" }, { status: 403 })
      }
    }
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
