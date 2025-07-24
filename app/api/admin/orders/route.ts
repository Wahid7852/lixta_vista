import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import type { Order } from "@/lib/models/User"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const skip = Number.parseInt(searchParams.get("skip") || "0")

    const result = await db.getOrders(limit, skip)

    return NextResponse.json({
      success: true,
      data: result.orders,
      total: result.total,
      page: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(result.total / limit),
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // Generate orderId
    const orderId = `ORD-${Date.now().toString().slice(-6)}`

    // Calculate totals
    const subtotal = orderData.items.reduce((sum: number, item: any) => sum + item.totalPrice, 0)
    const gstAmount = ((subtotal - (orderData.discountAmount || 0)) * (orderData.gstRate || 18)) / 100
    const totalAmount = subtotal - (orderData.discountAmount || 0) + gstAmount + (orderData.shippingAmount || 0)

    const newOrder: Omit<Order, "_id"> = {
      orderId,
      customerId: orderData.customerId,
      customerDetails: orderData.customerDetails,
      assignedTo: orderData.assignedTo,
      assignedToName: orderData.assignedToName,
      status: "Pending",
      priority: orderData.priority || "Medium",
      items: orderData.items,
      subtotal,
      discountAmount: orderData.discountAmount || 0,
      gstRate: orderData.gstRate || 18,
      gstAmount,
      shippingAmount: orderData.shippingAmount || 0,
      totalAmount,
      paymentStatus: "Pending",
      couponCode: orderData.couponCode,
      notes: orderData.notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const insertedId = await db.createOrder(newOrder)

    return NextResponse.json({
      success: true,
      data: { ...newOrder, _id: insertedId },
      message: "Order created successfully",
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { orderId, ...updates } = await request.json()

    await db.updateOrder(orderId, updates)

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
    })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ success: false, error: "Failed to update order" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get("orderId")

    if (!orderId) {
      return NextResponse.json({ success: false, error: "Order ID is required" }, { status: 400 })
    }

    await db.deleteOrder(orderId)

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting order:", error)
    return NextResponse.json({ success: false, error: "Failed to delete order" }, { status: 500 })
  }
}
