import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import type { Customer } from "@/lib/models/User"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const skip = Number.parseInt(searchParams.get("skip") || "0")

    const result = await db.getCustomers(limit, skip)

    return NextResponse.json({
      success: true,
      data: result.customers,
      total: result.total,
      page: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(result.total / limit),
    })
  } catch (error) {
    console.error("Error fetching customers:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch customers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const customerData = await request.json()

    // Generate customerId
    const customerId = `CUST-${Date.now().toString().slice(-6)}`

    const newCustomer: Omit<Customer, "_id"> = {
      customerId,
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      company: customerData.company,
      gstin: customerData.gstin,
      address: customerData.address,
      city: customerData.city,
      state: customerData.state,
      country: customerData.country || "India",
      status: "Active",
      customerType: customerData.customerType || "Regular",
      totalOrders: 0,
      totalSpent: 0,
      avgOrderValue: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const insertedId = await db.createCustomer(newCustomer)

    return NextResponse.json({
      success: true,
      data: { ...newCustomer, _id: insertedId },
      message: "Customer created successfully",
    })
  } catch (error) {
    console.error("Error creating customer:", error)
    return NextResponse.json({ success: false, error: "Failed to create customer" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { customerId, ...updates } = await request.json()

    await db.updateCustomer(customerId, updates)

    return NextResponse.json({
      success: true,
      message: "Customer updated successfully",
    })
  } catch (error) {
    console.error("Error updating customer:", error)
    return NextResponse.json({ success: false, error: "Failed to update customer" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get("customerId")

    if (!customerId) {
      return NextResponse.json({ success: false, error: "Customer ID is required" }, { status: 400 })
    }

    await db.deleteCustomer(customerId)

    return NextResponse.json({
      success: true,
      message: "Customer deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting customer:", error)
    return NextResponse.json({ success: false, error: "Failed to delete customer" }, { status: 500 })
  }
}
