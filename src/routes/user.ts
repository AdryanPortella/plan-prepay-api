/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 * /auth/login:
 *   post:
 *     summary: Login with CPF and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpf:
 *                 type: string
 *                 default: 000.000.000-00
 *               password:
 *                 type: string
 *                 default: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
import { Router } from "express";
import authController from "../controllers/auth";

const authRouter = Router();

authRouter.post("/login", authController.login);

export default authRouter;
