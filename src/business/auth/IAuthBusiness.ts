import { ITokenPayload, IUser } from "../../entity";
import { ILoginRequest } from "../../dto/request";
import { IRegisterReponse, ILoginResponse } from "../../dto/response";

export interface IAuthBusiness {
    register(userData: IUser): Promise<IRegisterReponse>
    login(userData: ILoginRequest): Promise<ILoginResponse>
    isAuthorized(accessToken: string): Promise<ITokenPayload>
    generateNewAccessToken(tokenPayload: ITokenPayload): Promise<string>
}