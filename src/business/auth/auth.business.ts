import { IAuthBusiness } from "./IAuthBusiness"
import { IUserRepository } from "../../repository";
import { IUser, ITokenPayload } from "../../entity"
import { ILoginRequest } from "../../dto/request"
import { IRegisterReponse, ILoginResponse } from "../../dto/response";
import { ClientError } from "../../error";

import { sign, verify } from "jsonwebtoken"
import { compare, hash } from "bcrypt";

class AuthBusiness implements IAuthBusiness{
    private userRepo: IUserRepository
    private config: any

    constructor(userRepo: IUserRepository, appConfig: any) {
        this.userRepo = userRepo
        this.config = appConfig
    }

    public register(userData: IUser): Promise<IRegisterReponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const userDB = await this.userRepo.getUserByEmail(userData.email)
                if (userDB != null) {
                    return reject(new ClientError(
                        `email ${userData.email} is already exists!`,
                        400
                    ))
                }

                const hashedPassword = await hash(userData.password, this.config.app.hashSalt)
                userData.password = hashedPassword

                await this.userRepo.createUser(userData)

                return resolve({
                    message: "user succesfully created"
                })
            } catch(e) {
                console.debug(e)

                return reject(e)
            }
        })
    }

    public login(userData: ILoginRequest): Promise<ILoginResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const userDB = await this.userRepo.getUserByEmail(userData.email)
                if (userDB == null) {
                    return reject(new ClientError(
                        `email ${userData.email} is not registered!`,
                        401
                    ))
                }

                const isPasswordValid = await compare(userData.password, userDB.password)
                if (!isPasswordValid) {
                    return reject(new ClientError(
                        `password not match!`,
                        400
                    ))
                }

                const tokenPayload: ITokenPayload = {
                    userId: userDB.id!,
                    email: userDB.email
                }
                const accessToken = sign(
                    tokenPayload,
                    this.config.app.secretJWTKey, {
                        expiresIn: this.config.app.accessTokenTTL
                    })
                const refreshToken = sign(
                    tokenPayload,
                    this.config.app.secretJWTKey, {
                        expiresIn: this.config.app.refreshTokenTTL
                    })
                
                return resolve({
                    message: "login success",
                    accessToken,
                    refreshToken
                })
                
            } catch(e) {
                console.debug(e)

                return reject(e)
            }
        })
    }

    public isAuthorized(accessToken: string): Promise<ITokenPayload> {
        return new Promise((resolve, reject) => {
            const tokenPayload: any = verify(accessToken, this.config.app.secretJWTKey)
            if (!tokenPayload) {
               reject(`token expired`) 
            }

            return resolve({
                userId: tokenPayload.userId,
                email: tokenPayload.email
            })
        })
    }

    public generateNewAccessToken(tokenPayload: ITokenPayload): Promise<string> {
        return new Promise((resolve, _) => {
            const newAccessToken = sign(
                tokenPayload,
                this.config.app.secretJWTKey, {
                    expiresIn: "1d"
                })

            resolve(newAccessToken)
        })
    }
}

const buildAuthBusiness = (userRepo: IUserRepository, config: any) => {
    return new AuthBusiness(userRepo, config)
}

export { buildAuthBusiness }