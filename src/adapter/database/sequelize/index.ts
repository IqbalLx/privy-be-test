import { IDatabase, IDatabaseConnection } from "../IDatabase"
import { Sequelize, Model } from "sequelize";

import { buildUserModel } from "../../../model/sequelize/user.model";
import { buildUserBalanceModel } from "../../../model/sequelize/userBalance.model";
import { buildUserBalanceHistoryModel } from "../../../model/sequelize/userBalanceHistory.model";

type modelNames = "user" | "userBalance" | "userBalanceHistory"
class ModelInstance extends Model {}

class SequelizeDatabase implements IDatabase {
    sequelizeIntance: Sequelize
    models: Partial<{ [name in modelNames]: typeof ModelInstance }> = {};

    constructor(connectionConf: IDatabaseConnection) {
        this.sequelizeIntance = this.buildConnection(connectionConf)
    }

    public buildConnection(connectionConf: IDatabaseConnection) {
        return new Sequelize(connectionConf.databaseSchema, connectionConf.databaseUsername, connectionConf.databasePassword, {
            host: connectionConf.databaseHost,
            port: connectionConf.databasePort,
            dialect: "postgres"
        })
    }

    public buildModel() {
        // build model
        this.models.user = buildUserModel(this.sequelizeIntance)
        this.models.userBalance = buildUserBalanceModel(this.sequelizeIntance)
        this.models.userBalanceHistory = buildUserBalanceHistoryModel(this.sequelizeIntance)

        // define relations
        this.models.user.hasOne(this.models.userBalance)
        this.models.userBalance.belongsTo(this.models.user, { foreignKey: "userId" })
        this.models.userBalance.hasMany(this.models.userBalanceHistory)
        this.models.userBalanceHistory.belongsTo(this.models.userBalance, { foreignKey: "userBalanceId" })
    }

    public getModels() {
        return this.models
    }
}

export default SequelizeDatabase