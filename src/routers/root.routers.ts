import { Router } from "express";
import userRouters from "./user.routers";

const rootRouter = Router();

rootRouter.use("/user", userRouters);

export default rootRouter;
