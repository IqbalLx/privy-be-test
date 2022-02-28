import { config } from "./config";

import express, { Express } from "express";
import cors from "cors"
import morgan from "morgan";
import { router as routerV1 } from "./src/api/v1";

const app: Express = express()

app.use(express.json())
app.use(cors())

if (config.app.env == "production") {
    app.use(morgan("combined"))
} else {
    app.use(morgan("dev"))
}

app.use("/api/v1", routerV1)

app.listen(config.app.port, () => {
    console.info(`listening on port ${config.app.port}`)
})
