import sequelize from "../config/sequelize";
import UserModel, {
  init as initUser,
  associate as associateUser,
} from "./user";
import { Request } from "express";

const toQuery = (modelName: string, ...args: unknown[]) => {
  return sequelize.query(args[0] as string, args[1] as object);
};

export const initModels = async () => {
  await initUser(sequelize, toQuery);
  associateUser();
  await sequelize.authenticate();
  console.log("Database connected!");
};

export const startTransaction = async (
  req: Request,
  callback: () => Promise<void>,
) => {
  const transaction = await sequelize.transaction();
  (req as any).transaction = transaction;
  try {
    await callback();
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const afterCommit = (callback: () => void) => {
  callback();
};

export { UserModel };
