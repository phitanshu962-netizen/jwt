import "reflect-metadata"
import { createConnection, Connection } from "typeorm"
import { User } from "./entity/User"

require("dotenv").config()

export let AppDataSource: Connection

export const initializeDatabase = async () => {
    try {
        console.log("🔄 Attempting to connect to MongoDB...")
        console.log("Connection URL:", process.env.MONGODB_URI || "mongodb+srv://hitanshup55_db_user:0PjiSXcNdKSCLQw5@cluster0.9tusk1n.mongodb.net/heth")

        AppDataSource = await createConnection({
            type: "mongodb",
            url: process.env.MONGODB_URI || "mongodb+srv://hitanshup55_db_user:0PjiSXcNdKSCLQw5@cluster0.9tusk1n.mongodb.net/heth",
            synchronize: true,
            logging: false,
            entities: [User],
            extra: {
                serverSelectionTimeoutMS: 5000, // 5 second timeout
            }
        })
        console.log("✅ Connected to MongoDB Atlas successfully!")
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message)
        console.error("Full error:", error)
        throw error
    }
}
