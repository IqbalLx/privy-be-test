import { readEnv } from "../../utils/readEnv";
import { IDatabaseConnection } from "./IDatabase";

import SequelizeDatabase from "./sequelize"

const connectionConf: IDatabaseConnection = {
    databaseHost: readEnv.get("DATABASE_HOST"),
    databasePort: parseInt(readEnv.get("DATABASE_PORT")),
    databaseSchema: readEnv.get("DATABASE_SCHEMA"),
    databaseUsername: readEnv.get("DATABASE_USERNAME"),
    databasePassword: readEnv.get("DATABASE_PASSWORD"),
}

const database = new SequelizeDatabase(connectionConf)
database.buildModel()

const models = database.getModels()

export default models