import "reflect-metadata"
import { createConnection, Connection } from "typeorm"
import { User } from "./entity/User"

require("dotenv").config()

export let AppDataSource: Connection

export const initializeDatabase = async () => {
    AppDataSource = await createConnection({
        type: "sqlite",
        database: "database.sqlite",
        synchronize: true,
        logging: false,
        entities: [User],
    })
}
