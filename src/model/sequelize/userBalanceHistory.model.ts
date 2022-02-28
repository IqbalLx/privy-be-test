import { DataTypes, Model, Sequelize } from 'sequelize';
import { CardType } from "../../entity/IUserBalanceHistory";

export const buildUserBalanceHistoryModel = (sequelize: Sequelize) => {
    class UserBalanceHistory extends Model {
        public id!: number
        public userBalanceId!: number
        public balanceBefore!: number
        public balanceAfter!: number
        public activity!: string
        public type!: CardType
        public ip!: string
        public userAgent!: string
        public location!: string
        public author!: string
    }

    UserBalanceHistory.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
          },
          userBalanceId: DataTypes.INTEGER,
          balanceBefore: DataTypes.INTEGER,
          balanceAfter: DataTypes.INTEGER,
          activity: DataTypes.STRING,
          type: DataTypes.ENUM('debit', 'kredit'),
          ip: DataTypes.STRING,
          location: DataTypes.STRING,
          userAgent: DataTypes.STRING,
          author: DataTypes.STRING
        }, {
          sequelize,
          modelName: 'UserBalanceHistory',
    })

    return UserBalanceHistory
}