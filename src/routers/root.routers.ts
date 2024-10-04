import { Router } from "express";
import userRouters from "./user.routers";
import movieRouter from "./movie.routers";
import commentRouter from "./comment.router";
import actorRouter from "./actor.router";

const rootRouter = Router();

rootRouter.use("/user", userRouters);
rootRouter.use("/movie", movieRouter);
rootRouter.use("/comment", commentRouter);
rootRouter.use("/actor", actorRouter);

export default rootRouter;
