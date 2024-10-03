import { Router } from "express";
import userRouters from "./user.routers";
import movieRouter from "./movie.routers";

const rootRouter = Router();

rootRouter.use("/user", userRouters);
rootRouter.use("/movie", movieRouter);

export default rootRouter;
