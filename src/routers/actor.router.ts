import { Router } from "express";
import { actorContoller } from "../controllers/actor.controller";
import { actorMiddleware } from "../middlewares/actor.middleware";

const actorRouter = Router();
export default actorRouter;

actorRouter.get("/get-all", actorContoller.getAllActors);

actorRouter.get(
  "/get-one/:actorId",
  actorMiddleware.getOneActorBtId,
  actorContoller.getActorById
);
