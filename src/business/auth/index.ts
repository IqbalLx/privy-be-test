import { config } from "../../../config";
import { userRepository } from "../../repository/impl";
import { IAuthBusiness } from "./IAuthBusiness";
import { buildAuthBusiness } from "./auth.business";

const authBusiness = buildAuthBusiness(userRepository, config)

export { IAuthBusiness, authBusiness }