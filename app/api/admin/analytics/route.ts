import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { dbService } from "@/lib/database"

const ADMIN_EMAILS = ["wahidzk0091@gmail.com", "admin@easegiv.com"]

export async function GET() {
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

    const analytics = await dbService.getAnalytics()
    return NextResponse.json(analytics)
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch analytics" }, { status: 500 })
  }
}
