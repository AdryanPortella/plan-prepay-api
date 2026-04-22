import express from "express";
import dotenv from "dotenv";
import "./config/database";
import { initModels } from "./models";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Plan Prepay API running!" });
});

initModels().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;
