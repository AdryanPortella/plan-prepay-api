import { Request, Response, NextFunction } from "express";
import authService from "../services/auth";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cpf, password } = req.body;
    const result = await authService.login(cpf, password);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const authController = {
  login,
};

export default authController;
