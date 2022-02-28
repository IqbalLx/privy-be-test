import { Router } from "express";
import { authBusiness } from "../../business/auth";
import { buildAuthController } from "./auth.controller";

const authController = buildAuthController(authBusiness)

const router = Router()

router.post("/register", authController.register.bind(authController))
router.post("/login", authController.login.bind(authController))

export { router }