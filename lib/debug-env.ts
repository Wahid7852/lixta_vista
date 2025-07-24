export function debugEnvironment() {
  console.log("=== Environment Debug ===")
  console.log("NODE_ENV:", process.env.NODE_ENV)
  console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI)
  console.log("MONGODB_URI length:", process.env.MONGODB_URI?.length || 0)
  console.log(
    "All env vars starting with MONGO:",
    Object.keys(process.env)
      .filter((key) => key.startsWith("MONGO"))
      .map((key) => `${key}: ${process.env[key] ? "SET" : "NOT SET"}`),
  )
  console.log("========================")
}
