import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    if (!type) {
      return NextResponse.json({ error: "Export type is required" }, { status: 400 })
    }

    let data: any[] = []
    let headers: string[] = []
    let filename = `${type}_export_${new Date().toISOString().split("T")[0]}.csv`

    switch (type) {
      case "orders":
        const ordersResult = await db.getOrders(1000, 0)
        data = ordersResult.orders.map((order: any) => ({
          "Order ID": order.orderId,
          "Customer Name": order.customerDetails?.name || "",
          "Customer Email": order.customerDetails?.email || "",
          Company: order.customerDetails?.company || "",
          Phone: order.customerDetails?.phone || "",
          GSTIN: order.customerDetails?.gstin || "",
          Status: order.status,
          Priority: order.priority,
          Subtotal: order.subtotal,
          Discount: order.discountAmount,
          "GST Amount": order.gstAmount,
          Shipping: order.shippingAmount,
          "Total Amount": order.totalAmount,
          "Payment Status": order.paymentStatus,
          "Coupon Code": order.couponCode || "",
          "Assigned To": order.assignedToName || "",
          Notes: order.notes || "",
          "Created Date": new Date(order.createdAt).toLocaleDateString(),
          "Updated Date": new Date(order.updatedAt).toLocaleDateString(),
        }))
        break

      case "customers":
        const customersResult = await db.getCustomers(1000, 0)
        data = customersResult.customers.map((customer: any) => ({
          "Customer ID": customer.customerId,
          Name: customer.name,
          Email: customer.email,
          Phone: customer.phone,
          Company: customer.company,
          GSTIN: customer.gstin || "",
          Address: customer.address,
          City: customer.city,
          State: customer.state,
          Country: customer.country,
          "Customer Type": customer.customerType,
          Status: customer.status,
          "Total Orders": customer.totalOrders,
          "Total Spent": customer.totalSpent,
          "Average Order Value": customer.avgOrderValue,
          "Join Date": new Date(customer.createdAt).toLocaleDateString(),
          "Last Order Date": customer.lastOrderDate ? new Date(customer.lastOrderDate).toLocaleDateString() : "",
        }))
        break

      case "products":
        const productsResult = await db.getProducts(1000, 0)
        data = productsResult.products.map((product: any) => ({
          "Product ID": product.productId,
          Name: product.name,
          Category: product.category,
          Subcategory: product.subcategory,
          SKU: product.sku,
          Description: product.description,
          Price: product.price,
          "Cost Price": product.costPrice,
          Margin: product.margin,
          "Stock Quantity": product.stockQuantity,
          "Min Order Quantity": product.minOrderQuantity,
          Status: product.status,
          Supplier: product.supplier,
          Colors: product.colors?.join(", ") || "",
          Sizes: product.sizes?.join(", ") || "",
          "Total Orders": product.totalOrders,
          "Total Revenue": product.totalRevenue,
          "Created Date": new Date(product.createdAt).toLocaleDateString(),
        }))
        break

      case "users":
        const usersResult = await db.getUsers(1000, 0)
        data = usersResult.users.map((user: any) => ({
          "User ID": user.userId,
          Name: user.name,
          Email: user.email,
          Role: user.role,
          Department: user.department,
          Status: user.status,
          Permissions: user.permissions?.join(", ") || "",
          "Orders Handled": user.ordersHandled,
          "Join Date": new Date(user.createdAt).toLocaleDateString(),
          "Last Login": user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never",
        }))
        break

      case "sales-report":
        const salesResult = await db.getOrders(1000, 0)
        data = salesResult.orders.map((order: any) => ({
          Date: new Date(order.createdAt).toLocaleDateString(),
          "Order ID": order.orderId,
          Customer: order.customerDetails?.name || "",
          Company: order.customerDetails?.company || "",
          Products: order.items?.map((item: any) => item.productName).join(", ") || "",
          Quantity: order.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0,
          Subtotal: order.subtotal,
          Discount: order.discountAmount,
          GST: order.gstAmount,
          Shipping: order.shippingAmount,
          Total: order.totalAmount,
          "Payment Status": order.paymentStatus,
          "Order Status": order.status,
          "Sales Rep": order.assignedToName || "",
        }))
        filename = `sales_report_${new Date().toISOString().split("T")[0]}.csv`
        break

      default:
        return NextResponse.json({ error: "Invalid export type" }, { status: 400 })
    }

    if (data.length === 0) {
      return NextResponse.json({ error: "No data found to export" }, { status: 404 })
    }

    // Generate CSV content
    headers = Object.keys(data[0])
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header]
            // Escape commas and quotes in CSV
            if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`
            }
            return value
          })
          .join(","),
      ),
    ].join("\n")

    // Return CSV file
    return new Response(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 })
  }
}
