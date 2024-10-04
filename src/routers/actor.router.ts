import { Router } from "express";
import { actorContoller } from "../controllers/actor.controller";

const actorRouter = Router();
export default actorRouter;

actorRouter.get("/get-all", actorContoller.getAllActors);
