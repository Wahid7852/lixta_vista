import { getDatabase } from "../lib/mongodb"

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...")
    const db = await getDatabase()

    // Clear existing collections
    console.log("🧹 Clearing existing data...")
    await Promise.all([
      db.collection("users").deleteMany({}),
      db.collection("customers").deleteMany({}),
      db.collection("products").deleteMany({}),
      db.collection("orders").deleteMany({}),
      db.collection("coupons").deleteMany({}),
      db.collection("system_settings").deleteMany({}),
    ])

    console.log("✅ Existing data cleared")

    // Insert sample users
    console.log("👥 Inserting users...")
    await db.collection("users").insertMany([
      {
        userId: "USER-001",
        name: "Admin User",
        email: "admin@easegiv.com",
        passwordHash: "$2b$10$example_hash_admin",
        role: "Super Admin",
        department: "Management",
        status: "Active",
        permissions: ["all"],
        ordersHandled: 0,
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date(),
        lastLogin: new Date("2024-01-15T10:30:00"),
      },
      {
        userId: "USER-002",
        name: "John Manager",
        email: "john@easegiv.com",
        passwordHash: "$2b$10$example_hash_john",
        role: "Manager",
        department: "Operations",
        status: "Active",
        permissions: ["orders", "products", "customers", "analytics"],
        ordersHandled: 156,
        createdAt: new Date("2023-02-15"),
        updatedAt: new Date(),
        lastLogin: new Date("2024-01-15T09:15:00"),
      },
    ])

    console.log("✅ Users inserted")

    // Insert sample customers
    console.log("🏢 Inserting customers...")
    await db.collection("customers").insertMany([
      {
        customerId: "CUST-001",
        name: "Rajesh Kumar",
        email: "rajesh@kumarenterprises.com",
        phone: "+91-9876543210",
        company: "Kumar Enterprises",
        gstin: "29ABCDE1234F1Z5",
        address: "123 Business Street, MG Road",
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
        status: "Active",
        customerType: "VIP",
        totalOrders: 15,
        totalSpent: 125000,
        avgOrderValue: 8333,
        createdAt: new Date("2023-06-15"),
        updatedAt: new Date(),
        lastOrderDate: new Date("2024-01-15"),
      },
    ])

    console.log("✅ Customers inserted")

    // Insert sample products
    console.log("📦 Inserting products...")
    await db.collection("products").insertMany([
      {
        productId: "PROD-001",
        name: "Custom T-Shirts",
        slug: "custom-t-shirts",
        description: "High-quality cotton t-shirts with custom printing options",
        category: "Apparel",
        subcategory: "T-Shirts",
        sku: "TSH-001",
        price: 299,
        costPrice: 150,
        margin: 149,
        stockQuantity: 500,
        minOrderQuantity: 50,
        status: "Active",
        supplier: "Textile Co. Ltd",
        colors: ["White", "Black", "Navy Blue", "Red"],
        sizes: ["S", "M", "L", "XL"],
        customizationOptions: {
          printing: ["Screen Print", "Digital Print"],
          positions: ["Front Center", "Back Center"],
        },
        images: ["/templates/tshirt-1.png"],
        totalOrders: 234,
        totalRevenue: 69966,
        createdAt: new Date("2023-01-15"),
        updatedAt: new Date(),
      },
    ])

    console.log("✅ Products inserted")

    // Create indexes for better performance
    console.log("📊 Creating database indexes...")
    await Promise.all([
      db.collection("users").createIndex({ userId: 1 }, { unique: true }),
      db.collection("users").createIndex({ email: 1 }, { unique: true }),
      db.collection("customers").createIndex({ customerId: 1 }, { unique: true }),
      db.collection("products").createIndex({ productId: 1 }, { unique: true }),
      db.collection("orders").createIndex({ orderId: 1 }, { unique: true }),
    ])

    console.log("✅ Database indexes created")
    console.log("🎉 Database seeding completed successfully!")
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

// Run the seed function
seedDatabase()
