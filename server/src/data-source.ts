import "reflect-metadata"
import { createConnection, Connection } from "typeorm"
import { User } from "./entity/User"

require("dotenv").config()

export let AppDataSource: Connection

export const initializeDatabase = async () => {
    try {
        console.log("🔄 Attempting to connect to MongoDB...")
        const mongoUri = process.env.MONGODB_URI || "mongodb+srv://hitanshup55_db_user:0PjiSXcNdKSCLQw5@cluster0.9tusk1n.mongodb.net/heth"
        console.log("Connection URL:", mongoUri.replace(/:([^:@]{4})[^:@]*@/, ':****@')) // Hide password in logs

        // Try a simpler connection first
        AppDataSource = await createConnection({
            type: "mongodb",
            url: mongoUri,
            synchronize: true,
            logging: false,
            entities: [User],
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("✅ Connected to MongoDB Atlas successfully!")
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message)
        console.error("Error code:", error.code)
        throw error
    }
}
