import * as dotenv from "dotenv";

dotenv.config({ path: `${__dirname}/.env`})

class ReadEnv {
    public get(envKey: string): string {
        const envValue: string | undefined = process.env[envKey]
        if (envValue == undefined) {
            throw new Error(`${envKey} value not found, please update your .env`)
        }

        return envValue
    }
}

export const readEnv = new ReadEnv()