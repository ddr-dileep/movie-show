import express from "express";
import { config } from "dotenv";
import rootRouter from "./routers/root.routers";
import { API_RESPONSES } from "./utils/api.response";
// import { trackClientInfo } from "./middlewares/track.user.middleware";
import morgan from "morgan";
import databaseConnection from "./configs/db-config";

config();
const APP_PORT = process.env.APP_PORT || 8000;
const app = express();

app.use(express.json());
// app.use(trackClientInfo);
app.use(morgan("combined"));

app.use("/api/v1", rootRouter);

// if some path is not specified then
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json(API_RESPONSES.notFound());
});

app.listen(APP_PORT, () => {
  console.log(`Server is running on http://localhost:${APP_PORT}`);
  databaseConnection();
});
