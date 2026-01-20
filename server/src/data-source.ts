import "reflect-metadata"
import { createConnection, Connection } from "typeorm"
import { User } from "./entity/User"

require("dotenv").config()

export let AppDataSource: Connection

export const initializeDatabase = async () => {
    try {
        AppDataSource = await createConnection({
            type: "mongodb",
            url: process.env.MONGODB_URI || "mongodb+srv://hitanshup55_db_user:0PjiSXcNdKSCLQw5@cluster0.9tusk1n.mongodb.net/heth",
            synchronize: true,
            logging: false,
            entities: [User],
        })
        console.log("✅ Connected to MongoDB Atlas successfully!")
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error)
        throw error
    }
}
