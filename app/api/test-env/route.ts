import { type NextRequest, NextResponse } from "next/server"
import { testConnection } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const envCheck = {
      nodeEnv: process.env.NODE_ENV,
      mongoUriDefined: !!process.env.MONGODB_URI,
      mongoUriPreview: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 20) + "..." : "Not defined",
      timestamp: new Date().toISOString(),
    }

    // Test MongoDB connection
    let connectionTest = false
    let connectionError = null

    try {
      connectionTest = await testConnection()
    } catch (error) {
      connectionError = error.message
    }

    return NextResponse.json({
      success: true,
      environment: envCheck,
      mongodb: {
        connectionTest,
        error: connectionError,
      },
      message: "Environment variables loaded successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: "Failed to load environment variables",
      },
      { status: 500 },
    )
  }
}
