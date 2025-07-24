import { getDatabase } from "./mongodb"
import { ObjectId } from "mongodb"

export interface Product {
  _id?: string
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
  createdAt: Date
  updatedAt: Date
}

export interface DiscountLead {
  _id?: string
  name: string
  email: string
  discountCode: string
  discountPercentage: number
  isUsed: boolean
  createdAt: Date
  usedAt?: Date
}

export interface User {
  _id?: string
  clerkId: string
  email: string
  firstName?: string
  lastName?: string
  role: "user" | "admin"
  createdAt: Date
  updatedAt: Date
}

export interface Analytics {
  totalProducts: number
  totalDiscountLeads: number
  totalUsers: number
  recentActivity: {
    type: "product_created" | "discount_claimed" | "user_registered"
    description: string
    timestamp: Date
  }[]
}

class DatabaseService {
  async getProducts(): Promise<Product[]> {
    const db = await getDatabase()
    const products = await db.collection("products").find({}).toArray()

    return products.map((product) => ({
      ...product,
      _id: product._id.toString(),
    })) as Product[];      
  }

  async getProductById(id: string): Promise<Product | null> {
    const db = await getDatabase()
    const product = await db.collection("products").findOne({ _id: new ObjectId(id) })
    if (!product) return null
    return {
      ...product,
      _id: product._id.toString(),
    } as Product;
    
  }

  async createProduct(product: Omit<Product, "_id" | "createdAt" | "updatedAt">): Promise<Product> {
    const db = await getDatabase()
    const now = new Date()
    const newProduct = {
      ...product,
      createdAt: now,
      updatedAt: now,
    }
    const result = await db.collection("products").insertOne(newProduct)
    return {
      ...newProduct,
      _id: result.insertedId.toString(),
    }
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const db = await getDatabase()
    const result = await db.collection("products").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    )
    if (!result) return null
    return {
      ...result,
      _id: result._id.toString(),
    } as Product;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const db = await getDatabase()
    const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  }

  async createDiscountLead(lead: Omit<DiscountLead, "_id" | "createdAt">): Promise<DiscountLead> {
    const db = await getDatabase()
    const newLead = {
      ...lead,
      createdAt: new Date(),
    }
    const result = await db.collection("discount_leads").insertOne(newLead)
    return {
      ...newLead,
      _id: result.insertedId.toString(),
    }
  }

  async getDiscountLeads(): Promise<DiscountLead[]> {
    const db = await getDatabase()
    const leads = await db.collection("discount_leads").find({}).sort({ createdAt: -1 }).toArray()
    return leads.map((lead) => ({
      ...lead,
      _id: lead._id.toString(),
    })) as DiscountLead[];
  } 

  async createUser(user: Omit<User, "_id" | "createdAt" | "updatedAt">): Promise<User> {
    const db = await getDatabase()
    const now = new Date()
    const newUser = {
      ...user,
      createdAt: now,
      updatedAt: now,
    }
    const result = await db.collection("users").insertOne(newUser)
    return {
      ...newUser,
      _id: result.insertedId.toString(),
    }
  }

  async getUserByClerkId(clerkId: string): Promise<User | null> {
    const db = await getDatabase()
    const user = await db.collection("users").findOne({ clerkId })
    if (!user) return null
    return {
      ...user,
      _id: user._id.toString(),
    } as User;
  }

  async getAnalytics(): Promise<Analytics> {
    const db = await getDatabase()

    const [totalProducts, totalDiscountLeads, totalUsers] = await Promise.all([
      db.collection("products").countDocuments(),
      db.collection("discount_leads").countDocuments(),
      db.collection("users").countDocuments(),
    ])

    // Get recent activity
    const recentProducts = await db.collection("products").find({}).sort({ createdAt: -1 }).limit(5).toArray()

    const recentLeads = await db.collection("discount_leads").find({}).sort({ createdAt: -1 }).limit(5).toArray()

    const recentUsers = await db.collection("users").find({}).sort({ createdAt: -1 }).limit(5).toArray()

    const recentActivity = [
      ...recentProducts.map((p) => ({
        type: "product_created" as const,
        description: `Product "${p.name}" was created`,
        timestamp: p.createdAt,
      })),
      ...recentLeads.map((l) => ({
        type: "discount_claimed" as const,
        description: `${l.name} claimed discount code ${l.discountCode}`,
        timestamp: l.createdAt,
      })),
      ...recentUsers.map((u) => ({
        type: "user_registered" as const,
        description: `${u.firstName || "User"} registered`,
        timestamp: u.createdAt,
      })),
    ]
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 10)

    return {
      totalProducts,
      totalDiscountLeads,
      totalUsers,
      recentActivity,
    }
  }

  async createMockupProducts(): Promise<Product[]> {
    const mockupProducts: Omit<Product, "_id" | "createdAt" | "updatedAt">[] = [
      {
        name: "Premium Business Cards",
        category: "Business Cards",
        subcategory: "Premium",
        description: "High-quality business cards with premium finish",
        price: 25.99,
        costPrice: 15.99,
        margin: 10.0,
        images: ["/templates/business-card-1.png"],
        templates: ["/templates/business-card-1.png", "/templates/business-card-2.png"],
        customizationOptions: {
          colors: ["White", "Cream", "Black"],
          sizes: ["Standard", "Mini"],
          materials: ["Matte", "Glossy", "Textured"],
        },
        minOrderQuantity: 100,
        status: "active",
      },
      {
        name: "Custom T-Shirts",
        category: "Apparel",
        subcategory: "T-Shirts",
        description: "Comfortable cotton t-shirts with custom printing",
        price: 18.99,
        costPrice: 12.99,
        margin: 6.0,
        images: ["/templates/tshirt-1.png"],
        templates: ["/templates/tshirt-1.png", "/templates/tshirt-2.png"],
        customizationOptions: {
          colors: ["White", "Black", "Navy", "Red", "Green"],
          sizes: ["S", "M", "L", "XL", "XXL"],
          materials: ["100% Cotton", "Cotton Blend"],
        },
        minOrderQuantity: 25,
        status: "active",
      },
      {
        name: "Custom Mugs",
        category: "Promotional Items",
        subcategory: "Drinkware",
        description: "Ceramic mugs with custom designs and logos",
        price: 12.99,
        costPrice: 8.99,
        margin: 4.0,
        images: ["/templates/mug-1.png"],
        templates: ["/templates/mug-1.png", "/templates/mug-2.png"],
        customizationOptions: {
          colors: ["White", "Black", "Blue", "Red"],
          sizes: ["11oz", "15oz"],
          materials: ["Ceramic", "Stainless Steel"],
        },
        minOrderQuantity: 50,
        status: "active",
      },
    ]

    const createdProducts = []
    for (const product of mockupProducts) {
      const created = await this.createProduct(product)
      createdProducts.push(created)
    }

    return createdProducts
  }
}

export const dbService = new DatabaseService()
