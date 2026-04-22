import { DataTypes, Model, Sequelize } from "sequelize";
import { IUser } from "../interfaces";

export default class UserModel
  extends Model<IUser, Omit<IUser, "id" | "created_at" | "updated_at">>
  implements IUser
{
  declare id: string;
  declare name: string;
  declare cpf: string;
  declare password: string;
  declare created_at: Date;
  declare updated_at: Date;

  declare static toQuery: Function;
}

export const init = async (sequelize: Sequelize, toQuery: Function) => {
  UserModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "user",
      tableName: "users",
      timestamps: false,
    },
  );
  UserModel.toQuery = toQuery.bind(UserModel, "user");
};

export const associate = () => {};
