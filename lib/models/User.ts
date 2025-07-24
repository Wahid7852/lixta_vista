import type { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  userId: string
  name: string
  email: string
  passwordHash: string
  role: "Super Admin" | "Manager" | "Editor" | "Viewer"
  department: string
  status: "Active" | "Inactive"
  permissions: string[]
  ordersHandled: number
  createdAt: Date
  updatedAt: Date
  lastLogin?: Date
}

export interface Customer {
  _id?: ObjectId
  customerId: string
  name: string
  email: string
  phone: string
  company: string
  gstin?: string
  address: string
  city: string
  state: string
  country: string
  status: "Active" | "Inactive"
  customerType: "Regular" | "Premium" | "VIP" | "Enterprise"
  totalOrders: number
  totalSpent: number
  avgOrderValue: number
  createdAt: Date
  updatedAt: Date
  lastOrderDate?: Date
}

export interface Product {
  _id?: ObjectId
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

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
  customizationDetails?: Record<string, any>
}

export interface Order {
  _id?: ObjectId
  orderId: string
  customerId: string
  customerDetails: {
    name: string
    email: string
    company: string
    phone: string
    gstin?: string
  }
  assignedTo?: string
  assignedToName?: string
  status: "Pending" | "Confirmed" | "In Production" | "Shipped" | "Delivered" | "Cancelled"
  priority: "Low" | "Medium" | "High" | "Urgent"
  items: OrderItem[]
  subtotal: number
  discountAmount: number
  gstRate: number
  gstAmount: number
  shippingAmount: number
  totalAmount: number
  paymentStatus: "Pending" | "Paid" | "Failed" | "Refunded"
  couponCode?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Coupon {
  _id?: ObjectId
  code: string
  description: string
  discountType: "percentage" | "fixed"
  discountValue: number
  minOrderAmount?: number
  maxDiscountAmount?: number
  usageLimit: number
  usedCount: number
  isActive: boolean
  validFrom: Date
  validUntil: Date
  createdAt: Date
}

export interface DiscountLead {
  _id?: ObjectId
  email: string
  name: string
  phone: string
  discountCode: string
  discountPercentage: number
  isUsed: boolean
  usedAt?: Date
  createdAt: Date
  expiresAt: Date
}

export interface SystemSetting {
  _id?: ObjectId
  key: string
  value: any
  dataType: "string" | "number" | "boolean" | "object"
  description: string
  isPublic: boolean
  updatedBy: string
  updatedAt: Date
}
