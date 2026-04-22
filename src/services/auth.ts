import bcrypt from "bcryptjs";
import { UserModel } from "../models";
import jwt from "jsonwebtoken";

const login = async (cpf: string, password: string) => {
  const user = await UserModel.findOne({ where: { cpf } });

  if (!user) {
    throw {
      message: "error_user_not_found",
      status: 404,
      ref: "services/auth",
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw {
      message: "error_invalid_password",
      status: 401,
      ref: "services/auth",
    };
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  const result = {
    token,
    user: {
      id: user.id,
      name: user.name,
      cpf: user.cpf,
    },
  };
  return result;
};

const authService = {
  login,
};

export default authService;
