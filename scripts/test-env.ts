import dotenv from "dotenv"
import path from "path"

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), ".env.local") })

console.log("🔍 Environment Variable Debug Report")
console.log("=====================================")
console.log("Current working directory:", process.cwd())
console.log("NODE_ENV:", process.env.NODE_ENV)
console.log("")

// Check for .env.local file
const fs = require("fs")
const envPath = path.join(process.cwd(), ".env.local")
const envExists = fs.existsSync(envPath)

console.log("📁 File System Check:")
console.log("- .env.local exists:", envExists)
if (envExists) {
  const stats = fs.statSync(envPath)
  console.log("- .env.local size:", stats.size, "bytes")
  console.log("- .env.local modified:", stats.mtime)
}
console.log("")

// Check MongoDB URI
console.log("🔗 MongoDB Configuration:")
console.log("- MONGODB_URI defined:", !!process.env.MONGODB_URI)
if (process.env.MONGODB_URI) {
  const uri = process.env.MONGODB_URI
  console.log("- URI starts with mongodb:", uri.startsWith("mongodb"))
  console.log("- URI length:", uri.length)
  console.log("- URI preview:", uri.substring(0, 20) + "...")
} else {
  console.log("❌ MONGODB_URI is not defined!")
}
console.log("")

// List all environment variables that contain 'MONGO'
console.log("🔍 All MONGO-related environment variables:")
const mongoVars = Object.keys(process.env).filter((key) => key.toUpperCase().includes("MONGO"))
if (mongoVars.length > 0) {
  mongoVars.forEach((key) => {
    console.log(`- ${key}: ${process.env[key] ? "defined" : "undefined"}`)
  })
} else {
  console.log("- No MONGO-related variables found")
}
console.log("")

// Test MongoDB connection
console.log("🧪 Testing MongoDB Connection:")
async function testMongoDB() {
  try {
    const { testConnection } = await import("../lib/mongodb")
    const isConnected = await testConnection()
    console.log("- Connection test:", isConnected ? "✅ SUCCESS" : "❌ FAILED")
  } catch (error) {
    console.log("- Connection test: ❌ ERROR")
    console.log("- Error message:", error.message)
  }
}

testMongoDB()
