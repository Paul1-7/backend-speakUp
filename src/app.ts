import "dotenv/config";
import express from "express";
import cors from "cors";
import { CONFIG } from "./config/config";
import routerApi from "./routes";
import DBInit from "./db";
import { errorHandler } from "./middlewares";
const { PORT } = CONFIG;

DBInit()
  .then(() => {
    console.log("Database conected");
  })
  .catch(() => {
    console.log("Database not conected");
  });

const app = express();
app.use(express.json());
app.use(cors());

routerApi(app);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Servidor en http://localhost:" + PORT);
});
