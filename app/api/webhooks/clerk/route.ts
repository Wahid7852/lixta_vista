import { type NextRequest, NextResponse } from "next/server"
import { Webhook } from "svix"
import { headers } from "next/headers"
import { dbService } from "@/lib/database"

const ADMIN_EMAILS = ["wahidzk0091@gmail.com", "admin@easegiv.com"]

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local")
  }

  // Get the headers
  const headerPayload = headers()
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
      const email = email_addresses[0]?.email_address
      const role = ADMIN_EMAILS.includes(email) ? "admin" : "user"

      await dbService.createUser({
        clerkId: id,
        email,
        firstName: first_name || "",
        lastName: last_name || "",
        role,
      })

      console.log(`User created: ${email} with role: ${role}`)
    } catch (error) {
      console.error("Error creating user in database:", error)
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name } = evt.data

    try {
      const email = email_addresses[0]?.email_address
      const role = ADMIN_EMAILS.includes(email) ? "admin" : "user"

      await dbService.updateUser(id, {
        email,
        firstName: first_name || "",
        lastName: last_name || "",
        role,
      })

      console.log(`User updated: ${email}`)
    } catch (error) {
      console.error("Error updating user in database:", error)
    }
  }

  return NextResponse.json({ success: true })
}
