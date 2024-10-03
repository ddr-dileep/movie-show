import { Router } from "express";
import userRouters from "./user.routers";
import movieRouter from "./movie.routers";
import commentRouter from "./comment.router";

const rootRouter = Router();

rootRouter.use("/user", userRouters);
rootRouter.use("/movie", movieRouter);
rootRouter.use("/comment", commentRouter);

export default rootRouter;
