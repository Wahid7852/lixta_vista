import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import type { User } from "@/lib/models/User"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const skip = Number.parseInt(searchParams.get("skip") || "0")

    const result = await db.getUsers(limit, skip)

    return NextResponse.json({
      success: true,
      data: result.users,
      total: result.total,
      page: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(result.total / limit),
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()

    // Generate userId
    const userId = `USER-${Date.now().toString().slice(-6)}`

    const newUser: Omit<User, "_id"> = {
      userId,
      name: userData.name,
      email: userData.email,
      passwordHash: "$2b$10$example_hash", // In production, hash the password
      role: userData.role,
      department: userData.department,
      status: "Active",
      permissions: userData.permissions || [],
      ordersHandled: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const insertedId = await db.createUser(newUser)

    return NextResponse.json({
      success: true,
      data: { ...newUser, _id: insertedId },
      message: "User created successfully",
    })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId, ...updates } = await request.json()

    await db.updateUser(userId, updates)

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
    })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ success: false, error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    await db.deleteUser(userId)

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ success: false, error: "Failed to delete user" }, { status: 500 })
  }
}
