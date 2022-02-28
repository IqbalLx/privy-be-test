import { config } from "../../../config";
import { IDatabaseConnection } from "./IDatabase";

import SequelizeDatabase from "./sequelize"

const connectionConf: IDatabaseConnection = {
    databaseHost: config.database.host,
    databasePort: config.database.port,
    databaseSchema: config.database.schema,
    databaseUsername: config.database.username,
    databasePassword: config.database.password,
    databaseLogging: config.app.env == "development"
}

const database = new SequelizeDatabase(connectionConf)
database.buildModel()

const models = database.getModels()

export { models }