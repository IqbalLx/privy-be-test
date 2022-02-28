import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";

import { validateRegisterReq, validateLoginRequest } from "../../validator";
import { IAuthBusiness } from "../../business/auth/IAuthBusiness";
import { ClientError } from "../../error";
import { ILoginRequest, IRegisterRequest } from "../../dto/request";

class AuthController {
    private authBusiness: IAuthBusiness

    constructor(authBusiness: IAuthBusiness) {
        this.authBusiness = authBusiness
    }

    public async register(req: Request, res: Response) {
        await Promise.all(validateRegisterReq.map(rule => rule.run(req)))
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({ 
                message: errors.array() 
            });
        }

        const userData: IRegisterRequest = matchedData(req, { locations: ["body"] }) as IRegisterRequest

        try {
            if (userData.password !== userData.confirmPassword) {
                return res.status(400).send({
                    message: "password not match!"
                })
            }

            const resp = await this.authBusiness.register({
                username: userData.username,
                email: userData.email,
                password: userData.password
            })

            return res.status(200).send(resp)

        } catch(e) {
            if (e instanceof ClientError) {
                res.status(e.statusCode).send({
                    message: e.message
                })

            } else {
                console.debug(e)

                res.status(500).send({
                    message: "internal server error"
                })
            }
        }
    }

    public async login(req: Request, res: Response) {
        await Promise.all(validateLoginRequest.map(rule => rule.run(req)))
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({ 
                message: errors.array() 
            });
        }

        const loginReqDto: ILoginRequest = matchedData(req, { locations: ["body"] }) as ILoginRequest

        try {
            const resp = await this.authBusiness.login(loginReqDto)

            return res.status(200).send(resp)

        } catch(e) {
            if (e instanceof ClientError) {
                res.status(e.statusCode).send({
                    message: e.message
                })

            } else {
                console.debug(e)

                res.status(500).send({
                    message: "internal server error"
                })
            }
        }
    }
}

const buildAuthController = (authBusiness: IAuthBusiness) => {
    return new AuthController(authBusiness)
}

export { buildAuthController }