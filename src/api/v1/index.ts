import { Router } from "express";
import { authController } from "../../controller";

const router = Router()

router.use("/auth", authController)

export { router }