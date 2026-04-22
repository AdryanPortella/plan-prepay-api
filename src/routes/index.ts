import { Router } from "express";
import authRouter from "./user";

const router = Router();

router.use("/auth", authRouter);

export default router;
