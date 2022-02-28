import { ModelInstance } from "../../../adapter/database/sequelize";
import { IUserRepository } from "../..";
import { IUser } from "../../../entity";

class SequelizeUserRepository implements IUserRepository {
    private userModel: typeof ModelInstance
    
    constructor(sequelizeUserModel: typeof ModelInstance) {
        this.userModel = sequelizeUserModel
    }

    public createUser(user: IUser): Promise<IUser> {
        return new Promise(async (resolve, reject) => {
            try {
                const userDB = await this.userModel.create({
                    username: user.username,
                    email: user.email,
                    password: user.password
                })
                const userDto: IUser = {
                    id: userDB.get("id") as number,
                    username: userDB.get("username") as string,
                    email: userDB.get("email") as string,
                    password: userDB.get("password") as string
                }

                return resolve(userDto)

            } catch(e) {
                console.debug(e)

                return reject(e)
            }
        })
    }
    
    public getUserByEmail(email: string): Promise<IUser|null> {
        return new Promise(async (resolve, reject) => {
            try {
                const userDB = await this.userModel.findOne({
                    where: {
                        email
                    }
                })

                if (userDB == null) {
                    return resolve(null)
                }

                const userDto: IUser = {
                    id: userDB.get("id") as number,
                    username: userDB.get("username") as string,
                    email: userDB.get("email") as string,
                    password: userDB.get("password") as string
                }

                return resolve(userDto)

            } catch(e) {
                console.debug(e)

                return reject(e)
            }
        })
    }

    public getUser(userId: number): Promise<IUser|null> {
        return new Promise(async (resolve, reject) => {
            try {
                const userDB = await this.userModel.findByPk(userId)

                if (!userDB) {
                    return resolve(null)
                }

                const userDto: IUser = {
                    id: userDB.get("id") as number,
                    username: userDB.get("username") as string,
                    email: userDB.get("email") as string,
                    password: userDB.get("password") as string
                }

                return resolve(userDto)

            } catch(e) {
                console.debug(e)

                return reject(e)
            }
        })
    }

    public updateUser(userId: number, newUser: IUser): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.userModel.update(newUser, {
                    where: {
                        id: userId
                    }
                })

                return resolve(true)

            } catch(e) {
                console.debug(e)

                return reject(e)
            }
        })
    }

    public deleteUser(userId: number): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.userModel.destroy({
                    where: {
                        id: userId
                    }
                })

                return resolve(true)

            } catch(e) {
                console.debug(e)

                return reject(e)
            }
        })
    }
}

const buildUserRepository = (userModel: typeof ModelInstance) => {
    return new SequelizeUserRepository(userModel)
}

export { buildUserRepository }