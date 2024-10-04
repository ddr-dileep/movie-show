import { Router } from "express";
import { actorContoller } from "../controllers/actor.controller";
import { actorMiddleware } from "../middlewares/actor.middleware";
import { authTokenMiddleware } from "../utils/token";

const actorRouter = Router();
export default actorRouter;

actorRouter.get("/get-all", actorContoller.getAllActors);

actorRouter.get(
  "/get-one/:actorId",
  actorMiddleware.getOneActorBtId,
  actorContoller.getActorById
);

actorRouter.post(
  "/create",
  actorMiddleware.create,
  authTokenMiddleware,
  actorContoller.createActor
);

actorRouter.patch(
  "/update/:actorId",
  actorMiddleware.update,
  authTokenMiddleware,
  actorContoller.updateActor
);
