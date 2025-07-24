import clientPromise from "./mongodb"

export interface DiscountLead {
  _id?: string
  name: string
  email: string
  phone: string
  discountCode: string
  discountPercentage: number
  isUsed: boolean
  usedAt?: Date
  createdAt: Date
  expiresAt: Date
}

export interface Product {
  _id?: string
  productId: string
  name: string
  slug: string
  description: string
  category: string
  subcategory: string
  sku: string
  price: number
  costPrice: number
  margin: number
  stockQuantity: number
  minOrderQuantity: number
  status: "Active" | "Inactive" | "Low Stock" | "Out of Stock"
  supplier: string
  colors: string[]
  sizes: string[]
  customizationOptions: Record<string, any>
  images: string[]
  totalOrders: number
  totalRevenue: number
  createdAt: Date
  updatedAt: Date
}

export interface User {
  _id?: string
  clerkId: string
  email: string
  firstName: string
  lastName: string
  role: "admin" | "user"
  createdAt: Date
  updatedAt: Date
}

export class DatabaseService {
  private static instance: DatabaseService

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService()
    }
    return DatabaseService.instance
  }

  async getDatabase() {
    const client = await clientPromise
    return client.db("easegiv")
  }

  // User operations
  async createUser(userData: Omit<User, "_id" | "createdAt" | "updatedAt">) {
    try {
      const db = await this.getDatabase()
      const collection = db.collection("users")

      const user: Omit<User, "_id"> = {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const result = await collection.insertOne(user)
      return { success: true, id: result.insertedId }
    } catch (error) {
      console.error("Error creating user:", error)
      throw error
    }
  }

  async getUserByClerkId(clerkId: string) {
    try {
      const db = await this.getDatabase()
      const collection = db.collection("users")
      return await collection.findOne({ clerkId })
    } catch (error) {
      console.error("Error fetching user by Clerk ID:", error)
      throw error
    }
  }

  async updateUser(clerkId: string, updates: Partial<User>) {
    try {
      const db = await this.getDatabase()
      const collection = db.collection("users")

      const result = await collection.updateOne({ clerkId }, { $set: { ...updates, updatedAt: new Date() } })

      return { success: result.modifiedCount > 0 }
    } catch (error) {
      console.error("Error updating user:", error)
      throw error
    }
  }

  // Product operations
  async getProducts(limit = 50, skip = 0) {
    try {
      const db = await this.getDatabase()
      const collection = db.collection("products")

      const products = await collection.find({}).sort({ createdAt: -1 }).limit(limit).skip(skip).toArray()

      const total = await collection.countDocuments()

      return {
        products: products.map((p) => ({
          ...p,
          _id: p._id.toString(),
        })),
        total,
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      throw error
    }
  }

  async getProductById(productId: string) {
    try {
      const db = await this.getDatabase()
      const collection = db.collection("products")
      const product = await collection.findOne({ productId })

      if (product) {
        return {
          ...product,
          _id: product._id.toString(),
        }
      }

      return null
    } catch (error) {
      console.error("Error fetching product:", error)
      throw error
    }
  }

  async createProduct(productData: Omit<Product, "_id" | "createdAt" | "updatedAt">) {
    try {
      const db = await this.getDatabase()
      const collection = db.collection("products")

      const product: Omit<Product, "_id"> = {
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const result = await collection.insertOne(product)
      return {
        success: true,
        id: result.insertedId,
        product: {
          ...product,
          _id: result.insertedId.toString(),
        },
      }
    } catch (error) {
      console.error("Error creating product:", error)
      throw error
    }
  }

  async updateProduct(productId: string, updates: Partial<Product>) {
    try {
      const db = await this.getDatabase()
      const collection = db.collection("products")

      const result = await collection.updateOne({ productId }, { $set: { ...updates, updatedAt: new Date() } })

      return { success: result.modifiedCount > 0 }
    } catch (error) {
      console.error("Error updating product:", error)
      throw error
    }
  }

  async deleteProduct(productId: string) {
    try {
      const db = await this.getDatabase()
      const collection = db.collection("products")

      const result = await collection.deleteOne({ productId })
      return { success: result.deletedCount > 0 }
    } catch (error) {
      console.error("Error deleting product:", error)
      throw error
    }
  }

  // Discount Lead operations
  async createDiscountLead(
    leadData: Omit<DiscountLead, "_id" | "createdAt" | "expiresAt" | "isUsed" | "discountPercentage">,
  ) {
    try {
      const db = await this.getDatabase()
      const collection = db.collection("discount_leads")

      // Check if email already exists
      const existingLead = await collection.findOne({ email: leadData.email })
      if (existingLead) {
        throw new Error("Email already exists")
      }

      const now = new Date()
      const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days from now

      const newLead: Omit<DiscountLead, "_id"> = {
        ...leadData,
        discountPercentage: 15,
        isUsed: false,
        createdAt: now,
        expiresAt,
      }

      const result = await collection.insertOne(newLead)
      return {
        success: true,
        id: result.insertedId,
        lead: {
          ...newLead,
          _id: result.insertedId.toString(),
        },
      }
    } catch (error) {
      console.error("Error creating discount lead:", error)
      throw error
    }
  }

  async getDiscountLeads() {
    try {
      const db = await this.getDatabase()
      const collection = db.collection("discount_leads")

      const leads = await collection.find({}).sort({ createdAt: -1 }).toArray()

      return leads.map((lead) => ({
        ...lead,
        _id: lead._id.toString(),
      }))
    } catch (error) {
      console.error("Error fetching discount leads:", error)
      throw error
    }
  }

  async deleteDiscountLead(id: string) {
    try {
      const db = await this.getDatabase()
      const collection = db.collection("discount_leads")

      const { ObjectId } = require("mongodb")
      const result = await collection.deleteOne({ _id: new ObjectId(id) })
      return { success: result.deletedCount > 0 }
    } catch (error) {
      console.error("Error deleting discount lead:", error)
      throw error
    }
  }

  async getAnalytics() {
    try {
      const db = await this.getDatabase()
      const leadsCollection = db.collection("discount_leads")
      const productsCollection = db.collection("products")

      const totalLeads = await leadsCollection.countDocuments()
      const usedCodes = await leadsCollection.countDocuments({ isUsed: true })
      const unusedCodes = totalLeads - usedCodes

      // Get leads from this month
      const startOfMonth = new Date()
      startOfMonth.setDate(1)
      startOfMonth.setHours(0, 0, 0, 0)

      const leadsThisMonth = await leadsCollection.countDocuments({
        createdAt: { $gte: startOfMonth },
      })

      // Get recent leads
      const recentLeads = await leadsCollection.find({}).sort({ createdAt: -1 }).limit(10).toArray()

      // Get product analytics
      const totalProducts = await productsCollection.countDocuments()
      const products = await productsCollection.find({}).toArray()
      const totalRevenue = products.reduce((sum, p) => sum + (p.totalRevenue || 0), 0)
      const totalOrders = products.reduce((sum, p) => sum + (p.totalOrders || 0), 0)

      const conversionRate = totalLeads > 0 ? ((usedCodes / totalLeads) * 100).toFixed(1) : "0.0"

      return {
        totalLeads,
        usedCodes,
        unusedCodes,
        leadsThisMonth,
        recentLeads: recentLeads.map((lead) => ({
          ...lead,
          _id: lead._id.toString(),
        })),
        conversionRate,
        totalProducts,
        totalRevenue,
        totalOrders,
      }
    } catch (error) {
      console.error("Error fetching analytics:", error)
      throw error
    }
  }

  generateDiscountCode(): string {
    const prefix = "WELCOME"
    const randomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    return `${prefix}${randomNum}`
  }
}

export const dbService = DatabaseService.getInstance()
