import { getDatabase } from "./mongodb"

export async function testConnection() {
  try {
    const db = await getDatabase()
    const result = await db.admin().ping()
    console.log("✅ MongoDB connection successful:", result)
    return true
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error)
    return false
  }
}
