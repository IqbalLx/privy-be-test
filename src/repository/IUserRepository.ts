import { IUser } from "../entity";
export interface IUserRepository {
    createUser(user: IUser): Promise<IUser>,
    getUserByEmail(email: string): Promise<IUser|null>,
    getUser(userId: number): Promise<IUser|null>,
    updateUser(userId: number, newUser: IUser): Promise<boolean>,
    deleteUser(userId: number): Promise<boolean>
}