import { NextResponse } from "next/server"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { dbService } from "@/lib/database"

const ADMIN_EMAILS = ["wahidzk0091@gmail.com", "admin@easegiv.com"]
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user from Clerk to check email
    const { clerkClient } = await import("@clerk/nextjs/server")
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    const userEmail = user.emailAddresses[0]?.emailAddress

    if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const analytics = await dbService.getAnalytics()
    return NextResponse.json(analytics)
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
