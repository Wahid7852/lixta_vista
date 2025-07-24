import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/database"

export async function GET() {
  try {
    const leads = await dbService.getDiscountLeads()
    return NextResponse.json({ success: true, leads })
  } catch (error) {
    console.error("Error fetching discount leads:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch discount leads" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone } = await request.json()

    if (!name || !email || !phone) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const discountCode = dbService.generateDiscountCode()

    const result = await dbService.createDiscountLead({
      name,
      email,
      phone,
      discountCode,
    })

    return NextResponse.json({
      success: true,
      discountCode,
      message: "Discount code generated successfully!",
      data: result.lead,
    })
  } catch (error: any) {
    console.error("Error creating discount lead:", error)

    if (error.message === "Email already exists") {
      return NextResponse.json(
        { success: false, error: "This email has already been used to generate a discount code" },
        { status: 409 },
      )
    }

    return NextResponse.json({ success: false, error: "Failed to generate discount code" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "Lead ID is required" }, { status: 400 })
    }

    const result = await dbService.deleteDiscountLead(id)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Lead deleted successfully",
      })
    } else {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error deleting discount lead:", error)
    return NextResponse.json({ success: false, error: "Failed to delete lead" }, { status: 500 })
  }
}
