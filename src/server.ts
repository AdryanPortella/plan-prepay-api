import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import "./config/database";
import { initModels } from "./models";
import { swaggerSpec } from "./config/swagger";
import router from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", router);

initModels().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
  });
});

export default app;
