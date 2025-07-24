import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email } = body

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Generate discount code
    const discountCode = `SAVE15-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    // Create discount lead
    const discountLead = await dbService.createDiscountLead({
      name,
      email,
      discountCode,
      discountPercentage: 15,
      isUsed: false,
    })

    return NextResponse.json({
      success: true,
      discountCode: discountLead.discountCode,
      message: "Discount code generated successfully!",
    })
  } catch (error) {
    console.error("Error creating discount lead:", error)
    return NextResponse.json({ error: "Failed to generate discount code" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const leads = await dbService.getDiscountLeads()
    return NextResponse.json({ leads })
  } catch (error) {
    console.error("Error fetching discount leads:", error)
    return NextResponse.json({ error: "Failed to fetch discount leads" }, { status: 500 })
  }
}
