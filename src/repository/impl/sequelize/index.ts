import { models } from "../../../adapter/database";
import { ModelInstance } from "../../../adapter/database/sequelize";

import { buildUserRepository } from "./sequelizeUserRepository"

const userRepository = buildUserRepository(models.user as typeof ModelInstance)

export { userRepository }

