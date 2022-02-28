import { DataTypes, Model, Sequelize } from 'sequelize';

export const buildUserModel = (sequelize: Sequelize) => {
    class User extends Model {
        public id!: number
        public username!: string
        public email!: string
    }

    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
      }, {
        sequelize,
        modelName: 'User',
        timestamps: true
      })

    return User
}