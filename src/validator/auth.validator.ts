import { body } from "express-validator";

const validateRegisterReq = [
    body("username").isString().isLength({ min: 2}),
    body("email").isEmail().isString(),
    body("password").isString().isLength({ min: 8 }),
    body("confirmPassword").isString().isLength({ min: 8 })
]

const validateLoginRequest = [
    body("email").isEmail().isString(),
    body("password").isString().isLength({ min: 8 })
]

export { 
    validateRegisterReq,
    validateLoginRequest
 }