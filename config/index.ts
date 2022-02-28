import { readEnv } from "../src/utils/readEnv";

const config: {[key: string]: any} = {}

config.app = {}
config.app.port = readEnv.get("APP_PORT")
config.app.env = readEnv.get("APP_ENV") // development, production
config.app.hashSalt = parseInt(readEnv.get("APP_HASH_SALT"))
config.app.secretJWTKey = readEnv.get("APP_SECRET_JWT_KEY")
config.app.accessTokenTTL = readEnv.get("APP_ACCESS_TOKEN_TTL")
config.app.refreshTokenTTL = readEnv.get("APP_REFRESH_TOKEN_TTL")

config.database = {}
config.database.host = readEnv.get("DATABASE_HOST")
config.database.port = parseInt(readEnv.get("DATABASE_PORT"))
config.database.schema = readEnv.get("DATABASE_SCHEMA")
config.database.username = readEnv.get("DATABASE_USERNAME")
config.database.password = readEnv.get("DATABASE_PASSWORD")

export { config }