import "reflect-metadata"
import { createConnection, Connection } from "typeorm"
import { User } from "./entity/User"

require("dotenv").config()

export let AppDataSource: Connection

export const initializeDatabase = async () => {
    AppDataSource = await createConnection({
        type: "mongodb",
        url: process.env.MONGODB_URI || "mongodb+srv://hitanshup55_db_user:0PjiSXcNdKSCLQw5@cluster0.9tusk1n.mongodb.net/jwt_auth",
        synchronize: true,
        logging: false,
        entities: [User],
    })
}
