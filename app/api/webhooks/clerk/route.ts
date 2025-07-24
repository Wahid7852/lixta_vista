import { type NextRequest, NextResponse } from "next/server"
import { Webhook } from "svix"
import { headers } from "next/headers"
import { dbService } from "@/lib/database"

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local")
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: any

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    })
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error occured", {
      status: 400,
    })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data

    try {
      await dbService.createUser({
        clerkId: id,
        email: email_addresses[0]?.email_address || "",
        firstName: first_name || "",
        lastName: last_name || "",
        role: email_addresses[0]?.email_address === "wahidzk0091@gmail.com" ? "admin" : "user",
      })

      console.log("User created in database:", id)
    } catch (error) {
      console.error("Error creating user in database:", error)
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name } = evt.data

    try {
      const existingUser = await dbService.getUserByClerkId(id)
      if (existingUser) {
        // Update user logic would go here if needed
        console.log("User updated:", id)
      }
    } catch (error) {
      console.error("Error updating user in database:", error)
    }
  }

  return NextResponse.json({ received: true })
}
