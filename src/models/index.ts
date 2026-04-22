import sequelize from "../config/sequelize";
import UserModel, {
  init as initUser,
  associate as associateUser,
} from "./user";

const toQuery = (modelName: string, ...args: unknown[]) => {
  return sequelize.query(args[0] as string, args[1] as object);
};

export const initModels = async () => {
  await initUser(sequelize, toQuery);
  associateUser();
  await sequelize.authenticate();
  console.log("Database connected!");
};

export { UserModel };
