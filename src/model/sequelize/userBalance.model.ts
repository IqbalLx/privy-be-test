import { DataTypes, Model, Sequelize } from 'sequelize';

export const buildUserBalanceModel = (sequelize: Sequelize) => {
    class UserBalance extends Model {
        public id!: number
        public userId!: number
        public balance!: string
        public balanceAchieve!: number
    }

    UserBalance.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
          },
          userId: DataTypes.INTEGER,
          balance: DataTypes.STRING,
          balanceAchieve: DataTypes.INTEGER
        }, {
          sequelize,
          modelName: 'UserBalance',
    })

    return UserBalance
}